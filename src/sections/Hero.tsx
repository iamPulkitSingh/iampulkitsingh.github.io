import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { NOW, education, exl, exlYears, inWords, profile, traineeToAvpYears, type YM } from "@/profile";
import { Chip, EmailCTA, LinkedInIcon, OpenDot, ring } from "./ui";

/* ------------------------------------------------------- career chart maths */

const t = (ym: YM) => (ym.y - exl.start.y) * 12 + (ym.m - exl.start.m);
const tNow = Math.max(t(NOW), 1);
const X = (ym: YM) => 4 + (t(ym) / tNow) * 84; // % across, room on the right for the "Now" pill
const Y = (level: number) => [0, 84, 62, 40, 18][level]; // % down

const steps = [...exl.roles].reverse(); // oldest first
const linePath = steps
  .map((r, i) => (i === 0 ? `M ${X(r.start)} ${Y(r.level)}` : `H ${X(r.start)} V ${Y(r.level)}`))
  .join(" ")
  .concat(` H ${X(NOW)}`);
const areaPath = `${linePath} V 100 H ${X(steps[0].start)} Z`;
const years = Array.from({ length: NOW.y - exl.start.y }, (_, i) => exl.start.y + 1 + i);

const DRAW_DELAY = 0.9;
const DRAW_TIME = 1.6;

// Where each point's label sits relative to its dot.
function labelFor(i: number) {
  const r = steps[i];
  const prev = steps[i - 1];
  if (i === 0) return { text: r.short, cls: "translate-x-2 translate-y-2" };
  if (prev && prev.level === r.level) return { text: "→ Digital Analytics", cls: "translate-x-2 translate-y-2 font-semibold text-ink-soft" };
  if (r.short === "Senior Manager")
    return {
      text: (
        <>
          <span className="sm:hidden">Sr Manager</span>
          <span className="hidden sm:inline">Senior Manager</span>
        </>
      ),
      cls: "translate-x-2 -translate-y-[130%]",
    };
  return { text: r.short, cls: "translate-x-2 -translate-y-[130%]" };
}

