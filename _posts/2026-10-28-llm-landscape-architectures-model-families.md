---
layout: post
title: "The LLM Landscape: Architectures, Families, and How to Choose"
date: 2026-10-28
description: "A field map of today's large language model ecosystem — the architecture patterns underneath the hype, the major model families from OpenAI to Qwen, and a practical lens for picking the right one."
tags: [llm, architecture, model-families, open-weights, genai]
categories: [genai]
featured: false
---

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --llm-bg: #0d1117; --llm-card: #161b22; --llm-card2: #1c2333; --llm-border: #30363d;
    --llm-text: #e6edf3; --llm-text2: #8b949e; --llm-muted: #6e7681;
    --llm-blue: #58a6ff; --llm-purple: #a371f7; --llm-green: #3fb950;
    --llm-orange: #f0883e; --llm-cyan: #79c0ff; --llm-amber: #ffa657; --llm-red: #f85149;
  }
  .llm-wrap { font-family: 'Space Grotesk', 'Inter', sans-serif; color: var(--llm-text); line-height: 1.7; max-width: 1100px; margin: 0 auto; }
  .llm-wrap p { color: var(--llm-text); margin: 0 0 1rem; line-height: 1.75; }

  /* Layout */
  .llm-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; }
  .llm-sidebar { position: sticky; top: 5rem; align-self: start; height: calc(100vh - 6rem); overflow-y: auto; }
  .llm-sidebar-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--llm-muted); margin-bottom: 0.75rem; }
  .llm-sidebar a { display: block; padding: 0.35rem 0.75rem; border-left: 2px solid transparent; color: var(--llm-text2); text-decoration: none; font-size: 0.78rem; font-weight: 500; transition: all 0.2s; border-radius: 0 4px 4px 0; }
  .llm-sidebar a:hover { color: var(--llm-blue); border-left-color: var(--llm-blue); background: rgba(88,166,255,0.05); text-decoration: none; }
  .llm-sidebar a.active { color: var(--llm-blue); border-left-color: var(--llm-blue); font-weight: 600; background: rgba(88,166,255,0.08); }
  @media (max-width: 1000px) { .llm-layout { grid-template-columns: 1fr; } .llm-sidebar { display: none; } }

  /* Hero */
  .llm-hero { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--llm-border); }
  .llm-hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .llm-tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .llm-tag-blue { background: rgba(88,166,255,0.15); color: var(--llm-blue); border: 1px solid rgba(88,166,255,0.3); }
  .llm-tag-purple { background: rgba(163,113,247,0.15); color: var(--llm-purple); border: 1px solid rgba(163,113,247,0.3); }
  .llm-tag-green { background: rgba(63,185,80,0.15); color: var(--llm-green); border: 1px solid rgba(63,185,80,0.3); }
  .llm-tag-orange { background: rgba(240,136,62,0.15); color: var(--llm-orange); border: 1px solid rgba(240,136,62,0.3); }
  .llm-hero h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.2; color: var(--llm-text); margin: 0 0 1rem; letter-spacing: -0.02em; }
  .llm-hero-subtitle { font-size: 1.1rem; color: var(--llm-text); line-height: 1.6; margin: 0 0 1.5rem; max-width: 780px; opacity: 0.9; }

  /* Sections */
  .llm-section { margin-bottom: 3.5rem; scroll-margin-top: 5rem; }
  .llm-section h2 { font-size: 1.5rem; font-weight: 700; color: var(--llm-text); margin: 0 0 1.25rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.6rem; }
  .llm-section h2::before { content: ""; display: inline-block; width: 3px; height: 1.3em; background: linear-gradient(180deg, var(--llm-blue), var(--llm-purple)); border-radius: 2px; }
  .llm-section h3 { font-size: 1.1rem; font-weight: 600; color: var(--llm-text); margin: 2rem 0 0.75rem; }

  /* Callouts */
  .llm-callout { border-left: 3px solid; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; }
  .llm-callout-info { border-color: var(--llm-blue); background: rgba(88,166,255,0.07); }
  .llm-callout-success { border-color: var(--llm-green); background: rgba(63,185,80,0.07); }
  .llm-callout-warning { border-color: var(--llm-amber); background: rgba(255,166,87,0.07); }
  .llm-callout-spec { border-color: var(--llm-purple); background: rgba(163,113,247,0.07); }
  .llm-callout-head { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
  .llm-callout-info .llm-callout-head { color: var(--llm-blue); }
  .llm-callout-success .llm-callout-head { color: var(--llm-green); }
  .llm-callout-warning .llm-callout-head { color: var(--llm-amber); }
  .llm-callout-spec .llm-callout-head { color: var(--llm-purple); }
  .llm-callout p { margin: 0; font-size: 0.88rem; color: var(--llm-text); opacity: 0.9; }

  /* Cards */
  .llm-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
  .llm-inf { background: var(--llm-card); border: 1px solid var(--llm-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; border-top: 3px solid; }
  .llm-inf-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .llm-inf-title { font-size: 0.95rem; font-weight: 600; color: var(--llm-text); margin-bottom: 0.5rem; }
  .llm-inf-body { font-size: 0.83rem; color: var(--llm-text); line-height: 1.6; opacity: 0.85; }

  /* Quote */
  .llm-quote { background: linear-gradient(135deg, var(--llm-card), var(--llm-card2)); border: 1px solid var(--llm-border); border-radius: 0.875rem; padding: 1.75rem; margin: 2rem 0; }
  .llm-quote blockquote { font-size: 1.05em; font-style: italic; color: var(--llm-text); margin: 0 0 0.5rem; line-height: 1.5; border: none; padding: 0; background: none; }
  .llm-quote .attr { color: var(--llm-muted); font-size: 0.78rem; font-style: normal; }

  /* Table */
  .llm-table-wrap { overflow-x: auto; border-radius: 0.875rem; border: 1px solid var(--llm-border); margin: 1.5rem 0; }
  .llm-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
  .llm-table thead tr { background: var(--llm-card2); }
  .llm-table th { padding: 0.75rem 0.75rem; text-align: left; font-weight: 600; font-size: 0.68rem; color: var(--llm-text2); letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--llm-border); }
  .llm-table td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--llm-border); color: var(--llm-text); opacity: 0.9; vertical-align: top; }
  .llm-table tbody tr:last-child td { border-bottom: none; }
  .llm-table tbody tr:hover td { background: rgba(255,255,255,0.02); }
  .llm-pill { display: inline-block; padding: 0.1rem 0.5rem; border-radius: 9999px; font-size: 0.68rem; font-weight: 600; }
  .llm-pill-open { background: rgba(63,185,80,0.15); color: var(--llm-green); border: 1px solid rgba(63,185,80,0.3); }
  .llm-pill-closed { background: rgba(248,81,73,0.12); color: var(--llm-red); border: 1px solid rgba(248,81,73,0.3); }
  .llm-pill-mixed { background: rgba(255,166,87,0.12); color: var(--llm-amber); border: 1px solid rgba(255,166,87,0.3); }

  /* Architecture diagram */
  .llm-arch { background: var(--llm-card); border: 1px solid var(--llm-border); border-radius: 0.875rem; padding: 1.5rem; margin: 2rem 0; }
  .llm-arch-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--llm-muted); margin-bottom: 1rem; text-align: center; }
  .llm-arch-layers { display: flex; flex-direction: column; gap: 0; align-items: center; }
  .llm-arch-layer { width: 100%; max-width: 520px; padding: 0.875rem 1.25rem; border: 1px solid var(--llm-border); text-align: center; position: relative; }
  .llm-arch-layer:first-child { border-radius: 0.75rem 0.75rem 0 0; }
  .llm-arch-layer:last-child { border-radius: 0 0 0.75rem 0.75rem; }
  .llm-arch-layer + .llm-arch-layer { border-top: none; }
  .llm-arch-layer .layer-name { font-size: 0.82rem; font-weight: 700; }
  .llm-arch-layer .layer-desc { font-size: 0.7rem; color: var(--llm-text2); margin-top: 2px; }
  .llm-arch-arrow { text-align: center; color: var(--llm-muted); font-size: 0.9rem; padding: 4px 0; }

  /* Interactive family selector */
  .llm-fam { margin: 2rem 0; }
  .llm-fam-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .llm-fam-tab { cursor: pointer; padding: 0.4rem 0.9rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 600; border: 1px solid var(--llm-border); background: var(--llm-card); color: var(--llm-text2); transition: all 0.2s; }
  .llm-fam-tab:hover { border-color: var(--llm-blue); color: var(--llm-blue); }
  .llm-fam-tab.active { background: rgba(88,166,255,0.12); border-color: var(--llm-blue); color: var(--llm-blue); }
  .llm-fam-detail { background: var(--llm-card); border: 1px solid var(--llm-border); border-radius: 0.875rem; padding: 1.5rem; min-height: 120px; transition: all 0.3s; }
  .llm-fam-detail .vendor { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--llm-muted); margin-bottom: 0.4rem; }
  .llm-fam-detail h4 { font-size: 1.1rem; font-weight: 700; color: var(--llm-text); margin: 0 0 0.6rem; }
  .llm-fam-detail p { font-size: 0.86rem; color: var(--llm-text); opacity: 0.9; margin: 0 0 0.6rem; }
  .llm-fam-detail .meta { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .llm-fam-detail .meta span { font-size: 0.68rem; padding: 0.15rem 0.55rem; border-radius: 9999px; background: var(--llm-card2); border: 1px solid var(--llm-border); color: var(--llm-text2); }

  @media (max-width: 768px) { .llm-card-grid { grid-template-columns: 1fr; } }
</style>

<div class="llm-wrap">

<!-- Hero -->
<div class="llm-hero">
  <div class="llm-hero-tags">
    <span class="llm-tag llm-tag-blue">LLM</span>
    <span class="llm-tag llm-tag-purple">Architecture</span>
    <span class="llm-tag llm-tag-green">Open Weights</span>
    <span class="llm-tag llm-tag-orange">Model Families</span>
  </div>
  <h1>The LLM Landscape: Architectures, Families, and How to Choose</h1>
  <p class="llm-hero-subtitle">The model you pick is rarely the whole story — the architecture underneath it, the license it ships under, and the family it belongs to shape what it can do and where you can run it. This is a field map of today's large language model ecosystem: the patterns that keep recurring, the vendors that define the frontier, and a practical lens for matching a family to a problem.</p>
</div>

<!-- Layout -->
<div class="llm-layout">
<aside class="llm-sidebar">
  <div class="llm-sidebar-label">On this page</div>
  <a href="#why-map">Why a Map</a>
  <a href="#open-vs-closed">Open vs. Closed</a>
  <a href="#architecture">Architecture Patterns</a>
  <a href="#anatomy">Anatomy of a Model</a>
  <a href="#families">The Model Families</a>
  <a href="#explorer">Family Explorer</a>
  <a href="#choosing">How to Choose</a>
  <a href="#takeaways">Takeaways</a>
</aside>
<div class="llm-content">

<!-- Section: Why a Map -->
<div class="llm-section" id="why-map">
  <h2>Why the Landscape Needs a Map</h2>
  <p>Two years ago, "which LLM should I use?" had a short answer. Today the question splits into a dozen sub-questions: open weights or API? Dense or mixture-of-experts? Reasoning-tuned or general-purpose? Long-context or compact? Hosted by a frontier lab or self-hosted on your own hardware?</p>
  <p>The confusing part is that the <em>names</em> change faster than the <em>structure</em>. GPT, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen, Phi — each ships new versions constantly, but they cluster into a surprisingly stable set of architectural patterns and strategic bets. Understanding the structure beneath the branding is what lets you make durable decisions.</p>

  <div class="llm-callout llm-callout-info">
    <div class="llm-callout-head">The Core Idea</div>
    <p>A model family is defined less by a single checkpoint and more by three durable commitments: its <strong>architecture</strong> (how it's built), its <strong>licensing posture</strong> (how you can use the weights), and its <strong>specialization</strong> (what it's tuned to be good at). Pick the family by those, not by last week's benchmark.</p>
  </div>
</div>

<!-- Section: Open vs Closed -->
<div class="llm-section" id="open-vs-closed">
  <h2>The First Fork: Open Weights vs. Closed APIs</h2>
  <p>The single most consequential split in the landscape is not quality — it's access. Frontier closed models are consumed through an API; open-weight models can be downloaded, inspected, fine-tuned, and run on your own infrastructure. This decision cascades into cost, privacy, customization, and operational burden.</p>

  <div class="llm-card-grid">
    <div class="llm-inf" style="border-top-color: var(--llm-red);">
      <div class="llm-inf-label" style="color: var(--llm-red);">Closed / API</div>
      <div class="llm-inf-title">Frontier Capability, Zero Infra</div>
      <div class="llm-inf-body">GPT, Claude, and Gemini lead on raw capability and are available instantly via API. You trade control and data residency for frontier quality and no GPU bills. Best when capability-per-call matters more than ownership.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-green);">
      <div class="llm-inf-label" style="color: var(--llm-green);">Open Weights</div>
      <div class="llm-inf-title">Control, Privacy, Customization</div>
      <div class="llm-inf-body">Llama, Mistral, Gemma, Qwen, DeepSeek, Phi, and gpt-oss can be self-hosted and fine-tuned. You own the weights, keep data in-house, and avoid per-token pricing — at the cost of running and scaling the infrastructure yourself.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-amber);">
      <div class="llm-inf-label" style="color: var(--llm-amber);">The Hybrid Reality</div>
      <div class="llm-inf-body" style="margin-top:0.5rem;">Most production stacks mix both: a frontier API for the hardest reasoning, a self-hosted open model for high-volume or privacy-sensitive paths. The line is a routing decision, not a one-time choice.</div>
    </div>
  </div>

  <div class="llm-callout llm-callout-warning">
    <div class="llm-callout-head">"Open" Is a Spectrum, Not a Switch</div>
    <p>Open weights rarely mean open <em>training data</em>. Licenses range from permissive (Apache-2.0, as in many Mistral and Qwen releases) to community licenses with usage restrictions (some Llama releases). Always read the license before you build a business on a family.</p>
  </div>
