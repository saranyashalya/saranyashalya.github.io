---
layout: post
title: "From Words to Systems: The Evolution of the Agentic Stack"
date: 2026-08-03
description: "How the agentic stack evolved from prompt engineering to loop engineering — four layers of control that didn't replace each other but absorbed each other."
tags: [agentic-ai, harness-engineering, loop-engineering, architecture]
categories: [genai]
featured: false
---

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --ag-bg: #0d1117; --ag-card: #161b22; --ag-card2: #1c2333; --ag-border: #30363d;
    --ag-text: #e6edf3; --ag-text2: #8b949e; --ag-muted: #6e7681;
    --ag-blue: #58a6ff; --ag-purple: #a371f7; --ag-green: #3fb950;
    --ag-orange: #f0883e; --ag-cyan: #79c0ff; --ag-amber: #ffa657; --ag-red: #f85149;
  }
  .ag-wrap { font-family: 'Space Grotesk', 'Inter', sans-serif; color: var(--ag-text); line-height: 1.7; max-width: 1100px; margin: 0 auto; }
  .ag-wrap p { color: var(--ag-text); margin: 0 0 1rem; line-height: 1.75; }

  /* Layout */
  .ag-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; }
  .ag-sidebar { position: sticky; top: 5rem; align-self: start; height: calc(100vh - 6rem); overflow-y: auto; }
  .ag-sidebar-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ag-muted); margin-bottom: 0.75rem; }
  .ag-sidebar a { display: block; padding: 0.35rem 0.75rem; border-left: 2px solid transparent; color: var(--ag-text2); text-decoration: none; font-size: 0.78rem; font-weight: 500; transition: all 0.2s; border-radius: 0 4px 4px 0; }
  .ag-sidebar a:hover { color: var(--ag-blue); border-left-color: var(--ag-blue); background: rgba(88,166,255,0.05); text-decoration: none; }
  .ag-sidebar a.active { color: var(--ag-blue); border-left-color: var(--ag-blue); font-weight: 600; background: rgba(88,166,255,0.08); }
  @media (max-width: 1000px) { .ag-layout { grid-template-columns: 1fr; } .ag-sidebar { display: none; } }

  /* Hero */
  .ag-hero { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--ag-border); }
  .ag-hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .ag-tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .ag-tag-blue { background: rgba(88,166,255,0.15); color: var(--ag-blue); border: 1px solid rgba(88,166,255,0.3); }
  .ag-tag-purple { background: rgba(163,113,247,0.15); color: var(--ag-purple); border: 1px solid rgba(163,113,247,0.3); }
  .ag-tag-green { background: rgba(63,185,80,0.15); color: var(--ag-green); border: 1px solid rgba(63,185,80,0.3); }
  .ag-tag-orange { background: rgba(240,136,62,0.15); color: var(--ag-orange); border: 1px solid rgba(240,136,62,0.3); }
  .ag-hero h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.2; color: var(--ag-text); margin: 0 0 1rem; letter-spacing: -0.02em; }
  .ag-hero-subtitle { font-size: 1.1rem; color: var(--ag-text); line-height: 1.6; margin: 0 0 1.5rem; max-width: 780px; opacity: 0.9; }

  /* Sections */
  .ag-section { margin-bottom: 3.5rem; scroll-margin-top: 5rem; }
  .ag-section h2 { font-size: 1.5rem; font-weight: 700; color: var(--ag-text); margin: 0 0 1.25rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.6rem; }
  .ag-section h2::before { content: ""; display: inline-block; width: 3px; height: 1.3em; background: linear-gradient(180deg, var(--ag-blue), var(--ag-purple)); border-radius: 2px; }
  .ag-section h3 { font-size: 1.1rem; font-weight: 600; color: var(--ag-text); margin: 2rem 0 0.75rem; }

  /* Callouts */
  .ag-callout { border-left: 3px solid; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; }
  .ag-callout-info { border-color: var(--ag-blue); background: rgba(88,166,255,0.07); }
  .ag-callout-success { border-color: var(--ag-green); background: rgba(63,185,80,0.07); }
  .ag-callout-warning { border-color: var(--ag-amber); background: rgba(255,166,87,0.07); }
  .ag-callout-spec { border-color: var(--ag-purple); background: rgba(163,113,247,0.07); }
  .ag-callout-head { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
  .ag-callout-info .ag-callout-head { color: var(--ag-blue); }
  .ag-callout-success .ag-callout-head { color: var(--ag-green); }
  .ag-callout-warning .ag-callout-head { color: var(--ag-amber); }
  .ag-callout-spec .ag-callout-head { color: var(--ag-purple); }
  .ag-callout p { margin: 0; font-size: 0.88rem; color: var(--ag-text); opacity: 0.9; }

  /* Cards */
  .ag-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
  .ag-inf { background: var(--ag-card); border: 1px solid var(--ag-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; border-top: 3px solid; }
  .ag-inf-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .ag-inf-title { font-size: 0.95rem; font-weight: 600; color: var(--ag-text); margin-bottom: 0.5rem; }
  .ag-inf-body { font-size: 0.83rem; color: var(--ag-text); line-height: 1.6; opacity: 0.85; }

  /* Timeline */
  .ag-timeline { list-style: none; padding: 0; margin: 1.5rem 0; position: relative; border-left: 2px solid var(--ag-border); margin-left: 0.75rem; }
  .ag-timeline li { position: relative; padding: 0.1rem 0 1.5rem 2rem; }
  .ag-timeline li::before { content: ""; position: absolute; left: -0.55rem; top: 0.45rem; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: var(--ag-blue); border: 2px solid var(--ag-bg); box-shadow: 0 0 0 2px var(--ag-blue); }
  .ag-tl-step { font-weight: 600; color: var(--ag-text); font-size: 0.9rem; margin-bottom: 0.25rem; }
  .ag-tl-desc { font-size: 0.82rem; color: var(--ag-text); opacity: 0.85; }

  /* Quote */
  .ag-quote { background: linear-gradient(135deg, var(--ag-card), var(--ag-card2)); border: 1px solid var(--ag-border); border-radius: 0.875rem; padding: 1.75rem; margin: 2rem 0; }
  .ag-quote blockquote { font-size: 1.05em; font-style: italic; color: var(--ag-text); margin: 0 0 0.5rem; line-height: 1.5; border: none; padding: 0; background: none; }
  .ag-quote .attr { color: var(--ag-muted); font-size: 0.78rem; font-style: normal; }

  /* Table */
  .ag-table-wrap { overflow-x: auto; border-radius: 0.875rem; border: 1px solid var(--ag-border); margin: 1.5rem 0; }
  .ag-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
  .ag-table thead tr { background: var(--ag-card2); }
  .ag-table th { padding: 0.75rem 0.75rem; text-align: left; font-weight: 600; font-size: 0.68rem; color: var(--ag-text2); letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--ag-border); }
  .ag-table td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--ag-border); color: var(--ag-text); opacity: 0.9; vertical-align: top; }
  .ag-table tbody tr:last-child td { border-bottom: none; }
  .ag-table tbody tr:hover td { background: rgba(255,255,255,0.02); }

  /* Interactive Timeline */
  .ag-evo-timeline { position: relative; padding: 2rem 0; margin: 2rem 0; }
  .ag-evo-track { position: relative; height: 6px; background: linear-gradient(90deg, var(--ag-orange), var(--ag-amber), var(--ag-blue), var(--ag-purple)); border-radius: 3px; margin: 0 0 2rem; }
  .ag-evo-stops { display: flex; justify-content: space-between; position: relative; margin-top: -12px; }
  .ag-evo-stop { text-align: center; cursor: pointer; transition: transform 0.2s; flex: 1; }
  .ag-evo-stop:hover { transform: translateY(-2px); }
  .ag-evo-dot { width: 18px; height: 18px; border-radius: 50%; margin: 0 auto 8px; border: 3px solid var(--ag-bg); box-shadow: 0 0 0 2px var(--ag-blue); transition: all 0.2s; }
  .ag-evo-stop.active .ag-evo-dot { transform: scale(1.3); box-shadow: 0 0 0 2px var(--ag-blue), 0 0 12px rgba(88,166,255,0.4); }
  .ag-evo-year { font-size: 0.7rem; font-weight: 700; color: var(--ag-text2); }
  .ag-evo-label { font-size: 0.65rem; color: var(--ag-muted); margin-top: 2px; }
  .ag-evo-detail { background: var(--ag-card); border: 1px solid var(--ag-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; min-height: 100px; transition: all 0.3s; }
  .ag-evo-detail .era-tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .ag-evo-detail h4 { font-size: 1rem; font-weight: 600; color: var(--ag-text); margin-bottom: 0.5rem; }
  .ag-evo-detail p { font-size: 0.83rem; color: var(--ag-text); opacity: 0.85; margin: 0; }

  /* Architecture Diagram */
  .ag-arch { background: var(--ag-card); border: 1px solid var(--ag-border); border-radius: 0.875rem; padding: 1.5rem; margin: 2rem 0; }
  .ag-arch-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ag-muted); margin-bottom: 1rem; text-align: center; }
  .ag-arch-layers { display: flex; flex-direction: column; gap: 0; align-items: center; }
  .ag-arch-layer { width: 100%; max-width: 500px; padding: 0.875rem 1.25rem; border: 1px solid var(--ag-border); text-align: center; position: relative; }
  .ag-arch-layer:first-child { border-radius: 0.75rem 0.75rem 0 0; }
  .ag-arch-layer:last-child { border-radius: 0 0 0.75rem 0.75rem; }
  .ag-arch-layer + .ag-arch-layer { border-top: none; }
  .ag-arch-layer .layer-name { font-size: 0.82rem; font-weight: 700; }
  .ag-arch-layer .layer-desc { font-size: 0.7rem; color: var(--ag-text2); margin-top: 2px; }
  .ag-arch-arrow { text-align: center; color: var(--ag-muted); font-size: 0.9rem; padding: 4px 0; }
  .ag-arch-axes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
  .ag-arch-axis { background: var(--ag-bg); border: 1px solid var(--ag-border); border-radius: 0.75rem; padding: 1rem; text-align: center; }
  .ag-arch-axis .axis-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.35rem; }
  .ag-arch-axis .axis-desc { font-size: 0.78rem; color: var(--ag-text2); }

  @media (max-width: 768px) { .ag-card-grid { grid-template-columns: 1fr; } .ag-evo-stops { flex-wrap: wrap; gap: 8px; } .ag-arch-axes { grid-template-columns: 1fr; } }
