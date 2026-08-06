---
layout: post
title: "Knowledge-Graph-Augmented RAG: How LightRAG Bridges Flat Retrieval and Structured Reasoning"
date: 2026-08-06
description: "How LightRAG augments standard vector RAG with an automatically constructed knowledge graph — enabling multi-hop reasoning, entity-centric lookups, and dual-level retrieval that pure chunk similarity cannot achieve."
tags: [rag, knowledge-graph, lightrag, retrieval, architecture]
categories: [genai]
featured: false
---

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --lr-bg: #0d1117; --lr-card: #161b22; --lr-card2: #1c2333; --lr-border: #30363d;
    --lr-text: #e6edf3; --lr-text2: #8b949e; --lr-muted: #6e7681;
    --lr-blue: #58a6ff; --lr-purple: #a371f7; --lr-green: #3fb950;
    --lr-orange: #f0883e; --lr-cyan: #79c0ff; --lr-amber: #ffa657; --lr-red: #f85149;
  }
  .lr-wrap { font-family: 'Space Grotesk', 'Inter', sans-serif; color: var(--lr-text); line-height: 1.7; max-width: 1100px; margin: 0 auto; }
  .lr-wrap p { color: var(--lr-text); margin: 0 0 1rem; line-height: 1.75; }
  .lr-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; }
  .lr-sidebar { position: sticky; top: 5rem; align-self: start; height: calc(100vh - 6rem); overflow-y: auto; }
  .lr-sidebar-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lr-muted); margin-bottom: 0.75rem; }
  .lr-sidebar a { display: block; padding: 0.35rem 0.75rem; border-left: 2px solid transparent; color: var(--lr-text2); text-decoration: none; font-size: 0.78rem; font-weight: 500; transition: all 0.2s; border-radius: 0 4px 4px 0; }
  .lr-sidebar a:hover { color: var(--lr-blue); border-left-color: var(--lr-blue); background: rgba(88,166,255,0.05); text-decoration: none; }
  .lr-sidebar a.active { color: var(--lr-blue); border-left-color: var(--lr-blue); font-weight: 600; background: rgba(88,166,255,0.08); }
  @media (max-width: 1000px) { .lr-layout { grid-template-columns: 1fr; } .lr-sidebar { display: none; } }

  .lr-hero { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--lr-border); }
  .lr-hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .lr-tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .lr-tag-blue { background: rgba(88,166,255,0.15); color: var(--lr-blue); border: 1px solid rgba(88,166,255,0.3); }
  .lr-tag-purple { background: rgba(163,113,247,0.15); color: var(--lr-purple); border: 1px solid rgba(163,113,247,0.3); }
  .lr-tag-green { background: rgba(63,185,80,0.15); color: var(--lr-green); border: 1px solid rgba(63,185,80,0.3); }
  .lr-tag-orange { background: rgba(240,136,62,0.15); color: var(--lr-orange); border: 1px solid rgba(240,136,62,0.3); }
  .lr-hero h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.2; color: var(--lr-text); margin: 0 0 1rem; letter-spacing: -0.02em; }
  .lr-hero-subtitle { font-size: 1.1rem; color: var(--lr-text); line-height: 1.6; margin: 0 0 1.5rem; max-width: 780px; opacity: 0.9; }

  .lr-section { margin-bottom: 3.5rem; scroll-margin-top: 5rem; }
  .lr-section h2 { font-size: 1.5rem; font-weight: 700; color: var(--lr-text); margin: 0 0 1.25rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.6rem; }
  .lr-section h2::before { content: ""; display: inline-block; width: 3px; height: 1.3em; background: linear-gradient(180deg, var(--lr-blue), var(--lr-purple)); border-radius: 2px; }
  .lr-section h3 { font-size: 1.1rem; font-weight: 600; color: var(--lr-text); margin: 2rem 0 0.75rem; }

  .lr-callout { border-left: 3px solid; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; }
  .lr-callout-info { border-color: var(--lr-blue); background: rgba(88,166,255,0.07); }
  .lr-callout-success { border-color: var(--lr-green); background: rgba(63,185,80,0.07); }
  .lr-callout-warning { border-color: var(--lr-amber); background: rgba(255,166,87,0.07); }
  .lr-callout-spec { border-color: var(--lr-purple); background: rgba(163,113,247,0.07); }
  .lr-callout-head { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
  .lr-callout-info .lr-callout-head { color: var(--lr-blue); }
  .lr-callout-success .lr-callout-head { color: var(--lr-green); }
  .lr-callout-warning .lr-callout-head { color: var(--lr-amber); }
  .lr-callout-spec .lr-callout-head { color: var(--lr-purple); }
  .lr-callout p { margin: 0; font-size: 0.88rem; color: var(--lr-text); opacity: 0.9; }

  .lr-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
  .lr-inf { background: var(--lr-card); border: 1px solid var(--lr-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; border-top: 3px solid; }
  .lr-inf-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .lr-inf-title { font-size: 0.95rem; font-weight: 600; color: var(--lr-text); margin-bottom: 0.5rem; }
  .lr-inf-body { font-size: 0.83rem; color: var(--lr-text); line-height: 1.6; opacity: 0.85; }

  .lr-timeline { list-style: none; padding: 0; margin: 1.5rem 0; position: relative; border-left: 2px solid var(--lr-border); margin-left: 0.75rem; }
  .lr-timeline li { position: relative; padding: 0.1rem 0 1.5rem 2rem; }
  .lr-timeline li::before { content: ""; position: absolute; left: -0.55rem; top: 0.45rem; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: var(--lr-blue); border: 2px solid var(--lr-bg); box-shadow: 0 0 0 2px var(--lr-blue); }
  .lr-tl-step { font-weight: 600; color: var(--lr-text); font-size: 0.9rem; margin-bottom: 0.25rem; }
  .lr-tl-desc { font-size: 0.82rem; color: var(--lr-text); opacity: 0.85; }

  .lr-table-wrap { overflow-x: auto; border-radius: 0.875rem; border: 1px solid var(--lr-border); margin: 1.5rem 0; }
  .lr-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  .lr-table thead tr { background: var(--lr-card2); }
  .lr-table th { padding: 0.75rem 1rem; text-align: left; font-weight: 600; font-size: 0.72rem; color: var(--lr-text2); letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--lr-border); }
  .lr-table td { padding: 0.65rem 1rem; border-bottom: 1px solid var(--lr-border); color: var(--lr-text); opacity: 0.9; vertical-align: top; }
  .lr-table tbody tr:last-child td { border-bottom: none; }
  .lr-table tbody tr:hover td { background: rgba(255,255,255,0.02); }
  .lr-table .check { color: var(--lr-green); font-weight: 700; }
  .lr-table .cross { color: var(--lr-red); }

  .lr-arch { background: var(--lr-card); border: 1px solid var(--lr-border); border-radius: 0.875rem; padding: 1.5rem; margin: 2rem 0; }
  .lr-arch-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--lr-muted); margin-bottom: 1rem; text-align: center; }
  .lr-arch-flow { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
  .lr-arch-step { background: var(--lr-bg); border: 1px solid var(--lr-border); border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px; }
  .lr-arch-step .step-name { font-size: 0.8rem; font-weight: 600; color: var(--lr-blue); }
  .lr-arch-step .step-desc { font-size: 0.65rem; color: var(--lr-text2); margin-top: 2px; }
  .lr-arch-arrow { color: var(--lr-muted); font-size: 1.1rem; }

  @media (max-width: 768px) { .lr-card-grid { grid-template-columns: 1fr; } .lr-arch-flow { flex-direction: column; } .lr-arch-arrow { transform: rotate(90deg); } }
</style>

<div class="lr-wrap">

<!-- Hero -->
<div class="lr-hero">
  <div class="lr-hero-tags">
    <span class="lr-tag lr-tag-blue">Knowledge Graph</span>
    <span class="lr-tag lr-tag-purple">RAG</span>
    <span class="lr-tag lr-tag-green">LightRAG</span>
    <span class="lr-tag lr-tag-orange">Retrieval</span>
  </div>
  <h1>Knowledge-Graph-Augmented RAG: How LightRAG Bridges Flat Retrieval and Structured Reasoning</h1>
  <p class="lr-hero-subtitle">Standard vector RAG retrieves text chunks by similarity — and hopes the LLM figures out the connections. LightRAG introduces a structured knowledge graph into the retrieval process, enabling multi-hop reasoning, entity-centric lookups, and dual-level retrieval that pure chunk similarity cannot achieve.</p>
</div>

<!-- Layout -->
<div class="lr-layout">
<aside class="lr-sidebar">
  <div class="lr-sidebar-label">On this page</div>
  <a href="#problem">The Problem with Flat RAG</a>
  <a href="#what-is">What is LightRAG?</a>
  <a href="#ingestion">Ingestion Pipeline</a>
  <a href="#kg-construction">KG Construction</a>
  <a href="#query-modes">Query Modes</a>
  <a href="#query-flow">Query Flow Example</a>
  <a href="#storage">Storage Architecture</a>
  <a href="#vs-standard">LightRAG vs Standard RAG</a>
  <a href="#caching">Caching & Performance</a>
  <a href="#multimodal">Multimodal Support</a>
  <a href="#limitations">Practical Limitations</a>
  <a href="#when-to-use">When to Use LightRAG</a>
  <a href="#sources">Sources</a>
</aside>
<div class="lr-content">

<!-- Section: Problem -->
<div class="lr-section" id="problem">
  <h2>The Problem with Flat RAG</h2>
  <p>Standard vector RAG has a fundamental limitation: it represents documents as flat collections of chunks. Each chunk is embedded independently, and retrieval finds the top-K most similar chunks to the query. This works for simple factual questions but fails when:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Failure</div>
      <div class="lr-inf-title">Complex Inter-Dependencies</div>
      <div class="lr-inf-body">Information about how entities relate to each other is spread across multiple chunks. A flat search finds individual mentions but misses the relationships connecting them.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Failure</div>
      <div class="lr-inf-title">Multi-Hop Reasoning</div>
      <div class="lr-inf-body">Questions requiring traversal of relationships (A depends on B, B conflicts with C) cannot be answered by similarity search alone — the answer requires following a chain of connections.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Failure</div>
      <div class="lr-inf-title">Thematic Understanding</div>
      <div class="lr-inf-body">High-level questions about trends, patterns, or overarching themes require aggregating information across many documents — not just finding the most similar chunk.</div>
    </div>
  </div>

  <div class="lr-callout lr-callout-warning">
    <div class="lr-callout-head">The Core Issue</div>
    <p>Flat data representation leads to fragmented answers and fails to capture complex inter-dependencies. The retrieval system has no understanding of structure — it only knows "this text is similar to that text."</p>
  </div>
</div>

<!-- Section: What is LightRAG -->
<div class="lr-section" id="what-is">
  <h2>What is LightRAG?</h2>
  <p>LightRAG is a retrieval-augmented generation framework that augments standard vector-based RAG with an <strong>automatically constructed knowledge graph</strong>. During ingestion, it extracts typed entities and binary relationships from your documents using an LLM, building a structured graph alongside the traditional vector index.</p>

  <p>At query time, it performs <strong>dual-level retrieval</strong> — searching both the entity graph (for precise, local lookups) and the relationship graph (for thematic, global reasoning) — then merges results with relevant source chunks to provide comprehensive, context-rich answers.</p>

  <div class="lr-callout lr-callout-info">
    <div class="lr-callout-head">Key Insight</div>
    <p>LightRAG doesn't replace vector search — it <strong>augments</strong> it with graph structure. You get the semantic coverage of vector similarity PLUS the precision of explicit entity relationships. The graph tells you <em>what's connected to what</em>; the vectors tell you <em>what's semantically relevant</em>.</p>
  </div>
</div>

<!-- Section: Ingestion -->
<div class="lr-section" id="ingestion">
  <h2>Ingestion Pipeline</h2>
  <p>The ingestion process transforms raw documents into a dual representation: a knowledge graph AND a vector index, both built from the same source material.</p>

  <div class="lr-arch">
    <div class="lr-arch-title">Document Processing Flow</div>
    <div class="lr-arch-flow">
      <div class="lr-arch-step"><div class="step-name">Documents</div><div class="step-desc">PDF, text, HTML</div></div>
      <span class="lr-arch-arrow">→</span>
      <div class="lr-arch-step"><div class="step-name">Chunking</div><div class="step-desc">Token-based split</div></div>
      <span class="lr-arch-arrow">→</span>
      <div class="lr-arch-step"><div class="step-name">LLM Extraction</div><div class="step-desc">Entities + Relations</div></div>
      <span class="lr-arch-arrow">→</span>
      <div class="lr-arch-step"><div class="step-name">Graph Build</div><div class="step-desc">Merge + Deduplicate</div></div>
      <span class="lr-arch-arrow">→</span>
      <div class="lr-arch-step"><div class="step-name">Embed</div><div class="step-desc">Entities + Relations + Chunks</div></div>
      <span class="lr-arch-arrow">→</span>
      <div class="lr-arch-step"><div class="step-name">Store</div><div class="step-desc">Graph + Vector + KV</div></div>
    </div>
  </div>

  <ul class="lr-timeline">
    <li><div class="lr-tl-step">1. Chunking</div><div class="lr-tl-desc">Documents are split into token-sized chunks using a configurable tokenizer (default chunk size: ~1200 tokens, overlap: ~100 tokens).</div></li>
    <li><div class="lr-tl-step">2. Entity & Relationship Extraction</div><div class="lr-tl-desc">Each chunk is sent to an LLM with a structured prompt instructing it to extract typed entities (name, type, description) and binary relationships (source, target, keywords, description). Supports "gleaning" — multiple extraction passes on the same chunk to catch missed entities.</div></li>
    <li><div class="lr-tl-step">3. Two-Phase Merge</div><div class="lr-tl-desc">Extracted nodes and edges are merged into the knowledge graph — entities first, then relationships. Duplicate entities are merged; descriptions are aggregated or LLM-summarized. Source chunk IDs are tracked for provenance.</div></li>
    <li><div class="lr-tl-step">4. Embedding</div><div class="lr-tl-desc">Each entity, each relationship, and each source chunk gets its own vector embedding — stored in the vector database. This enables semantic search at three granularities: entity-level, relationship-level, and chunk-level.</div></li>
  </ul>
</div>

<!-- Section: KG Construction -->
<div class="lr-section" id="kg-construction">
  <h2>Knowledge Graph Construction</h2>
  <p>The LLM-driven extraction produces a typed graph where:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-blue);">
      <div class="lr-inf-label" style="color: var(--lr-blue);">Nodes</div>
      <div class="lr-inf-title">Typed Entities</div>
      <div class="lr-inf-body">Each entity has a name, type (person, organization, concept, technology, etc.), and a merged description aggregated from all chunks that mention it. Duplicates are detected and merged automatically.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-purple);">
      <div class="lr-inf-label" style="color: var(--lr-purple);">Edges</div>
      <div class="lr-inf-title">Binary Relationships</div>
      <div class="lr-inf-body">Each relationship connects a source entity to a target entity, with keywords (for retrieval), a description (for context), and source chunk IDs (for provenance). Relationships are also embedded for semantic search.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Provenance</div>
      <div class="lr-inf-title">Source Tracking</div>
      <div class="lr-inf-body">Every entity and relationship tracks which source chunks it was extracted from. At query time, the system can retrieve the original text that supports any graph-derived answer — ensuring citations are always available.</div>
    </div>
  </div>

  <div class="lr-callout lr-callout-spec">
    <div class="lr-callout-head">Gleaning: Multi-Pass Extraction</div>
    <p>A single LLM pass may miss entities or relationships — especially in dense technical text. LightRAG supports "gleaning": running the extraction prompt multiple times on the same chunk and merging results. This catches entities that one pass overlooked, improving graph completeness without additional source documents.</p>
  </div>
