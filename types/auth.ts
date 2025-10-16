export enum AuthProvider {
  GOOGLE = "google",
  MICROSOFT = "microsoft",
  // TWITCH = "twitch",
  // FACEBOOK = "facebook",
  // APPLE = "apple",
  // DISCORD = "discord",
}

// ZKP Payload structure matching Rust backend
export interface ZKPPayload {
  jwt_randomness: string;
  nonce: string;
  extended_ephemeral_public_key: string;
  extended_ephemeral_private_key: string;
  max_epoch: number;
}

// Response from backend after token exchange
export interface ChangeCodeForUserZkProvider {
  user_id: string;
  salt: string;
  zk_payload: ZKPPayload;
}

// User authentication data stored in localStorage
export interface AuthData {
  user_id: string;
  salt: string;
  max_epoch: number;
}

// Ephemeral data stored in sessionStorage (per Sui SDK pattern)
export interface EphemeralData {
  jwt_randomness: string;
  nonce: string;
  extended_ephemeral_public_key: string;
  extended_ephemeral_private_key: string;
}

// Persistent data stored in localStorage (per Sui SDK pattern)
export interface PersistentData {
  user_id: string;
  salt: string;
  max_epoch: number;
}

export interface AuthProviderProps {
  signIn: (provider: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  authData: AuthData | null;
  isLoading: boolean;
}