</style>

<div class="ag-wrap">

<!-- Hero -->
<div class="ag-hero">
  <div class="ag-hero-tags">
    <span class="ag-tag ag-tag-blue">Agentic AI</span>
    <span class="ag-tag ag-tag-purple">Harness Engineering</span>
    <span class="ag-tag ag-tag-green">Loop Engineering</span>
    <span class="ag-tag ag-tag-orange">Architecture</span>
  </div>
  <h1>From Words to Systems: The Evolution of the Agentic Stack</h1>
  <p class="ag-hero-subtitle">The most important code in an agent system is not the agent itself — it is the code that wraps, constrains, and directs it. Over four years, the unit of engineering has shifted from a single prompt, to a context window, to a runtime harness, to an autonomous loop. Each layer didn't replace the previous; it absorbed it.</p>
</div>

<!-- Layout -->
<div class="ag-layout">
<aside class="ag-sidebar">
  <div class="ag-sidebar-label">On this page</div>
  <a href="#thesis">The Thesis</a>
  <a href="#layers">The Four Layers</a>
  <a href="#timeline">Evolution Timeline</a>
  <a href="#prompt">Prompt Engineering</a>
  <a href="#context">Context Engineering</a>
  <a href="#harness">Harness Engineering</a>
  <a href="#loop">Loop Engineering</a>
  <a href="#comparison">Comparative Matrix</a>
  <a href="#cross-cutting">Cross-Cutting Model</a>
  <a href="#practical">Practical Implications</a>
  <a href="#future">What Comes Next</a>
