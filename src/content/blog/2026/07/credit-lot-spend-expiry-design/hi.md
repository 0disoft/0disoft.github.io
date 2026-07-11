---
{
  "title": "क्रेडिट खर्च करने का क्रम कैसे डिज़ाइन करें",
  "summary": "दिखाई देने वाले एक ही बैलेंस के पीछे कई क्रेडिट lot हो सकते हैं। यह लेख production Rust code के माध्यम से खर्च के क्रम, expiry handling और stale expired lot पर स्पष्ट रूप से विफल होना क्यों ज़रूरी है, इसे समझाता है।",
  "searchTags": ["क्रेडिट", "भुगतान", "लेजर", "समाप्ति", "रिफंड", "Rust", "क्रेडिट lot"]
}
---
उपयोगकर्ता को एक ही बैलेंस दिखाई देता है: 10,000 क्रेडिट। लेकिन payment system के भीतर इस संख्या को बिना किसी भेद वाले एक ही बैलेंस की तरह रखना जल्दी ही समस्या बन जाता है। 3,000 क्रेडिट का signup reward इसी महीने expire हो सकता है, खरीदे गए 5,000 क्रेडिट refundable हो सकते हैं, और promotion से मिले अन्य 2,000 क्रेडिट केवल चुने हुए products पर लागू हो सकते हैं।

इसीलिए ZDP Money Platform बैलेंस को credit lots के रूप में सुरक्षित रखता है। उपयोगकर्ता को दिखाई देने वाली संख्या उन lots का योग है, लेकिन खर्च करते समय हर lot का स्रोत, expiry, refundability और product scope देखा जाता है।

## एक बैलेंस के लिए कई lots क्यों ज़रूरी हैं

बैलेंस की एक ही row subtraction को आसान बनाती है: रकम घटाओ और आगे बढ़ जाओ। समस्या बाद में शुरू होती है। Refund request खरीदे गए funds और promotions के बीच भरोसेमंद तरीके से अंतर नहीं कर सकती, और expiry job यह नहीं जान सकती कि बैलेंस का कौन-सा हिस्सा हटना चाहिए।

Lots के साथ वही 10,000 क्रेडिट इस तरह दिखाई दे सकते हैं।

| lot | उद्देश्य | शेष राशि | समाप्ति | refundable |
| --- | --- | --- | --- | --- |
| signup_free | signup reward | 3,000 | 31 जुलाई | नहीं |
| paid_bonus | purchase bonus | 2,000 | 31 अगस्त | नहीं |
| paid_base | खरीदे गए funds | 5,000 | कभी नहीं | हाँ |

अब खर्च का क्रम product policy बन जाता है। आम तौर पर उपयोगकर्ता के लिए उस value को पहले खर्च करना बेहतर है जो जल्द गायब होने वाली है, जबकि refundable principal को अंत तक बचाकर रखा जाए। हमारा implementation candidates को priority, expiry, creation time और lot ID के क्रम में रखता है।

## Expired lot को चुपचाप छोड़ना खतरनाक क्यों है

सबसे स्पष्ट implementation expired lots को candidate list से हटाकर अगले lot पर जाने का है।

यह उपयोगकर्ता से कीमत वसूलते हुए data problem को छिपा सकता है। अगर कोई free lot expiry के बाद भी Active है और उसमें positive balance बचा है, तो expiry workflow या ledger correction देर से चल रहा है। उसे चुपचाप छोड़ने पर system उसके पीछे मौजूद खरीदे गए credits को खर्च कर सकता है। Payment सफल हो जाता है, लेकिन उपयोगकर्ता असली पैसे से खरीदी गई value खर्च करता है जबकि stale promotional value का हिसाब अब भी अस्पष्ट रहता है।

मौजूदा implementation तब स्पष्ट रूप से विफल होता है जब कोई lot Active हो, उसमें positive balance हो, वह उस product के लिए eligible हो और expire हो चुका हो।

