---
{
  "title": "Wilhelm Klopp — Simple Poll, transformer une petite fonctionnalité de Slack en entreprise",
  "summary": "Le processus consistant à monétiser une application de vote Slack gratuite, à soutenir la collecte récurrente d'opinions des organisations et les exigences d'exploitation des entreprises, et à en faire une activité menée par une petite équipe."
}
---

Simple Poll, créé par Wilhelm Klopp, est une application qui permet de créer des questions, de recueillir des votes et de consulter les résultats dans Slack. Le cœur du produit est de faire en sorte que les employés répondent directement dans le canal où ils ont l'habitude de discuter, sans passer par un lien vers un sondage externe. C'est un exemple de collecte simple d'opinions transformée en service payant que les entreprises utilisent de façon récurrente.

## Le petit inconvénient repéré par un étudiant

Klopp, étudiant en gestion à l'université, côtoyait aussi des étudiants en informatique et créait des projets parallèles. C'est en cherchant à décider de quelque chose ensemble dans Slack qu'il a ressenti le besoin d'une fonction de vote, ce qui a marqué le point de départ de Simple Poll. Selon la rétrospective de développement qu'il a lui-même écrite, il a écrit son premier code fin décembre 2015.

Au début, il avait aussi la motivation de vouloir être embauché par Slack. Il expliquait être séduit par le fait que Slack, bien qu'étant un logiciel d'entreprise, était fluide et facile à utiliser comme une application grand public. Simple Poll cherchait lui aussi à proposer un produit pratique non seulement pour les responsables d'achat, mais aussi pour les employés qui l'utilisent réellement au quotidien.

Son utilisation peut s'expliquer par une courte commande. Par exemple, saisir `/poll "Quand aura lieu la réunion ?" "mardi" "mercredi"` permet de créer un vote avec une question et des choix. Il suffit de saisir `/poll` pour ouvrir une fenêtre de configuration, ce qui permet même à une personne peu familière avec les commandes de rédiger en s'aidant de l'écran.

Une interview publiée par Slack en 2021 indiquait que Simple Poll s'était diffusé en quelques jours dans des centaines d'espaces de travail. Klopp a ensuite présenté en 2024 lors de DjangoCon les principaux enseignements sur la manière de créer un produit au-dessus d'une plateforme existante et sur l'importance des canaux de distribution. C'est comme s'il était entré sur un marché où le lieu pour découvrir le produit et celui pour l'utiliser étaient déjà en place.

## Monétiser un projet gratuit et quitter GitHub

Simple Poll était au départ un projet gratuit. Alors qu'il travaillait chez GitHub, Wilhelm Klopp, à l'occasion du rachat de GitHub par Microsoft, a réfléchi à ses choix économiques et a décidé de monétiser une application qui avait déjà rassemblé des utilisateurs. Selon une rétrospective de 2024, environ un an après le lancement de la monétisation, le chiffre d'affaires de l'activité avait dépassé le salaire qu'il recevait de GitHub.

Il a quitté GitHub en septembre 2019. Il a d'abord gardé son emploi tout en faisant tourner le produit et en confirmant la demande payante, puis il s'est consacré à plein temps à Simple Poll.

La difficulté de la gestion en parallèle résidait dans le manque de temps de développement. Klopp a raconté que, pendant qu'il occupait son emploi, il manquait d'énergie en semaine pour travailler, et qu'il consacrait aussi beaucoup de temps au support client le week-end. Après la monétisation, des tâches financières et juridiques s'y sont ajoutées.

Les résultats juste après le passage à plein temps n'ont pas non plus répondu aux attentes. Il pensait que consacrer 40 heures par semaine à une activité à laquelle il accordait environ 10 heures ou moins en accélérerait fortement la croissance, mais il a connu sa première baisse de chiffre d'affaires le mois suivant son départ. En racontant cette expérience par la suite, il a souligné que ce à quoi l'on se consacre compte davantage que le temps investi.

Le texte de présentation de l'interview d'Indie Bites du 24 octobre 2020 indiquait que Simple Poll faisait vivre à plein temps Klopp et une petite équipe. Le projet, lancé comme outil gratuit, était devenu une activité capable de couvrir les frais de subsistance personnels du fondateur et le fonctionnement de l'équipe. Aucun montant précis de revenu récurrent mensuel (MRR) ni de bénéfice net n'était divulgué dans ce texte de présentation.

## Du vote sur le menu du déjeuner aux retours réguliers au sein de l'organisation

Le cas d'usage représentatif initial était une décision d'équipe légère, du type « Où manger aujourd'hui à midi ? ». Avec la généralisation du travail à distance, l'usage s'est élargi à des tâches récurrentes comme vérifier qui prévoit de venir au bureau ou faire le point sur l'état de l'équipe. Dans un entretien de 2021, Klopp a présenté le cas d'un sondage publié automatiquement chaque jour à 7 heures pour demander si les personnes venaient au bureau.

