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
  email: 'ahmed.brini@medtech.tn',
  headline: 'Cloud & DevOps-oriented final-year software engineering student.',
  about: [
    'Focused on infrastructure automation, CI/CD, cloud security, and backend systems: building cloud infrastructure with GCP & Terraform, policy as code, and Python services and APIs.',
    'Recent work: a Terraform review pipeline that catches infrastructure and security issues before merge, an MLOps internship at PwC Tunisia fine-tuning and evaluating LLMs, and a security and performance audit of a production website.',
  ],
} as const

export const availability = {
  pill: 'available · jan 2027',
  statement: 'Open to a 4–6 month capstone internship (PFE), January – June 2027.',
  detail: 'Final coursework concludes in December 2026.',
} as const

export const links = {
  github: 'https://github.com/sinex-cloud',
  linkedin: 'https://www.linkedin.com/in/ahmedbrini/',
  cv: '/cv.pdf',
  mailto: 'mailto:ahmed.brini@medtech.tn',
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
  { name: 'Turkish', level: 'beginner' },
] as const

export interface SkillGroup {
  label: string
  items: string[]
}

/* the CV's two groups, verbatim */
export const skills: SkillGroup[] = [
  {
    label: 'Cloud & DevOps',
    items: ['GCP', 'Terraform', 'IaC', 'Policy as Code', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    label: 'Programming & Tools',
    items: ['Python', 'Git', 'Linux', 'GitHub Apps/Webhooks', 'FastAPI'],
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
    role: 'Machine Learning Intern',
    period: 'Jul 2025 - Aug 2025',
    bullets: [
      'Delivered a fine-tuned Gemma-3-1B finance Q&A model, improving held-out answer accuracy from roughly 40% to 78% by curating 50 finance Q&A pairs and running LoRA fine-tuning for 3 epochs.',
      'Helped the MLOps team select a production model, reducing model-selection time from an estimated 2 weeks to 3 days by benchmarking 3 candidate checkpoints across 5 evaluation suites and logging results to MLflow.',
      'Built 3 end-to-end LLM fine-tuning pipelines across 2 Gemma model sizes, taking each from raw JSONL data to a deployable checkpoint.',
    ],
    tags: ['Gemma 3', 'LoRA fine-tuning', 'MLflow', 'MLOps'],
  },
  {
    hash: 'b9e4d10',
    branch: 'preventis/audit',
    company: 'PREVENTIS',
    location: 'Sfax',
    role: 'Security & Web Audit Intern',
    period: 'May 2024 - Jun 2024',
    bullets: [
      'Delivered a prioritized security findings report, surfacing 12 vulnerabilities and misconfigurations including 3 high-severity findings by auditing the company’s production website with Burp Suite and Nikto.',
      'Helped inform the company’s planned website redesign, identifying an estimated 35% potential improvement in page load time by profiling performance and SEO health with Google Lighthouse and GTmetrix against best-practice thresholds.',
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
      'Delivered a working full-stack reference application, catching an estimated 4 integration bugs before merge by building a 5-endpoint Spring Boot REST API and testing every endpoint in Postman before Angular integration.',
      'Helped the team validate its intended stack, reducing new-developer ramp-up time by roughly 30% by shipping a working Java/Spring Boot and Angular implementation with MySQL that served as a reference for later features.',
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
      'Delivered an end-to-end LSTM forecasting pipeline for next-hour AAPL price, reaching about 1.3% mean absolute percentage error on early test predictions by engineering 20 features from 419 hours of price data and training a 32-unit LSTM on a chronological 316/80 train/test split.',
      'Delivered a servable model by wrapping the trained LSTM and its fitted scalers behind a FastAPI prediction endpoint, with a Flask dashboard structured to consume it over HTTP.',
    ],
    stack: ['Python', 'TensorFlow', 'LSTM', 'FastAPI', 'Flask'],
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
  { id: 'work', label: 'Work', kicker: 'projects' },
  { id: 'experience', label: 'Experience', kicker: 'internships' },
  { id: 'stack', label: 'Stack', kicker: 'technical skills' },
  { id: 'certifications', label: 'Certifications', kicker: 'credentials' },
  { id: 'contact', label: 'Contact', kicker: 'get in touch' },
] as const
