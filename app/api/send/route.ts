import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    const data = await resend.emails.send({
      from: '',
      to: `${user?.email}`,
      subject: 'Hello world',
      //react: EmailTemplate({ firstName: '' }),
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}