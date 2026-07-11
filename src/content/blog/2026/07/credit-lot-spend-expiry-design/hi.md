---
{
  "title": "क्रेडिट खर्च करने का क्रम कैसे डिज़ाइन करें",
  "summary": "दिखाई देने वाले एक ही बैलेंस के पीछे कई क्रेडिट lot हो सकते हैं। यह लेख production Rust code के माध्यम से खर्च के क्रम, expiry handling और stale expired lot पर स्पष्ट रूप से विफल होना क्यों ज़रूरी है, इसे समझाता है।",
  "searchTags": ["क्रेडिट", "भुगतान", "लेजर", "समाप्ति", "रिफंड", "Rust", "क्रेडिट lot"]
}
---
उपयोगकर्ता को credit balance एक ही संख्या के रूप में दिखाई देता है, जैसे 10,000 क्रेडिट। लेकिन यदि system के भीतर भी इसे एक साधारण balance की तरह रखा जाए, तो refund, expiry और product restrictions जैसी वास्तविक policies को सही ढंग से लागू करना बहुत कठिन हो जाता है।

ZDP Money Platform credits को credit lots के रूप में manage करता है। उपयोगकर्ता को दिखाई देने वाली संख्या कई lots का कुल योग है, लेकिन हर spend के समय प्रत्येक lot का source, expiry time, refundability और product scope जाँचा जाता है।

इस लेख में production Rust code के साथ बताया गया है कि lots को किस क्रम में consume किया जाता है और expired lot को चुपचाप छोड़ना क्यों गलत है।

## Balance को credit lots में बाँटना क्यों ज़रूरी है

यदि credits को एक ही संख्या के रूप में रखा जाए, तो खर्च करना आसान है। Balance से amount घटाइए और काम पूरा दिखाई देता है। असली समस्याएँ उसके बाद आती हैं।

Refund request आने पर यह भरोसेमंद ढंग से पता लगाना कठिन होता है कि कितनी राशि वास्तव में खरीदी गई थी। Promotion expire होने पर यह तय करना भी कठिन होता है कि कौन-सी value हटाई जानी चाहिए। इसके अलावा, केवल कुछ products पर लागू promotional credits को सामान्य purchased credits से अलग नहीं किया जा सकता।

इसीलिए ZDP समान 10,000 credits को अलग-अलग source और properties वाले कई lots के रूप में सुरक्षित रखता है।

## Credit lot का उदाहरण

| Lot ID | उद्देश्य | शेष राशि | समाप्ति | Refundable |
| --- | --- | --- | --- | --- |
| signup_free | Signup reward | 3,000 | 2026-07-31 | नहीं |
| paid_bonus | Purchase bonus | 2,000 | 2026-08-31 | नहीं |
| paid_base | खरीदे गए funds | 5,000 | - | हाँ |

इस model में spend order स्वयं product policy बन जाता है। आम तौर पर जल्द गायब होने वाली value, जैसे expire होने वाले या non-refundable credits, पहले consume करना और refundable principal को यथासंभव देर तक सुरक्षित रखना उपयोगकर्ता के लिए बेहतर होता है।

मौजूदा implementation candidate lots को इस क्रम में sort करता है।

Policy priority → सबसे जल्दी expiry → सबसे पुराना creation time → lot ID

## Expired lot को छोड़ना खतरनाक क्यों है

शुरुआत में बहुत से लोग एक ही सवाल पूछते हैं।

“Expired lot को candidates से हटाकर अगला lot क्यों न उपयोग करें?”

यह खतरनाक pattern है, क्योंकि यह data problem की लागत चुपचाप उपयोगकर्ता पर डाल देता है।

यदि कोई free lot expiry time के बाद भी Active रहता है, तो expiry workflow देर से चला है या ledger सही तरह से ठीक नहीं हुआ है। उस lot को छोड़ने पर system उसके पीछे मौजूद purchased credits को consume कर देता है।

Payment सफल हो जाता है, लेकिन उपयोगकर्ता उन free credits के बदले अपनी खरीदी हुई value खो देता है जिनकी स्थिति पहले ही ठीक हो जानी चाहिए थी।

इसीलिए मौजूदा implementation स्पष्ट failure लौटाता है।

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

ExpiredLot कोई सामान्य user error नहीं है। यह उस signal को सुरक्षित रखने वाला guard है कि expiry processing और actual ledger state एक-दूसरे से अलग हो गए हैं। Calling layer इस error से expiry correction trigger कर सकती है या सोच-समझकर retry strategy चुन सकती है।

## Planning और storage अलग-अलग validation क्यों करते हैं

Credit spending के दो मुख्य चरण होते हैं।

Planning stage तय करता है कि requested amount किन lots से आएगा। Storage stage उस निर्णय को database में record करता है।

Valid plan इस बात की guarantee नहीं देता कि persistence शुरू होने तक data वैसा ही रहेगा। कोई दूसरी request पहले उसी lot को consume कर सकती है, या plan में मौजूद expiry snapshot पहले ही पुराना हो सकता है।

इसीलिए persistence boundary storage से ठीक पहले expiry snapshot को फिर से validate करती है।

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

दोनों checks के उद्देश्य अलग हैं। पहला domain rule पूछता है, “क्या यह lot spend candidate बन सकता है?” दूसरा storage-boundary rule पूछता है, “जिस plan को हम record करने वाले हैं, क्या वह अपने ही data से टकराता है?”

एक गलत निर्णय रोकता है। दूसरा गलत record बनने से रोकता है।

## Expiry boundary timestamp से शुरू होती है

यदि कोई lot 2026-07-31 00:00:00 पर expire होता है, तो ठीक उसी समय होने वाला spend अस्वीकार होना चाहिए। Implementation में expires_at के occurred_at से छोटा या बराबर होने पर lot को expired माना जाता है।

Test इस boundary को स्पष्ट रूप से स्थिर करता है।

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

मौजूदा comparison strings के lexical order पर निर्भर करता है। यह तभी सुरक्षित है जब सभी timestamps एक ही canonical UTC representation का पालन करें। अलग offsets या non-normalized fractional seconds string comparison को गलत बना सकते हैं।

## यह बदलाव किन समस्याओं को हल नहीं करता

Expiry validation हर समस्या को हल नहीं करती।

Concurrency: दो requests एक ही snapshot पढ़कर एक ही समय पर उसी lot को consume करने की कोशिश कर सकती हैं। Database को atomic conditional update, optimistic locking या उचित locking strategy से इसे रोकना होगा।

Operational recovery: ExpiredLot errors बढ़ने पर उन्हें सामान्य user failures मानकर छोड़ना नहीं चाहिए। System को यह पता लगाने योग्य बनाना होगा कि कारण delayed expiry job, lost event या invalid state transition है।

Explicit failure का उद्देश्य अंततः समस्या को observable और repairable बनाना है।

## निष्कर्ष

Credit spending देखने में subtraction function जैसा लगता है, लेकिन वास्तव में यह तय करने वाली policy है कि कौन-सी value पहले उपयोग होगी और किस value को अंत तक सुरक्षित रखा जाएगा।

Expired free lot को चुपचाप छोड़ने वाली code की एक line उपयोगकर्ता के purchased balance को consume कर सकती है। इसीलिए हम payment को जबरन सफल करने के बजाय invalid state पर सही जगह रुकना चुनते हैं।

हमें विश्वास है कि production में किसी वास्तविक incident के समय यह निर्णय हमारी रक्षा करेगा।
