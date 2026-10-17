import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { MapPin } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { earlier, exl, exlMonths, fmtDuration, fmtRange, inWords, monthsBetween, organisations, traineeToAvpYears } from "@/profile";
import { Chip, Rise, eyebrow, h2, tile } from "./ui";

export function OrgBand() {
  return (
    <section aria-label="Where Pulkit has worked and studied" className="border-y border-ink/[0.06] bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-5 sm:flex-row sm:gap-6 sm:px-6">
        <p className="shrink-0 text-[12px] font-semibold tracking-[0.08em] text-ink-soft uppercase">Worked &amp; studied at</p>
        <Marquee pauseOnHover repeat={4} className="w-full [--duration:32s] [--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {organisations.map((o) => (
            <span key={o} className="flex items-center gap-2.5 text-[17px] font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink/75">
              <span className="size-1.5 rounded-full bg-accent/60" aria-hidden />
              {o}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative">
      <span className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded-full bg-ink/[0.08]" aria-hidden />
      <motion.span
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute top-3 bottom-3 left-[11px] w-0.5 origin-top rounded-full bg-gradient-to-b from-accent to-amber"
        aria-hidden
      />
      {exl.roles.map((r) => {
        const current = !r.end;
        return (
          <li key={r.title} className="relative grid grid-cols-[24px_1fr] gap-4 pb-8 last:pb-0">
            <span className={cn("relative z-10 mt-0.5 grid size-6 place-items-center rounded-full bg-white ring-2", current ? "ring-accent" : "ring-ink/15")}>
              <span className={cn("size-2 rounded-full", current ? "bg-accent" : "bg-ink/30")} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h4 className="text-[18px] leading-snug font-extrabold tracking-[-0.03em] text-ink sm:text-[20px]">{r.title}</h4>
                {current && <Chip className="bg-accent-soft text-accent">Current</Chip>}
              </div>
              <p className="mt-1 text-[14px] text-ink-soft">
                {fmtRange(r.start, r.end)} · {fmtDuration(monthsBetween(r.start, r.end))}
                {r.location && <> · {r.location}</>}
              </p>
              {r.summary && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">{r.summary}</p>}
              {r.highlights && (
                <ul className="mt-3 max-w-2xl space-y-2">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                      <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="max-w-3xl">
          <p className={eyebrow}>Experience</p>
          <h2 id="exp-title" className={cn(h2, "mt-2")}>
            Management trainee to AVP <span className="text-haze">in {inWords(Math.round(traineeToAvpYears))} years.</span>
          </h2>
        </Rise>

        <Rise className={cn(tile, "mt-10 grid gap-8 overflow-visible p-6 sm:p-8 lg:grid-cols-[280px_1fr] lg:gap-14 lg:p-10")}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="grid size-14 place-items-center rounded-2xl bg-ink text-[15px] font-extrabold tracking-[-0.02em] text-white" aria-hidden>
              {exl.company}
            </div>
            <h3 className="mt-4 text-[30px] leading-none font-extrabold tracking-[-0.045em] text-ink">{exl.company}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-[14px] text-ink-soft">
              <MapPin size={14} /> {exl.location}
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-1">
              <div className="rounded-2xl bg-mist/70 p-4">
                <p className="text-[12px] font-semibold text-ink-soft">Time at EXL</p>
                <p className="mt-1 text-[20px] font-extrabold tracking-[-0.03em] text-ink">{fmtDuration(exlMonths)}</p>
              </div>
              <div className="rounded-2xl bg-mist/70 p-4">
                <p className="text-[12px] font-semibold text-ink-soft">Roles held</p>
                <NumberTicker value={exl.roles.length} className="mt-1 text-[20px] font-extrabold tracking-[-0.03em] text-ink" />
              </div>
            </div>
          </div>
          <Timeline />
        </Rise>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {earlier.map((e, i) => (
            <Rise key={e.org} delay={i * 0.06} className={cn(tile, "flex flex-col p-6 sm:p-7")}>
              <p className={eyebrow}>{fmtRange(e.start, e.end)}</p>
              <h3 className="mt-2 text-[20px] leading-tight font-extrabold tracking-[-0.035em] text-ink">{e.title}</h3>
              <p className="mt-1 text-[15px] font-semibold text-ink">{e.org}</p>
              {e.note && <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{e.note}</p>}
              <p className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] text-ink-soft">
                <MapPin size={13} /> {e.location} · {fmtDuration(monthsBetween(e.start, e.end))}
              </p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
