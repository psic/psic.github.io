---
layout: article
title: Une boîte mail unifiée en CLI
category: CLI
mermaid: true
---

J'étais un utilisateur très satisfait de claws-mail [liens] (ou sylpheed) tant que je n'avais qu'une seule boîte mail. La multiplication et diversification de mes activités professionnelles et associatives ainsi que la quasi-obligation d'avoir un compte chez gmail pour accéder à certains services font que je me retrouve (selon les saison) avec un minimum de trois boîtes mails actives. Inutile de préciser que l'utilisation de webmail n'est pour moi qu'une solution de secours d'autant qu'il est plus pratique d'avoir un outils dédier aux mails, et non pas un ou plusieurs onglets perdu quelques part dans la forêt d'onglets qu'est mon navigateur. Mais surtout, ce que je voulais, c'est un lecteur de mail qui me propose une vue unifiée de l'ensemble de mes boîtes mails (en IMAP). Voir en un coup d'oeil l'ensemble des mails de mes boîtes de réception et pouvoir y répondre ou agir sur un mail en cliquant un minimum (avec une synchronisation totale de ce qui est fait en local et de ce qu'il y a sur le serveur). Je n'ai pas trouvé de lecteurs de mails graphiques ni réussi à configurer mon lecteur préféré (claws-mail) afin d'obtenir ce résultat. Je me suis alors tourné vers des solutions en mode console, d'autant plus que je recherche de plus en plus ce type de solutions, surtout quand elles sont bien pensées.

# Alpine & Mutt

Dans un premier temps, j'ai essayé des logiciels de référence dans ce domaine, à savoir Alpine [liens] & Mutt [liens]. Effectivement, ces logiciels sont bien pensés et font tout ce que l'on peu attendre d'un lecteur de mail. La configuration peut paraître un peu fastidieuse, mais bon quand c'est fait, c'est fait. Ma préférence entre les deux va à Mutt. Mais que ce soit pour l'un ou pour l'autre, la configuration d'une boîte mail unifiée est très (trop) complexe et je n'ai pas réussi à me faire un Mutt aux petits oignions.

#  Notmuch & Alot 

[NotMuch](https://notmuchmail.org/) est un logiciel qui ne fait qu'une toute petite chose : il tag vos mails. Il enregistre où sont ranger vos fichiers mails, les indexe et leur appose un tag en fonction de règle que vous écrivez. Le logiciel [a few](https://afew.readthedocs.io/en/latest/) permet d'écrire ces règles de façons un peu plus simple que ne le permet notMuch, mais le principe reste le même. Il possède un puissant moteur de recherche qui vous permet de faire des recherche en utilisant ces tag, mais également les dates des mails ou d'autres attributs. Si vous recevez des mails de plusieurs adresses, que vous taggez tout ces mails entrants avec notMuch sur par exemple un tag INBOX (vous en plus leurs donner un tag par adresse mail), puis que vous faîtes une requête à notMuch sur le tag INBOX, vous avez **Une boîte mail unifiée** !! Youpi!

```mermaid
graph LR;
    A[Mails entrants]
    B[NotMuch INBOX Tag]
    C[Requête sur INBOX Tag]
    D[Boîte mail unifiée]
    A-->B;
    B-->C;
    C-->D;
```


Il ne reste plus qu'un logiciel front-end pour afficher les mails et les gérer en utilisant les tags de notMuch. Mutt le fait, mais c'est encore une fois compliqué à configurer. Le logiciel [aLot](http://alot.readthedocs.io/) par contre fait cela très bien, mais alors vraiment bien de façons simple et élégante.

## NotMuch -- config

HHHHHHHHHh

##  Alot -- config

GGGGGGg


# Isync & Msmtp

```mermaid
graph LR;
    A[Mails entrants]
    B[NotMuch INBOX Tag]
    C[Requête sur INBOX Tag]
    D[Boîte mail unifiée]
    A-->B;
    B-->C;
    C-->D;
```

## Isync -- config

## Msmtp -- config

# TODO
 Avoir une gestion de l'adresse book directement depuis alot.
 Avoir une solution de spam efficace.