</div>

<!-- Section: Query Modes -->
<div class="lr-section" id="query-modes">
  <h2>Query Modes: Local, Global, Hybrid, and Naive</h2>
  <p>LightRAG's dual-level retrieval system separates queries into two keyword types and routes them through different search paths:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-blue);">
      <div class="lr-inf-label" style="color: var(--lr-blue);">Mode</div>
      <div class="lr-inf-title">Local Mode</div>
      <div class="lr-inf-body">Embeds <strong>low-level keywords</strong> (specific entities, names, terms) and queries the <em>entities</em> vector DB. Then traverses the graph from matched entities to collect connected relationships. Best for: precise entity-centric questions.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-purple);">
      <div class="lr-inf-label" style="color: var(--lr-purple);">Mode</div>
      <div class="lr-inf-title">Global Mode</div>
      <div class="lr-inf-body">Embeds <strong>high-level keywords</strong> (themes, concepts, patterns) and queries the <em>relationships</em> vector DB. Then collects associated entities. Best for: thematic questions, trend analysis, overview queries.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Mode</div>
      <div class="lr-inf-title">Hybrid Mode</div>
      <div class="lr-inf-body">Runs <strong>both local and global paths</strong> plus optionally a direct chunk vector search. Merges results from all paths. Best for: complex questions that need both entity precision and thematic context.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-orange);">
      <div class="lr-inf-label" style="color: var(--lr-orange);">Mode</div>
      <div class="lr-inf-title">Naive Mode</div>
      <div class="lr-inf-body">Standard vector similarity search over chunks only — no graph traversal. Serves as a baseline comparison and fallback when graph data is unavailable. Equivalent to traditional RAG.</div>
    </div>
  </div>

  <div class="lr-callout lr-callout-info">
    <div class="lr-callout-head">Keyword Decomposition</div>
    <p>Before retrieval, the LLM decomposes the user query into two keyword types: <strong>high-level</strong> (overarching themes like "economic growth", "security architecture") and <strong>low-level</strong> (specific entities like "Microsoft", "TLS 1.3"). This decomposition drives which retrieval path activates — local searches entity embeddings, global searches relationship embeddings.</p>
  </div>
