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

// ----------------------------------------------------------------------------
// PROFILE DATA
// ----------------------------------------------------------------------------

export const profile = {
  name: "Asad Ur Rehman",
  brand: "Qureshidev",
  role: "AI & Agentic Engineer",
  tagline: "Architecting Tomorrow's Intelligence — One Agent at a Time",
  bio: `I'm a visionary AI engineer obsessed with pushing the boundaries of autonomous systems.
I don't just build software — I craft intelligent digital entities that reason, adapt, and evolve.

With deep expertise in Large Language Models, multi-agent orchestration, and cutting-edge
AI frameworks, I transform ambitious ideas into production-grade intelligent systems that
deliver measurable impact.

From architecting enterprise RAG pipelines processing millions of documents to building
autonomous AI agents that outperform traditional automation by 10x — I specialize in
making the impossible, inevitable.`,
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
    category: "AI & Machine Learning",
    skills: [
      "Large Language Models (GPT-4, Claude, Llama)",
      "LangChain & LangGraph",
      "OpenAI API / Anthropic Claude API",
      "RAG Systems & Semantic Search",
      "Vector Databases (Pinecone, Weaviate, Chroma)",
      "Advanced Prompt Engineering",
      "Model Fine-tuning & LoRA",
      "Multi-Agent Orchestration",
      "AI Workflow Automation",
      "Computer Vision & NLP",
    ],
  },
  {
    category: "Frontend Development",
    skills: [
      "React 19 / Next.js 15+",
      "TypeScript (Advanced)",
      "Tailwind CSS v4",
      "Framer Motion",
      "Three.js / React Three Fiber",
      "Shadcn/ui & Radix",
      "Zustand / Jotai / Redux",
      "WebGL & GLSL Shaders",
    ],
  },
  {
    category: "Backend Development",
    skills: [
      "Node.js & Bun",
      "Python / FastAPI / Flask",
      "Express.js & Hono",
      "PostgreSQL & Supabase",
      "MongoDB & Mongoose",
      "Redis & Caching Strategies",
      "GraphQL & tRPC",
      "REST API Architecture",
      "WebSockets & Real-time Systems",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS (Lambda, S3, EC2, Bedrock)",
      "Google Cloud Platform (Vertex AI)",
      "Vercel & Cloudflare Workers",
      "Docker & Kubernetes",
      "GitHub Actions & CI/CD",
      "Terraform & Infrastructure as Code",
      "Serverless Architecture",
    ],
  },
  {
    category: "Tools & Productivity",
    skills: [
      "Git & Advanced Version Control",
      "VS Code / Cursor AI",
      "Postman & API Testing",
      "Figma & UI/UX Prototyping",
      "Notion & Documentation",
      "Linear & Agile Workflows",
      "Claude Code & AI-Assisted Dev",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "agentic-workflow",
    title: "Agentic Workflow Engine",
    description:
      "Revolutionary multi-agent orchestration platform enabling autonomous AI agents to collaborate, reason, and execute complex enterprise workflows with zero human intervention.",
    longDescription: `Engineered a groundbreaking multi-agent system using LangGraph that coordinates
specialized AI agents for research, coding, data analysis, and decision-making tasks.

Key Achievements:
• Reduced manual workflow processing time by 85%
• Handles 10,000+ concurrent agent tasks with sub-100ms latency
• Features dynamic task delegation, persistent memory, and self-healing capabilities
• Real-time collaboration between 5+ specialized agents
• Enterprise-grade security with role-based access control

This system has been deployed across 3 Fortune 500 companies, processing over
1M autonomous decisions monthly with 99.7% accuracy.`,
    techStack: ["Python", "LangGraph", "OpenAI GPT-4", "FastAPI", "Redis", "React", "PostgreSQL"],
    liveUrl: "https://agentic.qureshidev.com",
    githubUrl: "https://github.com/qureshidev/agentic-workflow",
    imageUrl: "/projects/agentic-workflow.jpg",
    featured: true,
  },
  {
    id: "rag-knowledge-base",
    title: "Enterprise RAG Knowledge Platform",
    description:
      "Production-grade retrieval-augmented generation system powering intelligent document Q&A across millions of enterprise documents with blazing-fast semantic search.",
    longDescription: `Architected and deployed an enterprise-scale RAG system that transforms how
organizations interact with their knowledge bases.

Technical Highlights:
• Processes 5M+ documents with semantic chunking and hybrid search
• Sub-200ms query response times at scale
• Advanced contextual compression reducing token usage by 60%
• Multi-tenant architecture supporting 50+ enterprise clients
• Custom embedding models fine-tuned for domain-specific accuracy

Impact: Reduced customer support ticket resolution time by 73% and increased
first-contact resolution rate to 89%.`,
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
