filepath = 'src/app/contact/page.jsx'
with open(filepath, 'r') as f: content = f.read()

old_submit = """    // Simulating API or Supabase insert
    try {
      if (supabase) {
        const { error } = await supabase.from('enquiries').insert([
          {
            name: formData.name,
            email: formData.email,
            location: formData.location,
            area: formData.area,
            service_type: formData.service_type,
            message: formData.message
          }
        ]);
        if (error) throw error;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setStatus('success');
      setFormData({ name: '', email: '', location: '', area: '', service_type: 'Garage Epoxy', message: '', consent: false });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }"""

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

content = content.replace(old_submit, new_submit)
with open(filepath, 'w') as f: f.write(content)
