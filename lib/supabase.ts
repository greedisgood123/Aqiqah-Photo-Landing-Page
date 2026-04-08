import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Folder = {
  id: string
  name: string
  display_name: string
  date: string
  created_at: string
}

export type Image = {
  id: string
  folder_id: string
  filename: string
  file_size: number | null
  order_index: number
  created_at: string
}

let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set.')
  }

  _client = createClient(url, key)
  return _client
}
