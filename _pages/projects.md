---
layout: page
title: Projects
permalink: /projects/
description: A timeline of work spanning Generative AI, RAG, Agentic AI, and traditional machine learning — most recent first.
nav: true
nav_order: 3
---

<div class="project-timeline">

  <div class="project-entry">
    <div class="project-meta">
      <span class="project-period">Feb 2022 — present</span>
      <span class="project-org">Ericsson · Stockholm</span>
    </div>
    <h3 class="project-title">SCL — System Comprehension Lab</h3>
    <p class="project-tagline">Production RAG and Agentic AI on AWS Bedrock for system comprehension at Ericsson.</p>
    <p class="project-stack"><strong>Stack:</strong> AWS Bedrock · AgentCore Runtime · Strands Agents · Step Functions · Lambda · Python · RAGAS</p>
    <ul class="project-bullets">
      <li><strong>RAG data preprocessing pipeline</strong> built on AWS Step Functions and Lambda. Authored Python packages for downloading and processing files from internal docstores.</li>
      <li><strong>AWS Bedrock knowledge bases and Agents</strong> for RAG applications — wiring up retrieval, grounding, and tool-calling.</li>
      <li><strong>AWS Bedrock Data Automation</strong> for automated multimodal data processing across PDFs, images, and structured artifacts.</li>
      <li><strong>AWS Bedrock AgentCore Runtime</strong> to automate the deployment of Strands Agents, with observability for token usage and traceability.</li>
      <li><strong>LightRAG</strong> — knowledge-graph-based retrieval that enhances regular RAG performance on dense, technical documents.</li>
      <li><strong>Agentic RAG evaluation</strong> with RAGAS on benchmark and live data — quantifying faithfulness, answer relevance, and context precision.</li>
      <li><strong>Agentic AI packaging</strong> — building reusable agentic assets (subagents, skills, MCPs, hooks) on the Claude Code Harness and AgentCore Harness.</li>
    </ul>
  </div>

  <div class="project-entry">
    <div class="project-meta">
      <span class="project-period">Feb 2022 — present</span>
      <span class="project-org">Ericsson · Stockholm</span>
    </div>
    <h3 class="project-title">PIA — Product Information Assistant</h3>
    <p class="project-tagline">Vector embedding automation and RAG infrastructure for product information at Ericsson.</p>
    <p class="project-stack"><strong>Stack:</strong> Python · Airflow · FAISS · Chroma · OpenSearch · Hugging Face GTE Large · OpenAI text-ada · Kubernetes</p>
    <ul class="project-bullets">
      <li>Authored a <strong>Python package that automates vector embedding</strong> for many document sources, supporting both open-source (Hugging Face GTE Large) and proprietary (OpenAI text-ada) embedding models.</li>
      <li>Built an <strong>Airflow pipeline</strong> orchestrating data preprocessing and embedding workflows end-to-end.</li>
      <li>Integrated multiple <strong>vector databases</strong> (FAISS, Chroma, OpenSearch) to compare retrieval characteristics and store embedding output.</li>
      <li>Authored a <strong>Python package</strong> automating registration of open-source software in Ericsson's internal portal.</li>
      <li>Managed <strong>quarterly product releases</strong> of microservices in a production Kubernetes environment.</li>
    </ul>
  </div>

  <div class="project-entry">
    <div class="project-meta">
      <span class="project-period">Jan 2020 — Feb 2022</span>
      <span class="project-org">Ericsson · Stockholm</span>
    </div>
    <h3 class="project-title">GAIA — TAO Program</h3>
    <p class="project-tagline">ML for transport networks — anomaly detection, regression, and cell classification.</p>
    <p class="project-stack"><strong>Stack:</strong> Python · PyTorch · scikit-learn · XGBoost · EMCA traces</p>
    <ul class="project-bullets">
      <li><strong>Anomaly detection</strong> on transport network log files using ML and DL models — surfacing rare and high-impact deviations that traditional rule-based systems missed.</li>
      <li><strong>Statistical comparison of pre- and post-upgrade test runs</strong> using EMCA traces. Built regression models to predict baseband scheduler metrics and fine-tuned them for higher accuracy.</li>
      <li><strong>Cell and Site Categorizer</strong> — classification models (Random Forest, XGBoost) categorizing sites by traffic volume, user experience, and cell load.</li>
      <li>Outcome: granted US patent <a href="https://patents.google.com/patent/US12592953B2/en"><strong>US12592953B2</strong></a> on detecting and localizing faults using ML in network nodes.</li>
    </ul>
  </div>

  <div class="project-entry">
    <div class="project-meta">
      <span class="project-period">Aug 2018 — Sep 2019</span>
      <span class="project-org">Honeywell · Pune</span>
    </div>
    <h3 class="project-title">SIOP Sales Demand Forecasting</h3>
    <p class="project-tagline">Time-series forecasting for spare-parts SIOP.</p>
    <p class="project-stack"><strong>Stack:</strong> R · time-series models · SQL</p>
    <ul class="project-bullets">
      <li>Built <strong>time-series models in R</strong> for SIOP (Sales, Inventory and Operations Planning) spare-parts forecasting.</li>
      <li>Trained and tested multiple models on different SIOP product family SKUs and selected the <strong>champion model with the lowest error</strong> for each family.</li>
      <li>Handled <strong>one-off spiking SKUs</strong> to derive a generalized forecast that didn't overfit to anomalies.</li>
      <li>Archived forecast results in <strong>SQL</strong> and tracked accuracy over time for continuous improvement.</li>
    </ul>
  </div>

  <div class="project-entry">
    <div class="project-meta">
      <span class="project-period">Aug 2015 — Aug 2018</span>
      <span class="project-org">Infosys · Pune</span>
    </div>
    <h3 class="project-title">Predictive Analytics PoCs</h3>
    <p class="project-tagline">Multi-client PoCs across regression, classification, and clustering.</p>
    <p class="project-stack"><strong>Stack:</strong> R Studio · statistical & ML/DL algorithms</p>
    <ul class="project-bullets">
      <li>Predictive analytics in <strong>R Studio</strong> using statistical, machine learning, and deep learning algorithms.</li>
      <li>Worked across <strong>regression, classification, and clustering</strong> — training, testing, and tuning models.</li>
      <li><strong>Presented solutions to stakeholders</strong> for feedback and iterated based on their input.</li>
    </ul>
  </div>

</div>
