// Everything on the site comes from Pulkit's LinkedIn profile export and his
// résumé ("PULKIT SINGH v5", Sep 2026). Edit facts here; sections only lay them out.
// Role dates follow LinkedIn (it splits the roles more finely than the résumé).

export type YM = { y: number; m: number }; // m is 1–12

export const profile = {
  name: "Pulkit Singh",
  initials: "PS",
  title: "AVP – Digital Analytics",
  positioning: "Product & project manager",
  location: "Gurgaon, India",
  email: "singhpulkit.ps@gmail.com",
  linkedin: "https://www.linkedin.com/in/pulkit-singh-0731b814b",
  // Shows the "Open to new roles" badges in the hero and contact sections.
  openToWork: false,
  summary:
    "owning product roadmaps and shipping AI/ML and intelligent document processing (IDP) products with engineering, data science and design teams.",
  topSkills: ["Product Management", "Project Management", "Generative AI"],
  skillGroups: [
    { name: "Product", items: ["Product Lifecycle Management", "Requirements Gathering", "Product Walkthroughs", "Software as a Service"] },
    { name: "Delivery", items: ["Agile", "Project Tracking & Reporting", "Budgeting & Cost Management", "Quality Assurance & Compliance"] },
    { name: "People", items: ["Stakeholder Management", "Leadership & Decision-making", "Negotiation & Conflict Resolution", "Cross-Functional Collaboration"] },
    { name: "Tools", items: ["JIRA", "Python", "VBA", "Alteryx", "Power BI"] },
  ],
  certifications: [
    "Data Analysis with Python: Zero to Pandas",
    "Certified Python Business Analyst (CPBA)",
    "Microsoft Certified: Azure Fundamentals",
  ],
  awards: [
    { name: "Innovation Champion", org: "EXL", year: 2025 },
    { name: "Stellar Performer Award", org: "EXL", year: 2024 },
  ],
};

export type Role = {
  title: string;
  short: string;
  level: number;
  start: YM;
  end: YM | null;
  location?: string;
  summary?: string;
  highlights?: string[];
};

export const exl = {
  company: "EXL",
  location: "India",
  start: { y: 2020, m: 10 },
  // Newest first. `level` drives the career chart in the hero.
  roles: [
    {
      title: "AVP – Digital Analytics",
      short: "AVP",
      level: 4,
      start: { y: 2024, m: 10 },
      end: null,
      location: "India",
      summary:
        "Leads client engagements and AI/GenAI and IDP product initiatives for insurance clients, driving product enhancements, solution adoption and revenue growth.",
      highlights: [
        "Owned the end-to-end roadmap for SOV integration in Xtrakto.AI: discovery, UI/UX concepts, requirements, testing and deployment.",
        "Ran the full delivery lifecycle for AI/ML and IDP solutions: BRDs, solution walkthroughs, sprint planning, UAT and production rollout.",
        "Raised model accuracy from 70% to 85–95% across deployments by aligning data science teams with business logic and validation needs.",
        "Delivered 50–60% productivity gains for end users across several clients through workflow optimisation, product enhancements and automation.",
        "Generated a USD 2.3M pipeline through product demos, capability showcases, client engagement and expansion into new lines of business.",
        "Kept gross margin above 45% with 95% adherence through scope control, delivery governance, capacity planning and forecasting.",
      ],
    },
    {
      title: "Senior Manager – Digital Analytics",
      short: "Senior Manager",
      level: 3,
      start: { y: 2022, m: 7 },
      end: { y: 2024, m: 10 },
      location: "India",
      summary: "Led cross-functional development and delivery of cloud-hosted AI/GenAI products across insurance and banking.",
      highlights: [
        "Led requirements gathering, feasibility assessments, BRDs and user stories with acceptance criteria in JIRA.",
        "Partnered with data science and engineering to define business logic, prioritise features and refine UI/UX, lifting adoption.",
        "Delivered demos and POCs for cloud-hosted GenAI/IDP solutions: USD 1.2M qualified pipeline and USD 350K+ revenue enabled.",
        "Improved data quality by 5–10% through IDP-driven validation and structured extraction logic.",
      ],
    },
    { title: "Manager – Digital Analytics", short: "Manager", level: 2, start: { y: 2022, m: 2 }, end: { y: 2022, m: 7 } },
    {
      title: "Manager – Transformation and Solutioning",
      short: "Manager",
      level: 2,
      start: { y: 2020, m: 12 },
      end: { y: 2022, m: 2 },
      highlights: [
        "Led a cross-functional team delivering automation solutions with Python, VBA, Alteryx and Power BI.",
        "Achieved FTE savings 70.9% above the contractual target for a major insurance client by modernising workflows and automating at scale.",
      ],
    },
    { title: "Management Trainee", short: "Management Trainee", level: 1, start: { y: 2020, m: 10 }, end: { y: 2020, m: 12 } },
  ] satisfies Role[],
};

