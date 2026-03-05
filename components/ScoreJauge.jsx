'use client'

export default function ScoreJauge({ score }) {
  const pct = Math.min(100, Math.max(0, score))

  let barStyle, textColor, label
  if (pct <= 40) {
    barStyle = 'bg-red-400'
    textColor = 'text-red-400'
    label = "Prompt trop vague, l'IA va improviser"
  } else if (pct <= 70) {
    barStyle = 'bg-orange-400'
    textColor = 'text-orange-400'
    label = 'Correct, mais vous pouvez préciser'
  } else {
    barStyle = 'bg-opt-gradient'
    textColor = 'text-[var(--opt-violet)]'
    label = 'Prompt solide, prêt à copier'
  }

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-opt-muted uppercase tracking-wide">
          Score qualité
        </span>
        <span className={`text-sm font-bold ${textColor}`}>{pct}%</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden mb-2"
        style={{ background: 'var(--opt-surface)' }}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barStyle}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className={`text-xs ${textColor}`}>{label}</p>
    </div>
  )
}
