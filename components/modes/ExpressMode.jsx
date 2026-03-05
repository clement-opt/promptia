'use client'

import { EXPRESS_ROLES, EXPRESS_FORMATS } from '@/lib/constants'
import SelectWithOther from '../SelectWithOther'

export default function ExpressMode({ data, onChange }) {
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })

  const selectClass = [
    'w-full border rounded-xl px-4 py-3 text-sm',
    'focus:outline-none focus:ring-2 focus:ring-[var(--opt-violet)]/20 focus:border-[var(--opt-violet)]',
    'transition-colors',
  ].join(' ')

  const textareaClass = [
    'w-full border rounded-xl px-4 py-3 text-sm',
    'focus:outline-none focus:ring-2 focus:ring-[var(--opt-violet)]/20 focus:border-[var(--opt-violet)]',
    'transition-colors resize-none',
  ].join(' ')

  return (
    <div className="space-y-5 tab-enter">

      {/* Champ 1 : Rôle */}
      <div>
        <label className="block text-opt-text font-semibold text-sm mb-1.5">
          Tu es un...
        </label>
        <SelectWithOther
          value={data.role}
          customValue={data.customRole}
          onChange={set('role')}
          onCustomChange={set('customRole')}
          options={EXPRESS_ROLES}
          placeholder="-- Choisir un rôle --"
          customPlaceholder="Ex : Responsable qualité, Architecte..."
          className={selectClass}
        />
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
        <SelectWithOther
          value={data.format}
          customValue={data.customFormat}
          onChange={set('format')}
          onCustomChange={set('customFormat')}
          options={EXPRESS_FORMATS}
          placeholder="-- Choisir un format de sortie --"
          customPlaceholder="Précisez le format souhaité..."
          className={selectClass}
        />
      </div>

    </div>
  )
}