export const earlier = [
  {
    org: "Carpe Diem IIM Calcutta",
    title: "Overall Coordinator",
    start: { y: 2019, m: 2 },
    end: { y: 2020, m: 2 },
    location: "IIM Calcutta",
    note: "IIM Calcutta's three-day festival, with 5,000+ participants from IIMs, IITs, NITs and local colleges.",
  },
  { org: "CK Birla Group", title: "Summer Intern", start: { y: 2019, m: 4 }, end: { y: 2019, m: 5 }, location: "Gurgaon, India" },
  {
    org: "Subros Limited",
    title: "Graduate Engineer Trainee",
    start: { y: 2017, m: 7 },
    end: { y: 2018, m: 5 },
    location: "Manesar",
    note: "Optimised hose-tube production, cutting cycle time and removing major bottlenecks for smoother, more predictable lines.",
  },
];

// Headline results from the résumé, shown in the Impact section.
export const impact = {
  accuracy: { from: 70, to: [85, 95] as const },
  productivity: "50–60%",
  pipeline: 2.3, // USD M, as AVP
  pipelineEarlier: 1.2, // USD M qualified, as Senior Manager
  revenue: "350K+", // USD, as Senior Manager
  margin: 45, // % gross margin, held with 95% adherence
  fteSavings: 70.9, // % above the contractual target
};

export const education = [
  {
    school: "Indian Institute of Management, Calcutta",
    short: "IIM Calcutta",
    degree: "MBA",
    field: "Business Administration and Management, General",
    years: "2018 – 2020",
  },
  {
    school: "National Institute of Technology Kurukshetra",
    short: "NIT Kurukshetra",
    degree: "Bachelor of Technology",
    field: "Mechanical Engineering",
    years: "2013 – 2017",
  },
];

export const organisations = ["EXL", "IIM Calcutta", "NIT Kurukshetra", "CK Birla Group", "Subros Limited"];

/* ------------------------------------------------------------------ dates */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const today = new Date();
export const NOW: YM = { y: today.getFullYear(), m: today.getMonth() + 1 };

/** Months in a role, counted the way LinkedIn does (both end months included). */
export function monthsBetween(a: YM, b: YM | null) {
  const e = b ?? NOW;
  return (e.y - a.y) * 12 + (e.m - a.m) + 1;
}

export function fmtDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}

export const fmtYM = ({ y, m }: YM) => `${MONTHS[m - 1]} ${y}`;
export const fmtRange = (a: YM, b: YM | null) => `${fmtYM(a)} – ${b ? fmtYM(b) : "Present"}`;

export const exlMonths = monthsBetween(exl.start, null);
export const exlYears = Math.floor(exlMonths / 12);
// Full-time work: Subros plus EXL (the internship and campus role are left out).
export const experienceYears = Math.floor((monthsBetween(earlier[2].start, earlier[2].end) + exlMonths) / 12);
const avp = exl.roles[0].start;
export const traineeToAvpYears = avp.y - exl.start.y + (avp.m - exl.start.m) / 12;

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const inWords = (n: number) => WORDS[n] ?? String(n);
