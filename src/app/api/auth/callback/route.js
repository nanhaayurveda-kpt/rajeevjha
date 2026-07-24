import { NextResponse } from "next/server";
import { createSession, isAllowed } from "@/lib/auth";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  if (!data.id_token) {
    return NextResponse.redirect(new URL("/?error=auth", request.url));
  }

  const payload = JSON.parse(
    Buffer.from(data.id_token.split(".")[1], "base64").toString(),
  );

  if (!payload.email_verified || !isAllowed(payload.email)) {
    return NextResponse.redirect(new URL("/?error=not-allowed", request.url));
  }

  await createSession({
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  });

  return NextResponse.redirect(new URL("/admin", request.url));
}