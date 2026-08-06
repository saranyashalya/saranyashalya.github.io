---
layout: post
title: "Enterprise Identity & Access Flow: Authentication & Authorization with Microsoft Entra ID"
date: 2026-08-03
description: "A comprehensive guide to enterprise identity flows — how Microsoft Entra ID integrates with AWS and applications using SAML, OIDC, and OAuth 2.0 for single sign-on, delegated access, and service-to-service authorization."
tags: [identity, authentication, authorization, entra-id, oauth, aws]
categories: [cloud]
featured: false
---

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --id-bg: #0d1117; --id-card: #161b22; --id-card2: #1c2333; --id-border: #30363d;
    --id-text: #e6edf3; --id-text2: #8b949e; --id-muted: #6e7681;
    --id-blue: #58a6ff; --id-purple: #a371f7; --id-green: #3fb950;
    --id-orange: #f0883e; --id-cyan: #79c0ff; --id-amber: #ffa657; --id-red: #f85149;
  }
  .id-wrap { font-family: 'Space Grotesk', 'Inter', sans-serif; color: var(--id-text); line-height: 1.7; max-width: 1100px; margin: 0 auto; }
  .id-wrap p { color: var(--id-text); margin: 0 0 1rem; line-height: 1.75; }
  .id-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; }
  .id-sidebar { position: sticky; top: 5rem; align-self: start; height: calc(100vh - 6rem); overflow-y: auto; }
  .id-sidebar-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--id-muted); margin-bottom: 0.75rem; }
  .id-sidebar a { display: block; padding: 0.35rem 0.75rem; border-left: 2px solid transparent; color: var(--id-text2); text-decoration: none; font-size: 0.78rem; font-weight: 500; transition: all 0.2s; border-radius: 0 4px 4px 0; }
  .id-sidebar a:hover { color: var(--id-blue); border-left-color: var(--id-blue); background: rgba(88,166,255,0.05); text-decoration: none; }
  .id-sidebar a.active { color: var(--id-blue); border-left-color: var(--id-blue); font-weight: 600; background: rgba(88,166,255,0.08); }
  @media (max-width: 1000px) { .id-layout { grid-template-columns: 1fr; } .id-sidebar { display: none; } }

  .id-hero { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--id-border); }
  .id-hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .id-tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .id-tag-blue { background: rgba(88,166,255,0.15); color: var(--id-blue); border: 1px solid rgba(88,166,255,0.3); }
  .id-tag-purple { background: rgba(163,113,247,0.15); color: var(--id-purple); border: 1px solid rgba(163,113,247,0.3); }
  .id-tag-green { background: rgba(63,185,80,0.15); color: var(--id-green); border: 1px solid rgba(63,185,80,0.3); }
  .id-tag-orange { background: rgba(240,136,62,0.15); color: var(--id-orange); border: 1px solid rgba(240,136,62,0.3); }
  .id-hero h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.2; color: var(--id-text); margin: 0 0 1rem; letter-spacing: -0.02em; }
  .id-hero-subtitle { font-size: 1.1rem; color: var(--id-text); line-height: 1.6; margin: 0 0 1.5rem; max-width: 780px; opacity: 0.9; }

  .id-section { margin-bottom: 3.5rem; scroll-margin-top: 5rem; }
  .id-section h2 { font-size: 1.5rem; font-weight: 700; color: var(--id-text); margin: 0 0 1.25rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.6rem; }
  .id-section h2::before { content: ""; display: inline-block; width: 3px; height: 1.3em; background: linear-gradient(180deg, var(--id-blue), var(--id-purple)); border-radius: 2px; }
  .id-section h3 { font-size: 1.1rem; font-weight: 600; color: var(--id-text); margin: 2rem 0 0.75rem; }

  .id-callout { border-left: 3px solid; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; }
  .id-callout-info { border-color: var(--id-blue); background: rgba(88,166,255,0.07); }
  .id-callout-success { border-color: var(--id-green); background: rgba(63,185,80,0.07); }
  .id-callout-warning { border-color: var(--id-amber); background: rgba(255,166,87,0.07); }
  .id-callout-spec { border-color: var(--id-purple); background: rgba(163,113,247,0.07); }
  .id-callout-head { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
  .id-callout-info .id-callout-head { color: var(--id-blue); }
  .id-callout-success .id-callout-head { color: var(--id-green); }
  .id-callout-warning .id-callout-head { color: var(--id-amber); }
  .id-callout-spec .id-callout-head { color: var(--id-purple); }
  .id-callout p { margin: 0; font-size: 0.88rem; color: var(--id-text); opacity: 0.9; }

  .id-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
  .id-inf { background: var(--id-card); border: 1px solid var(--id-border); border-radius: 0.875rem; padding: 1.25rem 1.5rem; border-top: 3px solid; }
  .id-inf-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .id-inf-title { font-size: 0.95rem; font-weight: 600; color: var(--id-text); margin-bottom: 0.5rem; }
  .id-inf-body { font-size: 0.83rem; color: var(--id-text); line-height: 1.6; opacity: 0.85; }

  .id-timeline { list-style: none; padding: 0; margin: 1.5rem 0; position: relative; border-left: 2px solid var(--id-border); margin-left: 0.75rem; }
  .id-timeline li { position: relative; padding: 0.1rem 0 1.5rem 2rem; }
  .id-timeline li::before { content: ""; position: absolute; left: -0.55rem; top: 0.45rem; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: var(--id-blue); border: 2px solid var(--id-bg); box-shadow: 0 0 0 2px var(--id-blue); }
  .id-tl-step { font-weight: 600; color: var(--id-text); font-size: 0.9rem; margin-bottom: 0.25rem; }
  .id-tl-desc { font-size: 0.82rem; color: var(--id-text); opacity: 0.85; }

  .id-table-wrap { overflow-x: auto; border-radius: 0.875rem; border: 1px solid var(--id-border); margin: 1.5rem 0; }
  .id-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  .id-table thead tr { background: var(--id-card2); }
  .id-table th { padding: 0.75rem 1rem; text-align: left; font-weight: 600; font-size: 0.72rem; color: var(--id-text2); letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--id-border); }
  .id-table td { padding: 0.65rem 1rem; border-bottom: 1px solid var(--id-border); color: var(--id-text); opacity: 0.9; vertical-align: top; }
  .id-table tbody tr:last-child td { border-bottom: none; }
  .id-table tbody tr:hover td { background: rgba(255,255,255,0.02); }

  .id-diagram { margin: 2rem 0; border-radius: 0.875rem; overflow: hidden; border: 1px solid var(--id-border); cursor: pointer; position: relative; transition: box-shadow 0.2s; }
  .id-diagram:hover { box-shadow: 0 0 20px rgba(88,166,255,0.15); }
  .id-diagram img { width: 100%; height: auto; display: block; }
  .id-diagram .expand-hint { position: absolute; bottom: 12px; right: 12px; background: rgba(13,17,23,0.85); border: 1px solid var(--id-border); border-radius: 6px; padding: 4px 10px; font-size: 0.7rem; color: var(--id-text2); pointer-events: none; }
  .id-overlay { display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); cursor: zoom-out; align-items: center; justify-content: center; padding: 2rem; }
  .id-overlay.active { display: flex; }
  .id-overlay img { max-width: 95vw; max-height: 95vh; border-radius: 8px; box-shadow: 0 0 40px rgba(88,166,255,0.2); }

  @media (max-width: 768px) { .id-card-grid { grid-template-columns: 1fr; } }
