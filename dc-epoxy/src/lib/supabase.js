import { createClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://kzwkpecnyezhciumiylwf.supabase.co';
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

if (supabaseUrl.includes('supabase.com/dashboard')) {
  supabaseUrl = 'https://kzwkpecnyezhciumiylwf.supabase.co';
} else if (!supabaseUrl) {
  supabaseUrl = 'https://kzwkpecnyezhciumiylwf.supabase.co';
}

supabaseUrl = supabaseUrl.trim();
if (!supabaseUrl.startsWith('http')) {
  supabaseUrl = 'https://' + supabaseUrl;
}
if (supabaseUrl.endsWith('/')) {
  supabaseUrl = supabaseUrl.slice(0, -1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
