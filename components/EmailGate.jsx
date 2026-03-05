'use client'

import { useState } from 'react'
import { saveLead } from '@/lib/supabase'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

export default function EmailGate({ onAccess }) {
  const [nom, setNom]         = useState('')
  const [prenom, setPrenom]   = useState('')
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedNom = nom.trim()
    const trimmedPrenom = prenom.trim()

    if (!trimmedNom) {
      setError('Veuillez entrer votre nom.')
      return
    }
    if (!trimmedPrenom) {
      setError('Veuillez entrer votre prénom.')
      return
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Veuillez entrer une adresse email valide.')
      return
    }

    setLoading(true)
    setError('')

    // Persister immédiatement pour éviter la boucle d'auth
    try {
      localStorage.setItem('opt_kit_ia_email', trimmedEmail)
      localStorage.setItem('opt_kit_ia_nom', trimmedNom)
      localStorage.setItem('opt_kit_ia_prenom', trimmedPrenom)
    } catch {}

    onAccess(trimmedEmail)

    // Enregistrer le lead en arrière-plan (non bloquant)
    saveLead(trimmedEmail, trimmedNom, trimmedPrenom, 'promptia')
  }

  const inputClass = [
    'w-full border rounded-xl px-4 py-3 text-sm transition-colors',
    'focus:outline-none focus:ring-2',
    'bg-opt-input-bg text-opt-text',
    error
      ? 'border-opt-coral focus:border-opt-coral focus:ring-opt-coral/20'
      : 'border-[var(--opt-input-border)] focus:border-[var(--opt-violet)] focus:ring-[var(--opt-violet)]/20',
    'disabled:opacity-60',
  ].join(' ')

  return (
    <div className="min-h-screen bg-opt-fond flex flex-col relative">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(198, 7, 179, 0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* En-tête */}
      <header className="glass py-4 px-6 relative z-10"
        style={{ borderBottom: '1px solid var(--opt-header-border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <div className="max-w-xl w-full">

          {/* Titre */}
          <h1 className="font-titre text-3xl sm:text-4xl font-bold mb-3 leading-tight gradient-text">
            PromptIA - Votre assistant prompt
          </h1>
          <p className="text-opt-muted text-lg mb-8 leading-relaxed">
            Générez des prompts IA professionnels en quelques clics.
            3 modes de complexité pour tous les niveaux.
          </p>

          {/* Aperçu des 3 modes */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'EXPRESS', desc: 'Rapide', icon: '⚡' },
              { label: 'STRUCTURÉ', desc: 'Guidé', icon: '🧩' },
              { label: 'EXPERT', desc: 'Complet', icon: '⚙️' },
            ].map((m) => (
              <div
                key={m.label}
                className="glass rounded-xl p-3 text-center glow-accent"
              >
                <div className="text-xl mb-1">{m.icon}</div>
                <p className="text-opt-text text-xs font-bold tracking-wide">{m.label}</p>
                <p className="text-opt-muted text-xs mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="glass rounded-2xl p-6 sm:p-8 glow-accent">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nom" className="block text-opt-text font-semibold text-sm mb-2">
                    Nom
                  </label>
                  <input
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => { setNom(e.target.value); setError('') }}
                    placeholder="Dupont"
                    autoComplete="family-name"
                    disabled={loading}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-opt-text font-semibold text-sm mb-2">
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    value={prenom}
                    onChange={(e) => { setPrenom(e.target.value); setError('') }}
                    placeholder="Jean"
                    autoComplete="given-name"
                    disabled={loading}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-opt-text font-semibold text-sm mb-2">
                  Adresse email professionnelle
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="prenom.nom@entreprise.fr"
                  autoComplete="email"
                  disabled={loading}
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="text-opt-coral text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-opt-gradient text-white rounded-xl px-6 py-3.5
                  font-semibold text-sm hover:shadow-glow active:scale-[0.98]
                  transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent
                      rounded-full animate-spin" />
                    Chargement...
                  </span>
                ) : (
                  'Accéder à PromptIA'
                )}
              </button>
            </form>

          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="py-4 px-6 text-center relative z-10">
        <p className="text-opt-muted text-xs">
          PromptIA par OPT. | opt-conseil.fr | clement@opt-conseil.fr
        </p>
      </footer>
    </div>
  )
}
