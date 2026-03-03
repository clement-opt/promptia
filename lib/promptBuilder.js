/**
 * PromptIA - Fonctions de génération de prompts pour les 3 modes
 * Retournent une chaîne vide si les champs obligatoires sont manquants.
 */

import { GUARDRAILS } from './constants'

// ─── MODE EXPRESS ─────────────────────────────────────────────────────────────

export function buildExpressPrompt({ role, customRole, want, format }) {
  const roleLabel = role === 'Autre' ? (customRole || 'expert') : role
  if (!roleLabel && !want && !format) return ''

  const lines = []

  if (roleLabel) {
    lines.push(`Tu es un ${roleLabel} expérimenté.`)
    lines.push('')
  }

  if (want) {
    lines.push(`Ta mission : ${want}`)
    lines.push('')
  }

  if (format) {
    lines.push(`Produis le résultat sous forme de : ${format}`)
    lines.push('')
  }

  lines.push('Règles :')
  lines.push('- Sois concis et actionnable')
  lines.push('- Utilise un langage professionnel et accessible')
  lines.push("- Si une information te manque pour répondre précisément, pose-moi la question avant de répondre")

  return lines.join('\n')
}

// ─── MODE STRUCTURÉ ───────────────────────────────────────────────────────────

export function buildStructuredPrompt({
  taskType, objective,
  domain, subdomain, size, audience, level, situation,
  documentType, length,
  tone, structure,
  options,
}) {
  const hasAnyContent = taskType || objective || domain || documentType
  if (!hasAnyContent) return ''

  const lines = []

  // En-tête rôle/expertise
  lines.push('## INSTRUCTIONS')
  if (domain || subdomain) {
    const spec = subdomain ? `spécialisé en ${subdomain} dans le secteur ${domain}` : `spécialisé dans le secteur ${domain}`
    lines.push(`Tu es un expert ${spec}.`)
  } else {
    lines.push('Tu es un expert dans ton domaine.')
  }
  lines.push('')

  // Contexte
  const hasContext = size || audience || level || situation
  if (hasContext) {
    lines.push('## CONTEXTE')
    if (size)      lines.push(`Structure : ${size}`)
    if (audience)  lines.push(`Public cible : ${audience}${level ? ` (niveau ${level})` : ''}`)
    if (situation) lines.push(`Situation : ${situation}`)
    lines.push('')
  }

  // Tâche
  if (taskType || objective) {
    lines.push('## TÂCHE')
    const task = taskType && objective
      ? `${taskType} : ${objective}`
      : (taskType || objective)
    lines.push(task)
    lines.push('')
  }

  // Contraintes
  const hasConstraints = length || tone || structure || (options && Object.values(options).some(Boolean))
  if (hasConstraints) {
    lines.push('## CONTRAINTES')
    if (length)    lines.push(`- Longueur : ${length}`)
    if (tone)      lines.push(`- Ton : ${tone}`)
    if (structure) lines.push(`- Structure : ${structure}`)
    if (options?.askQuestions)  lines.push("- Avant de répondre, pose-moi 3 questions pour affiner ta réponse")
    if (options?.stepByStep)    lines.push("- Raisonne étape par étape avant de produire le résultat")
    if (options?.markUncertain) lines.push("- Signale toute information incertaine avec [A VERIFIER]")
    lines.push('')
  }

  // Format de sortie
  if (documentType || options?.autoVerify) {
    lines.push('## FORMAT DE SORTIE')
    if (documentType) lines.push(`Produis : ${documentType}`)
    if (options?.autoVerify) {
      lines.push('')
      lines.push('En fin de réponse, vérifie :')
      lines.push("- Le livrable répond à l'objectif")
      lines.push("- Le ton est adapté au public")
      lines.push("- Aucune information n'est inventée")
      lines.push("- Les recommandations sont actionnables")
    }
  }

  return lines.join('\n').trim()
}

// ─── MODE EXPERT ─────────────────────────────────────────────────────────────