</aside>
<div class="ag-content">

<!-- Section: Thesis -->
<div class="ag-section" id="thesis">
  <h2>The Thesis: Words Cannot Constrain Compute</h2>

  <div class="ag-quote">
    <blockquote>"You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."</blockquote>
    <div class="attr">— Peter Steinberger, June 2026</div>
  </div>

  <p>LLMs are probabilistic reasoning engines. Production systems demand deterministic behavior. This fundamental mismatch is what every layer of the agentic stack attempts to resolve.</p>

  <p><strong>Prompt engineering</strong> assumed you could phrase your way to reliability. You cannot. <strong>Context engineering</strong> recognized the problem wasn't wording — it was what the model could see. <strong>Harness engineering</strong> recognized the problem wasn't visibility — it was what the model could touch. <strong>Loop engineering</strong> recognized the problem wasn't a single action — it was the entire cycle of acting, evaluating, and continuing.</p>

  <div class="ag-callout ag-callout-info">
    <div class="ag-callout-head">Each Layer is a Different Unit of Control</div>
    <p>A <strong>prompt</strong> controls one model response. <strong>Context</strong> controls one invocation's information environment. A <strong>harness</strong> controls one agent's execution boundary. A <strong>loop</strong> controls one agent's behavior cycle over time. Each layer preserves the layer beneath it — a prompt doesn't disappear once a loop is built around it.</p>
  </div>
</div>

