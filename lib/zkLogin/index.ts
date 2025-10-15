import { SuiClient } from "@mysten/sui/client";
import { Keypair, PublicKey } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { generateNonce, generateRandomness } from "@mysten/sui/zklogin";

export async function prepareLogin(suiClient: SuiClient) {
  const { epoch } = await suiClient.getLatestSuiSystemState();
  console.log("epoch = " + epoch);

  const maxEpoch = parseInt(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
  const ephemeralKeyPair: Keypair = new Ed25519Keypair();
  const ephemeralPrivateKeyB64 = ephemeralKeyPair.getSecretKey();

  const ephemeralPublicKey: PublicKey = ephemeralKeyPair.getPublicKey();
  const ephemeralPublicKeyB64 = ephemeralPublicKey.toBase64();

  const jwt_randomness = generateRandomness();
  const nonce = generateNonce(ephemeralPublicKey, maxEpoch, jwt_randomness);

  console.log("current epoch = " + epoch);
  console.log("maxEpoch = " + maxEpoch);
  console.log("jwt_randomness = " + jwt_randomness);
  console.log("ephemeral public key = " + ephemeralPublicKeyB64);
  console.log("nonce = " + nonce);

  const userKeyData = {
    randomness: jwt_randomness.toString(),
    nonce: nonce,
    ephemeralPublicKey: ephemeralPublicKeyB64,
    ephemeralPrivateKey: ephemeralPrivateKeyB64,
    maxEpoch: maxEpoch,
  };

  localStorage.setItem("userKeyData", JSON.stringify(userKeyData));
  return userKeyData;
}
