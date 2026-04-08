import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
