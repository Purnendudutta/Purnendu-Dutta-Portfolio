import nodemailer from "nodemailer";

interface EmailNotificationPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotificationEmail(payload: EmailNotificationPayload) {
  const { name, email, subject, message } = payload;

  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "purnendudutta8172@gmail.com";

  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  // If no SMTP credentials configured yet, gracefully log and return
  if (!emailUser || !emailPass) {
    console.log(
      `[Email Notification - Mock/Unconfigured] Message from ${name} <${email}>: "${subject}". To deliver live emails to ${receiverEmail}, add EMAIL_USER and EMAIL_PASS to your .env.local file.`
    );
    return { success: false, reason: "SMTP credentials not configured in .env.local" };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s+/g, ""), // Clean spaces if user pasted 16-char code with spaces
      },
    });

    const emailSubject = `🚀 [Portfolio Inbound] ${subject} - from ${name}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #080c14;
      color: #e2e8f0;
      margin: 0;
      padding: 24px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0d1527 0%, #080d1a 100%);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.15);
    }
    .header {
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
      padding: 24px 30px;
      text-align: left;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 4px 0 0 0;
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
    }
    .body-content {
      padding: 30px;
    }
    .card-meta {
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 24px;
    }
    .message-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 10px;
    }
    .message-box {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-left: 4px solid #8b5cf6;
      border-radius: 12px;
      padding: 20px;
      color: #e2e8f0;
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .action-container {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .reply-btn {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💬 New Portfolio Inquiry</h1>
      <p>Received via your website contact form</p>
    </div>
    <div class="body-content">
      <div class="card-meta">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #818cf8; font-weight: bold; width: 85px;">Sender:</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #818cf8; font-weight: bold;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-family: monospace;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #818cf8; font-weight: bold;">Subject:</td>
            <td style="padding: 6px 0; color: #f8fafc;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #818cf8; font-weight: bold;">Time:</td>
            <td style="padding: 6px 0; color: #94a3b8; font-size: 12px;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <div class="message-title">Message Content:</div>
      <div class="message-box">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

      <div class="action-container">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">
          ✉️ Reply to ${name}
        </a>
      </div>
    </div>
    <div class="footer">
      Purnendu Dutta • Developer Portfolio &amp; CMS • Automated Delivery
    </div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\n${message}`,
      html: htmlContent,
    });

    console.log(`[Email Sent] Message ID: ${info.messageId} to ${receiverEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("[Email Notification Error]:", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}
