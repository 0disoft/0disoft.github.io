---
{
  "title": "Designing Credit Spend Order",
  "summary": "A single displayed balance can hide many credit lots. This article uses production Rust code to explain spend order, expiry handling, and why stale expired lots must fail closed.",
  "searchTags": ["credits", "payments", "ledger", "expiry", "refunds", "Rust", "credit lot"]
}
---
A user sees a credit balance as one number, such as 10,000 credits. Inside the system, however, managing that value as a single balance makes it very difficult to apply real policies for refunds, expiry, and product restrictions correctly.

ZDP Money Platform manages credits as credit lots. The number shown to the user is the sum of several lots, but every spend still checks each lot's origin, expiry time, refundability, and product scope.

This article explains how we decide the order in which lots are consumed and why an expired lot must never be skipped silently, using production Rust code.

## Why a balance must be split into credit lots

If credits are stored as one number, spending is simple. Subtract the amount from the balance and the job appears to be done. The problems come afterward.

When a refund is requested, the system cannot reliably determine how much came from purchased funds. When a promotion expires, it cannot identify which value should be removed. It also cannot distinguish promotional credits limited to certain products from ordinary purchased credits.

That is why ZDP preserves the same 10,000 credits as several lots with different origins and properties.

## Credit lot example

| Lot ID | Purpose | Remaining | Expires at | Refundable |
| --- | --- | --- | --- | --- |
| signup_free | Signup reward | 3,000 | 2026-07-31 | No |
| paid_bonus | Purchase bonus | 2,000 | 2026-08-31 | No |
| paid_base | Purchased funds | 5,000 | - | Yes |

In this model, spend order becomes a product policy. It is generally better for the user to consume value that will disappear soon, such as expiring or non-refundable credits, while preserving refundable principal for as long as possible.

The current implementation sorts candidate lots in the following order.

Policy priority → earliest expiry → oldest creation time → lot ID

## Why skipping an expired lot is dangerous

Many people initially ask the same question.

“Why not remove the expired lot from the candidates and use the next one?”

This is a dangerous pattern because it quietly transfers the cost of a data problem to the user.

If a free lot remains Active after its expiry time, the expiry workflow is late or the ledger was not corrected properly. Silently skipping that lot causes the system to consume the purchased credits behind it instead.

The payment succeeds, but the user loses value they bought directly instead of using the free credits that should already have been resolved.

The current implementation therefore returns an explicit failure.

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

ExpiredLot is not an ordinary user error. It is a guard that preserves the signal that expiry processing and actual ledger state have diverged. The calling layer can use that error to trigger expiry correction or choose a deliberate retry strategy.

## Why planning and storage validate separately

Credit spending has two main stages.

The planning stage decides which lots should provide the requested amount. The storage stage records that decision in the database.

A valid plan does not guarantee that the data will still be identical when persistence begins. Another request may have consumed the same lot first, or the expiry snapshot in the plan may already be stale.

The persistence boundary therefore validates the expiry snapshot once more immediately before storage.

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

The two checks serve different purposes. The first is a domain rule that asks, “May this lot become a spend candidate?” The second is a storage-boundary rule that asks, “Does the plan we are about to record contradict itself?”

One prevents a bad decision. The other prevents a bad record.

## Expiry begins at the boundary timestamp

If a lot expires at 2026-07-31 00:00:00, a spend occurring at that exact time must be rejected. The implementation treats the lot as expired whenever expires_at is less than or equal to occurred_at.

The test fixes this boundary explicitly.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

The current comparison relies on lexical string order. This is safe only while every timestamp follows the same canonical UTC representation. Different offsets or non-normalized fractional seconds can make string comparison incorrect.

## What this change does not solve

Expiry validation does not solve every problem.

Concurrency: two requests may read the same snapshot and try to spend the same lot at the same time. The database must prevent this with an atomic conditional update, optimistic locking, or an appropriate locking strategy.

Operational recovery: an increase in ExpiredLot errors must not be dismissed as ordinary user failures. The system must make it possible to determine whether the cause is a delayed expiry job, a lost event, or an invalid state transition.

The reason for returning an explicit failure is ultimately to make the problem observable and repairable.

## Closing thoughts

Credit spending looks like a subtraction function, but it is actually a policy that decides which value should be used first and which value should remain protected.

One line of code that silently skips an expired free lot can consume a user's purchased balance. We therefore choose to stop precisely when the state is invalid instead of forcing the payment to succeed.

We believe this choice will eventually save us during a real production incident.
