---
{
  "title": "Ouvrir des fichiers Photoshop dans le navigateur",
  "summary": "Comment Photopea est passé d’un éditeur web solo à 350 millions d’utilisations en un an."
}
---

En 2012, Ivan Kutskir étudiait l’informatique à Prague quand il voulut ouvrir des fichiers PSD de Photoshop sur le web. Le point de départ fut un outil affichant les calques d’une image, chacun masquable ou réaffichable. Il gagnait déjà 100 à 400 dollars par mois grâce aux annonces de jeux web qu’il avait faits, et il aimait créer des programmes. Il commença Photopea sur son temps libre à côté des études.

La première version, publiée le 14 septembre 2013, lisait un PSD et l’affichait. Elle comprenait zoom, déplacement, mouvements de calques et de masques, et annulation. Les formats de couleur restaient limités, et elle ne reproduisait pas tous les effets stockés dans Photoshop. Kutskir publia le programme avec ce périmètre étroit.

Le dur vint juste après la lecture des fichiers. La documentation PSD publique d’Adobe expliquait comment extraire nombres et textes, mais pas comment combiner ces données en la même image que dessine Photoshop. Kutskir dut implémenter le mélange des calques et des effets comme les ombres. Son annonce demandait même de l’aide, admettant qu’il ne comprenait pas encore un effet de biseau.

La vitesse devait aussi se régler. Le premier Photopea était écrit en JavaScript, le navigateur calculant les images sur le CPU de l’utilisateur. Les fichiers à nombreux calques et effets prenaient des secondes à s’afficher, et de petites retouches recomposaient toute l’image. En le publiant ainsi, il expliqua le besoin de réutiliser les calculs et d’utiliser les processeurs graphiques.

En septembre 2016, il introduisit un compte premium à 5 dollars par mois. Il n’ajoutait aucune fonction d’édition, et le bouton de compte devenait vert. L’avis disait que l’argent soutiendrait le développement futur. Les utilisateurs gratuits gardaient l’édition complète, tandis que les sympathisants avaient une voie pour payer.

La conviction sur l’activité vint de la publicité. Kutskir rappela que ce n’est que quand les annonces rapportèrent 400 dollars par mois en 2017 qu’il crut au potentiel de Photopea, environ cinq ans après le début. L’éditeur gratuit rassemblait des gens, et cet usage devenait un vrai revenu.

En avril de cette année-là, il ajouta le support de Sketch. Les fichiers de Sketch, alors utilisés sur Mac, pouvaient venir dans le navigateur pour voir et modifier calques et texte. Changer couleurs et dégradés ou enregistrer en PSD marchait aussi. La couverture de Photopea s’élargit au-delà de Photoshop vers d’autres logiciels de design.

La compatibilité avec les formats existants occupa une place centrale dans les principes qu’il exposa. Il dit que l’édition avancée devait marcher sans limites de coût ou d’appareil, prendre en charge des fichiers de nombreux logiciels et garder le travail utilisable même si un logiciel disparaissait. Les fichiers de design contiennent non seulement des images finies mais les calques et textes pour modifier. Garder cette structure utilisable dans d’autres logiciels fixa la direction de Photopea.

La promotion initiale ne fut pas facile. Kutskir commenta chaque publication sur les alternatives à Photoshop et promut Photopea sur Reddit et Hacker News, mais dit que près de 90 % de ses publications et commentaires furent supprimés comme autopromotion. Les demandes d’avis aux youtubeurs restèrent presque sans réponse, et ceux qui répondirent demandèrent des paiements inaccessibles. Avec le temps, des gens à qui il n’avait jamais rien demandé commencèrent à publier avis et tutoriels, et ces textes et vidéos apportèrent de nouveaux utilisateurs.

Fin 2017, plus de 2,5 millions de personnes avaient visité Photopea, avec 120 000 heures d’usage. Outre écrire le programme, Kutskir fit icônes, logo et blog officiel. Il résolut aussi 400 bugs et demandes de fonctions d’utilisateurs. Quand les réactions s’améliorèrent, il décida de continuer à développer autant que possible.

