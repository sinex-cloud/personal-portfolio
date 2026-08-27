const LABEL = { high: 'high', medium: 'medium', ok: 'pass' } as const

export default function SeverityChip({ level }: { level: keyof typeof LABEL }) {
  return <span className={`sev sev-${level}`}>{LABEL[level]}</span>
}
