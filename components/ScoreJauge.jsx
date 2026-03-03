'use client'

/**
 * Jauge de qualité du prompt : 0-100% sur 5 critères de 20 pts chacun.
 */
export default function ScoreJauge({ score }) {
  const pct = Math.min(100, Math.max(0, score))

  let color, textColor, label
  if (pct <= 40) {
    color = 'bg-red-400'
    textColor = 'text-red-600'
    label = "Prompt trop vague, l'IA va improviser"
  } else if (pct <= 70) {
    color = 'bg-orange-400'
    textColor = 'text-orange-600'
    label = 'Correct, mais vous pouvez préciser'
  } else {
    color = 'bg-green-500'
    textColor = 'text-green-700'
    label = 'Prompt solide, prêt à copier'
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-opt-muted uppercase tracking-wide">
          Score qualité
        </span>
        <span className={`text-sm font-bold ${textColor}`}>{pct}%</span>
      </div>

      {/* Barre de progression */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className={`text-xs ${textColor}`}>{label}</p>
    </div>
  )
}
