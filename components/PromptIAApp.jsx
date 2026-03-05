'use client'

import { useState, useMemo, useCallback } from 'react'
import ModeToggle from './ModeToggle'
import ScoreJauge from './ScoreJauge'
import PromptPreview from './PromptPreview'
import TemplatesModal from './TemplatesModal'
import ResetModal from './ResetModal'
import Toast from './Toast'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import ExpressMode from './modes/ExpressMode'
import StructuredMode from './modes/StructuredMode'
import ExpertMode from './modes/ExpertMode'
import { buildExpressPrompt, buildStructuredPrompt, buildExpertPrompt, calculateScore } from '@/lib/promptBuilder'
import { DEFAULT_CRITERIA } from '@/lib/constants'
import { incrementPromptCopies } from '@/lib/supabase'

// ─── États initiaux ──────────────────────────────────────────────────────────

const INIT_EXPRESS = { role: '', customRole: '', want: '', format: '', customFormat: '' }

const INIT_STRUCTURED = {
  taskType: '', customTaskType: '', objective: '', domain: '', customDomain: '',
  subdomain: '', customSubdomain: '',
  size: '', customSize: '', audience: '', customAudience: '', level: '', customLevel: '',
  situation: '',
  documentType: '', customDocumentType: '', length: '', customLength: '',
  tone: '', customTone: '', structure: '', customStructure: '',
  options: { askQuestions: false, stepByStep: false, markUncertain: false, autoVerify: false },
}

const INIT_EXPERT = {
  role: '', customRole: '', years: 5, specializations: [], personality: '', customPersonality: '',
  taskType: '', customTaskType: '', objective: '', successCriteria: '', notThis: '',
  domain: '', customDomain: '', subdomain: '', customSubdomain: '',
  size: '', customSize: '', audience: '', customAudience: '', level: '', customLevel: '',
  situation: '', rawData: '', history: '',
  length: '', customLength: '', tone: '', customTone: '', structure: '', customStructure: '',
  negativeConstraints: '', positiveConstraints: '',
  documentType: '', customDocumentType: '', mandatorySections: '', template: '',
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
      showToastMsg('Prompt copié !')
      const next = copyCount + 1
      setCopyCount(next)

      // Incrémenter le compteur Supabase
      try {
        const email = localStorage.getItem('opt_kit_ia_email')
        if (email) incrementPromptCopies(email)
      } catch {}

      if (next === 3) {
        setTimeout(() => showToastMsg('Vous aimez PromptIA ? Découvrez nos formations IA sur opt-conseil.fr'), 2500)
      }
    })
  }, [prompt, copyCount])

  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToastMsg = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message }), 2500)
  }

  // ── Réinitialisation ──────────────────────────────────────────────────────

  const handleReset = () => {
    setExpress(INIT_EXPRESS)
    setStructured(INIT_STRUCTURED)
    setExpert({ ...INIT_EXPERT, criteria: [...DEFAULT_CRITERIA] })
    setShowReset(false)
    showToastMsg('PromptIA a été réinitialisé')
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
    showToastMsg(`Template "${template.name}" appliqué`)
  }, [])

  // ─── Rendu ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-opt-fond flex flex-col relative">

      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, rgba(198, 7, 179, 0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, rgba(235, 80, 116, 0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Header */}
      <header className="glass py-3 px-6 flex-shrink-0 relative z-10"
        style={{ borderBottom: '1px solid var(--opt-header-border)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-opt-muted text-sm hidden sm:block">PromptIA - Générateur de prompts IA</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Corps principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-5 pb-24 lg:pb-5 relative z-10">

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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-40 glass"
          style={{ borderTop: '1px solid var(--opt-border)' }}>
          <button
            onClick={handleCopy}
            disabled={!prompt}
            className={[
              'w-full rounded-xl py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2',
              !prompt
                ? 'bg-opt-surface text-opt-muted cursor-not-allowed'
                : 'bg-opt-gradient text-white hover:shadow-glow active:scale-[0.98]',
            ].join(' ')}
          >
            <span>📋</span> Copier le prompt
          </button>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="relative z-10 py-10 px-6 pb-28 lg:pb-10"
        style={{ background: 'var(--opt-header-bg)', borderTop: '1px solid var(--opt-header-border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">

          {/* Logo */}
          <Logo className="h-12 sm:h-14 object-contain" />

          {/* CTA text */}
          <div className="text-center max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 gradient-text">
              Envie de maîtriser l'IA pour votre business ?
            </h2>
            <p className="text-opt-muted text-sm mb-6">
              Automatisez votre business avec l'IA. Conseil, déploiement, accompagnement.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            {/* Email + WhatsApp côte à côte */}
            <div className="flex gap-3 w-full">
              <a
                href="mailto:clement@opt-conseil.fr"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-full
                  border-2 text-sm font-semibold
                  hover:shadow-[0_0_20px_rgba(196,61,92,0.35)] active:scale-[0.98] transition-all"
                style={{ borderColor: '#C43D5C', color: '#C43D5C' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Email
              </a>
              <a
                href="https://wa.me/33666707006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-full
                  border-2 text-sm font-semibold
                  hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] active:scale-[0.98] transition-all"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
            {/* CTA principal pleine largeur */}
            <a
              href="https://opt-conseil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full
                bg-opt-gradient text-white text-sm font-semibold
                hover:shadow-glow-cta active:scale-[0.98] transition-all"
            >
              En savoir plus
            </a>
          </div>

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
