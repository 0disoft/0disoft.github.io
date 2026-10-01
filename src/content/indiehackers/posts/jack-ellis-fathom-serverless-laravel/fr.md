---
{
  "title": "Jack Ellis a fait d'un service d'analyse web et d'un cours pour développeurs deux activités",
  "summary": "Le parcours de Jack Ellis, cofondateur technique de Fathom Analytics, qui a transformé son expérience d'exploitation en cours pour développeurs, Serverless Laravel. Le texte distingue les revenus d'abonnement du service d'analyse des ventes cumulées du cours, et revient sur le rachat des parts du cofondateur ainsi que sur la refonte technique."
}
---

Jack Ellis est cofondateur du service d'analyse web axé sur la confidentialité Fathom Analytics et créateur du produit de formation pour développeurs Serverless Laravel. Avec Fathom, il fournit un service d'analyse aux exploitants de sites web ; avec son cours, il a appris aux développeurs à déployer et à faire monter en charge une application. Les deux activités découlent de la même expérience technique, mais il faut distinguer leurs clients, leur mode de facturation et leurs résultats de vente.

## D'un échec en solo à la cofondation

Originaire du Royaume-Uni, Ellis a appris le développement web, et notamment PHP, dès l'âge de treize ans. Après avoir commencé à travailler, il voulait toujours créer sa propre entreprise : en 2013, à vingt ans, il a quitté son emploi et s'est lancé dans le développement de Raw Gains, une application de musculation et de coaching. Il a construit seul un service qui gérait les nutriments d'un régime et un plan d'entraînement et partageait ces informations avec un coach, en espérant gagner de l'argent avec des abonnements et des ventes d'affiliation.

Le problème venait moins de ses compétences techniques que de l'ordre dans lequel il menait le projet. Il s'est acharné sur les détails de conception et de design et a mis plus d'un an avant de publier le produit. Il s'attendait à ce que les gens viennent une fois le lancement fait, mais il manquait de stratégie pour recruter des clients, et il a reconnu par la suite qu'il aurait dû publier une petite version du cœur du produit et observer les réactions.

Le point de départ de Fathom n'est pas venu d'Ellis mais de l'idée de Paul Jarvis. En avril 2018, Jarvis a dévoilé les écrans d'un outil d'analyse web simple et fiable, puis a construit avec Danny van Kooten une version open source et une version hébergée payante. Le retrait de Danny, qui voulait se concentrer sur une autre activité, a rendu la survie du service incertaine, et Ellis l'a rejoint comme cofondateur technique au début de 2019.

À l'époque, Ellis et Jarvis développaient aussi Pico, une plateforme de publication. Mais plutôt que de miser sur un nouveau projet qui n'avait que des inscrits sur liste d'attente et aucun revenu, ils ont choisi de se concentrer sur Fathom, qui comptait déjà des clients payants.

Cette collaboration a permis à Ellis de combler ce qui lui manquait en solo. Jarvis était fort en design et en marketing, Ellis en développement logiciel et en exploitation d'infrastructure. Lui qui voyait auparavant la cofondation comme une perte de contrôle et de revenus a reconnu, en repensant à l'échec de Raw Gains, que cette idée l'avait retenu trop longtemps.

## Un logiciel qui vend la confidentialité et la tranquillité d'exploitation

Fathom est un produit qui présente sobrement les statistiques utiles à l'exploitation d'un site : nombre de visiteurs, pages vues, sources de trafic. Plutôt que d'empiler sans fin des fonctionnalités, il a fait d'une interface facile à comprendre et de la protection de la vie privée ses différences. Même lorsqu'il examine les demandes de fonctionnalités des clients, le respect de la simplicité du produit et des principes de confidentialité reste un critère important.

