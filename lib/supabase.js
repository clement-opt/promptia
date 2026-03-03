import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Singleton Supabase client côté navigateur.
 * Retourne null si les variables d'environnement ne sont pas configurées
 * (l'outil reste accessible même sans Supabase).
 */
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
 * Ne bloque pas l'accès à l'outil en cas d'erreur.
 */
export async function saveLead(email, source = 'promptia_v2', tag = 'promptia_generator') {
  try {
    const supabase = createClient()
    if (!supabase) return

    const { error } = await supabase.from('leads_catalogue').insert([
      {
        email:      email.toLowerCase().trim(),
        prenom:     '',
        source,
        tag,
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
