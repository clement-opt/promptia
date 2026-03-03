'use client'

import { useState, useMemo, useCallback } from 'react'
import ModeToggle from './ModeToggle'
import ScoreJauge from './ScoreJauge'
import PromptPreview from './PromptPreview'
import TemplatesModal from './TemplatesModal'
import ResetModal from './ResetModal'
import Toast from './Toast'
import ExpressMode from './modes/ExpressMode'
import StructuredMode from './modes/StructuredMode'
import ExpertMode from './modes/ExpertMode'
import { buildExpressPrompt, buildStructuredPrompt, buildExpertPrompt, calculateScore } from '@/lib/promptBuilder'
import { DEFAULT_CRITERIA } from '@/lib/constants'

// ─── États initiaux ──────────────────────────────────────────────────────────

const INIT_EXPRESS = { role: '', customRole: '', want: '', format: '' }

const INIT_STRUCTURED = {
  taskType: '', objective: '', domain: '', subdomain: '',
  size: '', audience: '', level: '', situation: '',
  documentType: '', length: '', tone: '', structure: '',
  options: { askQuestions: false, stepByStep: false, markUncertain: false, autoVerify: false },
}

const INIT_EXPERT = {
  role: '', customRole: '', years: 5, specializations: [], personality: '',
  taskType: '', objective: '', successCriteria: '', notThis: '',
  domain: '', subdomain: '', size: '', audience: '', level: '',
  situation: '', rawData: '', history: '',
  length: '', tone: '', structure: '',
  negativeConstraints: '', positiveConstraints: '',
  documentType: '', mandatorySections: '', template: '',
  guardrails: [],
  examples: [],
  criteria: [...DEFAULT_CRITERIA],
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function PromptIAApp() {
  const [mode, setMode]             = useState('express')
  const [express, setExpress]       = useState(INIT_EXPRESS)
  const [structured, setStructured] = useState(INIT_STRUCTURED)
  const [expert, setExpert]         = useState(INIT_EXPERT)

  const [toast, setToast]           = useState({ visible: false, message: '' })
  const [copyCount, setCopyCount]   = useState(0)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showReset, setShowReset]   = useState(false)

  // ── Génération du prompt en temps réel ────────────────────────────────────

  const prompt = useMemo(() => {
    if (mode === 'express')    return buildExpressPrompt(express)
    if (mode === 'structured') return buildStructuredPrompt(structured)
    return buildExpertPrompt(expert)
  }, [mode, express, structured, expert])

  // ── Score qualité ─────────────────────────────────────────────────────────

  const score = useMemo(
    () => calculateScore(mode, express, structured, expert),
    [mode, express, structured, expert]
  )

  // ── Changement de mode avec propagation ───────────────────────────────────

  const switchMode = useCallback((newMode) => {
    if (newMode === 'structured' && mode === 'express') {
      setStructured((prev) => ({
        ...prev,
        objective:    express.want    || prev.objective,
        documentType: express.format  || prev.documentType,
      }))
    }
    if (newMode === 'expert') {
      const src = mode === 'structured' ? structured : { objective: express.want, documentType: express.format }
      setExpert((prev) => ({
        ...prev,
        objective:    src.objective    || express.want  || prev.objective,
        domain:       src.domain       || prev.domain,
        subdomain:    src.subdomain    || prev.subdomain,
        size:         src.size         || prev.size,
        audience:     src.audience     || prev.audience,
        level:        src.level        || prev.level,
        situation:    src.situation    || prev.situation,
        documentType: src.documentType || express.format || prev.documentType,
        length:       src.length       || prev.length,
        tone:         src.tone         || prev.tone,
        structure:    src.structure    || prev.structure,
        taskType:     src.taskType     || prev.taskType,
      }))
    }
    setMode(newMode)
  }, [mode, express, structured])

  // ── Copier le prompt ──────────────────────────────────────────────────────

  const handleCopy = useCallback(() => {
    if (!prompt) return
    navigator.clipboard.writeText(prompt).then(() => {
      showToast('Prompt copié !')
      const next = copyCount + 1
      setCopyCount(next)
      if (next === 3) {
        setTimeout(() => showToast('Vous aimez PromptIA ? Découvrez nos formations IA sur opt-conseil.fr'), 2500)
      }
    })
  }, [prompt, copyCount])

  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message }), 2500)
  }

  // ── Réinitialisation ──────────────────────────────────────────────────────

  const handleReset = () => {
    setExpress(INIT_EXPRESS)
    setStructured(INIT_STRUCTURED)
    setExpert({ ...INIT_EXPERT, criteria: [...DEFAULT_CRITERIA] })
    setShowReset(false)
    showToast('PromptIA a été réinitialisé')
  }

  // ── Application d'un template ─────────────────────────────────────────────

  const applyTemplate = useCallback((template) => {
    const { mode: tMode, values } = template
    setMode(tMode)

    if (tMode === 'express') {
      setExpress((prev) => ({ ...prev, ...values }))
    } else if (tMode === 'structured') {
      setStructured((prev) => ({ ...prev, ...values }))
    } else {
      setExpert((prev) => ({
        ...prev,
        ...values,
        guardrails: values.guardrails || prev.guardrails,
      }))
    }
    showToast(`Template "${template.name}" appliqué`)
  }, [])

  // ─── Rendu ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-opt-fond flex flex-col">

      {/* Header */}
      <header className="bg-opt-dark py-3 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-white font-titre font-bold text-xl tracking-widest">OPT.</span>
          <span className="text-white/60 text-sm hidden sm:block">PromptIA - Générateur de prompts IA</span>
        </div>
      </header>

      {/* Corps principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-5">

        {/* Toggle modes */}
        <div className="mb-5">
          <ModeToggle mode={mode} onSwitch={switchMode} />
        </div>

        {/* Layout desktop : 60/40 */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Panneau gauche : champs de saisie */}
          <div className="flex-1 lg:w-3/5">
            {mode === 'express'    && <ExpressMode    data={express}    onChange={setExpress} />}
            {mode === 'structured' && <StructuredMode data={structured} onChange={setStructured} />}
            {mode === 'expert'     && <ExpertMode     data={expert}     onChange={setExpert} />}
          </div>

          {/* Panneau droit : score + preview (sticky sur desktop) */}
          <div className="lg:w-2/5 lg:sticky lg:top-4 lg:self-start space-y-3">
            <ScoreJauge score={score} />
            <PromptPreview
              prompt={prompt}
              onCopy={handleCopy}
              onReset={() => setShowReset(true)}
              onTemplates={() => setShowTemplates(true)}
            />
          </div>
        </div>

        {/* Bouton "Copier" sticky en bas sur mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40">
          <button
            onClick={handleCopy}
            disabled={!prompt}
            className={[
              'w-full rounded-xl py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2',
              !prompt
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-opt-violet text-white hover:bg-[#580f56] active:scale-[0.98]',
            ].join(' ')}
          >
            <span>📋</span> Copier le prompt
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-opt-muted text-xs">
            PromptIA par OPT. | opt-conseil.fr
          </p>
          <a
            href={process.env.NEXT_PUBLIC_RDV_URL || 'https://opt-conseil.fr'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-opt-violet text-xs font-medium hover:underline"
          >
            Besoin d'aller plus loin ? Prenez RDV →
          </a>
        </div>
      </footer>

      {/* Modals */}
      {showTemplates && (
        <TemplatesModal onApply={applyTemplate} onClose={() => setShowTemplates(false)} />
      )}
      {showReset && (
        <ResetModal onConfirm={handleReset} onCancel={() => setShowReset(false)} />
      )}

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