</div>

<!-- Section: Query Flow -->
<div class="lr-section" id="query-flow">
  <h2>Query Flow: End-to-End Example</h2>
  <p>Here's how a query traverses the system in hybrid mode:</p>

  <ul class="lr-timeline">
    <li><div class="lr-tl-step">1. Keyword Extraction</div><div class="lr-tl-desc">LLM decomposes "How did Company X expand its cloud services?" into low-level keywords ["Company X", "cloud services"] and high-level keywords ["expansion", "growth", "acquisition"].</div></li>
    <li><div class="lr-tl-step">2. Vector Searches (Parallel)</div><div class="lr-tl-desc">Entities VDB → matches ["Company X", "Azure", "GitHub"]. Relationships VDB → matches ["Company X→Azure", "Company X→GitHub"].</div></li>
    <li><div class="lr-tl-step">3. Graph Traversal</div><div class="lr-tl-desc">From "Company X" → finds edges to "Azure", "GitHub", "Office365". From "Company X→Azure" → finds related entities "DataCenters", "AI Services". Multi-hop paths reveal connections not visible in flat search.</div></li>
    <li><div class="lr-tl-step">4. Chunk Collection</div><div class="lr-tl-desc">Source chunk IDs from all matched entities and relationships are gathered. Chunks are scored by weight or vector similarity, deduplicated, and truncated to fit the token budget.</div></li>
    <li><div class="lr-tl-step">5. Context Assembly</div><div class="lr-tl-desc">Entities, relationships, and source chunks are formatted into a structured context string — providing the LLM with both graph-derived structure and supporting text evidence.</div></li>
    <li><div class="lr-tl-step">6. LLM Generation</div><div class="lr-tl-desc">The assembled context is passed to the LLM for final answer generation. The answer benefits from semantic relevance (vector), structural context (graph), and complete source text (chunks).</div></li>
  </ul>
