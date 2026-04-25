import Link from "next/link";
import NegotiationsDisplay from "../components/NegotiationsDisplay";

export const metadata = {
  title: "MolBhav — the agent that reads the room",
  description:
    "An OpenEnv-compliant negotiation agent with poker-style tells, Bayesian steering, and a 7GB-GPU stack. Beats LLM baselines by 3x.",
};

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-foreground/70 mt-1">{label}</div>
      {sub ? <div className="text-xs text-foreground/40 mt-2">{sub}</div> : null}
    </div>
  );
}

function Pillar({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6 hover:border-foreground/20 transition">
      <div className="text-xs font-mono text-foreground/40 mb-2">PILLAR {n}</div>
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-sm text-foreground/70 leading-relaxed">{body}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-14">
        <div className="text-xs font-mono text-foreground/40 mb-3">
          OPENENV HACKATHON · APR 2026
        </div>
        <h1 className="text-6xl font-bold tracking-tight mb-4">MolBhav</h1>
        <p className="text-xl text-foreground/70 max-w-3xl leading-relaxed">
          A negotiation agent that reads what the seller{" "}
          <em>doesn&apos;t say</em>. Poker-style tells, Bayesian steering, and
          a full RL stack that runs on a 7&nbsp;GB consumer GPU.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <a
            href="#results"
            className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90"
          >
            See results
          </a>
          <a
            href="https://github.com/paymybills/MolBhav"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg border border-foreground/20 text-sm hover:bg-foreground/5"
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
          <Stat
            value="+131%"
            label="surplus vs rule-based"
            sub="amazon_realistic"
          />
          <Stat value="+916%" label="on read_the_tells" sub="0.041 → 0.418" />
          <Stat value="100%" label="deal rate" sub="all 3 task suites" />
          <Stat value="7 GB" label="total GPU footprint" sub="RTX 2050 class" />
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">What it is</h2>
        <div className="text-foreground/70 leading-relaxed space-y-3 max-w-3xl">
          <p>
            MolBhav is an{" "}
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
            body={
              <>
                <span className="font-mono text-xs">ministral-3:3b</span> reads
                each seller turn and emits 12 calibrated signals. Hinglish,
                English, and condition keywords all handled. Distinguishes
                genuine impatience from fake urgency.
              </>
            }
          />
          <Pillar
            n="02"
            title="Bayesian Steering"
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
            body={
              <>
                Rule-based judge classifies failure modes
                (accepted-too-fast, walked-with-room, missed-deception).
                Repaired turns become DPO chosen pairs. Trained with{" "}
                <span className="font-mono text-xs">trl.DPOTrainer</span> on
                the buyer base.
              </>
            }
          />
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">Eval (n=20 per task)</h2>
        <div className="overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full text-sm">
            <thead className="bg-foreground/[0.03]">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Policy</th>
                <th className="px-4 py-3 font-medium">amazon_realistic</th>
                <th className="px-4 py-3 font-medium">read_the_tells</th>
                <th className="px-4 py-3 font-medium">career_10</th>
                <th className="px-4 py-3 font-medium">deal rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              <tr>
                <td className="px-4 py-3 text-foreground/60">rule_based</td>
                <td className="px-4 py-3 font-mono">0.396</td>
                <td className="px-4 py-3 font-mono">0.041</td>
                <td className="px-4 py-3 font-mono">0.805</td>
                <td className="px-4 py-3 font-mono text-foreground/50">
                  95 / 5 / 100
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground/60">
                  baseline llama3.2:3b
                </td>
                <td className="px-4 py-3 font-mono">0.234</td>
                <td className="px-4 py-3 font-mono">0.308</td>
                <td className="px-4 py-3 font-mono">0.705</td>
                <td className="px-4 py-3 font-mono text-foreground/50">
                  100 / 65 / 100
                </td>
              </tr>
              <tr className="bg-foreground/[0.04]">
                <td className="px-4 py-3 font-semibold">bestdealbot</td>
                <td className="px-4 py-3 font-mono font-semibold">0.913</td>
                <td className="px-4 py-3 font-mono font-semibold">0.418</td>
                <td className="px-4 py-3 font-mono font-semibold">0.972</td>
                <td className="px-4 py-3 font-mono">100 / 100 / 100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground/50 mt-3">
          Normalized surplus on a [0, 1] scale. Higher is better. MolBhav
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
        <div>MolBhav · OpenEnv hackathon submission · Apr 2026</div>
        <Link
          href="https://github.com/paymybills/MolBhav"
          className="hover:text-foreground/70"
        >
          github →
        </Link>
      </div>
    </div>
  );
}
