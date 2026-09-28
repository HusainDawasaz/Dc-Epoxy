import re
filepath = 'src/lib/supabase.js'
content = """import { createClient } from '@supabase/supabase-js'

// Hardcode a fallback just in case Vercel env vars are totally failing
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://kzwkpecnyezhciumiylwf.supabase.co';
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Clean up the URL just in case there are spaces or missing https
supabaseUrl = supabaseUrl.trim();
if (!supabaseUrl.startsWith('http')) {
  supabaseUrl = 'https://' + supabaseUrl;
}
if (supabaseUrl.endsWith('/')) {
  supabaseUrl = supabaseUrl.slice(0, -1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
"""
with open(filepath, 'w') as f: f.write(content)