</div>

<!-- Section: Storage -->
<div class="lr-section" id="storage">
  <h2>Storage Architecture: Four Layers</h2>
  <p>LightRAG uses a pluggable multi-backend storage architecture with four distinct layers:</p>

  <div class="lr-table-wrap">
    <table class="lr-table">
      <thead><tr><th>Layer</th><th>Purpose</th><th>Backend Options</th></tr></thead>
      <tbody>
        <tr><td><strong>Graph Storage</strong></td><td>Entities, relationships, and their connections</td><td>NetworkX (default), Neo4j, PostgreSQL, MongoDB, OpenSearch</td></tr>
        <tr><td><strong>Vector Storage</strong></td><td>Embeddings for entities, relationships, and chunks</td><td>NanoVectorDB (default), FAISS, Milvus, Qdrant, PostgreSQL (pgvector), OpenSearch</td></tr>
        <tr><td><strong>Key-Value Storage</strong></td><td>Chunk text, entity descriptions, metadata</td><td>JSON files (default), Redis, PostgreSQL, MongoDB, OpenSearch</td></tr>
        <tr><td><strong>Document Status</strong></td><td>Tracking which documents have been ingested</td><td>JSON files (default), PostgreSQL, MongoDB, OpenSearch</td></tr>
      </tbody>
    </table>
  </div>

  <div class="lr-callout lr-callout-success">
    <div class="lr-callout-head">Unified Backend Option</div>
    <p>For production deployments, backends like OpenSearch or PostgreSQL can serve as a unified storage layer — handling graph, vector, KV, and document status in a single managed service. This simplifies operations while maintaining the logical separation of concerns.</p>
  </div>
