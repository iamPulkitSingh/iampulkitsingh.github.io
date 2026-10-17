import { useRef, type ReactNode, type RefObject } from "react";
import { Award, BadgeCheck, Compass, FileScan, GraduationCap, SquareKanban, Sparkles, Trophy, Users } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { earlier, education, fmtRange, profile } from "@/profile";
import { Rise, eyebrow, h2, tile } from "./ui";

const skillIcons = [Compass, SquareKanban, Sparkles];
const beam = { pathColor: "#0E1A2B", pathOpacity: 0.1, pathWidth: 2, gradientStartColor: "#2B54D9", gradientStopColor: "#F0B35A", duration: 3.4 };

function Node({ nodeRef, children, big }: { nodeRef: RefObject<HTMLDivElement | null>; children: ReactNode; big?: boolean }) {
  return (
    <div
      ref={nodeRef}
      className={cn(
        "relative z-10 grid shrink-0 place-items-center rounded-full",
        big ? "size-20 bg-ink text-[22px] font-extrabold tracking-[-0.04em] text-white shadow-[0_18px_40px_-16px_rgba(14,26,43,0.7)]" : "size-12 bg-white text-accent shadow-[0_10px_24px_-12px_rgba(14,26,43,0.45)] ring-1 ring-ink/10",
      )}
    >
      {children}
    </div>
  );
}

function SkillsTile() {
  const box = useRef<HTMLDivElement>(null);
  const s0 = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const skillRefs = [s0, s1, s2];

  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className={eyebrow}>Top skills</p>
      <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink sm:text-[28px]">Product, delivery and generative AI.</h3>
      <div ref={box} className="relative mt-8 flex flex-1 flex-col items-center justify-between gap-12 sm:flex-row sm:gap-6 sm:px-2">
        <ul className="flex w-full justify-between gap-2 sm:w-auto sm:flex-col sm:gap-6">
          {profile.topSkills.map((s, i) => {
            const Icon = skillIcons[i];
            return (
              <li key={s} className="flex w-[30%] flex-col items-center gap-2 text-center sm:w-auto sm:flex-row sm:justify-end sm:gap-3 sm:text-right">
                <span className="text-[13px] leading-tight font-bold text-ink sm:text-[15px]">{s}</span>
                <Node nodeRef={skillRefs[i]}>
                  <Icon size={20} />
                </Node>
              </li>
            );
          })}
        </ul>
        <Node nodeRef={hub} big>
          {profile.initials}
        </Node>
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
          <Node nodeRef={out}>
            <FileScan size={20} />
          </Node>
          <span className="text-[13px] leading-tight font-bold text-ink sm:text-[15px]">
            AI/ML &amp; IDP products
            <span className="block text-[12.5px] font-semibold text-ink-soft">for insurance &amp; banking</span>
          </span>
        </div>
        {skillRefs.map((r, i) => (
          <AnimatedBeam key={i} containerRef={box} fromRef={r} toRef={hub} curvature={[24, 0, -24][i]} delay={i * 0.4} {...beam} />
        ))}
        <AnimatedBeam containerRef={box} fromRef={hub} toRef={out} delay={1.4} {...beam} />
      </div>
    </div>
  );
}

