import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '../../../lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Remove consent from data so it doesn't cause a column-not-found error in DB
    delete data.consent;

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('enquiries')
      .insert([data]);
      
    if (dbError) throw dbError;

    // 2. Send instant email alert via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'DC-EPOXY Leads <leads@dc-epoxy.com>', // Ensure this domain is verified in Resend
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${data.service_type || 'Quote Request'} from ${data.name}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
          <p><strong>Area Size:</strong> ${data.area || 'N/A'}</p>
          <p><strong>Service:</strong> ${data.service_type}</p>
          <p><strong>Message:</strong><br/>${data.message || 'No message provided.'}</p>
          <br/>
          <p><a href="https://dc-epoxy.com/admin/enquiries">View in Admin Panel</a></p>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
