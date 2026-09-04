---
layout: post
title: "The Complete -Ops Field Guide: DevOps, GitOps, MLOps, LLMOps, and Beyond"
date: 2026-09-04
description: "A layered mental model for every -ops discipline you'll encounter in AI/ML and cloud engineering — what each owns, how they differ, and where they intersect in production agentic RAG systems."
tags: [devops, mlops, llmops, gitops, cloud]
categories: [genai]
featured: false
---

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --op-bg: #0d1117; --op-card: #161b22; --op-card2: #1c2333; --op-border: #30363d;
    --op-text: #e6edf3; --op-text2: #8b949e; --op-muted: #6e7681;
    --op-blue: #58a6ff; --op-purple: #a371f7; --op-green: #3fb950;
    --op-orange: #f0883e; --op-cyan: #79c0ff; --op-amber: #ffa657; --op-red: #f85149;
  }
  .op-wrap { font-family: 'Space Grotesk', 'Inter', sans-serif; color: var(--op-text); line-height: 1.7; max-width: 1100px; margin: 0 auto; }
  .op-wrap p { color: var(--op-text); margin: 0 0 1rem; line-height: 1.75; }

  .op-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; }
  .op-sidebar { position: sticky; top: 5rem; align-self: start; height: calc(100vh - 6rem); overflow-y: auto; }
  .op-sidebar-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--op-muted); margin-bottom: 0.75rem; }
  .op-sidebar a { display: block; padding: 0.35rem 0.75rem; border-left: 2px solid transparent; color: var(--op-text2); text-decoration: none; font-size: 0.78rem; font-weight: 500; transition: all 0.2s; border-radius: 0 4px 4px 0; }
  .op-sidebar a:hover { color: var(--op-blue); border-left-color: var(--op-blue); background: rgba(88,166,255,0.05); text-decoration: none; }
  .op-sidebar a.active { color: var(--op-blue); border-left-color: var(--op-blue); font-weight: 600; background: rgba(88,166,255,0.08); }
  @media (max-width: 1000px) { .op-layout { grid-template-columns: 1fr; } .op-sidebar { display: none; } }

  .op-hero { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--op-border); }
  .op-hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .op-tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .op-tag-blue { background: rgba(88,166,255,0.15); color: var(--op-blue); border: 1px solid rgba(88,166,255,0.3); }
  .op-tag-purple { background: rgba(163,113,247,0.15); color: var(--op-purple); border: 1px solid rgba(163,113,247,0.3); }
  .op-tag-green { background: rgba(63,185,80,0.15); color: var(--op-green); border: 1px solid rgba(63,185,80,0.3); }
  .op-tag-orange { background: rgba(240,136,62,0.15); color: var(--op-orange); border: 1px solid rgba(240,136,62,0.3); }
  .op-hero h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.2; color: var(--op-text); margin: 0 0 1rem; letter-spacing: -0.02em; }
  .op-hero-subtitle { font-size: 1.1rem; color: var(--op-text); line-height: 1.6; margin: 0 0 1.5rem; max-width: 780px; opacity: 0.9; }

  .op-section { margin-bottom: 3.5rem; scroll-margin-top: 5rem; }
  .op-section h2 { font-size: 1.5rem; font-weight: 700; color: var(--op-text); margin: 0 0 1.25rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.6rem; }
  .op-section h2::before { content: ""; display: inline-block; width: 3px; height: 1.3em; background: linear-gradient(180deg, var(--op-blue), var(--op-purple)); border-radius: 2px; }
  .op-section h3 { font-size: 1.1rem; font-weight: 600; color: var(--op-text); margin: 2rem 0 0.75rem; }

  .op-callout { border-left: 3px solid; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; }
  .op-callout-info { border-color: var(--op-blue); background: rgba(88,166,255,0.07); }
  .op-callout-success { border-color: var(--op-green); background: rgba(63,185,80,0.07); }
  .op-callout-warning { border-color: var(--op-amber); background: rgba(255,166,87,0.07); }
  .op-callout-spec { border-color: var(--op-purple); background: rgba(163,113,247,0.07); }
  .op-callout-head { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
  .op-callout-info .op-callout-head { color: var(--op-blue); }
  .op-callout-success .op-callout-head { color: var(--op-green); }
  .op-callout-warning .op-callout-head { color: var(--op-amber); }
  .op-callout-spec .op-callout-head { color: var(--op-purple); }
  .op-callout p { margin: 0; font-size: 0.88rem; color: var(--op-text); opacity: 0.9; }

  .op-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
  .op-inf { background: var(--op-card); border: 1px solid var(--op-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; border-top: 3px solid; }
  .op-inf-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .op-inf-title { font-size: 0.95rem; font-weight: 600; color: var(--op-text); margin-bottom: 0.5rem; }
  .op-inf-body { font-size: 0.83rem; color: var(--op-text); line-height: 1.6; opacity: 0.85; }
  .op-inf-list { list-style: none; padding: 0; margin: 0.5rem 0 0; }
  .op-inf-list li { font-size: 0.8rem; color: var(--op-text); opacity: 0.85; padding: 0.15rem 0 0.15rem 1rem; position: relative; }
  .op-inf-list li::before { content: ""; position: absolute; left: 0; top: 0.55rem; width: 5px; height: 5px; border-radius: 50%; background: var(--op-muted); }

  .op-table-wrap { overflow-x: auto; border-radius: 0.875rem; border: 1px solid var(--op-border); margin: 1.5rem 0; }
  .op-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
  .op-table thead tr { background: var(--op-card2); }
  .op-table th { padding: 0.75rem 0.75rem; text-align: left; font-weight: 600; font-size: 0.68rem; color: var(--op-text2); letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--op-border); }
  .op-table td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--op-border); color: var(--op-text); opacity: 0.9; vertical-align: top; }
  .op-table tbody tr:last-child td { border-bottom: none; }
  .op-table tbody tr:hover td { background: rgba(255,255,255,0.02); }

  .op-layer-header { display: flex; align-items: center; gap: 0.75rem; margin: 2.5rem 0 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--op-border); }
  .op-layer-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; }
  .op-layer-title { font-size: 1.15rem; font-weight: 700; color: var(--op-text); }
  .op-layer-sub { font-size: 0.78rem; color: var(--op-text2); }

  .op-diff { font-size: 0.83rem; color: var(--op-text); opacity: 0.85; background: var(--op-card); border: 1px solid var(--op-border); border-radius: 0.5rem; padding: 0.75rem 1rem; margin: 0.75rem 0; }
  .op-diff strong { color: var(--op-blue); }

  .op-arch { background: var(--op-card); border: 1px solid var(--op-border); border-radius: 0.875rem; padding: 1.5rem; margin: 2rem 0; }
  .op-arch-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--op-muted); margin-bottom: 1rem; text-align: center; }
  .op-arch-layers { display: flex; flex-direction: column; gap: 0; align-items: center; }
  .op-arch-layer { width: 100%; max-width: 600px; padding: 0.875rem 1.25rem; border: 1px solid var(--op-border); text-align: center; position: relative; }
  .op-arch-layer:first-child { border-radius: 0.75rem 0.75rem 0 0; }
  .op-arch-layer:last-child { border-radius: 0 0 0.75rem 0.75rem; }
  .op-arch-layer + .op-arch-layer { border-top: none; }
  .op-arch-layer .layer-name { font-size: 0.82rem; font-weight: 700; }
  .op-arch-layer .layer-desc { font-size: 0.7rem; color: var(--op-text2); margin-top: 2px; }

  @media (max-width: 768px) { .op-card-grid { grid-template-columns: 1fr; } }