En 2019, le temps de travail annuel des utilisateurs dans Photopea crût à 5 millions d’heures. Ses revenus déclarés d’alors étaient d’environ 250 000 dollars, soit 5 centimes par heure d’usage en moyenne. Avec plus de gens utilisant l’éditeur gratuit et des heures accumulées, le projet étudiant crût jusqu’à faire vivre son auteur.

La compatibilité continua à s’élargir. En 2020, il ajouta les fichiers Figma, important structure et styles et enregistrant en PSD. En 2021, le support d’Illustrator apporta tracés de formes, groupes et texte modifiable. Les fonctions pour amener chaque logiciel dans le navigateur s’empilèrent une par une.

En avril 2021, Kutskir dit que les revenus des douze derniers mois frôlaient 1 million de dollars. Près de 90 % venaient des annonces, le reste d’abonnements premium sans annonces et de licences de version auto-hébergée. Dans un entretien de septembre, il situa les visites mensuelles à 10 millions et l’usage mensuel à 1,5 million d’heures. Une structure où l’activité croissait sans que les utilisateurs paient directement s’installa.

Comment le programme tourne compta pour cette échelle. Photopea charge le code de l’éditeur depuis le web, puis fait le traitement central d’image sur l’appareil de l’utilisateur. L’édition de base n’a pas besoin d’envoyer chaque fichier source au serveur de l’exploitant. Donc plus d’utilisateurs n’exigeaient pas proportionnellement plus de serveurs pour leurs opérations.

L’hébergement web que Kutskir déclara pour 2021 coûtait 50 dollars par an. Ensuite, avec plus de trafic, il passa à un plan à 600 dollars par an, expliqua-t-il en 2026, après avoir été averti qu’il utilisait plus de trafic que tous les autres clients réunis.

La distribution web réduisit aussi la charge de maintenance. Un programme installable séparé exigerait de développer et gérer sa version, en plus d’utilisateurs sans mise à jour signalant des bugs déjà corrigés. Kutskir expliqua cette charge en concret quand on demanda une version indépendante. L’éditeur web garda simple le chemin du code corrigé à l’utilisateur.

Le support alimenta directement les fonctions. En 2020, Kutskir dit que les tickets résolus sur GitHub atteignaient 2 300. Dans un fil Hacker News de 2021, la fonction ‘Color to Alpha’ de GIMP pour rendre une couleur transparente vint sur le tapis. Il répondit dans le même fil qu’il l’avait ajoutée à Photopea.

Il tenta aussi de former une équipe. Dans un entretien de 2021, Kutskir dit qu’il travaillait avec plusieurs programmeurs et voulait une équipe marchant sans lui. La fonction d’enregistrement PeaDrive et certains filtres furent faits par d’autres. Mais expliquer le travail, relire les résultats et demander des corrections était difficile, et valorisant sa propre vitesse, il garda l’essentiel du développement.

Le produit continua à croître techniquement après la croissance des revenus. En avril 2024, il ajouta la couleur 16 et 32 bits plus l’accélération GPU, ouvrant et enregistrant des PSD à plus d’information couleur. Suivirent des fonctions d’édition précise, comme adoucir les bandes dures en réglant fort la luminosité. Ce fut le résultat d’élargir pendant plus d’une décennie la portée que la première version ne couvrait qu’avec des limites.

Selon son bilan de 2026, Photopea fut utilisé 350 millions de fois en 2025, avec 1 milliard de fichiers ouverts par les utilisateurs. Quatorze ans avaient passé depuis le début. Il dit que développer Photopea après ses études fut le seul emploi qu’il ait eu.

Des chances de vendre vinrent aussi. Kutskir rappela avoir refusé une offre de 5 millions de dollars quand il gagnait 500 000 par an, doutant que cet argent améliore beaucoup sa vie. Construire et faire grandir Photopea était amusant, et il craignait de ne rien trouver d’aussi amusant après une vente. Il choisit de rester propriétaire et créateur du produit.
