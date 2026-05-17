/**
 * KO page-level data, grouped per section.
 *
 * Trusted runtime data source for the KO page. Each top-level export matches
 * the corresponding section component's prop shape so `PortfolioPage` can
 * spread it directly. MDX shells (content/ko/*.mdx) remain Stage 4 structure
 * scaffolds, not public copy sources.
 *
 * Tone gates (§5):
 *  - §4 (proof-case-a) : team-1pp — 1인칭 복수, 본인 기여 명시
 *  - §5 (proof-case-b) : solo-1ps — 1인칭 단수 OK
 *  - §6 (manufacturing): proposal-1ps — 만들고 싶다 / 즉시 투입 가능, 과거형 단정 금지
 */
export const hero = {
  chips: [
    'Industrial Fleet · 700+ 차량 운영',
    'CAN ISO-TP / InfluxDB',
    'untamedai.me LLM 제품 1인 개발',
    'LLM 제품 결제 flow 검증',
  ] as const,
  ctas: [
    { label: 'Proof Cases', href: '#proof-case-a' },
    { label: 'Resume PDF', href: '/resume/woon_jang.pdf' },
    { label: 'Contact', href: 'mailto:dj4ngb0g0h@gmail.com' },
  ] as const,
  proofSnapshot: [
    {
      title: 'Team system',
      body: '산업 차량 Fleet 텔레메트리 파이프라인 700+ 차량 규모 팀 운영',
    },
    {
      title: 'Solo product',
      body: (
        <>
          대화형 AI 서비스{' '}
          <a
            className="text-accent hover:underline"
            href="https://untamedai.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            untamedai.me
          </a>{' '}
          기획, 시스템 설계, 개발, 배포 및 운영 총괄
        </>
      ),
    },
    {
      title: 'Target systems',
      body: '검증 경험을 로봇/제조 AI 데이터 파이프라인과 운영팀 RAG 워크플로우로 전이',
    },
  ] as const,
  headline: (
    <>
      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        Industrial Telemetry → Manufacturing AI Data Systems
      </span>
      <span className="text-accent">현장 텔레메트리에서 AI 데이터 변환까지</span>
    </>
  ),
  subhead: (
    <>
      <span className="block font-medium text-fg">
        비동기·파편화된 산업 현장 데이터를 운영 가능한 시계열 데이터와 AI 학습 데이터로 정규화합니다.
      </span>
      <span className="mt-2 block">
        1년 5개월간 700+ 차량 규모의 산업 차량 Fleet 텔레메트리 파이프라인을 운영하며 CAN ISO-TP 재조립, 4팩 BMS 비동기 정렬, InfluxDB 기반 landing/replay 구조를 다뤘습니다.
      </span>
      <span className="mt-3 block text-sm text-fg-subtle md:text-base">
        별도로 LLM 제품 untamedai.me를 1인 풀스택으로 기획·개발·배포·운영하며 세션·메모리·안전·비용·결제까지 제품 운영 루프를 직접 책임졌습니다.
      </span>
    </>
  ),
}

