import Link from "next/link";
import NegotiationsDisplay from "../components/NegotiationsDisplay";

export const metadata = {
  title: "Sauda — the agent that reads the room",
  description:
    "An OpenEnv-compliant negotiation agent with poker-style tells, Bayesian steering, and a 7GB-GPU stack. Beats LLM baselines by 3x.",
};

function Stat({
  value,
  label,
  sub,
  accent = "#A6E22E",
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div 
      className="group rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-transparent hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 100%, ${accent}, transparent 60%)` }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-md" style={{ color: accent }}>{value}</div>
        <div className="text-sm font-semibold tracking-wide text-white/90 uppercase">{label}</div>
        {sub ? <div className="text-xs text-white/50 mt-3 font-mono">{sub}</div> : null}
      </div>
    </div>
  );
}

function Pillar({
  n,
  title,
  body,
  accent = "#66D9EF"
}: {
  n: string;
  title: string;
  body: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(to bottom right, ${accent}, transparent)` }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}` }}
      />
      <div className="relative z-10">
        <div className="text-xs font-mono font-bold mb-4 tracking-widest uppercase" style={{ color: accent }}>PILLAR {n}</div>
        <div className="text-2xl font-bold mb-3 text-white tracking-tight">{title}</div>
        <div className="text-sm text-foreground/80 leading-relaxed font-medium">{body}</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-20 text-center flex flex-col items-center">
        <div className="text-xs font-mono text-[#E6DB74] bg-[#E6DB74]/10 border border-[#E6DB74]/20 px-3 py-1 rounded-full mb-6 inline-block backdrop-blur-sm">
          OPENENV HACKATHON · APR 2026
        </div>
        <h1 className="text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-[#F92672] via-[#AE81FF] to-[#66D9EF] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(249,38,114,0.3)]">
          Sauda
        </h1>
        <p className="text-xl text-white/80 max-w-3xl leading-relaxed font-medium">
          A negotiation agent that reads what the seller{" "}
          <em className="text-[#A6E22E] italic font-semibold">doesn&apos;t say</em>. Poker-style tells, Bayesian steering, and
          a full RL stack that runs on a 7&nbsp;GB consumer GPU.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <a
            href="#results"
            className="px-6 py-3 rounded-full bg-[#F92672] text-white text-sm font-semibold hover:bg-[#F92672]/90 shadow-[0_0_20px_rgba(249,38,114,0.3)] hover:shadow-[0_0_30px_rgba(249,38,114,0.5)] transition-all hover:-translate-y-0.5"
          >
            See results
          </a>
          <a
            href="https://github.com/paymybills/Sauda"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-0.5 box-content"
          >
            GitHub →
          </a>
        </div>
      </div>

      <div id="results" className="mb-14 scroll-mt-8">
        <h2 className="text-sm font-mono uppercase tracking-wider text-foreground/40 mb-4">
          Headline results
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="+131%" label="surplus vs rule-based" sub="amazon_realistic" accent="#A6E22E" />
          <Stat value="+916%" label="on read_the_tells" sub="0.041 → 0.418" accent="#F92672" />
          <Stat value="100%" label="deal rate" sub="all 3 task suites" accent="#66D9EF" />
          <Stat value="7 GB" label="total GPU footprint" sub="RTX 2050 class" accent="#E6DB74" />
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">What it is</h2>
        <div className="text-foreground/70 leading-relaxed space-y-3 max-w-3xl">
          <p>
            Sauda is an{" "}
            <span className="font-mono text-sm">OpenEnv</span>-compliant
            FastAPI environment for marketplace negotiation. The buyer agent
            gets text from the seller plus 12 observable <em>tells</em> —
            verbal urgency, deception cues, fidget level, condition wear — and
            has to decide what to bid, when to walk, and what to ignore.
          </p>
          <p>
            The product <em>is</em> the agent. The environment is what makes
            it possible to train.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">The stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Pillar
            n="01"
            title="NLP Tell Extractor"
            accent="#F92672"
            body={
              <>
                <span className="font-mono text-xs text-[#F92672] bg-[#F92672]/10 px-1 rounded">ministral-3:3b</span> reads
                each seller turn and emits 12 calibrated signals. Hinglish,
                English, and condition keywords all handled. Distinguishes
                genuine impatience from fake urgency.
              </>
            }
          />
          <Pillar
            n="02"
            title="Bayesian Steering"
            accent="#66D9EF"
            body={
              <>
                Post-hoc filter over the LLM buyer&apos;s raw action using a
                running posterior on seller flexibility. Adaptive fallback
                when the model goes off-script.
              </>
            }
          />
          <Pillar
            n="03"
            title="Synthetic Indian C2C Data"
            accent="#E6DB74"
            body={
              <>
                500 generated Hinglish WhatsApp-style negotiations: 485 deals,
                4 walks, 11 pending. Grounded in the CaSiNo strategy taxonomy
                and CraigslistBargains structure.
              </>
            }
          />
          <Pillar
            n="04"
            title="DPO Self-Improvement"
            accent="#A6E22E"
            body={
              <>
                Rule-based judge classifies failure modes
                (accepted-too-fast, walked-with-room, missed-deception).
                Repaired turns become DPO chosen pairs. Trained with{" "}
                <span className="font-mono text-xs text-[#A6E22E] bg-[#A6E22E]/10 px-1 rounded">trl.DPOTrainer</span> on
                the buyer base.
              </>
            }
          />
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">Eval (n=20 per task)</h2>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-sm">
            <thead className="bg-[#1E1E1E]/80 border-b border-white/10">
              <tr className="text-left text-white/50 tracking-wide uppercase text-xs">
                <th className="px-6 py-4 font-medium">Policy</th>
                <th className="px-6 py-4 font-medium">amazon_realistic</th>
                <th className="px-6 py-4 font-medium">read_the_tells</th>
                <th className="px-6 py-4 font-medium">career_10</th>
                <th className="px-6 py-4 font-medium">deal rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white/60">rule_based</td>
                <td className="px-6 py-4 font-mono">0.396</td>
                <td className="px-6 py-4 font-mono text-[#F92672]">0.041</td>
                <td className="px-6 py-4 font-mono">0.805</td>
                <td className="px-6 py-4 font-mono text-white/40">
                  95 / 5 / 100
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white/60">
                  baseline llama3.2:3b
                </td>
                <td className="px-6 py-4 font-mono text-[#F92672]">0.234</td>
                <td className="px-6 py-4 font-mono">0.308</td>
                <td className="px-6 py-4 font-mono text-[#F92672]">0.705</td>
                <td className="px-6 py-4 font-mono text-white/40">
                  100 / 65 / 100
                </td>
              </tr>
              <tr className="bg-[#66D9EF]/10 border-l-[3px] border-l-[#66D9EF] relative">
                <td className="px-6 py-4 font-bold text-[#66D9EF] tracking-wide">bestdealbot</td>
                <td className="px-6 py-4 font-mono font-bold text-white shadow-[0_0_10px_rgba(102,217,239,0.3)]">0.913</td>
                <td className="px-6 py-4 font-mono font-bold text-white shadow-[0_0_10px_rgba(102,217,239,0.3)]">0.418</td>
                <td className="px-6 py-4 font-mono font-bold text-white shadow-[0_0_10px_rgba(102,217,239,0.3)]">0.972</td>
                <td className="px-6 py-4 font-mono text-[#A6E22E] font-semibold">100 / 100 / 100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground/50 mt-3">
          Normalized surplus on a [0, 1] scale. Higher is better. Sauda
          dominates on every task and closes 100% of deals.
        </p>
      </div>

      <NegotiationsDisplay />

      <div className="mb-14 rounded-2xl border border-foreground/10 p-6 bg-foreground/[0.02]">
        <h2 className="text-xl font-semibold mb-3">Runs on your laptop</h2>
        <p className="text-foreground/70 leading-relaxed max-w-3xl">
          The whole stack — extractor, buyer, seller — fits in 7&nbsp;GB of
          VRAM. No API calls per turn. No per-episode billing. The agent that
          beats LLM baselines by 3× also costs less to run than a single GPT-4
          call. That is the point.
        </p>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">Trained on</h2>
        <ul className="text-foreground/70 space-y-2 text-sm">
          <li>
            <span className="font-mono">CraigslistBargains</span> — 42,081
            turns of human bargaining
          </li>
          <li>
            <span className="font-mono">Chicago HAI</span> — 5,679 turns, 2,348
            with non-default tell labels
          </li>
          <li>
            <span className="font-mono">CaSiNo</span> — 14,297 turns, strategy
            taxonomy
          </li>
          <li>
            <span className="font-mono">Indian C2C synthetic</span> — 500
            Hinglish WhatsApp negotiations
          </li>
        </ul>
      </div>

      <div className="border-t border-foreground/10 pt-6 text-xs text-foreground/40 flex flex-wrap gap-4 justify-between">
        <div>Sauda · OpenEnv hackathon submission · Apr 2026</div>
        <Link
          href="https://github.com/paymybills/Sauda"
          className="hover:text-foreground/70"
        >
          github →
        </Link>
      </div>
    </div>
  );
}