```rust
if lot.lot_status == CreditLotStatus::Active
    && lot.remaining_amount_credit_unit > 0
    && lot_allows_product_group(lot, &request.product_group)
    && lot.expires_at.as_deref().is_some_and(|expires_at| {
        credit_lot_expires_at_or_before(expires_at, &request.occurred_at)
    })
{
    return Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: lot.credit_lot_id.clone(),
    });
}
```

यह failure केवल बचाव के नाम पर अतिरिक्त रुकावट नहीं है। यह अपने आप paid value पर जाने के बजाय expiry processing और ledger state के बीच mismatch को उजागर करता है। इसके बाद caller expiry state को ठीक कर सकता है या सोच-समझकर retry कर सकता है।

## Storage boundary पर दोबारा validation क्यों होती है

Spend domain पहले यह बताने वाला plan बनाता है कि किन lots को consume करना है। Valid plan इस बात की गारंटी नहीं देता कि persistence शुरू होने तक उसका data वैसा ही रहेगा। कोई दूसरी request उस lot को consume कर चुकी हो सकती है, या plan से जुड़ा expiry snapshot असंगत हो सकता है।

इसीलिए persistence planner expiry snapshot को दोबारा जाँचता है।

```rust
if consumption
    .expires_at_at_consumption
    .as_deref()
    .is_some_and(|expires_at| expires_at <= input.plan.occurred_at.as_str())
{
    return Err(CreditLotSpendStorageError::PlanMismatch(
        "expires_at_at_consumption",
    ));
}
```

इन दोनों checks के काम अलग हैं। पहला domain rule तय करता है कि कौन-से lots spend candidates बन सकते हैं। दूसरा storage-boundary invariant उस plan को अस्वीकार करता है जो अपने snapshot से ही टकराता है। एक गलत निर्णय रोकता है; दूसरा गलत record बनने से रोकता है।

## Expiry boundary timestamp से ही शुरू होती है

अगर कोई lot 00:00:00 पर expire होता है, तो ठीक 00:00:00 पर होने वाला spend अस्वीकार होना चाहिए। Implementation में `expires_at`, `occurred_at` से छोटा या उसके बराबर होने पर lot को expired माना जाता है, और test इस boundary को स्थिर करता है।

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

मौजूदा comparison strings के lexical order पर निर्भर करता है। यह तभी सुरक्षित है जब हर timestamp एक ही canonical UTC representation का पालन करे। अगर arbitrary offsets या अलग तरह से normalized fractional seconds की अनुमति हो, तो string comparison पर्याप्त नहीं है। Input contract को सख्त रहना होगा, या boundary को तुलना से पहले values को वास्तविक time type में parse करना होगा।

## यह बदलाव क्या हल नहीं करता

Expiry validation concurrent spending को हल नहीं करती। दो requests एक ही snapshot पढ़कर एक ही lot को consume करने की कोशिश कर सकती हैं। Database को अब भी atomic conditional update या locking strategy की ज़रूरत है। Planning और persistence के बीच validation contradictions कम करती है, लेकिन अपने दम पर race conditions समाप्त नहीं कर सकती।

Operational recovery भी महत्वपूर्ण है। ExpiredLot errors में बढ़ोतरी को सामान्य user failures की तरह नहीं दबाना चाहिए। उसे delayed expiry job, lost event या invalid state transition की ओर इशारा करना चाहिए। Explicit failure इसलिए मौजूद है ताकि mismatch को देखा और ठीक किया जा सके।

Credit spending देखने में subtraction लगता है, लेकिन वास्तव में यह तय करने वाली policy है कि कौन-सी value पहले गायब होगी और किसे बचाया जाना चाहिए। Stale free credit को छोड़ने वाली एक पंक्ति उपयोगकर्ता के खरीदे हुए balance को जला सकती है। ऐसी स्थिति में payment को जबरन सफल कराने से बेहतर है सही जगह पर रुकना।