</div>

<!-- Section: vs Standard RAG -->
<div class="lr-section" id="vs-standard">
  <h2>LightRAG vs Standard Vector RAG</h2>

  <div class="lr-table-wrap">
    <table class="lr-table">
      <thead><tr><th>Dimension</th><th>Standard Vector RAG</th><th>LightRAG</th></tr></thead>
      <tbody>
        <tr><td><strong>Data Representation</strong></td><td>Flat chunks with embeddings</td><td>Chunks + Knowledge Graph (entities + relationships)</td></tr>
        <tr><td><strong>Retrieval Method</strong></td><td>Similarity search only</td><td>Dual-level: entity search + relationship search + graph traversal</td></tr>
        <tr><td><strong>Multi-Hop Reasoning</strong></td><td class="cross">✗ Cannot follow connections</td><td class="check">✓ Graph traversal across entity edges</td></tr>
        <tr><td><strong>Thematic Questions</strong></td><td class="cross">✗ Returns fragments</td><td class="check">✓ Global mode searches relationship embeddings</td></tr>
        <tr><td><strong>Entity-Centric Lookup</strong></td><td>Approximate (similarity)</td><td class="check">✓ Explicit entity nodes with typed metadata</td></tr>
        <tr><td><strong>Ingestion Cost</strong></td><td>Embedding only</td><td>Embedding + LLM extraction (higher)</td></tr>
        <tr><td><strong>Query Latency</strong></td><td>Fast (single vector search)</td><td>Moderate (vector + graph + merge)</td></tr>
        <tr><td><strong>Provenance</strong></td><td>Chunk-level only</td><td class="check">✓ Entity→chunk, relationship→chunk tracing</td></tr>
        <tr><td><strong>Incremental Updates</strong></td><td class="check">✓ Append new chunks</td><td class="check">✓ Merge new entities/relationships into existing graph</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Section: Caching -->