export const bottleneck = {
  title: '제조 AI의 병목은 모델 이전의 데이터 파이프라인입니다',
  lede: (
    <>
      <span className="block text-base text-fg">많은 제조 AI 프로젝트에서 모델보다 오래 걸리는 부분은 현장 데이터를 안정적으로 수집·정렬·정규화·재처리하는 파이프라인입니다.</span>
      <span className="mt-2 block text-pretty">
        현장 데이터는 비동기·파편·벤더별 스키마로 들어옵니다. 이를 운영 대시보드와 학습 데이터 양쪽에서 재사용 가능한 형태로 바꾸는 일이 제 핵심 경험입니다.
      </span>
    </>
  ),
  cards: [
    {
      title: '멀티-소스 비동기 정렬',
      body: '휴머노이드의 관절 데이터, 반도체 팹 챔버, 제철 라인의 설비들은 각기 다른 주기로 데이터를 전송합니다. 이기종 비동기 신호를 정확한 시계열로 정렬하지 못하면 유효한 AI 학습 데이터로 활용할 수 없습니다.',
    },
    {
      title: '단편화된 산업 프로토콜',
      body: 'CAN ISO-TP, ROS2 chunked publish, OPC-UA / MTConnect 스트림처럼 산업 환경의 주요 인터페이스 다수는 분할·비동기 형태로 도착합니다. 프로토콜별 특성을 구분하고, 손실·지연 가능성을 명시하며 타임 윈도우 기반으로 재조립해야 합니다.',
    },
    {
      title: '이기종 디바이스 Fleet',
      body: '다양한 제조사의 로봇 및 PLC가 혼재된 생산 라인에서는, 코드 재배포 없이도 신규 디바이스를 수용할 수 있는 스키마 레지스트리(Schema Registry) 기반 구조가 운영 안정성의 핵심입니다.',
    },
    {
      title: '단일 파이프라인 통합',
      body: '실시간 모니터링(운영)과 모델 학습을 위한 데이터 인프라가 분리되어 있으면 데이터 분포 불일치(Distribution Mismatch)라는 심각한 기술 부채가 발생합니다. 단일 파이프라인으로 두 시스템에 일관된 데이터를 통합 공급해야 합니다.',
    },
  ] as const,
}

export const primitives = {
  title: '산업 텔레메트리에서 검증한 3가지 재사용 패턴',
  lede: '각 패턴은 실제 경험, 구현 포인트, 전이 대상이 분리되어야 신뢰도가 생깁니다.',
  primitives: [
    {
      id: 'P1',
      title: 'Fragmented Stream Reassembly — 단편 재조립',
      caption: '도식 — 분산 도착 fragment → mask bitmap → 재조립 신호.',
      verifiedEnv:
        '실제 경험: 산업 차량 CAN ISO-TP multi-frame. 구현 포인트: First Frame(0x10), Consecutive Frame SN 4-bit wraparound, Flow Control 상태 분리, PID/jitter 기반 timeout window, mask-bitmap partial fill, memory bound 관리. 전이 대상: ROS2 chunked stream, OPC-UA stream, robot log replay.',
    },
    {
      id: 'P2',
      title: 'Multi-Source Temporal Alignment — 비동기 정렬',
      caption: '도식 — 비동기 4채널을 공통 reference 컬럼에 정렬.',
      verifiedEnv:
        '실제 경험: Master 1·2와 Slave 1·2의 4팩 BMS. 구현 포인트: 각 팩 V/I 독립 PID, PID 주기와 jitter 분포 기반 time window, missing value 처리 경계, 정렬 후 4팩 합산 순간 전력 계산. 전이 대상: robot joint/F/T/vision/action 동기화, 공정 cycle-level feature build.',
    },
    {
      id: 'P3',
      title: 'Schema-Driven Device Decoder — 이기종 디바이스 정규화',
      caption: '도식 — 이기종 raw source → adapter → canonical event (schema registry 기반).',
      verifiedEnv:
        '실제 경험: 차종별 신호 매핑을 Excel 기반 mapping layer로 관리. 구현 포인트: 표현식 DSL → AST whitelist 평가, compile caching, schema version pinning, 단위 변환과 품질 플래그 분리. 전이 대상: PLC/OPC-UA/ROS2 source를 canonical event로 정규화.',
    },
  ] as const,
}

