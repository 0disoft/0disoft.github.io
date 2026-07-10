---
{
  "title": "Is Spending Free Credit First Enough? Designing for Expiry and Refunds",
  "summary": "A single displayed balance can hide many credit lots. This article uses production Rust code to explain spend order, expiry handling, and why stale expired lots must fail closed.",
  "searchTags": ["credits", "payments", "ledger", "expiry", "refunds", "Rust", "credit lot"]
}
---
A user sees one balance: 10,000 credits. Inside a payment system, treating that number as one undifferentiated balance quickly becomes a problem. A 3,000-credit signup reward may expire this month, 5,000 purchased credits may be refundable, and another 2,000 promotional credits may only apply to selected products.

ZDP Money Platform therefore preserves the balance as credit lots. The number shown to the user is their sum, but spending still considers each lot's origin, expiry, refundability, and product scope.

## Why one balance needs multiple lots

A single balance row makes subtraction easy. Deduct the amount and move on. The trouble starts later. A refund request cannot reliably distinguish purchased funds from promotions, and an expiry job cannot tell which part of the balance should disappear.

With lots, the same 10,000 credits can look like this.

| lot | purpose | remaining | expires | refundable |
| --- | --- | --- | --- | --- |
| signup_free | signup reward | 3,000 | July 31 | no |
| paid_bonus | purchase bonus | 2,000 | August 31 | no |
| paid_base | purchased funds | 5,000 | never | yes |

Spend order now becomes product policy. It is usually better for the user to consume value that will disappear soon and preserve refundable principal for last. Our implementation orders candidates by priority, expiry, creation time, and lot ID.

## Why silently skipping an expired lot is dangerous

The obvious implementation is to remove expired lots from the candidate list and continue with the next one.

That can hide a data problem by charging the user. If a free lot is still Active with a positive balance after its expiry, the expiry workflow or ledger correction is late. Silently skipping it lets the system consume purchased credits behind it. The payment succeeds, but the user spends real money while stale promotional value remains unexplained.

The current implementation fails explicitly when an Active, positive, product-eligible lot has expired.

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

This failure is not defensive friction for its own sake. It exposes a mismatch between expiry processing and ledger state instead of automatically falling through to paid value. The caller can then correct expiry state or retry deliberately.

## Why validate again at the storage boundary

The spend domain first creates a plan describing which lots to consume. A valid plan does not guarantee that its data is still valid when persistence begins. Another request may have consumed the lot, or the expiry snapshot attached to the plan may be inconsistent.

The persistence planner therefore checks the expiry snapshot again.

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

These checks have different jobs. The first is a domain rule deciding which lots may become spend candidates. The second is a storage-boundary invariant that rejects a plan contradicting its own snapshot. One prevents a bad decision; the other prevents a bad record.

## Expiry starts at the boundary timestamp

If a lot expires at 00:00:00, a spend occurring exactly at 00:00:00 must be rejected. The implementation treats expires_at less than or equal to occurred_at as expired, and the test fixes that boundary in place.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

The current comparison relies on lexical string order. That is safe only while every timestamp follows the same canonical UTC representation. If arbitrary offsets or differently normalized fractional seconds are allowed, string comparison is not enough. The input contract must stay strict, or the boundary must parse values into a real time type before comparison.

## What this change does not solve

Expiry validation does not solve concurrent spending. Two requests may read the same snapshot and try to consume the same lot. The database still needs an atomic conditional update or locking strategy. Validation between planning and persistence reduces contradictions, but it cannot remove races on its own.

Operational recovery matters too. A rise in ExpiredLot errors should not be buried as ordinary user failures. It should point to a delayed expiry job, a lost event, or an invalid state transition. The explicit failure exists so the mismatch can be observed and repaired.

Credit spending looks like subtraction, but it is really a policy for deciding which value disappears first and which value should be protected. A single line that skips stale free credit can burn a user's purchased balance. In that situation, stopping accurately is better than forcing the payment to succeed.