</div>

<!-- Section: Architecture -->
<div class="llm-section" id="architecture">
  <h2>Architecture Patterns Underneath the Hype</h2>
  <p>Almost every model in this post is a decoder-only Transformer. The interesting differentiation happens in a handful of design axes that recur across families.</p>

  <div class="llm-card-grid">
    <div class="llm-inf" style="border-top-color: var(--llm-blue);">
      <div class="llm-inf-label" style="color: var(--llm-blue);">Pattern 1</div>
      <div class="llm-inf-title">Dense Transformers</div>
      <div class="llm-inf-body">Every parameter fires on every token. Simple, predictable, easy to fine-tune and serve. The default for most Llama, Mistral, Gemma, and Phi models. Quality scales with size — but so does cost.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-purple);">
      <div class="llm-inf-label" style="color: var(--llm-purple);">Pattern 2</div>
      <div class="llm-inf-title">Mixture of Experts (MoE)</div>
      <div class="llm-inf-body">Many expert sub-networks, but a router activates only a few per token. Huge total parameter counts with a fraction of the compute per token. Powers the efficiency of DeepSeek, Mixtral, and several frontier models.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-orange);">
      <div class="llm-inf-label" style="color: var(--llm-orange);">Pattern 3</div>
      <div class="llm-inf-title">Reasoning / Test-Time Compute</div>
      <div class="llm-inf-body">Models trained to "think" in extended chains before answering, spending more compute at inference for harder problems. OpenAI's reasoning models and DeepSeek-R pioneered the open version of this pattern.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-green);">
      <div class="llm-inf-label" style="color: var(--llm-green);">Pattern 4</div>
      <div class="llm-inf-title">Multimodal & Long-Context</div>
      <div class="llm-inf-body">Native handling of images, audio, and video alongside text, plus context windows stretching into the millions of tokens. Gemini and Qwen's multimodal lines lead here, reshaping what a single prompt can hold.</div>
    </div>
  </div>

  <div class="llm-callout llm-callout-spec">
    <div class="llm-callout-head">The Recurring Efficiency Moves</div>
    <p>Beyond the headline patterns, families converge on the same efficiency tricks: grouped-query attention to shrink the KV cache, rotary position embeddings for longer context, and quantization (4-bit and below) to fit large models onto modest hardware. These are why a capable model can now run on a laptop.</p>
  </div>
