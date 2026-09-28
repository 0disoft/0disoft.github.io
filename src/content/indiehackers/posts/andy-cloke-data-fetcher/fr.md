---
{
  "title": "Andy Cloke a créé Data Fetcher en vendant sous forme d'abonnement les connexions de données d'Airtable",
  "summary": "Comment Andy Cloke a transformé la tâche récurrente consistant à importer des données d'API externes dans Airtable en l'extension Data Fetcher, l'a financée grâce à la vente pour 55 000 dollars de son précédent annuaire TikTok Influence Grid, l'a fait croître jusqu'à 20 000 dollars de revenus récurrents mensuels en septembre 2023 puis 23 000 dollars en 2024, et l'a maintenue comme une activité d'une seule personne liée au marketplace d'Airtable."
}
---

## Transformer un problème de connexion de données dans Airtable en activité d'abonnement

Data Fetcher, le produit d'Andy Cloke, est une extension qui importe dans Airtable les données d'API de services externes. Une interview d'Indie Bites publiée le 28 septembre 2023 l'a présenté comme une activité ayant atteint 20 000 dollars de revenus récurrents mensuels (MRR). Il résolvait la gêne que ressentaient les utilisateurs d'Airtable pour collecter et actualiser des données, et a grandi jusqu'à devenir une activité d'abonnement qu'un développeur indépendant pouvait exploiter.

## Des premiers projets à l'idée Airtable

Cloke a étudié l'ingénierie à Oxford, puis a appris la programmation en autodidacte et a travaillé comme développeur dans des startups à Londres. Au début, il a créé un site d'apprentissage de l'espagnol et une application de quiz de football, mais l'expérience d'acquisition d'utilisateurs gratuits ne s'est pas traduite en revenus stables. Le passage par plusieurs projets lui a fait découvrir aussi bien la difficulté du développement que celle de la fidélisation des utilisateurs et de la monétisation.

Le premier produit à générer des revenus significatifs a été Influence Grid, un service d'annuaire permettant de trouver des influenceurs TikTok. Il l'a fait croître jusqu'à environ 3 000 dollars de MRR, puis l'a vendu pour 55 000 dollars au milieu de 2020. Le produit de la vente est devenu les fonds qui ont couvert les frais de vie et les coûts de serveur pendant qu'il développait son produit suivant.

En cherchant l'idée suivante, il a conçu une newsletter consacrée au calendrier des introductions en bourse. Il a tenté de gérer le contenu dans Airtable, mais il lui était difficile d'y importer facilement des données financières comme les cours boursiers. La gêne qu'il a rencontrée lui-même est devenue le point de départ de Data Fetcher.

La forme du produit s'est précisée à partir de l'API Connector pour Google Sheets qu'il a trouvé sur Product Hunt. Cloke a appliqué l'approche consistant à prendre un outil dont la demande était prouvée sur une plateforme mature et à le proposer sur une autre plateforme en forte croissance. Avec Influence Grid, il a transposé sur TikTok l'opportunité commerciale liée à Instagram, et avec Data Fetcher il a implémenté pour Airtable un outil de connexion d'API de Google Sheets.

À l'époque, il était déjà possible de connecter des données externes avec Zapier ou Integromat. La différence sur laquelle Cloke s'est concentré était le confort de configurer et d'exécuter des requêtes d'API sans quitter Airtable. Il a intégré une fonction qui faisait correspondre chaque élément de la réponse de l'API aux formats d'enregistrement et de champ d'Airtable, afin que les données importées entrent directement dans la table en cours de travail.

## Concevoir, tarifer et lancer sur le marketplace d'Airtable

La demande réelle ne s'est pas limitée à un seul secteur. Les clients importaient des cours boursiers, des taux de change, des prix de cryptomonnaies et des indicateurs marketing, et un cas a connecté le système de gestion client d'un vignoble. Au moment d'une interview de 2022, les applications que les utilisateurs avaient connectées dépassaient le millier. C'était une structure où un seul outil de connexion polyvalent absorbait à la fois de nombreux petits besoins métier.

Pour le développement initial, il a exploité son expérience préalable de React. La première version a d'abord implémenté la fonction centrale de connexion à l'API, et la validation par le marketplace a pris plus de temps que le développement. Comme les mises à jour exigeaient aussi une approbation, il a soigné les tests et la documentation d'aide avant le lancement. Pour une activité qui entre sur une plateforme, même le rythme de déploiement dépendait de procédures externes.

Le plan gratuit initial offrait 100 exécutions par mois, et les offres payantes commençaient à 12 dollars par mois. Il a regroupé l'augmentation du volume d'exécutions et les exécutions planifiées comme fonctions payantes, facturant l'actualisation récurrente des données. À l'époque, le marketplace d'Airtable n'avait pas de fonction de paiement, si bien que les abonnements étaient gérés via un site web séparé et Stripe.

Le 12 novembre 2020, il a annoncé le lancement sur le marketplace d'Airtable, et le 15 novembre il a partagé la nouvelle de la première conversion payante. Au moment de son lancement sur Product Hunt le 15 décembre de la même année, il avait enregistré plus de 300 utilisateurs, 10 clients payants et plus de 5 000 requêtes d'API cumulées. Il a confirmé l'usage réel sur le marketplace, amélioré le produit, puis élargi son exposition à une communauté de développeurs plus large.

