---
{
  "title": "Pierre de Wulf a bâti ScrapingBee en vendant sous forme d'API l'infrastructure du web scraping",
  "summary": "Comment Pierre de Wulf et Kevin Sahin ont transformé l'exécution de navigateurs et la gestion de proxys du web scraping en API ScrapingBee, l'ont fait franchir le million de dollars d'ARR en novembre 2021 puis les 5 millions en 2024, et ont vendu l'entreprise à Oxylabs lors d'une opération à huit chiffres entièrement en numéraire."
}
---

## Transformer la charge opérationnelle récurrente d'un développeur en activité d'API

Pierre de Wulf a créé avec Kevin Sahin ScrapingBee, un service d'API de web scraping. Le produit prend en charge, pour le compte du client, l'exécution des navigateurs et la gestion des proxys nécessaires pour collecter des données sur les pages web. Une interview publiée en avril 2022 l'a présenté comme un cas ayant atteint 1 million de dollars d'ARR, et l'attention s'est portée sur le fait que les deux cofondateurs l'avaient fait grandir après l'échec d'une activité précédente.

## Le problème découvert en créant un service de suivi des prix

Avant ScrapingBee, les deux exploitaient ShopToList, une extension de suivi des prix pour particuliers. Elle permettait d'enregistrer des produits qui intéressaient l'utilisateur et de consulter les variations de prix, mais le nombre d'utilisateurs et la structure de revenus ne s'accordaient pas. En revenant plus tard sur cette activité, Pierre a expliqué qu'atteindre le seuil de rentabilité aurait exigé bien plus d'utilisateurs que ceux réellement acquis.

Leur produit suivant, PricingBot, était un outil de suivi des prix des concurrents destiné aux acteurs du commerce en ligne. Ils pensaient que vendre à des clients professionnels faciliterait la monétisation, mais il n'a pas réussi à croître suffisamment en neuf mois environ. Les deux n'avaient pas bien compris la situation du secteur du commerce en ligne, les lieux où se réunissaient leurs clients ni ce qui motivait réellement un achat. Ils ont vendu PricingBot et décidé que leur produit suivant viserait des clients qu'ils connaissaient bien.

Les outils externes de scraping qu'ils utilisaient en développant PricingBot sont devenus l'indice de la nouvelle activité. Pierre était mécontent de la vitesse et des performances des outils existants et a jugé qu'il y avait de la place pour améliorer dans un marché où des offres payantes existaient déjà. Tous deux étaient développeurs, et Kevin avait même écrit un livre sur le web scraping, si bien que cette fois ils pouvaient comprendre directement le travail et les difficultés du client.

## Transformer l'exploitation des navigateurs et des proxys en produit

L'utilisateur de ScrapingBee transmet à l'API l'adresse de la page à collecter et les options nécessaires. Le service traite le JavaScript avec un navigateur sans interface, gère les proxys et renvoie le contenu de la page ou les données extraites. Il peut servir aux travaux qui demandent de rassembler des informations de façon répétée sur de nombreux sites, comme des prix de produits, des résultats de recherche ou des offres d'emploi. Les clients allègent la charge de faire tourner eux-mêmes l'infrastructure de collecte et relient les données obtenues à leurs propres produits ou à leur travail.

Le modèle de revenus regroupe des crédits d'API et une limite de requêtes simultanées dans un abonnement mensuel. La consommation de crédits varie selon les fonctions dont une requête a besoin, de sorte que le travail dont le traitement coûte plus cher est facturé avec plus d'usage. Dans la documentation officielle consultée en septembre 2026, par exemple, une requête de base avec un proxy standard coûte 1 crédit, l'ajout du rendu JavaScript coûte 5 crédits, et l'usage d'un proxy premium avec le rendu coûte 25 crédits. Dans cette structure, tant le nombre de requêtes que la difficulté de traitement pèsent sur le choix de formule du client.

Le produit initial a été fourni à une dizaine d'utilisateurs d'essai gratuit recrutés sur des forums de scraping et dans des communautés proches. En juin 2019, ils ont mis fin à l'essai gratuit et prévenu qu'un abonnement serait nécessaire pour continuer à l'utiliser. Le premier paiement est arrivé 50 minutes après l'envoi du premier e-mail d'information, ce qui leur a donné un signal qu'il existait une réelle intention de payer pour un outil encore en développement.

## Attirer des clients par la recherche et gagner de la marge avec un capital externe

Le contenu technique a porté ses fruits tôt dans l'acquisition de clients. Un guide publié en août 2019 sur la façon de résoudre les blocages du web scraping a été partagé à plusieurs endroits et a rapidement attiré environ 20 000 visiteurs. Un article qui expliquait en détail un problème que les développeurs cherchaient à résoudre sur le moment est devenu un canal de promotion du produit.

Ils ont aussi utilisé le volume d'usage du produit pour les entretiens avec les utilisateurs. En offrant 10 000 appels à l'API à quiconque consacrerait 15 minutes à parler de ses besoins de scraping, ils ont pu échanger avec une centaine de personnes en moins de trois mois. En donnant aux gens une raison d'accepter l'entretien, ils ont recueilli rapidement les objectifs réels et les difficultés des clients.

Au printemps 2020, ils ont rejoint le deuxième programme d'accélération de TinySeed et ont reçu un capital externe. TinySeed est un programme qui offre du capital, du mentorat et une communauté de fondateurs, tout en donnant du poids au contrôle du fondateur et à une croissance économe en capital. ScrapingBee a le caractère d'un petit SaaS qui a grandi en combinant la cofondation et le soutien d'un investisseur.

