import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export interface WaitlistEntry {
  id?: number
  email: string
  created_at?: string
}

export interface Token {
  id?: string
  name: string
  ticker: string
  image_url?: string
  amount: number
  creator_address: string
  contract_address?: string
  website?: string
  created_at?: string
}