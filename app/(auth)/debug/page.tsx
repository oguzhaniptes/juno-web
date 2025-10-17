"use client";

import { useSession } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getZkLoginData, hasValidZkLoginSession } from "@/lib/storage";
import { debugZkLoginStorage, getZkLoginStorageSummary, validateZkLoginData } from "@/lib/zklogin-debug";

export default function ProfileDebugPage() {
  const { authData, signOut, isLoading } = useSession();
  const router = useRouter();
  const [zkData, setZkData] = useState<ReturnType<typeof getZkLoginData> | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (!isLoading && !authData) {
      router.push("/login");
    }
  }, [authData, isLoading, router]);

  useEffect(() => {
    if (authData) {
      const data = getZkLoginData();
      setZkData(data);
    }
  }, [authData]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const handleDebugStorage = () => {
    debugZkLoginStorage();
    alert("Check browser console for zkLogin storage details");
  };

  const handleValidate = () => {
    const validation = validateZkLoginData();
    const summary = getZkLoginStorageSummary();
    console.group("🔍 zkLogin Validation Results");
    console.log("Valid:", validation.isValid);
    console.log("Has Ephemeral:", summary.hasEphemeral);
    console.log("Has Persistent:", summary.hasPersistent);
    console.log("Errors:", validation.errors);
    console.log("Warnings:", validation.warnings);
    console.groupEnd();
    const message = validation.isValid ? "✅ All zkLogin data is valid!" : `❌ Validation failed:\n${validation.errors.join("\n")}`;
    alert(message);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authData) {
    return null;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Debug</h1>
            <p className="text-gray-600 mt-1">Manage and inspect zkLogin/session data.</p>
          </div>
          <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🔐</span> Authentication Data
        </h2>
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">User ID</span>
            <code className="bg-gray-100 px-3 py-2 rounded mt-1 text-sm break-all">{authData.user_id}</code>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Salt</span>
            <code className="bg-gray-100 px-3 py-2 rounded mt-1 text-sm break-all">{authData.salt}</code>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>📦</span> zkLogin Session
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${hasValidZkLoginSession() ? "bg-green-500" : "bg-red-500"}`} />
            <span className="font-medium">{hasValidZkLoginSession() ? "Active Session" : "No Valid Session"}</span>
          </div>

          {zkData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">📦 Ephemeral Data (sessionStorage)</h3>
                {zkData.ephemeral ? (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ Public Key</li>
                    <li>✅ Private Key</li>
                    <li>✅ JWT Randomness</li>
                    <li>✅ Nonce</li>
                  </ul>
                ) : (
                  <p className="text-sm text-red-600">❌ No ephemeral data</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">💾 Persistent Data (localStorage)</h3>
                {zkData.persistent ? (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ User ID: {zkData.persistent.user_id.slice(0, 8)}...</li>
                    <li>✅ Salt: {zkData.persistent.salt.slice(0, 8)}...</li>
                    <li>✅ Max Epoch: {zkData.persistent.max_epoch}</li>
                  </ul>
                ) : (
                  <p className="text-sm text-red-600">❌ No persistent data</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🔧</span> Debug Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleDebugStorage} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Debug Storage
          </button>
          <button onClick={handleValidate} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Validate Data
          </button>
          <button onClick={() => setShowDebug(!showDebug)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            {showDebug ? "Hide" : "Show"} Raw Data
          </button>
        </div>

        {showDebug && zkData && (
          <div className="mt-4 space-y-4">
            {zkData.ephemeral && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Ephemeral Data:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">{JSON.stringify(zkData.ephemeral, null, 2)}</pre>
              </div>
            )}
            {zkData.persistent && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Persistent Data:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">{JSON.stringify(zkData.persistent, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
