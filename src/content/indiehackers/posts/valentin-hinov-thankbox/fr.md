---
{
  "title": "Valentin Hinov a transformé la carte de bureau en activité avec Thankbox",
  "summary": "Comment Thankbox a transformé les cartes papier de bureau en un service en ligne pour les messages et les collectes de cadeaux, a trouvé des clients payants grâce à un positionnement plus clair et à des annonces de cartes de groupe en ligne, a géré la fraude sur les paiements de cadeaux et les coûts de stockage, a augmenté la conversion d'inscription et les ventes de forfaits, et est devenu une entreprise familiale avec une tarification à la carte, par forfaits et par équipe."
}
---

## Acheter encore et encore une seule carte de félicitations

Thankbox, de Valentin Hinov, est un service de cartes en ligne qui rassemble les messages de nombreuses personnes et collecte une contribution pour un cadeau, puis les remet ensemble. Dans un entretien de juin 2022, il a indiqué des ventes mensuelles habituelles d'environ 25 000 dollars. Le service a grandi en vendant une carte à chaque occasion, comme un anniversaire, un départ ou un départ à la retraite.

Hinov a grandi en Bulgarie, a étudié la programmation de jeux en Écosse, puis a développé des jeux et des applications mobiles. En 2016, il a créé avec un cofondateur une application de réseau social qui recommandait du contenu, mais le produit était trop vaste pour deux personnes. Ils manquaient aussi d'un plan de monétisation et ont épuisé leur argent, et cette expérience l'a conduit à étudier des activités qu'il pouvait mener à petite échelle.

L'idée de Thankbox est venue d'une gêne qu'il rencontrait sans cesse en travaillant comme développeur sous contrat dans différentes entreprises. Pour marquer l'anniversaire ou le départ d'un collègue, quelqu'un devait acheter une carte en papier, faire le tour du bureau pour recueillir les signatures et rassembler de l'argent liquide pour un cadeau. Ceux qui étaient absents pouvaient difficilement participer, et celui qui n'avait pas de liquide devait aller en retirer. En novembre 2019, il a imaginé un service qui gérait les messages et les contributions ensemble, en ligne.

Au début, le travail sous contrat et d'autres activités l'empêchaient d'avancer. Quand le télétravail s'est répandu en mars 2020, la routine de la carte en papier a laissé un vide, et Hinov a précipité le lancement. Le premier produit, au périmètre réduit, est sorti deux mois plus tard, en mai 2020.

La première version a impliqué la designer Barbara et le développeur web Joe. Hinov a payé le design et a conclu avec Joe un accord pour partager un an de revenus une fois le produit parvenu à un certain niveau de ventes, ce qui a réduit le coût de développement initial. Hinov, qui avait peu d'expérience du développement web, a appris auprès de Joe et a repris la gestion du code.

La configuration technique initiale est restée simple, autour de Laravel, Vue et MySQL. Selon les notes de développement qu'il a publiées, l'application web et la base de données tournaient sur un seul serveur DigitalOcean à 10 dollars par mois. Le critère de choix des outils était de pouvoir créer et corriger des fonctionnalités rapidement, et il a aussi utilisé des outils existants pour le déploiement et l'administration du serveur.

## Réduire l'effort de la personne qui crée la carte

Le parcours d'usage s'organise autour d'une seule carte. L'organisateur fixe le destinataire et un titre et partage un lien, et les collègues ou amis ajoutent des messages, des photos et des GIF. Au besoin, ils organisent aussi une collecte de cadeau, et la carte terminée est envoyée tout de suite ou programmée. L'organisateur commence à écrire la carte et paie quand elle est prête à être envoyée.

Les prix initiaux étaient de 5,99 dollars pour une carte standard et de 9,99 dollars pour une carte premium, et dans un entretien de 2023, il a dit que ces prix étaient restés inchangés depuis le lancement. Le nombre de personnes écrivant des messages sur une carte n'était pas limité, il n'était donc pas nécessaire de facturer par participant. Ceux qui préparaient un événement occasionnel achetaient carte par carte, tandis que les clients réguliers en achetaient plusieurs en forfaits prépayés.

Les ventes du premier mois ont été de six, et le chiffre d'affaires cumulé jusqu'à fin août 2020 n'a atteint que 350 dollars. Même sans compter son propre travail, le service perdait plus de 1 200 dollars par mois. Il devait transformer les retours positifs des utilisateurs en acquisition de nouveaux clients.

Des publicités sur les réseaux sociaux et de la promotion sur LinkedIn ont été testées, mais avec peu de résultat. L'équipe a retravaillé la page d'accueil pour que les nouveaux visiteurs comprennent vite à quoi sert le service, et en octobre 2020, elle a ajouté des annonces sur des termes de recherche comme « carte de groupe en ligne ». La création de cartes, qui était d'environ trois ou quatre par jour, est passée à plus de trente par jour en novembre. La croissance a changé de rythme après avoir modifié ensemble la description du produit et les voies par lesquelles les clients le trouvaient.

Thankbox est devenu rentable environ huit mois après le lancement, et le chiffre d'affaires annuel de 2021 a atteint 140 000 dollars. Environ un an et demi après le lancement, il a pu se verser une rémunération supérieure à son précédent travail de développement sous contrat.

