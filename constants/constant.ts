/**
 * Application Constants
 *
 * This file centralizes all constants used across the application.
 * Import from this file instead of defining constants in individual files.
 */

// Authentication Constants
export const COOKIE_NAME = "auth_token";
export const REFRESH_COOKIE_NAME = "refresh_token";
export const COOKIE_MAX_AGE = 20; // 20 seconds
export const JWT_EXPIRATION_TIME = "20s"; // 20 seconds
export const REFRESH_TOKEN_EXPIRY = "30d"; // 30 days
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

// Refresh Token Constants
export const REFRESH_BEFORE_EXPIRY_SEC = 60; // Refresh token 1 minute before expiry

// Environment Constants
export const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
export const APP_SCHEME = "juno://";
export const JWT_SECRET = process.env.EXPO_PUBLIC_JWT_SECRET;

// Google OAuth Constants
export const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET;
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

// Microsoft OAuth Constants
export const MICROSOFT_CLIENT_ID = process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_ID;
export const MICROSOFT_CLIENT_SECRET =
  process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_SECRET;
export const MICROSOFT_AUTH_URL =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";

// Cookie Settings
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "Lax" as const,
  path: "/",
  maxAge: COOKIE_MAX_AGE,
};

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "Lax" as const,
  path: "/api/auth/refresh", // Restrict to refresh endpoint only
  maxAge: REFRESH_TOKEN_MAX_AGE,
};
