/**
 * EN page-level data, grouped per section.
 *
 * Trusted runtime data source for the EN page. Each top-level export matches
 * the corresponding section component's prop shape so `PortfolioPage` can
 * spread it directly. MDX shells (content/en/*.mdx) remain Stage 4 structure
 * scaffolds, not public copy sources.
 *
 * Anti-Pattern G: 직역 금지. §1·§3·§4·§5·§6·§9·§11 은 시장-맥락 표현으로 재작성;
 * §2·§8·§10 같은 객관 서술/표는 KO 와 거의 1:1 도 허용.
 *
 * Tone gates: §4 team-1pp / §5 solo-1ps / §6 proposal-1ps — KO 와 동일.
 */
export const hero = {
  chips: [
    'Industrial Fleet · 700+ vehicles',
    'InfluxDB / Converter',
    'untamedai.me',
    'LLM product ops (Polar flow validated)',
  ] as const,
  ctas: [
    { label: 'Proof Cases', href: '#proof-case-a' },
    { label: 'Resume PDF', href: '/resume/woon_jang_en.pdf' },
    { label: 'Contact', href: 'mailto:dj4ngb0g0h@gmail.com' },
  ] as const,
  proofSnapshot: [
    {
      title: 'Team system',
      body: 'EV fleet telemetry pipeline, 1y5m operation (700+ vehicles).',
    },
    {
      title: 'Solo product',
      body: 'untamedai.me planned, built, deployed, and operated end to end as one owner.',
    },
    {
      title: 'Target systems',
      body: 'Robot-manufacturing data and existing-manufacturing AI workflows built on the same primitives.',
    },
  ] as const,
  headline: (
    <>
      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        Industrial Telemetry → Manufacturing AI Data Systems
      </span>
      <span className="text-accent">Physical AI / Manufacturing Data Systems</span>
    </>
  ),
  subhead: (
    <>
      I build telemetry pipelines that turn noisy industrial signals into production evidence,
      and I operate LLM products end to end.
      <span className="mt-3 block text-sm text-fg-subtle md:text-base">
        Proof: 1y5m industrial fleet telemetry team work across a 700+ vehicle fleet, InfluxDB / Converter ownership, and
        untamedai.me planned, built, deployed, and operated solo.
      </span>
    </>
  ),
}

export const bottleneck = {
  title: 'Data pipelines are the production bottleneck',
  lede: (
    <>
      <span className="block text-base text-fg">Models open up. Data pipelines don’t.</span>
      <span className="mt-2 block text-pretty">
        RT-2, GR00T, Cosmos, π0 — foundation models keep moving. What blocks the path to production is
        not the model but the data pipeline. And the people who have built data pipelines rarely overlap
        with the people who have run LLM products.
      </span>
    </>
  ),
  cards: [
    {
      title: 'Multi-source temporal alignment',
      body: 'A humanoid carries 30+ joints, a fab has dozens of chambers, a steel line has N machines — each emits on its own clock. If the timestamps cannot be reconciled, training data is not training data.',
    },
    {
      title: 'Fragmented industrial protocols',
      body: 'Many major industrial interfaces arrive as fragments or asynchronous streams: CAN ISO-TP multi-frame, ROS2 chunked payloads, and OPC-UA / MTConnect streams. Register-style protocols are handled differently; the pipeline makes fragmentation, timing variance, and loss explicit per source.',
    },
    {
      title: 'Heterogeneous device fleets',
      body: 'Humanoids, AMRs, and cobots in one fleet. Five PLC vendors on one line. The lifeline of operations is a schema-registry that absorbs new devices without redeploys.',
    },
    {
      title: 'One substrate must feed two outlets',
      body: 'When the production-monitoring stack and the model-training stack live on different systems, the resulting distribution mismatch becomes permanent debt. The same pipeline has to feed both outlets.',
    },
  ] as const,
}

