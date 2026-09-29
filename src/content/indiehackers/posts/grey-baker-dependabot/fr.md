---
{
  "title": "Grey Baker a transformé la mise à jour répétitive des dépendances en Dependabot, revendu à GitHub",
  "summary": "Comment Grey Baker et Harry Marr ont transformé une corvée de mise à jour des dépendances en Dependabot, l'ont vendu de 15 à 50 dollars par mois en 2017, ont atteint environ 14 000 dollars de revenus mensuels récurrents, puis ont vu GitHub racheter l'outil en 2019."
}
---

## Une tâche de maintenance répétée devenue une activité rachetée par GitHub

Grey Baker a construit avec Harry Marr Dependabot, un outil qui automatise la mise à jour des dépendances logicielles. L'activité, développée sans investissement externe, a atteint environ 14 000 dollars de revenus mensuels récurrents avant que GitHub ne l'acquière en 2019. C'est le cas d'un travail de maintenance que les développeurs traitaient au quotidien, transformé en service payant par deux cofondateurs.

## Le travail répétitif que le fondateur a connu lui-même

Baker a d'abord travaillé comme consultant en stratégie chez McKinsey avant d'apprendre la programmation en autodidacte. Il a ensuite pris en charge des missions produit et ingénierie chez le spécialiste du paiement GoCardless, où il a connu la période durant laquelle l'effectif est passé de six personnes à plus de cent. Après avoir quitté l'entreprise pour un tour du monde à vélo, il s'est lancé dans une création d'entreprise dans la santé, et c'est au cours de cette période qu'il a démarré Dependabot comme projet parallèle dans son domaine familier du développement.

Le point de départ du produit était la mise à jour des dépendances que Baker répétait chez GoCardless. Son prédécesseur, Bump, était un outil créé par GoCardless en 2015 : il vérifiait les nouvelles versions des bibliothèques, modifiait le fichier de dépendances et générait une pull request proposant la modification du code. Le dépôt public de GoCardless indique qu'à partir de 2017, Dependabot satisfaisait le même besoin en offrant des fonctions plus variées.

Dependabot a rattaché ce travail au flux d'utilisation de GitHub des équipes de développement. Lorsqu'une bibliothèque à mettre à jour était détectée, il créait une pull request et présentait ensemble l'historique des changements, les notes de version et les informations de sécurité associées pour faciliter la relecture. Le développeur pouvait vérifier et appliquer la modification dans la procédure de revue de code qu'il utilisait déjà. Réduire le travail répétitif, de la détection d'une mise à jour à la préparation d'une correction, constituait la valeur centrale du produit.

Baker et Marr ont vécu sur leurs économies et ont récupéré auprès de GoCardless les droits de propriété intellectuelle de Bump. Ils ont réalisé une première version d'essai en quatre semaines environ, puis l'ont affinée pendant près d'un mois. Il fallait aussi résoudre les demandes de modification qui affluaient depuis les anciens dépôts, les conflits de fusion et le problème des mises à jour refusées qui étaient régénérées.

## Les premiers utilisateurs, le fondateur est allé les chercher lui-même

L'entrée initiale sur le marketplace de GitHub exigeait au moins 250 utilisateurs, alors que Dependabot n'en comptait que 22. Un article de présentation préparé en deux jours et publié sur Hacker News et Reddit n'a apporté qu'une seule inscription.

Baker cherchait sur GitHub les pull requests dont le titre contenait « update » et proposait son produit à leur auteur. En y consacrant une heure par jour, il obtenait deux ou trois inscriptions, et environ la moitié des personnes contactées s'inscrivaient. Sa méthode consistait à s'appuyer sur le travail manuel que son interlocuteur avait réellement effectué pour présenter le produit.

Après l'entrée sur le marketplace, la vitesse d'inscription est devenue environ dix fois supérieure. GitHub facturait les frais de Dependabot en les ajoutant à la facture existante, et la commission était alors de 25 % du chiffre d'affaires. Cette entrée a modifié en même temps l'arrivée des clients et la procédure de paiement.

En 2017, le tarif était de 15 dollars par mois pour cinq dépôts privés d'une entreprise et de 50 dollars par mois pour un nombre illimité. L'usage était gratuit pour les particuliers et l'open source, et des développeurs satisfaits sur leur projet personnel en venaient à recommander le produit à leur employeur.