<!-- Section: Four Layers -->
<div class="ag-section" id="layers">
  <h2>The Four Layers: Definition and Emergence</h2>

  <div class="ag-card-grid">
    <div class="ag-inf" style="border-top-color: var(--ag-orange);">
      <div class="ag-inf-label" style="color: var(--ag-orange);">Layer 1 · 2022–2023</div>
      <div class="ag-inf-title">Prompt Engineering</div>
      <div class="ag-inf-body">Writing and structuring the instruction for a single model call. The only lever was language. Solved: getting a model to produce a useful single response. Failed: "linguistic optimism" — the assumption that clear phrasing guarantees compliance in multi-step autonomy.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-amber);">
      <div class="ag-inf-label" style="color: var(--ag-amber);">Layer 2 · 2024–2025</div>
      <div class="ag-inf-title">Context Engineering</div>
      <div class="ag-inf-body">Designing exactly what the agent sees — not just the prompt, but the entire token configuration. RAG pipelines, file attachments, context compaction, prompt caching. Solved: keeping agents oriented across step 30. Failed: context rot — accumulated outputs degrade reasoning over long sessions.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-blue);">
      <div class="ag-inf-label" style="color: var(--ag-blue);">Layer 3 · 2025–2026</div>
      <div class="ag-inf-title">Harness Engineering</div>
      <div class="ag-inf-body">The deterministic wrapper around a probabilistic model — tools, permissions, sandboxes, memory, validation gates. The agent physically cannot execute outside its boundary. Solved: making agents reliable for hours. Left open: when to act, when to stop, who escalates.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-purple);">
      <div class="ag-inf-label" style="color: var(--ag-purple);">Layer 4 · 2026–Present</div>
      <div class="ag-inf-title">Loop Engineering</div>
      <div class="ag-inf-body">Designing structural controls around an agentic loop: state machines, iteration limits, tool boundaries, verification gates, and human escalation paths. Moves from human-in-the-loop to human-on-the-loop. The system prompts the agent, not the human.</div>
    </div>
  </div>
</div>

<!-- Section: Interactive Timeline -->
<div class="ag-section" id="timeline">
  <h2>Evolution Timeline: From Manual Prompting to Autonomous Loops</h2>
  <p>The initiation point has shifted from human to system over four years. Click any era to see details:</p>

  <div class="ag-evo-timeline">
    <div class="ag-evo-track"></div>
    <div class="ag-evo-stops" id="ag-evo-stops">
      <div class="ag-evo-stop active" onclick="agShowEra(0)"><div class="ag-evo-dot" style="background: var(--ag-orange);"></div><div class="ag-evo-year">2022</div><div class="ag-evo-label">Manual Prompting</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(1)"><div class="ag-evo-dot" style="background: var(--ag-amber);"></div><div class="ag-evo-year">2023</div><div class="ag-evo-label">Templates</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(2)"><div class="ag-evo-dot" style="background: var(--ag-amber);"></div><div class="ag-evo-year">2024</div><div class="ag-evo-label">Tool-Augmented</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(3)"><div class="ag-evo-dot" style="background: var(--ag-blue);"></div><div class="ag-evo-year">2025</div><div class="ag-evo-label">Context-Managed</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(4)"><div class="ag-evo-dot" style="background: var(--ag-blue);"></div><div class="ag-evo-year">2025–26</div><div class="ag-evo-label">Harnessed</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(5)"><div class="ag-evo-dot" style="background: var(--ag-purple);"></div><div class="ag-evo-year">2026</div><div class="ag-evo-label">Event-Triggered</div></div>
      <div class="ag-evo-stop" onclick="agShowEra(6)"><div class="ag-evo-dot" style="background: var(--ag-purple);"></div><div class="ag-evo-year">2026+</div><div class="ag-evo-label">Autonomous</div></div>
    </div>
    <div class="ag-evo-detail" id="ag-evo-detail">
      <div class="era-tag" style="color: var(--ag-orange);">Era of Linguistic Optimism</div>
      <h4>Manual Prompting — User types, model responds</h4>
      <p>Human initiates every turn. The only lever is language. No memory, no tools, no context management. Each interaction is independent. Phrasing is everything.</p>
    </div>
  </div>

  <script>
  var agEras = [
    {tag:'Era of Linguistic Optimism', tagColor:'var(--ag-orange)', title:'Manual Prompting — User types, model responds', desc:'Human initiates every turn. The only lever is language. No memory, no tools, no context management. Each interaction is independent. Phrasing is everything.'},
    {tag:'Era of Linguistic Optimism', tagColor:'var(--ag-orange)', title:'Prompt Templates — Structured prompts with system/user separation', desc:'Human still initiates, but with tooling. Structured system prompts, few-shot examples, XML tags, labeled sections. First steps toward reproducible instruction design.'},
    {tag:'The Context Era', tagColor:'var(--ag-amber)', title:'Tool-Augmented Workflows — Model calls functions', desc:'Human triggers sessions, model acts within turns. Function calling, tool use, RAG retrieval. The model can now reach beyond its training data — but someone must start each session.'},
    {tag:'The Context Era', tagColor:'var(--ag-amber)', title:'Context-Managed Agents — RAG, memory, multi-step reasoning', desc:'Human initiates, system sustains. Context windows are actively managed — compaction, caching, structured payloads. Agents survive step 30 without losing coherence.'},
    {tag:'The Harness Era', tagColor:'var(--ag-blue)', title:'Harnessed Agents — Sandboxed execution with validation gates', desc:'Human initiates, harness governs. Agent runs in a sandbox with scoped permissions, structured memory, state management, and CI guardrails. Physical boundaries replace linguistic suggestions.'},
    {tag:'The Loop Era', tagColor:'var(--ag-purple)', title:'Event-Triggered Loops — Agents activate on webhooks, timers, CI events', desc:'System initiates, human reviews. The agent activates on external triggers — not human prompts. Webhooks, cron schedules, issue creation, PR events. Humans review outputs, not initiate work.'},
    {tag:'The Loop Era', tagColor:'var(--ag-purple)', title:'Autonomous Multi-Loop Systems — Nested loops with sub-agents', desc:'System initiates, system governs, human oversees architecture. Nested loops with sub-agents, self-improvement cycles, and human-on-the-loop governance. The question becomes: what contains the loops?'},
  ];
  window.agShowEra = function(i) {
    var stops = document.querySelectorAll('.ag-evo-stop');
    stops.forEach(function(s){ s.classList.remove('active'); });
    stops[i].classList.add('active');
    var d = document.getElementById('ag-evo-detail');
    var e = agEras[i];
    d.innerHTML = '<div class="era-tag" style="color:'+e.tagColor+'">'+e.tag+'</div><h4>'+e.title+'</h4><p>'+e.desc+'</p>';
  };
  </script>
