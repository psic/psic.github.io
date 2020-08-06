---
layout: article
title: Un Dashboard simple 
category:  tips
tags:  tips
key: pico-dashboard 
---

Construire son propre dashboard (tableau de gestion) afin de surveiller et présenter les données, révéler et surveiller les indicateurs clefs (KPI) cachés dans vos bases de données en moins d'une heure avec des logiciels libres et gratuits.En plus, on va faire un truc un peu stupide. On va utiliser un CSM, à savoir [PicoCMS](http://picocms.org/), qui est un *flat-file* CMS. C'est à dire qu'on va utiliser un CMS sans base de données, pour monitorer une base de données.

# Contexte 

Je participe au dévellopement d'une application avec des utilisateurs, des évenements, des trucs et des machins stockés dans une base de données. Pour savoir ce qui se passait dans notre bazar, ce que faisait réélement nos utilisateurs dans notre app', il nous fallait une solution pratique, simple à mettre en place car on avait autre chose à faire que de passer beaucoup de temps là dessus (vu qu'on ne fait cela sur notre temps libre et qu'on a des choses bien plus urgentes à faire pour améliorer notre app'). Mais c'était assez important que tout le monde puissent avoir accès à un tableau de gestion (ou dashboard) où on expose un certain nombre de valeurs clés (KPI). Pour construire notre DashBoard, on aurait sûrement pu utiliser une solution pré-existante, mais je suis taquin, j'ai choisi d'utiliser *PicoCMS*.

# PicoCMS

Pour faire simple PicoCMS est un système de gestion de contenu, ou CMS. C'est à dire un logiciel qui une fois installé sur un serveur web permet de faire un site internet en 2 temps, 3 mouvements. Ici, pas de base de données. Tout le contenu de votre site se trouve dans des fichiers markdown. Vous pouvez toujours appliquer un thème à votre site, pour lui donner l'apparence voulue. Il y a aussi tout un tas de plugin pour faire tout un tas de chose, même de l'authentification et des accès par utilisateur, j'en reparlerais un peu plus tard. C'est un outils vraiment génial, car très simple à mettre en oeuvre, et très facile à "tordre". Pour mettre rapidement et simplement de la document en ligne, ou un petit wiki, je pense que c'est l'outils parfait. Je pense l'utiliser prochainement pour mettre mes cours à dispositions de mes apprenants.

## L'installation

La doc d'installation est par [là](http://picocms.org/docs/). Comme c'est écrit, c'est assez simple à installer, Vous avez 2 solutions, la plus simple étant de copier les fichiers venant du [github de Pico](https://github.com/picocms/Pico/releases/latest), de décompresser l'archive dans un repertoire de votre serveur web, et après un minimum de configuration du serveur web, ça marche. La deuxième solution est d'utiliser **composer** afin de pouvoir profiter plus facilement des mise à jour. Une troisième voie est possible et documenter. Elle permet d'utiliser *PicoCMS* dans un workflow utilisant github.
L'étape d'après est de configurer son serveur Web pour qu'il fasse fonctionner votre site web. Il vous au minimum PHP 5.3.6+ avec les extentions dom et mbstring. Jetez un oeil sur la [partie config de la doc](http://picocms.org/docs/#config) pour voir les options pour **Apache** et autre **NGINX**. Et là, ça devrait commencer à marcher et à s'afficher dans votre navigateur. Reste à créer du contenu et à customiser tout ça.
Encore une fois la création de contenu est extra simple. Voir par [là](http://picocms.org/docs/#creating-content). Vous n'avez qu'à créer un fichier markdown dans le répertoire **content**. Et hop c'est en ligne!! Pour la customisation, il existe un ensemble de thème par [ici](http://picocms.org/themes/). C'est souvent un ensemble de fichier à copier/télécharger dans le répertoire **themes**, et configurer l'option **theme** dans votre fichier de config `config/config.yml`.

# Faire un DashBoard

Faire un dashboard, c'est exraire de votre base de données des informations pertinnentes (en recoupant plusieurs informations de votre base par exemple, ou en observant leur évolution à travers le temps) et en les exploitants soit à travers des listes, des graphiques, que vous pouvez enrichir de commentaires. Tout ça pour avoir une vue synthétique en clin d'oeil. La solution que je vous propose ne s'addresse clairement pas au marketeux ou au gestionnaire car il va nous falloir savoir écrire du SQL, peut être un peu de bash. Ce n'est absolument du *click & click* , c'est à façonner à la main, et c'est pour cela que je vais essayer d'expliquer un peu comment tout cela marche.
 
## Intégrer des données MySQL

On a un flat CMS (sans base de données) d'installé et qui fonctionne, et c'est là que ça devient bizarre, car on va le connecter à une ou plusieurs base de données. Pour en afficher le contenu sous forme de liste ou de graphes. J'ai ecrit deux plugins pour celà, car il est très simple en quelques lignes de php d'écrire un plugin pour *PicoCMS*. [PicoCMS-MySQLList](https://github.com/psic/PicoCMS-MySQLList) pour afficher les données sous forme de liste, et [PicoCMS-MySQLGraph](https://github.com/psic/PicoCMS-MySQLGraph) pour afficher le résultats de vos requêtes SQL sous forme de graphes. 

### Configurer l'accès à la BD


### Faire des Listes


### Faire des Graphes


## Dessiner des graphes à partir de fichier CSV


## Envoyer des rapports par mail

# Ce qu'on pourrait ajouter