Les utilisateurs ont aussi demandé des questions plus longues et des retours privés ; en réponse, Simple Surveys a été développé. Selon la description de l'époque, il permettait d'envoyer des enquêtes à des employés désignés et seul leur auteur pouvait consulter les résultats ; il prenait aussi en charge les réponses anonymes et les réponses libres, entre autres. Le produit est passé de sondages ponctuels à la collecte d'opinions au sein de l'organisation.

## Une structure séparant l'usage gratuit du paiement organisationnel

Les formules tarifaires ont elles aussi été réorganisées en fonction de l’expansion du produit. L’entreprise a introduit l’offre Premium en 2021 et, à partir de janvier 2024, a fait basculer les anciennes offres Manager, Director et Small Business vers Premium au moment du renouvellement. L’annonce officielle invoquait la difficulté croissante à continuer de prendre en charge les nouvelles fonctionnalités pour chaque ancienne offre.

Dans la grille tarifaire officielle consultée le 4 octobre 2026, l’offre gratuite donne droit à 100 réponses par mois. Les sondages peuvent être créés sans limite de nombre, mais chaque question compte au maximum 5 choix, et des fonctionnalités de base comme les votes anonymes et les choix multiples sont incluses. Le principal critère qui sépare le gratuit du payant est le volume de réponses réellement collectées, plutôt que le nombre de sondages créés.

Premium s’applique à l’ensemble de l’espace de travail, et son prix varie selon le nombre de membres. Pour un espace de travail de 1 à 24 membres, il est affiché à 49 dollars par mois en équivalent lors d’un paiement annuel, soit 588 dollars facturés par an. Cette offre comprend des réponses illimitées, des sondages récurrents et programmés, des enquêtes de 20 questions maximum, l’export des résultats et l’accès à l’API.

Dans ce modèle de facturation, plus une équipe recueille souvent des avis, plus la nécessité d’une mise à niveau se fait sentir. Par exemple, si 20 personnes répondent chacune à 5 questions, cela représente 100 réponses, soit la quantité incluse dans l’offre gratuite. Un seul paiement permet à l’ensemble des membres de l’espace de travail d’utiliser les fonctionnalités payantes, ce qui aligne l’unité de facturation sur l’organisation.

## Les opérations d’entreprise nécessaires derrière un petit écran

L’architecture technique que Wilhelm Klopp a rendue publique en 2020 reposait sur Django et PostgreSQL. Il expliquait qu’il fallait distinguer les utilisateurs et les informations d’installation d’application, les jetons d’accès et les données de sondage de plusieurs espaces de travail, et gérer jusqu’à Slack Enterprise Grid, qui regroupe plusieurs espaces de travail d’une grande entreprise. Une base permettant de traiter avec précision les données et les autorisations propres à chaque organisation était nécessaire.

Dans l’adoption en entreprise, l’administration et la sécurité comptaient également. Klopp citait comme facteur de succès le fait d’avoir eu besoin de peu de données au départ, et conseillait de collaborer pour permettre aux administrateurs Slack d’aider les employés à s’en servir. Il s’agissait d’une approche visant à concilier une expérience d’utilisation commode pour les employés et une portée d’accès aux données explicable pour les administrateurs.

La page de sécurité officielle actuelle fait état d’une certification ISO 27001, de tests d’intrusion externes, d’un chiffrement au repos et en transit et d’une connexion via un compte Slack. L’offre Enterprise y ajoute un déploiement à l’échelle de l’organisation, des examens de sécurité, un support client dédié et des procédures d’achat en entreprise comme le paiement par bon de commande ou facture. L’entreprise a ainsi intégré au produit les exigences opérationnelles qui lui permettent d’être déployée et maintenue durablement.

La dépendance à la plateforme est une contrainte majeure de cette activité. Par sa structure, l’entreprise doit s’adapter aux changements de fonctionnalités, d’autorisations et de politiques de distribution de Slack, et le canal par lequel elle fournit son produit aux clients reste lié à Slack. Dans l’interview accordée à Indie Bites en 2020, le risque de bâtir une activité sur une autre plateforme était également abordé comme un sujet à part entière.

## Constituer une équipe et passer au produit suivant

Dans l'introduction de la présentation à DjangoCon Europe 2024, on a décrit Simple Poll comme une société SaaS exploitée par une équipe de sept personnes. Ce qui était un projet personnel au moment de la création est devenu, au fil de sa croissance, une activité d'équipe où plusieurs personnes prennent en charge le développement et l'exploitation.

Dans une interview publiée en mai 2024, Wilhelm Klopp a indiqué avoir confié les opérations quotidiennes de Simple Poll à un nouveau CEO et se consacrer à plein temps à Kolo. Kolo était un outil qu'il avait commencé à créer en développant Simple Poll afin d'améliorer sa propre expérience de développement. Les frictions découvertes en exploitant le premier produit sont devenues le point de départ du produit suivant.

La stratégie que l'on peut lire chez Simple Poll consiste à entrer avec une petite fonctionnalité dans un environnement de travail où des utilisateurs sont déjà réunis, puis à monétiser ce qui est nécessaire à l'usage répété et au fonctionnement de l'organisation. C'est ainsi que Klopp a transformé un projet personnel en métier, avant de disposer d'une équipe à qui confier l'exploitation et de dégager du temps pour créer le produit suivant.
