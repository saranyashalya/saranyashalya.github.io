---
layout: page
title: "Multi-Agent RAG with Knowledge Graphs for Product Intelligence"
permalink: /supervision/multi-agent-rag-kg-2024/
description: "Summer 2024 internship project building a multi-agent RAG system that combines knowledge graph traversal with vector search for enterprise product documentation."
---

<style>
  .thesis-header { text-align: center; margin-bottom: 48px; padding: 32px; background: #161b22; border: 1px solid #30363d; border-radius: 12px; }
  .thesis-header h1 { font-size: 1.8em; background: linear-gradient(135deg, #3fb950, #58a6ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
  .thesis-header .subtitle { font-size: 1em; color: #8b949e; max-width: 700px; margin: 0 auto 16px; }
  .thesis-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 16px; }
  .thesis-meta .badge { background: #21262d; border: 1px solid #30363d; border-radius: 16px; padding: 4px 12px; font-size: 0.75em; color: #c9d1d9; }

  .section-title { color: #58a6ff; font-size: 1.3em; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #30363d; }

  .arch-diagram { background: #0d1117; border: 1px solid #30363d; border-radius: 12px; padding: 24px; margin: 24px 0; }
  .arch-layers { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; }
  .arch-layer { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px; text-align: center; }
  .arch-layer .icon { font-size: 1.8em; margin-bottom: 6px; }
  .arch-layer .name { font-size: 0.85em; font-weight: 600; color: #e6edf3; }
  .arch-layer .desc { font-size: 0.72em; color: #8b949e; margin-top: 4px; }

  .flow-diagram { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 20px 0; padding: 16px; background: #0d1117; border-radius: 8px; }
  .flow-step { background: #21262d; border: 1px solid #30363d; border-radius: 6px; padding: 8px 14px; font-size: 0.8em; text-align: center; }
  .flow-step .step-title { font-weight: 600; color: #3fb950; font-size: 0.9em; }
  .flow-step .step-desc { color: #8b949e; font-size: 0.8em; }
  .flow-arrow { color: #484f58; font-size: 1.2em; }

  .findings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0; }
  .finding-card { background: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 20px; }
  .finding-card h4 { color: #3fb950; font-size: 0.95em; margin-bottom: 8px; }
  .finding-card p { color: #8b949e; font-size: 0.85em; line-height: 1.6; margin: 0; }

  .tech-stack { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
  .tech-item { background: #21262d; border: 1px solid #30363d; border-radius: 16px; padding: 4px 12px; font-size: 0.78em; color: #c9d1d9; }

  .key-insight { background: linear-gradient(135deg, #161b22, #1c2431); border: 1px solid #30363d; border-radius: 12px; padding: 24px; margin: 32px 0; }
  .key-insight blockquote { font-size: 1.1em; font-style: italic; color: #e6edf3; margin: 0; line-height: 1.5; border: none; padding: 0; background: none; }

  .challenges-list { list-style: none; padding: 0; margin: 16px 0; }
  .challenges-list li { padding: 10px 16px; margin: 6px 0; background: #161b22; border: 1px solid #30363d; border-radius: 8px; font-size: 0.85em; color: #c9d1d9; position: relative; padding-left: 32px; }
  .challenges-list li::before { content: "⚡"; position: absolute; left: 10px; }

  @media (max-width: 768px) {
    .findings-grid, .arch-layers { grid-template-columns: 1fr; }
    .flow-diagram { flex-direction: column; }
    .flow-arrow { transform: rotate(90deg); }
  }
</style>

<div class="thesis-header">
  <h1>Multi-Agent RAG with Knowledge Graphs</h1>
  <p class="subtitle">Building an intelligent product documentation assistant that combines SPARQL-based knowledge graph traversal with vector search using a LangGraph multi-agent architecture.</p>
  <div class="thesis-meta">
    <span class="badge">Summer Internship · 2024</span>
    <span class="badge">Ericsson, Stockholm</span>
    <span class="badge">Multi-Agent RAG</span>
    <span class="badge">Knowledge Graphs</span>
  </div>
</div>

<h3 class="section-title">Project Overview</h3>

This internship project developed a **multi-agent RAG prototype** for querying enterprise product documentation (product knowledge base) using a combination of knowledge graph traversal and vector-based semantic search. The system enables engineers to ask natural language questions about hardware products (basebands, routers) and receive structured, accurate answers sourced from both graph queries and unstructured documentation.

The core challenge: product information is distributed across a **knowledge graph** (structured RDF/SPARQL data) and **textual documentation** (unstructured attributes, installation guides). A single retrieval method cannot cover both — the system needs to intelligently route and combine results.

<h3 class="section-title">Architecture</h3>

<div class="arch-diagram">
  <div class="arch-layers">
    <div class="arch-layer">
      <div class="icon">💬</div>
      <div class="name">User Question</div>
      <div class="desc">Natural language query about products</div>
    </div>
    <div class="arch-layer">
      <div class="icon">🔀</div>
      <div class="name">Router Agent</div>
      <div class="desc">LangGraph-based intent classification and routing</div>
    </div>
    <div class="arch-layer">
      <div class="icon">🕸️</div>
      <div class="name">KG Query Tool</div>
      <div class="desc">SPARQL generation → Knowledge Graph → structured answers</div>
    </div>
    <div class="arch-layer">
      <div class="icon">🔍</div>
      <div class="name">Vector Search Tool</div>
      <div class="desc">OpenSearch embeddings → semantic retrieval from product knowledge base docs</div>
    </div>
    <div class="arch-layer">
      <div class="icon">✅</div>
      <div class="name">Evaluator Agent</div>
      <div class="desc">Assesses answer quality, re-invokes tools if needed</div>
    </div>
  </div>
</div>

<h3 class="section-title">Multi-Agent Flow</h3>

<div class="flow-diagram">
  <div class="flow-step"><div class="step-title">Question</div><div class="step-desc">NL input</div></div>
  <span class="flow-arrow">→</span>
  <div class="flow-step"><div class="step-title">Router Agent</div><div class="step-desc">Intent + routing</div></div>
  <span class="flow-arrow">→</span>
  <div class="flow-step"><div class="step-title">KG / Vector</div><div class="step-desc">Parallel retrieval</div></div>
  <span class="flow-arrow">→</span>
  <div class="flow-step"><div class="step-title">Evaluator</div><div class="step-desc">Quality check</div></div>
  <span class="flow-arrow">→</span>
  <div class="flow-step"><div class="step-title">Answer</div><div class="step-desc">Structured output</div></div>
</div>

The final system uses **LangGraph** to orchestrate a stateful agent graph where:
1. A **Router Agent** classifies the question intent and decides which tools to invoke
2. A **KG Query Process** generates SPARQL queries against the product knowledge graph, with iterative error correction
3. A **Vector Search Process** retrieves relevant chunks from the vector store (product knowledge base embeddings)
4. An **Evaluator Agent** assesses whether the retrieved context is sufficient or needs re-invocation with different tools
5. Two independent LLMs are used — a lighter model for routing decisions, a more capable model for evaluation

<h3 class="section-title">Approaches Explored</h3>

The internship systematically explored three approaches, each building on the learnings of the previous:

<div class="findings-grid">
  <div class="finding-card">
    <h4>Approach 1: Knowledge Graph Chain</h4>
    <p>Generate SPARQL queries from natural language using the LLM, retrieve triples from the KG, and generate a natural-language answer from the structured results. The SPARQL generation uses the graph schema + example queries as context for the LLM.</p>
  </div>
  <div class="finding-card">
    <h4>Approach 2: Vector Search Chain</h4>
    <p>Extract structured attributes from RDF blank nodes (product name, capability modules, attribute-value pairs), embed them as documents with metadata, and perform similarity search against user queries. Enables fuzzy matching over unstructured product information.</p>
  </div>
  <div class="finding-card">
    <h4>Approach 3: Multi-Agent Combination</h4>
    <p>Combine both approaches using LangGraph — a Router Agent decides whether to use the KG chain, vector chain, or both. An Evaluator Agent assesses the answer quality and can re-invoke the other tool if the first result is insufficient.</p>
  </div>
</div>

<h3 class="section-title">Key Technical Contributions</h3>

<div class="findings-grid">
  <div class="finding-card">
    <h4>SPARQL Generation with Error Recovery</h4>
    <p>LLM-generated SPARQL queries with iterative validation — error messages from failed queries are fed back to the LLM for self-repair using SPARQLWrapper. Handles prefix issues, syntax errors, and schema mismatches automatically.</p>
  </div>
  <div class="finding-card">
    <h4>Structured Document Embedding</h4>
    <p>Extracted product attributes from RDF blank nodes via SPARQL, creating documents with product name, capabilities, and attribute-value pairs. Metadata-enriched embeddings enable filtered vector search by product model.</p>
  </div>
  <div class="finding-card">
    <h4>LangGraph Agent Orchestration</h4>
    <p>State-machine based agent graph with conditional routing, tool selection, and re-invocation logic. The Router and Evaluator agents operate as independent LLMs with distinct responsibilities — moving beyond simple chain-of-thought to adaptive retrieval.</p>
  </div>
  <div class="finding-card">
    <h4>Conversational Memory</h4>
    <p>ConversationBufferMemory integration allowing follow-up questions without re-providing context — enabling natural multi-turn interactions about product specifications.</p>
  </div>
  <div class="finding-card">
    <h4>Schema-Guided Query Generation</h4>
    <p>JSON-ified graph schema provided to the LLM — separating node types, object properties, and data properties to make ontology structure explicit and improve SPARQL generation accuracy.</p>
  </div>
  <div class="finding-card">
    <h4>Structured Output Control</h4>
    <p>Agent outputs structured data formats for validation and control, catching edge cases where the KG returns "0" (ambiguous between "no data found" vs "actual value is zero").</p>
  </div>
</div>

<h3 class="section-title">Technology Stack</h3>

<div class="tech-stack">
  <span class="tech-item">LangChain</span>
  <span class="tech-item">LangGraph</span>
  <span class="tech-item">OpenSearch</span>
  <span class="tech-item">SPARQL</span>
  <span class="tech-item">RDF / Turtle</span>
  <span class="tech-item">Triple Store</span>
  <span class="tech-item">LLMs (GPT-3.5 / GPT-4)</span>
  <span class="tech-item">Python</span>
  <span class="tech-item">Knowledge Graphs</span>
  <span class="tech-item">Vector Embeddings</span>
  <span class="tech-item">SPARQLWrapper</span>
  <span class="tech-item">Object Storage (S3)</span>
</div>

<h3 class="section-title">Challenges & Learnings</h3>

<div class="findings-grid">
  <div class="finding-card">
    <h4>KG Chain Limitations</h4>
    <p>Graph schema extraction was often close to or exceeding LLM token limits, restricting the approach to smaller subgraphs. Certain information stored in unstructured text fields or labels within the KG was hard to retrieve via SPARQL — limiting the system to questions where clear structural instructions existed.</p>
  </div>
  <div class="finding-card">
    <h4>Vector Search Limitations</h4>
    <p>Surface-level answers worked well, but the vector search prioritized wrong documents and favored certain versions over others. The system struggled to recognize when information from multiple documents was needed, and was sensitive to how the user phrased the question.</p>
  </div>
  <div class="finding-card">
    <h4>Structured vs Unstructured Data</h4>
    <p>Semantic chunking was not fully applicable to already-structured data. Required different embedding strategies — extracting product name, capabilities, and attribute-value pairs as metadata rather than treating structured records as free text.</p>
  </div>
  <div class="finding-card">
    <h4>Agent Decision Boundaries</h4>
    <p>When the KG returned "0", the agent assumed the answer was determined and didn't re-prompt the vector search — confusing "no data found" with "the actual value is zero". Required explicit state management with structured output controls.</p>
  </div>
</div>

<h3 class="section-title">Future Directions</h3>

<ul class="challenges-list">
  <li>Broader QA testing across diverse scenarios to validate expected answers</li>
  <li>Restructure SPARQL generation to be less dependent on hand-crafted examples</li>
  <li>Improve embedded document structure — exclude non-semantic metadata (product IDs) to improve search relevance</li>
  <li>Better structured output with controllable state attributes for agent responses</li>
  <li>Explore hybrid retrieval strategies where both KG and vector tools always execute in parallel rather than sequential routing</li>
</ul>

<div class="key-insight">
  <blockquote>"Combining structured knowledge graph queries with semantic vector search creates a retrieval system greater than the sum of its parts — the graph provides precision for known relationships, while vectors cover the unstructured gaps that formal schemas miss."</blockquote>
</div>

<h3 class="section-title">Internship Details</h3>

| | |
|---|---|
| **Interns** | Aditya Khadkikar (Uppsala University), Oscar Stackenland (Lund University) |
| **Supervisors** | Saranya Govindaraj, Sarbashis Das (Ericsson) |
| **Mentors** | Adria Cruz, Alexander Häll Lanerfeldt |
| **Project** | Product Information Assistant (PIA) |
| **Period** | Summer 2024 |
