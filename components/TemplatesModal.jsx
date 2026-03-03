'use client'

import { TEMPLATES } from '@/lib/constants'

const MODE_LABELS = { express: 'EXPRESS', structured: 'STRUCTURÉ', expert: 'EXPERT' }
const MODE_COLORS = {
  express:    'bg-blue-100 text-blue-700',
  structured: 'bg-violet-100 text-violet-700',
  expert:     'bg-amber-100 text-amber-700',
}

/**
 * Modal/drawer affichant les templates pré-remplis.
 */
export default function TemplatesModal({ onApply, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Fond */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
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

        {/* Liste */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {TEMPLATES.map((t, i) => (
            <button
              key={i}
              onClick={() => { onApply(t); onClose() }}
              className="w-full text-left bg-opt-fond hover:bg-opt-violet/5 border border-transparent
                hover:border-opt-violet/20 rounded-xl px-4 py-3 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-opt-text text-sm group-hover:text-opt-violet transition-colors">
                  {t.name}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${MODE_COLORS[t.mode]}`}>
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