<div class="lr-section" id="caching">
  <h2>Caching & Performance</h2>
  <p>LightRAG implements multi-level caching to optimize both ingestion and query performance:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-blue);">
      <div class="lr-inf-label" style="color: var(--lr-blue);">Ingestion</div>
      <div class="lr-inf-title">Document Status Cache</div>
      <div class="lr-inf-body">Tracks which documents have already been processed. Re-ingestion skips previously processed documents — only new or modified content triggers extraction. Enables efficient incremental updates.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Query</div>
      <div class="lr-inf-title">LLM Response Cache</div>
      <div class="lr-inf-body">Caches LLM responses for keyword extraction and answer generation. Identical queries return cached results without re-invoking the LLM — significantly reducing latency and cost for repeated questions.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-purple);">
      <div class="lr-inf-label" style="color: var(--lr-purple);">Graph</div>
      <div class="lr-inf-title">Entity Merge Cache</div>
      <div class="lr-inf-body">During ingestion, entity deduplication and merge results are cached. When the same entity is encountered in new documents, the system merges descriptions without reprocessing the entire graph.</div>
    </div>
  </div>
</div>

<!-- Section: Multimodal -->
<div class="lr-section" id="multimodal">
  <h2>Multimodal Support</h2>
  <p>LightRAG extends beyond text through integration with multimodal processing pipelines (e.g., RAG-Anything). This enables knowledge graph construction from:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-cyan);">
      <div class="lr-inf-label" style="color: var(--lr-cyan);">Source</div>
      <div class="lr-inf-title">Images & Diagrams</div>
      <div class="lr-inf-body">Vision-Language Models (VLMs) extract descriptions from images, architecture diagrams, and flowcharts — converting visual information into text that feeds the entity extraction pipeline.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-amber);">
      <div class="lr-inf-label" style="color: var(--lr-amber);">Source</div>
      <div class="lr-inf-title">Tables & Structured Data</div>
      <div class="lr-inf-body">Tabular data is parsed and converted into entity-relationship triples. Column headers become entity types; rows become instances. Relationships between table entities are inferred and added to the graph.</div>
    </div>
  </div>
