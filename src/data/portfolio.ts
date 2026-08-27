/* ─────────────────────────────────────────────────────────────────
   Single source of truth for all portfolio content.
   Every fact below traces to Ahmed_Brini_CV.pdf or to the actual
   source of the projects it describes. Edit here; components
   render whatever lives in this file.
   ───────────────────────────────────────────────────────────────── */

export const identity = {
  name: 'Ahmed Brini',
  role: 'Software Engineering Student',
  kicker: 'Cloud Infrastructure · GCP',
  location: 'Tunis, Tunisia',
  email: 'ahmed.brini.ar@gmail.com',
  headline:
    'Final-year software engineering student building Terraform-based infrastructure-as-code and policy-gated deployment pipelines on Google Cloud.',
  about: [
    'I am a final-year software engineering student at MedTech (South Mediterranean University, Tunis), specializing in cloud infrastructure automation on Google Cloud Platform: Terraform-based infrastructure-as-code, policy as code, and Python services on Cloud Run.',
    'My recent work is about making infrastructure changes reviewable and safe: deterministic policy checks over Terraform plan output, a human approval gate in front of every terraform apply, and pipelines where credentials never touch state files.',
  ],
} as const

export const availability = {
  pill: 'available · jan 2027',
  statement: 'Open to a 4–6 month end-of-study internship (PFE), January – June 2027.',
  detail: 'Final coursework concludes in December 2026.',
} as const

export const links = {
  github: 'https://github.com/sinex-cloud',
  linkedin: 'https://www.linkedin.com/in/ahmedbrini/',
  cv: '/cv.pdf',
  mailto: 'mailto:ahmed.brini.ar@gmail.com',
} as const

export const education = {
  school: 'MedTech, Mediterranean Institute of Technology',
  university: 'South Mediterranean University, Tunis',
  degree: 'Engineering Degree, Software Engineering',
  years: '2022 – 2027 (expected)',
} as const

export const languages = [
  { name: 'Arabic', level: 'native' },
  { name: 'English', level: 'fluent' },
  { name: 'French', level: 'intermediate' },
] as const

export interface SkillGroup {
  label: string
  items: string[]
  muted?: boolean
}

/* the CV's seven groups, verbatim */
export const skills: SkillGroup[] = [
  {
    label: 'Cloud & Infrastructure',
    items: [
      'Google Cloud Platform',
      'Cloud Run',
      'Cloud Build',
      'Artifact Registry',
      'Secret Manager',
      'BigQuery',
      'Cloud Storage',
      'IAM',
      'Terraform',
      'Infrastructure as Code',
      'Policy as Code',
      'Docker',
      'Linux',
    ],
  },
  {
    label: 'Backend & Languages',
    items: ['Python', 'FastAPI', 'Flask', 'REST APIs', 'SQL', 'YAML'],
  },
  {
    label: 'Automation & CI/CD',
    items: ['GitHub Apps & Webhooks', 'Cloud Build pipelines', 'Git', 'GitHub', 'pytest', 'Postman'],
  },
  {
    label: 'LLM Integration',
    items: ['Gemini API', 'Gemma 3 fine-tuning'],
  },
  {
    label: 'Data & ML',
    items: ['pandas', 'NumPy', 'scikit-learn', 'TensorFlow / Keras'],
  },
  {
    label: 'Security & Audit Tooling',
    items: ['Burp Suite', 'Nikto', 'Google Lighthouse', 'GTmetrix'],
  },
  {
    label: 'Familiar',
    items: ['Java', 'Node.js', 'Next.js', 'React', 'MySQL'],
    muted: true,
  },
]

export interface Experience {
  hash: string
  branch: string
  company: string
  location: string
  role: string
  period: string
  bullets: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    hash: 'f7a3c21',
    branch: 'pwc/mlops',
    company: 'PwC Tunisia',
    location: 'Tunis',
    role: 'MLOps Intern',
    period: 'Jul 2025 - Aug 2025',
    bullets: [
      'Collected, annotated, and cleaned a dataset of financial-news articles, then fine-tuned and prompt-engineered a Gemma 3 model for an MLOps team building a live financial-news research agent.',
    ],
    tags: ['Gemma 3', 'Fine-tuning', 'Prompt engineering', 'MLOps'],
  },
  {
    hash: 'b9e4d10',
    branch: 'preventis/audit',
    company: 'PREVENTIS',
    location: 'Sfax',
    role: 'Security & Web Audit Intern',
    period: 'May 2024 - Jun 2024',
    bullets: [
      'Conducted a security audit of the company’s production website using Burp Suite and Nikto to identify vulnerabilities and misconfigurations.',
      'Profiled site load performance and SEO health using Google Lighthouse and GTmetrix, benchmarking results against best-practice thresholds.',
      'Delivered a technical findings report with prioritized recommendations that informed the company’s planned website redesign.',
    ],
    tags: ['Burp Suite', 'Nikto', 'Lighthouse', 'GTmetrix'],
  },
  {
    hash: '3c8f5e2',
    branch: 'wimbee/fullstack',
    company: 'Wimbee Beyond Expertise',
    location: 'Tunis',
    role: 'Full-Stack Intern',
    period: 'Jun 2023 - Jul 2023',
    bullets: [
      'Contributed to a Java/Spring Boot backend and Angular frontend, gaining hands-on exposure to MySQL and API testing with Postman.',
    ],
    tags: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Postman'],
  },
]

