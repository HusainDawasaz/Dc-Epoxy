// Vercel serverless function - saves enquiry to Supabase and sends email via Resend
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, location, area, service_type, message, consent } = req.body

  if (!name || !email || !consent) {
    return res.status(400).json({ error: 'Name, email and consent are required' })
  }

  // Save to Supabase
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY // Use service key for server-side
  )

  const { error: dbError } = await supabase.from('enquiries').insert({
    name, email, phone, location, area, service_type, message
  })

  if (dbError) {
    console.error('DB error:', dbError)
    return res.status(500).json({ error: 'Failed to save enquiry' })
  }

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'DC-EPOXY Website <noreply@dc-epoxy.com>',
          to: [process.env.ADMIN_EMAIL || 'info@dc-epoxy.com'],
          subject: `New Quote Request from ${name}`,
          html: `
            <h2>New Enquiry from DC-EPOXY Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Location:</strong> ${location || 'Not provided'}</p>
            <p><strong>Area (sqm):</strong> ${area || 'Not provided'}</p>
            <p><strong>Service Type:</strong> ${service_type || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message || 'No message'}</p>
            <hr>
            <p>Log in to your <a href="https://dc-epoxy.com/admin">admin panel</a> to view all enquiries.</p>
          `
        }),
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails
    }
  }

  return res.status(200).json({ success: true, message: 'Enquiry received' })
}
