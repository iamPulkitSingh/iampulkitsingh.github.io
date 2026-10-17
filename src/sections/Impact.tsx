import { motion, useReducedMotion } from "motion/react";
import { Gauge, Percent, Timer, TrendingUp, Wallet } from "lucide-react";
import { type ReactNode } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { impact } from "@/profile";
import { Rise, eyebrow, h2, tile } from "./ui";

const big = "text-[64px] leading-[0.85] font-extrabold tracking-[-0.06em] text-ink sm:text-[76px]";

function Label({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className={cn(eyebrow, "flex items-center gap-1.5")}>
      {icon} {children}
    </p>
  );
}

/** Before/after bars: the baseline sits still, the new range grows into place. */
function AccuracyBars() {
  const reduce = useReducedMotion();
  const [lo, hi] = impact.accuracy.to;
  const grow = (to: number, delay: number) => ({
    initial: reduce ? false : { width: "0%" },
    whileInView: { width: `${to}%` },
    viewport: { once: true, margin: "0px 0px -60px 0px" },
    transition: { type: "spring" as const, stiffness: 60, damping: 18, delay },
  });
  return (
    <div className="mt-8 space-y-5" role="img" aria-label={`Model accuracy rose from ${impact.accuracy.from}% to ${lo}–${hi}%`}>
      <div>
        <div className="flex justify-between text-[13px] font-semibold text-ink-soft">
          <span>Before</span>
          <span className="tabular-nums">{impact.accuracy.from}%</span>
        </div>
        <div className="mt-2 h-4 overflow-hidden rounded-full bg-mist">
          <motion.div {...grow(impact.accuracy.from, 0.1)} className="h-full rounded-full bg-ink/25" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[13px] font-semibold text-ink">
          <span>After</span>
          <span className="tabular-nums">
            {lo}–{hi}%
          </span>
        </div>
        <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-mist">
          <motion.div {...grow(hi, 0.35)} className="h-full rounded-full bg-gradient-to-r from-accent/80 via-accent to-[#5B7CF0]" />
          {/* the 85–95 band, so the range reads as a range */}
          <span className="absolute inset-y-0 border-l-2 border-white/80" style={{ left: `${lo}%` }} aria-hidden />
        </div>
        <div className="relative mt-1.5 h-4 text-[11px] font-semibold text-ink-soft tabular-nums" aria-hidden>
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${t}%` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="scroll-mt-20 pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="max-w-3xl">
          <p className={eyebrow}>Impact</p>
          <h2 id="impact-title" className={cn(h2, "mt-2")}>
            Results, <span className="text-haze">not just roadmaps.</span>
          </h2>
        </Rise>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Rise className={cn(tile, "p-6 sm:p-8 lg:col-span-2")}>
            <Label icon={<Gauge size={15} />}>Model accuracy</Label>
            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
              <p className={big}>
                <NumberTicker value={impact.accuracy.to[1]} className="text-ink" />%
              </p>
              <p className="pb-1.5 text-[18px] leading-tight font-extrabold tracking-[-0.03em] text-ink">
                at best, <span className="text-haze">up from {impact.accuracy.from}%</span>
              </p>
            </div>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              Across multiple AI/IDP deployments, by aligning data science teams with business logic, validation rules and what clients expected to see.
            </p>
            <AccuracyBars />
          </Rise>

          <Rise delay={0.06} className={cn(tile, "flex flex-col p-6 sm:p-8")}>
            <Label icon={<TrendingUp size={15} />}>Pipeline as AVP</Label>
            <p className={cn(big, "mt-4 flex items-start")}>
              <span className="mt-1 text-[36px] text-accent">$</span>
              <NumberTicker value={impact.pipeline} decimalPlaces={1} className="text-ink" />
              <span className="mt-1 text-[36px] text-accent">M</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Through product demos, capability showcases and new lines of business.</p>
            <ul className="mt-auto space-y-2 pt-6">
              <li className="flex items-center justify-between gap-3 rounded-2xl bg-mist/70 px-4 py-3">
                <span className="text-[13.5px] font-semibold text-ink-soft">Qualified pipeline, as Sr Manager</span>
                <span className="text-[16px] font-extrabold tracking-[-0.02em] text-ink">${impact.pipelineEarlier}M</span>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-2xl bg-mist/70 px-4 py-3">
                <span className="text-[13.5px] font-semibold text-ink-soft">Revenue enabled</span>
                <span className="text-[16px] font-extrabold tracking-[-0.02em] text-ink">${impact.revenue}</span>
              </li>
            </ul>
            <BorderBeam size={140} duration={9} colorFrom="#2B54D9" colorTo="#F0B35A" borderWidth={2} />
          </Rise>

          <Rise delay={0.04} className={cn(tile, "p-6 sm:p-8")}>
            <Label icon={<Timer size={15} />}>Productivity</Label>
            <p className={cn(big, "mt-4")}>{impact.productivity}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Gains for end users across several clients, from workflow redesign, product enhancements and automation.</p>
          </Rise>

          <Rise delay={0.08} className={cn(tile, "bg-ink p-6 text-white sm:p-8")}>
            <div className="pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-accent/50 blur-3xl" aria-hidden />
            <p className="relative flex items-center gap-1.5 text-[13px] font-semibold text-[#AFC3FF]">
              <Percent size={15} /> Gross margin
            </p>
            <p className="relative mt-4 flex items-start text-[64px] leading-[0.85] font-extrabold tracking-[-0.06em] sm:text-[76px]">
              <span className="mt-1 mr-1 text-[36px] text-[#AFC3FF]">&gt;</span>
              <NumberTicker value={impact.margin} className="text-white" />
              <span className="mt-1 text-[36px] text-[#AFC3FF]">%</span>
            </p>
            <p className="relative mt-3 text-[15px] leading-relaxed text-white/80">Held with 95% adherence through scope control, delivery governance and capacity planning.</p>
          </Rise>

          <Rise delay={0.12} className={cn(tile, "p-6 sm:p-8")}>
            <Label icon={<Wallet size={15} />}>FTE savings</Label>
            <p className={cn(big, "mt-4 flex items-start")}>
              <NumberTicker value={impact.fteSavings} decimalPlaces={1} className="text-ink" />
              <span className="mt-1 text-[36px] text-accent">%</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Above the contractual target for a major insurance client, by modernising workflows and automating at scale.</p>
          </Rise>
        </div>
      </div>
    </section>
  );
}