Un entretien de décembre 2017 indiquait un chiffre d'affaires mensuel de 740 dollars. Les frais d'exploitation du mois précédent s'élevaient à 50 dollars, essentiellement pour l'hébergement et les courriels. Il faut toutefois rappeler qu'à ce stade, les deux fondateurs vivaient sur leurs économies.

## Le problème de confiance quand on vend un outil aux développeurs

La prospection directe de Baker s'est poursuivie même après la croissance du produit. En octobre 2018, il a contacté la communauté du logiciel de forum open source Discourse pour proposer l'adoption de Dependabot. Il montrait en exemple une pull request de mise à jour qu'il avait lui-même créée et expliquait deux approches : ne recevoir une correction que lorsqu'une faille de sécurité est découverte, ou recevoir aussi les mises à jour de version ordinaires. Il indiquait aussi franchement espérer que l'adoption par un projet connu accroîtrait la notoriété de Dependabot.

C'est toutefois la question des droits d'accès au dépôt qui préoccupait son interlocuteur. L'équipe de Discourse demandait s'il était possible d'envoyer des pull requests depuis un dépôt dupliqué, sans accorder de droit d'écriture sur le dépôt d'origine. Baker a répondu que la structure des autorisations de l'application GitHub de l'époque ne permettait pas de le prendre en charge facilement, et la discussion sur l'adoption a été suspendue. Cet échange montre que, pour un produit d'automatisation destiné aux développeurs, l'étendue des autorisations demandées pèse aussi sur la décision d'achat ou d'adoption, en plus du confort de la fonction.

Après ce parcours, Dependabot a atteint environ 14 000 dollars de revenus mensuels récurrents. La présentation de l'entretien du podcast Marketing Mashup publiée le 1er juillet 2019 explique que Baker a développé l'activité jusqu'à cette échelle avant de la vendre à GitHub. Ici, les revenus mensuels récurrents désignent les revenus qui se répètent régulièrement, et non un montant représentant le revenu personnel ou le bénéfice net du fondateur.

## L'extension vers les fonctions de sécurité de GitHub

GitHub a annoncé l'acquisition de Dependabot en mai 2019. La communication officielle de l'époque expliquait que Dependabot était racheté et intégré pour faciliter le travail de résolution des failles de sécurité dans les dépendances. Le montant de l'acquisition n'a pas été rendu public dans cette annonce.

Le lien fonctionnel avec GitHub était net. Lorsqu'une bibliothèque vulnérable était détectée dans un dépôt, Dependabot pouvait préparer une pull request qui la corrigeait. Pour les correctifs de sécurité, il montait la version au minimum nécessaire pour éliminer la faille, ce qui réduisait l'étendue des changements à relire pour le développeur. Dependabot ajoutait ainsi aux fonctions de détection de vulnérabilités de GitHub la fourniture de corrections concrètes.

Après l'acquisition, Dependabot a été proposé gratuitement sur le marketplace de GitHub. Le cofondateur Harry Marr a indiqué le 25 juillet 2019 sur le blog officiel de GitHub que le nombre cumulé de pull requests générées par Dependabot et fusionnées avait atteint un million. Depuis la fusion de la première pull request en avril 2017, soit environ deux ans, ce chiffre montre l'ampleur des mises à jour préparées automatiquement et réellement appliquées à des projets existants.

En juin 2020, la fonction de mise à jour ordinaire des versions a elle aussi été publiée sous forme d'intégration par défaut dans GitHub. L'utilisateur pouvait désigner dans le fichier de configuration du dépôt le gestionnaire de paquets visé et la fréquence d'exécution pour recevoir des pull requests de mise à jour. GitHub précisait dans cette annonce que toutes les fonctions de Dependabot étaient offertes gratuitement à tous les dépôts. Le service, qui était facturé de façon indépendante, est ainsi devenu une fonction de développement commune de GitHub.

## Quand ce travail répétitif est devenu une fonction de base de la plateforme

La force commerciale de Dependabot tenait au fait de traiter un travail qui se répétait à chaque mise à jour à l'intérieur de la procédure de relecture que les développeurs utilisaient déjà. L'automatisation, payée par chaque équipe de développement, a élargi sa diffusion à toute la plateforme en se combinant aux fonctions de sécurité de GitHub. C'est le cas d'un petit outil de maintenance créé par deux cofondateurs, devenu une partie d'un environnement de développement plus vaste.
