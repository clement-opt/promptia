'use client'

/**
 * Toggle de sélection du mode PromptIA : EXPRESS / STRUCTURÉ / EXPERT
 */
const MODES = [
  { id: 'express',    label: 'EXPRESS',    icon: '⚡', desc: 'Débutant - 3 champs' },
  { id: 'structured', label: 'STRUCTURÉ',  icon: '🧩', desc: 'Framework TCOF' },
  { id: 'expert',     label: 'EXPERT',     icon: '⚙️', desc: 'Contrat IA complet' },
]

export default function ModeToggle({ mode, onSwitch }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-1.5 flex gap-1">
      {MODES.map((m) => {
        const active = mode === m.id
        return (
          <button
            key={m.id}
            onClick={() => onSwitch(m.id)}
            className={[
              'flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5',
              'text-sm font-bold transition-all duration-200',
              active
                ? 'bg-opt-violet text-white shadow-sm'
                : 'text-opt-muted hover:text-opt-text hover:bg-opt-fond',
            ].join(' ')}
          >
            <span className="text-base leading-none">{m.icon}</span>
            <span className="tracking-wide">{m.label}</span>
            <span className={[
              'hidden sm:inline text-xs font-normal',
              active ? 'text-white/70' : 'text-opt-muted',
            ].join(' ')}>
              {m.desc}
            </span>
          </button>
        )
      })}
    </div>
  )
}
