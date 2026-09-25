---
{
  "title": "Créer un service pour les chercheurs d'emploi tout en gardant son travail : Erik Chavez et Jobric",
  "summary": "Comment Jobric, conçu pendant qu'Erik Chavez travaillait chez Microsoft, est passé d'un service de recommandations qui fait gagner du temps aux chercheurs d'emploi à une activité payante avec des clients."
}
---

## Lancer un service d'emploi sans quitter son poste

En juin 2026, Erik Chavez travaillait comme architecte de solutions senior chez Microsoft tout en exploitant Jobric, un service destiné aux chercheurs d'emploi. Il a investi son temps et son argent dans le développement, et les journées à mener de front son emploi et son activité allaient souvent de 5 heures du matin à 22 heures. Sans quitter son employeur d'abord, il a bâti une activité qui aide les salariés à changer de poste.

Le point de départ était une personne proche épuisée par son travail. Elle voulait quitter son poste actuel, mais manquait de temps et d'énergie pour chercher autre chose, et les outils existants ne l'aidaient pas assez. Chavez a commencé à créer un outil qui trouve des occasions adaptées à cette personne. Le problème que Jobric voulait résoudre était celui-ci : se renseigner sur un meilleur emploi devient lui-même une charge supplémentaire.

L'utilisateur dépose son CV et définit ses critères. Jobric examine les offres de plusieurs plateformes d'emploi, puis recommande des postes correspondant à l'expérience, aux compétences et aux préférences, et explique le degré de correspondance. Après avoir vu quels critères sont remplis et lesquels manquent, l'utilisateur décide s'il postule. Le service ne propose pas de fonction d'envoi massif et automatique de candidatures.

## La justesse des recommandations et les coûts d'exploitation

En testant avec son propre CV, Chavez a reçu des recommandations pour des postes dont il n'aurait pas cherché le titre spontanément. L'envie de postuler lui-même lui a donné une raison de montrer l'outil à d'autres.

Le problème est apparu avec le CV d'un ami. Le système a interprété comme agent de sécurité le titre « Security Officer » d'un ami qui travaille dans la cybersécurité. Chavez a consacré du temps et de l'argent au début à étudier les données et à valider avec des CV variés pour distinguer les intitulés de poste des fonctions réelles.

Son expérience de plus de 15 ans dans le cloud et les plateformes a servi à réduire les coûts d'exploitation. Pour le travail de classification en volume, il utilisait de petits modèles de langage qu'il exploitait lui-même, et confiait le raisonnement complexe à des modèles performants. Le coût fixe de ses petits modèles, tel qu'il l'a publié, tournait autour de 20 dollars par mois.

La recommandation d'offres et l'analyse de correspondance ont été séparées en services indépendants qui s'exécutent à la demande. Ils sont reliés par une file de tâches et s'arrêtent une fois le traitement terminé. Cette conception réduit le coût des ressources de calcul maintenues sans usage.

Pour les jugements hors technologie, il a associé des conseillers à temps partiel en sécurité, droit et finance. Hanim Dogan, membre du conseil et conseiller, a aussi soutenu l'activité. Tout en développant lui-même le produit, il a mis en place des relations pour emprunter l'expérience d'autres domaines.

## De l'essai gratuit à l'abonnement payant

Les premiers utilisateurs de test ont été recrutés publiquement sur LinkedIn. Après une bêta gratuite de mars à avril 2026, le service payant a démarré le 1er mai. Avant d'encaisser des paiements, il a vérifié que les recommandations fonctionnaient correctement sur de nombreux CV.

Dans une interview publiée le 26 juin, Chavez a indiqué un revenu récurrent mensuel de 3 300 dollars. Ce revenu venait de chercheurs d'emploi qui s'étaient abonnés avec leur propre argent après la bêta publique.

