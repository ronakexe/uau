import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (SendGrid, Resend, Nodemailer, etc.)
    // For now, we'll just log the message
    console.log("Contact Form Submission:", {
      name,
      email,
      subject: subject || "No subject",
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, you would send an email here:
    // await sendEmail({
    //   to: "contact.sobersense@gmail.com",
    //   from: email,
    //   subject: subject || "Contact Form Submission",
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    // })

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}

