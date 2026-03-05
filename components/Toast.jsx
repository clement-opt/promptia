'use client'

export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed bottom-24 left-1/2 -translate-x-1/2 z-50',
        'glass px-6 py-3 rounded-full shadow-lg',
        'text-sm font-medium text-opt-text pointer-events-none select-none',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      ].join(' ')}
    >
      {message}
    </div>
  )
}
