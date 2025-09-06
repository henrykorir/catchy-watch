import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail fast if misconfigured
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables: check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY',
  )
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
