import { useState } from "react";
import { login } from "../lib/auth";
import { pb } from "../lib/pb";
import { loginWithOAuth } from "../lib/auth";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      if (isSignup) {
        await pb
          .collection("users")
          .create({ email, password, passwordConfirm: password });
      }
      await login(email, password);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  async function handleOAuth(provider: "google" | "github") {
    setError(null);
    setLoading(true);
    try {
      await loginWithOAuth(provider);
    } catch (e: any) {
      setError(e.message || "OAuth failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm rounded-2xl bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold text-white">AI Chat</h1>
        <p className="mb-6 text-sm text-gray-400">
          {isSignup ? "Create a new account" : "Sign in to your account"}
        </p>
        <input
          className="mb-3 w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
        <button
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "..." : isSignup ? "Sign Up" : "Sign In"}
        </button>
        {/* Divider */}
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-700" />
          <span className="text-xs text-gray-500">or continue with</span>
          <div className="h-px flex-1 bg-gray-700" />
        </div>

        {/* OAuth Buttons */}
        <button
          className="mb-2 w-full rounded-lg border border-gray-700 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          onClick={() => handleOAuth("github")}
          disabled={loading}
        >
          GitHub
        </button>
        <button
          className="w-full rounded-lg border border-gray-700 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          onClick={() => handleOAuth("google")}
          disabled={loading}
        >
          Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            className="ml-1 text-blue-400 hover:text-blue-300"
            onClick={() => {
              setIsSignup(!isSignup);
              setError(null);
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
