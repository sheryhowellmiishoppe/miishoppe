// app/api/waitlist/route.js
import { NextResponse } from "next/server";
import { transporter } from "../../lib/mailer";

export async function POST(request) {
  try {
    const { email, zip } = await request.json();

    if (!email || !zip) {
      return NextResponse.json(
        { error: "Email and ZIP code are required." },
        { status: 400 },
      );
    }

    // Notify you
    await transporter.sendMail({
      from: `"Mii Shoppe Waitlist" <${process.env.GMAIL_USER}>`,
      to: process.env.WAITLIST_NOTIFY_EMAIL,
      subject: "New Waitlist Signup",
      text: `New signup:\nEmail: ${email}\nZIP: ${zip}`,
    });

    // Confirm to the user
    await transporter.sendMail({
      from: `"Mii Shoppe" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "You're on the Mii Shoppe waitlist!",
      text: `Thanks for joining the Mii Shoppe waitlist! We'll keep you posted on launch news and updates.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist email error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your confirmation." },
      { status: 500 },
    );
  }
}