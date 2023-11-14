import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const data = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: ["geelaj01@gmail.com"],
      subject: "Hello world",
      html: `
      <div>
        <p>Hooray! An email!</p>
        <p>These are the form values: ${JSON.stringify(req, null, 2)}</p>
      </div>
      `,
    });

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