export interface Project {
  slug: string
  name: string
  origin: string
  summary: string
  bullets: string[]
  stack: string[]
  repos: { label: string; url: string }[]
  flagship?: boolean
  caseStudySlug?: string
  stats?: { value: string; label: string }[]
}

export const projects: Project[] = [
  {
    slug: 'gcp-iac-review-pipeline',
    name: 'GCP Infrastructure-as-Code Review Pipeline',
    origin: 'Personal project',
    summary:
      'A GitHub App that reviews every Terraform pull request against a GCP project, then holds terraform apply behind a human approval label.',
    bullets: [
      'Implemented seven deterministic policy-as-code checks in Python over Terraform JSON plan output, flagging over-permissive IAM roles and public storage buckets as high-severity findings.',
      'Designed a two-stage approval gate for terraform apply, combining automated policy checks with a human-applied approval label; the Gemini API only explains findings, it never decides.',
      'Eliminated credential exposure by keeping the GitHub App key and webhook secret out of Terraform state, running all plan/apply operations under an impersonated service account instead of a local key file.',
      'Provisioned BigQuery, Cloud Storage, and three IAM tiers from a single foundation.yaml across two git-tagged modules, and triggered Cloud Build directly via its API so every run uses the exact commit under review.',
    ],
    stack: [
      'FastAPI on Cloud Run',
      'Cloud Build',
      'Secret Manager',
      'Artifact Registry',
      'Developer Connect',
      'GCS remote backend',
      'pytest',
    ],
    repos: [
      { label: 'infrastructure-terraform-gcp', url: 'https://github.com/sinex-cloud/infrastructure-terraform-gcp' },
      { label: 'gcp-foundation-module', url: 'https://github.com/sinex-cloud/gcp-foundation-module' },
    ],
    flagship: true,
    caseStudySlug: 'gcp-iac-review-pipeline',
    stats: [
      { value: '7', label: 'deterministic policy checks' },
      { value: '2-stage', label: 'approval gate before apply' },
      { value: '2', label: 'git-tagged Terraform modules' },
    ],
  },
  {
    slug: 'stock-prediction-1h',
    name: 'Stock Prediction Pipeline (1H)',
    origin: 'University team project',
    summary:
      'An hourly AAPL forecasting pipeline: engineered features, a Keras LSTM, and the trained model served behind a FastAPI endpoint.',
    bullets: [
      'Engineered a feature set of lagged returns, rolling statistics, RSI, and ATR from hourly AAPL price data in pandas, feeding a Keras LSTM model trained using a chronological train/test split appropriate for time-series forecasting.',
      'Deployed the trained model and its fitted scalers behind a FastAPI prediction endpoint, with a Flask dashboard consuming the endpoint over HTTP to visualize predictions.',
    ],
    stack: ['pandas', 'Keras LSTM', 'FastAPI', 'Flask'],
    repos: [{ label: 'stock-prediction-1h', url: 'https://github.com/sinex-cloud/stock-prediction-1h' }],
  },
]

/* ── flagship case study ──────────────────────────────────────────
   Check names, severities and the foundation.yaml shape below come
   from the project's actual source (policy_checks.py), not invention. */

export interface PolicyCheck {
  id: string
  desc: string
  severity: 'high' | 'medium'
}

