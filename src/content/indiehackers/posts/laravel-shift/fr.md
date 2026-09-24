---
{
  "title": "De l’automatisation des mises à niveau Laravel à la maintenance continue",
  "summary": "Comment Jason McCreary a fait évoluer Laravel Shift d’un outil de mise à niveau de versions vers la maintenance par abonnement et la revue de code par IA."
}
---

En novembre 2015, Jason McCreary préparait une conférence lors d’un événement de développeurs PHP quand il repéra une occasion d’affaires. Le sujet portait sur les nouvelles versions du framework Laravel, employé pour le développement de services web, et sur la manière de les mettre à niveau. Il existait des guides officiels et quelques articles explicatifs, mais aucun outil ne modifiait le code automatiquement en suivant ces instructions. Il remarqua qu’une bonne part des changements entre deux versions pouvait se traiter par des règles fixes.

McCreary demanda au créateur de Laravel, Taylor Otwell, présent à l’événement, s’il connaissait un tel outil. Otwell n’en connaissait aucun et montra de l’intérêt à l’idée de l’utiliser lui-même. Pendant le hackathon de l’événement, McCreary écrivit le premier outil qui convertissait un projet Laravel 5.0 en 5.1, puis il trouva ses premiers utilisateurs de test grâce à une mention d’Otwell sur Twitter.

Le 23 décembre 2015, Shift fut lancé comme service payant. Le prix était de 3, 5 ou 7 dollars selon le parcours de mise à niveau. Pendant les vacances de Noël, une vingtaine d’exécutions rapportèrent 80 dollars.

La méthode d’utilisation s’adaptait au processus de travail existant des développeurs. Le client se connectait avec son compte GitHub ou Bitbucket, désignait son dépôt de code et payait ; Shift lançait alors la mise à niveau. Le résultat était enregistré dans une branche, un espace de travail séparé de l’original, et transmis sous forme de pull request à relire et à fusionner. Le client voyait ce qui avait changé dans l’interface de revue de code qui lui était familière.

Là où l’automatisation ne pouvait pas traiter les choses de façon sûre, des explications restaient. Le développeur pouvait les lire, terminer les corrections nécessaires, puis fusionner le résultat ; même en enchaînant plusieurs versions, la mise à niveau était conçue pour une vérification par étapes. Cette approche confiait les modifications à un outil externe tout en laissant à l’équipe de développement la décision de les appliquer ou non.

Le produit initial avait des bogues. Jeffrey Way, du service de formation Laravel Laracasts, fit savoir que l’idée était bonne mais que le produit comportait des erreurs. McCreary prit comme seuils d’investissement supplémentaire dans le développement les paliers de 100, 250, 500 puis 1 000 exécutions, en corrigeant les erreurs et en étendant les fonctions à chaque étape. En septembre 2016, il annonça avoir atteint 1 000 mises à niveau.

Il demanda aux clients ayant terminé une mise à niveau comment cela s’était passé, ce qu’ils avaient corrigé eux-mêmes et par quel canal ils avaient connu Shift. Les réponses indiquaient à la fois les lacunes de l’automatisation et les sources d’acquisition des clients. Le support client servait donc à la fois à améliorer le produit et à mener des recherches marketing.

Les premiers clients venaient surtout de Twitter. La mention d’Otwell servit de point de départ, et une présentation à Laracon en 2016 permit de rencontrer environ 400 clients potentiels. Le chiffre d’affaires bondit après l’événement et la sortie de la nouvelle version, et dix mois après le lancement, il atteignit environ 3 000 dollars par mois.

Il ne passa pourtant pas à temps plein tout de suite. En 2017, il choisit un contrat de conseil mieux rémunéré chez Papa John’s. Le contrat prit fin en octobre 2018, et il décida alors de se consacrer à Shift, en se donnant un an à condition de préserver son épargne.

L’expérience de la vente d’applications influença la fixation des prix. McCreary était habitué à obtenir beaucoup d’utilisateurs par des prix bas, et il poursuivit cette idée avec Shift. Le fait qu’un développeur puisse faire la mise à niveau lui-même, en y consacrant du temps, le rendait aussi hésitant à augmenter les prix. En avril 2019, cependant, quand le nombre cumulé de mises à niveau atteignit 15 000, il jugea que la valeur du service était suffisamment démontrée et annonça une nouvelle hausse.

En 2019, sur les conseils d’Adam Wathan, il organisa les prix en trois tranches. La mise à niveau vers la version la plus récente coûtait 9 dollars, celle des versions encore supportées 19 dollars et celle des versions en fin de support 29 dollars. Les clients comprenaient plus facilement le coût prévisible, et le revenu tiré du traitement de projets anciens augmenta.

Après le passage à temps plein, il introduisit aussi un abonnement. Il espérait prédire plus facilement le coût des mises à niveau pour les clients comme son propre chiffre d’affaires. L’accueil initial fut tiède : selon son analyse, beaucoup de clients voyaient peu de raisons de se presser vers une nouvelle version et restaient sur des versions à support à long terme.

Les tentatives d’élargir le marché se poursuivirent aussi. Il créa un outil de mise à niveau de versions pour PHP, le langage sur lequel repose Laravel, mais ces produits furent arrêtés faute d’usage. Il examina aussi JavaScript, mais jugea difficile de choisir un domaine d’entrée, les frameworks et les outils ouverts étant dispersés. Le fait de prendre en charge une technologie familière n’amenait pas automatiquement une nouvelle clientèle.

