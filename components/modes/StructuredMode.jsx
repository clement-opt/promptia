'use client'

import { useState } from 'react'
import {
  TASK_TYPES, DOMAINS, SIZES, AUDIENCES, LEVELS,
  DOCUMENT_TYPES, LENGTHS, TONES, STRUCTURES,
} from '@/lib/constants'
import SelectWithOther from '../SelectWithOther'

export default function StructuredMode({ data, onChange }) {
  const [open, setOpen] = useState({ task: true, context: false, output: false, format: false, advanced: false })

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })
  const setOpt = (key) => (e) => onChange({
    ...data,
    options: { ...data.options, [key]: e.target.checked },
  })

  const domainList = Object.keys(DOMAINS)
  const subdomains = data.domain && data.domain !== 'Autre' ? (DOMAINS[data.domain] || []) : []

  const selectClass = 'w-full border rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-[var(--opt-violet)]/20 focus:border-[var(--opt-violet)] transition-colors'
  const textareaClass = 'w-full border rounded-xl px-4 py-2.5 text-opt-text text-sm focus:outline-none focus:ring-2 focus:ring-[var(--opt-violet)]/20 focus:border-[var(--opt-violet)] transition-colors resize-none'

  return (
    <div className="space-y-3 tab-enter">

      {/* ── BLOC TASK ── */}
      <Accordion label="TÂCHE" open={open.task} onToggle={() => toggle('task')} filled={!!(data.taskType || data.objective)}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Type de tâche</label>
            <p className="field-hint">Ce que l'IA doit faire : rédiger, analyser, résumer...</p>
            <SelectWithOther
              value={data.taskType}
              customValue={data.customTaskType}
              onChange={set('taskType')}
              onCustomChange={set('customTaskType')}
              options={TASK_TYPES}
              className={selectClass}
            />
          </div>
          <div>
            <label className="field-label">Objectif</label>
            <p className="field-hint">Le résultat concret que vous attendez de l'IA</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="field-label">Secteur</label>
              <p className="field-hint">Le domaine d'activité concerné (ex : marketing, finance, santé)</p>
              <SelectWithOther
                value={data.domain}
                customValue={data.customDomain}
                onChange={(e) => onChange({ ...data, domain: e.target.value, subdomain: '' })}
                onCustomChange={set('customDomain')}
                options={domainList}
                className={selectClass}
              />
            </div>
            <div>
              <label className="field-label">Sous-domaine</label>
              <p className="field-hint">La spécialité précise au sein du secteur</p>
              <SelectWithOther
                value={data.subdomain}
                customValue={data.customSubdomain}
                onChange={set('subdomain')}
                onCustomChange={set('customSubdomain')}
                options={subdomains}
                className={selectClass}
                disabled={!data.domain || data.domain === 'Autre'}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="field-label">Taille structure</label>
              <p className="field-hint">La taille de l'entreprise ou organisation concernée</p>
              <SelectWithOther
                value={data.size}
                customValue={data.customSize}
                onChange={set('size')}
                onCustomChange={set('customSize')}
                options={SIZES}
                className={selectClass}
              />
            </div>
            <div>
              <label className="field-label">Public cible</label>
              <p className="field-hint">À qui s'adresse le résultat produit par l'IA</p>
              <SelectWithOther
                value={data.audience}
                customValue={data.customAudience}
                onChange={set('audience')}
                onCustomChange={set('customAudience')}
                options={AUDIENCES}
                className={selectClass}
              />
            </div>
          </div>
          <div>
            <label className="field-label">Niveau de l'audience</label>
            <p className="field-hint">Le degré d'expertise de votre audience sur le sujet</p>
            <SelectWithOther
              value={data.level}
              customValue={data.customLevel}
              onChange={set('level')}
              onCustomChange={set('customLevel')}
              options={LEVELS}
              className={selectClass}
            />
          </div>
          <div>
            <label className="field-label">Situation (contexte libre)</label>
            <p className="field-hint">Tout élément de contexte utile : deadline, enjeu, contrainte...</p>
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
            <p className="field-hint">Le type de livrable attendu : email, rapport, tableau...</p>
            <SelectWithOther
              value={data.documentType}
              customValue={data.customDocumentType}
              onChange={set('documentType')}
              onCustomChange={set('customDocumentType')}
              options={DOCUMENT_TYPES}
              className={selectClass}
            />
          </div>
          <div>
            <label className="field-label">Longueur souhaitée</label>
            <p className="field-hint">La taille approximative du résultat final</p>
            <SelectWithOther
              value={data.length}
              customValue={data.customLength}
              onChange={set('length')}
              onCustomChange={set('customLength')}
              options={LENGTHS}
              className={selectClass}
            />
          </div>
        </div>
      </Accordion>

      {/* ── BLOC FORMAT ── */}
      <Accordion label="STYLE" open={open.format} onToggle={() => toggle('format')} filled={!!(data.tone || data.structure)}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Ton</label>
            <p className="field-hint">Le registre de langage : formel, décontracté, pédagogique...</p>
            <SelectWithOther
              value={data.tone}
              customValue={data.customTone}
              onChange={set('tone')}
              onCustomChange={set('customTone')}
              options={TONES}
              className={selectClass}
            />
          </div>
          <div>
            <label className="field-label">Structure de la réponse</label>
            <p className="field-hint">Comment organiser le contenu : liste, tableau, paragraphes...</p>
            <SelectWithOther
              value={data.structure}
              customValue={data.customStructure}
              onChange={set('structure')}
              onCustomChange={set('customStructure')}
              options={STRUCTURES}
              className={selectClass}
            />
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
                className="mt-0.5 w-4 h-4 accent-[var(--opt-violet)] flex-shrink-0"
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

function Accordion({ label, open, onToggle, children, filled, subtle }) {
  return (
    <div className={`rounded-xl border transition-colors ${
      subtle
        ? 'border-dashed border-opt-border bg-opt-card'
        : open ? 'border-[var(--opt-violet)]/30 bg-opt-card' : 'border-opt-border bg-opt-card'
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
        <div className="px-4 pb-4 pt-1 border-t border-opt-border">
          {children}
        </div>
      )}
    </div>
  )
}
