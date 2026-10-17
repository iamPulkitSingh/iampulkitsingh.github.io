// Everything on the site comes from Pulkit's LinkedIn profile export.
// Edit facts here; the sections only lay them out.

export type YM = { y: number; m: number }; // m is 1–12

export const profile = {
  name: "Pulkit Singh",
  initials: "PS",
  title: "AVP, Digital Analytics",
  headline: "Digital Analytics @ EXL | IIM Calcutta | NIT Kurukshetra",
  location: "India",
  email: "spulkit98@gmail.com",
  linkedin: "https://www.linkedin.com/in/pulkit-singh-0731b814b",
  // Shows the "Open to new roles" badge in the hero and contact sections.
  openToWork: false,
  topSkills: ["Generative AI", "Product Development", "Product Management"],
  certifications: [
    "Data Analysis with Python: Zero to Pandas",
    "Certified Python Business Analyst (CPBA)",
    "Microsoft Certified: Azure Fundamentals",
  ],
};

export type Role = { title: string; short: string; level: number; start: YM; end: YM | null; location?: string };

export const exl = {
  company: "EXL",
  location: "India",
  start: { y: 2020, m: 10 },
  // Newest first. `level` drives the career chart in the hero.
  roles: [
    { title: "AVP – Digital Analytics", short: "AVP", level: 4, start: { y: 2024, m: 10 }, end: null, location: "India" },
    { title: "Senior Manager – Digital Analytics", short: "Senior Manager", level: 3, start: { y: 2022, m: 7 }, end: { y: 2024, m: 10 }, location: "India" },
    { title: "Manager – Digital Analytics", short: "Manager", level: 2, start: { y: 2022, m: 2 }, end: { y: 2022, m: 7 } },
    { title: "Manager – Transformation and Solutioning", short: "Manager", level: 2, start: { y: 2020, m: 12 }, end: { y: 2022, m: 2 } },
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
  { org: "Subros Limited", title: "GET", start: { y: 2017, m: 7 }, end: { y: 2018, m: 5 }, location: "Manesar" },
];

export const education = [
  {
    school: "Indian Institute of Management, Calcutta",
    short: "IIM Calcutta",
    degree: "Master of Business Administration (MBA)",
    field: "Business Administration and Management, General",
    years: "2018 – 2020",
  },
  {
    school: "National Institute of Technology Kurukshetra",
    short: "NIT Kurukshetra",
    degree: "Bachelor's degree",
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
const avp = exl.roles[0].start;
export const traineeToAvpYears = avp.y - exl.start.y + (avp.m - exl.start.m) / 12;

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const inWords = (n: number) => WORDS[n] ?? String(n);
