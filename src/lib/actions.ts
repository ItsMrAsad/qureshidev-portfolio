"use server";

import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Parse form data
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  // Validate form data
  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      // Fallback for development - log the message
      console.log("📧 Contact Form Submission:", { name, email, subject, message });

      return {
        success: true,
        message: "Message received! (Demo mode - configure RESEND_API_KEY for email delivery)",
      };
    }

    // Send email via Resend
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "contact@qureshidev.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 20px; background: #0f172a; color: #f1f5f9;">
            <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155;">
              <h1 style="color: #0ea5e9; margin-bottom: 24px; font-size: 24px;">
                New Contact Form Submission
              </h1>

              <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                <p style="margin: 0; font-size: 18px; font-weight: 600;">${name}</p>
                <p style="margin: 4px 0 0 0; color: #0ea5e9;">${email}</p>
              </div>

              <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                <p style="margin: 0; font-size: 16px;">${subject}</p>
              </div>

              <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;">

              <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                This email was sent from your portfolio contact form at qureshidev.com
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Send auto-reply to the user
    await resend.emails.send({
      from: "Asad Ur Rehman <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 20px; background: #0f172a; color: #f1f5f9;">
            <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155;">
              <h1 style="color: #0ea5e9; margin-bottom: 16px; font-size: 24px;">
                Thanks for reaching out, ${name}!
              </h1>

              <p style="margin-bottom: 16px; color: #94a3b8;">
                I've received your message and will get back to you as soon as possible, typically within 24-48 hours.
              </p>

              <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Message</p>
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #f1f5f9;">${subject}</p>
                <p style="margin: 0; color: #94a3b8; white-space: pre-wrap;">${message}</p>
              </div>

              <p style="margin-bottom: 24px; color: #94a3b8;">
                In the meantime, feel free to check out my latest projects or connect with me on social media.
              </p>

              <div style="text-align: center;">
                <a href="https://qureshidev.com" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #10b981); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                  Visit My Portfolio
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;">

              <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                Best regards,<br>
                <strong style="color: #f1f5f9;">Asad Ur Rehman</strong><br>
                AI & Agentic Engineer
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again or email me directly.",
    };
  }
}

// Track page views (for analytics)
export async function trackPageView(page: string) {
  // This can be extended to store in a database
  console.log(`📊 Page view: ${page} at ${new Date().toISOString()}`);
}
