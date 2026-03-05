'use client'

const MODES = [
  { id: 'express',    label: 'EXPRESS',    icon: '⚡' },
  { id: 'structured', label: 'STRUCTURÉ',  icon: '🧩' },
  { id: 'expert',     label: 'EXPERT',     icon: '⚙️' },
]

export default function ModeToggle({ mode, onSwitch }) {
  return (
    <div className="glass rounded-2xl p-1.5 flex gap-1">
      {MODES.map((m) => {
        const active = mode === m.id
        return (
          <button
            key={m.id}
            onClick={() => onSwitch(m.id)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-3 py-2.5 min-w-0',
              'text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap',
              active
                ? 'bg-opt-gradient text-white shadow-glow'
                : 'text-opt-muted hover:text-opt-text hover:bg-opt-surface',
            ].join(' ')}
          >
            <span className="text-base leading-none">{m.icon}</span>
            <span className="tracking-wide">{m.label}</span>
          </button>
        )
      })}
    </div>
  )
}
