# Un site dédié aux statistiques du Loto

## Objectif

Une application web (SEO friendly), en Français, qui affiche les statistiques de plusieurs jeux de hasard (Loto, EuroMillions, Keno, etc.).

Le but du site est de montrer aux joueurs l'improbabiilité de gagner, et de comparer leur "investissement" dans les jeux de hasard à d'autres types d'investissements (actions, crypto, etc.).

Le but est de montrer que les jeux de hasard sont une perte d'argent à long terme, et que les joueurs feraient mieux d'investir leur argent dans des actifs plus rentables.

## Fonctionnalités

L'application doit être une web app en Svelte et TypeScript, sans backend (toute persistence éventuelle se fera via le localStorage), et SEO friendly (server-side rendering).

Le site doit être responsive, et fonctionner bien sur mobile. Il doit être rapide à charger.

## En détail

Je vois le site comme un "texte à trou", avec des sections qui expliquent les différentes statistiques, et des graphiques pour illustrer les propos. L'utilisateur peut changer certains paramètres (jeu choisi (Loto, EuroMillions, etc.), nombre de fois qu'il joue par jour ou semaine etc., et durée de son "investissement" (nombre d'années)) pour voir comment cela affecte ses chances de gagner et son "investissement" total.
Il peut également choisir d'autres types d'investissements (actions, crypto, ETF, etc.) pour comparer les rendements.

## Les statistiques

- Probabilité de gagner un jour le jackpot
- Probabilité d'être gagnant net (sur le long terme)
- Probabilité d'être millionnaire
- Autres statistiques intéressantes que tu peux trouver

## Design

Le design doit être simple et épuré, avec une palette de couleurs neutres. Les graphiques doivent être clairs et faciles à comprendre.
Le design doit être moderne et ludique.

## Deployment

L'application doit être dockerisée. Elle doit également être testée via GitHub Actions, et deployée sur Docker Hub lors d'un merge sur main.
Un Makefile doit églament être disponible pour pouvoir facilement tester docker build et docker run l'application en local.