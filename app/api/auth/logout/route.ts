import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // Get the cookie store directly (cookies() is synchronous)
  const cookieStore = await cookies();

  // Delete the token cookie
  cookieStore.delete("token");
  cookieStore.delete("provider");

  return NextResponse.json({ ok: true });
}