export const proofCaseA = {
  title: 'Case A — 산업 차량 Fleet 텔레메트리 파이프라인',
  ownContribution: 'mqtt - InfluxDB Converter refactoring · 표현식 평가 시각화 · Celery 모듈 운영',
  operationPeriod: '1년 5개월',
  summary: [
    {
      label: 'Problem',
      value: '파편화되어 있고 비동기적이며 차종별 스키마가 상이한 700+ 산업 차량 Fleet 텔레메트리 환경. 원시 payload를 유의미한 프로덕션 데이터로 변환하는 과제.',
    },
    {
      label: 'Role',
      value: '수집된 데이터의 InfluxDB 저장소 설계 및 운영, InfluxDB Converter 리팩토링, DSL 표현식 엔진 및 데이터 시각화 도구 개발 및 Celery 기반 분산 처리 모듈 운영.',
    },
    {
      label: 'System',
      value: 'Webhook 수집, raw hex landing/replay 역할의 Bridge InfluxDB, multi-process converter, measurement InfluxDB, Celery batch, Avro/GCS 출력.',
    },
    {
      label: 'Transfer',
      value: 'CAN ISO-TP 재조립, 비동기 정렬, schema-driven decoder는 로봇 텔레오퍼레이션 데이터·제조 라인 telemetry·운영 로그 RAG로 전이 가능.',
    },
    {
      label: 'Proof',
      value: '700+ 차량 규모 fleet 1년 5개월 프로덕션 운영. 합성 이기종 텔레메트리 기준 7k events/sec 부하 테스트에서 parser crash 없이 bounded memory와 replay path를 검증.',
    },
  ] as const,
  lede: (
    <>
      <span className="block text-base text-fg">
        산업 차량 Fleet 텔레메트리 파이프라인 (700+ 차량)
      </span>
      <span className="mt-2 block text-pretty">
        현대 산업 차량 Fleet(700+ 차량)을 위한 4-Tier 분산 텔레메트리 시스템 구축 프로젝트에 팀 일원으로 참여하여 핵심 데이터 처리 모듈을 담당했습니다.
      </span>
    </>
  ),
  body: (
    <>
      <pre className="mb-4 overflow-x-auto rounded-sm border border-border bg-bg-subtle p-3 font-mono text-[11px] leading-relaxed text-fg-subtle">
{`[차량 단말] → Webhook → Bridge InfluxDB
  → V2InfluxConverterProcess (multi-process)
  → Measurement InfluxDB → Celery batch → Avro/GCS`}
      </pre>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-md border border-border bg-bg-subtle p-4"><div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">My ownership</div><ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] leading-relaxed text-fg-muted"><li>InfluxDB 저장 구조 설계 및 운영</li><li>mqtt → InfluxDB Converter 리팩토링</li><li>CAN ISO-TP multi-frame 재조립 및 4팩 BMS 비동기 정렬</li><li>Excel 기반 신호 mapping DSL, AST whitelist 평가, compile caching</li><li>Celery batch module 운영 및 Avro/GCS 출력 경로 관리</li></ul></div>
        <div className="rounded-md border border-border bg-bg-subtle p-4"><div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">Load-test boundary</div><ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] leading-relaxed text-fg-muted"><li>Fleet scale: 700+ 차량 (프로덕션 운영 기준)</li><li>Throughput: 7k events/sec synthetic heterogeneous telemetry</li><li>Stage: raw landing → converter normalization → measurement write path</li><li>Validation: parser stability, bounded memory, replay path</li><li>Not claimed: Kafka-style consumer groups or exactly-once semantics</li></ul></div>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-fg-muted">
        Bridge InfluxDB는 message broker의 완전한 대체재가 아니라, raw hex payload를 보존하고 장애 후 재처리를 가능하게 하는 time-series landing / replay layer로 운영했습니다. 이후 Converter가 이를 measurement InfluxDB로 정규화했습니다.
        부하 테스트는 합성 이기종 텔레메트리 기준 7k events/sec에서 parser crash 없이 bounded memory와 replay path를 검증하는 방식으로 수행했습니다.
      </p>
      <ul className="mb-6 flex list-disc flex-col gap-1 pl-5 text-fg-muted">
        <li>Tier 1 (수집): Django / Flask webhook · hex payload 보존</li>
        <li>Tier 2 (디코딩): ISO-TP 재조립 + 표현식 DSL + 4팩 BMS 정렬</li>
        <li>Tier 3 (분석): Celery 모듈 plug-in (summary / driving_score / submatrix / avro)</li>
        <li>Tier 4 (출력): 측정 InfluxDB + Avro on GCS</li>
      </ul>
      <div className="mb-6 rounded-md border border-border bg-bg-subtle p-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          운영 신뢰성
        </div>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[13px] leading-relaxed text-fg-muted">
          <li>
            <span className="text-fg">장애 시 재처리 SLA를 실제 운영.</span>{' '}
            Converter 또는 측정 InfluxDB 단의 일시 장애 시, Bridge InfluxDB의 raw hex landing layer가
            정해진 SLA 안에 자동 재처리되는 replay 경로로 동작했습니다.
          </li>
          <li>
            <span className="text-fg">메타 DB는 MHA(MySQL High Availability) 구성으로 무손실 운영.</span>{' '}
            master 장애 시에도 자동 failover로 데이터 손실 없이 운영했습니다.
          </li>
        </ul>
      </div>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
        왜 로봇 제조 / 제조업으로 전이되는가
      </div>
      <div className="overflow-x-auto rounded-sm border border-border bg-bg-elevated">
      <table className="w-full border-collapse text-left">
        <thead className="bg-bg-subtle">
          <tr className="border-b border-border">
            <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
              산업 차량 Fleet
            </th>
            <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
              로봇 제조 / 제조업
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">차량당 4팩 BMS 비동기 신호</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">로봇당 30+ 관절 + F/T + 비전 / 라인당 N대 머신</td>
          </tr>
          <tr className="border-b border-border bg-bg-subtle">
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">CAN ISO-TP 멀티프레임</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">ROS2 chunked / OPC-UA chunked</td>
          </tr>
          <tr>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">차종별 .dbc / Excel DSL</td>
            <td className="px-3 py-2.5 text-[13px] leading-relaxed text-fg-muted">로봇 모델별 URDF / PLC 벤더별 protocol</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  ),
}