</div>

<!-- Section: Prompt Engineering -->
<div class="ag-section" id="prompt">
  <h2>Layer 1: Prompt Engineering (2022–2023)</h2>
  <p><strong>What it is:</strong> Writing and structuring the instruction for a single model call. Separate system prompts into labeled sections — background, instructions, tool guidance, output format — delineated with XML tags or Markdown headers.</p>
  <p><strong>Why it emerged:</strong> Early LLMs (GPT-3, ChatGPT) were single-turn. The only lever was language.</p>
  <p><strong>What it solved:</strong> Getting a model to produce a useful single response.</p>

  <div class="ag-callout ag-callout-warning">
    <div class="ag-callout-head">The Wall It Hit: Linguistic Optimism</div>
    <p>The assumption that the model will behave if you phrase instructions clearly enough. In multi-hour autonomous execution, phrasing cannot prevent hallucination, unauthorized actions, or context drift. A prompt is a suggestion — it can be reasoned around, ignored, or misinterpreted.</p>
  </div>
</div>

<!-- Section: Context Engineering -->
<div class="ag-section" id="context">
  <h2>Layer 2: Context Engineering (2024–2025)</h2>
  <p><strong>What it is:</strong> Designing exactly what the agent sees — not just the prompt, but the entire token configuration in the context window. Includes RAG pipelines, file attachments, context restructuring into clean JSON payloads, and prompt caching to save up to 90% in token costs.</p>
  <p><strong>Why it emerged:</strong> As agents moved from single-turn to multi-step, the context window became a finite resource. The engineering problem shifted from "finding the right words" to "optimizing the utility of tokens against model constraints."</p>
  <p><strong>What it solved:</strong> Keeping the agent oriented across step 5, step 15, step 30.</p>

  <div class="ag-callout ag-callout-warning">
    <div class="ag-callout-head">The Wall It Hit: Context Rot</div>
    <p>The gradual degradation of reasoning quality as context fills with accumulated tool outputs, prior responses, and stale instructions. Even with perfect context management, a finite window cannot hold infinite session history without loss.</p>
  </div>
</div>

