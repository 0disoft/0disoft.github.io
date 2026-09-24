---
{
  "title": "De la collecte de données à la publication : comment Jonathan Geiger a fait grandir deux API",
  "summary": "Comment Jonathan Geiger a transformé SocialKit et PostPeer en activités grâce au trafic de recherche, à la facturation à l’usage et au support client, avant de vendre l’un des deux."
}
---

## Repartir avec une technologie familière

Jonathan Geiger travaillait comme développeur dans une petite startup et créait ses propres produits le soir et le week-end. Dans un projet parallèle qui a duré trois ans, il s’est installé dans les API de collecte de données et d’automatisation des tâches, autrement dit les fonctions que d’autres programmes appellent. SocialKit est devenu une activité qui extrait des données des réseaux sociaux, et PostPeer une activité qui publie du contenu sur plusieurs réseaux sociaux.

Il avait déjà créé et vendu LectureKit, un outil de gestion de l’apprentissage, et CaptureKit, une API de capture et de collecte de pages web. Pour SocialKit, il a réutilisé la connexion et le paiement de CaptureKit, la gestion des clés d’API, la structure de la documentation et le cadre de la page de présentation. Cela lui a permis de se concentrer sur la fonction propre au nouveau produit : le traitement des données des réseaux sociaux.

Son critère de choix d’un produit a changé lui aussi. Geiger cherchait des produits concurrents déjà rentables dans des domaines qu’il comprenait et visait les parties qu’il pouvait améliorer lui-même, comme un support rapide. Son expérience de ce qui rend pénibles certaines intégrations pour les développeurs appuyait ce choix.

## Fournir les données des réseaux sociaux par une API commune

Le problème que traite SocialKit apparaît quand le contenu des réseaux sociaux doit être utilisé dans un autre programme. Analyser une vidéo demande d’obtenir les informations de la vidéo et sa transcription, de collecter des commentaires ou des indicateurs de réaction selon le besoin, et de connecter un modèle de résumé. SocialKit regroupe ces tâches : il suffit d’envoyer l’adresse d’une vidéo et une requête pour recevoir le résultat voulu. Les clients pouvaient réduire le travail consistant à connecter séparément un outil de collecte propre à une plateforme, un service de transcription et un modèle d’intelligence artificielle.

Fournir les résultats au format JSON, facile à lire pour un programme, comptait aussi. Les clients peuvent verser des transcriptions et des commentaires dans un service d’analyse, ou déplacer les vues et les informations de chaîne vers des rapports et des tableaux de bord, en les combinant à leurs propres produits. Pour créer un service qui compare la réaction de plusieurs chaînes, par exemple, ils peuvent confier la collecte des données à SocialKit et consacrer leur temps de développement aux critères de comparaison et à la conception de l’écran. C’est ainsi qu’il vendait une fonction commune qui entre dans un produit fini différent pour chaque client.

Avant de payer, on pouvait essayer le travail réel. SocialKit et PostPeer offrent tous deux 20 crédits d’essai, et l’usage payant se répartit entre des abonnements selon la consommation et des achats ponctuels de crédits. Cette structure accueille à la fois les clients qui exécutent des tâches régulièrement et ceux qui ne récupèrent des données qu’en cas de besoin. L’essai gratuit avait un rôle clair : vérifier si l’API correspond à leurs propres données et à leurs tâches.

## Rencontrer de vrais clients par la recherche

La recherche de clients avançait en même temps que le développement. Geiger écrivait un ou deux articles liés par semaine et créait des pages de présentation par fonction de l’API, des cas d’usage et des pages de comparaison pour ceux qui cherchaient des alternatives aux services concurrents. Il cherchait avec les expressions que ses clients utiliseraient, puis complétait la documentation et les instructions d’usage qui répondaient à ces questions. Dans le bilan de croissance qu’il a publié, le trafic organique issu de la recherche était le canal d’acquisition le plus important.

Un extracteur gratuit de transcriptions YouTube est devenu l’entrée vers l’API payante. Une partie de ceux qui découvraient l’outil par la recherche sont devenus clients payants, et le contenu d’usage était produit à la fois en articles et en vidéos. Il réutilisait le même matériel en vidéos courtes et en publications sur les réseaux sociaux, afin qu’un seul travail soit trouvé à plusieurs endroits. Certains clients ont découvert une page de comparaison avec des produits concurrents par un service de recherche et de recommandation fondé sur l’intelligence artificielle, puis ont payé.

Ceux qui payaient réellement étaient plus larges que le groupe de développeurs que Geiger avait imaginé au départ. Une bonne part des clients payants étaient des personnes qui reliaient leur travail avec des outils sans code. Comme SocialKit pouvait aussi s’utiliser depuis des outils d’automatisation comme Zapier ou Make, il pouvait atteindre des personnes ayant des tâches répétitives de collecte de contenu, au-delà des développeurs qui savaient se servir d’une API. Cette expérience montre qu’il faut comprendre le client par la tâche qu’il veut accomplir, et non par le nom de son métier.

## Relier la publication aux coûts des plateformes

PostPeer, lancé en avril 2026, a pris en charge l’envoi de contenu vers les réseaux sociaux. Il proposait dans une seule API la publication et la programmation sur plusieurs plateformes, afin que les clients puissent ajouter la publication sur les réseaux sociaux à leurs propres services. Là où SocialKit fournissait la matière nécessaire à l’analyse et à la retransformation, PostPeer s’est placé à l’étape de la diffusion du contenu déjà créé.

