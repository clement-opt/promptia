'use client'

import { useState, useEffect } from 'react'

export default function Logo({ className = 'h-8 object-contain' }) {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light'))
    check()

    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <img
      src={isLight ? '/logo-dark.png' : '/logo-white.png'}
      alt="OPT Conseil"
      className={className}
    />
  )
}