</style>

<div class="id-wrap">

<!-- Hero -->
<div class="id-hero">
  <div class="id-hero-tags">
    <span class="id-tag id-tag-blue">Identity</span>
    <span class="id-tag id-tag-purple">Authentication</span>
    <span class="id-tag id-tag-green">Authorization</span>
    <span class="id-tag id-tag-orange">Entra ID + AWS</span>
  </div>
  <h1>Enterprise Identity & Access Flow: Authentication & Authorization</h1>
  <p class="id-hero-subtitle">How Microsoft Entra ID acts as a centralized identity provider for enterprise environments — issuing SAML assertions, OIDC tokens, and OAuth 2.0 access tokens to enable single sign-on, application authentication, delegated API access, and secure service-to-service communication.</p>
</div>

<!-- Layout -->
<div class="id-layout">
<aside class="id-sidebar">
  <div class="id-sidebar-label">On this page</div>
  <a href="#overview">Overview</a>
  <a href="#protocols">Protocols Explained</a>
  <a href="#flow1">Flow 1: AWS Console SSO</a>
  <a href="#flow2">Flow 2: Application Login</a>
  <a href="#flow3">Flow 3: Delegated API Access</a>
  <a href="#flow4">Flow 4: Service-to-Service</a>
  <a href="#comparison">Flow Comparison</a>
  <a href="#concepts">Key Concepts</a>
  <a href="#jwt">JWT Deep Dive</a>
  <a href="#cloudflare">Cloudflare Access Tokens</a>
  <a href="#big-picture">The Big Picture</a>
  <a href="#benefits">Benefits</a>
  <a href="#diagram">Architecture Diagram</a>
