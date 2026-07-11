---
{
  "title": "Concevoir l'ordre de consommation des crédits",
  "summary": "Un solde unique affiché peut masquer de nombreux lots de crédits. Cet article s'appuie sur du code Rust de production pour expliquer l'ordre de consommation, le traitement de l'expiration et pourquoi un lot expiré resté dans un état obsolète doit provoquer un échec explicite.",
  "searchTags": ["crédits", "paiements", "grand livre", "expiration", "remboursements", "Rust", "lot de crédits"]
}
---
Un utilisateur voit un seul solde : 10 000 crédits. Pourtant, dans un système de paiement, traiter ce nombre comme un solde indifférencié devient vite problématique. Une récompense d'inscription de 3 000 crédits peut expirer ce mois-ci, 5 000 crédits achetés peuvent être remboursables et 2 000 autres crédits promotionnels peuvent n'être utilisables que pour certains produits.

ZDP Money Platform conserve donc le solde sous forme de lots de crédits. Le nombre affiché à l'utilisateur correspond à leur somme, mais la dépense tient toujours compte de l'origine, de l'expiration, du caractère remboursable et du périmètre de produits de chaque lot.

## Pourquoi un solde nécessite plusieurs lots

Une seule ligne de solde rend la soustraction facile : on déduit le montant et on passe à la suite. Les difficultés apparaissent plus tard. Une demande de remboursement ne peut pas distinguer de manière fiable les fonds achetés des promotions, et une tâche d'expiration ne peut pas savoir quelle partie du solde doit disparaître.

Avec des lots, les mêmes 10 000 crédits peuvent se présenter ainsi.

| lot | finalité | solde | expiration | remboursable |
| --- | --- | --- | --- | --- |
| signup_free | récompense d'inscription | 3 000 | 31 juillet | non |
| paid_bonus | bonus d'achat | 2 000 | 31 août | non |
| paid_base | fonds achetés | 5 000 | jamais | oui |

L'ordre de consommation devient alors une politique produit. Il est généralement plus avantageux pour l'utilisateur de consommer d'abord la valeur qui disparaîtra bientôt et de préserver le principal remboursable jusqu'à la fin. Notre implémentation trie les candidats selon la priorité, l'expiration, la date de création et l'identifiant du lot.

## Pourquoi ignorer silencieusement un lot expiré est dangereux

L'implémentation évidente consiste à retirer les lots expirés de la liste des candidats et à continuer avec le suivant.

Cette approche peut masquer un problème de données en le faisant payer à l'utilisateur. Si un lot gratuit reste Active avec un solde positif après son expiration, cela signifie que le traitement de l'expiration ou la correction du grand livre est en retard. L'ignorer silencieusement permet au système de consommer les crédits achetés qui le suivent. Le paiement réussit, mais l'utilisateur dépense de l'argent réel alors que la valeur promotionnelle obsolète reste inexpliquée.

L'implémentation actuelle échoue explicitement lorsqu'un lot Active, positif, applicable au produit et expiré est rencontré.

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

Cet échec n'est pas une friction défensive ajoutée pour elle-même. Il révèle un décalage entre le traitement de l'expiration et l'état du grand livre au lieu de basculer automatiquement vers la valeur payante. La couche appelante peut alors corriger l'état d'expiration ou relancer l'opération de manière délibérée.

## Pourquoi valider de nouveau à la frontière de stockage

Le domaine de dépense crée d'abord un plan décrivant les lots à consommer. Un plan valide ne garantit pas que ses données le seront encore au début de la persistance. Une autre requête peut avoir consommé le lot, ou l'instantané d'expiration joint au plan peut être incohérent.

Le planificateur de persistance vérifie donc à nouveau l'instantané d'expiration.

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

Ces vérifications ont des rôles différents. La première est une règle de domaine qui détermine quels lots peuvent devenir des candidats à la dépense. La seconde est un invariant de la frontière de stockage qui rejette un plan contredisant son propre instantané. L'une empêche une mauvaise décision ; l'autre empêche un enregistrement incorrect.

## L'expiration commence à l'horodatage limite

Si un lot expire à 00:00:00, une dépense effectuée exactement à 00:00:00 doit être rejetée. L'implémentation considère le lot comme expiré lorsque `expires_at` est inférieur ou égal à `occurred_at`, et le test fixe cette frontière.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

La comparaison actuelle repose sur l'ordre lexicographique des chaînes. Elle n'est sûre que si tous les horodatages suivent la même représentation UTC canonique. Si des décalages arbitraires ou des fractions de seconde normalisées différemment sont autorisés, une comparaison de chaînes ne suffit plus. Le contrat d'entrée doit rester strict, ou la frontière doit convertir les valeurs en un véritable type temporel avant de les comparer.

## Ce que cette modification ne résout pas

La validation de l'expiration ne résout pas les dépenses concurrentes. Deux requêtes peuvent lire le même instantané et tenter de consommer le même lot. La base de données doit toujours utiliser une mise à jour conditionnelle atomique ou une stratégie de verrouillage. La validation entre la planification et la persistance réduit les contradictions, mais ne peut pas éliminer seule les conditions de concurrence.

La reprise opérationnelle compte également. Une hausse des erreurs ExpiredLot ne doit pas être noyée parmi les échecs ordinaires des utilisateurs. Elle doit signaler une tâche d'expiration en retard, un événement perdu ou une transition d'état invalide. L'échec explicite existe pour que ce décalage puisse être observé et réparé.

La dépense de crédits ressemble à une soustraction, mais il s'agit en réalité d'une politique qui décide quelle valeur disparaît en premier et laquelle doit être protégée. Une seule ligne ignorant un crédit gratuit obsolète peut brûler le solde acheté d'un utilisateur. Dans cette situation, s'arrêter avec précision vaut mieux que forcer la réussite du paiement.