</div>

<!-- Section: Anatomy -->
<div class="llm-section" id="anatomy">
  <h2>Anatomy of a Modern LLM Stack</h2>
  <p>A deployed model is a layered system. Understanding the layers clarifies where a "family" actually lives — and where your engineering effort goes.</p>

  <div class="llm-arch">
    <div class="llm-arch-title">From Weights to Product</div>
    <div class="llm-arch-layers">
      <div class="llm-arch-layer" style="border-top: 3px solid var(--llm-purple);">
        <div class="layer-name" style="color: var(--llm-purple);">Application & Orchestration</div>
        <div class="layer-desc">Agents, RAG, tool use, guardrails — where product value is built</div>
      </div>
      <div class="llm-arch-arrow">&uarr;</div>
      <div class="llm-arch-layer">
        <div class="layer-name" style="color: var(--llm-blue);">Serving & Inference</div>
        <div class="layer-desc">APIs or runtimes (vLLM, Ollama, TGI), quantization, batching, KV cache</div>
      </div>
      <div class="llm-arch-arrow">&uarr;</div>
      <div class="llm-arch-layer">
        <div class="layer-name" style="color: var(--llm-green);">Post-Training</div>
        <div class="layer-desc">Instruction tuning, RLHF/DPO, reasoning tuning, domain fine-tunes</div>
      </div>
      <div class="llm-arch-arrow">&uarr;</div>
      <div class="llm-arch-layer" style="border-bottom: 3px solid var(--llm-orange);">
        <div class="layer-name" style="color: var(--llm-orange);">Base Model &amp; Architecture</div>
        <div class="layer-desc">Pretrained Transformer weights — dense or MoE — the "family" core</div>
      </div>
    </div>
  </div>

  <p>A model family typically owns the bottom two layers (the base weights and the official post-trained variants). Everything above is yours. This is why two teams using the same Llama checkpoint can ship wildly different products — most of the differentiation lives in the top layers.</p>
