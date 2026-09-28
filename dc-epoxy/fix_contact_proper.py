import re
filepath = 'src/app/contact/page.jsx'
with open(filepath, 'r') as f: content = f.read()

new_submit = """    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('API Error');
      
      setStatus('success');
      setFormData({ name: '', email: '', location: '', area: '', service_type: 'Garage Epoxy', message: '', consent: false });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }"""

content = re.sub(
    r"// Simulating API or Supabase insert.*?setStatus\('error'\);\s*\}",
    new_submit,
    content,
    flags=re.DOTALL
)

with open(filepath, 'w') as f: f.write(content)