export const proofCaseB = {
  title: 'Case B — untamedai.me LLM 제품',
  summary: [
    {
      label: 'Problem',
      value: 'LLM 서비스는 단순 모델 호출이 아니라 메모리, 세션, 안전, 결제, 토큰 비용, 운영 모니터링이 결합된 제품 시스템입니다.',
    },
    {
      label: 'Role',
      value: '제품 기획, 시스템 아키텍처 설계, 풀스택 개발, 인프라 배포, 일일 서비스 운영까지 1인 풀스택으로 전체 라이프사이클 총괄.',
    },
    {
      label: 'System',
      value: 'Next.js · FastAPI · Supabase · Cloudflare · PostgreSQL · Claude / GPT · Polar (결제) · 운영 모니터링 루프.',
    },
    {
      label: 'Transfer',
      value: '세션/메모리/안전/비용 운영 경험은 제조 로그·SOP 기반 operator assistant RAG와 instruction quality evaluation으로 직접 전이 가능.',
    },
    {
      label: 'Proof',
      value: '1년 운영 · 1인 풀스택 · 2개 production route(글로벌 / 한국어) · 무료 tier 운영, 유료 tier는 Polar 결제 시스템 통합 및 sandbox 검증 완료.',
    },
  ] as const,
  stages: [
    {
      title: '기획 (Product Planning)',
      body: '사용자 페르소나, 무료/유료 tier, 결제 flow, 카피, 온보딩, 비용 구조를 함께 설계했습니다. 제품 결정이 곧 모델 호출 비용과 운영 리스크로 연결된다는 관점에서 기획했습니다.',
    },
    {
      title: '시스템 설계 (Architecture)',
      body: '단기 컨텍스트, 장기 벡터, 요약 store를 계층화한 memory architecture와 세션 경계, 안전 가드레일, 비용 제어 경로를 설계했습니다. 모델 호출 한 번이 아니라 memory + session + safety + cost가 결합된 시스템으로 다뤘습니다.',
    },
    {
      title: '개발 (Development)',
      body: '프론트엔드 Next.js · 백엔드 Python FastAPI · DB Supabase + PostgreSQL · 호스팅 Cloudflare · LLM Claude Opus + GPT 5.x · 결제 Polar — 풀스택 단독.',
    },
    {
      title: '배포 (Deployment)',
      body: '호스팅 · CI/CD · 도메인 (untamedai.me + 다국어 라우팅 — /samakyeowoo 한국어 SEO) · TLS · 모니터링 채널.',
    },
    {
      title: '운영 (Operations)',
      body: '토큰 비용 의식 (1인 운영자에게 곧 런웨이), 국내 AI 윤리 가이드라인 및 안전성 기준(Safety Guardrail) 준수, 사용자 인입 모니터링, 반복 개선 의사결정.',
    },
  ] as const,
  lede: (
    <>
      <span className="block text-base text-fg">
        LLM 기반 대화형 AI 제품 untamedai.me
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
        — 기획부터 시스템 설계 · 개발 · 배포까지 1인 풀스택으로 전담하며 LLM 프로덕트 구축 역량을 쌓았습니다.
      </span>
    </>
  ),
  children: (
    <>
      <div className="mt-4 rounded-md border border-border bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted shadow-surface">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          주요 운영 성과
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>1년 운영 · 1인 풀스택 · 기획부터 배포와 일일 운영까지 직접 수행</li>
          <li>2개 production route 운영: 글로벌 서비스 / 한국어 SEO route</li>
          <li>무료 tier 운영, 유료 tier는 Polar 결제 시스템 통합 및 sandbox 검증 완료 · 토큰 비용 및 모더레이션 운영 루프 포함</li>
        </ul>
      </div>
      <div className="mt-4 rounded-md border border-border bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted shadow-surface">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          이 경험이 Physical AI / 제조 AI에 왜 자산인가
        </div>
        <p className="leading-relaxed text-fg-muted">
          자연어 지시(Instruction)의 맥락적 분할, 서비스 품질과 인프라 비용 간 트레이드오프 조율은 실제 프로덕션 환경에서만 쌓을 수 있는 의사결정 경험입니다. 이를 토대로 제조 분야의 LLM 어시스턴트 및 AI 워크플로우 구축에 기여할 수 있습니다.
        </p>
      </div>
    </>
  ),
}

