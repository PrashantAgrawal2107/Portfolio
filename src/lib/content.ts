export const profile = {
  name: "Prashant Agrawal",
  role: "Software Engineer",
  tagline: "Agentic AI Systems · LangGraph · RAG Pipelines · FastAPI",
  summary:
    "Software Engineer building agentic AI systems, RAG pipelines, and full-stack backend platforms. I design autonomous multi-step reasoning agents, LangGraph-orchestrated workflows, and NL-to-SQL pipelines for compliance-sensitive data — backed by a strong full-stack foundation in MERN, Nest.js, FastAPI, PostgreSQL and MongoDB.",
  location: "Gandhinagar, India",
  email: "prashantagrawal2107@gmail.com",
  links: {
    github: "https://github.com/PrashantAgrawal2107",
    linkedin: "https://www.linkedin.com/in/prashant-agrawal-aa7a55253/",
    leetcode: "https://leetcode.com/u/prashantagrawal2107/",
    resume: "/resume.pdf",
  },
};

export const stats = [
  { label: "Years building AI systems", value: "1.5+" },
  { label: "Flagship agentic platforms shipped", value: "2" },
  { label: "Core stack", value: "Full-Stack + Agentic AI" },
  { label: "Focus", value: "LangGraph · RAG · FastAPI" },
];

export type Experience = {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Argusoft Pvt Ltd",
    location: "Gandhinagar",
    role: "Programmer Analyst",
    period: "Jan 2026 – Present",
    bullets: [
      "Built a HIPAA-compliant AI platform implementing automated PII/PHI data masking to secure sensitive healthcare data across agentic workflows.",
      "Designed a truly agentic AI agent architecture capable of autonomous multi-step reasoning and tool use within the compliance platform.",
      "Developed an end-to-end RAG and Natural Language-to-SQL (NL-SQL) pipeline enabling secure, compliant natural-language querying over sensitive structured data.",
      "Designed and implemented a LangGraph-based workflow-generation engine for a client data-transformation platform — given source spreadsheets and a target output format, the agent plans and assembles a pipeline from composable blocks (row/column calculations, Python code blocks, database selectors, merge, transpose, result nodes).",
      "Built an edit/iteration capability so existing generated workflows can be revised in place — inserting, replacing, or rewiring individual blocks — instead of regenerating the whole pipeline from scratch.",
      "Introduced caching so edits only recompute the blocks actually affected by a change, cutting redundant re-execution and improving turnaround time.",
      "Performed extensive testing and validation of AI agents by executing diverse queries, identifying edge cases, and improving response reliability.",
      "Explored AWS Textract for document processing to extend agent capabilities.",
    ],
  },
  {
    company: "Argusoft Pvt Ltd",
    location: "Gandhinagar",
    role: "Programmer Analyst Trainee",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Gained hands-on experience in FastAPI, building scalable backend systems with authentication, role-based access control, and optimized APIs.",
      "Explored Deep Learning and Generative AI, including RAG pipelines, LangChain, and LangGraph for building intelligent applications.",
      "Designed and developed a full-stack E-Learning platform with course/module management, an automated-scoring quiz system, enrollments, and progress tracking.",
      "Planned and structured a LangGraph-based workflow for an existing LangChain project, improving orchestration and modular flow design.",
    ],
  },
  {
    company: "Argusoft Pvt Ltd",
    location: "Gandhinagar",
    role: "Programmer Analyst Intern",
    period: "Feb 2025 – Apr 2025",
    bullets: [
      "Worked on a checklist and workflow-automation platform, focusing on backend development with Java Spring Boot.",
      "Designed RESTful APIs for checklist creation, task assignment, and role-based workflow execution.",
      "Modeled data (JPA/PostgreSQL) for tasks, teams, reminders, dependencies, and audit logging.",
    ],
  },
];