</aside>
<div class="id-content">

<!-- Section: Overview -->
<div class="id-section" id="overview">
  <h2>Overview: The Identity Triangle</h2>
  <p>Enterprise identity flows involve three parties:</p>

  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-blue);">
      <div class="id-inf-label" style="color: var(--id-blue);">Party 1</div>
      <div class="id-inf-title">Users (Employees)</div>
      <div class="id-inf-body">Human users who need access to AWS accounts, web applications, or APIs. They authenticate with passwords, MFA, and conditional access policies.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-purple);">
      <div class="id-inf-label" style="color: var(--id-purple);">Party 2</div>
      <div class="id-inf-title">Microsoft Entra ID (Identity Provider)</div>
      <div class="id-inf-body">The centralized identity provider that authenticates users, manages groups/directories, enforces policies (MFA, conditional access), and issues tokens/assertions to relying parties.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-green);">
      <div class="id-inf-label" style="color: var(--id-green);">Party 3</div>
      <div class="id-inf-title">Relying Parties (Service Providers)</div>
      <div class="id-inf-body">AWS IAM Identity Center, web/mobile applications, and APIs (Microsoft Graph, Salesforce, internal services) that trust Entra ID to verify identity and grant access.</div>
    </div>
  </div>

  <div style="background: var(--id-card); border: 1px solid var(--id-border); border-radius: 0.875rem; padding: 1.5rem; margin: 1.5rem 0;">
    <div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--id-muted); margin-bottom: 1rem; text-align: center;">End-to-End Flow</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
      <div style="background: var(--id-bg); border: 1px solid var(--id-border); border-radius: 8px; padding: 10px 16px; text-align: center;"><div style="font-size: 1.2em; margin-bottom: 4px;">👤</div><div style="font-size: 0.78rem; font-weight: 600; color: var(--id-blue);">User</div><div style="font-size: 0.65rem; color: var(--id-text2);">Requests access</div></div>
      <span style="color: var(--id-muted); font-size: 1.1rem;">→</span>
      <div style="background: var(--id-bg); border: 1px solid var(--id-border); border-radius: 8px; padding: 10px 16px; text-align: center;"><div style="font-size: 1.2em; margin-bottom: 4px;">🔐</div><div style="font-size: 0.78rem; font-weight: 600; color: var(--id-purple);">Entra ID</div><div style="font-size: 0.65rem; color: var(--id-text2);">Authenticates (MFA)</div></div>
      <span style="color: var(--id-muted); font-size: 1.1rem;">→</span>
      <div style="background: var(--id-bg); border: 1px solid var(--id-border); border-radius: 8px; padding: 10px 16px; text-align: center;"><div style="font-size: 1.2em; margin-bottom: 4px;">🎫</div><div style="font-size: 0.78rem; font-weight: 600; color: var(--id-amber);">Token Issued</div><div style="font-size: 0.65rem; color: var(--id-text2);">SAML / OIDC / OAuth</div></div>
      <span style="color: var(--id-muted); font-size: 1.1rem;">→</span>
      <div style="background: var(--id-bg); border: 1px solid var(--id-border); border-radius: 8px; padding: 10px 16px; text-align: center;"><div style="font-size: 1.2em; margin-bottom: 4px;">✅</div><div style="font-size: 0.78rem; font-weight: 600; color: var(--id-green);">Relying Party</div><div style="font-size: 0.65rem; color: var(--id-text2);">Validates & grants access</div></div>
    </div>
  </div>
</div>