export const primitives = {
  title: 'Three reusable industrial data primitives',
  lede: 'Three pillars proven on an industrial vehicle fleet. They port directly into robot manufacturing and traditional manufacturing.',
  blockLabels: { verifiedEnv: 'Verified env', robotics: 'Robot manufacturing', manufacturing: 'Existing manufacturing' },
  primitives: [
    {
      id: 'P1',
      title: 'Fragmented Stream Reassembly',
      caption: 'Diagram — sparse arrival fragments → mask bitmap → reassembled signal.',
      verifiedEnv:
        'Industrial vehicle CAN ISO-TP — First Frame(0x10), Consecutive Frame 4-bit SN wraparound(0x21..0x2F → 0x20), and receiver Flow Control(0x30) tracked separately. Mask-bitmap partial fill inside a timeline window derived from PID period and jitter distribution, with bounded memory.',
    },
    {
      id: 'P2',
      title: 'Multi-Source Temporal Alignment',
      caption: 'Diagram — four async channels aligned at a common reference column.',
      verifiedEnv:
        'Master 1·2 and Slave 1·2 four-pack BMS — each pack’s V·I arrives asynchronously under independent PIDs. Window size is derived from signal PID period and jitter distribution, then values are aligned and summed across four packs for instantaneous power.',
    },
    {
      id: 'P3',
      title: 'Schema-Driven Device Decoder',
      caption: 'Diagram — heterogeneous raw sources → adapter → canonical event (schema-registry contract).',
      verifiedEnv:
        'Per-vehicle signal mappings expressed as a single Excel sheet. Expression DSL → AST whitelist evaluation + compile-cache.',
    },
  ] as const,
}

export const proofCaseA = {
  title: 'Case A — industrial fleet telemetry pipeline',
  ownContribution: 'mqtt → InfluxDB Converter refactor · expression-evaluation visualization · Celery module ops',
  operationPeriod: '1 year 5 months',
  summary: [
    {
      label: 'Problem',
      value: 'Industrial fleet telemetry across 700+ vehicles arrives fragmented, asynchronous, and model-specific; raw payloads have to become production evidence.',
    },
    {
      label: 'Role',
      value: 'Team delivery. Stated scope: InfluxDB ops, mqtt → InfluxDB Converter refactor, expression-evaluation visualization, and Celery module ops.',
    },
    {
      label: 'System',
      value: 'Webhook ingest, Bridge InfluxDB as raw-hex landing/replay storage, multi-process converter, measurement InfluxDB, Celery batch, Avro/GCS output.',
    },
    {
      label: 'Transfer',
      value: 'The same P1-P3 primitives map to robot teleop data, manufacturing-line telemetry, and foundation-data pipelines.',
    },
    {
      label: 'Proof',
      value: '1 year 5 months of production operation across a 700+ vehicle fleet. Pipeline performance validated through a heterogeneous asynchronous telemetry load test at 7,000 events/sec (7k TPS).',
    },
  ] as const,
  lede: (
    <>
      <span className="block text-base text-fg">
        Industrial vehicle fleet telemetry pipeline (700+ vehicles).
      </span>
      <span className="mt-2 block text-pretty">
        A 4-tier distributed telemetry system delivered as part of a team for a 700+ vehicle production fleet. The data-processing modules listed below were my contribution.
      </span>
    </>
  ),
  body: (
    <>
      <pre className="mb-4 overflow-x-auto rounded-sm border border-border bg-bg-subtle p-3 font-mono text-[11px] leading-relaxed text-fg-subtle">
{`[vehicle terminal] → Webhook → Bridge InfluxDB
  → V2InfluxConverterProcess (multi-process)
  → Measurement InfluxDB → Celery batch → Avro/GCS`}
      </pre>
      <p className="mb-4 text-[13px] leading-relaxed text-fg-muted">
        Bridge InfluxDB was not a Kafka replacement; it acted as a time-series landing / replay
        layer for raw hex payloads so failed conversions could be reprocessed. The converter then
        normalized those payloads into measurement InfluxDB. The pipeline was designed and tested
        to absorb a 7,000 events/sec asynchronous event-stream load without becoming the bottleneck.
      </p>
      <div className="mb-4 rounded-md border border-border bg-bg-subtle p-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          Load-test boundary
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] leading-relaxed text-fg-muted">
          <li>Fleet scale: 700+ vehicles in production</li>
          <li>Throughput: 7k events/sec synthetic heterogeneous telemetry</li>
          <li>Stage: raw landing → converter normalization → measurement write path</li>
          <li>Validation: parser stability, bounded memory, replay path</li>
          <li>Not claimed: Kafka-style consumer groups or exactly-once semantics</li>
        </ul>
      </div>
      <ul className="mb-6 flex list-disc flex-col gap-1 pl-5 text-fg-muted">
        <li>Tier 1 (ingest): Django / Flask webhook · raw hex payload preserved</li>
        <li>Tier 2 (decode): ISO-TP reassembly + expression DSL + 4-pack BMS alignment</li>
        <li>Tier 3 (analytics): Celery module plug-ins (summary / driving_score / submatrix / avro)</li>
        <li>Tier 4 (output): measurement InfluxDB + Avro on GCS</li>
      </ul>
      <div className="mb-6 rounded-md border border-border bg-bg-subtle p-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          Production reliability
        </div>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[13px] leading-relaxed text-fg-muted">
          <li>
            <span className="text-fg">Failure-time reprocessing SLA operated in production.</span>{' '}
            When the converter or measurement-tier InfluxDB hit transient outages, Bridge InfluxDB&apos;s
            raw-hex landing layer drove an automatic replay path within the defined SLA.
          </li>
          <li>
            <span className="text-fg">Metadata DB on MHA (MySQL High Availability) for zero-loss
            operation.</span>{' '}
            Automatic failover under master failures, with no data loss in production.
          </li>
        </ul>
      </div>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
        Why this transfers to robot / manufacturing
      </div>
      <div className="overflow-x-auto rounded-sm border border-border bg-bg-elevated">
      <table className="w-full border-collapse text-left">
        <thead className="bg-bg-subtle">
          <tr className="border-b border-border">
            <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
              Industrial vehicle fleet
            </th>
            <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
              Robot / manufacturing
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">4-pack BMS async signals per vehicle</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">30+ joints + F/T + vision per robot · N machines per line</td>
          </tr>
          <tr className="border-b border-border bg-bg-subtle">
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">CAN ISO-TP multi-frame</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">ROS2 chunked / OPC-UA chunked</td>
          </tr>
          <tr>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">Per-model .dbc / Excel DSL</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">Per-robot URDF / per-PLC vendor protocol</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  ),
}

