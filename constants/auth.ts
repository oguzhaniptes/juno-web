import { AuthProvider } from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// Redirect URI for web
export const AUTH_REDIRECT_URI = `${BASE_URL}/api/auth/callback`;

// Discovery endpoints
export const AUTH_DISCOVERY = {
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

// Helper function to generate random state
export const generateRandomState = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Provider-specific configurations
export const AUTH_PROVIDERS_CONFIG = {
  [AuthProvider.GOOGLE]: {
    clientId: AuthProvider.GOOGLE,
    scopes: ["openid", "email", "profile"],
    redirectUri: AUTH_REDIRECT_URI,
    responseType: "code",
    platform: "web",
  },
  [AuthProvider.MICROSOFT]: {
    clientId: AuthProvider.MICROSOFT,
    scopes: ["openid", "email", "profile"],
    redirectUri: AUTH_REDIRECT_URI,
    responseType: "code",
    platform: "web",
  },
};

// Helper function to get provider config
export const getProviderConfig = (provider: AuthProvider) => {
  return AUTH_PROVIDERS_CONFIG[provider];
};

// Helper function to build authorization URL
export const buildAuthorizationUrl = (
  provider: AuthProvider,
  nonce?: string,
): string => {
  const config = getProviderConfig(provider);

  const params = new URLSearchParams({
    client_id: provider,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    scope: config.scopes.join(" "),
    state: generateRandomState(5),
    platform: config.platform,
  });

  // Add nonce if provided
  if (nonce) {
    params.append("nonce", nonce);
  }

  return `${AUTH_DISCOVERY.authorizationEndpoint}?${params.toString()}`;
};

// Helper function to redirect to authorization endpoint
export const redirectToAuthorization = (
  provider: AuthProvider,
  nonce?: string,
): void => {
  if (typeof window !== "undefined") {
    window.location.href = buildAuthorizationUrl(provider, nonce);
  }
};