<!-- Section: Protocols -->
<div class="id-section" id="protocols">
  <h2>Protocols Explained</h2>

  <div class="id-table-wrap">
    <table class="id-table">
      <thead><tr><th>Protocol</th><th>Full Name</th><th>Purpose</th><th>Token Type</th></tr></thead>
      <tbody>
        <tr><td><strong style="color: var(--id-orange);">SAML</strong></td><td>Security Assertion Markup Language</td><td>XML-based assertions for SSO — proving who the user is to service providers</td><td>SAML Assertion (XML)</td></tr>
        <tr><td><strong style="color: var(--id-blue);">OIDC</strong></td><td>OpenID Connect</td><td>Authentication layer on top of OAuth 2.0 — uses ID Tokens (JWT) to identify users</td><td>ID Token (JWT)</td></tr>
        <tr><td><strong style="color: var(--id-green);">OAuth 2.0</strong></td><td>Open Authorization 2.0</td><td>Delegated and client credentials flows — used for authorization to protect APIs</td><td>Access Token (JWT)</td></tr>
        <tr><td><strong style="color: var(--id-purple);">SCIM</strong></td><td>System for Cross-domain Identity Management</td><td>User & group provisioning — automated lifecycle management across systems</td><td>N/A (provisioning protocol)</td></tr>
      </tbody>
    </table>
  </div>

  <div class="id-callout id-callout-spec">
    <div class="id-callout-head">Authentication vs Authorization</div>
    <p><strong>Authentication</strong> proves who the user is (identity verification). <strong>Authorization</strong> determines what the user or application is allowed to do (permission granting). SAML and OIDC handle authentication. OAuth 2.0 handles authorization. In practice, these often work together in a single flow.</p>
  </div>
</div>

<!-- Section: Flow 1 -->
<div class="id-section" id="flow1">
  <h2>Flow 1: AWS Console SSO (SAML)</h2>
  <p><strong>Purpose:</strong> Authenticate a user and provide access to AWS accounts via single sign-on.</p>

  <ul class="id-timeline">
    <li><div class="id-tl-step">1. User opens AWS Console</div><div class="id-tl-desc">SP-Initiated flow — user navigates to the AWS sign-in page.</div></li>
    <li><div class="id-tl-step">2. Redirect to Entra ID</div><div class="id-tl-desc">AWS redirects the user to Entra ID for authentication.</div></li>
    <li><div class="id-tl-step">3. Entra ID authenticates user</div><div class="id-tl-desc">User provides credentials. Entra ID enforces MFA and conditional access policies.</div></li>
    <li><div class="id-tl-step">4. SAML Assertion issued</div><div class="id-tl-desc">Entra ID sends back a SAML Assertion containing: user identity (e.g., alice@company.com), groups (e.g., CloudAdmins), attributes, and role mapping.</div></li>
    <li><div class="id-tl-step">5. AWS IAM Identity Center validates</div><div class="id-tl-desc">IAM Identity Center validates the assertion and assigns the user to the appropriate IAM role.</div></li>
    <li><div class="id-tl-step">6. User accesses AWS accounts</div><div class="id-tl-desc">User assumes IAM roles in target accounts (Dev / Prod / Security) based on group membership.</div></li>
  </ul>

  <div class="id-callout id-callout-success">
    <div class="id-callout-head">SAML Assertion Contains</div>
    <p>User Identity (e.g., alice@company.com) · Groups (e.g., CloudAdmins) · Attributes for role mapping · Signature from Entra ID for validation</p>
  </div>
</div>

<!-- Section: Flow 2 -->
<div class="id-section" id="flow2">
  <h2>Flow 2: Application Login (OIDC)</h2>
  <p><strong>Purpose:</strong> Identify the user (authentication) for a web or mobile application.</p>

  <ul class="id-timeline">
    <li><div class="id-tl-step">1. User opens application</div><div class="id-tl-desc">User navigates to a web or mobile application hosted on AWS or elsewhere.</div></li>
    <li><div class="id-tl-step">2. Redirect to Entra ID (OIDC)</div><div class="id-tl-desc">Application redirects to Entra ID's authorization endpoint with an OIDC request.</div></li>
    <li><div class="id-tl-step">3. Entra ID authenticates user</div><div class="id-tl-desc">User authenticates with MFA and policies applied.</div></li>
    <li><div class="id-tl-step">4. ID Token returned (JWT)</div><div class="id-tl-desc">Entra ID returns an ID Token to the application containing: user identity (sub), name, email, groups/roles, and other claims.</div></li>
    <li><div class="id-tl-step">5. Application validates token</div><div class="id-tl-desc">Application verifies the JWT signature, issuer, audience, and expiration — then establishes a session for the user.</div></li>
  </ul>

  <div class="id-callout id-callout-info">
    <div class="id-callout-head">ID Token Contains</div>
    <p>User Identity (sub) · Name, Email · Groups / Roles · Other Claims · Signature · Expiration</p>
  </div>
</div>

