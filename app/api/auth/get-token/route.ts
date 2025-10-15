import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * GET isteği: Tarayıcı çerezinden 'token' değerini okur.
 */
export async function GET() {
  // Sunucu tarafında (Next.js App Router) çerez depolama alanına erişim
  const cookieStore = cookies();

  // 'token' isimli çerezi okuyoruz
  const tokenCookie = cookieStore.get("token");
  const stateCookie = cookieStore.get("state");
  const providerCookie = cookieStore.get("provider");

  if (!tokenCookie) {
    // Eğer 'token' çerezi bulunamazsa 404 hatası döndür
    console.log("Token cookie not found in request.");
    return NextResponse.json(
      { error: "Token cookie not found" },
      { status: 404 },
    );
  }

  // Çerez değerini döndür
  console.log("Successfully retrieved token from cookie.");
  return NextResponse.json({
    token: tokenCookie.value,
    state: stateCookie?.value,
    provider: providerCookie?.value,
  });
}
