'use client'

/**
 * Panneau de prévisualisation du prompt généré.
 * Contient le bouton Copier, Réinitialiser et Templates.
 */
export default function PromptPreview({ prompt, onCopy, onReset, onTemplates }) {
  const empty = !prompt || !prompt.trim()

  return (
    <div className="flex flex-col gap-3">

      {/* Boutons d'action */}
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          disabled={empty}
          className={[
            'flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5',
            'text-sm font-semibold transition-all',
            empty
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-opt-violet text-white hover:bg-[#580f56] active:scale-[0.98]',
          ].join(' ')}
        >
          <span>📋</span> Copier
        </button>
        <button
          onClick={onTemplates}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200
            text-opt-muted text-sm hover:border-opt-violet hover:text-opt-violet transition-all"
        >
          <span>📂</span>
          <span className="hidden sm:inline">Templates</span>
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200
            text-opt-muted text-sm hover:border-opt-coral hover:text-opt-coral transition-all"
        >
          <span>🗑️</span>
          <span className="hidden sm:inline">Vider</span>
        </button>
      </div>

      {/* Zone de prévisualisation */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 min-h-[300px] relative">
        {empty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-opt-muted text-sm font-medium">Votre prompt apparaîtra ici</p>
            <p className="text-opt-muted/60 text-xs mt-1">Remplissez les champs à gauche</p>
          </div>
        ) : (
          <pre className="prompt-preview">{prompt}</pre>
        )}
      </div>

    </div>
  )
}
