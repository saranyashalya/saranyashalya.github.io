---
layout: page
permalink: /blog/
title: Blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<style>
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin: 24px 0; }
  .blog-card { background: var(--global-surface-color, #161b22); border: 1px solid var(--global-divider-color, #30363d); border-radius: 12px; padding: 28px; transition: all 0.25s ease; display: block; text-decoration: none !important; position: relative; overflow: hidden; }
  .blog-card:hover { border-color: var(--global-theme-color, #58a6ff); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(88, 166, 255, 0.12); text-decoration: none !important; }
  .blog-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #58a6ff, #bc8cff); opacity: 0; transition: opacity 0.25s; }
  .blog-card:hover::before { opacity: 1; }
  .blog-card .card-date { display: inline-block; background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 6px; padding: 3px 10px; font-size: 0.7em; font-weight: 600; color: #58a6ff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
  .blog-card .card-title { font-size: 1.15em; font-weight: 700; color: var(--global-text-color, #e6edf3); margin-bottom: 10px; line-height: 1.3; }
  .blog-card .card-description { font-size: 0.85em; color: var(--global-text-color-light, #8b949e); line-height: 1.6; margin-bottom: 16px; }
  .blog-card .card-meta-row { display: flex; align-items: center; gap: 12px; font-size: 0.75em; color: var(--global-text-color-light, #8b949e); margin-bottom: 12px; }
  .blog-card .card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .blog-card .card-tags .tag { background: var(--global-code-bg-color, #21262d); border: 1px solid var(--global-divider-color, #30363d); border-radius: 4px; padding: 3px 8px; font-size: 0.7em; color: var(--global-text-color-light, #c9d1d9); }
  .blog-card .card-arrow { position: absolute; bottom: 20px; right: 20px; color: var(--global-theme-color, #58a6ff); font-size: 1.2em; opacity: 0; transition: opacity 0.25s, transform 0.25s; }
  .blog-card:hover .card-arrow { opacity: 1; transform: translateX(4px); }

  @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
</style>

<div class="post">

<div class="blog-grid">

  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  {% for post in postlist %}

  {% if post.external_source == blank %}
    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
  {% else %}
    {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
  {% endif %}

  <a href="{{ post.url | relative_url }}" class="blog-card">
    <span class="card-date">{{ post.date | date: '%B %d, %Y' }} · {{ read_time }} min read</span>
    <div class="card-title">{{ post.title }}</div>
    <div class="card-description">{{ post.description }}</div>
    <div class="card-tags">
      {% for tag in post.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
    <span class="card-arrow">→</span>
  </a>

  {% endfor %}

</div>

{% if page.pagination.enabled %}
{% include pagination.liquid %}
{% endif %}

</div>
