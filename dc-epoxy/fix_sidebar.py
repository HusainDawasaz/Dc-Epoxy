filepath = 'src/app/admin/layout.jsx'
with open(filepath, 'r') as f: content = f.read()

content = content.replace("  { to: '/admin/appearance', icon: Paintbrush, label: 'Appearance' },\n", "")

with open(filepath, 'w') as f: f.write(content)