export const caseStudy = {
  slug: 'gcp-iac-review-pipeline',
  title: 'GCP Infrastructure-as-Code Review Pipeline',
  kicker: 'Case study · Personal project',
  summary:
    'A GitHub App that reviews every Terraform pull request against a GCP project, then holds terraform apply behind a human approval label. Seven deterministic policy checks read the Terraform JSON plan; the Gemini API explains findings on the PR, and nothing reaches the project without a human-applied approval label.',
  problem: [
    'An unreviewed terraform apply is one of the fastest ways to break a cloud project: a single merged plan can grant an over-permissive IAM role, open a storage bucket to the internet, or quietly add resources that bypass the module every other resource goes through.',
    'The usual answer is manual review, but humans skim plans, and plans lie by omission. The goal here was to make the dangerous part deterministic: let code decide what is risky, let a human decide what is acceptable, and make sure the thing that gets applied is exactly the thing that was reviewed.',
  ],
  pipeline: [
    { step: 'Pull request', detail: 'A Terraform change is opened against the infrastructure repo.' },
    { step: 'GitHub App webhook', detail: 'The App delivers the event to a FastAPI service on Cloud Run.' },
    { step: 'Cloud Build: plan', detail: 'Cloud Build is triggered via its API, pinned to the exact commit under review, and produces the Terraform JSON plan.' },
    { step: 'Seven policy checks', detail: 'Deterministic Python checks read the plan output and classify findings by severity.' },
    { step: 'Findings on the PR', detail: 'Results are posted as a PR comment; the Gemini API explains findings; it never decides.' },
    { step: 'Human approval label', detail: 'A reviewer applies the approval label. High-severity findings mean the plan fails outright.' },
    { step: 'Cloud Build: apply', detail: 'Only then does the gated terraform apply run, under an impersonated service account.' },
  ],
  checks: [
    { id: 'broad-iam-roles', desc: 'Flags over-permissive IAM role grants in the plan: the roles that make everything else irrelevant.', severity: 'high' },
    { id: 'public-access', desc: 'Detects bindings to allUsers / allAuthenticatedUsers; a public storage bucket is a high-severity finding.', severity: 'high' },
    { id: 'direct-resources', desc: 'Rejects raw resources that bypass the foundation module; every resource address must sit under module.*.', severity: 'high' },
    { id: 'yaml-schema', desc: 'Validates the structure of foundation.yaml before it is allowed to shape real infrastructure.', severity: 'high' },
    { id: 'required-labels', desc: 'Requires ownership and data-classification labels on every labellable resource.', severity: 'medium' },
    { id: 'naming-conventions', desc: 'Enforces resource naming standards across environments.', severity: 'medium' },
    { id: 'missing-environment-configuration', desc: 'Catches entries that leave an environment without explicit configuration.', severity: 'medium' },
  ] satisfies PolicyCheck[],
  gate: {
    quote: 'The Gemini API only explains findings. It never decides.',
    stages: [
      {
        name: 'Stage 1: automated',
        detail: 'Seven deterministic checks over the JSON plan. Any high-severity finding fails the review; there is no way to argue with it.',
      },
      {
        name: 'Stage 2: human',
        detail: 'A reviewer reads the findings and applies the approval label. Only the label, not a passing check, releases terraform apply.',
      },
    ],
  },
  security: [
    {
      title: 'No credentials in state',
      detail: 'The GitHub App private key and webhook secret live in Secret Manager and never enter Terraform state.',
    },
    {
      title: 'No local key files',
      detail: 'All plan and apply operations run under an impersonated service account; no service-account key file exists anywhere.',
    },
    {
      title: 'Review what you apply',
      detail: 'Cloud Build is triggered directly via its API so every run uses the exact commit under review, not whatever the branch points to by apply time.',
    },
  ],
  modules: {
    intro:
      'BigQuery, Cloud Storage, and three IAM tiers are provisioned from a single foundation.yaml, consumed by two git-tagged Terraform modules with a GCS remote backend and per-environment .tfbackend files.',
    excerpt: `version: 1.0

labels:
  platform: data-platform
  owner: data-engineering
  data_classification: internal

additional_project_permissions:
  - role: logging.viewer
    environments: [dev, int]
    members:
      users: [ahmed@…]`,
  },
} as const

export const certifications = [
  { name: 'Preparing for Google Cloud Certification: Cloud Engineer', issuer: 'Google Cloud (Coursera)', date: 'Jul 2026' },
  { name: 'CCNA Foundations: Networking Basics and Cisco IOS Essentials', issuer: 'Packt (Coursera)', date: 'Nov 2025' },
  { name: 'Agile Project Management', issuer: 'Google (Coursera)', date: 'Apr 2025' },
  { name: 'Advanced SQL for Data Engineering', issuer: '365 Data Science', date: 'Nov 2024' },
] as const

/* nav: sections rendered in order */
export const sections = [
  { id: 'about', label: 'About', kicker: 'profile' },
  { id: 'stack', label: 'Stack', kicker: 'technical skills' },
  { id: 'work', label: 'Work', kicker: 'projects' },
  { id: 'experience', label: 'Experience', kicker: 'internships' },
  { id: 'certifications', label: 'Certifications', kicker: 'credentials' },
  { id: 'contact', label: 'Contact', kicker: 'get in touch' },
] as const