export const manufacturing = {
  title: 'Target Systems — 제조 AI 워크플로우',
  header6a: '6a — 로봇 제조 · Foundation 모델 학습 데이터',
  header6b: '6b — 기존 제조업 AI 워크플로우',
  lede: (
    <>
      <span className="block text-base text-fg">
        만들고 싶은 것 — 로봇 제조 + 기존 제조업의 AI 워크플로우.
      </span>
      <span className="mt-2 block text-pretty">
        산업 데이터 인프라 구축 및 LLM 서비스 운영 경험을 바탕으로, 로봇 제조를 위한 파운데이션 모델 데이터 시스템과 기존 제조업의 AI 워크플로우 고도화에 기여하고자 합니다.
      </span>
    </>
  ),
  futureSummary: [
    {
      label: 'Current assets',
      value: '산업 텔레메트리 파이프라인 경험과 LLM 제품 1인 운영 경험.',
    },
    {
      label: 'Target use',
      value: '로봇 제조 foundation 데이터 시스템과 기존 제조업 AI 워크플로우.',
    },
    {
      label: 'Transfer path',
      value: '검증된 P1/P2/P3를 foundation 데이터, QC 텔레메트리, 운영팀 RAG 워크플로우에 적용하는 경로.',
    },
  ] as const,
  cards6a: [
    {
      title: 'Imitation Learning 데이터 파이프라인',
      primitiveTags: ['P1', 'P2', 'P3'],
      body: (
        <>
          원격 조작(Teleoperation) 데모 데이터로부터 RLDS · Parquet · MCAP 학습 포맷을 자동 생성합니다 — Open X-Embodiment 등 공개 데이터셋이 채택한 표준. 다중 소스(vision · proprio · action · language)의 시간 동기화부터 품질 필터링, 세그멘테이션, 데이터 증강까지의 파이프라인을 구축합니다. 학습 데이터의 품질이 곧 파운데이션 모델의 성능 한계를 결정하므로, 이를 극대화할 수 있는 견고한 데이터 인프라가 필수적입니다. (의존: P1 + P2 + P3)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">목표 영역 · target area</span>
        </>
      ),
    },
    {
      title: 'Sim-to-Real 텔레메트리 브리지',
      primitiveTags: ['P2'],
      body: (
        <>
          시뮬레이터 출력 vs 실제 로봇 텔레메트리의 시간·단위·분포 정합. Domain randomization의 파라미터 분포를 실측에서 자동 sourcing. Reality gap 메트릭 대시보드. sim-to-real의 실패는 거의 항상 데이터 정렬 문제에서 기인합니다. (의존: P2)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">목표 영역 · target area</span>
        </>
      ),
    },
    {
      title: 'VLA Foundation 모델 데이터 큐레이션',
      primitiveTags: ['P2', 'P3'],
      body: (
        <>
          Vision-Language-Action triplet 시간 정확 동기, failure / success의 mining 비율 관리, long-horizon task 자동 segmentation. 언어 instruction의 의미 단위 분할과 LLM 운영의 비용·안전·반복 개선 사이클은 untamedai.me에서 매일 다루었던 핵심 영역입니다. (의존: P2 + P3 + LLM 제품 운영)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">부분 전이 · partially transferred</span>
        </>
      ),
    },
    {
      title: '로봇 제조 라인 QC 텔레메트리',
      primitiveTags: ['P2', 'P3'],
      body: (
        <>
          로봇 한 대가 라인을 통과할 때 station 별 측정값 + 출하 후 field 텔레메트리의 인과 매칭. end-of-line QC 결과 → field failure를 추적 가능한 시스템으로 구축합니다. (의존: P2 + P3)
          <span className="mt-2 inline-block rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">설계됨 · designed, not built</span>
        </>
      ),
    },
  ] as const,
  cards6b: [
    {
      title: '라인 텔레메트리 substrate',
      primitiveTags: ['P1', 'P2', 'P3'],
      body: '반도체, 제철, 배터리 셀, 디스플레이 라인의 멀티-벤더 PLC 및 OPC-UA, MTConnect 통합 텔레메트리 파이프라인입니다. 실시간 프로덕션 운영 환경과 AI 모델 학습 데이터를 동일한 데이터 인프라(Substrate) 위에서 일관되게 처리합니다. (의존: P1 + P2 + P3)',
    },
    {
      title: 'Cycle-Level 품질 예측',
      primitiveTags: ['P2'],
      body: '머신 텔레메트리 시계열 → 끝단 검사 결과 사전 예측. Gradient Boosting 베이스라인 → Temporal Fusion Transformer / Patch-TST. 모델 구조 자체보다 공정 사이클(Cycle) 정의에 따른 정교한 시간 축 동기화가 실질적인 기술 난제임에 주목합니다. (의존: P2)',
    },
    {
      title: '라인 어시스턴트 LLM',
      primitiveTags: ['P3'],
      body: '운영팀이 자연어로 묻는 인터페이스 — 어제 02시 라인 3 알람의 원인 분석 같은 질의에 답하는, machine logs · SOP · 이력 데이터 위의 RAG. 기획부터 배포까지의 전 과정을 1인 풀스택으로 리드한 경험(§5 untamedai.me)이 이식될 수 있습니다. (의존: P3 + LLM 제품 운영)',
    },
    {
      title: 'Anomaly Localization',
      primitiveTags: ['P2', 'P3'],
      body: '라인 어느 머신이 불량의 원인인가 — SHAP 기반 기여도 분해, drift monitoring, 학습 분포 가드를 구축합니다. (의존: P2 + P3)',
    },
  ] as const,
  children: (
    <>
      <p className="mt-4 max-w-3xl text-sm text-fg-muted">
        두 sub-section의 워크로드는 분리되어 있는 것처럼 보이지만, §3의 동일한 3가지 primitives 위에서 작동합니다. 따라서 두 도메인 모두에 동일한 역량을 갖춘 엔지니어가 즉시 투입될 수 있습니다.
      </p>
    </>
  ),
}

