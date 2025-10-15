"use client";

import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useStorageState } from "@/hooks/use-storage-state";
import { AuthData, AuthProvider, AuthProviderProps } from "@/types/auth";
import { redirectToAuthorization } from "@/constants/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

const AuthContext = createContext<AuthProviderProps>({
  signIn: async () => {},
  signOut: async () => {},
  authData: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoadingUserId, userId], setUserId] = useStorageState("user_id");
  const [[isLoadingSalt, salt], setSalt] = useStorageState("salt");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Handle OAuth callback on component mount
  useEffect(() => {
    handleOAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle OAuth callback from redirect
  const handleOAuthCallback = useCallback(async () => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const provider = params.get("provider") as AuthProvider;

    // If we have a code and provider, exchange it for user data
    if (code && provider) {
      setIsAuthLoading(true);
      try {
        console.log(`Authenticating with ${provider}...`);

        const resp = await fetch(`${BASE_URL}/api/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider,
            code,
            redirect_uri: `${BASE_URL}/api/auth/callback`,
            scope: "openid email profile",
            state,
          }),
        });

        const data = await resp.json();
        console.log(`${provider} token response:`, data);

        if (data.salt && data.user_id) {
          setUserId(data.user_id);
          setSalt(data.salt);
          console.log(`${provider} auth successful!`);

          // Clean up URL parameters
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } else {
          console.error(`${provider} auth failed: Missing user_id or salt`);
        }
      } catch (err) {
        console.error(`${provider} sign-in error:`, err);
      } finally {
        setIsAuthLoading(false);
      }
    }
  }, [setUserId, setSalt]);

  const isLoading = isLoadingUserId || isLoadingSalt || isAuthLoading;

  const authData: AuthData | null =
    userId && salt ? { user_id: userId, salt: salt } : null;

  // Generic Sign In - redirects to OAuth provider
  const signIn = async (provider: AuthProvider) => {
    try {
      console.log(`Initiating ${provider} sign in...`);

      // Optional: Get nonce from storage if needed
      // const nonce = localStorage.getItem("auth_nonce");

      redirectToAuthorization(provider);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      if (typeof window === "undefined") return;

      localStorage.removeItem("user_id");
      localStorage.removeItem("salt");

      setUserId(null);
      setSalt(null);

      console.log("Sign out successful");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext
      value={{
        signIn,
        signOut,
        authData,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
