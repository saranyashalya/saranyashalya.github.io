---
layout: page
permalink: /publications/
title: Patents & Publications
description: Patents and selected publications.
nav: true
nav_order: 2
---

<style>
  .patents-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin: 24px 0; }
  .patent-card { background: var(--global-surface-color, #161b22); border: 1px solid var(--global-divider-color, #30363d); border-radius: 12px; padding: 28px; transition: all 0.25s ease; display: block; text-decoration: none !important; position: relative; overflow: hidden; }
  .patent-card:hover { border-color: var(--global-theme-color, #58a6ff); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(88, 166, 255, 0.12); text-decoration: none !important; }
  .patent-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #3fb950, #58a6ff); opacity: 0; transition: opacity 0.25s; }
  .patent-card:hover::before { opacity: 1; }
  .patent-card .card-type { display: inline-block; background: rgba(63, 185, 80, 0.1); border: 1px solid rgba(63, 185, 80, 0.3); border-radius: 6px; padding: 3px 10px; font-size: 0.7em; font-weight: 600; color: #3fb950; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
  .patent-card .card-title { font-size: 1.15em; font-weight: 700; color: var(--global-text-color, #e6edf3); margin-bottom: 10px; line-height: 1.3; }
  .patent-card .card-authors { font-size: 0.85em; color: var(--global-text-color-light, #8b949e); margin-bottom: 12px; }
  .patent-card .card-summary { font-size: 0.85em; color: var(--global-text-color-light, #8b949e); line-height: 1.6; margin-bottom: 16px; }
  .patent-card .card-meta { display: flex; flex-wrap: wrap; gap: 8px; }
  .patent-card .card-meta .tag { background: var(--global-code-bg-color, #21262d); border: 1px solid var(--global-divider-color, #30363d); border-radius: 4px; padding: 3px 8px; font-size: 0.7em; color: var(--global-text-color-light, #c9d1d9); }
  .patent-card .card-arrow { position: absolute; bottom: 20px; right: 20px; color: var(--global-theme-color, #58a6ff); font-size: 1.2em; opacity: 0; transition: opacity 0.25s, transform 0.25s; }
  .patent-card:hover .card-arrow { opacity: 1; transform: translateX(4px); }

  .pub-cta { margin-top: 48px; padding: 24px; background: var(--global-surface-color, #161b22); border: 1px solid var(--global-divider-color, #30363d); border-radius: 12px; text-align: center; }
  .pub-cta p { color: var(--global-text-color-light, #8b949e); font-size: 0.9em; margin: 0; }
  .pub-cta a { color: var(--global-theme-color, #58a6ff); }

  @media (max-width: 768px) { .patents-grid { grid-template-columns: 1fr; } }
</style>

## Patents

<div class="patents-grid">

  <a href="https://patents.google.com/patent/US12592953B2/en" target="_blank" rel="noopener" class="patent-card">
    <span class="card-type">US Patent · Granted 2026</span>
    <div class="card-title">Methods and Apparatuses for Detecting and Localizing Faults Using Machine Learning Models</div>
    <div class="card-authors">Tahar Zanouda, <strong>Saranya Govindaraj</strong>, Dominik Budyn, Martin Rydar</div>
    <div class="card-summary">A method of pre-processing data for training ML models to detect anomalies during procedure execution at network nodes — obtaining procedure-level time-series data and deriving feature time-series for training models associated with a given procedure.</div>
    <div class="card-meta">
      <span class="tag">US12592953B2</span>
      <span class="tag">Machine Learning</span>
      <span class="tag">Anomaly Detection</span>
      <span class="tag">Network Nodes</span>
      <span class="tag">Ericsson</span>
    </div>
    <span class="card-arrow">→</span>
  </a>

</div>

## Publications

<div class="pub-cta">
  <p>Papers in preparation. In the meantime, see the <a href="/blog/">Blog</a> for technical write-ups on Knowledge Fabric, RAG, and Agentic AI.</p>
</div>