export const adjacent = {
  sectionTitle: 'Adjacent target area',
  title: '보조 적용 영역 — 로봇 Fleet 운영',
  body: (
    <>
      동일한 핵심 기술(Primitives)은 로봇 Fleet 운영에도 그대로 적용됩니다. 제1 목표인 제조 AI 데이터 시스템 구축 외에도, 다음
      영역에 즉시 투입 가능합니다: 이기종(휴머노이드 / AMR / 협동로봇) Fleet의 통합 텔레메트리 파이프라인 · 모터 및 관절
      예지보전 (RUL 회귀) · 운영 중 모션 이상 탐지 (Autoencoder / GMM). (의존: P1 + P2 + P3)
    </>
  ),
}

export const aiLayerMatrix = {
  title: 'AI workload mapping — AI 워크로드 매핑',
  lede: '동일한 데이터 substrate에서 나오는 AI 적용 영역을 3개 묶음으로 압축했습니다. 핵심은 많은 키워드가 아니라, 각 워크로드가 어떤 검증 경험에 의존하는지 명확히 보이는 것입니다.',
  columnHeaders: ['묶음', '대표 워크로드', '전이되는 실무 경험'] as const,
  rows: [
    ['Foundation Model Data', 'teleop demo 정렬 · VLA triplet curation · sim-to-real telemetry', 'P1/P2/P3: 재조립, 동기화, canonical event'],
    ['Manufacturing Intelligence', 'cycle-level 품질 예측 · anomaly localization · drift monitoring', 'P2/P3: 시간축 feature build, schema versioning, quality flag'],
    ['LLM Workflow', 'RAG over logs/SOP · instruction quality eval · operator assistant', 'untamedai.me: memory/session/safety/cost 운영 루프'],
  ] as const,
  children: (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
        Verified → Transfer mapping, not a claim of completed robotics deployment.
      </p>
    </>
  ),
}

