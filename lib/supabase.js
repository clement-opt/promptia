import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let _client = null

export function createClient() {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[OPT Kit IA] Variables Supabase non configurées.')
    return null
  }

  _client = createSupabaseClient(url, key)
  return _client
}

/**
 * Enregistre un lead dans la table leads_catalogue.
 * Envoie nom, prenom, email, source 'promptia'.
 */
export async function saveLead(email, nom = '', prenom = '', source = 'promptia') {
  try {
    const supabase = createClient()
    if (!supabase) return

    const { error } = await supabase.from('leads_catalogue').insert([
      {
        email:      email.toLowerCase().trim(),
        nom:        nom.trim(),
        prenom:     prenom.trim(),
        source,
        tag:        'promptia_generator',
        created_at: new Date().toISOString(),
      },
    ])

    // 23505 = violation de contrainte unique (email déjà enregistré) -> OK
    if (error && error.code !== '23505') {
      console.warn('[OPT Kit IA] Erreur Supabase:', error.message)
    }
  } catch (err) {
    console.error('[OPT Kit IA] Erreur inattendue:', err)
  }
}

/**
 * Incrémente prompt_copies pour le lead identifié par email.
 */
export async function incrementPromptCopies(email) {
  try {
    const supabase = createClient()
    if (!supabase) return

    const { error } = await supabase.rpc('increment_prompt_copies', {
      user_email: email.toLowerCase().trim(),
    })

    // Si la RPC n'existe pas, fallback avec un update direct
    if (error) {
      const { data } = await supabase
        .from('leads_catalogue')
        .select('prompt_copies')
        .eq('email', email.toLowerCase().trim())
        .single()

      if (data) {
        await supabase
          .from('leads_catalogue')
          .update({ prompt_copies: (data.prompt_copies || 0) + 1 })
          .eq('email', email.toLowerCase().trim())
      }
    }
  } catch (err) {
    console.error('[OPT Kit IA] Erreur compteur copies:', err)
  }
}
