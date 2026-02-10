// ============================================================================
// QURESHIDEV PORTFOLIO - SINGLE SOURCE OF TRUTH
// ============================================================================
// Edit this file to update your entire portfolio.
// All sections dynamically render from this configuration.
// ============================================================================

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  type LucideIcon,
} from "lucide-react";

// ----------------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------------

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrg: string;
  issueDate: string;
  credentialUrl?: string;
  imageUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  techUsed: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

// ----------------------------------------------------------------------------
// PROFILE DATA
// ----------------------------------------------------------------------------

export const profile = {
  name: "Asad Ur Rehman",
  brand: "Qureshidev",
  role: "Senior AI Engineer & Multi-Agent Systems Architect",
  tagline: "Building Production AI Systems That Scale—from RAG Pipelines to Autonomous Agents",
  bio: `I engineer autonomous AI systems that actually work in production—not just demos.

Specializing in multi-agent orchestration and enterprise RAG, I transform research prototypes into systems that handle millions of requests while delivering measurable business outcomes.

**What I Build:**
• **Multi-Agent Systems**: Orchestrating fleets of autonomous agents that collaborate on complex workflows
• **Enterprise RAG**: Knowledge bases processing 5M+ documents with sub-200ms latency
• **AI Infrastructure**: Production-ready systems with 99.7% accuracy and 60% cost optimization

**Proven Impact:**
• 1M+ autonomous decisions processed monthly for Fortune 500 clients
• $2.3M annual operational cost savings through AI automation
• 85% reduction in manual workflow processing time

Before AI engineering: 6+ years of full-stack development, so I understand what it takes to integrate AI into real engineering environments.

Currently focused on: Making multi-agent systems reliable enough to replace human workflows at scale.`,
  location: "Pakistan 🇵🇰",
  email: "contact@qureshidev.com",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpg",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/qureshidev",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/qureshidev",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/qureshidev",
    icon: Twitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/qureshidev",
    icon: Instagram,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@qureshidev",
    icon: Youtube,
  },
  {
    name: "Email",
    url: "mailto:contact@qureshidev.com",
    icon: Mail,
  },
];

