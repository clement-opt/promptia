'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('opt_promptia_theme')
    if (saved === 'light') {
      document.documentElement.classList.add('light')
      setDark(false)
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('opt_promptia_theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('opt_promptia_theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ background: dark ? 'rgba(198, 7, 179, 0.3)' : 'rgba(160, 5, 154, 0.2)' }}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs"
        style={{
          left: dark ? '2px' : 'calc(100% - 22px)',
          background: dark ? '#c607b3' : '#A0059A',
          boxShadow: '0 0 8px rgba(198, 7, 179, 0.4)',
        }}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