function ToolkitTile() {
  return (
    <div className="p-6 sm:p-8">
      <p className={eyebrow}>Toolkit</p>
      <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink">From requirements to rollout.</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {profile.skillGroups.map((g) => (
          <div key={g.name}>
            <p className="text-[12px] font-bold tracking-[0.06em] text-ink-soft uppercase">{g.name}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li key={it} className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-semibold text-ink">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsTile() {
  return (
    <div className="relative flex h-full flex-col bg-ink p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-accent/50 blur-3xl" aria-hidden />
      <p className="relative flex items-center gap-1.5 text-[13px] font-semibold text-[#AFC3FF]">
        <Trophy size={15} /> Awards at EXL
      </p>
      <ul className="relative mt-5 space-y-3">
        {profile.awards.map((a, i) => (
          <li key={a.name} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
            <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", i === 0 ? "bg-accent text-white" : "bg-white/10 text-[#AFC3FF]")}>
              {i === 0 ? <Trophy size={19} /> : <Award size={19} />}
            </span>
            <div>
              <p className="text-[16px] leading-tight font-extrabold tracking-[-0.02em]">{a.name}</p>
              <p className="mt-0.5 text-[13px] text-white/70 tabular-nums">{a.year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CertificationsTile() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className={eyebrow}>Certifications</p>
      <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink">Python, business analysis and Azure.</h3>
      <ul className="mt-6 space-y-3">
        {profile.certifications.map((c) => (
          <li key={c} className="flex items-start gap-3 rounded-2xl bg-mist/70 p-3.5">
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-[14.5px] leading-snug font-semibold text-ink">{c}</span>
          </li>
        ))}
      </ul>
      <BorderBeam size={140} duration={9} colorFrom="#2B54D9" colorTo="#F0B35A" borderWidth={2} />
    </div>
  );
}

function SchoolTile({ i }: { i: number }) {
  const e = education[i];
  const dark = i === 0;
  return (
    <div className={cn("relative flex h-full flex-col p-6 sm:p-8", dark ? "bg-ink text-white" : "")}>
      {dark && <div className="pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-accent/50 blur-3xl" aria-hidden />}
      <p className={cn("relative flex items-center gap-1.5 text-[13px] font-semibold", dark ? "text-[#AFC3FF]" : "text-accent")}>
        <GraduationCap size={15} /> {e.degree}
      </p>
      <h3 className={cn("relative mt-3 text-[34px] leading-[0.95] font-extrabold tracking-[-0.05em] sm:text-[40px]", dark ? "text-white" : "text-ink")}>{e.short}</h3>
      <p className={cn("relative mt-3 text-[14.5px] leading-snug", dark ? "text-white/80" : "text-ink-soft")}>{e.school}</p>
      <p className={cn("relative mt-auto pt-6 text-[15px] font-bold", dark ? "text-white" : "text-ink")}>{e.field}</p>
      <p className={cn("relative mt-0.5 text-[13.5px] tabular-nums", dark ? "text-white/70" : "text-ink-soft")}>{e.years}</p>
    </div>
  );
}

function CarpeDiemTile() {
  const c = earlier[0];
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className={cn(eyebrow, "flex items-center gap-1.5")}>
        <Users size={15} /> Leadership at IIM Calcutta
      </p>
      <div className="mt-4 flex items-start">
        <NumberTicker value={5000} className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.06em] text-ink sm:text-[72px]" />
        <span className="text-[36px] leading-none font-extrabold text-accent">+</span>
      </div>
      <p className="mt-2 text-[15px] font-bold text-ink">participants at Carpe Diem</p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        {c.title} of the institute's three-day festival, drawing students from IIMs, IITs, NITs and local colleges.
      </p>
      <p className="mt-auto pt-5 text-[13px] font-semibold text-ink-soft">{fmtRange(c.start, c.end)}</p>
    </div>
  );
}

export function ProfileBento() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="max-w-3xl">
          <p className={eyebrow}>Skills &amp; education</p>
          <h2 id="skills-title" className={cn(h2, "mt-2")}>
            An engineer's base, <span className="text-haze">an MBA's lens.</span>
          </h2>
        </Rise>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Rise className={cn(tile, "lg:col-span-2")}>
            <SkillsTile />
          </Rise>
          <Rise delay={0.06} className={tile}>
            <AwardsTile />
          </Rise>
          <Rise className={cn(tile, "lg:col-span-2")}>
            <ToolkitTile />
          </Rise>
          <Rise delay={0.06} className={tile}>
            <CertificationsTile />
          </Rise>
          <Rise id="education" delay={0.04} className={cn(tile, "scroll-mt-24")}>
            <SchoolTile i={0} />
          </Rise>
          <Rise delay={0.08} className={tile}>
            <SchoolTile i={1} />
          </Rise>
          <Rise delay={0.12} className={tile}>
            <CarpeDiemTile />
          </Rise>
        </div>
      </div>
    </section>
  );
}