</div>

<!-- Section: Families -->
<div class="llm-section" id="families">
  <h2>The Major Model Families</h2>
  <p>Eight vendors define most of today's practical landscape. Each has a distinct strategic bet — on openness, efficiency, reasoning, multimodality, or scale.</p>

  <div class="llm-table-wrap">
    <table class="llm-table">
      <thead>
        <tr>
          <th>Vendor</th>
          <th>Family</th>
          <th>Access</th>
          <th>Typical reasons to consider it</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>OpenAI</strong></td>
          <td>GPT, reasoning models, gpt-oss</td>
          <td><span class="llm-pill llm-pill-mixed">Mixed</span></td>
          <td>General-purpose assistants, reasoning, coding, tool use; gpt-oss offers open weights for self-hosting.</td>
        </tr>
        <tr>
          <td><strong>Anthropic</strong></td>
          <td>Claude</td>
          <td><span class="llm-pill llm-pill-closed">Closed</span></td>
          <td>Writing, coding, document analysis, and complex multi-step workflows.</td>
        </tr>
        <tr>
          <td><strong>Google</strong></td>
          <td>Gemini; Gemma</td>
          <td><span class="llm-pill llm-pill-mixed">Mixed</span></td>
          <td>Multimodal tasks and long-context work; Gemma for open-weight deployment.</td>
        </tr>
        <tr>
          <td><strong>Meta</strong></td>
          <td>Llama</td>
          <td><span class="llm-pill llm-pill-open">Open</span></td>
          <td>Customization, self-hosting, and application development on owned weights.</td>
        </tr>
        <tr>
          <td><strong>Mistral AI</strong></td>
          <td>Mistral, Codestral &amp; related</td>
          <td><span class="llm-pill llm-pill-open">Open</span></td>
          <td>Efficient deployment, coding, and enterprise use.</td>
        </tr>
        <tr>
          <td><strong>DeepSeek</strong></td>
          <td>DeepSeek-V, DeepSeek-R</td>
          <td><span class="llm-pill llm-pill-open">Open</span></td>
          <td>Reasoning, mathematics, coding, and cost-conscious deployment.</td>
        </tr>
        <tr>
          <td><strong>Alibaba</strong></td>
          <td>Qwen</td>
          <td><span class="llm-pill llm-pill-open">Open</span></td>
          <td>Multilingual tasks, coding, reasoning, and multimodal applications.</td>
        </tr>
        <tr>
          <td><strong>Microsoft</strong></td>
          <td>Phi</td>
          <td><span class="llm-pill llm-pill-open">Open</span></td>
          <td>Smaller models for resource-constrained and on-device applications.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="llm-callout llm-callout-info">
    <div class="llm-callout-head">Reading the Access Column</div>
    <p><span class="llm-pill llm-pill-closed">Closed</span> means API-only. <span class="llm-pill llm-pill-open">Open</span> means downloadable weights you can self-host. <span class="llm-pill llm-pill-mixed">Mixed</span> means the vendor ships both a flagship closed line and an open-weight sibling (e.g., Gemini + Gemma, GPT + gpt-oss).</p>
  </div>
