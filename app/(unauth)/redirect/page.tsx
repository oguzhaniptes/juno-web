"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const processAuth = async () => {
      // Hatanın kaynağı: Google'dan gelen 'code' ve 'state' parametreleri
      // URL'nin HASH (#) kısmında değil, QUERY (?) kısmındadır.

      // window.location.search: URL'deki '?param1=deger1&param2=deger2...' kısmını alır.
      const searchParams = new URLSearchParams(window.location.search);

      // Verileri doğru yerden çek
      const code = searchParams.get("code");
      const stateString = searchParams.get("state");
      const provider = searchParams.get("provider");

      console.log("Alınan Code:", code);
      console.log("Alınan State:", stateString);
      console.log("Alınan Platform:", provider);

      if (!code) {
        // idToken yerine code kullanmalıyız
        router.replace("/login");
        return;
      }

      try {
        // Server-side cookie setleme isteği
        const res = await fetch("/api/auth/set-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: code, provider, state: stateString }),
        });

        if (!res.ok) {
          throw new Error("Token setlenemedi");
        }

        // state içindeki redirect_uri'yi çöz
        const stateParams = new URLSearchParams(stateString || "");
        const redirectUri = stateParams.get("redirect_uri") || "/";

        router.replace(redirectUri);
      } catch (error) {
        console.error("Auth işleminde hata:", error);
        router.replace("/login");
      }
    };

    processAuth();
  }, [router]);

  return <div>Giriş yapılıyor, lütfen bekleyin...</div>;
}
