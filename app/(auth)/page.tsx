"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  // propName: type;
}

export default function Page({}: PageProps) {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const tokenReq = await fetch(
          "http://localhost:3000/api/auth/get-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!tokenReq.ok) {
          throw new Error("Failed to fetch token");
        }

        const tokenData = await tokenReq.json();

        console.log("Tokennnnnnnnnnnnnnnnnn:", tokenData);

        const res = await fetch("http://localhost:8080/api/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: tokenData.provider,
            code: decodeURIComponent(tokenData.token), // dikkat: decode edilmiş olmalı
            redirect_uri: "http://localhost:8080/api/auth/callback",
            scope: "openid email profile",
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await res.json();
        console.log("✅ Token response:", data);

        // access_token ile Google API çağırabilirsin
        console.log("Access Token:", data.access_token);

        // id_token → kullanıcı bilgilerini JWT decode edebilirsin
        console.log("ID Token:", data.id_token);

        // refresh_token sadece ilk defa alınır (her zaman dönmez!)
        console.log("Refresh Token:", data.refresh_token);
      } catch (err) {
        console.error("❌ Token exchange error:", err);
      }
    };

    init();
  }, []);

  const handleLogout = async () => {
    try {
      // Make a POST request to the delete-token API route
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete token cookie");
      }

      const data = await response.json();
      console.log("Cookie deletion response:", data);

      // Client-side redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user (e.g., via a UI alert)
    }
  };

  return (
    <div>
      <h1>
        Welcome to the Auth Page
        <button onClick={handleLogout}>Logout</button>
      </h1>
    </div>
  );
}