export const engineeringPractice = {
  title: 'Working posture — 작업 자세',
  lede: '어떻게 일하는가 — Process 시그널. 결과만큼이나 일하는 방식이 중요하다는 것을, untamedai.me 1인 운영과 산업 데이터 시스템 팀 작업 양쪽에서 깊이 익혔습니다. 실무에 임하며 다음 세 가지 작업 자세를 견지합니다.',
  columns: [
    {
      title: 'AI Review Loop in Production Work',
      body: (
        <>
          untamedai.me의 FastAPI 백엔드와 Next.js UI 변경에서 AI를 1차 리뷰어로 활용해 API boundary, null state, 비용 경로를 점검했습니다. 최종 merge 판단과 운영 책임은 직접 가져가며, AI가 놓친 리스크를 사람이 audit하는 루프를 유지합니다.
        </>
      ),
    },
    {
      title: 'Operator Mindset',
      body: (
        <>
          토큰 비용 대비 응답 품질 최적화, 모더레이션 임계치 조율, 신규 기능 개발과 기술 부채 관리의 균형 등 시스템의 안정성과 비즈니스 가치를 동시에 고려하는 운영자 관점을 지향합니다.
        </>
      ),
    },
    {
      title: 'Transferable Systems Practice',
      body: (
        <>
          산업 차량 텔레메트리에서 검증한 재조립·정렬·스키마화 방식과 untamedai.me 운영에서 검증한 비용·안전·제품 루프를 하나의 시스템 설계 방식으로 묶습니다. 다른 제조 환경에서도 먼저 데이터 경계, 운영 지표, 실패 복구 경로를 정의하는 방식으로 전이됩니다.
        </>
      ),
    },
  ] as const,
}