</style>

<div class="op-wrap">

<!-- Hero -->
<div class="op-hero">
  <div class="op-hero-tags">
    <span class="op-tag op-tag-blue">DevOps</span>
    <span class="op-tag op-tag-purple">MLOps</span>
    <span class="op-tag op-tag-green">LLMOps</span>
    <span class="op-tag op-tag-orange">Platform</span>
  </div>
  <h1>The Complete "-Ops" Field Guide: DevOps, GitOps, MLOps, LLMOps, and Beyond</h1>
  <p class="op-hero-subtitle">These aren't competing ideologies. They're layers and specializations on top of the same core idea: apply engineering rigor, automation, and feedback loops to a specific part of the system. This post maps out the main "-ops" you'll encounter, explains what each actually owns, and shows how they fit together.</p>
</div>

<!-- Layout -->
<div class="op-layout">
<aside class="op-sidebar">
  <div class="op-sidebar-label">On this page</div>
  <a href="#mental-model">Mental Model</a>
  <a href="#delivery">Delivery Layer</a>
  <a href="#data-ml-llm">Data / ML / LLM Layer</a>
  <a href="#governance">Ops Intelligence</a>
  <a href="#comparison">Side-by-Side</a>
  <a href="#agentic-rag">Agentic RAG Mapping</a>
  <a href="#decision">Decision Framework</a>