<!-- Section: Harness Engineering -->
<div class="ag-section" id="harness">
  <h2>Layer 3: Harness Engineering (2025–2026)</h2>
  <p><strong>What it is:</strong> The discipline of designing the scaffolding — context delivery, tool interfaces, planning artifacts, verification loops, memory systems, and sandboxes — that surrounds an AI agent and determines whether it succeeds or fails on real tasks.</p>

  <div class="ag-quote">
    <blockquote>"Agent = Model + Harness. A harness is the deterministic wrapper around a probabilistic model. It reduces the space in which the model can be wrong."</blockquote>
    <div class="attr">— The core equation of harness engineering</div>
  </div>

  <p><strong>Why it emerged:</strong> Production agents needed to run for hours, touch real systems, and make irreversible decisions. The model couldn't self-regulate.</p>

  <h3>The Seven Layers of a Production Harness</h3>
  <ul class="ag-timeline">
    <li><div class="ag-tl-step">Normalization</div><div class="ag-tl-desc">Standardize inputs before they reach the model.</div></li>
    <li><div class="ag-tl-step">Context Orchestration</div><div class="ag-tl-desc">Manage what enters the context window and when.</div></li>
    <li><div class="ag-tl-step">Constraint Layer</div><div class="ag-tl-desc">Define what the agent can and cannot do — permissions, tool access, action boundaries.</div></li>
    <li><div class="ag-tl-step">Gated Execution</div><div class="ag-tl-desc">Require approval or verification before irreversible actions.</div></li>
    <li><div class="ag-tl-step">Validation & Repair</div><div class="ag-tl-desc">Check outputs against expectations; auto-correct when possible.</div></li>
    <li><div class="ag-tl-step">Graceful Degradation</div><div class="ag-tl-desc">Fall back safely when the model fails or tools are unavailable.</div></li>
    <li><div class="ag-tl-step">State Management</div><div class="ag-tl-desc">Persist agent state across sessions, crashes, and resumptions.</div></li>
  </ul>

  <h3>The Five Structural Primitives</h3>
  <div class="ag-card-grid">
    <div class="ag-inf" style="border-top-color: var(--ag-blue);">
      <div class="ag-inf-label" style="color: var(--ag-blue);">Primitive</div>
      <div class="ag-inf-title">Filesystem</div>
      <div class="ag-inf-body">Durable state + collaboration surface. If it's not in the repo, it doesn't exist for the agent.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-green);">
      <div class="ag-inf-label" style="color: var(--ag-green);">Primitive</div>
      <div class="ag-inf-title">Code Execution</div>
      <div class="ag-inf-body">Autonomous problem-solving capability. The agent can run code to verify its own outputs.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-purple);">
      <div class="ag-inf-label" style="color: var(--ag-purple);">Primitive</div>
      <div class="ag-inf-title">Sandbox</div>
      <div class="ag-inf-body">Isolation + verification. Actions execute in a contained environment before affecting production.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-orange);">
      <div class="ag-inf-label" style="color: var(--ag-orange);">Primitive</div>
      <div class="ag-inf-title">Memory</div>
      <div class="ag-inf-body">Cross-session persistence. The agent remembers decisions, preferences, and context across invocations.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-cyan);">
      <div class="ag-inf-label" style="color: var(--ag-cyan);">Primitive</div>
      <div class="ag-inf-title">Context Management</div>
      <div class="ag-inf-body">Compaction against context rot. Active management of what stays, what gets summarized, what gets dropped.</div>
    </div>
  </div>

  <div class="ag-callout ag-callout-success">
    <div class="ag-callout-head">Evidence of Convergence</div>
    <p>LangChain improved Terminal Bench 2.0 from 52.8% to 66.5% through pure harness changes — no model change. OpenAI shipped ~1M lines of production code without manually written source in a five-month experiment. The enabler in both cases was environment design, not model capability.</p>
  </div>
</div>