Cela dit, le fait de ne pas utiliser de cookies ne signifie pas qu'aucune donnée n'est traitée. Fathom explique qu'il calcule, à partir de l'adresse IP et des informations du navigateur, un identifiant de visiteur propre à chaque site qui change chaque jour, et qu'il ne stocke pas l'adresse IP d'origine dans un champ distinct des relevés d'analyse ordinaires. C'est une conception qui limite le suivi des visiteurs sur la longue durée tout en fournissant les statistiques nécessaires à l'exploitation du site.

Le modèle de revenus ne consiste pas à vendre les données des utilisateurs, mais à faire payer aux exploitants de sites un droit d'usage du logiciel. Dans la grille tarifaire consultée le 1er octobre 2026, la tranche de 100 000 pages vues par mois coûte 15 dollars par mois, avec 50 sites inclus par défaut et la possibilité d'acheter des sites supplémentaires séparément. L'entreprise souligne qu'elle fonctionne sans investissement externe, grâce aux seuls frais payés par ses clients.

La valeur d'un produit payant ne tient pas seulement à son écran de statistiques. Si un client exploite lui-même un outil d'analyse open source, il doit aussi installer le serveur, gérer la base de données, contrôler la sécurité et réagir aux pannes. Fathom s'occupe de ces tâches à sa place, ce qui peut en faire un service payant qui fait gagner du temps même à un développeur capable de tout installer lui-même.

## Refonte technique et acquisition de clients

Après son arrivée, la première chose qu'Ellis a touchée a été l'architecture technique existante. Fathom était au départ écrit en Go, mais il a refait le produit payant Fathom Pro avec Laravel, un framework PHP qu'il maîtrisait. Plutôt que de faire du choix d'un nouveau langage un avantage concurrentiel, il a choisi la technologie qui lui permettait d'améliorer le produit rapidement et de l'exploiter de manière responsable.

La migration de l'infrastructure ne s'est pas faite en une seule fois. Il est d'abord passé d'une architecture centrée sur des serveurs dédiés à Heroku, capable de monter en charge automatiquement, et a séparé l'API, la collecte de données et la facturation pour pouvoir les faire évoluer séparément. Ensuite, avec l'adoption de Laravel Vapor, il est passé à une exploitation sans serveur sur AWS, et l'expérience accumulée dans cette étape est devenue plus tard la matière du cours.

Pour les premiers clients, les abonnés à la newsletter et les followers Twitter que Jarvis possédait déjà ont joué un rôle important. La sortie en open source et le lancement sur Product Hunt ont aussi attiré l'attention, mais les fondateurs ont expliqué que la notoriété et le nombre de clients s'étaient accumulés régulièrement plutôt que d'exploser à cause d'un événement précis. Lire Fathom comme un succès obtenu en fabriquant un produit sans public préexistant ni canal de distribution fait donc manquer ses conditions de départ.

Au fil de la croissance, les contenus qui dévoilaient l'expérience réelle d'exploitation ont pris de l'importance. Les articles techniques, comme le récit d'une attaque DDoS, et le podcast Above Board, consacré à la gestion d'une entreprise, mettaient en avant ce qu'un lecteur pouvait apprendre plutôt que la publicité du produit. En y ajoutant d'autres canaux, comme un programme d'affiliation, ils ont cherché à bâtir une marque de produit qui ne dépende pas seulement de la notoriété personnelle des fondateurs.

## Transformer l'expérience d'exploitation en cours pour développeurs

La demande pour Serverless Laravel est apparue quand Ellis a commencé à exposer publiquement les problèmes techniques de Fathom et la façon dont ils les avaient résolus. Devant les questions et les e-mails des développeurs, il a décidé de transformer son expérience d'exploitation en un produit de formation structuré.

Le cours s'adressait moins à ceux qui apprennent la syntaxe de PHP pour la première fois qu'aux développeurs qui veulent exploiter une application Laravel en véritable service. La plateforme utilisée, Laravel Vapor, est un service de déploiement sans serveur sur AWS, et le produit créé par Ellis est un cours qui enseigne comment l'exploiter. Le contenu couvrait non seulement le déploiement, mais aussi la latence de la première réponse, la montée en charge de la base de données, l'anti-double-exécution des tâches, la gestion des pannes et la maîtrise des coûts.

