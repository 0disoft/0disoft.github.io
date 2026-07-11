---
{
  "title": "Concevoir l'ordre de consommation des crédits",
  "summary": "Un solde unique affiché peut masquer de nombreux lots de crédits. Cet article s'appuie sur du code Rust de production pour expliquer l'ordre de consommation, le traitement de l'expiration et pourquoi un lot expiré resté dans un état obsolète doit provoquer un échec explicite.",
  "searchTags": ["crédits", "paiements", "grand livre", "expiration", "remboursements", "Rust", "lot de crédits"]
}
---
L'utilisateur voit son solde de crédits sous la forme d'un seul nombre, par exemple 10 000 crédits. Pourtant, si le système le gère lui aussi comme un unique balance, il devient très difficile d'appliquer correctement les politiques réelles de remboursement, d'expiration et de restriction par produit.

ZDP Money Platform gère les crédits sous forme de lots. Le nombre affiché à l'utilisateur est la somme de plusieurs lots, mais chaque dépense vérifie l'origine, la date d'expiration, le caractère remboursable et le périmètre de produits de chacun.

Cet article explique comment nous décidons de l'ordre de consommation des lots et pourquoi un lot expiré ne doit jamais être ignoré silencieusement, à partir de code Rust de production.

## Pourquoi le solde doit être divisé en lots de crédits

Lorsque les crédits sont gérés comme un seul nombre, la dépense est simple. Il suffit de soustraire le montant du solde. Les problèmes apparaissent ensuite.

Lors d'une demande de remboursement, il devient difficile de déterminer quelle part correspond réellement à des fonds achetés. À l'expiration d'une promotion, il est également difficile d'identifier le montant à supprimer. Le système ne peut pas non plus distinguer les crédits promotionnels limités à certains produits des crédits achetés ordinaires.

C'est pourquoi ZDP conserve les mêmes 10 000 crédits sous forme de plusieurs lots aux origines et propriétés différentes.

## Exemple de lots de crédits

| ID du lot | Finalité | Solde | Expiration | Remboursable |
| --- | --- | --- | --- | --- |
| signup_free | Récompense d'inscription | 3 000 | 2026-07-31 | Non |
| paid_bonus | Bonus d'achat | 2 000 | 2026-08-31 | Non |
| paid_base | Fonds achetés | 5 000 | - | Oui |

Dans ce modèle, l'ordre de consommation devient une politique produit. Il est généralement préférable pour l'utilisateur de consommer d'abord la valeur qui disparaîtra bientôt, comme les crédits proches de l'expiration ou non remboursables, et de préserver le principal remboursable aussi longtemps que possible.

L'implémentation actuelle trie les lots candidats dans l'ordre suivant.

Priorité de la politique → expiration la plus proche → date de création la plus ancienne → ID du lot

## Pourquoi ignorer un lot expiré est dangereux

Beaucoup de personnes se posent d'abord la même question.

« Pourquoi ne pas retirer le lot expiré des candidats et utiliser le suivant ? »

Ce schéma est dangereux, car il transfère silencieusement à l'utilisateur le coût d'un problème de données.

Si un lot gratuit reste Active après sa date d'expiration, le traitement de l'expiration est en retard ou le grand livre n'a pas été corrigé correctement. L'ignorer conduit le système à consommer à sa place les crédits achetés qui le suivent.

Le paiement réussit, mais l'utilisateur perd une valeur qu'il a directement achetée au lieu d'utiliser les crédits gratuits dont l'état aurait déjà dû être régularisé.

L'implémentation actuelle renvoie donc un échec explicite.

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

ExpiredLot n'est pas une erreur utilisateur ordinaire. Il s'agit d'une protection qui préserve le signal indiquant que le traitement de l'expiration et l'état réel du grand livre ont divergé. La couche appelante peut utiliser cette erreur pour déclencher une correction ou choisir une stratégie de nouvelle tentative explicite.

## Pourquoi la planification et le stockage valident séparément

La consommation de crédits comporte deux étapes principales.

La planification décide quels lots fourniront le montant demandé. Le stockage enregistre ensuite cette décision dans la base de données.

Un plan valide ne garantit pas que les données seront encore identiques au début de la persistance. Une autre requête peut avoir consommé le même lot en premier, ou l'instantané d'expiration du plan peut déjà être obsolète.

La frontière de persistance valide donc une nouvelle fois l'instantané juste avant l'enregistrement.

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

Les deux vérifications ont des objectifs différents. La première est une règle de domaine qui demande : « Ce lot peut-il devenir un candidat à la dépense ? » La seconde est une règle de la frontière de stockage qui demande : « Le plan que nous allons enregistrer se contredit-il lui-même ? »

L'une empêche une mauvaise décision. L'autre empêche un enregistrement incorrect.

## L'expiration commence à l'horodatage limite

Si un lot expire le 2026-07-31 à 00:00:00, une dépense effectuée exactement à cet instant doit être rejetée. L'implémentation considère le lot comme expiré lorsque expires_at est inférieur ou égal à occurred_at.

Le test fixe explicitement cette frontière.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

La comparaison actuelle repose sur l'ordre lexicographique des chaînes. Elle n'est sûre que si tous les horodatages utilisent la même représentation UTC canonique. Des décalages différents ou des fractions de seconde non normalisées peuvent rendre la comparaison incorrecte.

## Ce que cette modification ne résout pas

La validation de l'expiration ne résout pas tous les problèmes.

Concurrence : deux requêtes peuvent lire le même instantané et tenter de consommer le même lot au même moment. La base de données doit l'empêcher avec une mise à jour conditionnelle atomique, un verrouillage optimiste ou une stratégie de verrouillage adaptée.

Reprise opérationnelle : une hausse des erreurs ExpiredLot ne doit pas être considérée comme une série d'échecs utilisateur ordinaires. Le système doit permettre de déterminer si la cause est une tâche d'expiration en retard, un événement perdu ou une transition d'état invalide.

L'échec explicite vise finalement à rendre le problème observable et réparable.

## Conclusion

La consommation de crédits ressemble à une simple soustraction, mais il s'agit en réalité d'une politique qui décide quelle valeur utiliser en premier et quelle valeur protéger jusqu'au bout.

Une seule ligne de code qui ignore silencieusement un lot gratuit expiré peut consommer le solde acheté d'un utilisateur. Nous préférons donc nous arrêter précisément lorsque l'état est invalide plutôt que de forcer la réussite du paiement.

Nous pensons que ce choix finira par nous protéger lors d'un véritable incident de production.