<!-- Section: Loop Engineering -->
<div class="ag-section" id="loop">
  <h2>Layer 4: Loop Engineering (2026–Present)</h2>

  <div class="ag-quote">
    <blockquote>"My job is to write loops."</blockquote>
    <div class="attr">— Boris Cherny, Head of Claude Code, Anthropic</div>
  </div>

  <p><strong>What it is:</strong> The software engineering discipline of designing structural controls around an agentic loop: state machines, iteration limits, tool boundaries, verification gates, and human escalation paths. It makes loops that are not only capable but also safe, auditable, and deterministic enough for production.</p>

  <h3>The Three Functional Stages of a Loop</h3>
  <ul class="ag-timeline">
    <li><div class="ag-tl-step">Observation</div><div class="ag-tl-desc">The agent perceives its environment and current state.</div></li>
    <li><div class="ag-tl-step">Decision</div><div class="ag-tl-desc">The agent reasons about what to do next.</div></li>
    <li><div class="ag-tl-step">Action & Evaluation</div><div class="ag-tl-desc">The agent acts, then a <em>separate process</em> evaluates the result against a completion condition. The loop continues or terminates based on that evaluation.</div></li>
  </ul>

  <h3>The Maker/Checker Pattern</h3>
  <div class="ag-callout ag-callout-spec">
    <div class="ag-callout-head">Separation of Concerns</div>
    <p>The agent that writes code should never be the one grading it. A separate, independent process verifies the output. This separation is what makes asynchronous execution trustworthy — you're not relying on the same probabilistic system that produced the work to also judge it.</p>
  </div>

  <h3>The Six Core Pillars</h3>
  <div class="ag-card-grid">
    <div class="ag-inf" style="border-top-color: var(--ag-blue);">
      <div class="ag-inf-label" style="color: var(--ag-blue);">Pillar</div>
      <div class="ag-inf-title">Automations</div>
      <div class="ag-inf-body">Event-driven triggers — webhooks, timers, CI events, issue creation. The loop activates without human initiation.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-green);">
      <div class="ag-inf-label" style="color: var(--ag-green);">Pillar</div>
      <div class="ag-inf-title">Worktrees</div>
      <div class="ag-inf-body">Isolated execution environments. Each loop iteration operates on a clean copy, preventing state pollution between runs.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-purple);">
      <div class="ag-inf-label" style="color: var(--ag-purple);">Pillar</div>
      <div class="ag-inf-title">Skills</div>
      <div class="ag-inf-body">Reusable capability modules. Encapsulated procedures the loop can invoke without re-specifying instructions.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-orange);">
      <div class="ag-inf-label" style="color: var(--ag-orange);">Pillar</div>
      <div class="ag-inf-title">MCP Connectors</div>
      <div class="ag-inf-body">External tool interfaces via Model Context Protocol. Standardized access to external services and data sources.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-cyan);">
      <div class="ag-inf-label" style="color: var(--ag-cyan);">Pillar</div>
      <div class="ag-inf-title">Sub-Agents</div>
      <div class="ag-inf-body">Delegated parallel workers. Complex tasks fan out to specialized agents that report back to the orchestrating loop.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-amber);">
      <div class="ag-inf-label" style="color: var(--ag-amber);">Pillar</div>
      <div class="ag-inf-title">External Memory</div>
      <div class="ag-inf-body">Persistent context across loop iterations — AGENTS.md, memory files, session state. The loop doesn't start from scratch.</div>
    </div>
  </div>
</div>

<!-- Section: Comparison -->
<div class="ag-section" id="comparison">
  <h2>Comparative Matrix: The Four Layers Side by Side</h2>

  <div class="ag-table-wrap">
    <table class="ag-table">
      <thead><tr><th>Layer</th><th>Objective</th><th>Control Point</th><th>Enables</th><th>Failure Mode</th></tr></thead>
      <tbody>
        <tr><td><strong style="color:var(--ag-orange)">Prompt</strong></td><td>Elicit a useful single response</td><td>The instruction text</td><td>Single-turn Q&A, classification, generation</td><td>Linguistic optimism — fails under multi-step autonomy</td></tr>
        <tr><td><strong style="color:var(--ag-amber)">Context</strong></td><td>Optimize what the agent sees</td><td>The token budget — RAG, caching, compaction</td><td>Multi-step agents that survive step 30</td><td>Context rot — accumulated outputs degrade reasoning</td></tr>
        <tr><td><strong style="color:var(--ag-blue)">Harness</strong></td><td>Build the deterministic runtime boundary</td><td>Tools, permissions, sandboxes, validation gates</td><td>Production agents touching real systems for hours</td><td>Makes one agent reliable but doesn't define when/how to act</td></tr>
        <tr><td><strong style="color:var(--ag-purple)">Loop</strong></td><td>Design the autonomous behavior cycle</td><td>Cadence, triggers, delegation, verification, escalation</td><td>Fully autonomous systems on timers, events, CI</td><td>Orchestration complexity; safety when no human is in the loop</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Section: Cross-Cutting -->
