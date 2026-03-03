'use client'

import { useState } from 'react'
import {
  TASK_TYPES, DOMAINS, SIZES, AUDIENCES, LEVELS,
  DOCUMENT_TYPES, LENGTHS, TONES, STRUCTURES,
} from '@/lib/constants'

/**
 * Mode Structuré : Framework TCOF en 4 blocs accordéons + options avancées.
 */
export default function StructuredMode({ data, onChange }) {
  const [open, setOpen] = useState({ task: true, context: false, output: false, format: false, advanced: false })

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })
  const setOpt = (key) => (e) => onChange({
    ...data,
    options: { ...data.options, [key]: e.target.checked },
  })

  const domainList = Object.keys(DOMAINS)
  const subdomains = data.domain ? (DOMAINS[data.domain] || []) : []

  const selectClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet transition-colors bg-white'
  const textareaClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet transition-colors resize-none bg-white'

  return (
    <div className="space-y-3 tab-enter">

      {/* ── BLOC TASK ── */}
      <Accordion label="TÂCHE" open={open.task} onToggle={() => toggle('task')} filled={!!(data.taskType || data.objective)}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Type de tâche</label>
            <select value={data.taskType} onChange={set('taskType')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Objectif</label>
            <textarea
              value={data.objective}
              onChange={set('objective')}
              rows={3}
              placeholder="Décrivez précisément ce que vous voulez obtenir"
              className={textareaClass}
            />
          </div>
        </div>
      </Accordion>

      {/* ── BLOC CONTEXT ── */}
      <Accordion label="CONTEXTE" open={open.context} onToggle={() => toggle('context')} filled={!!(data.domain || data.audience)}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Secteur</label>
              <select
                value={data.domain}
                onChange={(e) => onChange({ ...data, domain: e.target.value, subdomain: '' })}
                className={selectClass}
              >
                <option value="">-- Choisir --</option>
                {domainList.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Sous-domaine</label>
              <select value={data.subdomain} onChange={set('subdomain')} className={selectClass} disabled={!data.domain}>
                <option value="">-- Choisir --</option>
                {subdomains.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Taille structure</label>
              <select value={data.size} onChange={set('size')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Public cible</label>
              <select value={data.audience} onChange={set('audience')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="field-label">Niveau de l'audience</label>
            <select value={data.level} onChange={set('level')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Situation (contexte libre)</label>
            <textarea
              value={data.situation}
              onChange={set('situation')}
              rows={2}
              placeholder="Décrivez le contexte spécifique de votre demande"
              className={textareaClass}
            />
          </div>
        </div>
      </Accordion>

      {/* ── BLOC OUTPUT ── */}
      <Accordion label="LIVRABLE" open={open.output} onToggle={() => toggle('output')} filled={!!(data.documentType || data.length)}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Type de document</label>
            <select value={data.documentType} onChange={set('documentType')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {DOCUMENT_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Longueur souhaitée</label>
            <select value={data.length} onChange={set('length')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {LENGTHS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </Accordion>

      {/* ── BLOC FORMAT ── */}
      <Accordion label="STYLE" open={open.format} onToggle={() => toggle('format')} filled={!!(data.tone || data.structure)}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Ton</label>
            <select value={data.tone} onChange={set('tone')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Structure de la réponse</label>
            <select value={data.structure} onChange={set('structure')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {STRUCTURES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </Accordion>

      {/* ── OPTIONS AVANCÉES ── */}
      <Accordion
        label="+ OPTIONS AVANCÉES"
        open={open.advanced}
        onToggle={() => toggle('advanced')}
        filled={Object.values(data.options || {}).some(Boolean)}
        subtle
      >
        <div className="space-y-2.5">
          {[
            { key: 'askQuestions',  label: "Demande-moi des questions avant de répondre" },
            { key: 'stepByStep',    label: "Raisonnement étape par étape" },
            { key: 'markUncertain', label: "Signale les infos incertaines [A VERIFIER]" },
            { key: 'autoVerify',    label: "Auto-vérification en fin de réponse" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.options?.[key] || false}
                onChange={setOpt(key)}
                className="mt-0.5 w-4 h-4 accent-opt-violet flex-shrink-0"
              />
              <span className="text-sm text-opt-text group-hover:text-opt-violet transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </Accordion>

    </div>
  )
}

// ─── Composant accordéon réutilisable ─────────────────────────────────────────

function Accordion({ label, open, onToggle, children, filled, subtle }) {
  return (
    <div className={`rounded-xl border transition-colors ${
      subtle
        ? 'border-dashed border-gray-200 bg-white'
        : open ? 'border-opt-violet/30 bg-white' : 'border-gray-200 bg-white'
    }`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className={`text-xs font-bold tracking-widest ${subtle ? 'text-opt-muted' : 'text-opt-violet'}`}>
          {label}
        </span>
        <span className="flex items-center gap-2">
          {filled && !open && (
            <span className="w-2 h-2 rounded-full bg-opt-violet" title="Rempli" />
          )}
          <span className={`text-opt-muted text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}
