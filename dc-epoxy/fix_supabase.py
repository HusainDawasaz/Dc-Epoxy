filepath = 'src/lib/supabase.js'
content = """import { createClient } from '@supabase/supabase-js'

// Next.js uses process.env.NEXT_PUBLIC_ instead of import.meta.env.VITE_
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Automatically fix if the user pasted the dashboard URL by mistake
if (supabaseUrl.includes('supabase.com/dashboard')) {
  supabaseUrl = 'https://kzwkpecnyezhciumiylwf.supabase.co';
} else if (!supabaseUrl) {
  // Hardcode fallback just in case Vercel variables are missing
  supabaseUrl = 'https://kzwkpecnyezhciumiylwf.supabase.co';
}

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