<div class="ag-section" id="cross-cutting">
  <h2>The Cross-Cutting Mental Model</h2>
  <p>Many engineers treat context, harness, and loop as a sequential pipeline — data flows A → B → C. <strong>This is wrong.</strong> The correct model is cross-cutting: the harness and the loop are orthogonal axes that operate simultaneously.</p>

  <div class="ag-arch">
    <div class="ag-arch-title">Execution Architecture</div>
    <div class="ag-arch-layers">
      <div class="ag-arch-layer" style="background: rgba(163,113,247,0.08); border-color: var(--ag-purple);"><div class="layer-name" style="color: var(--ag-purple);">Event / Timer / Human Request</div><div class="layer-desc">What triggers the loop</div></div>
      <div class="ag-arch-layer" style="background: rgba(163,113,247,0.05); border-color: var(--ag-purple);"><div class="layer-name" style="color: var(--ag-purple);">Loop Controller</div><div class="layer-desc">trigger → observe → decide → act → verify → continue/stop</div></div>
      <div class="ag-arch-layer" style="background: rgba(88,166,255,0.08); border-color: var(--ag-blue);"><div class="layer-name" style="color: var(--ag-blue);">Harnessed Runtime</div><div class="layer-desc">tools, permissions, sandbox, memory, state, validation, observability</div></div>
      <div class="ag-arch-layer" style="background: rgba(240,136,62,0.05); border-color: var(--ag-orange);"><div class="layer-name" style="color: var(--ag-orange);">Model + Prompt + Context</div><div class="layer-desc">The probabilistic reasoning engine</div></div>
    </div>
    <div class="ag-arch-axes">
      <div class="ag-arch-axis" style="border-color: var(--ag-blue);">
        <div class="axis-label" style="color: var(--ag-blue);">Harness Axis</div>
        <div class="axis-desc">Constrains <strong>WHAT</strong> — the runtime boundary. What the agent can see, touch, execute, persist, and recover from.</div>
      </div>
      <div class="ag-arch-axis" style="border-color: var(--ag-purple);">
        <div class="axis-label" style="color: var(--ag-purple);">Loop Axis</div>
        <div class="axis-desc">Governs <strong>WHEN</strong> — the temporal control. When the agent runs, how it iterates, verifies, retries, escalates, and stops.</div>
      </div>
    </div>
  </div>

  <div class="ag-callout ag-callout-info">
    <div class="ag-callout-head">The Operating System Analogy</div>
    <p>The <strong>prompt</strong> is a single syscall. The <strong>context</strong> is the process's memory space. The <strong>harness</strong> is the kernel's permission system — what the process can touch. The <strong>loop</strong> is the scheduler — when the process runs, for how long, and when it gets preempted. These aren't stages in a pipeline. They're orthogonal, always-on systems.</p>
  </div>
</div>

<!-- Section: Practical -->
<div class="ag-section" id="practical">
  <h2>Practical Implications for Teams</h2>

  <div class="ag-card-grid">
    <div class="ag-inf" style="border-top-color: var(--ag-green);">
      <div class="ag-inf-label" style="color: var(--ag-green);">Practice</div>
      <div class="ag-inf-title">Evaluate the Model-Harness Pair</div>
      <div class="ag-inf-body">A strong model performs poorly without stable interfaces, structured memory, and scoped permissions. A more modest model can outperform it when the harness reduces ambiguity and constrains destructive actions. Evaluate the system, not the model alone.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-blue);">
      <div class="ag-inf-label" style="color: var(--ag-blue);">Practice</div>
      <div class="ag-inf-title">Document the Harness as First-Class</div>
      <div class="ag-inf-body">Make state-changing actions interruptible, resumable, and reversible. Apply least-privilege tool governance with explicit approval gates. The harness configuration is as important as the model selection.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-purple);">
      <div class="ag-inf-label" style="color: var(--ag-purple);">Practice</div>
      <div class="ag-inf-title">Repository = Primary Interface</div>
      <div class="ag-inf-body">If something is not in the repo, it does not exist for the agent. Repository legibility — how easily an agent can find, read, and act on project knowledge — determines the capability ceiling.</div>
    </div>
    <div class="ag-inf" style="border-top-color: var(--ag-orange);">
      <div class="ag-inf-label" style="color: var(--ag-orange);">Practice</div>
      <div class="ag-inf-title">Start Restrictive, Expand on Evidence</div>
      <div class="ag-inf-body">New agents begin with read-only permissions and mandatory checkpoints. Track violation rate. Expand permissions where violations would have been safe. Calibrate based on data, not assumptions.</div>
    </div>
  </div>

  <div class="ag-callout ag-callout-warning">
    <div class="ag-callout-head">The Co-Evolution Warning</div>
    <p>Models trained with specific harnesses can become overfitted to those designs. Harness architecture choices have lasting consequences beyond the immediate task. Design for portability.</p>
  </div>
</div>

<!-- Section: Future -->
<div class="ag-section" id="future">
  <h2>What Comes Next: Graph Engineering</h2>
  <p>The stack may not end at loops. A potential fifth layer — <strong>graph engineering</strong> — controls the organization of many agents rather than one agent's behavior cycle. Each layer preserves the layer beneath it, and the pattern suggests the next unit of control is multi-agent topology.</p>

  <div class="ag-callout ag-callout-spec">
    <div class="ag-callout-head">The Closing Thought</div>
    <p>The evolution from prompt engineering to loop engineering is not a story of replacement. It's a story of containment. Each layer emerged because the previous one could not contain the complexity of real-world execution. The prompt contains the instruction. The context contains the information. The harness contains the execution. The loop contains the behavior over time. And the question for the next era is: <strong>what contains the loops?</strong></p>
  </div>
</div>

</div><!-- /.ag-content -->
</div><!-- /.ag-layout -->
</div><!-- /.ag-wrap -->

<script>
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('.ag-sidebar a');
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