function CareerChart() {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="relative h-[200px] sm:h-[230px]">
        {/* level guides */}
        {[1, 2, 3, 4].map((l) => (
          <span key={l} className="absolute inset-x-0 border-t border-dashed border-ink/[0.08]" style={{ top: `${Y(l)}%` }} aria-hidden />
        ))}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ delay: DRAW_DELAY, duration: DRAW_TIME, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="career-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2B54D9" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2B54D9" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="career-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2B54D9" />
                <stop offset="100%" stopColor="#2B54D9" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#career-area)" />
            <path d={linePath} fill="none" stroke="url(#career-line)" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>

        {steps.map((r, i) => {
          const x = X(r.start);
          const current = !r.end;
          const label = labelFor(i);
          const delay = DRAW_DELAY + (DRAW_TIME * x) / 100;
          return (
            <motion.div
              key={r.title}
              className="absolute"
              style={{ left: `${x}%`, top: `${Y(r.level)}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
            >
              <span className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-[2.5px] ring-accent", current ? "size-3.5" : "size-2.5")} title={r.title} />
              {current && <span className="animate-ping-slow absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40" aria-hidden />}
              {current ? (
                <span className="absolute flex -translate-y-[150%] translate-x-2.5 items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgba(14,26,43,0.6)]">
                  {r.short} <span className="rounded-full bg-white/15 px-1.5 text-[10.5px] font-semibold">Now</span>
                </span>
              ) : (
                <span className={cn("absolute text-[11.5px] font-bold whitespace-nowrap text-ink sm:text-[12.5px]", label.cls)}>{label.text}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="relative mt-2 h-4 border-t border-ink/[0.08]" aria-hidden>
        {years.map((y) => (
          <span key={y} className="absolute top-1.5 -translate-x-1/2 text-[11px] font-semibold text-ink-soft/80 tabular-nums" style={{ left: `${X({ y, m: 1 })}%` }}>
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

function Kpi({ label, value, unit, delay }: { label: string; value: number; unit?: string; delay: number }) {
  return (
    <div className="rounded-2xl bg-mist/70 px-3 py-3 sm:px-4">
      <p className="text-[11.5px] font-semibold text-ink-soft sm:text-[12px]">{label}</p>
      <p className="mt-1 flex items-baseline gap-1">
        <NumberTicker value={value} delay={delay} className="text-[28px] leading-none font-extrabold tracking-[-0.05em] text-ink sm:text-[34px]" />
        {unit && <span className="text-[13px] font-bold text-ink-soft">{unit}</span>}
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="rounded-[28px] bg-white p-4 ring-1 ring-ink/[0.06] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-ink/10" />
            <span className="size-2.5 rounded-full bg-ink/10" />
            <span className="size-2.5 rounded-full bg-ink/10" />
          </span>
          <span className="ml-1 font-mono text-[12px] text-ink-soft">career.overview</span>
        </div>
        <Chip className="bg-accent-soft text-accent">
          {exl.company} · {exl.location}
        </Chip>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <Kpi label="Years at EXL" value={exlYears} unit="yrs" delay={0.6} />
        <Kpi label="Roles at EXL" value={exl.roles.length} delay={0.75} />
        <Kpi label="To AVP in" value={Math.round(traineeToAvpYears)} unit="yrs" delay={0.9} />
      </div>
      <div className="mt-5 px-1 pb-1">
        <CareerChart />
      </div>
    </div>
  );
}

function Floating({ side, top, delay, children }: { side: "left" | "right"; top: string; delay: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9, x: side === "left" ? 24 : -24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
      className={cn(
        "absolute z-20 hidden w-[232px] rounded-[22px] bg-white/90 p-4 text-left shadow-[0_24px_50px_-24px_rgba(14,26,43,0.35)] ring-1 ring-ink/5 backdrop-blur xl:block",
        side === "left" ? "right-[calc(100%+32px)]" : "left-[calc(100%+32px)]",
      )}
      style={{ top }}
    >
      {children}
    </motion.div>
  );
}

function IconBadge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("grid size-10 shrink-0 place-items-center rounded-2xl bg-mist text-accent", className)}>{children}</span>;
}

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
  };
  const line1 = profile.name.split(" ");
  const line2 = profile.title.split(" ");
  const [iim, nit] = education;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate scroll-mt-24 overflow-hidden pt-12 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-[42%] -z-10 mx-auto h-[620px] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(43,84,217,0.16),transparent)]" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft shadow-[0_8px_24px_-16px_rgba(14,26,43,0.4)] ring-1 ring-ink/5"
        >
          {profile.openToWork ? (
            <>
              <OpenDot /> Open to new roles · {profile.location}
            </>
          ) : (
            <>
              <MapPin size={13} className="text-accent" /> Based in {profile.location}
            </>
          )}
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
          className="mx-auto mt-6 max-w-5xl text-[46px] leading-[0.98] font-extrabold tracking-[-0.055em] text-ink sm:text-[72px] lg:text-[88px]"
        >
          <span className="sr-only">
            {profile.name}, {profile.title}
          </span>
          {line1.map((w) => (
            <motion.span key={w} variants={item} className="mr-[0.22em] inline-block last:mr-0" aria-hidden>
              {w}
            </motion.span>
          ))}
          <br />
          {line2.map((w) => (
            <motion.span key={w} variants={item} className="mr-[0.22em] inline-block text-haze last:mr-0" aria-hidden>
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            <span className="capitalize">{inWords(exlYears)}</span> years at EXL, from management trainee to AVP. Before that, an MBA from IIM Calcutta and a mechanical
            engineering degree from NIT Kurukshetra.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <EmailCTA />
            <div className="flex gap-3">
              <a
                href="#experience"
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink shadow-[0_8px_24px_-16px_rgba(14,26,43,0.4)] ring-1 ring-ink/10 transition-colors hover:bg-accent-soft",
                  ring,
                )}
              >
                See experience
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className={cn(
                  "grid size-12 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_-16px_rgba(14,26,43,0.4)] ring-1 ring-ink/10 transition-colors hover:bg-accent-soft hover:text-accent",
                  ring,
                )}
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
          <p className="mt-5 text-[13px] font-medium text-ink-soft">Top skills · {profile.topSkills.join(" · ")}</p>
        </motion.div>
      </div>

      {/* dashboard stage */}
      <div className="relative mx-auto mt-14 w-full max-w-[600px] px-4 pb-14 sm:mt-16 sm:pb-20 sm:px-0" style={{ perspective: 1400 }}>
        <motion.div
          initial={reduce ? false : { y: 140, rotateX: 18, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.45 }}
          className="relative z-10 drop-shadow-[0_50px_60px_rgba(14,26,43,0.22)]"
        >
          <Dashboard />
        </motion.div>
        <div className="absolute inset-x-10 bottom-16 h-10 rounded-[50%] bg-ink/15 blur-2xl" aria-hidden />

        <Floating side="left" top="10%" delay={1.4}>
          <div className="flex items-center gap-3">
            <IconBadge>
              <GraduationCap size={18} />
            </IconBadge>
            <div>
              <p className="text-[14px] font-bold text-ink">{iim.short}</p>
              <p className="text-[12px] text-ink-soft">MBA · {iim.years}</p>
            </div>
          </div>
        </Floating>
        <Floating side="left" top="56%" delay={1.65}>
          <div className="flex items-center gap-3">
            <IconBadge>
              <GraduationCap size={18} />
            </IconBadge>
            <div>
              <p className="text-[14px] font-bold text-ink">{nit.short}</p>
              <p className="text-[12px] text-ink-soft">
                {nit.field} · {nit.years.replace(/ /g, "")}
              </p>
            </div>
          </div>
        </Floating>
        <Floating side="right" top="14%" delay={1.5}>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-accent">
            <Sparkles size={13} /> Top skill
          </p>
          <p className="mt-1 text-[24px] leading-none font-extrabold tracking-[-0.04em] text-ink">{profile.topSkills[0]}</p>
          <p className="mt-2 text-[12.5px] text-ink-soft">with {profile.topSkills.slice(1).join(" and ").toLowerCase()}</p>
        </Floating>
        <Floating side="right" top="60%" delay={1.8}>
          <div className="flex items-center gap-3">
            <IconBadge>
              <BadgeCheck size={18} />
            </IconBadge>
            <div>
              <p className="text-[14px] font-bold text-ink">Microsoft certified</p>
              <p className="text-[12px] text-ink-soft">Azure Fundamentals</p>
            </div>
          </div>
        </Floating>
      </div>
    </section>
  );
}