</div>

<!-- Section: Practical Limitations -->
<div class="lr-section" id="limitations">
  <h2>Practical Limitations & Tradeoffs</h2>
  <p>LightRAG is powerful but not without cost. From hands-on experience, here are the real tradeoffs teams should plan for:</p>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Cost</div>
      <div class="lr-inf-title">Graph Construction is Expensive</div>
      <div class="lr-inf-body">Entity and relationship extraction requires an LLM call for every chunk — often with multiple "gleaning" passes. For large document sets, initial graph construction can take hours and consume significant LLM tokens. However, incremental updates are supported — new documents get processed without rebuilding the entire graph.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-amber);">
      <div class="lr-inf-label" style="color: var(--lr-amber);">Tuning</div>
      <div class="lr-inf-title">Parameter Sensitivity</div>
      <div class="lr-inf-body">The number of entities, relationships, and chunks to retrieve must be carefully tuned per use case. Too many results overload the LLM context window with irrelevant information, degrading answer quality. Too few miss critical context. Finding the right balance requires experimentation with your specific data and query patterns.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-amber);">
      <div class="lr-inf-label" style="color: var(--lr-amber);">Latency</div>
      <div class="lr-inf-title">Slower Answer Generation</div>
      <div class="lr-inf-body">Compared to standard vector RAG, LightRAG adds latency: keyword extraction (LLM call), dual vector searches, graph traversal, chunk collection, and context assembly — all before the final generation call. Total query time is noticeably higher than a simple similarity search + generate pattern.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Quality</div>
      <div class="lr-inf-title">Extraction Quality Depends on the LLM</div>
      <div class="lr-inf-body">The knowledge graph is only as good as the LLM's extraction capability. Weaker models miss entities, invent relationships, or produce inconsistent typing. Using a capable model for extraction (even if you use a smaller model for query-time generation) is critical for graph quality.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Scale</div>
      <div class="lr-inf-title">Graph Growth Management</div>
      <div class="lr-inf-body">As the graph grows, entity merging becomes complex — duplicate detection across thousands of entities requires LLM-based summarization, adding cost. Graph traversal time also increases with edge count. Production deployments need a strategy for graph pruning or partitioning.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-amber);">
      <div class="lr-inf-label" style="color: var(--lr-amber);">Debugging</div>
      <div class="lr-inf-title">Harder to Debug Than Standard RAG</div>
      <div class="lr-inf-body">When answers are wrong, the failure could be in extraction (bad entities), graph structure (missing edges), vector search (wrong matches), chunk selection (wrong source text), or generation. Multiple retrieval paths make root-cause analysis more complex than single-path vector RAG.</div>
    </div>
  </div>

  <h3>Strengths vs Limitations Summary</h3>
  <div class="lr-table-wrap">
    <table class="lr-table">
      <thead><tr><th>Strengths</th><th>Limitations</th></tr></thead>
      <tbody>
        <tr><td>Multi-hop reasoning via graph traversal</td><td>High initial ingestion cost (LLM calls per chunk)</td></tr>
        <tr><td>Dual-level retrieval (entity + thematic)</td><td>Higher query latency than standard vector RAG</td></tr>
        <tr><td>Incremental updates without full rebuild</td><td>Parameter tuning required (entities/relations/chunk counts)</td></tr>
        <tr><td>Provenance tracking (entity → source chunk)</td><td>Extraction quality dependent on LLM capability</td></tr>
        <tr><td>Handles thematic/overview questions well</td><td>Graph growth management at scale</td></tr>
        <tr><td>Pluggable storage backends</td><td>More complex debugging (multiple retrieval paths)</td></tr>
        <tr><td>Automatic entity deduplication and merge</td><td>Context window overload risk if retrieval params not tuned</td></tr>
        <tr><td>Open-source with active development</td><td>Evaluation integration still maturing</td></tr>
      </tbody>
    </table>
  </div>

  <div class="lr-callout lr-callout-warning">
    <div class="lr-callout-head">The Incremental Update Advantage</div>
    <p>Despite the high initial cost, LightRAG's incremental update capability is a significant operational benefit. When new documents arrive, only those documents are processed — new entities merge into the existing graph, new relationships extend it. You don't restart from scratch. This makes the upfront investment amortizable over time.</p>
  </div>