export const techStack = {
  title: 'Stack map — 스택 맵',
  lede: '각 행의 왼쪽은 실제 운영 경험, 오른쪽은 동일한 문제 구조에 적용 가능한 전이 대상입니다. 프로덕션 코드는 NDA에 따라 비공개입니다.',
  rows: [
    { layer: 'Ingestion / Bus', tools: 'Production: Django · Flask webhook · MQTT / Transfer: ROS2 · DDS · Kafka · OPC-UA · MQTT' },
    { layer: 'Time-series store', tools: 'Production: InfluxDB / Transfer: TimescaleDB · ClickHouse · MCAP' },
    { layer: 'Metadata DB', tools: 'Production: MySQL MHA / Transfer: PostgreSQL · schema registry' },
    { layer: 'Batch / Task', tools: 'Production: Celery + django-celery-beat / Transfer: Celery · Airflow · Dagster · Ray' },
    { layer: 'Processing', tools: 'Production: single-node multiprocessing converter / Transfer: Ray · Dask when distributed scale is required' },
    { layer: 'Replay / Dataset', tools: 'Production: raw hex landing · Avro / Transfer: MCAP · Parquet · RLDS' },
    { layer: 'Storage', tools: 'Production: GCS / Transfer: S3 · Azure Blob' },
    { layer: 'LLM product stack', tools: 'Production: Next.js · FastAPI · Supabase/PostgreSQL · Cloudflare · Claude/GPT · Polar(결제 flow 구축·검증 완료, 거래 미발생) / Transfer: manufacturing RAG · operator assistant' },
  ] as const,
}

export const about = {
  title: 'Contact — 연락처',
  paragraph: (
    <>
      <span className="inline-block rounded-sm bg-accent-bg px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
        2026.05 기준 인터뷰 중 · Currently interviewing
      </span>
      <span className="mt-3 block text-base text-fg">Woon · Aspiring Manufacturing AI Data Systems Engineer.</span>
      <span className="mt-2 block text-pretty">
        산업 차량 Fleet 텔레메트리 파이프라인 팀 멤버 → LLM 기반 제품 (
        <a
          className="text-accent hover:underline"
          href="https://untamedai.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          untamedai.me
        </a>
        ) 1인 운영까지, RAW telemetry를 프로덕션 수준의 제품 데이터로 바꾸는 시스템을 구축했습니다.
      </span>
    </>
  ),
  links: [
    { label: 'GitHub', href: 'https://github.com/wkddns40?tab=repositories' },
    { label: 'untamedai.me', href: 'https://untamedai.me' },
    { label: 'Email', href: 'mailto:dj4ngb0g0h@gmail.com' },
    { label: 'Resume PDF', href: '/resume/woon_jang.pdf' },
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
          이력서 요약
        </div>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Looking for: Manufacturing AI / Robotics Data Infrastructure / Industrial Telemetry Pipeline</li>
          <li>산업 차량 Fleet 4-Tier 텔레메트리 파이프라인 — 700+ 차량 · 1년 5개월 팀 운영</li>
          <li>LLM 제품 untamedai.me — 1인 풀스택 1년 운영 (Polar 결제 flow 구축·검증 완료, 거래 미발생)</li>
          <li>Python · Django · Celery · InfluxDB · Next.js · FastAPI · Cloudflare 프로덕션 검증</li>
        </ul>
      </div>
    </>
  ),
}

