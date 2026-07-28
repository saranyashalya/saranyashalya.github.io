---
layout: page
title: "Evaluating GenAI Coding Assistants in Enterprise Software Development"
permalink: /supervision/genai-coding-assistants-thesis/
description: "A Master's thesis examining how developers perceive AI coding assistants (Amazon Q Developer & AWS Kiro) using the SPACE framework and Task-Technology Fit theory."
---

<style>
  .thesis-header { text-align: center; margin-bottom: 48px; padding: 32px; background: #161b22; border: 1px solid #30363d; border-radius: 12px; }
  .thesis-header h1 { font-size: 1.8em; background: linear-gradient(135deg, #58a6ff, #bc8cff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
  .thesis-header .subtitle { font-size: 1em; color: #8b949e; max-width: 700px; margin: 0 auto 16px; }
  .thesis-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 16px; }
  .thesis-meta .badge { background: #21262d; border: 1px solid #30363d; border-radius: 16px; padding: 4px 12px; font-size: 0.75em; color: #c9d1d9; }

  .findings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 32px 0; }
  .finding-card { background: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 20px; }
  .finding-card h4 { color: #58a6ff; font-size: 0.95em; margin-bottom: 8px; }
  .finding-card p { color: #8b949e; font-size: 0.85em; line-height: 1.6; margin: 0; }
  .finding-card .score { font-size: 1.4em; font-weight: 700; margin-bottom: 4px; }
  .finding-card .score.high { color: #3fb950; }
  .finding-card .score.mid { color: #d29922; }
  .finding-card .score.low { color: #f85149; }

  .section-title { color: #58a6ff; font-size: 1.3em; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #30363d; }

  .key-insight { background: linear-gradient(135deg, #161b22, #1c2431); border: 1px solid #30363d; border-radius: 12px; padding: 24px; margin: 32px 0; }
  .key-insight blockquote { font-size: 1.1em; font-style: italic; color: #e6edf3; margin: 0; line-height: 1.5; border: none; padding: 0; background: none; }

  .method-flow { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 24px 0; padding: 20px; background: #0d1117; border: 1px solid #30363d; border-radius: 10px; }
  .method-step { background: #21262d; border: 1px solid #30363d; border-radius: 6px; padding: 8px 14px; font-size: 0.8em; text-align: center; }
  .method-step .step-title { font-weight: 600; color: #58a6ff; font-size: 0.9em; }
  .method-step .step-desc { color: #8b949e; font-size: 0.85em; }
  .method-arrow { color: #484f58; font-size: 1.2em; }

  .tools-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
  .tool-card { background: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 20px; text-align: center; }
  .tool-card h4 { color: #e6edf3; margin-bottom: 8px; }
  .tool-card p { color: #8b949e; font-size: 0.8em; }
  .tool-card .tool-type { background: #21262d; border-radius: 4px; padding: 2px 8px; font-size: 0.7em; color: #bc8cff; display: inline-block; margin-top: 8px; }

  .implications-list { list-style: none; padding: 0; margin: 16px 0; }
  .implications-list li { padding: 10px 16px; margin: 6px 0; background: #161b22; border: 1px solid #30363d; border-radius: 8px; font-size: 0.85em; color: #c9d1d9; position: relative; padding-left: 32px; }
  .implications-list li::before { content: "→"; position: absolute; left: 12px; color: #3fb950; font-weight: 700; }

  @media (max-width: 768px) {
    .findings-grid { grid-template-columns: 1fr; }
    .tools-compare { grid-template-columns: 1fr; }
    .method-flow { flex-direction: column; }
    .method-arrow { transform: rotate(90deg); }
  }
</style>

<div class="thesis-header">
  <h1>Evaluating GenAI Coding Assistants in Enterprise Software Development</h1>
  <p class="subtitle">A SPACE and Task–Technology Fit (TTF) Analysis</p>
  <div class="thesis-meta">
    <span class="badge">Master's Thesis</span>
    <span class="badge">Linnaeus University</span>
    <span class="badge">Spring 2026</span>
    <span class="badge">160 Developers Surveyed</span>
    <span class="badge"><a href="/assets/pdf/thesis-genai-coding-assistants.pdf" target="_blank" style="color: #58a6ff; text-decoration: none;">📄 Download PDF</a></span>
  </div>
</div>

<h3 class="section-title">Overview</h3>

This master's thesis examines how software developers perceive the productivity impact of **Generative AI coding assistants** — specifically **Amazon Q Developer** and **AWS Kiro** — in a large telecom enterprise. The study uses a **mixed-methods survey** of 160 developers, combining quantitative analysis with thematic qualitative analysis.

The research integrates two frameworks:
- **SPACE Framework** — captures developer productivity across five dimensions: Satisfaction, Performance, Activity, Communication & Collaboration, and Efficiency & Flow
- **Task–Technology Fit (TTF)** — explains *why* productivity outcomes vary: it's not about how often you use the tool, but how well it fits your tasks

<h3 class="section-title">Research Methodology</h3>

<div class="method-flow">
  <div class="method-step"><div class="step-title">Survey Design</div><div class="step-desc">SPACE + TTF items</div></div>
  <span class="method-arrow">→</span>
  <div class="method-step"><div class="step-title">160 Developers</div><div class="step-desc">Enterprise context</div></div>
  <span class="method-arrow">→</span>
  <div class="method-step"><div class="step-title">Quantitative</div><div class="step-desc">Regression analysis</div></div>
  <span class="method-arrow">→</span>
  <div class="method-step"><div class="step-title">Qualitative</div><div class="step-desc">Thematic analysis</div></div>
  <span class="method-arrow">→</span>
  <div class="method-step"><div class="step-title">Findings</div><div class="step-desc">SPACE × TTF insights</div></div>
</div>

<h3 class="section-title">Tools Evaluated</h3>

<div class="tools-compare">
  <div class="tool-card">
    <h4>Amazon Q Developer</h4>
    <p>AI coding assistant integrated into IDEs, providing code suggestions, explanations, and debugging support</p>
    <span class="tool-type">Reactive Assistant</span>
  </div>
  <div class="tool-card">
    <h4>AWS Kiro</h4>
    <p>Broader task coverage across the software development lifecycle with agentic capabilities</p>
    <span class="tool-type">Agentic IDE</span>
  </div>
</div>

<h3 class="section-title">Key Findings: SPACE Dimensions</h3>

<div class="findings-grid">
  <div class="finding-card">
    <div class="score high">Strong</div>
    <h4>Satisfaction & Well-being</h4>
    <p>Developers report high satisfaction — coding assistants reduce tedium and make routine work more enjoyable. The strongest positive dimension.</p>
  </div>
  <div class="finding-card">
    <div class="score high">Strong</div>
    <h4>Efficiency & Flow</h4>
    <p>Significant improvements in maintaining flow state. Assistants reduce context-switching by keeping developers in their IDE for answers.</p>
  </div>
  <div class="finding-card">
    <div class="score mid">Moderate</div>
    <h4>Activity</h4>
    <p>Increased output for well-defined tasks like boilerplate, tests, and documentation. Less impact on complex, context-heavy work.</p>
  </div>
  <div class="finding-card">
    <div class="score mid">Moderate</div>
    <h4>Performance</h4>
    <p>Mixed results — faster initial output but increased verification effort. Net performance depends on task complexity and codebase maturity.</p>
  </div>
  <div class="finding-card">
    <div class="score low">Weakest</div>
    <h4>Communication & Collaboration</h4>
    <p>The most variable dimension. Assistants support individual work but don't consistently improve team dynamics or shared understanding.</p>
  </div>
</div>

<h3 class="section-title">Critical Insight: Task–Technology Fit Matters More Than Usage</h3>

<div class="key-insight">
  <blockquote>"Perceived task–technology fit is positively associated with all productivity dimensions, whereas utilization alone is not a statistically significant predictor. Productivity gains depend on how well coding assistants fit developers' tasks — not on how often they are used."</blockquote>
</div>

This is the study's most important finding: organizations should focus on **fit** (matching the right tool to the right task) rather than maximizing **adoption metrics** (usage frequency). A developer using an AI assistant twice a day on well-matched tasks gets more value than one using it constantly on ill-suited work.

<h3 class="section-title">Where AI Assistants Excel</h3>

<ul class="implications-list">
  <li>Code comprehension and explanation of unfamiliar codebases</li>
  <li>Troubleshooting and debugging with contextual suggestions</li>
  <li>Refactoring and modernizing legacy code patterns</li>
  <li>Documentation generation and inline comments</li>
  <li>Test scaffolding and boilerplate generation</li>
  <li>Reducing context-switching by answering questions in-IDE</li>
</ul>

<h3 class="section-title">Where They Struggle</h3>

<ul class="implications-list">
  <li>Limited access to enterprise-specific context (internal APIs, architecture decisions)</li>
  <li>Weak workflow integration with existing CI/CD and review processes</li>
  <li>Correctness and reliability issues requiring manual verification</li>
  <li>Operational instability and inconsistent availability</li>
  <li>Increased cognitive load from verifying AI-generated output</li>
  <li>Complex, cross-system tasks requiring deep domain knowledge</li>
</ul>

<h3 class="section-title">Implications for Organizations</h3>

<div class="findings-grid">
  <div class="finding-card">
    <h4>Focus on Fit, Not Frequency</h4>
    <p>Measure success by task-technology alignment, not adoption dashboards. High usage ≠ high value.</p>
  </div>
  <div class="finding-card">
    <h4>Invest in Context Access</h4>
    <p>Connect assistants to internal repositories, architecture docs, and codebases to improve relevance of suggestions.</p>
  </div>
  <div class="finding-card">
    <h4>Support Human Judgment</h4>
    <p>Don't replace developer decision-making. Position AI as augmentation for routine work, preserving autonomy for complex tasks.</p>
  </div>
  <div class="finding-card">
    <h4>Account for Verification Cost</h4>
    <p>Fast code generation means nothing if it creates downstream review and debugging overhead. Net productivity is what matters.</p>
  </div>
</div>

<h3 class="section-title">Thesis Details</h3>

| | |
|---|---|
| **Authors** | Louise Bergman, Reena Thomas |
| **Academic Supervisor** | Jan Aidemark (Linnaeus University) |
| **Industry Supervisors** | Saranya Govindaraj, Magnus Standar (Ericsson) |
| **University** | Linnaeus University, Department of Informatics |
| **Level** | Master's (Graduate), Course 5IK50E |
| **Term** | Spring 2026 |
| **Method** | Mixed-methods survey, 160 enterprise developers |
| **Frameworks** | SPACE, Task–Technology Fit (TTF), Human-Centered AI |
| **Tools Studied** | Amazon Q Developer, AWS Kiro |

<div style="text-align: center; margin-top: 40px;">
  <a href="/assets/pdf/thesis-genai-coding-assistants.pdf" target="_blank" style="display: inline-block; padding: 12px 24px; background: #58a6ff; color: #0d1117; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.2s;">📄 Download Full Thesis (PDF)</a>
</div>