Dans une interview ultérieure, Pierre a souligné le soulagement psychologique qu'a apporté l'investissement. Même s'ils n'ont pas dépensé directement l'argent levé, le fait de disposer de suffisamment de trésorerie leur a permis de sortir d'une situation où ils craignaient les petites dépenses et repoussaient les décisions. Il a rappelé que les conseils d'experts, le mentorat et les liens avec d'autres fondateurs qui accompagnaient l'investissement ont aussi été un soutien important.

Au fil de la croissance, Kevin s'est occupé du marketing et Pierre du produit et de la technique, en se répartissant les rôles. Pour la production de contenu, ils ont intégré des développeurs capables d'écrire et mis en place un dispositif où un éditeur soignait les phrases et la structure. Pierre a décrit le rythme de publication de l'époque comme d'environ trois à quatre articles par mois, et ils ont accumulé des tutoriels approfondis par langage, framework et bibliothèque. En s'éloignant du modèle où les deux fondateurs écrivaient tous les articles, ils ont pu élargir leur trafic de recherche.

L'amélioration du produit s'est concentrée sur la réduction des difficultés du développeur qui l'utilisait pour la première fois. En 2020, ils ont ajouté des SDK Python et JavaScript, des exemples de code en sept langues et un générateur de requêtes API. C'était un travail visant à raccourcir le chemin entre l'arrivée d'un développeur par une recherche et la confirmation d'un résultat de collecte réel.

## D'un million à cinq millions de dollars d'ARR

Il a fallu environ 18 mois pour atteindre 10 000 dollars de MRR, le revenu récurrent mensuel, fin 2020. À ce niveau, les deux fondateurs pouvaient se verser une rémunération proche de celle de leurs emplois précédents, et l'activité était rentable. Porter les revenus à 20 000 dollars de MRR a pris environ trois mois de plus, et ils ont réellement franchi le million de dollars d'ARR en novembre 2021. Le cas de croissance présenté en 2022 porte sur ce record, atteint environ deux ans et demi après le lancement.

Dans un texte publié en 2025, Pierre a indiqué qu'ils avaient dépassé les 5 millions de dollars d'ARR l'année précédente, en 2024. À ce moment-là, l'équipe principale comptait six personnes : deux cofondateurs, un développeur, deux personnes au support client et une personne au référencement. Ils collaboraient aussi avec des freelances externes pour le design, des travaux d'infrastructure spécialisés et la production de contenu. Le résultat est donc venu d'une structure d'exploitation qui combinait une petite équipe à temps plein et des spécialistes externes.

Garder une équipe réduite avait aussi un coût. Dans une interview de 2024, Pierre a dit qu'avec peu de personnes la charge pèse sur le temps et l'énergie des cofondateurs, et qu'assumer plusieurs tâches à la fois limite aussi la qualité. Il a expliqué qu'ils devaient ajouter des personnes et améliorer l'exploitation, même au prix d'une partie de la rentabilité. Il était difficile de juger la charge de travail réelle du fondateur à partir de seuls revenus élevés et d'un effectif réduit.

## La mise au propre opérationnelle qui a rendu la vente possible

Les préparatifs de la vente ont aussi fait apparaître des risques propres à une activité de web scraping. Selon Pierre, alors que la première procédure de vente était en cours, ils ont reçu d'une grande entreprise technologique une mise en demeure de cesser le scraping et ont dû interrompre l'opération. Avant de réessayer, ils ont procédé à des recrutements supplémentaires, à une standardisation du travail, à une documentation de l'exploitation et à une remise en ordre de la comptabilité. Au-delà des performances du produit et des revenus, l'acquéreur avait besoin d'un système d'exploitation et d'une réponse au risque qu'il pouvait examiner.

La décision de vendre des deux fondateurs reposait sur la fatigue accumulée à travailler longtemps dans le même domaine et sur un changement de priorités de vie. Ils ont ajouté qu'ils voulaient exercer leur option alors que les revenus et la croissance étaient en bonne forme. Parmi plusieurs offres d'acquisition, ils ont choisi Oxylabs parce que c'était une entreprise qui comprenait les caractéristiques et les risques du secteur du scraping et parce que l'opération était entièrement en numéraire.

Le 19 juin 2025, TinySeed a annoncé que ScrapingBee avait été rachetée par le groupe Oxylabs. L'opération a été divulguée comme une vente entièrement en numéraire à huit chiffres en dollars, ce qui correspond à au moins 10 millions de dollars. Le prix exact de l'acquisition et ce qu'a reçu chaque cofondateur ne sont pas confirmés dans les documents publics.

Dans l'annonce de la vente, ils ont indiqué que ScrapingBee continuerait d'opérer comme produit et société distincts, et que Pierre et Kevin resteraient dans l'entreprise. La société a décrit une orientation consistant à tirer parti de l'infrastructure et de l'expertise du groupe pour améliorer les performances et renforcer l'équipe de support client. C'était une opération qui développait au sein d'une organisation d'exploitation plus grande un produit créé par une petite équipe.

ScrapingBee montre que même une API au périmètre étroit peut devenir une activité logicielle substantielle si elle allège suffisamment la charge opérationnelle récurrente d'un client. Pendant la croissance, un produit facile à utiliser et une acquisition constante de clients ont compté, et au stade de la vente, la maturité de l'activité, avec documentation d'exploitation, comptabilité et réponse au risque, a été nécessaire. Les deux fondateurs ont bâti ces conditions en ajoutant à leurs compétences de développement la production de contenu, un personnel spécialisé et le soutien d'un investisseur, l'un après l'autre.