export const proofCaseB = {
  title: 'Case B — untamedai.me LLM product',
  summary: [
    {
      label: 'Problem',
      value: 'An LLM companion needs memory, safety, payment, and operating-cost control, not a single model call.',
    },
    {
      label: 'Role',
      value: 'Solo owner across product planning, system design, build, deployment, and daily operations.',
    },
    {
      label: 'System',
      value: 'Next.js · FastAPI · Supabase · Cloudflare · PostgreSQL · Claude Opus · GPT 5.x · Polar (payments) · production monitoring loops.',
    },
    {
      label: 'Transfer',
      value: 'LLM ops maps to VLA instruction curation and operator-assistant RAG over manufacturing logs and SOPs.',
    },
    {
      label: 'Proof',
      value: '1 year live operation · 1 solo owner · 2 production routes · free tier in production; paid tier with Polar payment system integration and sandbox validation completed.',
    },
  ] as const,
  stages: [
    {
      title: 'Plan',
      body: 'Differentiated concept (the Little Prince fox metaphor + emotional memory), user personas, free / paid (SOULMATE) tier design, copy and brand voice. Product decision = business decision = ops-cost decision, treated as one.',
    },
    {
      title: 'Architecture',
      body: 'Memory architecture (short-term context / long-term vector / summary store layered), MBTI-inference consistency, emotion-calendar color mapping, safety guardrails. The system is not one model call — it is memory + session + safety wired together.',
    },
    {
      title: 'Build',
      body: 'Next.js frontend · Python FastAPI backend · Supabase + PostgreSQL · Cloudflare hosting · Claude Opus + GPT 5.x for LLMs · Polar for payments — solo full-stack.',
    },
    {
      title: 'Deploy',
      body: 'Hosting · CI/CD · domain (untamedai.me + multilingual routing — /samakyeowoo for Korean SEO) · TLS · monitoring channels.',
    },
    {
      title: 'Operate',
      body: 'Token-cost discipline (for a solo operator, tokens = runway), moderation balance (Korean AI sensitivity post-Iruda), inflow monitoring, iterative-improvement decisions.',
    },
  ] as const,
  lede: (
    <>
      <span className="block text-base text-fg">
        untamedai.me — solo full-stack LLM product.
      </span>
      <span className="mt-2 block text-pretty">
        <a
          className="text-accent hover:underline"
          href="https://untamedai.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          untamedai.me
        </a>{' '}
        — an AI companion that remembers users&apos; emotions, planned, built, deployed, and operated end-to-end by one person.
      </span>
    </>
  ),
  children: (
    <>
      <div className="mt-4 rounded-md border border-border bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted shadow-surface">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          Public operating evidence
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>1 year live operation · 1 solo owner across plan, build, deploy, and daily ops</li>
          <li>2 production routes operated: global service and Korean SEO route</li>
          <li>Free / paid tier — free tier in production; paid tier with Polar payment system integration and sandbox validation completed · token-cost monitoring, and moderation loop in production</li>
        </ul>
      </div>
      <div className="mt-4 rounded-md border border-border bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted shadow-surface">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          Why this is an asset for Physical AI / manufacturing AI
        </div>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <span className="text-fg">For robot-manufacturing foundation-model data R&amp;D:</span>{' '}
            VLA training-data curation — splitting language instructions into semantic units is the LLM
            operator’s territory. Cost · quality · safety trade-offs in foundation-model training-data
            pipelines are exactly what production LLM ops decides every day.
          </li>
          <li>
            <span className="text-fg">For traditional-manufacturing AI workflows:</span> The
            operator-team LLM assistant (RAG over machine logs / line manuals / SOP) — having owned this
            kind of system from plan to deploy is the asset itself. Cost · safety · ops-metric balance in
            LLM system design is the daily constraint of production.
          </li>
        </ul>
      </div>
    </>
  ),
}