<!-- Section: Flow 3 -->
<div class="id-section" id="flow3">
  <h2>Flow 3: API Access (OAuth 2.0 — Delegated)</h2>
  <p><strong>Purpose:</strong> Authorize an application to access APIs on behalf of the user.</p>

  <ul class="id-timeline">
    <li><div class="id-tl-step">1. User authenticated in application</div><div class="id-tl-desc">User is already logged into the application (via OIDC flow above).</div></li>
    <li><div class="id-tl-step">2. Application requests access token</div><div class="id-tl-desc">Application requests an access token from Entra ID on behalf of the user, specifying the target API and required scopes.</div></li>
    <li><div class="id-tl-step">3. Entra ID returns Access Token (JWT)</div><div class="id-tl-desc">Entra ID validates the request and returns an access token with scoped permissions (e.g., Mail.Read).</div></li>
    <li><div class="id-tl-step">4. Application calls API with token</div><div class="id-tl-desc">Application includes the access token in API requests (Authorization: Bearer header).</div></li>
    <li><div class="id-tl-step">5. API validates token and checks permissions</div><div class="id-tl-desc">The resource server (e.g., Microsoft Graph) validates the token signature, checks scopes and roles, and returns the requested data.</div></li>
  </ul>

  <div class="id-callout id-callout-success">
    <div class="id-callout-head">Access Token Contains</div>
    <p>Scopes / Permissions (e.g., Mail.Read) · Audience (API) · User or App ID · Expiration · Issuer signature</p>
  </div>
</div>

<!-- Section: Flow 4 -->
<div class="id-section" id="flow4">
  <h2>Flow 4: Service-to-Service (OAuth 2.0 — Client Credentials)</h2>
  <p><strong>Purpose:</strong> Authorize a service or application to access APIs without a user — machine-to-machine communication.</p>

  <ul class="id-timeline">
    <li><div class="id-tl-step">1. AWS Service requests token</div><div class="id-tl-desc">A Lambda function, ECS task, or background service requests a token using Client Credentials (client ID + secret or certificate). No user is involved.</div></li>
    <li><div class="id-tl-step">2. Entra ID returns Access Token</div><div class="id-tl-desc">Entra ID authenticates the application (not a user) and returns an access token with app-level permissions.</div></li>
    <li><div class="id-tl-step">3. Service calls API with token</div><div class="id-tl-desc">The service uses the access token to call internal or external APIs.</div></li>
    <li><div class="id-tl-step">4. API validates token and checks app permissions</div><div class="id-tl-desc">The resource server validates the token and checks application roles/permissions (not user scopes).</div></li>
  </ul>

  <div class="id-callout id-callout-warning">
    <div class="id-callout-head">Client Credentials Access Token Contains</div>
    <p>App (client) Identity (e.g., employee-sync-service) · Roles / Permissions (e.g., HR.Read) · Audience (API) · Expiration · No user identity — this is purely application authorization</p>
  </div>
</div>

<!-- Section: Comparison -->
<div class="id-section" id="comparison">
  <h2>Flow Comparison</h2>

  <div class="id-table-wrap">
    <table class="id-table">
      <thead><tr><th>Flow</th><th>Protocol</th><th>Who Initiates</th><th>Token Issued</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td><strong>AWS Console SSO</strong></td><td>SAML 2.0</td><td>User (SP-initiated)</td><td>SAML Assertion</td><td>Authenticate user, assign IAM roles</td></tr>
        <tr><td><strong>Application Login</strong></td><td>OIDC</td><td>User (via app redirect)</td><td>ID Token (JWT)</td><td>Identify the user for the application</td></tr>
        <tr><td><strong>Delegated API Access</strong></td><td>OAuth 2.0</td><td>Application (on behalf of user)</td><td>Access Token (JWT)</td><td>Authorize API access with user's permissions</td></tr>
        <tr><td><strong>Service-to-Service</strong></td><td>OAuth 2.0 (Client Credentials)</td><td>Service (no user)</td><td>Access Token (JWT)</td><td>Authorize machine-to-machine API access</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Section: Key Concepts -->