export const flagshipProjects = {
  aegis: {
    title: "HIPAA-Compliant AI Platform",
    subtitle: "Agentic AI Agent · PII/PHI Masking · RAG & NL-to-SQL",
    description:
      "A compliance-grade AI platform for healthcare data. I designed the agentic reasoning core — a planner that autonomously chains tool calls, retries, and self-checks its own answers — plus the automated PII/PHI masking layer and a RAG + NL-to-SQL pipeline that lets analysts query sensitive structured data safely in plain English.",
    highlights: [
      {
        title: "Truly agentic reasoning",
        body: "Not a single prompt-and-response call — a planner loop that breaks a request into sub-goals, chooses tools, inspects its own intermediate results, and escalates to deeper retrieval only when confidence is low.",
      },
      {
        title: "RAG + NL-to-SQL pipeline",
        body: "Natural-language questions are routed to either a vector-retrieval path (for unstructured docs) or an NL-to-SQL path (for structured records), with results reconciled before being handed back to the user.",
      },
      {
        title: "Automated PII/PHI masking",
        body: "Every field that touches an agent tool call is scanned and masked before it leaves the trust boundary — names, SSNs, DOBs, phone numbers, addresses — with reversible tokens for authorized downstream use.",
      },
    ],
    architecturePhases: [
      "Coarse tool contracts",
      "Planner core loop",
      "Dual execution modes",
      "Cross-tool context injection",
      "Granular sub-tools",
      "Live thinking timeline",
      "Shadow-eval rollout",
      "Result evaluator node",
      "Adaptive retrieval escalation",
    ],
    tech: ["LangGraph", "LangChain", "RAG", "NL-to-SQL", "FastAPI", "PostgreSQL", "AWS Textract"],
  },
  compass: {
    title: "AI Workflow Automation for Data Transformation",
    subtitle: "LangGraph-Generated Spreadsheet Transformation Pipelines",
    description:
      "A platform that turns spreadsheets into transformation pipelines automatically. Give it source sheets and a target output format, and the agent plans and assembles a workflow from composable blocks — row calculations, column calculations, Python code blocks, database selectors, merge, transpose, and result nodes — instead of a human wiring it by hand. I designed the LangGraph flow that generates these pipelines, built the ability to edit an existing pipeline in place, and added caching so edits only recompute what actually changed.",
    highlights: [
      {
        title: "Agent-designed pipelines",
        body: "Given source sheets and a target result format, the agent plans which transformation blocks are needed and in what order, then compiles them into a runnable pipeline — no manual wiring.",
      },
      {
        title: "Edit & iterate",
        body: "Existing pipelines aren't rebuilt from scratch — the agent can insert, replace, or rewire individual blocks in place when the request changes.",
      },
      {
        title: "Caching-optimized execution",
        body: "Unaffected upstream blocks are cached and reused across edits, so only the blocks actually impacted by a change get recomputed.",
      },
    ],
    tech: ["LangGraph", "LangChain", "Python", "FastAPI", "Caching"],
  },
};

export type SimpleProject = {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  link?: string;
};

export const otherProjects: SimpleProject[] = [
  {
    name: "E-Learning Platform",
    tag: "Full-Stack · FastAPI",
    description:
      "A full-stack e-learning platform with course/module management, an automated-scoring quiz system, enrollments, and progress tracking.",
    tech: ["FastAPI", "PostgreSQL", "React", "JWT"],
  },
  {
    name: "LangGraph Workflow Migration",
    tag: "AI Orchestration",
    description:
      "Restructured an existing LangChain project onto LangGraph, improving orchestration clarity and modular flow design.",
    tech: ["LangGraph", "LangChain", "Python"],
  },
  {
    name: "Checkmate",
    tag: "Full-Stack · Java Spring Boot",
    description:
      "A full-stack platform for building and running checklists for recurring workflows like employee onboarding and offboarding. I worked on the backend in Java Spring Boot: RESTful APIs for checklist creation, task assignment, and role-based execution, with JPA/PostgreSQL modeling for teams, reminders, dependencies, and audit logging.",
    tech: ["Java", "Spring Boot", "JPA", "PostgreSQL"],
  },
  {
    name: "Real Estate App",
    tag: "MERN Stack",
    description:
      "A MERN-based real estate application for securely listing, browsing, and connecting around property listings, with JWT authentication for account management.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    link: "https://github.com/PrashantAgrawal2107/MERN-Estate-App",
  },
  {
    name: "Blog App",
    tag: "MERN Stack",
    description:
      "A MERN-based blogging platform for creating and managing posts, with public read access and protected content management.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/PrashantAgrawal2107/MERN-Blog-App",
  },
];

export const skills = [
  {
    category: "AI / Agentic Systems",
    items: ["LangChain", "LangGraph", "RAG Pipelines", "NL-to-SQL", "Agentic Systems", "Data Masking (HIPAA)"],
  },
  {
    category: "Backend & Databases",
    items: ["FastAPI", "Nest.js", "Node.js / Express", "React", "REST APIs", "JWT Auth", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    category: "Cloud, DevOps & Tools",
    items: ["Docker", "AWS Textract", "Caching", "Git", "Deployment"],
  },
];

export const education = {
  school: "G.L. Bajaj Institute of Technology and Management, Greater Noida",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2021 – 2025",
  gpa: "CGPA: 8.1 / 10",
  coursework: [
    "Object Oriented Programming",
    "Databases",
    "Discrete Maths",
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Advanced DSA",
    "Web Designing",
  ],
};