export const manufacturing = {
  title: 'Target systems — manufacturing AI workflows',
  header6a: '6a — Robot manufacturing & foundation-model training data',
  header6b: '6b — Existing-manufacturing AI workflow',
  lede: (
    <>
      <span className="block text-base text-fg">
        What I want to build — robot-manufacturing and existing-manufacturing AI workflows.
      </span>
      <span className="mt-2 block text-pretty">
        Current assets are industrial data pipelines and LLM product operations. Robotics,
        semiconductor, and steel domain depth are separated honestly as post-hire learning areas.
      </span>
    </>
  ),
  futureSummary: [
    {
      label: 'Current assets',
      value: 'Industrial telemetry pipeline work plus solo LLM product operations.',
    },
    {
      label: 'Target use',
      value: 'Robot-manufacturing foundation-data systems and existing-manufacturing AI workflows.',
    },
    {
      label: 'Transfer path',
      value: 'Apply the proven P1/P2/P3 primitives to foundation data, QC telemetry, and operator-team RAG workflows.',
    },
  ] as const,
  cards6a: [
    {
      title: 'Imitation-learning data pipeline',
      primitiveTags: ['P1', 'P2', 'P3'],
      body: (
        <>
          Teleop demos → automatic builds in RLDS / Parquet / MCAP training formats — the standards public corpora such as Open X-Embodiment ship in. Multi-source time alignment (vision · proprio · action · language) → quality filtering → segmentation → augmentation. Data quality at training time is the model’s ceiling; lifting that ceiling is the pipeline’s job. (deps: P1 + P2 + P3)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">target area</span>
        </>
      ),
    },
    {
      title: 'Sim-to-real telemetry bridge',
      primitiveTags: ['P2'],
      body: (
        <>
          Reconciling simulator output vs real-robot telemetry on time, units, and distribution. Domain-randomization parameter distributions sourced from measured data automatically. Reality-gap metric dashboards. Sim-to-real failures are almost always alignment failures. (deps: P2)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">target area</span>
        </>
      ),
    },
    {
      title: 'VLA foundation-data curation',
      primitiveTags: ['P2', 'P3'],
      body: (
        <>
          Vision-Language-Action triplet sync, mining-ratio control across failure / success, automatic long-horizon segmentation. Splitting language instructions into semantic units + the cost / safety / iteration loop of LLM ops are exactly what untamedai.me handles daily. (deps: P2 + P3 + LLM product ops)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">partially transferred</span>
        </>
      ),
    },
    {
      title: 'Robot-line QC telemetry',
      primitiveTags: ['P2', 'P3'],
      body: (
        <>
          Per-station measurements as a robot traverses the line + post-ship field telemetry, joined causally. End-of-line QC → field-failure traceability as one system. (deps: P2 + P3)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">designed, not built</span>
        </>
      ),
    },
  ] as const,
  cards6b: [
    {
      title: 'Line-telemetry substrate',
      primitiveTags: ['P1', 'P2', 'P3'],
      body: 'A unified telemetry pipeline across multi-vendor PLC + OPC-UA + MTConnect for semiconductor / steel / cell / display lines. Production ops and model-training data on the same substrate. (deps: P1 + P2 + P3)',
    },
    {
      title: 'Cycle-level quality prediction',
      primitiveTags: ['P2'],
      body: 'Machine-telemetry time-series → predicted end-of-line inspection results. Gradient-boosting baseline → Temporal Fusion Transformer / Patch-TST. Cycle-definition alignment in time is harder than the model itself. (deps: P2)',
    },
    {
      title: 'Line-assistant LLM',
      primitiveTags: ['P3'],
      body: 'A natural-language interface for operators — “what caused the line-3 alarm at 02:00 last night?” style RAG over machine logs + SOP + history. Having owned this kind of LLM system end-to-end (§5 untamedai.me) ports directly into the line-assistant problem. (deps: P3 + LLM product ops)',
    },
    {
      title: 'Anomaly localization',
      primitiveTags: ['P2', 'P3'],
      body: 'Which machine on the line is the source of the defect? SHAP-based contribution decomposition, drift monitoring, training-distribution guards. (deps: P2 + P3)',
    },
  ] as const,
  children: (
    <>
      <p className="mt-4 max-w-3xl text-sm text-fg-muted">
        The two sub-sections look separate but both run on the same three primitives from §3. That is why
        the same person ports cleanly into either domain.
      </p>
    </>
  ),
}

