'use client'

import { TEMPLATES } from '@/lib/constants'

const MODE_LABELS = { express: 'EXPRESS', structured: 'STRUCTURÉ', expert: 'EXPERT' }

export default function TemplatesModal({ onApply, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">

        <div className="flex items-center justify-between px-5 py-4 border-b border-opt-border">
          <div>
            <h2 className="font-titre font-bold text-opt-text text-lg">Templates</h2>
            <p className="text-xs text-opt-muted">Sélectionnez un point de départ</p>
          </div>
          <button
            onClick={onClose}
            className="text-opt-muted hover:text-opt-text text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {TEMPLATES.map((t, i) => (
            <button
              key={i}
              onClick={() => { onApply(t); onClose() }}
              className="w-full text-left bg-opt-surface hover:bg-opt-surface-hover border border-transparent
                hover:border-opt-violet/20 rounded-xl px-4 py-3 transition-all group"
              style={{ '--opt-surface-hover': 'var(--opt-surface-hover, rgba(255,255,255,0.05))' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-opt-text text-sm group-hover:text-opt-violet transition-colors">
                  {t.name}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-opt-gradient text-white">
                  {MODE_LABELS[t.mode]}
                </span>
              </div>
              {t.values.objective && (
                <p className="text-xs text-opt-muted mt-1 line-clamp-1">{t.values.objective}</p>
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