En 2022, 35 à 40 pour cent des ventes mensuelles venaient de clients existants, et environ 30 pour cent des nouveaux clients arrivaient par recommandation. Une personne qui avait participé à la carte d'un collègue devenait l'acheteur de l'occasion suivante, si bien que les rachats et les présentations s'accumulaient même avec des ventes à la carte.

La dépendance aux annonces Google était également forte. En 2022, les dépenses publicitaires étaient d'environ 150 dollars par jour, son poste le plus important, et environ cinq personnes externes à temps partiel s'occupaient du design, du développement, du support client et du marketing. À mesure que les ventes augmentaient, il fallait aussi gérer les coûts d'acquisition de clients et d'exploitation du service.

## Un service qui doit gérer l'argent des cadeaux et les frais de stockage

La collecte de cadeau a élargi l'usage du produit, mais a aussi apporté un risque de paiement. En juin 2021, une fraude s'est produite : de l'argent collecté avec une carte de crédit volée a été retiré sous forme de carte cadeau. Après avoir repéré la transaction suspecte, Hinov a suspendu les versements par carte cadeau et remboursé les transactions suspectes. La perte, frais de litige compris, s'est élevée à environ 3 000 dollars.

Il a ensuite mis en place un processus pour évaluer le risque de chaque collecte et approuver ou refuser les plus suspectes. Il a aussi renforcé les règles de blocage à l'étape du paiement avec Stripe Radar. L'incident a montré la responsabilité de gérer l'argent des cadeaux depuis son entrée jusqu'à son versement au destinataire. Derrière la simplicité de la vente d'une carte se cachait un travail opérationnel : versements, remboursements et réponse à la fraude.

Conserver longtemps une carte bon marché impliquait aussi de gérer les coûts de stockage. Hinov a d'abord stocké les images téléchargées sur Cloudinary, mais il a constaté que garder les images anciennes faisait grimper la facture. Il a ensuite déplacé les médias de plus de 30 jours vers un stockage S3 moins cher. C'était une conception qui intégrait dans les coûts la baisse des consultations après l'envoi d'une carte.

## Affiner le parcours d'achat et s'ouvrir aux clients organisationnels

Dans un entretien de suivi de 2023, il a rapporté des ventes mensuelles moyennes d'environ 35 000 dollars. Sur un marché plus concurrentiel, il s'est concentré sur l'élargissement du trafic de recherche et l'amélioration du parcours d'achat. Il a établi un plan à long terme avec un spécialiste du SEO et augmenté le contenu, et dans l'entretien, il a dit que le trafic du site avait augmenté de 200 pour cent en un an.

Le parcours d'inscription a aussi été retravaillé. Début 2023, il a mené une dizaine de tests comparatifs sur six à huit semaines, et il a dit que deux d'entre eux avaient contribué à faire passer la conversion d'inscription de 15 à 30 pour cent. Ils ont réduit les étapes, transformé une partie du texte en images et montré aux utilisateurs directement à l'écran à quoi ressemblerait leur carte.

Un changement similaire est apparu dans la vente de forfaits prépayés. Auparavant, les clients devaient suivre un petit message sur l'écran de paiement vers une page de tarifs séparée, mais le changement leur a permis de choisir et de payer un forfait sur place. Selon Hinov, les ventes de forfaits ont augmenté de 180 pour cent en un mois. Cela a aussi incité à revenir les clients qui avaient déjà une carte pour un événement à venir.

À mesure que l'activité grandissait, le rôle de Hinov lui-même a changé. Dans une publication de septembre 2024, il a écrit que le temps consacré au budget publicitaire, au support client, au marketing et à la gestion des personnes avait réduit son temps de développement direct à environ 20 pour cent. Pour retrouver sa satisfaction au travail, il a réservé au moins quatre heures sans interruption pour développer les mardis et vendredis. Il a ensuite ramené le développement à environ 40 pour cent et équilibré l'exploitation et la création.

Dans la présentation officielle de septembre 2026, Thankbox fonctionne comme une entreprise familiale dirigée par Hinov et son épouse Tsvetelina Hinova. Les chiffres cumulés publiés sont plus de 300 000 cartes envoyées, plus de 6 millions de messages et plus de 19 millions de livres de cadeaux remis. Le montant des cadeaux correspond ici au total que les clients ont collecté et transmis, il faut donc le distinguer du chiffre d'affaires du service.

La façon de vendre s'est aussi élargie. La grille tarifaire officielle à la même date présente des achats à la carte et des forfaits prépayés, ainsi qu'un forfait équipe illimité utilisé par toute l'organisation. La configuration permet à chacun, du particulier qui envoie une carte de temps en temps à l'organisation qui gère les événements de plusieurs services, de choisir selon sa fréquence d'achat. Elle est passée des ventes initiales à la carte à une demande acceptée aussi au niveau organisationnel.

La viabilité de Thankbox se lit dans la rencontre entre le prix bas d'une seule carte et la demande récurrente d'organisations qui gèrent les occasions de nombreuses personnes. Elle a maintenu faible la charge d'un seul achat et a offert des forfaits prépayés et un forfait équipe aux clients qui l'utilisaient souvent. C'est un cas d'élargissement des options d'achat pour que la préparation d'une célébration mène à la commande suivante.