export const adjacent = {
  sectionTitle: 'Adjacent target area',
  title: 'Adjacent — robot fleet operations',
  body: (
    <>
      The same primitives also work for fleet operations. The first priority is §6 (manufacturing +
      foundation data); these adjacent areas remain ready to deploy: a unified telemetry substrate
      across mixed fleets (humanoids / AMRs / cobots) · motor & joint predictive maintenance (RUL
      regression) · in-operation motion-anomaly detection (autoencoder / GMM). Primitive deps: P1 +
      P2 + P3 (same as §6).
    </>
  ),
}

export const aiLayerMatrix = {
  title: 'AI workload mapping',
  lede: 'One data substrate, nine AI outlets. People who have only handled the model don’t carry it to production. Only people who have handled the data pipeline and run an LLM product carry it all the way.',
  columnHeaders: ['AI workload', 'Primitive deps', 'LLM-ops leverage'] as const,
  rows: [
    ['Imitation-learning data build', 'P1 + P2 + P3', '—'],
    ['Sim-to-real telemetry alignment', 'P2', '—'],
    ['VLA triplet curation', 'P2 + P3', '⭐ instruction segmentation'],
    ['VLA data-quality LLM-as-judge eval', 'P3 + LLM ops', '⭐⭐ direct mapping'],
    ['Cycle-level quality prediction', 'P2', '—'],
    ['Time-series anomaly detection', 'P2', '—'],
    ['Log → SOP matching (line-LLM precursor)', 'P3 + LLM ops', '⭐⭐ direct mapping'],
    ['Instruction quality / safety eval', 'P3 + LLM ops', '⭐⭐ untamedai moderation direct'],
    ['Operator LLM assistant (RAG over logs / SOP)', 'P3 + LLM ops', '⭐⭐ direct 1:1 mapping'],
  ] as const,
  children: (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
        ⭐ = partial leverage from LLM product ops · ⭐⭐ = direct 1:1 mapping
      </p>
    </>
  ),
}

