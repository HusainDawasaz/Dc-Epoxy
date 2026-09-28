filepath = 'src/lib/supabase.js'
with open(filepath, 'r') as f: content = f.read()

# Make sure URL starts with https:// if it doesn't already
old_code = "export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')"

new_code = """
let formattedUrl = supabaseUrl || '';
if (formattedUrl && !formattedUrl.startsWith('http')) {
  formattedUrl = 'https://' + formattedUrl;
}
export const supabase = createClient(formattedUrl, supabaseAnonKey || '')
"""
content = content.replace(old_code, new_code)

with open(filepath, 'w') as f: f.write(content)
