/**
 * zkLogin Debug Utilities
 *
 * Helper functions for debugging zkLogin storage and state
 */

import {
  getEphemeralData,
  getPersistentData,
  hasValidZkLoginSession,
} from "./storage";

/**
 * Print all zkLogin data to console
 */
export const debugZkLoginStorage = (): void => {
  console.group("🔍 zkLogin Storage Debug");

  // Check session validity
  const isValid = hasValidZkLoginSession();
  console.log("✅ Valid Session:", isValid);

  // Ephemeral data (sessionStorage)
  console.group("📦 Ephemeral Data (sessionStorage)");
  const ephemeral = getEphemeralData();
  if (ephemeral) {
    console.log("- Public Key:", ephemeral.extended_ephemeral_public_key);
    console.log("- Private Key:", ephemeral.extended_ephemeral_private_key);
    console.log("- JWT Randomness:", ephemeral.jwt_randomness);
    console.log("- Nonce:", ephemeral.nonce);
  } else {
    console.log("❌ No ephemeral data found");
  }
  console.groupEnd();

  // Persistent data (localStorage)
  console.group("💾 Persistent Data (localStorage)");
  const persistent = getPersistentData();
  if (persistent) {
    console.log("- User ID:", persistent.user_id);
    console.log("- Salt:", persistent.salt);
    console.log("- Max Epoch:", persistent.max_epoch);
  } else {
    console.log("❌ No persistent data found");
  }
  console.groupEnd();

  console.groupEnd();
};

/**
 * Get zkLogin storage summary
 */
export const getZkLoginStorageSummary = (): {
  isValid: boolean;
  hasEphemeral: boolean;
  hasPersistent: boolean;
  ephemeralKeys: string[];
  persistentKeys: string[];
} => {
  const ephemeral = getEphemeralData();
  const persistent = getPersistentData();

  return {
    isValid: hasValidZkLoginSession(),
    hasEphemeral: ephemeral !== null,
    hasPersistent: persistent !== null,
    ephemeralKeys: ephemeral
      ? [
          "extended_ephemeral_public_key",
          "extended_ephemeral_private_key",
          "jwt_randomness",
          "nonce",
        ]
      : [],
    persistentKeys: persistent ? ["user_id", "salt", "max_epoch"] : [],
  };
};

/**
 * Validate zkLogin data integrity
 */
export const validateZkLoginData = (): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ephemeral = getEphemeralData();
  const persistent = getPersistentData();

  // Check ephemeral data
  if (!ephemeral) {
    errors.push("Missing ephemeral data in sessionStorage");
  } else {
    if (!ephemeral.extended_ephemeral_public_key) {
      errors.push("Missing ephemeral public key");
    }
    if (!ephemeral.extended_ephemeral_private_key) {
      errors.push("Missing ephemeral private key");
    }
    if (!ephemeral.jwt_randomness) {
      errors.push("Missing JWT randomness");
    }
    if (!ephemeral.nonce) {
      errors.push("Missing nonce");
    }
  }

  // Check persistent data
  if (!persistent) {
    errors.push("Missing persistent data in localStorage");
  } else {
    if (!persistent.user_id) {
      errors.push("Missing user ID");
    }
    if (!persistent.salt) {
      errors.push("Missing salt");
    }
    if (!persistent.max_epoch || persistent.max_epoch <= 0) {
      errors.push("Invalid max epoch");
    }

    // Check if max_epoch has expired (warning only)
    // Note: You'll need to compare with current epoch from Sui network
    if (persistent.max_epoch < Date.now() / 1000) {
      warnings.push("Max epoch may have expired");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Pretty print validation results
 */
export const debugValidateZkLogin = (): void => {
  const validation = validateZkLoginData();

  console.group("🔍 zkLogin Validation");

  if (validation.isValid) {
    console.log("✅ All zkLogin data is valid");
  } else {
    console.log("❌ zkLogin data validation failed");
  }

  if (validation.errors.length > 0) {
    console.group("❌ Errors");
    validation.errors.forEach((error) => console.error(`- ${error}`));
    console.groupEnd();
  }

  if (validation.warnings.length > 0) {
    console.group("⚠️ Warnings");
    validation.warnings.forEach((warning) => console.warn(`- ${warning}`));
    console.groupEnd();
  }

  console.groupEnd();
};

/**
 * Add debug commands to window object for browser console access
 */
export const attachZkLoginDebugToWindow = (): void => {
  if (typeof window === "undefined") return;

  (window as any).zkLoginDebug = {
    storage: debugZkLoginStorage,
    validate: debugValidateZkLogin,
    summary: getZkLoginStorageSummary,
    help: () => {
      console.log(`
🔧 zkLogin Debug Commands:

  zkLoginDebug.storage()   - View all stored zkLogin data
  zkLoginDebug.validate()  - Validate zkLogin data integrity
  zkLoginDebug.summary()   - Get storage summary
  zkLoginDebug.help()      - Show this help message

Usage Example:
  > zkLoginDebug.storage()
  > zkLoginDebug.validate()
      `);
    },
  };

  console.log(
    "🔧 zkLogin debug commands available. Type 'zkLoginDebug.help()' for usage."
  );
};