<div class="id-section" id="concepts">
  <h2>Key Concepts</h2>

  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-blue);">
      <div class="id-inf-label" style="color: var(--id-blue);">Concept</div>
      <div class="id-inf-title">Authentication</div>
      <div class="id-inf-body">Proves who the user is. Handled by SAML assertions and OIDC ID tokens. The identity provider (Entra ID) verifies credentials and issues proof of identity.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-green);">
      <div class="id-inf-label" style="color: var(--id-green);">Concept</div>
      <div class="id-inf-title">Authorization</div>
      <div class="id-inf-body">Determines what the user or application is allowed to do. Handled by OAuth 2.0 access tokens with scopes and roles. The resource server enforces permissions.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-purple);">
      <div class="id-inf-label" style="color: var(--id-purple);">Concept</div>
      <div class="id-inf-title">Token</div>
      <div class="id-inf-body">A digital credential (JWT) issued by Entra ID. Contains claims about the user or application — identity, permissions, audience, expiration. Cryptographically signed for tamper detection.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-orange);">
      <div class="id-inf-label" style="color: var(--id-orange);">Concept</div>
      <div class="id-inf-title">Assertion</div>
      <div class="id-inf-body">A SAML statement issued by Entra ID — an XML document containing identity claims, group memberships, and attributes. Used specifically for SSO with legacy and enterprise service providers.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-cyan);">
      <div class="id-inf-label" style="color: var(--id-cyan);">Concept</div>
      <div class="id-inf-title">Role / Scope</div>
      <div class="id-inf-body">A permission to perform an action on a resource. Scopes are delegated (user-consented, e.g., Mail.Read). Roles are application-level (admin-assigned, e.g., HR.ReadWrite.All).</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-amber);">
      <div class="id-inf-label" style="color: var(--id-amber);">Concept</div>
      <div class="id-inf-title">Conditional Access</div>
      <div class="id-inf-body">Policies in Entra ID that enforce conditions before granting access — require MFA, block risky sign-ins, restrict by location/device, or require compliant devices.</div>
    </div>
  </div>
</div>

<!-- Section: JWT -->
<div class="id-section" id="jwt">
  <h2>JWT: The Token Format That Powers Everything</h2>
  <p>JSON Web Token (JWT) is the standard format for OIDC ID Tokens and OAuth 2.0 Access Tokens. Understanding JWT is essential because it's the actual credential that moves between systems.</p>

  <h3>JWT Structure: Three Parts</h3>
  <div style="background: var(--id-card); border: 1px solid var(--id-border); border-radius: 0.875rem; padding: 1.25rem; margin: 1rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; overflow-x: auto;">
    <span style="color: var(--id-red);">eyJhbGciOiJSUzI1NiJ9</span>.<span style="color: var(--id-purple);">eyJzdWIiOiIxMjM0NTY3ODkwIn0</span>.<span style="color: var(--id-blue);">SflKxwRJSMeKKF2QT4fwpM...</span>
  </div>

  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-red);">
      <div class="id-inf-label" style="color: var(--id-red);">Part 1</div>
      <div class="id-inf-title">Header</div>
      <div class="id-inf-body">Specifies the token type (JWT) and signing algorithm (RS256, ES256). Tells the relying party how to verify the signature.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-purple);">
      <div class="id-inf-label" style="color: var(--id-purple);">Part 2</div>
      <div class="id-inf-title">Payload (Claims)</div>
      <div class="id-inf-body">The actual data — who the user is (sub), what they can do (scope/roles), who issued it (iss), who it's for (aud), and when it expires (exp). This is the identity/authorization information.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-blue);">
      <div class="id-inf-label" style="color: var(--id-blue);">Part 3</div>
      <div class="id-inf-title">Signature</div>
      <div class="id-inf-body">Cryptographic signature created with the issuer's private key. The relying party verifies it using the issuer's public key — proving the token hasn't been tampered with and was issued by a trusted authority.</div>
    </div>
  </div>

  <h3>Where JWT Plays a Role</h3>
  <div class="id-table-wrap">
    <table class="id-table">
      <thead><tr><th>Flow</th><th>JWT Token Type</th><th>What It Contains</th><th>Who Validates It</th></tr></thead>
      <tbody>
        <tr><td><strong>Application Login (OIDC)</strong></td><td>ID Token</td><td>User identity, name, email, groups</td><td>The application</td></tr>
        <tr><td><strong>Delegated API Access</strong></td><td>Access Token</td><td>Scopes (e.g., Mail.Read), audience, user ID</td><td>The API / resource server</td></tr>
        <tr><td><strong>Service-to-Service</strong></td><td>Access Token</td><td>App identity, roles, audience (no user)</td><td>The API / resource server</td></tr>
        <tr><td><strong>AWS Console SSO</strong></td><td>Not JWT — uses SAML Assertion (XML)</td><td>User identity, groups, attributes</td><td>AWS IAM Identity Center</td></tr>
      </tbody>
    </table>
  </div>

  <div class="id-callout id-callout-info">
    <div class="id-callout-head">Why JWT Matters</div>
    <p>JWTs are <strong>self-contained</strong> — the relying party can validate them without calling back to the identity provider. This makes them fast (no network round-trip for validation), scalable (no session state on the server), and portable (any service with the public key can verify them). The tradeoff: they can't be revoked until they expire.</p>
  </div>