</aside>
<div class="op-content">

<!-- Section: Mental Model -->
<div class="op-section" id="mental-model">
  <h2>A Layered Mental Model</h2>
  <p>Think of your stack in three broad layers. Most "-ops" fit neatly into one:</p>

  <div class="op-arch">
    <div class="op-arch-title">Three Layers of "-Ops"</div>
    <div class="op-arch-layers">
      <div class="op-arch-layer" style="background: rgba(88,166,255,0.08); border-color: var(--op-blue);">
        <div class="layer-name" style="color: var(--op-blue);">Software & Infra Delivery</div>
        <div class="layer-desc">DevOps, GitOps, DevSecOps, CloudOps</div>
      </div>
      <div class="op-arch-layer" style="background: rgba(163,113,247,0.08); border-color: var(--op-purple);">
        <div class="layer-name" style="color: var(--op-purple);">Data & Intelligence</div>
        <div class="layer-desc">DataOps, MLOps, LLMOps, ModelOps</div>
      </div>
      <div class="op-arch-layer" style="background: rgba(63,185,80,0.08); border-color: var(--op-green);">
        <div class="layer-name" style="color: var(--op-green);">Operations Intelligence & Governance</div>
        <div class="layer-desc">AIOps, FinOps, GreenOps</div>
      </div>
    </div>
  </div>

  <div class="op-callout op-callout-info">
    <div class="op-callout-head">The Core Idea</div>
    <p>Every "-ops" discipline takes the same recipe — CI/CD, infrastructure as code, observability, feedback loops — and applies it to a different surface area. The differences are in <strong>what</strong> you're delivering and <strong>what constraints</strong> matter most.</p>
  </div>
</div>