</div>

<!-- Section: Family Explorer -->
<div class="llm-section" id="explorer">
  <h2>Family Explorer</h2>
  <p>Select a vendor to see its strategic bet, flagship lines, and where it fits best. Click any tab:</p>

  <div class="llm-fam">
    <div class="llm-fam-tabs" id="llm-fam-tabs">
      <div class="llm-fam-tab active" onclick="llmShowFam(0)">OpenAI</div>
      <div class="llm-fam-tab" onclick="llmShowFam(1)">Anthropic</div>
      <div class="llm-fam-tab" onclick="llmShowFam(2)">Google</div>
      <div class="llm-fam-tab" onclick="llmShowFam(3)">Meta</div>
      <div class="llm-fam-tab" onclick="llmShowFam(4)">Mistral</div>
      <div class="llm-fam-tab" onclick="llmShowFam(5)">DeepSeek</div>
      <div class="llm-fam-tab" onclick="llmShowFam(6)">Qwen</div>
      <div class="llm-fam-tab" onclick="llmShowFam(7)">Phi</div>
    </div>
    <div class="llm-fam-detail" id="llm-fam-detail">
      <div class="vendor">OpenAI</div>
      <h4>GPT · Reasoning models · gpt-oss</h4>
      <p>The broadest general-purpose family, strong across assistants, coding, and tool use, with a dedicated reasoning line for hard multi-step problems. gpt-oss brings open weights into the lineup for teams that need self-hosting.</p>
      <div class="meta"><span>General-purpose</span><span>Reasoning</span><span>Coding</span><span>Tool use</span></div>
    </div>
  </div>

  <script>
  var llmFams = [
    {vendor:'OpenAI', title:'GPT · Reasoning models · gpt-oss', desc:'The broadest general-purpose family, strong across assistants, coding, and tool use, with a dedicated reasoning line for hard multi-step problems. gpt-oss brings open weights into the lineup for teams that need self-hosting.', tags:['General-purpose','Reasoning','Coding','Tool use']},
    {vendor:'Anthropic', title:'Claude', desc:'Known for high-quality writing, careful long-document analysis, strong coding, and reliability in complex multi-step workflows. A closed, API-only family focused on steerability and safety.', tags:['Writing','Document analysis','Coding','Workflows']},
    {vendor:'Google', title:'Gemini · Gemma', desc:'Gemini leads on native multimodality and very long context; Gemma is its open-weight sibling for on-prem and on-device deployment. A "mixed" posture spanning frontier API and open models.', tags:['Multimodal','Long-context','Open sibling']},
    {vendor:'Meta', title:'Llama', desc:'The open-weight workhorse. Permissive enough for broad application development, with a large ecosystem of fine-tunes and tooling. The default choice when you want to own and customize the weights.', tags:['Self-hosting','Customization','Ecosystem']},
    {vendor:'Mistral AI', title:'Mistral · Codestral', desc:'European lab focused on efficient, often Apache-licensed models. Strong on coding (Codestral) and lean enterprise deployment where throughput-per-dollar matters.', tags:['Efficient','Coding','Enterprise']},
    {vendor:'DeepSeek', title:'DeepSeek-V · DeepSeek-R', desc:'Pushed open reasoning forward with DeepSeek-R and MoE efficiency with the V line. A favorite for mathematics, coding, and cost-conscious reasoning at scale.', tags:['Reasoning','Math','Coding','Cost-efficient']},
    {vendor:'Alibaba', title:'Qwen', desc:'A broad open family notable for strong multilingual coverage, coding, reasoning, and multimodal variants. Frequently near the top of open-model leaderboards.', tags:['Multilingual','Coding','Reasoning','Multimodal']},
    {vendor:'Microsoft', title:'Phi', desc:'Small, high-quality models trained on curated data to punch above their size. Ideal for resource-constrained, edge, and on-device scenarios where big models do not fit.', tags:['Small','On-device','Efficient']},
  ];
  window.llmShowFam = function(i) {
    var tabs = document.querySelectorAll('.llm-fam-tab');
    tabs.forEach(function(t){ t.classList.remove('active'); });
    tabs[i].classList.add('active');
    var f = llmFams[i];
    var meta = f.tags.map(function(t){ return '<span>'+t+'</span>'; }).join('');
    document.getElementById('llm-fam-detail').innerHTML =
      '<div class="vendor">'+f.vendor+'</div><h4>'+f.title+'</h4><p>'+f.desc+'</p><div class="meta">'+meta+'</div>';
  };
  </script>