La croissance initiale a été lente. Quand le MRR a stagné autour de 600 dollars, Cloke a repris le travail en freelance et a développé le produit le soir et le week-end. En juin 2021, lorsqu'il a atteint environ 2 500 dollars, il a aménagé souplement son planning de freelance, et à la fin de l'année il a terminé les missions qui lui restaient et est passé à plein temps.

## Croître grâce au marketplace et au contenu

Le cœur de l'acquisition de clients était le marketplace d'Airtable. Dans une interview de 2022, Cloke a expliqué qu'environ 70 à 80% des clients découvraient le produit à cet endroit. Il a renforcé la description des fonctions et les avis clients sur la page de la fiche et a ajouté la connexion avec Google pour réduire la gêne lors de l'inscription. Il a aussi indiqué que le taux de conversion de l'essai gratuit en client payant était alors d'environ 10%.

En dehors du marketplace, il a créé du contenu de blog et de YouTube expliquant des tâches précises des clients. Il a choisi des sujets dont le problème était clair, comme importer des cours boursiers ou des données Google Maps dans Airtable. Cloke a publié un cas où une vidéo d'environ 1 000 vues a apporté plus de 30 clients payants, ce qui montre que même un petit nombre de vues peut atteindre des utilisateurs à forte intention d'achat.

Le produit a aussi élargi son usage du public initial qui comprenait les API vers des personnes non développeuses. Il a proposé des connexions préconfigurées pour les services les plus utilisés, tandis que les utilisateurs avertis pouvaient travailler directement avec des API REST et GraphQL via Custom requests. Les connexions de base étaient faciles à démarrer, tout en conservant la souplesse nécessaire pour connecter des services absents de la liste préparée.

Dans une interview de mars 2022, il a publié 190 clients payants et 6 500 dollars de MRR, et en septembre de la même année il a annoncé avoir atteint 10 000 dollars de MRR. En mars, les coûts de serveur et d'outils de travail s'élevaient à environ 500 dollars par mois, et Cloke a décrit la marge bénéficiaire hors son propre salaire comme d'environ 90%. Ce chiffre ne déduisait pas encore le travail du fondateur, et ce point doit être inclus pour comprendre précisément la rentabilité de l'activité.

À mesure que l'exploitation s'accumulait, le traitement de données atypiques est aussi devenu un actif important. Il devait corriger des problèmes apportés par de vrais clients, comme des fichiers de réponse volumineux ou des formats CSV irréguliers, et les exécutions planifiées en échec entraînaient parfois des résiliations. Cloke considérait cette expérience accumulée de gestion des erreurs comme une partie difficile à copier pour la concurrence.

## Paliers, un deuxième produit raté et la dépendance à la plateforme

Même après avoir atteint 20 000 dollars de MRR, des stagnations sont apparues. Cloke a indiqué qu'à partir d'août 2023 les nouveaux abonnements et les résiliations se compensaient pendant environ cinq mois et que le taux d'attrition restait entre 10 et 11%. En décembre, il a appliqué une remise de 50% aux formules annuelles et a changé l'option par défaut de la page de tarifs pour la facturation annuelle. Il a rapporté qu'ensuite le taux d'attrition est tombé à 7% et que le MRR a de nouveau progressé.

Dans une interview de suivi en 2024, il a publié 23 000 dollars de MRR. Le seul opérateur à plein temps était Cloke, mais il recourait à des collaborateurs à temps partiel pour la production vidéo et le développement. Il a maintenu une exploitation à petite échelle tout en externalisant le travail spécialisé dont il avait besoin.

Les tentatives de vendre d'autres produits aux clients existants ont eu peu de succès. Charts & Reports, une extension de visualisation pour Airtable lancée sous la même marque, est resté à 300 dollars de MRR pendant environ un an. Cloke l'a jugé comme un deuxième produit lancé trop tôt et une dispersion de l'attention.

La dépendance à la plateforme est aussi apparue comme un risque réel. Cloke a expliqué qu'après qu'Airtable a exclu les extensions de son plan gratuit et modifié sa politique de tarification, les nouvelles inscriptions à Data Fetcher ont diminué. Il a également dû répondre à des changements dans les limites de l'API Airtable. La plateforme qui fournissait les clients déterminait à la fois l'accès à ces clients et les conditions d'exploitation du produit.

La portée commerciale de Data Fetcher tient au fait de s'être concentré sur une petite gêne que les personnes ayant déjà choisi un outil de travail subissaient encore et encore. Il a construit un flux consistant à rencontrer des clients sur le marketplace, à générer du trafic supplémentaire avec un contenu concret sur la manière de faire, et à facturer en continu l'actualisation des données. Ce cas montre qu'une fonction étroite à l'intérieur d'une plateforme peut devenir une activité indépendante, et il révèle aussi l'importance de la capacité opérationnelle à maintenir des connexions stables et un usage récurrent.