<!-- Section: Delivery Layer -->
<div class="op-section" id="delivery">
  <h2>Delivery-Layer Ops</h2>
  <p>How code and infrastructure get to production safely and quickly.</p>

  <!-- DevOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(88,166,255,0.15); color: var(--op-blue);">D</div>
    <div><div class="op-layer-title">DevOps</div><div class="op-layer-sub">The cultural and technical foundation</div></div>
  </div>
  <p>DevOps unifies software development and IT operations to deliver software faster and more reliably. It's the broadest "-ops" — everything else specializes or extends it.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>CI/CD pipelines (build, test, deploy)</li>
          <li>Infrastructure as code (Terraform, CDK, CloudFormation)</li>
          <li>Environments, release management, basic observability</li>
        </ul>
      </div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">Key idea</div>
      <div class="op-inf-body">Everything that helps you go from commit to production safely and repeatedly.</div>
    </div>
  </div>

  <!-- GitOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(163,113,247,0.15); color: var(--op-purple);">G</div>
    <div><div class="op-layer-title">GitOps</div><div class="op-layer-sub">Git as the single source of truth</div></div>
  </div>
  <p>A specific DevOps pattern for cloud-native systems: declarative configs in Git, controllers (Argo CD, Flux) that continuously reconcile cluster state, rollbacks via <code>git revert</code>.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-purple);">
      <div class="op-inf-label" style="color: var(--op-purple);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Declarative configs (K8s manifests, Helm charts, policies) stored in Git</li>
          <li>Pull-based reconciliation controllers</li>
          <li>Rollbacks via commit history, audit via Git log</li>
        </ul>
      </div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-purple);">
      <div class="op-inf-label" style="color: var(--op-purple);">How it differs</div>
      <div class="op-inf-body">DevOps is the broader culture and practice. GitOps is a concrete implementation style focused on <strong>declarative, Git-driven, pull-based deployments</strong> for Kubernetes and cloud-native stacks.</div>
    </div>
  </div>

  <!-- DevSecOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(248,81,73,0.15); color: var(--op-red);">Sec</div>
    <div><div class="op-layer-title">DevSecOps</div><div class="op-layer-sub">Security as a shared, automated responsibility</div></div>
  </div>
  <p>Integrates security into the entire delivery pipeline. Traditional DevOps often treats security as a final gate; DevSecOps makes it <strong>continuous and shift-left</strong>.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-red);">
      <div class="op-inf-label" style="color: var(--op-red);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Shift-left security: threat modeling, SAST/SCA/DAST, IaC scanning</li>
          <li>Security gates in CI/CD, policy-as-code</li>
          <li>Runtime security controls and continuous monitoring</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- CloudOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(121,192,255,0.15); color: var(--op-cyan);">C</div>
    <div><div class="op-layer-title">CloudOps</div><div class="op-layer-sub">Operational health of the cloud estate</div></div>
  </div>
  <p>Running, governing, and automating cloud infrastructure across its full lifecycle. Where DevOps focuses on software delivery and FinOps on cost, CloudOps focuses on the <strong>operational health and governance of the cloud environment itself</strong>.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-cyan);">
      <div class="op-inf-label" style="color: var(--op-cyan);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Cloud asset inventory, tagging, and standards</li>
          <li>Compliance and policy enforcement</li>
          <li>Operational health of the cloud estate (not just apps)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section: Data/ML/LLM -->
