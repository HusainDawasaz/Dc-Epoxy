import { createClient } from '@supabase/supabase-js'

try {
  const supabase = createClient('kzwkpecnyezhciumiylwf.supabase.co', 'some_key')
  console.log("Success")
} catch (e) {
  console.log("Error:", e.message)
}
