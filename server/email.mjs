// Server-side Resend email notification service for Consumer Point
// Uses the Resend REST API via native fetch without external dependencies

export async function sendAdminEnquiryEmail({
  reference,
  kind,
  name,
  phone,
  email,
  service,
  message,
  pincode,
  city,
  address,
  brandModel,
  createdAt,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.BUSINESS_EMAIL ||
    "support@consumerpoint.co.in";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Consumer Point <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(
      `[Email Notification] RESEND_API_KEY not configured. Enquiry #${reference} recorded in database.`,
    );
    return { sent: false, reason: "RESEND_API_KEY_NOT_SET" };
  }

  const formattedDate = new Date(createdAt || Date.now()).toLocaleString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  const subject = `New Enquiry [${service || kind.toUpperCase()}]: ${name} (${phone})`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: #0b192c; color: #ffffff; padding: 24px 30px; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 4px 0 0; color: #94a3b8; font-size: 13px; }
          .badge { display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0284c7; border-radius: 9999px; font-weight: 600; font-size: 12px; margin-top: 8px; }
          .content { padding: 30px; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .info-table td.label { width: 35%; color: #64748b; font-weight: 500; }
          .info-table td.val { width: 65%; color: #0f172a; font-weight: 600; }
          .message-box { margin-top: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
          .message-title { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
          .message-text { font-size: 14px; color: #334155; line-height: 1.5; white-space: pre-wrap; margin: 0; }
          .actions { margin-top: 24px; text-align: center; }
          .btn { display: inline-block; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; margin: 0 6px; }
          .btn-primary { background: #0070f3; color: #ffffff; }
          .btn-success { background: #16a34a; color: #ffffff; }
          .footer { padding: 20px 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Customer Enquiry Received</h1>
            <p>Consumer Point Website &bull; Reference #${reference}</p>
            <span class="badge">${(service || kind).toUpperCase()}</span>
          </div>
          <div class="content">
            <table class="info-table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="val">${name}</td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="val"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></td>
              </tr>
              ${
                email
                  ? `<tr>
                <td class="label">Email Address</td>
                <td class="val"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
              </tr>`
                  : ""
              }
              <tr>
                <td class="label">Service Requested</td>
                <td class="val">${service || kind}</td>
              </tr>
              ${
                brandModel
                  ? `<tr>
                <td class="label">Brand & Model</td>
                <td class="val">${brandModel}</td>
              </tr>`
                  : ""
              }
              ${
                pincode || city || address
                  ? `<tr>
                <td class="label">Location / PIN</td>
                <td class="val">${[address, city, pincode ? `PIN: ${pincode}` : ""].filter(Boolean).join(", ")}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td class="label">Received At</td>
                <td class="val">${formattedDate} (IST)</td>
              </tr>
            </table>

            ${
              message
                ? `
            <div class="message-box">
              <div class="message-title">Customer Message / Issue Description</div>
              <p class="message-text">${message}</p>
            </div>
            `
                : ""
            }

            <div class="actions">
              <a href="https://wa.me/${phone.replace(/\D/g, "")}" class="btn btn-success" target="_blank">Chat on WhatsApp</a>
              <a href="tel:${phone}" class="btn btn-primary">Call Customer</a>
            </div>
          </div>
          <div class="footer">
            Consumer Point Admin Notification System &bull; Automatic Enquiry Capture
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(
        `[Email Notification] Resend API responded with ${res.status}:`,
        errText,
      );
      return { sent: false, error: errText };
    }

    const data = await res.json();
    console.info(
      `[Email Notification] Notification sent to ${adminEmail} for enquiry #${reference}. Email ID: ${data.id}`,
    );
    return { sent: true, id: data.id };
  } catch (err) {
    console.warn(
      `[Email Notification] Failed to deliver email for enquiry #${reference}:`,
      err.message,
    );
    return { sent: false, error: err.message };
  }
}

