'use client'

import { useState, useEffect } from 'react'
import {
  DOMAINS, ROLES_BY_DOMAIN, TASK_TYPES, SIZES, AUDIENCES, LEVELS,
  DOCUMENT_TYPES, LENGTHS, TONES, STRUCTURES, PERSONALITIES,
  GUARDRAILS, DEFAULT_CRITERIA,
} from '@/lib/constants'

/**
 * Mode Expert : Contrat IA complet en 8 blocs accordéons.
 */
export default function ExpertMode({ data, onChange }) {
  const [open, setOpen] = useState({
    role: true, mission: false, context: false, constraints: false,
    format: false, guardrails: false, examples: false, autocheck: false,
  })

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })

  const domainList = Object.keys(DOMAINS)
  const subdomains = data.domain ? (DOMAINS[data.domain] || []) : []
  const roles = data.domain ? (ROLES_BY_DOMAIN[data.domain] || []) : []

  // Garde-fous automatiques selon le domaine et type de tâche
  useEffect(() => {
    let auto = [...(data.guardrails || [])]
    let changed = false

    if ((data.domain === 'Juridique' || data.domain === 'Santé') && !auto.includes('incertitude')) {
      auto = [...auto, 'incertitude']
      changed = true
    }
    if ((data.taskType === 'Analyser / Évaluer' || data.taskType === 'Comparer') && !auto.includes('sourcing')) {
      auto = [...auto, 'sourcing']
      changed = true
    }
    if (changed) onChange({ ...data, guardrails: auto })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.domain, data.taskType])

  // Auto-vérification si longueur "Approfondi"
  useEffect(() => {
    if (data.length === 'Approfondi > 1500 mots' && data.criteria?.length === 0) {
      onChange({ ...data, criteria: [...DEFAULT_CRITERIA] })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  const selectClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet transition-colors bg-white'
  const textareaClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet transition-colors resize-none bg-white'
  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-opt-violet/20 focus:border-opt-violet transition-colors bg-white'

  const isSensitiveDomain = data.domain === 'Juridique' || data.domain === 'Santé'

  // Gestion guardrails
  const toggleGuardrail = (id) => {
    const current = data.guardrails || []
    const next = current.includes(id) ? current.filter((g) => g !== id) : [...current, id]
    onChange({ ...data, guardrails: next })
  }

  // Gestion spécialisations (tags)
  const subdomainOptions = data.domain ? (DOMAINS[data.domain] || []) : []
  const toggleSpec = (s) => {
    const current = data.specializations || []
    if (current.includes(s)) {
      onChange({ ...data, specializations: current.filter((x) => x !== s) })
    } else if (current.length < 3) {
      onChange({ ...data, specializations: [...current, s] })
    }
  }

  // Gestion exemples
  const addExample = () => onChange({ ...data, examples: [...(data.examples || []), { input: '', output: '' }] })
  const setExample = (i, key, val) => {
    const ex = [...(data.examples || [])]
    ex[i] = { ...ex[i], [key]: val }
    onChange({ ...data, examples: ex })
  }
  const removeExample = (i) => {
    const ex = [...(data.examples || [])]
    ex.splice(i, 1)
    onChange({ ...data, examples: ex })
  }

  // Gestion critères auto-vérification
  const setCriterion = (i, val) => {
    const cr = [...(data.criteria || [])]
    cr[i] = val
    onChange({ ...data, criteria: cr })
  }

  return (
    <div className="space-y-3 tab-enter">

      {/* ── 1. RÔLE & EXPERTISE ── */}
      <Block label="1. RÔLE & EXPERTISE" open={open.role} onToggle={() => toggle('role')} filled={!!(data.role || data.domain)}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Secteur (filtre le rôle)</label>
              <select
                value={data.domain}
                onChange={(e) => onChange({ ...data, domain: e.target.value, subdomain: '', role: '' })}
                className={selectClass}
              >
                <option value="">-- Choisir --</option>
                {domainList.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Rôle</label>
              <select value={data.role} onChange={set('role')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                <option value="Autre">Autre (préciser)</option>
              </select>
              {data.role === 'Autre' && (
                <input
                  type="text"
                  value={data.customRole}
                  onChange={set('customRole')}
                  placeholder="Votre rôle personnalisé"
                  className={[inputClass, 'mt-2'].join(' ')}
                />
              )}
            </div>
          </div>

          <div>
            <label className="field-label">Années d'expérience : {data.years}</label>
            <input
              type="range"
              min={1} max={30}
              value={data.years}
              onChange={(e) => onChange({ ...data, years: Number(e.target.value) })}
              className="w-full mt-1"
            />
          </div>

          {subdomainOptions.length > 0 && (
            <div>
              <label className="field-label">Spécialisations (max 3)</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {subdomainOptions.map((s) => {
                  const selected = (data.specializations || []).includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpec(s)}
                      className={[
                        'px-2.5 py-1 rounded-full text-xs font-medium border transition-all',
                        selected
                          ? 'bg-opt-violet text-white border-opt-violet'
                          : 'border-gray-200 text-opt-muted hover:border-opt-violet hover:text-opt-violet',
                      ].join(' ')}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <label className="field-label">Posture / Personnalité</label>
            <select value={data.personality} onChange={set('personality')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {PERSONALITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </Block>

      {/* ── 2. MISSION ── */}
      <Block label="2. MISSION" open={open.mission} onToggle={() => toggle('mission')} filled={!!data.objective}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Type de tâche</label>
            <select value={data.taskType} onChange={set('taskType')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Objectif principal</label>
            <textarea value={data.objective} onChange={set('objective')} rows={3}
              placeholder="Décrivez précisément ce que vous attendez" className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Critères de succès</label>
            <textarea value={data.successCriteria} onChange={set('successCriteria')} rows={2}
              placeholder="Comment saurez-vous que le résultat est bon ?" className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Ce que le résultat N'est PAS</label>
            <textarea value={data.notThis} onChange={set('notThis')} rows={2}
              placeholder="Ex : pas de jargon, pas de bullet points" className={textareaClass} />
          </div>
        </div>
      </Block>

      {/* ── 3. CONTEXTE & DONNÉES ── */}
      <Block label="3. CONTEXTE & DONNÉES" open={open.context} onToggle={() => toggle('context')} filled={!!(data.subdomain || data.situation || data.rawData)}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Sous-domaine</label>
              <select value={data.subdomain} onChange={set('subdomain')} className={selectClass} disabled={!data.domain}>
                <option value="">-- Choisir --</option>
                {subdomains.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Taille structure</label>
              <select value={data.size} onChange={set('size')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Public cible</label>
              <select value={data.audience} onChange={set('audience')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Niveau</label>
              <select value={data.level} onChange={set('level')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="field-label">Situation</label>
            <textarea value={data.situation} onChange={set('situation')} rows={2}
              placeholder="Contexte spécifique de votre demande" className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Données d'entrée</label>
            <textarea value={data.rawData} onChange={set('rawData')} rows={4}
              placeholder="Collez ici du contexte brut : notes, extraits, chiffres..." className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Historique</label>
            <textarea value={data.history} onChange={set('history')} rows={2}
              placeholder="Ce qui a déjà été tenté, ce qui n'a pas marché" className={textareaClass} />
          </div>
        </div>
      </Block>

      {/* ── 4. CONTRAINTES ── */}
      <Block label="4. CONTRAINTES" open={open.constraints} onToggle={() => toggle('constraints')} filled={!!(data.length || data.tone || data.negativeConstraints)}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Longueur</label>
              <select value={data.length} onChange={set('length')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {LENGTHS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Ton</label>
              <select value={data.tone} onChange={set('tone')} className={selectClass}>
                <option value="">-- Choisir --</option>
                {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="field-label">Structure</label>
            <select value={data.structure} onChange={set('structure')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {STRUCTURES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Contraintes négatives (NE PAS faire)</label>
            <textarea value={data.negativeConstraints} onChange={set('negativeConstraints')} rows={2}
              placeholder="Ex : Ne pas utiliser de jargon technique, ne pas dépasser 2 pages" className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Contraintes positives (DOIT faire)</label>
            <textarea value={data.positiveConstraints} onChange={set('positiveConstraints')} rows={2}
              placeholder="Ex : Inclure des exemples concrets, proposer des actions immédiates" className={textareaClass} />
          </div>
        </div>
      </Block>

      {/* ── 5. FORMAT DE SORTIE ── */}
      <Block label="5. FORMAT DE SORTIE" open={open.format} onToggle={() => toggle('format')} filled={!!data.documentType}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Type de document</label>
            <select value={data.documentType} onChange={set('documentType')} className={selectClass}>
              <option value="">-- Choisir --</option>
              {DOCUMENT_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Sections obligatoires</label>
            <textarea value={data.mandatorySections} onChange={set('mandatorySections')} rows={2}
              placeholder="Ex : Introduction, Diagnostic, Recommandations, Budget" className={textareaClass} />
          </div>
          <div>
            <label className="field-label">Template (optionnel)</label>
            <textarea value={data.template} onChange={set('template')} rows={4}
              placeholder="Collez un modèle ou une structure à respecter" className={textareaClass} />
          </div>
        </div>
      </Block>

      {/* ── 6. GARDE-FOUS ── */}
      <Block label="6. GARDE-FOUS" open={open.guardrails} onToggle={() => toggle('guardrails')} filled={(data.guardrails || []).length > 0}>
        {isSensitiveDomain && (
          <div className="mb-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <span className="text-amber-500 text-base">⚠️</span>
            <p className="text-xs text-amber-700 font-medium">
              Domaine sensible : la vérification humaine est indispensable avant toute utilisation.
            </p>
          </div>
        )}
        <div className="space-y-2.5">
          {GUARDRAILS.map((g) => {
            const checked = (data.guardrails || []).includes(g.id)
            return (
              <label key={g.id} className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleGuardrail(g.id)}
                  className="mt-0.5 w-4 h-4 accent-opt-violet flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-opt-text group-hover:text-opt-violet transition-colors">
                    {g.label}
                  </p>
                  <p className="text-xs text-opt-muted mt-0.5">{g.text}</p>
                </div>
              </label>
            )
          })}
        </div>
      </Block>

      {/* ── 7. EXEMPLES (few-shot) ── */}
      <Block label="7. EXEMPLES (few-shot)" open={open.examples} onToggle={() => toggle('examples')} filled={(data.examples || []).some((e) => e.input || e.output)}>
        <div className="space-y-3">
          <p className="text-xs text-opt-muted bg-blue-50 border border-blue-100 rounded-lg p-2.5">
            Un bon exemple vaut mieux que 100 mots d'instructions
          </p>
          {(data.examples || []).map((ex, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 relative">
              <button
                type="button"
                onClick={() => removeExample(i)}
                className="absolute top-2 right-2 text-opt-muted hover:text-opt-coral text-xs"
              >
                Supprimer
              </button>
              <p className="text-xs font-bold text-opt-violet">Exemple {i + 1}</p>
              <div>
                <label className="field-label">Input (ce que vous donnez à l'IA)</label>
                <textarea value={ex.input} onChange={(e) => setExample(i, 'input', e.target.value)}
                  rows={2} placeholder="Donnée d'entrée..." className={textareaClass} />
              </div>
              <div>
                <label className="field-label">Output attendu</label>
                <textarea value={ex.output} onChange={(e) => setExample(i, 'output', e.target.value)}
                  rows={2} placeholder="Résultat que vous attendez..." className={textareaClass} />
              </div>
            </div>
          ))}
          {(data.examples || []).length < 3 && (
            <button
              type="button"
              onClick={addExample}
              className="w-full border border-dashed border-opt-violet text-opt-violet text-sm
                rounded-xl py-2.5 hover:bg-opt-violet/5 transition-colors"
            >
              + Ajouter un exemple
            </button>
          )}
        </div>
      </Block>

      {/* ── 8. AUTO-VÉRIFICATION ── */}
      <Block label="8. AUTO-VÉRIFICATION" open={open.autocheck} onToggle={() => toggle('autocheck')} filled={(data.criteria || []).length > 0}>
        <div className="space-y-2.5">
          <p className="text-xs text-opt-muted">
            L'IA notera chaque critère de 0 à 5 et révisera si un score est inférieur à 4.
          </p>
          {(data.criteria || []).map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-opt-violet text-sm font-bold flex-shrink-0">{i + 1}.</span>
              <input
                type="text"
                value={c}
                onChange={(e) => setCriterion(i, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </Block>

    </div>
  )
}

// ─── Composant bloc accordéon ─────────────────────────────────────────────────

function Block({ label, open, onToggle, children, filled }) {
  return (
    <div className={`rounded-xl border transition-colors ${
      open ? 'border-opt-violet/30 bg-white' : 'border-gray-200 bg-white'
    }`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-xs font-bold tracking-widest text-opt-violet">{label}</span>
        <span className="flex items-center gap-2">
          {filled && !open && <span className="w-2 h-2 rounded-full bg-opt-violet" />}
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