Dans le support promotionnel publié en mai 2021 par Laravel News, le cours comptait 49 leçons et était vendu 249 dollars. L'acheteur recevait aussi une communauté Slack privée, des supports complémentaires à venir et des mises à jour à vie. Contrairement à Fathom, qui fournit un service d'analyse chaque mois, il s'agissait d'un produit de formation qui vend un ensemble de connaissances.

Pour préparer la vente, il a constitué une liste d'attente et publié de courtes astuces techniques ainsi que le processus de fabrication. Il a continué à promouvoir le cours après son lancement et n'a pas considéré la vente comme terminée par une seule annonce. L'ordre était différent de celui de Raw Gains, où les utilisateurs n'avaient été cherchés qu'une fois le produit fini.

Dans l'interview d'Indie Bites publiée le 28 octobre 2021, Ellis a indiqué que les ventes cumulées du cours atteignaient 150 000 dollars depuis son lancement en mars 2020. Ce montant n'est ni le revenu récurrent mensuel ni annuel de Fathom, ni le chiffre d'affaires mensuel du cours. Il n'a pas été présenté comme un bénéfice net après déduction des coûts et des impôts ; c'est un chiffre que le fondateur a lui-même rendu public dans l'interview.

Ellis a expliqué que les revenus du cours l'avaient aidé à réduire ses missions de conseil et à se concentrer sur Fathom. Alors que Fathom ne compensait pas encore immédiatement ses revenus de conseil, les ventes d'un produit séparé ont amorti le creux de revenus de cette période de transition.

## Propriété et croissance après la cofondation

La structure de propriété de Fathom a connu un changement important en 2024. Ellis a racheté les parts de Jarvis, qui voulait prendre sa retraite, et depuis le 1er décembre 2024, Ellis possède et contrôle l'entreprise en totalité. Le titre de l'article publié le lendemain annonçait une acquisition de l'entreprise, mais il s'agissait d'un arrangement de propriété entre cofondateurs, non d'une vente à une société externe, et le prix n'a pas été communiqué. Jarvis a continué par la suite à aider au design en freelance à temps partiel.

En 2026, Fathom a bougé dans l'autre sens, en rachetant un autre service d'analyse. Le 15 avril 2026, il a acquis Gauges, un service d'analyse web en temps réel, la transaction ayant été déclenchée par les demandes de migration de clients dont le service allait fermer. Dans une mise à jour du 21 août 2026, l'entreprise a indiqué avoir transféré les clients et les données historiques vers Fathom ; la croissance ne passe donc plus seulement par l'arrivée de nouveaux inscrits, mais aussi par le rachat d'une base de clients existante.

L'architecture technique n'est pas restée, elle non plus, à l'état décrit dans l'ancien cours. Dans un article publié en juillet 2026, Ellis explique avoir migré plus de 65 milliards d'enregistrements de données et avoir séparé les données d'analyse vers ClickHouse et les données de transaction et d'exploitation vers PlanetScale. C'est moins le cas d'une technologie conservée durablement que celui d'une architecture qu'il a rebâtie lorsque l'échelle et les besoins de l'entreprise ont changé.

Dans le cas d'Ellis, l'essentiel n'est pas une formule selon laquelle ajouter un cours à un logiciel augmenterait automatiquement les revenus. Fathom vendait la commodité d'exploiter un système d'analyse à la place du client, et Serverless Laravel vendait un savoir qui aidait les développeurs à résoudre des problèmes d'exploitation comparables. Une même expertise peut donner des produits distincts selon la charge qu'elle enlève et à qui ; c'est la raison de regarder ces deux activités ensemble.
