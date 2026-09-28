import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Remove consent from data so it doesn't cause a column-not-found error in DB
    delete data.consent;

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('enquiries')
      .insert([data]);
      
    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: dbError.message || 'Database insert failed' }, { status: 400 });
    }

    // 2. Send instant email alert via Resend (safely initialized)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'DC-EPOXY Leads <onboarding@resend.dev>', // Use default onboarding domain or custom verified domain
          to: process.env.ADMIN_EMAIL || 'info@dc-epoxy.com',
          subject: `New Lead: ${data.service_type || 'Quote Request'} from ${data.name}`,
          html: `
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
            <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
            <p><strong>Area Size:</strong> ${data.area || 'N/A'}</p>
            <p><strong>Service:</strong> ${data.service_type || 'N/A'}</p>
            <p><strong>Message:</strong><br/>${data.message || 'No message provided.'}</p>
          `
        });
      } catch (emailErr) {
        console.error('Resend email failed:', emailErr);
        // Do not fail the form submission if email notification fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry API route error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