</div>

<!-- Section: Cloudflare -->
<div class="id-section" id="cloudflare">
  <h2>Cloudflare Access Tokens: Zero Trust at the Edge</h2>
  <p>Cloudflare Access adds another layer to the identity flow — acting as a <strong>reverse proxy</strong> that enforces authentication at the network edge before traffic ever reaches your application.</p>

  <h3>How It Works</h3>
  <ul class="id-timeline">
    <li><div class="id-tl-step">1. User requests application URL</div><div class="id-tl-desc">Request hits Cloudflare's edge network first — before reaching the origin server.</div></li>
    <li><div class="id-tl-step">2. Cloudflare redirects to identity provider</div><div class="id-tl-desc">If no valid session exists, Cloudflare redirects the user to the configured IdP (Entra ID, Okta, Google, etc.) for authentication.</div></li>
    <li><div class="id-tl-step">3. IdP authenticates and returns token</div><div class="id-tl-desc">Entra ID (or other IdP) authenticates the user and returns a token to Cloudflare.</div></li>
    <li><div class="id-tl-step">4. Cloudflare issues CF Access JWT</div><div class="id-tl-desc">Cloudflare validates the IdP token and issues its own signed JWT (the "CF Authorization" token) as a cookie. This token contains the user's identity and policy decision.</div></li>
    <li><div class="id-tl-step">5. Request forwarded to application</div><div class="id-tl-desc">Cloudflare forwards the request to the origin with the CF Access JWT in a header (<code>Cf-Access-Jwt-Assertion</code>). The application can validate this JWT to identify the user without implementing its own authentication.</div></li>
  </ul>

  <div class="id-callout id-callout-spec">
    <div class="id-callout-head">Cloudflare Access JWT Contains</div>
    <p>User email · Identity provider used · Audience (the Access application ID) · Issued-at and expiration times · Custom claims from access policies · Signed by Cloudflare's team-specific key (verifiable via <code>/cdn-cgi/access/certs</code> endpoint)</p>
  </div>

  <h3>Where Cloudflare Fits in the Stack</h3>
  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-cyan);">
      <div class="id-inf-label" style="color: var(--id-cyan);">Benefit</div>
      <div class="id-inf-title">Zero Trust: Authenticate Before Reaching Origin</div>
      <div class="id-inf-body">Applications don't need to be publicly exposed. Cloudflare blocks unauthenticated requests at the edge — the application only receives pre-authenticated traffic with a verified JWT.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-amber);">
      <div class="id-inf-label" style="color: var(--id-amber);">Benefit</div>
      <div class="id-inf-title">IdP-Agnostic Authentication Layer</div>
      <div class="id-inf-body">Cloudflare Access works with any OIDC-compliant IdP (Entra ID, Okta, Google, GitHub, etc.). Applications validate one token format (CF JWT) regardless of which IdP authenticated the user.</div>
    </div>
  </div>
</div>