En septembre 2026, les formules se composent de Seeker, gratuite, de Candidate à 29 dollars par mois et de Contender à 49 dollars par mois. Les formules payantes donnent accès à tous les résultats de recommandation, et la différence principale tient à l'actualisation hebdomadaire ou quotidienne. Le critère de qualité des recommandations est identique dans toutes les formules. La structure amène ceux qui doivent consulter de nouvelles occasions plus souvent à choisir une formule supérieure.

Les nouveaux inscrits bénéficient d'un essai gratuit de 7 jours de la formule la plus élevée. L'essai commence à courir dès l'arrivée du premier résultat de recommandation, et aucune carte bancaire n'est demandée. Le temps d'attente après l'inscription ne consomme pas l'essai, ce qui permet de voir de vrais résultats avant de décider de payer.

Le choix d'avoir des chercheurs d'emploi comme clients s'est aussi traduit dans les principes de traitement des données personnelles. Jobric utilise les CV et les profils pour recommander des emplois, et indique ne pas vendre les données personnelles ni les transmettre à des tiers à des fins de marketing. Pour continuer à percevoir des abonnements dans cette structure, il doit fournir des recommandations utiles et préserver la confiance.

## Expliquer les données et élargir les recommandations

Les informations que traite le produit ont aussi nourri les textes publiés sur LinkedIn. Il y traitait la fréquence à laquelle les offres affichent le salaire et les compétences transférables vers un autre métier. C'est une façon d'expliquer l'information de marché utile aux chercheurs d'emploi tout en montrant ce que Jobric analyse. Du point de vue du marketing, les données utilisées par le service ont aussi servi de matière à des contenus pour toucher des clients potentiels.

La qualité des recommandations a aussi englobé la fiabilité des offres elles-mêmes. En observant les tendances des offres qui restent longtemps en ligne ou sont republiées, il a signalé aux utilisateurs le risque de perdre du temps sur des offres à l'intention d'embauche incertaine. Jobric ne promet pas de déterminer l'authenticité d'une offre, et explique qu'il fournit des signaux pour décider s'il faut postuler.

Des partenariats de recommandation se sont ajoutés aux canaux d'acquisition. Le programme Advocates, en place en septembre 2026, verse au parrain 25 % de ce que paie réellement le client parrainé, dès le premier paiement et pendant 12 mois. Il vise des personnes en contact avec les chercheurs d'emploi, comme des coachs de carrière, des auteurs de newsletters et des responsables de communautés. Comme la commission naît au moment du paiement du client, le coût d'acquisition peut être relié au revenu.

## La valeur qui reste après la recherche d'emploi

Une activité d'abonnement garde le problème que trouver un emploi entraîne le départ des clients. Chavez s'est aussi demandé quelle valeur offrir dans la période qui précède la recherche suivante. Jobric propose un service qui continue de surveiller le marché même aux personnes en poste. Même sans intention de changer tout de suite, elles peuvent être averties quand une occasion correspondant à leurs critères apparaît. C'est une tentative de prendre comme clients non seulement ceux qui cherchent un emploi dans l'urgence, mais aussi ceux qui veulent explorer des options tout en gardant leur poste.

Il a aussi préparé un accompagnement de carrière mené par des personnes. En septembre 2026, il recrutait les premiers coachs de Career Guides, et la prise de rendez-vous par les utilisateurs n'avait pas encore commencé. L'idée est que le chercheur d'emploi choisisse un coach adapté à sa situation et le consulte, en élargissant de la recommandation d'offres vers un service qui aide aux décisions de carrière de chacun.

Chavez et la personne qu'il voulait aider au départ avaient un point commun : trop peu de temps en dehors du travail. Chavez a créé un produit dans ce temps limité, et a proposé à ses clients un moyen de réduire le temps consacré à la recherche d'emploi. En mettant son expertise au service de la réduction d'une charge que d'autres vivent sans cesse, il a trouvé la possibilité d'une activité à mener tout en gardant un emploi.
