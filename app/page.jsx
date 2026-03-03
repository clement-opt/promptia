'use client'

import { useState, useEffect } from 'react'
import EmailGate from '@/components/EmailGate'
import PromptIAApp from '@/components/PromptIAApp'

/**
 * Page principale : affiche le portail email si non identifié,
 * sinon affiche PromptIA.
 */
export default function Home() {
  const [userEmail, setUserEmail] = useState(null)
  const [checking, setChecking]   = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('opt_kit_ia_email')
      if (stored) setUserEmail(stored)
    } catch {
      // Mode privé - on affiche le portail
    }
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-opt-fond flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-opt-violet border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!userEmail) {
    return <EmailGate onAccess={setUserEmail} />
  }

  return <PromptIAApp />
}
