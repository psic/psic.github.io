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


### Installer & configurer

#### Installation

L'installation consiste simplement à copier les fichiers des repos github ci-dessus dans le repertoire `plugins` de votre installation. Soit vous clonez les repos, soit vous téléchargez les archives que vous décompressez. Ensuite, vous avez deux options. Soit vous placez ces fichiers dans des repertoires respectifs `MySQLGraphPlugin` et `MySQLListPlugin`. Soit vous placez le contenu de ces archives/repertoires directement à la racine du répertoire `plugins`, ce qui vous permettra de partager la configuration des connexions de base de données entre les deux plugins via le fichier `MySQLConfig.php` 
Une fois copié/déplacé les fichiers à l'endroit voulu, n'oubliez pas de supprimer les archives et les repertoires vides du répertoire `plugins`

#### Configuration des accès BD

Les accès aux bases de données se configure dans un fichier `MySQLConfig.php`. Selon l'option choisit à l'installation des plugins, vous pouvez avoir un fichier de configuration à la racine du répertoire `plugins` avec le reste de fichiers php des plugins, ou alors un fichier de configuration dans chacun des répertoires des plugins. La configuration des connexions aux bases de donnéees se fait sous forme d'un tableau php, mais rien de compliqué :

```
return array(
    'db1'=>array ( // database settings name for the plugin 
            'host' => 'localhost', //database host
	    'username' => 'admin', //database username
            'password' => 'passwd1', //database password
            'db_name' => 'db1_name' //database name
		)
 	    );
```
Ici, on a configuré une base de données que l'on utilisera plus loin avec le nom `db1`. On pourait ajouter un autre tableau pour configurer un base de données supplémentaire.


### Écrire ses requêtes SQL

Viens le temps d'écrire les requête SQL afin de rappatrier les données que l'on va afficher sous forme de listes, de tableau ou sous formes de graphes. Pour cela, vous devez les déclarer dans le fichier de configuration général de *PicoCMS*, `config/config.yml`, en y ajoutant la config suivante :

```
mysql_source:
 db1:                             # First database config name
   #query_name: "SQL Query, SELECT only"
   select_users: "select * from user limit 2"
   select_android_user: "select * from user  where is_android = false limit 3"

```

Utiliser uniquement `"` pour délimiter vos requête, et non pas `` ` ``, qui peut être utiliser dans le SQL. Maintenant que l'on a des requêtes de déclarer, on va voir comment les utiliser dans nos fichiers markdown pour générer du contenu.


### Faire des Listes


On utilise directement les requêtes déclarées dans nos fichiers markdown avec la syntaxe suivante :

+ `query` : le nom de la requête à utiliser telle qu'elle est déclarée dans le fichier de config de Pico.
+ `row` : le markdown que vous voulez insérer dans votre contenu pour chaque ligne de résultat. Utilise `{` et `}` pour désigner vos nom de colonnes.

Pour une liste : 

```
[db_source query="select_users" row=" + {id} *email* : {email}" ]
```

Ou un tableau : 

```
| id | email |
|----|:------|
[db_source query="select_users" row=" | {id} | {email} |" ]
```

### Faire des Graphes

On utilise directement les requêtes déclarées dans nos fichiers markdown avec la syntaxe suivante :

+ `query` : le nom de la requête à utiliser telle qu'elle est déclarée dans le fichier de config de Pico.
+ `graph` : détermine le type de graphique voulue. Choisir parmis ces [type de graphe](https://www.goat1000.com/svggraph.php#graph-types). BarGraph, LineGraph, PieGraph, ...
+ `is_data_column` : boolean 0/1 (default : 1). Détermine si les données sont en colonnes ou en ligne.
	+ `is_data_column = "1"` : Les données sont en colonnes et les entêtes de colonnes sont utilisés pour l'axe des abscisses. 
        
	|is_android|is_iphone|
	|----------|---------|
	|    5     |    2    |

	+ `is_data_column = "0"` : Les données sont en lignes et les données de la première colonne sont utilisées pour l'axde des abscisses.
	        
	|   Month     |   Sale  |
	|-------------|---------|
	|    January  |    300  |
	|    February |    250  |
	|    March    |    123  |
	|    April    |    29   |
							    
+ `width` & `height` (optional) : Largeur et hauteur de votre graphe (default : 640x480) 
+ `title` : Titre de votre graphe.
+ `settings` : vous pouvez ajouter des paramètres supplémentaires dans du *presque JSON*. Voir [setting](https://www.goat1000.com/svggraph-settings.php#general-options). `settings="{'back_colour': 'white', 'graph_title': 'Start of Fibonacci series'}"` (utiliser `` ` `` dans ce JSON à la place de `"`)

```
[db_graph  query="count1" width="500" height="400" title="My Graph Title" graph="PieGraph"]
```

```
[db_graph  query="sale" title="Sale By Month" graph="LineGraph" is_data_column="0"]
```

## Dessiner des graphes à partir de fichier CSV

### Installatoin

Copy the `CSVGraphPlugin.php`  into the `plugins` folder.

### Utilisation 

```
[csv_graph file="/var/www/pico/data/user.csv" file="/var/www/pico/data/userIOS.csv" file="/var/www/pico/data/userAndroid.csv" graph="MultiLineGraph" is_data_column="0"]
```


```
[csv_graph file="/var/www/pico/data/users.csv"  graph="PieGraph" ]
```

+ `file` : the filename of your csv file. Can add several filenames (for *MultiLineGraph* for instance)
+ `graph` : Choose any of the value in [grap type](https://www.goat1000.com/svggraph.php#graph-types). BarGraph, LineGraph, PieGraph, ...
+ `is_data_column` : boolean 0/1 (default : 1). Set if the data are in row or colum.
    + `is_data_column = "1"` : data are in columns and columns headers are used for x-axis. 
        
    |is_android|is_iphone|
    |----------|---------|
    |    5     |    2    |

    + `is_data_column = "0"` : data are in rows and the first column is used for x-axis.
			        
    |   Month     |   Sale  |
    |-------------|---------|
    |    January  |    300  |
    |    February |    250  |
    |    March    |    123  |
    |    April    |    29   |
							    
+ `width` & `height` (optional) : the width and the heigth of your chart (default : 640x480) 
+ `title` : the title of your chart
+ `settings` : you can add any of settings in *JSON style*. See [setting](https://www.goat1000.com/svggraph-settings.php#general-options). `settings="{'back_colour': 'white', 'graph_title': 'Start of Fibonacci series'}"` (use `` ` `` in this JSON settings instead of `"`)

### Get data from MySQL DB in bash script

Bash script to make a query to you MySQL database and append the result to the end of a file. Call this script from cron job to get daily values.


```
#!/bin/bash
BASEDIR=$(dirname $(readlink -f $0))
MYSQL_DB=db_name
MYSQL_USER=user
MYSQL_PWD=pwd

today=`date +\%Y-\%m-\%d`

mysql $MYSQL_DB -u $MYSQL_USER -p$MYSQL_PWD -se "SELECT concat(curdate(),',',count(*)) FROM users \
                                        WHERE date_signin = curdate();">>$BASEDIR/newuser.csv
```

## Envoyer des rapports par mail

# Ce qu'on pourrait ajouter

