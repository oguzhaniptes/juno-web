// /app/api/set-token/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token;
  const provider = body.provider;

  if (!token || !provider) {
    return NextResponse.json(
      { error: "Token or provider missing" },
      { status: 400 },
    );
  }

  // Get the cookie store directly (cookies() is synchronous)
  const cookieStore = await cookies();

  // Set the cookie
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/",
    sameSite: "lax",
  });

  cookieStore.set("provider", provider, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