export function buildExpertPrompt({
  role, customRole, years, specializations, personality,
  objective, successCriteria, notThis,
  domain, subdomain, size, audience, level, situation, rawData, history,
  length, tone, structure, negativeConstraints, positiveConstraints,
  documentType, mandatorySections, template,
  guardrails,
  examples,
  criteria,
}) {
  const roleLabel = role === 'Autre' ? (customRole || '') : role
  const hasAnyContent = roleLabel || objective || domain || documentType
  if (!hasAnyContent) return ''

  const lines = []

  // RÔLE
  lines.push('## RÔLE')
  const roleBase = roleLabel ? `Tu es un ${roleLabel}` : "Tu es un expert"
  const yearsStr = years && years > 1 ? ` avec ${years} ans d'expérience` : ''
  const specStr  = specializations?.length ? `, spécialisé en ${specializations.join(', ')}` : ''
  lines.push(`${roleBase}${yearsStr}${specStr}.`)
  if (personality) lines.push(`Tu adoptes une posture ${personality}.`)
  lines.push('')

  // MISSION
  const hasMission = objective || successCriteria || notThis
  if (hasMission) {
    lines.push('## MISSION')
    if (objective)        lines.push(`Objectif : ${objective}`)
    if (successCriteria)  lines.push(`Critères de succès : ${successCriteria}`)
    if (notThis)          lines.push(`A éviter : ${notThis}`)
    lines.push('')
  }

  // CONTEXTE
  const hasContext = domain || subdomain || size || audience || level || situation || rawData || history
  if (hasContext) {
    lines.push('## CONTEXTE')
    if (domain || subdomain) {
      const domainStr = [domain, subdomain].filter(Boolean).join(' / ')
      lines.push(`Secteur : ${domainStr}`)
    }
    if (size)      lines.push(`Structure : ${size}`)
    if (audience)  lines.push(`Public : ${audience}${level ? ` (${level})` : ''}`)
    if (situation) lines.push(`Situation : ${situation}`)
    if (rawData) {
      lines.push('')
      lines.push("Données d'entrée :")
      lines.push(rawData)
    }
    if (history) {
      lines.push('')
      lines.push('Historique :')
      lines.push(history)
    }
    lines.push('')
  }

  // CONTRAINTES
  const hasConstraints = length || tone || structure || negativeConstraints || positiveConstraints
  if (hasConstraints) {
    lines.push('## CONTRAINTES')
    if (length)               lines.push(`- Longueur : ${length}`)
    if (tone)                 lines.push(`- Ton : ${tone}`)
    if (structure)            lines.push(`- Structure : ${structure}`)
    if (negativeConstraints)  lines.push(`- NE PAS : ${negativeConstraints}`)
    if (positiveConstraints)  lines.push(`- OBLIGATOIREMENT : ${positiveConstraints}`)
    lines.push('')
  }

  // FORMAT DE SORTIE
  const hasFormat = documentType || mandatorySections || template
  if (hasFormat) {
    lines.push('## FORMAT DE SORTIE')
    if (documentType)       lines.push(`Type : ${documentType}`)
    if (mandatorySections)  lines.push(`Sections obligatoires : ${mandatorySections}`)
    if (template) {
      lines.push('')
      lines.push('Template :')
      lines.push(template)
    }
    lines.push('')
  }

  // GARDE-FOUS
  if (guardrails?.length) {
    lines.push('## GARDE-FOUS')
    guardrails.forEach((id) => {
      const g = GUARDRAILS.find((r) => r.id === id)
      if (g) lines.push(`- ${g.text}`)
    })
    lines.push('')
  }

  // EXEMPLES (few-shot)
  const validExamples = (examples || []).filter((e) => e.input || e.output)
  if (validExamples.length) {
    lines.push('## EXEMPLES')
    validExamples.forEach((ex, i) => {
      lines.push(`Exemple ${i + 1} :`)
      if (ex.input)  lines.push(`Input : ${ex.input}`)
      if (ex.output) lines.push(`Output attendu : ${ex.output}`)
      if (i < validExamples.length - 1) lines.push('')
    })
    lines.push('')
  }

  // AUTO-VÉRIFICATION
  const validCriteria = (criteria || []).filter(Boolean)
  if (validCriteria.length) {
    lines.push('## AUTO-VÉRIFICATION')
    lines.push('Avant de me donner ta réponse, vérifie et note chaque critère de 0 à 5 :')
    validCriteria.forEach((c, i) => lines.push(`${i + 1}. ${c}`))
    lines.push("Si un score < 4, révise automatiquement avant de produire ta réponse finale.")
  }

  return lines.join('\n').trim()
}

// ─── Score de qualité ─────────────────────────────────────────────────────────

export function calculateScore(mode, express, structured, expert) {
  let score = 0

  if (mode === 'express') {
    const roleLabel = express.role === 'Autre' ? express.customRole : express.role
    if (roleLabel)                                             score += 20
    if (express.want?.trim().split(/\s+/).length > 10)        score += 20
    // contexte et garde-fous : pas disponibles en express
    if (express.format)                                        score += 20
  } else if (mode === 'structured') {
    if (structured.domain)                                     score += 20
    if (structured.objective?.trim().split(/\s+/).length > 10) score += 20
    if (structured.domain || structured.audience)              score += 20
    if (structured.documentType)                               score += 20
    const { askQuestions, stepByStep, markUncertain, autoVerify } = structured.options || {}
    if (askQuestions || stepByStep || markUncertain || autoVerify) score += 20
  } else {
    const roleLabel = expert.role === 'Autre' ? expert.customRole : expert.role
    if (roleLabel)                                             score += 20
    if (expert.objective?.trim().split(/\s+/).length > 10)    score += 20
    if (expert.domain || expert.audience)                      score += 20
    if (expert.documentType)                                   score += 20
    if (expert.guardrails?.length > 0)                        score += 20
  }

  return score
}
