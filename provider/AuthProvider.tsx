"use client";

import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  AuthData,
  AuthProvider,
  AuthProviderProps,
  ChangeCodeForUserZkProvider,
} from "@/types/auth";
import { redirectToAuthorization } from "@/constants/auth";
import {
  saveZkLoginData,
  clearAllZkLoginData,
  getPersistentData,
  hasValidZkLoginSession,
  syncAuthDataToCookies,
  clearAuthCookies,
} from "@/lib/storage";
import { attachZkLoginDebugToWindow } from "@/lib/zklogin-debug";

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
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state from localStorage/sessionStorage
  const initializeAuthState = useCallback(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      // Check if we have valid zkLogin session
      if (hasValidZkLoginSession()) {
        const persistentData = getPersistentData();
        if (persistentData) {
          setAuthData({
            user_id: persistentData.user_id,
            salt: persistentData.salt,
          });
        }
      }
    } catch (error) {
      console.error("Failed to initialize auth state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize auth state from storage on mount
  useEffect(() => {
    initializeAuthState();

    // Attach debug utilities to window in development
    if (process.env.NODE_ENV === "development") {
      attachZkLoginDebugToWindow();
    }
  }, [initializeAuthState]);

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
      setIsLoading(true);
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

        if (!resp.ok) {
          throw new Error(`Token exchange failed: ${resp.statusText}`);
        }

        const data: ChangeCodeForUserZkProvider = await resp.json();
        console.log(`${provider} token response received`);

        if (data.salt && data.user_id && data.zk_payload) {
          // Save zkLogin data following Sui SDK pattern:
          // - Ephemeral data (keys, randomness) -> sessionStorage
          // - Persistent data (user_id, salt, max_epoch) -> localStorage
          saveZkLoginData(data.zk_payload, data.user_id, data.salt);

          // Sync auth data to cookies for middleware access
          syncAuthDataToCookies();

          // Update auth state
          setAuthData({
            user_id: data.user_id,
            salt: data.salt,
          });

          console.log(`${provider} auth successful!`);
          console.log("zkLogin data saved:");
          console.log("- sessionStorage: ephemeral keys, randomness, nonce");
          console.log("- localStorage: user_id, salt, max_epoch");
          console.log("- cookies: user_id, salt, max_epoch (for middleware)");

          // Redirect to home page with hard refresh
          // This ensures middleware runs with updated cookies
          console.log("Redirecting to home page...");
          window.location.href = "/";
        } else {
          console.error(`${provider} auth failed: Missing required data`);
          throw new Error("Invalid response from authentication server");
        }
      } catch (err) {
        console.error(`${provider} sign-in error:`, err);
        // Clear any partial data
        clearAllZkLoginData();
        clearAuthCookies();
        setAuthData(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  // Generic Sign In - redirects to OAuth provider
  const signIn = async (provider: AuthProvider) => {
    try {
      console.log(`Initiating ${provider} sign in...`);
      redirectToAuthorization(provider);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      throw error;
    }
  };

  // Sign Out - clears all zkLogin data
  const signOut = async () => {
    try {
      if (typeof window === "undefined") return;

      // Clear all zkLogin data (both sessionStorage and localStorage)
      clearAllZkLoginData();

      // Clear auth cookies for middleware
      clearAuthCookies();

      // Update state
      setAuthData(null);

      console.log("Sign out successful");
      console.log("Cleared all zkLogin data from storage");
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
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