export const engineeringPractice = {
  title: 'Working posture',
  lede: 'How I work — process signal. From running untamedai.me solo and from team work on industrial data systems, I have learned that how you work matters as much as the result. Three working postures.',
  columns: [
    {
      title: 'AI review loop in production work',
      body: (
        <>
          On untamedai.me FastAPI backend and Next.js UI changes, AI is used as a first-pass reviewer
          for API boundaries, null states, and cost paths. The final merge call and operating
          accountability stay human, with AI output treated as something to audit.
          <br />
          <br />
          <span className="text-fg">Signal.</span> Use AI to widen the review surface, then own the
          production decision.
        </>
      ),
    },
    {
      title: 'Operator mindset',
      body: (
        <>
          Running untamedai.me solo forces daily trade-offs — for example, accept a higher token cost
          on safety-critical Korean moderation calls and pull it back on low-stakes turns.
          <br />
          <br />
          <span className="text-fg">Signal.</span> Operator mindset — model, system, user, and cost
          held in view at the same time.
        </>
      ),
    },
    {
      title: 'Transferable systems practice',
      body: (
        <>
          The same operating pattern shows up in both shipped systems: define data boundaries,
          normalize unreliable inputs, make failure recovery explicit, and keep cost / safety / user
          impact visible.
          <br />
          <br />
          <span className="text-fg">Signal.</span> Industrial telemetry and LLM product ops are not
          separate stories here; they are the same systems discipline applied to different surfaces.
        </>
      ),
    },
  ] as const,
}

export const techStack = {
  title: 'Stack map',
  lede: 'Stack used on the industrial vehicle fleet, mapped to the equivalents that port into robot manufacturing and traditional manufacturing. Production code is under NDA.',
  rows: [
    { layer: 'Ingestion / Bus', tools: 'Industrial Fleet: Django · Flask webhook  →  Robot · Mfg: ROS2 · DDS · Kafka · OPC-UA · MQTT' },
    { layer: 'Time-series store', tools: 'Industrial Fleet: InfluxDB  →  Robot · Mfg: TimescaleDB · ClickHouse · MCAP' },
    { layer: 'Metadata DB', tools: 'Industrial Fleet: MySQL  →  Robot · Mfg: PostgreSQL' },
    { layer: 'Distributed task', tools: 'Industrial Fleet: Celery + django-celery-beat  →  Robot · Mfg: Celery · Airflow · Dagster · Ray' },
    { layer: 'Single-node / distributed compute', tools: 'Industrial Fleet: single-node multiprocessing  →  Robot · Mfg: Ray · Dask when distributed execution is required' },
    { layer: 'Replay format', tools: 'Industrial Fleet: Avro  →  Robot · Mfg: MCAP · Parquet · RLDS' },
    { layer: 'Storage', tools: 'Industrial Fleet: GCS  →  Robot · Mfg: S3 · Azure Blob' },
    { layer: 'LLM stack (untamedai.me)', tools: 'Next.js (frontend) · Python FastAPI (backend) · Supabase + PostgreSQL (DB) · Cloudflare (hosting) · Claude Opus + GPT 5.x (LLM) · Polar payments (flow built & validated, no transactions yet)  →  Foundation-model data / VLA / RAG' },
  ] as const,
}

export const about = {
  title: 'Contact',
  paragraph: (
    <>
      <span className="inline-block rounded-sm bg-accent-bg px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
        Interviewing as of May 2026
      </span>
      <span className="mt-3 block text-base text-fg">Woon · Aspiring Manufacturing AI Data Systems Engineer.</span>
      <span className="mt-2 block text-pretty">
        Industrial vehicle-fleet telemetry pipeline as a team member → an LLM product (
        <a
          className="text-accent hover:underline"
          href="https://untamedai.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          untamedai.me
        </a>
        ) operated solo: systems that turn raw telemetry into production evidence and product
        experience.
      </span>
    </>
  ),
  links: [
    { label: 'GitHub', href: 'https://github.com/wkddns40?tab=repositories' },
    { label: 'untamedai.me', href: 'https://untamedai.me' },
    { label: 'Email', href: 'mailto:dj4ngb0g0h@gmail.com' },
    { label: 'Resume PDF', href: '/resume/woon_jang_en.pdf' },
  ] as const,
  linkTokens: [
    'about/github-url',
    'about/untamedai-url',
    'about/email',
    'about/resume-pdf',
  ] as const,
  children: (
    <>
      <div className="rounded-sm border border-border bg-bg-subtle p-4 text-sm text-fg-muted">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          Inside the resume
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Industrial vehicle fleet 4-tier telemetry pipeline — 700+ vehicles · 1 year 5 months in a team</li>
          <li>LLM product untamedai.me — 1 year solo full-stack operation (Polar payment flow built & validated, no transactions yet)</li>
          <li>Python · Django · Celery · InfluxDB · Next.js · FastAPI · Cloudflare in production</li>
        </ul>
      </div>
    </>
  ),
}