</div>

<!-- Section: Choosing -->
<div class="llm-section" id="choosing">
  <h2>How to Choose: A Practical Lens</h2>
  <p>Instead of chasing the top of a leaderboard, work backward from constraints. Four questions usually settle the decision.</p>

  <div class="llm-card-grid">
    <div class="llm-inf" style="border-top-color: var(--llm-blue);">
      <div class="llm-inf-label" style="color: var(--llm-blue);">1 · Control</div>
      <div class="llm-inf-title">Do you need the weights?</div>
      <div class="llm-inf-body">If data residency, offline operation, or deep customization is required, start with open families — Llama, Mistral, Qwen, DeepSeek, Gemma, Phi, or gpt-oss. Otherwise a closed API is the fastest path to frontier quality.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-purple);">
      <div class="llm-inf-label" style="color: var(--llm-purple);">2 · Task</div>
      <div class="llm-inf-title">What is the workload?</div>
      <div class="llm-inf-body">Hard reasoning and math favor reasoning-tuned lines (OpenAI reasoning, DeepSeek-R). Coding favors Claude, Codestral, Qwen, or DeepSeek. Multimodal and long-context favor Gemini and Qwen.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-green);">
      <div class="llm-inf-label" style="color: var(--llm-green);">3 · Footprint</div>
      <div class="llm-inf-title">Where does it run?</div>
      <div class="llm-inf-body">On-device or tight budgets point to small models — Phi, small Gemma, or Mistral. Large-scale serving benefits from MoE efficiency. Match parameter count and quantization to the hardware you actually have.</div>
    </div>
    <div class="llm-inf" style="border-top-color: var(--llm-orange);">
      <div class="llm-inf-label" style="color: var(--llm-orange);">4 · Economics</div>
      <div class="llm-inf-title">What does scale cost?</div>
      <div class="llm-inf-body">Per-token API pricing is simple until volume explodes; self-hosting flips the cost curve at scale but adds ops burden. DeepSeek and Mistral are frequent picks when cost-per-token dominates.</div>
    </div>
  </div>

  <div class="llm-callout llm-callout-success">
    <div class="llm-callout-head">A Workable Default</div>
    <p>Prototype against a strong closed API to validate the product, then route high-volume or privacy-sensitive paths to a self-hosted open family once the requirements are clear. Decide the model family last, after you understand the task, the footprint, and the economics — not first.</p>
  </div>
