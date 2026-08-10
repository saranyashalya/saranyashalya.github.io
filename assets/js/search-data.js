// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-patents-amp-publications",
          title: "Patents &amp; Publications",
          description: "Patents and selected publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A timeline of work spanning Generative AI, RAG, Agentic AI, and traditional machine learning — most recent first.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-thesis-amp-internship-supervision",
          title: "Thesis &amp; Internship Supervision",
          description: "Master&#39;s thesis and internship projects I have supervised or co-supervised.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/supervision/";
          },
        },{id: "nav-resume",
          title: "Resume",
          description: "Experience, education, certifications, skills, and recognitions.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-knowledge-graph-augmented-rag-how-lightrag-bridges-flat-retrieval-and-structured-reasoning",
        
          title: "Knowledge-Graph-Augmented RAG: How LightRAG Bridges Flat Retrieval and Structured Reasoning",
        
        description: "How LightRAG augments standard vector RAG with an automatically constructed knowledge graph — enabling multi-hop reasoning, entity-centric lookups, and dual-level retrieval that pure chunk similarity cannot achieve.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/lightrag-knowledge-graph-augmented-retrieval/";
          
        },
      },{id: "post-enterprise-identity-amp-access-flow-authentication-amp-authorization-with-microsoft-entra-id",
        
          title: "Enterprise Identity &amp; Access Flow: Authentication &amp; Authorization with Microsoft Entra ID",
        
        description: "A comprehensive guide to enterprise identity flows — how Microsoft Entra ID integrates with AWS and applications using SAML, OIDC, and OAuth 2.0 for single sign-on, delegated access, and service-to-service authorization.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/enterprise-identity-access-flow/";
          
        },
      },{id: "post-from-words-to-systems-the-evolution-of-the-agentic-stack",
        
          title: "From Words to Systems: The Evolution of the Agentic Stack",
        
        description: "How the agentic stack evolved from prompt engineering to loop engineering — four layers of control that didn&#39;t replace each other but absorbed each other.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/agentic-stack-evolution/";
          
        },
      },{id: "post-beyond-39-it-looks-good-39-a-production-rag-evaluation-framework",
        
          title: "Beyond &#39;It Looks Good&#39;: A Production RAG Evaluation Framework",
        
        description: "A practical guide to building production-grade RAG evaluation — comparing RAGAS and Amazon Bedrock AgentCore Evaluations, with architecture patterns for offline, online, and CI/CD-integrated evaluation pipelines.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/rag-evaluation-framework/";
          
        },
      },{id: "post-knowledge-fabric-ai-powered-technical-intelligence",
        
          title: "Knowledge Fabric: AI-Powered Technical Intelligence",
        
        description: "Transform scattered technical documentation into an AI-queryable intelligence layer — connecting features, parameters, dependencies, and metrics into a unified graph.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/knowledge-fabric-ai-powered-technical-intelligence/";
          
        },
      },{id: "news-supervising-summer-interns-building-a-multi-agent-rag-system-with-knowledge-graphs-at-ericsson-stockholm-combining-sparql-based-graph-traversal-with-vector-search-using-langgraph-see-details",
          title: 'Supervising summer interns building a Multi-Agent RAG system with knowledge graphs at Ericsson...',
          description: "",
          section: "News",},{id: "news-earned-the-gcp-professional-machine-learning-engineer-certification-and-the-gcp-genai-l400-skills-badge",
          title: 'Earned the GCP Professional Machine Learning Engineer certification and the GCP GenAI L400...',
          description: "",
          section: "News",},{id: "news-earned-the-aws-certified-ai-practitioner-certification",
          title: 'Earned the AWS Certified AI Practitioner certification.',
          description: "",
          section: "News",},{id: "news-us-patent-us12592953b2-granted-methods-and-apparatuses-for-detecting-and-localizing-faults-using-machine-learning-models-with-co-inventors-tahar-zanouda-dominik-budyn-and-martin-rydar-ericsson",
          title: 'US Patent US12592953B2 granted — Methods and apparatuses for detecting and localizing faults...',
          description: "",
          section: "News",},{id: "news-co-supervising-a-master-s-thesis-at-linnaeus-university-on-evaluating-genai-coding-assistants-in-enterprise-software-development-space-ttf-see-supervision",
          title: 'Co-supervising a master’s thesis at Linnaeus University on evaluating GenAI coding assistants in...',
          description: "",
          section: "News",},{id: "news-launched-this-site-expect-notes-on-rag-aws-bedrock-agentcore-and-agentic-ai",
          title: 'Launched this site! Expect notes on RAG, AWS Bedrock, AgentCore, and Agentic AI....',
          description: "",
          section: "News",},{id: "news-published-new-blog-post-knowledge-fabric-ai-powered-technical-intelligence-how-we-transform-scattered-technical-documentation-into-an-ai-queryable-intelligence-layer",
          title: 'Published new blog post: Knowledge Fabric: AI-Powered Technical Intelligence — how we transform...',
          description: "",
          section: "News",},{id: "news-earned-the-anthropic-claude-code-architect-foundation-certification",
          title: 'Earned the Anthropic Claude Code Architect - Foundation certification.',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/saranya-govindaraj-resume.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%61%72%61%6E%79%61.%73%68%61%6C%79%61@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/saranya-govindaraj-5abb4424", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/saranyashalya", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
