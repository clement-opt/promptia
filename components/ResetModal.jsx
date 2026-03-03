'use client'

/**
 * Modal de confirmation avant réinitialisation de tous les champs.
 */
export default function ResetModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fond */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="text-4xl mb-3">🗑️</div>
        <h2 className="font-titre font-bold text-opt-text text-lg mb-2">
          Réinitialiser PromptIA ?
        </h2>
        <p className="text-opt-muted text-sm mb-6">
          Tous les champs seront vidés. Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm
              text-opt-muted hover:border-opt-violet hover:text-opt-violet transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-opt-coral text-white rounded-xl py-2.5 text-sm
              font-semibold hover:bg-[#b0354f] active:scale-[0.98] transition-all"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}
