---
layout: articles
title: Articles - Item (Cover + Excerpt + Read More)
articles:
  data_source: site.page
  show_excerpt: true
  show_readmore: true
---


Ici c'est Papa-riz ri

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
