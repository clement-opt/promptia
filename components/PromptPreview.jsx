'use client'

import { useMemo } from 'react'

/**
 * Simple markdown to HTML converter for preview.
 * Handles: ## headings, - lists, **bold**, *italic*, `code`, ---, > blockquotes
 */
function renderMarkdown(text) {
  if (!text) return ''

  const lines = text.split('\n')
  let html = ''
  let inList = false
  let listType = null // 'ul' or 'ol'

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Close list if line is not a list item
    const isUnorderedItem = /^[\s]*[-*]\s+/.test(line)
    const isOrderedItem = /^[\s]*\d+[.)]\s+/.test(line)

    if (inList && !isUnorderedItem && !isOrderedItem) {
      html += `</${listType}>`
      inList = false
      listType = null
    }

    // Headings
    if (/^####\s+(.+)/.test(line)) {
      html += `<h4>${escapeAndFormat(line.replace(/^####\s+/, ''))}</h4>`
      continue
    }
    if (/^###\s+(.+)/.test(line)) {
      html += `<h3>${escapeAndFormat(line.replace(/^###\s+/, ''))}</h3>`
      continue
    }
    if (/^##\s+(.+)/.test(line)) {
      html += `<h2>${escapeAndFormat(line.replace(/^##\s+/, ''))}</h2>`
      continue
    }
    if (/^#\s+(.+)/.test(line)) {
      html += `<h1>${escapeAndFormat(line.replace(/^#\s+/, ''))}</h1>`
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html += '<hr/>'
      continue
    }

    // Blockquote
    if (/^>\s*(.*)/.test(line)) {
      const content = line.replace(/^>\s*/, '')
      html += `<blockquote><p>${escapeAndFormat(content)}</p></blockquote>`
      continue
    }

    // Unordered list items
    if (isUnorderedItem) {
      const content = line.replace(/^[\s]*[-*]\s+/, '')
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`
        html += '<ul>'
        inList = true
        listType = 'ul'
      }
      html += `<li>${escapeAndFormat(content)}</li>`
      continue
    }

    // Ordered list items
    if (isOrderedItem) {
      const content = line.replace(/^[\s]*\d+[.)]\s+/, '')
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`
        html += '<ol>'
        inList = true
        listType = 'ol'
      }
      html += `<li>${escapeAndFormat(content)}</li>`
      continue
    }

    // Empty line
    if (line.trim() === '') {
      html += '<br/>'
      continue
    }

    // Regular paragraph
    html += `<p>${escapeAndFormat(line)}</p>`
  }

  if (inList) {
    html += `</${listType}>`
  }

  return html
}

function escapeAndFormat(text) {
  // Escape HTML
  let s = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Bold
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Inline code
  s = s.replace(/`(.+?)`/g, '<code>$1</code>')

  return s
}

export default function PromptPreview({ prompt, onCopy, onReset, onTemplates }) {
  const empty = !prompt || !prompt.trim()

  const renderedHtml = useMemo(() => renderMarkdown(prompt), [prompt])

  return (
    <div className="flex flex-col gap-3">

      {/* Message d'onboarding */}
      <p className="text-opt-muted/60 text-xs text-center">
        Remplissez les champs, copiez le prompt, puis collez-le dans votre IA préférée
      </p>

      {/* Boutons d'action */}
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          disabled={empty}
          className={[
            'flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5',
            'text-sm font-semibold transition-all',
            empty
              ? 'bg-opt-surface text-opt-muted cursor-not-allowed'
              : 'bg-opt-gradient text-white hover:shadow-glow active:scale-[0.98]',
          ].join(' ')}
        >
          <span>📋</span> Copier
        </button>
        <button
          onClick={onTemplates}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-opt-border
            text-opt-muted text-sm hover:border-opt-violet hover:text-opt-violet transition-all"
        >
          <span>📂</span>
          <span className="hidden sm:inline">Templates</span>
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-opt-border
            text-opt-muted text-sm hover:border-opt-coral hover:text-opt-coral transition-all"
        >
          <span>🗑️</span>
          <span className="hidden sm:inline">Vider</span>
        </button>
      </div>

      {/* Zone de prévisualisation */}
      <div className="glass rounded-xl p-4 min-h-[300px] relative">
        {empty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-opt-muted text-sm font-medium">Votre prompt apparaîtra ici</p>
            <p className="text-opt-muted/60 text-xs mt-1">Remplissez les champs à gauche</p>
          </div>
        ) : (
          <div
            className="markdown-preview text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}
      </div>

    </div>
  )
}