<!-- Section: Big Picture -->
<div class="id-section" id="big-picture">
  <h2>The Big Picture: Everything Maps to a Question</h2>
  <p>The entire enterprise identity stack answers five fundamental questions:</p>

  <div class="id-table-wrap">
    <table class="id-table">
      <thead><tr><th>Question</th><th>Answer</th><th>Mechanism</th></tr></thead>
      <tbody>
        <tr><td><strong style="color: var(--id-blue);">Who are you?</strong></td><td>Authentication</td><td>Entra ID + SAML / OIDC</td></tr>
        <tr><td><strong style="color: var(--id-green);">What are you allowed to do?</strong></td><td>Authorization</td><td>OAuth 2.0 Access Tokens (scopes & roles)</td></tr>
        <tr><td><strong style="color: var(--id-purple);">Should an account exist?</strong></td><td>Provisioning</td><td>SCIM (automated user/group lifecycle)</td></tr>
        <tr><td><strong style="color: var(--id-orange);">How do you access AWS?</strong></td><td>AWS Access</td><td>SAML Federation → IAM Identity Center → IAM Roles</td></tr>
        <tr><td><strong style="color: var(--id-cyan);">Is the request trustworthy?</strong></td><td>Zero Trust (edge)</td><td>Cloudflare Access → JWT at the edge</td></tr>
      </tbody>
    </table>
  </div>

  <h3>Protocol-to-Purpose Mapping</h3>
  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-orange);">
      <div class="id-inf-label" style="color: var(--id-orange);">SAML</div>
      <div class="id-inf-title">AWS Access = SAML Federation</div>
      <div class="id-inf-body">SAML Assertion → IAM Identity Center → IAM Roles. The user authenticates once and gets federated access to multiple AWS accounts based on group membership.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-blue);">
      <div class="id-inf-label" style="color: var(--id-blue);">OIDC</div>
      <div class="id-inf-title">Application Login = OIDC ID Tokens</div>
      <div class="id-inf-body">The application learns who the user is via a signed JWT. No password stored in the application — identity is delegated to the trusted provider.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-green);">
      <div class="id-inf-label" style="color: var(--id-green);">OAuth 2.0</div>
      <div class="id-inf-title">API Access = OAuth Access Tokens</div>
      <div class="id-inf-body">Applications call APIs with scoped access tokens — either on behalf of a user (delegated) or as a service (client credentials). Least-privilege by design.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-purple);">
      <div class="id-inf-label" style="color: var(--id-purple);">SCIM</div>
      <div class="id-inf-title">Provisioning = Automated Lifecycle</div>
      <div class="id-inf-body">When a user joins or leaves the organization in Entra ID, SCIM automatically creates, updates, or deactivates their accounts in downstream applications — no manual provisioning.</div>
    </div>
  </div>
</div>

<!-- Section: Benefits -->
<div class="id-section" id="benefits">
  <h2>Key Benefits</h2>

  <div class="id-card-grid">
    <div class="id-inf" style="border-top-color: var(--id-green);">
      <div class="id-inf-label" style="color: var(--id-green);">Benefit</div>
      <div class="id-inf-title">Single Sign-On (SSO)</div>
      <div class="id-inf-body">One authentication event grants access to all enterprise applications and AWS accounts. Users authenticate once with Entra ID and access everything without re-entering credentials.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-blue);">
      <div class="id-inf-label" style="color: var(--id-blue);">Benefit</div>
      <div class="id-inf-title">Centralized Security Policies</div>
      <div class="id-inf-body">MFA, conditional access, and risk-based authentication are enforced at the identity provider level — not per-application. One policy change applies everywhere.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-purple);">
      <div class="id-inf-label" style="color: var(--id-purple);">Benefit</div>
      <div class="id-inf-title">Fine-Grained Authorization</div>
      <div class="id-inf-body">OAuth scopes enable least-privilege access — applications request only the permissions they need. No over-provisioning of credentials.</div>
    </div>
    <div class="id-inf" style="border-top-color: var(--id-orange);">
      <div class="id-inf-label" style="color: var(--id-orange);">Benefit</div>
      <div class="id-inf-title">Secure Service-to-Service</div>
      <div class="id-inf-body">Machine-to-machine communication uses short-lived tokens instead of stored user credentials. No passwords in config files. Tokens expire automatically.</div>
    </div>
  </div>
</div>

<!-- Section: Diagram -->
<div class="id-section" id="diagram">
  <h2>Architecture Diagram</h2>
  <p>The complete enterprise identity and access flow — showing all four patterns (SAML SSO, OIDC login, delegated OAuth, and client credentials) with Microsoft Entra ID as the centralized identity provider:</p>

  <div class="id-diagram" onclick="document.getElementById('id-img-overlay').classList.add('active')">
    <img src="/assets/img/AuthZ_and_AuthN.png" alt="Enterprise Identity and Access Flow - Authentication and Authorization architecture diagram showing SAML, OIDC, and OAuth 2.0 flows with Microsoft Entra ID" loading="lazy"/>
    <span class="expand-hint">Click to expand</span>
  </div>

  <div class="id-overlay" id="id-img-overlay" onclick="this.classList.remove('active')">
    <img src="/assets/img/AuthZ_and_AuthN.png" alt="Enterprise Identity and Access Flow - full size"/>
  </div>
</div>

</div><!-- /.id-content -->
</div><!-- /.id-layout -->
</div><!-- /.id-wrap -->

<script>
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('.id-sidebar a');
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
