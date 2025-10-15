/**
 * Storage Utilities for zkLogin
 *
 * Following Sui SDK pattern:
 * - sessionStorage: Ephemeral data (key pairs, randomness)
 * - localStorage: Persistent data (user_id, salt, max_epoch)
 */

import { EphemeralData, PersistentData, ZKPPayload } from "@/types/auth";

// Storage keys
const STORAGE_KEYS = {
  // sessionStorage keys (ephemeral)
  EPHEMERAL_PUBLIC_KEY: "ephemeral_public_key",
  EPHEMERAL_PRIVATE_KEY: "ephemeral_private_key",
  JWT_RANDOMNESS: "jwt_randomness",
  NONCE: "nonce",

  // localStorage keys (persistent)
  USER_ID: "user_id",
  SALT: "salt",
  MAX_EPOCH: "max_epoch",
} as const;

/**
 * Check if we're in a browser environment
 */
const isBrowser = () => typeof window !== "undefined";

/**
 * Save ephemeral data to sessionStorage
 * This data is cleared when the browser tab is closed
 */
export const saveEphemeralData = (data: EphemeralData): void => {
  if (!isBrowser()) return;

  try {
    sessionStorage.setItem(
      STORAGE_KEYS.EPHEMERAL_PUBLIC_KEY,
      data.extended_ephemeral_public_key,
    );
    sessionStorage.setItem(
      STORAGE_KEYS.EPHEMERAL_PRIVATE_KEY,
      data.extended_ephemeral_private_key,
    );
    sessionStorage.setItem(STORAGE_KEYS.JWT_RANDOMNESS, data.jwt_randomness);
    sessionStorage.setItem(STORAGE_KEYS.NONCE, data.nonce);
  } catch (error) {
    console.error("Failed to save ephemeral data:", error);
  }
};

/**
 * Get ephemeral data from sessionStorage
 */
export const getEphemeralData = (): EphemeralData | null => {
  if (!isBrowser()) return null;

  try {
    const publicKey = sessionStorage.getItem(STORAGE_KEYS.EPHEMERAL_PUBLIC_KEY);
    const privateKey = sessionStorage.getItem(
      STORAGE_KEYS.EPHEMERAL_PRIVATE_KEY,
    );
    const randomness = sessionStorage.getItem(STORAGE_KEYS.JWT_RANDOMNESS);
    const nonce = sessionStorage.getItem(STORAGE_KEYS.NONCE);

    if (!publicKey || !privateKey || !randomness || !nonce) {
      return null;
    }

    return {
      extended_ephemeral_public_key: publicKey,
      extended_ephemeral_private_key: privateKey,
      jwt_randomness: randomness,
      nonce: nonce,
    };
  } catch (error) {
    console.error("Failed to get ephemeral data:", error);
    return null;
  }
};

/**
 * Clear ephemeral data from sessionStorage
 */
export const clearEphemeralData = (): void => {
  if (!isBrowser()) return;

  try {
    sessionStorage.removeItem(STORAGE_KEYS.EPHEMERAL_PUBLIC_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.EPHEMERAL_PRIVATE_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.JWT_RANDOMNESS);
    sessionStorage.removeItem(STORAGE_KEYS.NONCE);
  } catch (error) {
    console.error("Failed to clear ephemeral data:", error);
  }
};

/**
 * Save persistent data to localStorage
 * This data persists across browser sessions
 */
export const savePersistentData = (data: PersistentData): void => {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_ID, data.user_id);
    localStorage.setItem(STORAGE_KEYS.SALT, data.salt);
    localStorage.setItem(STORAGE_KEYS.MAX_EPOCH, data.max_epoch.toString());
  } catch (error) {
    console.error("Failed to save persistent data:", error);
  }
};

/**
 * Get persistent data from localStorage
 */
export const getPersistentData = (): PersistentData | null => {
  if (!isBrowser()) return null;

  try {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    const salt = localStorage.getItem(STORAGE_KEYS.SALT);
    const maxEpoch = localStorage.getItem(STORAGE_KEYS.MAX_EPOCH);

    if (!userId || !salt || !maxEpoch) {
      return null;
    }

    return {
      user_id: userId,
      salt: salt,
      max_epoch: parseInt(maxEpoch, 10),
    };
  } catch (error) {
    console.error("Failed to get persistent data:", error);
    return null;
  }
};

/**
 * Clear persistent data from localStorage
 */
export const clearPersistentData = (): void => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.SALT);
    localStorage.removeItem(STORAGE_KEYS.MAX_EPOCH);
  } catch (error) {
    console.error("Failed to clear persistent data:", error);
  }
};

/**
 * Save zkLogin data from backend response
 * Automatically separates ephemeral and persistent data
 */
export const saveZkLoginData = (
  zkPayload: ZKPPayload,
  userId: string,
  salt: string,
): void => {
  // Save ephemeral data to sessionStorage
  saveEphemeralData({
    jwt_randomness: zkPayload.jwt_randomness,
    nonce: zkPayload.nonce,
    extended_ephemeral_public_key: zkPayload.extended_ephemeral_public_key,
    extended_ephemeral_private_key: zkPayload.extended_ephemeral_private_key,
  });

  // Save persistent data to localStorage
  savePersistentData({
    user_id: userId,
    salt: salt,
    max_epoch: zkPayload.max_epoch,
  });
};

/**
 * Clear all zkLogin data (both ephemeral and persistent)
 */
export const clearAllZkLoginData = (): void => {
  clearEphemeralData();
  clearPersistentData();
};

/**
 * Check if user has valid zkLogin session
 * Checks both ephemeral and persistent data
 */
export const hasValidZkLoginSession = (): boolean => {
  const ephemeral = getEphemeralData();
  const persistent = getPersistentData();

  return ephemeral !== null && persistent !== null;
};

/**
 * Get complete zkLogin data
 */
export const getZkLoginData = (): {
  ephemeral: EphemeralData | null;
  persistent: PersistentData | null;
} => {
  return {
    ephemeral: getEphemeralData(),
    persistent: getPersistentData(),
  };
};

/**
 * Sync auth data to cookies for middleware access
 * Middleware can't access localStorage, so we sync to cookies
 */
export const syncAuthDataToCookies = (): void => {
  if (!isBrowser()) return;

  try {
    const persistent = getPersistentData();

    if (persistent) {
      // Set cookies with auth data (non-httpOnly so JS can set them)
      document.cookie = `user_id=${persistent.user_id}; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `salt=${persistent.salt}; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `max_epoch=${persistent.max_epoch}; path=/; max-age=2592000; SameSite=Lax`;
    } else {
      // Clear cookies if no auth data
      clearAuthCookies();
    }
  } catch (error) {
    console.error("Failed to sync auth data to cookies:", error);
  }
};

/**
 * Clear auth cookies
 */
export const clearAuthCookies = (): void => {
  if (!isBrowser()) return;

  try {
    document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "salt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "max_epoch=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  } catch (error) {
    console.error("Failed to clear auth cookies:", error);
  }
};
