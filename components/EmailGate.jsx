'use client'

import { useState } from 'react'
import { saveLead } from '@/lib/supabase'

/**
 * Portail d'accès PromptIA : capture l'email, l'enregistre dans Supabase,
 * puis appelle onAccess pour afficher le générateur de prompts.
 */
export default function EmailGate({ onAccess }) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Veuillez entrer une adresse email valide.')
      return
    }

    setLoading(true)
    setError('')

    // Enregistrement Supabase (non bloquant)
    await saveLead(trimmed, 'promptia_v2', 'promptia_generator')

    // Stockage local pour éviter de redemander à la prochaine visite
    try {
      localStorage.setItem('opt_kit_ia_email', trimmed)
    } catch {
      // Mode privé - on continue quand même
    }

    onAccess(trimmed)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-opt-fond flex flex-col">

      {/* En-tête */}
      <header className="bg-opt-dark py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-white font-titre font-bold text-xl tracking-widest">OPT.</span>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-opt-violet/10 text-opt-violet
            text-sm font-medium px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-opt-violet" />
            Accès gratuit
          </div>

          {/* Titre */}
          <h1 className="font-titre text-3xl sm:text-4xl font-bold text-opt-text mb-3 leading-tight">
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
                className="bg-white rounded-xl shadow-card p-3 text-center border border-gray-100"
              >
                <div className="text-xl mb-1">{m.icon}</div>
                <p className="text-opt-text text-xs font-bold tracking-wide">{m.label}</p>
                <p className="text-opt-muted text-xs mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="block text-opt-text font-semibold text-sm mb-2">
                  Votre adresse email professionnelle
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="prenom.nom@entreprise.fr"
                  autoComplete="email"
                  disabled={loading}
                  className={[
                    'w-full border rounded-xl px-4 py-3 text-opt-text text-sm',
                    'focus:outline-none focus:ring-2 transition-colors',
                    error
                      ? 'border-opt-coral focus:border-opt-coral focus:ring-opt-coral/20'
                      : 'border-gray-200 focus:border-opt-violet focus:ring-opt-violet/20',
                    'disabled:opacity-60',
                  ].join(' ')}
                />
                {error && (
                  <p className="text-opt-coral text-xs mt-1.5">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-opt-violet text-white rounded-xl px-6 py-3.5
                  font-semibold text-sm hover:bg-[#580f56] active:scale-[0.98]
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

            {/* Mention RGPD */}
            <p className="text-opt-muted text-xs mt-4 text-center leading-relaxed">
              Vos données sont utilisées uniquement pour l'accès à cet outil.
              Aucun envoi commercial sans votre accord.
            </p>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="py-4 px-6 text-center">
        <p className="text-opt-muted text-xs">
          PromptIA par OPT. | opt-conseil.fr | clement@opt-conseil.fr
        </p>
      </footer>
    </div>
  )
}