export const skills: SkillCategory[] = [
  {
    category: "AI Engineering & Agentic Systems",
    skills: [
      "Multi-Agent Orchestration (LangGraph)",
      "Enterprise RAG Architecture",
      "LLM Systems (GPT-4, Claude, Llama)",
      "Vector Databases (Pinecone, Weaviate)",
      "Advanced Prompt Engineering",
      "Model Fine-tuning & LoRA",
      "AI Workflow Automation",
      "Semantic Search & Embeddings",
    ],
  },
  {
    category: "Full-Stack Development",
    skills: [
      "React 18 / Next.js 16",
      "TypeScript (Advanced Patterns)",
      "Tailwind CSS v4",
      "Node.js & Python",
      "PostgreSQL & Supabase",
      "GraphQL & REST APIs",
      "Real-time Systems (WebSockets)",
      "Shadcn/ui & Radix Primitives",
    ],
  },
  {
    category: "3D & Motion Design",
    skills: [
      "Three.js & React Three Fiber",
      "WebGL & GLSL Shaders",
      "Framer Motion",
      "GSAP Animations",
      "Canvas & SVG Graphics",
      "Performance Optimization",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      "AWS (Lambda, Bedrock, S3)",
      "Vercel & Edge Functions",
      "Docker & Kubernetes",
      "GitHub Actions CI/CD",
      "Serverless Architecture",
      "Infrastructure as Code",
      "Monitoring & Observability",
    ],
  },
  {
    category: "AI Tooling",
    skills: [
      "LangChain & LangGraph",
      "OpenAI & Anthropic APIs",
      "MLflow & Experiment Tracking",
      "Vector Database Operations",
      "Prompt Engineering at Scale",
      "Model Deployment & Monitoring",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "agentic-workflow",
    title: "Agentic Workflow Engine",
    description: "Multi-agent orchestration platform where specialized AI agents collaborate autonomously—processing 10K+ daily tasks with 85% time reduction.",
    longDescription: `**Challenge:** Enterprise teams were drowning in repetitive workflows, with each task requiring 20-30 minutes of human review. Scaling meant linear hiring—unsustainable for exponential growth.

**Solution:** Built a LangGraph-powered system where 5+ specialized agents (Researcher, Coder, Analyst, Validator, Decision-Maker) collaborate autonomously with persistent shared memory.

**Key Architecture Decisions:**
• Chose LangGraph over LangChain for native cyclic agent graphs and built-in error recovery
• Implemented Redis-backed shared memory for sub-100ms agent coordination (vs. 340ms with PostgreSQL)
• Event-driven architecture with RabbitMQ for horizontal scaling to 10K+ concurrent tasks

**Technical Challenges Overcome:**
• Agent deadlocks: Built timeout-based escalation hierarchy
• Token explosion: Conversation summarization reduced costs by 65%
• Consistency without DB: Designed eventual consistency model with conflict resolution

**Impact:**
• 85% faster workflow processing (25min → 3min avg)
• 1M+ decisions/month with 99.7% accuracy
• $2.3M annual operational savings
• Deployed across 3 Fortune 500 companies`,
    techStack: ["Python", "LangGraph", "OpenAI GPT-4", "FastAPI", "Redis", "RabbitMQ", "React", "PostgreSQL"],
    liveUrl: "https://agentic.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/agentic-workflow",
    imageUrl: "/projects/agentic-workflow.jpg",
    featured: true,
  },
  {
    id: "rag-knowledge-base",
    title: "Enterprise RAG Knowledge Platform",
    description: "Production RAG system processing 5M+ documents with sub-200ms semantic search—achieving 73% faster support resolution.",
    longDescription: `**Challenge:** Knowledge workers spent 15-30 minutes searching document repositories. Traditional keyword search returned irrelevant results, causing 60% of queries to escalate to human review.

**Solution:** Built a hybrid RAG system combining dense semantic search with sparse keyword matching, enhanced by custom chunking strategies.

**Key Architecture Decisions:**
• Hybrid search (semantic + keyword) for edge cases that pure embeddings miss
• Custom recursive chunking preserving context across document sections
• Pinecone for vector storage with PostgreSQL for metadata (best of both worlds)
• Contextual compression: 60% token reduction while maintaining 94% accuracy

**Technical Challenges Overcome:**
• Scaling vector embeddings: Implemented batch processing with parallel GPU utilization
• Multi-tenancy isolation: Row-level security with dedicated index namespaces
• Cold start latency: Pre-warmed query pools with intelligent caching

**Impact:**
• 73% faster query resolution (from 20min to 5min avg)
• 89% first-contact resolution (up from 58%)
• 60% reduction in LLM token costs via compression
• Deployed for 50+ enterprise tenants`,
    techStack: ["LangChain", "Pinecone", "OpenAI", "Next.js", "PostgreSQL", "Redis", "AWS"],
    liveUrl: "https://rag.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/rag-kb",
    imageUrl: "/projects/rag-kb.jpg",
    featured: true,
  },
  {
    id: "ai-code-reviewer",
    title: "Autonomous Code Review Agent",
    description:
      "AI-powered GitHub App that autonomously reviews pull requests, detects security vulnerabilities, suggests optimizations, and enforces coding standards — like having a senior engineer review every commit.",
    longDescription: `Built an intelligent code review system that combines static analysis with
LLM-powered contextual understanding to provide human-quality code reviews.

Capabilities:
• Analyzes 500+ PRs daily with 97% accuracy
• Detects OWASP Top 10 security vulnerabilities
• Provides contextual refactoring suggestions
• Enforces team-specific coding standards
• Learns from codebase patterns over time
• Integrates with Slack for instant notifications

Deployed across 200+ repositories, preventing an estimated 1,200 bugs
from reaching production in 2024.`,
    techStack: ["TypeScript", "Claude API", "GitHub API", "Node.js", "Vercel", "PostgreSQL"],
    liveUrl: "https://codereview.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/ai-code-reviewer",
    imageUrl: "/projects/code-reviewer.jpg",
    featured: true,
  },
  {
    id: "voice-agent",
    title: "Conversational Voice AI Agent",
    description:
      "Real-time voice AI assistant with natural speech synthesis, multilingual support, and emotional intelligence — indistinguishable from human conversation.",
    longDescription: `Developed a state-of-the-art voice AI system that handles complex conversations
with human-like fluency and emotional awareness.

Features:
• Real-time speech-to-text with Whisper
• Natural voice synthesis via ElevenLabs
• Supports 15+ languages with accent adaptation
• Emotion detection and appropriate response modulation
• Latency under 500ms for seamless conversation flow
• Integration with CRM and knowledge bases`,
    techStack: ["Python", "Whisper", "ElevenLabs", "FastAPI", "WebSockets", "Redis", "React"],
    liveUrl: "https://voice.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/voice-agent",
    imageUrl: "/projects/voice-agent.jpg",
  },
  {
    id: "prompt-studio",
    title: "Prompt Engineering Studio",
    description:
      "Visual prompt engineering platform with version control, A/B testing, and analytics — empowering teams to iterate on prompts 10x faster.",
    longDescription: `Created a collaborative platform that brings software engineering best practices
to prompt engineering.

Key Features:
• Visual prompt builder with variable injection
• Git-like version control for prompts
• A/B testing with statistical significance analysis
• Cost optimization recommendations
• Team collaboration with approval workflows
• Integration with all major LLM providers`,
    techStack: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind", "Prisma"],
    liveUrl: "https://promptstudio.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/prompt-studio",
    imageUrl: "/projects/prompt-studio.jpg",
  },
  {
    id: "ml-pipeline",
    title: "AutoML Pipeline Orchestrator",
    description:
      "End-to-end machine learning pipeline with automated feature engineering, model selection, hyperparameter tuning, and one-click deployment to production.",
    longDescription: `Built a comprehensive MLOps platform that automates the entire machine learning
lifecycle from data ingestion to production deployment.

Capabilities:
• Automated feature engineering and selection
• AutoML with 20+ algorithm options
• Distributed hyperparameter optimization
• Model versioning and experiment tracking
• One-click deployment with A/B testing
• Real-time model monitoring and drift detection`,
    techStack: ["Python", "Apache Airflow", "MLflow", "Docker", "Kubernetes", "AWS SageMaker"],
    githubUrl: "https://github.com/qureshidev/ml-pipeline",
    imageUrl: "/projects/ml-pipeline.jpg",
  },
  {
    id: "ai-content-engine",
    title: "AI Content Generation Engine",
    description:
      "Multi-modal content generation platform producing SEO-optimized articles, social media posts, and marketing copy at scale with brand voice consistency.",
    techStack: ["Next.js", "GPT-4", "Claude", "Stable Diffusion", "PostgreSQL", "Redis"],
    liveUrl: "https://content.qureshidev.com",
    imageUrl: "/projects/content-engine.jpg",
  },
  {
    id: "smart-analytics",
    title: "AI-Powered Analytics Dashboard",
    description:
      "Intelligent business analytics platform with natural language queries, automated insights generation, and predictive forecasting powered by machine learning.",
    techStack: ["React", "Python", "TensorFlow", "PostgreSQL", "D3.js", "FastAPI"],
    liveUrl: "https://analytics.qureshidev.com",
    imageUrl: "/projects/smart-analytics.jpg",
  },
];

export const certificates: Certificate[] = [
  {
    id: "aws-ml",
    title: "AWS Certified Machine Learning – Specialty",
    issuingOrg: "Amazon Web Services",
    issueDate: "2024",
    credentialUrl: "https://aws.amazon.com/certification/",
    imageUrl: "/certificates/aws-ml.png",
  },
  {
    id: "deeplearning-ai",
    title: "Deep Learning Specialization",
    issuingOrg: "DeepLearning.AI (Andrew Ng)",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/",
    imageUrl: "/certificates/deeplearning.png",
  },
  {
    id: "langchain-cert",
    title: "LangChain for LLM Application Development",
    issuingOrg: "DeepLearning.AI",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/",
    imageUrl: "/certificates/langchain.png",
  },
  {
    id: "google-cloud-ml",
    title: "Google Cloud Professional ML Engineer",
    issuingOrg: "Google Cloud",
    issueDate: "2024",
    credentialUrl: "https://cloud.google.com/certification",
    imageUrl: "/certificates/gcp-ml.png",
  },
  {
    id: "anthropic-prompt",
    title: "Anthropic Prompt Engineering Certification",
    issuingOrg: "Anthropic",
    issueDate: "2024",
    credentialUrl: "https://anthropic.com/",
    imageUrl: "/certificates/anthropic.png",
  },
  {
    id: "meta-ai",
    title: "Meta AI & Machine Learning Professional",
    issuingOrg: "Meta",
    issueDate: "2023",
    credentialUrl: "https://coursera.org/",
    imageUrl: "/certificates/meta-ai.png",
  },
];

export const experience: Experience[] = [
  {
    id: "current",
    role: "AI & Agentic Engineer",
    company: "Qureshidev (Founder & Lead Engineer)",
    duration: "2023 - Present",
    description:
      "Pioneering autonomous AI systems and intelligent applications for global clients. Leading the development of multi-agent platforms, enterprise RAG systems, and AI-powered automation solutions that have collectively processed over 10M AI-driven decisions with 99%+ accuracy.",
    techUsed: ["LangChain", "LangGraph", "OpenAI", "Claude", "Next.js", "Python", "AWS", "Pinecone"],
  },
  {
    id: "prev-1",
    role: "Senior AI/Full-Stack Engineer",
    company: "AI-First Startup (Series A)",
    duration: "2022 - 2023",
    description:
      "Spearheaded the AI engineering team, architecting core LLM infrastructure that powered 500K+ daily API calls. Reduced inference costs by 40% through prompt optimization and caching strategies. Built real-time collaboration features serving 50K+ active users.",
    techUsed: ["React", "Node.js", "Python", "PostgreSQL", "Redis", "OpenAI", "Docker", "AWS"],
  },
  {
    id: "prev-2",
    role: "Full-Stack Developer",
    company: "Digital Agency",
    duration: "2020 - 2022",
    description:
      "Delivered 25+ high-impact web applications for clients across fintech, e-commerce, and healthcare sectors. Championed modern development practices including CI/CD automation, test-driven development, and performance optimization achieving 95+ Lighthouse scores.",
    techUsed: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
  {
    id: "prev-3",
    role: "Junior Developer",
    company: "Software House",
    duration: "2018 - 2020",
    description:
      "Kickstarted my engineering journey building robust web applications and APIs. Rapidly mastered the MERN stack while contributing to 15+ client projects. Recognized as 'Rising Star' for exceptional code quality and proactive problem-solving.",
    techUsed: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"],
  },
];

// ----------------------------------------------------------------------------
// TESTIMONIALS
// ----------------------------------------------------------------------------

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "TechScale AI",
    content:
      "Asad's work on our multi-agent system was nothing short of extraordinary. He delivered a solution that reduced our manual processing time by 85% and handles 10K+ concurrent tasks. His deep understanding of LLMs and autonomous systems is unmatched.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Michael Rodriguez",
    title: "CTO",
    company: "DataFlow Systems",
    content:
      "We hired Asad to architect our enterprise RAG pipeline. The result exceeded all expectations — sub-200ms query times at scale, 60% reduction in token costs, and 99.7% accuracy. He's the real deal.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Emily Watson",
    title: "Product Manager",
    company: "InnovateTech",
    content:
      "Working with Asad was a game-changer for our AI code review tool. His technical expertise combined with his ability to understand business needs made the collaboration incredibly smooth. Highly recommended!",
    rating: 5,
  },
  {
    id: "testimonial-4",
    name: "David Kim",
    title: "Founder & CEO",
    company: "AutomateAI",
    content:
      "Asad built our voice AI agent from scratch. The system now handles thousands of customer calls with human-like conversation quality. His attention to detail and commitment to excellence is remarkable.",
    rating: 5,
  },
  {
    id: "testimonial-5",
    name: "Lisa Thompson",
    title: "Director of AI",
    company: "FinanceFlow",
    content:
      "The prompt engineering studio Asad built for us has transformed how our team works with LLMs. Version control for prompts, A/B testing, cost analytics — it's everything we needed and more.",
    rating: 5,
  },
  {
    id: "testimonial-6",
    name: "James Park",
    title: "Head of Engineering",
    company: "CloudNative Labs",
    content:
      "Asad's full-stack expertise combined with his AI knowledge is rare. He delivered our ML pipeline orchestrator on time, on budget, and with documentation that made our team's lives so much easier.",
    rating: 5,
  },
];

// ----------------------------------------------------------------------------
// STATS (for potential future use)
// ----------------------------------------------------------------------------

export const stats = [
  { label: "Years Experience", value: "6+" },
  { label: "Projects Delivered", value: "50+" },
  { label: "AI Decisions Processed", value: "10M+" },
  { label: "Client Satisfaction", value: "100%" },
];

// ----------------------------------------------------------------------------
// NAVIGATION
// ----------------------------------------------------------------------------

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

// ----------------------------------------------------------------------------
// THEME CONFIGURATION
// ----------------------------------------------------------------------------

export const theme = {
  colors: {
    background: "#09090b",
    foreground: "#fafafa",
    primary: "#3b82f6", // Electric Blue
    secondary: "#64748b", // Slate
    accent: "#06b6d4", // Cyan accent
    muted: "#27272a",
    card: "#18181b",
    border: "#27272a",
  },
};
