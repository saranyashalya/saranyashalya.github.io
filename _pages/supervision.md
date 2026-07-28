---
layout: page
permalink: /supervision/
title: Thesis & Internship Supervision
description: Master's thesis and internship projects I have supervised or co-supervised.
nav: true
nav_order: 4
---

<style>
  .supervision-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin: 32px 0; }
  .supervision-card { background: var(--global-surface-color, #161b22); border: 1px solid var(--global-divider-color, #30363d); border-radius: 12px; padding: 28px; transition: all 0.25s ease; display: block; text-decoration: none !important; position: relative; overflow: hidden; }
  .supervision-card:hover { border-color: var(--global-theme-color, #58a6ff); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(88, 166, 255, 0.12); text-decoration: none !important; }
  .supervision-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #58a6ff, #bc8cff); opacity: 0; transition: opacity 0.25s; }
  .supervision-card:hover::before { opacity: 1; }
  .supervision-card .card-type { display: inline-block; background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 6px; padding: 3px 10px; font-size: 0.7em; font-weight: 600; color: #58a6ff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
  .supervision-card .card-title { font-size: 1.15em; font-weight: 700; color: var(--global-text-color, #e6edf3); margin-bottom: 10px; line-height: 1.3; }
  .supervision-card .card-authors { font-size: 0.85em; color: var(--global-text-color-light, #8b949e); margin-bottom: 12px; }
  .supervision-card .card-summary { font-size: 0.85em; color: var(--global-text-color-light, #8b949e); line-height: 1.6; margin-bottom: 16px; }
  .supervision-card .card-meta { display: flex; flex-wrap: wrap; gap: 8px; }
  .supervision-card .card-meta .tag { background: var(--global-code-bg-color, #21262d); border: 1px solid var(--global-divider-color, #30363d); border-radius: 4px; padding: 3px 8px; font-size: 0.7em; color: var(--global-text-color-light, #c9d1d9); }
  .supervision-card .card-arrow { position: absolute; bottom: 20px; right: 20px; color: var(--global-theme-color, #58a6ff); font-size: 1.2em; opacity: 0; transition: opacity 0.25s, transform 0.25s; }
  .supervision-card:hover .card-arrow { opacity: 1; transform: translateX(4px); }

  .supervision-cta { margin-top: 48px; padding: 24px; background: var(--global-surface-color, #161b22); border: 1px solid var(--global-divider-color, #30363d); border-radius: 12px; text-align: center; }
  .supervision-cta p { color: var(--global-text-color-light, #8b949e); font-size: 0.9em; margin: 0; }
  .supervision-cta a { color: var(--global-theme-color, #58a6ff); }

  @media (max-width: 768px) { .supervision-grid { grid-template-columns: 1fr; } }
</style>

<div class="supervision-grid">

  <a href="/supervision/genai-coding-assistants-thesis/" class="supervision-card">
    <span class="card-type">Master's Thesis · Spring 2026</span>
    <div class="card-title">Evaluating Generative AI Coding Assistants in Enterprise Software Development</div>
    <div class="card-authors">Louise Bergman & Reena Thomas · Linnaeus University</div>
    <div class="card-summary">Mixed-methods study of 160 enterprise developers evaluating Amazon Q Developer and AWS Kiro using the SPACE framework and Task–Technology Fit theory. Key finding: task-technology fit — not usage frequency — predicts productivity gains.</div>
    <div class="card-meta">
      <span class="tag">SPACE Framework</span>
      <span class="tag">Task–Technology Fit</span>
      <span class="tag">Amazon Q Developer</span>
      <span class="tag">AWS Kiro</span>
      <span class="tag">160 Developers</span>
    </div>
    <span class="card-arrow">→</span>
  </a>

</div>

<div class="supervision-cta">
  <p>Open to supervising future master's theses and internships on Generative AI, RAG, agentic systems, and ML evaluation.<br>Reach out via <a href="mailto:saranya.shalya@gmail.com">email</a>.</p>
</div>