<div class="op-section" id="data-ml-llm">
  <h2>Data, ML, and LLM-Layer Ops</h2>
  <p>How data, ML models, and LLM apps flow from experiment to production.</p>

  <!-- DataOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(63,185,80,0.15); color: var(--op-green);">Da</div>
    <div><div class="op-layer-title">DataOps</div><div class="op-layer-sub">DevOps for data pipelines</div></div>
  </div>
  <p>Applies DevOps and Agile principles to data engineering: automating pipelines, testing data quality, and enabling faster, more reliable insights.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Data pipelines (ingestion, transformation, delivery)</li>
          <li>Data quality tests (schema, freshness, distributions)</li>
          <li>Data governance (lineage, access control, privacy)</li>
        </ul>
      </div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">How it differs</div>
      <div class="op-inf-body"><strong>DevOps:</strong> application code delivery. <strong>DataOps:</strong> data product delivery (datasets, dashboards, features). <strong>MLOps:</strong> ML model lifecycle on top of that data.</div>
    </div>
  </div>

  <!-- MLOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(88,166,255,0.15); color: var(--op-blue);">ML</div>
    <div><div class="op-layer-title">MLOps</div><div class="op-layer-sub">Operationalizing traditional ML models</div></div>
  </div>
  <p>Automates the ML lifecycle — training, validation, deployment, monitoring, and retraining — using DevOps-style engineering. The ground truth is usually clear: accuracy, F1, MSE.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Experiment tracking and model registry</li>
          <li>Automated training and deployment pipelines</li>
          <li>Monitoring for data drift, concept drift, performance decay</li>
          <li>Retraining triggers and versioned model releases</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- LLMOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(163,113,247,0.15); color: var(--op-purple);">LL</div>
    <div><div class="op-layer-title">LLMOps</div><div class="op-layer-sub">Operating generative AI in production</div></div>
  </div>
  <p>Extends MLOps to LLM APIs, RAG pipelines, agents, and prompt-driven systems. You're not just managing a model — you're managing <strong>model + prompt + context + output quality + safety + cost</strong>, all of which can degrade independently.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-purple);">
      <div class="op-inf-label" style="color: var(--op-purple);">What it owns (beyond MLOps)</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Prompt and template versioning & testing</li>
          <li>RAG/retrieval pipelines (chunking, indexing, hybrid search)</li>
          <li>Evaluation for hallucination, groundedness, safety, coherence</li>
          <li>Guardrails and output schema enforcement</li>
          <li>Token/cost tracking and inference optimization</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="op-callout op-callout-spec">
    <div class="op-callout-head">Why LLMOps Is Distinct</div>
    <p>Traditional MLOps assumes clear ground truth (accuracy, F1). LLMOps evaluates open-ended generation: is this answer grounded? Is it safe? Is it coherent? These require <strong>eval harnesses, human-in-the-loop review, and multi-dimensional scoring</strong> that standard ML metrics don't cover.</p>
  </div>

  <!-- ModelOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(255,166,87,0.15); color: var(--op-amber);">Mo</div>
    <div><div class="op-layer-title">ModelOps</div><div class="op-layer-sub">Enterprise governance for all AI models</div></div>
  </div>
  <p>An enterprise-focused discipline for governing the full lifecycle of AI/ML models in production. Where MLOps/LLMOps optimize engineering efficiency for specific systems, ModelOps provides <strong>enterprise-wide governance, compliance, and ROI tracking</strong>.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-amber);">
      <div class="op-inf-label" style="color: var(--op-amber);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Model inventory and lineage across the enterprise</li>
          <li>Governance, compliance, and audit trails</li>
          <li>Performance monitoring tied to business KPIs</li>
          <li>Approval workflows and policy enforcement</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section: Ops Intelligence -->
<div class="op-section" id="governance">
  <h2>Ops Intelligence & Governance</h2>
  <p>How you use automation and AI to run all of the above more reliably and efficiently.</p>

  <!-- AIOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(88,166,255,0.15); color: var(--op-blue);">AI</div>
    <div><div class="op-layer-title">AIOps</div><div class="op-layer-sub">AI applied to IT operations</div></div>
  </div>
  <p>Uses AI/ML to improve IT operations: detecting anomalies, predicting incidents, and automating remediation. AIOps applies AI <strong>to</strong> ops problems, while MLOps/LLMOps apply DevOps principles <strong>to</strong> AI systems.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Anomaly detection on logs, metrics, and traces</li>
          <li>Incident correlation and root-cause suggestions</li>
          <li>Automated runbooks and self-healing actions</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- FinOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(63,185,80,0.15); color: var(--op-green);">Fi</div>
    <div><div class="op-layer-title">FinOps</div><div class="op-layer-sub">Cloud financial management</div></div>
  </div>
  <p>Brings financial accountability to the variable spend model of the cloud. Not about minimizing cost — about aligning cloud usage with business value.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Cost visibility, allocation, and tagging strategies</li>
          <li>Budgeting, forecasting, and spend anomaly detection</li>
          <li>Optimization (right-sizing, scheduling, architecture trade-offs)</li>
        </ul>
      </div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">How it differs</div>
      <div class="op-inf-body"><strong>DevOps:</strong> optimize for delivery speed. <strong>CloudOps:</strong> optimize for infra health. <strong>FinOps:</strong> optimize for <strong>economic efficiency and value</strong>.</div>
    </div>
  </div>

  <!-- GreenOps -->
  <div class="op-layer-header">
    <div class="op-layer-icon" style="background: rgba(63,185,80,0.15); color: var(--op-green);">Gr</div>
    <div><div class="op-layer-title">GreenOps</div><div class="op-layer-sub">Sustainable IT operations</div></div>
  </div>
  <p>Applies ops practices to reduce the environmental impact of IT. Often overlaps with FinOps and CloudOps — many efficiency improvements reduce both cost and carbon.</p>
  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">What it owns</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li>Carbon and energy metrics for workloads</li>
          <li>Carbon-aware scheduling (greener grid regions/times)</li>
          <li>Efficient architectures (right-sizing, serverless, better utilization)</li>
          <li>Sustainability reporting and targets</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Section: Comparison Table -->