La refonte des prix et l’abonnement portèrent leurs fruits par la suite. En septembre 2019, lors de la sortie de Laravel 6, le revenu mensuel atteignit 20 312 dollars. À ce moment-là, les paiements d’abonnement représentaient près de la moitié du chiffre d’affaires.

En 2020, il élargit la gamme aux tâches de maintenance des mêmes développeurs Laravel. Il ajouta « Shift Workbench », qui permet de choisir et d’exécuter les nettoyages de code nécessaires, et présenta « Can I Upgrade Laravel? », qui vérifie quelles versions de Laravel un paquet utilisé prend en charge. Jess Archer participa au développement sous contrat et aida à ces extensions. Le produit commençait à couvrir les travaux qui entourent la mise à niveau elle-même.

Les produits de formation furent eux aussi liés aux problèmes repérés dans le support client. Le grand nombre de questions sur Git mena au cours « Getting Git », et « Confident Laravel », une formation à l’écriture de tests, fut conçue pour aider les développeurs à vérifier le résultat d’une mise à niveau. En 2020, la version de base de « BaseLaravel », consacrée à l’usage de Laravel, fut distribuée gratuitement et dépassa 10 000 téléchargements. Les contenus de formation apportaient aux clients les connaissances nécessaires pour utiliser les outils tout en élargissant son propre public.

Le chiffre d’affaires et l’usage progressèrent ensemble. Selon les chiffres publiés par McCreary, le revenu de 2020 augmenta de 112 % par rapport à l’année précédente, et en septembre 2021 les exécutions cumulées dépassèrent 50 000. En novembre de la même année, le revenu cumulé depuis le lancement franchit 1 million de dollars.

À mesure que les produits se multipliaient, délimiter la portée des opérations devint important. En 2021, il développa la collaboration avec des développeurs externes, mais après l’arrivée de Jess Archer dans l’équipe Laravel en 2022, il décida de nouveau d’exploiter Shift seul. McCreary voulait réduire le nombre de produits et de technologies pris en charge pour alléger la charge liée à l’alternance entre plusieurs tâches. C’était le choix de ramener une entreprise devenue plus grande à une taille qu’il pouvait continuer à gérer lui-même.

Il prépara aussi une méthode d’exécution pour les clients qui ne peuvent pas envoyer leur code à un service externe. Un Shift ordinaire ne conserve le code du client sur ses serveurs que pendant le traitement et l’efface une fois le travail terminé, mais certaines organisations avaient des politiques rendant tout envoi difficile. À ces clients, il proposa « Shift for Docker », qui exécute la mise à niveau dans leur propre environnement. La même fonction d’automatisation devenait ainsi achetable selon les contraintes de gestion du code du client.

En 2025, la croissance annuelle du chiffre d’affaires s’arrêta pour la première fois depuis le lancement. McCreary désigna comme cause principale l’affaiblissement du besoin de mises à niveau payantes, à mesure que se succédaient des versions comme Laravel 12 qui demandent peu de corrections obligatoires. Il évoqua aussi la possibilité que les développeurs aient commencé à traiter eux-mêmes ces travaux avec l’IA. C’était le moment de réexaminer un modèle d’affaires où les clients revenaient à chaque sortie de nouvelle version.

Il commença par ajuster la gestion des prix. Les produits des versions en fin de support furent déplacés vers la tranche haute, et le prix d’entrée bas de la dernière version fut limité à une période définie. En juin 2025, il élargit les prix régionaux et le paiement en monnaie locale pour adapter les conditions de paiement à chaque marché. McCreary estima que sans ces ajustements, le chiffre d’affaires de l’année aurait diminué d’environ 10 %.

Il revint aussi sur les tentatives passées d’augmenter la fréquence d’usage du produit. L’application de bureau et l’outil en ligne de commande de Workbench furent retirés faute d’un usage à la hauteur des attentes, et il nota que le client devait penser à la tâche nécessaire, ouvrir l’outil et lancer lui-même l’exécution. Rendre l’environnement d’exécution plus pratique ne suffisait donc pas à donner aux clients une raison de revenir vers le produit.

En janvier 2026, il lança « Monthly Shifts ». Les clients abonnés recevaient chaque mois, sous forme de pull request, une série d’améliorations de code préparées à l’avance. Le client n’avait qu’à examiner les changements reçus pour les appliquer ou les fermer, et il recevait de nouvelles propositions le mois suivant. Le produit passait d’un modèle où le client cherchait la tâche à exécuter à un modèle où le travail lui est envoyé en premier.

L’unité d’achat de l’abonnement s’adapta aussi à ce que gère une équipe de développement. Un produit pour un seul dépôt et un produit illimité couvrant plusieurs dépôts furent proposés, avec une étendue de mises à niveau incluse selon l’ancienneté du projet. Les équipes exploitant plusieurs services pouvaient regrouper le coût récurrent de maintenance et recevoir des mises à jour hebdomadaires des dépendances ainsi que des propositions mensuelles d’amélioration du code.

En juin 2026, il ajouta « AI Review » en version d’essai. Shift effectuait d’abord la mise à niveau selon des règles, puis l’IA lisait le contexte du code et les explications laissées par Shift pour mener des corrections supplémentaires. C’était la combinaison de règles de correction automatique accumulées pendant longtemps avec une capacité d’interprétation du contexte. La tentative visait à ramener dans le produit une partie du travail que le développeur finissait lui-même après avoir lu les explications.

Shift réunit en une tâche achetable les décisions de mise à niveau et les corrections répétitives que les développeurs devaient faire à chaque fois. McCreary maintint la livraison directe du résultat dans le dépôt du client, tout en élargissant le moment d’usage de la mise à niveau ponctuelle vers une maintenance continue.
