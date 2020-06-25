---
layout: article
title: Ne pas trop râter sa présentation
comment: true
category: formation tips
tags: formation tips
comment: true
published: true
---

Expliquer son travail à travers une présentation est un exercice récurent dans le monde de l'entreprise. Je vous propose de vous filer 2, 3 tuyaux pour vous aider dans cet exercice, celui des présentations dites "techniques" si vous n'avez pas trop l'habitude. Le but de ces présentations est de faire passer un message, et vous êtes entierement résponsable que ce message passe (ou pas). Si quelqu'un s'endort, c'est que malheureusement votre présentation n'est pas très interressante. La mission est de prendre l'auditoire par la main et de l'emmener au bout de votre présentation.

# Le fond

Racontez un histoire qui passionne ou au moins garde un minimum de lueur de vie dans l'oeil de l'auditoire. Voilà une bonne recette. Après avoir rapidement présenté le contexte en se limitant à ce qui a de l'importance pour comprendre la suite, on présente le problème technique que l'on doit résoudre, et dont on va présenter la solution. On déroule ensuite la présentation de la solution. Premièrement de façons théoriques (s'il y a lieu de le faire) puis on parle de son implémentation. On pourra discuter des différentes options possibles. Viens le temps de présenter les problèmes rencontrés pendant le développement de la solution et comment on y a fait fasse. On peut ensuite présenter les performances ou résultats, en comparaison de ce qu'on espérait, et voilà, on est logiquement à la conclusion. 

## Le plan type qui marche presque à tout les coups

J'ai une une préférence par une présentation qui commence directement par le contexte et/ou la problématique, pour ensuite présenter le plan, qui lui est consacré uniquement à la résolution de la problématique. Il faut compter une minute de présentation par diapo. À vous de jaugez le nombre de diapos à fournir et donc le détail de ce que vous devez fournir en fonction du temps de présentation que l'on vous demande.
Le plan de base peut ressembler à celà :
+ Diapo de Présentation : Titre, Nom, Date, ...
+ Contexte : petit ou gros projet, travail seul ou en équipe, ...
+ Problématique (éventuellement sur 2 diapos)
+ Ce qui a été fait pour résoudre le problème
+ Les problèmes supplémentaires rencontrés, lors du déploiement ou des tests de la solution
+ Les correctifs appliqués
+ Conclusion : ce qui a été fait, est ce que celà fonctionne bien, et comme celà a été prévu. Ce qu'il reste à faire, à améliorer, ...

# La forme

Il y a un certain nombre d'éléments **incontournable** à mettre dans votre présentation : 

+ Des numéros de pages, c'est autant pour vous, que pour votre auditoire et faciliter la séance de questions rituelles à la fin de la présentation.
+ Une diapo de garde regroupant le titre de la présentation, vos noms et prénoms, l'organisme ou service pour lequel vous présentez et la date du jour. Bonus, votre mail.
+ Une diapo avec un plan.
+ Une diapo de conclusion.

Il y a aussi des choses à **ne pas faire** dans une présentation :
+ maximiser les schémas et images au profits du texte
+ maximum 3 points par diapos.
+ Mettez du contenu dans vos titres : évitez les "Introduction", "Partie I", ou même "Implémentation" ou "Test"

# L'outils

Encore une fois, je vous encouragerais à utiliser **markdown** pour réaliser vos présentation. L'idéal est d'utiliser [L<sup>A</sup>T<sub>E</sub>X](https://fr.wikibooks.org/wiki/LaTeX) et son paquet Beamer. Mais celà nécessite d'avoir une installation complète de L<sup>A</sup>T<sub>E</sub>X, ce qui peut être un peu complexe à mettre en place. Surtout qu'avec markdown, vous aurez le même résultat car le fichier source est compilé en pdf via Latex, que la syntaxe est ultra simple et assez riche, et que l'utilisation est tout aussi simple (surtout sour Linux en utilisant *pandoc*). 
[Le lien qui va bien](https://pandoc.org/MANUAL.html#structuring-the-slide-show)
```markdown
# Techno

## Cluster Hadoop

+ Système de fichiers distribué
+ Algo : (Split)  Map -- Reduce


\includegraphics[width=4in]{mapreduce.jpg}


## Base de Données NoSQL

+ HBase : cube multidimensionnel
+ Elastic Search : orientée documents
+ Redis : clées / valeurs
+ MongoDB : orientée documents

\includegraphics[width=4in]{document.png}


```
La ligne de commande de base
```
pandoc -st beamer bigdata.md -o fichier.pdf
```
En configurant un thème Beamer issue de Latex : 
```
pandoc -st beamer bigdata.md -V theme:Warsaw -o fichier.pdf
```
En utilisant un thème maison :
```
pandoc -st beamer bigdata.md -V theme:dvpt -o fichier.pdf
```

# Le jour J

C'est le jour J, vous devez présenter. À vous de jouer, en piste!! Afin de vous faciliter la vie, n'hésitez pas à apprendre par coeur ce que vous devez dire sur le début et la fin de chaque diapos. Ceci afin de ne pas bredouiller au début de chaque diapos et de garder le lien logique entre chaque diapo. Un petit trait d'humour au début de la présentation peut s'avérer également utile, surtout pour vous détendre et vous accrochez avec l'auditoire. N'oubliez pas que les gens qui sont venus vous écoutez, ne sont pas là pour vous manger ou vous jetez des cailloux, non, ils sont là pour vous écouter, pour apprendre quelques choses qui vient de vous. Donner le meilleur de vous même et ça se passera bien.