<div class="op-section" id="comparison">
  <h2>Side-by-Side: What Each "-Ops" Optimizes</h2>

  <div class="op-table-wrap">
    <table class="op-table">
      <thead>
        <tr><th>Discipline</th><th>Primary Focus</th><th>Optimizes</th><th>Typical Owner</th></tr>
      </thead>
      <tbody>
        <tr><td><strong style="color:var(--op-blue)">DevOps</strong></td><td>Software delivery</td><td>Speed + safety of releases</td><td>Dev / DevOps teams</td></tr>
        <tr><td><strong style="color:var(--op-purple)">GitOps</strong></td><td>Cloud-native state</td><td>Declarative, auditable deploys</td><td>Platform / K8s teams</td></tr>
        <tr><td><strong style="color:var(--op-red)">DevSecOps</strong></td><td>Security in delivery</td><td>Risk in the change path</td><td>Security + DevOps</td></tr>
        <tr><td><strong style="color:var(--op-cyan)">CloudOps</strong></td><td>Cloud estate health</td><td>Compliance, stability, governance</td><td>Cloud / Platform ops</td></tr>
        <tr><td><strong style="color:var(--op-green)">DataOps</strong></td><td>Data pipelines</td><td>Data quality, timeliness, trust</td><td>Data engineering</td></tr>
        <tr><td><strong style="color:var(--op-blue)">MLOps</strong></td><td>Traditional ML models</td><td>Model quality, reproducibility, drift</td><td>ML platform / DS</td></tr>
        <tr><td><strong style="color:var(--op-purple)">LLMOps</strong></td><td>LLM / GenAI apps</td><td>Output quality, safety, cost, retrieval</td><td>AI / LLM platform</td></tr>
        <tr><td><strong style="color:var(--op-amber)">ModelOps</strong></td><td>Enterprise AI governance</td><td>Risk, compliance, ROI of all models</td><td>AI governance / CIO</td></tr>
        <tr><td><strong style="color:var(--op-blue)">AIOps</strong></td><td>IT ops intelligence</td><td>Incident reduction, auto-remediation</td><td>Ops / SRE</td></tr>
        <tr><td><strong style="color:var(--op-green)">FinOps</strong></td><td>Cloud financial mgmt</td><td>Cost efficiency, value per dollar</td><td>Finance + Cloud</td></tr>
        <tr><td><strong style="color:var(--op-green)">GreenOps</strong></td><td>Sustainable IT</td><td>Energy and carbon footprint</td><td>Sustainability + Infra</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Section: Agentic RAG Mapping -->