Un service qui utilise PostPeer commence par connecter un compte social avec l’accord de son titulaire. Il envoie ensuite le contenu à publier et le compte cible, puis peut publier immédiatement ou programmer selon le fuseau horaire et l’heure. Il permet aussi de regrouper les comptes connectés par client, ce qui convient aux agences gérant les comptes de plusieurs entreprises ou aux services comptant de nombreux utilisateurs. Organiser en un mode d’emploi commun la connexion des comptes et la procédure de publication de chaque plateforme était le cœur du produit.

PostPeer a été développé avec un partenaire dès le début. Les deux se sont réparti les intégrations de plateformes, de sorte que le développement pouvait se poursuivre pendant que Geiger se concentrait sur SocialKit. La procédure d’approbation de TikTok, en particulier, a demandé plus d’efforts que prévu.

La conversion de l’usage en crédits a aussi reflété les coûts différents selon les plateformes. Dans la grille tarifaire de PostPeer de septembre 2026, la plupart des plateformes déduisent 1 crédit par publication, mais X en déduit 5 lorsque le texte ne contient pas de lien et 50 lorsqu’il en contient un. L’entreprise explique que cet écart vient du coût des requêtes qu’elle paie à X. Le client reçoit une seule API, tandis que les différences de coût qui apparaissent à l’intérieur restent inscrites dans l’unité de facturation.

Le support client était aussi un facteur qui façonne la différence ressentie par l’acheteur. La page de tarifs de PostPeer comporte des témoignages qui mentionnent la rapidité de réponse et de correction, et le fondateur de Kalizzle AI Studio a estimé que Geiger avait appliqué une correction en quelques heures. Quand un problème survient dans une connexion à une API externe, le développement du client peut s’arrêter aussi, si bien que la rapidité à le résoudre entre dans la décision d’achat au même titre que la fonction d’intégration.

Geiger s’est aussi intéressé au cas où des agents d’intelligence artificielle utilisent l’API directement. Il a présenté la connexion des deux produits à des agents comme une expérimentation de croissance, et SocialKit prend en charge MCP, le standard de connexion par lequel les agents appellent des outils externes, ainsi que des skills qui fournissent les instructions d’usage. Il a élargi la voie d’accès pour que la même fonction de collecte serve à la fois à un programme écrit par une personne et à un agent.

Il a testé ce mode d’usage avec son propre compte X. Il a configuré un agent pour qu’il rédige cinq publications par jour avec Claude et répartisse le planning selon les fuseaux horaires des États-Unis, PostPeer se chargeant de la programmation et de la publication. Après l’exécution, il recevait par courriel le contenu prévu et pouvait le modifier ou l’annuler depuis le tableau de bord avant publication. Dans cette expérience, la rédaction des textes et leur publication réelle sur le compte étaient séparées, et PostPeer prenait en charge la seconde.

## Faire grandir le produit resté après la vente

Les chiffres publiés en juillet 2026 montrent le rôle des deux produits. Le revenu récurrent mensuel de SocialKit était d’environ 2 800 dollars et celui de PostPeer d’environ 2 400, les paiements ponctuels ajoutant environ 700 et 500 dollars par mois respectivement. Le total était d’environ 5 200 dollars de revenu récurrent plus environ 1 200 dollars de revenu ponctuel, soit environ 6 400 dollars par mois. Ce mois-là, il a quitté son emploi pour se consacrer au développement de produits.

Le tournant suivant a été la vente de SocialKit en août 2026. Au moment de la vente, le revenu récurrent mensuel publié par Geiger était de 3 290 dollars, et la vente de lots de crédits ajoutait environ 700 dollars par mois en moyenne. La taille de l’opération rapportée par Tiny Startups était de 85 000 dollars, soit 75 000 dollars de prix de vente et 10 000 dollars d’honoraires de conseil. Une API qui générait des revenus pendant son exploitation est devenue un actif cessible à un autre entrepreneur.

Après la vente de SocialKit, l’activité d’abonnement de PostPeer s’est poursuivie. Au 24 septembre 2026, le tableau de bord public des revenus affichait un revenu récurrent mensuel de 4 403 dollars et 122 abonnements actifs. Des revenus de l’exploitation conjointe de deux produits, il est passé à une étape où il en a vendu un et fait croître le revenu récurrent de celui qui restait.

PostPeer a aussi fixé un prix distinct pour l’expérience accumulée dans l’intégration de plateformes. Un exemple est le service d’agence qui configure à la place du client l’application de connexion de comptes, où figurent le nom et le logo de l’entreprise, et mène la procédure de validation de la plateforme. L’offre de septembre 2026 était des frais de configuration uniques de 100 à 600 dollars par plateforme, plus des frais de maintenance de 99 dollars par mois, avec un engagement minimal de trois mois. Au-delà de la facturation des appels à l’API, il a élargi les sources de revenus à la mise en place initiale, à la validation et au soutien opérationnel qui suit.

Dans le cas de Geiger, la limite du produit s’est définie en suivant le travail que les clients supportent de façon répétée. Il fournissait la collecte et la publication de données par une API commune et vendait à part la configuration propre à chaque client et la réponse aux validations. Distinguer les fonctions réutilisables pour plusieurs clients de l’effort qui augmente avec chacun, et les facturer en conséquence, a été la clé pour transformer une petite activité de développement en structure de revenus durable.
