import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/lib/mailer"

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json()

        if (!name || !message) {
            return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
        }

        // Email ke internal team
        await transporter.sendMail({
            from: `"GONLINE Contact Form" <${process.env.SMTP_USER}>`,
            to: "mrafly212001@gmail.com",
            cc: "gonlinecreative@gmail.com",
            subject: `New Contact Form - ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New Message from Contact Form</h2>
          <hr />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;">${email || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone</td>
              <td style="padding: 8px 0;">${phone || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
        })

        // Email konfirmasi ke pengirim (hanya jika ada email)
        if (email) {
            await transporter.sendMail({
                from: `"GONLINE" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "We received your message — GONLINE",
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #111;">Hi ${name}, terima kasih sudah menghubungi kami!</h2>
            <p style="color: #555; line-height: 1.6;">
              Kami telah menerima pesan kamu dan akan segera menghubungi kamu kembali dalam 1x24 jam.
            </p>
            <hr />
            <p style="color: #888; font-size: 13px;"><strong>Pesan kamu:</strong></p>
            <p style="color: #555; font-size: 13px; white-space: pre-wrap;">${message}</p>
            <hr />
            <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
              GONLINE — Digital Marketing & Website Development<br/>
              <a href="https://gonline.id" style="color: #aaa;">gonline.id</a>
            </p>
          </div>
        `,
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Mail error:", error)
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }
}