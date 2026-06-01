import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const message = body.message?.trim() ?? '';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const smtpUser = process.env.CONTACT_EMAIL_USER;
    const smtpPass = process.env.CONTACT_EMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_EMAIL_TO ?? 'shalinirvithanage@gmail.com';

    const isPlaceholder = smtpPass === 'your-16-char-app-password-here';
    if (!smtpUser || !smtpPass || isPlaceholder) {
      return NextResponse.json(
        {
          error:
            'Open .env.local, replace the CONTACT_EMAIL_APP_PASSWORD placeholder with your real Gmail App Password, then restart the dev server.',
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API send error:', error);
    return NextResponse.json(
      {
        error:
          'Failed to send message via SMTP. Check Gmail app password, sender account, and server logs.',
      },
      { status: 502 }
    );
  }
}