<div class="op-section" id="agentic-rag">
  <h2>How This Maps to Agentic RAG on AWS</h2>
  <p>If you're building production agentic RAG systems, you're operating at the intersection of several disciplines. Here's where each shows up:</p>

  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">DevOps / GitOps</div>
      <div class="op-inf-title">Infrastructure & Deployment</div>
      <div class="op-inf-body">CI/CD for your services, IaC for ECS/Fargate, API Gateway, CloudFront, VPC. GitOps-style deploys if running EKS.</div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">DataOps</div>
      <div class="op-inf-title">Document Pipelines</div>
      <div class="op-inf-body">Ingest, clean, and transform documents (PDFs, HTML, structured data) before indexing into OpenSearch, Aurora, or Neo4j.</div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">MLOps</div>
      <div class="op-inf-title">Traditional ML Components</div>
      <div class="op-inf-body">Anomaly detection models, classifiers for routing or filtering — with training, registry, and drift monitoring.</div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-purple);">
      <div class="op-inf-label" style="color: var(--op-purple);">LLMOps</div>
      <div class="op-inf-title">The Core of Your RAG System</div>
      <div class="op-inf-body">Prompt/agent versioning, retrieval pipeline design, eval harnesses for groundedness and hallucination, guardrails, token/cost dashboards, caching strategies.</div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-amber);">
      <div class="op-inf-label" style="color: var(--op-amber);">ModelOps</div>
      <div class="op-inf-title">Enterprise Governance</div>
      <div class="op-inf-body">Governance layer for all AI models across products — audit trails, policy controls, compliance tracking for your RAG agents.</div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-green);">
      <div class="op-inf-label" style="color: var(--op-green);">FinOps + GreenOps</div>
      <div class="op-inf-title">Cost & Sustainability</div>
      <div class="op-inf-body">Token spend tracking, GPU usage optimization, storage efficiency. Carbon-aware batch indexing and off-peak scheduling for heavy jobs.</div>
    </div>
  </div>

  <div class="op-callout op-callout-success">
    <div class="op-callout-head">The Critical Combination</div>
    <p><strong>DevOps/GitOps + DataOps + MLOps + LLMOps</strong> as the engineering core, with <strong>FinOps</strong> and <strong>ModelOps</strong> as governance layers, and <strong>AIOps</strong> patterns to keep the whole system healthy.</p>
  </div>
</div>

<!-- Section: Decision Framework -->
<div class="op-section" id="decision">
  <h2>Decision Framework</h2>
  <p>Instead of asking "which ops do we need?", ask two questions:</p>

  <div class="op-card-grid">
    <div class="op-inf" style="border-top-color: var(--op-blue);">
      <div class="op-inf-label" style="color: var(--op-blue);">Question 1</div>
      <div class="op-inf-title">What are we delivering?</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li><strong>Code</strong> &rarr; DevOps / GitOps</li>
          <li><strong>Data</strong> &rarr; DataOps</li>
          <li><strong>ML models</strong> &rarr; MLOps / ModelOps</li>
          <li><strong>LLM apps/agents</strong> &rarr; LLMOps</li>
        </ul>
      </div>
    </div>
    <div class="op-inf" style="border-top-color: var(--op-purple);">
      <div class="op-inf-label" style="color: var(--op-purple);">Question 2</div>
      <div class="op-inf-title">What constraints matter most?</div>
      <div class="op-inf-body">
        <ul class="op-inf-list">
          <li><strong>Security</strong> &rarr; DevSecOps</li>
          <li><strong>Cost</strong> &rarr; FinOps</li>
          <li><strong>Sustainability</strong> &rarr; GreenOps</li>
          <li><strong>Operational intelligence</strong> &rarr; AIOps</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="op-callout op-callout-info">
    <div class="op-callout-head">The Takeaway</div>
    <p>In mature organizations, these aren't separate teams — they're <strong>shared practices and platforms</strong> that different squads plug into. Start with what you're delivering, layer on the constraints that matter, and let the "-ops" vocabulary help you communicate boundaries — not build walls.</p>
  </div>
</div>

</div><!-- /.op-content -->
</div><!-- /.op-layout -->
</div><!-- /.op-wrap -->

<script>
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('.op-sidebar a');
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