</div>

<!-- Section: When to Use -->
<div class="lr-section" id="when-to-use">
  <h2>When to Use LightRAG</h2>

  <div class="lr-card-grid">
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Good Fit</div>
      <div class="lr-inf-title">Documents with Rich Entity Relationships</div>
      <div class="lr-inf-body">Technical documentation, specifications, research papers — anywhere entities reference, depend on, or conflict with each other across documents.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Good Fit</div>
      <div class="lr-inf-title">Multi-Hop Questions</div>
      <div class="lr-inf-body">"What depends on X?" "If Y changes, what's affected?" — questions requiring traversal of relationships that standard search cannot answer.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-green);">
      <div class="lr-inf-label" style="color: var(--lr-green);">Good Fit</div>
      <div class="lr-inf-title">Thematic Exploration</div>
      <div class="lr-inf-body">"What are the main trends in X?" "How does Y relate to Z at a high level?" — questions needing aggregation across many documents.</div>
    </div>
    <div class="lr-inf" style="border-top-color: var(--lr-red);">
      <div class="lr-inf-label" style="color: var(--lr-red);">Less Ideal</div>
      <div class="lr-inf-title">Simple Factual Lookup</div>
      <div class="lr-inf-body">If your questions are always simple and self-contained within a single chunk, the overhead of graph construction may not justify the benefit. Standard vector RAG suffices.</div>
    </div>
  </div>

  <div class="lr-callout lr-callout-success">
    <div class="lr-callout-head">The Takeaway</div>
    <p>LightRAG shines when your documents contain <strong>interconnected knowledge</strong> — where understanding the relationships between entities is as important as finding the entities themselves. It's the middle ground between simple vector RAG (fast, flat) and full enterprise knowledge graphs (complex, manual) — automated graph construction with retrieval that leverages structure.</p>
  </div>
</div>

<!-- Section: Sources -->
<div class="lr-section" id="sources">
  <h2>Sources & References</h2>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 0.75rem;"><a href="https://github.com/HKUDS/LightRAG" target="_blank" style="color: var(--lr-blue); text-decoration: none; font-weight: 600;">LightRAG GitHub Repository</a> — Official implementation, source code, and documentation</li>
    <li style="margin-bottom: 0.75rem;"><a href="https://lightrag.github.io/" target="_blank" style="color: var(--lr-purple); text-decoration: none; font-weight: 600;">LightRAG Research Paper</a> — Architecture design, dual-level retrieval, and evaluation results</li>
    <li style="margin-bottom: 0.75rem;"><a href="https://github.com/hkuds/rag-anything" target="_blank" style="color: var(--lr-green); text-decoration: none; font-weight: 600;">RAG-Anything</a> — Multimodal extension for knowledge graph construction from images, diagrams, and tables</li>
  </ul>
</div>

</div><!-- /.lr-content -->
</div><!-- /.lr-layout -->
</div><!-- /.lr-wrap -->

<script>
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('.lr-sidebar a');
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
