'use client'

import { EXPRESS_ROLES, EXPRESS_FORMATS } from '@/lib/constants'

/**
 * Mode Express : 3 champs simples pour débutants.
 */
export default function ExpressMode({ data, onChange }) {
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })

  const selectClass = [
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-opt-text text-sm',
    'focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet',
    'transition-colors bg-white',
  ].join(' ')

  const textareaClass = [
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-opt-text text-sm',
    'focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet',
    'transition-colors resize-none bg-white',
  ].join(' ')

  return (
    <div className="space-y-5 tab-enter">

      {/* Champ 1 : Rôle */}
      <div>
        <label className="block text-opt-text font-semibold text-sm mb-1.5">
          Tu es un...
        </label>
        <select value={data.role} onChange={set('role')} className={selectClass}>
          <option value="">-- Choisir un rôle --</option>
          {EXPRESS_ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
          <option value="Autre">Autre (préciser ci-dessous)</option>
        </select>
        {data.role === 'Autre' && (
          <input
            type="text"
            value={data.customRole}
            onChange={set('customRole')}
            placeholder="Ex : Responsable qualité, Architecte..."
            className={[selectClass, 'mt-2'].join(' ')}
          />
        )}
      </div>

      {/* Champ 2 : Je veux */}
      <div>
        <label className="block text-opt-text font-semibold text-sm mb-1.5">
          Je veux...
        </label>
        <textarea
          value={data.want}
          onChange={set('want')}
          rows={4}
          placeholder="Décrivez ce que vous voulez obtenir. Ex : un post LinkedIn sur l'automatisation des PME"
          className={textareaClass}
        />
        <p className="text-opt-muted text-xs mt-1">
          {data.want.trim().split(/\s+/).filter(Boolean).length} mot(s)
          {data.want.trim().split(/\s+/).filter(Boolean).length < 10
            ? ' - visez au moins 10 mots pour un meilleur score'
            : ''}
        </p>
      </div>

      {/* Champ 3 : Format */}
      <div>
        <label className="block text-opt-text font-semibold text-sm mb-1.5">
          Le résultat doit être...
        </label>
        <select value={data.format} onChange={set('format')} className={selectClass}>
          <option value="">-- Choisir un format de sortie --</option>
          {EXPRESS_FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

    </div>
  )
}