</div>

<!-- Section: Takeaways -->
<div class="llm-section" id="takeaways">
  <h2>Takeaways</h2>
  <div class="llm-quote">
    <blockquote>"The names change faster than the structure. Learn the patterns — dense vs. MoE, open vs. closed, general vs. reasoning — and the next release stops being a surprise."</blockquote>
    <div class="attr">— On navigating a fast-moving landscape</div>
  </div>

  <p>The LLM landscape looks chaotic because the surface churns weekly. Underneath, it's organized by a small number of durable choices: how the model is built, how you're allowed to use it, and what it's specialized for. Anchor on those and the ecosystem becomes navigable.</p>

  <div class="llm-callout llm-callout-spec">
    <div class="llm-callout-head">The Closing Thought</div>
    <p>There is no single best model — only the best fit for a given task, footprint, and budget. The frontier labs set the ceiling on capability; the open families set the floor on access. The real skill is not picking a winner, but building a stack that routes each problem to the family that fits it.</p>
  </div>
</div>

</div><!-- /.llm-content -->
</div><!-- /.llm-layout -->
</div><!-- /.llm-wrap -->

<script>
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('.llm-sidebar a');
  var sections = [];
  links.forEach(function(l){ var t = document.querySelector(l.getAttribute('href')); if(t) sections.push({el:t, link:l}); });
  if(!sections.length) return;
  function onScroll(){
    var scrollY = window.scrollY + 120;
    var active = sections[0];
    sections.forEach(function(s){ if(s.el.offsetTop <= scrollY) active = s; });
    links.forEach(function(l){ l.classList.remove('active'); });
    active.link.classList.add('active');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
</script>
