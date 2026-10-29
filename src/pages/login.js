import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import eyePasswordShow from "../../public/images/eye-password-show.svg";
import eyePasswordHide from "../../public/images/eye-password-hide.svg";
import { api } from "../lib/api";
import { DASHBOARD_FOR_ROLE, getSession, saveSession } from "../lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in: go straight to the dashboard
  useEffect(() => {
    const session = getSession();
    if (session) router.replace(DASHBOARD_FOR_ROLE[session.role]);
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await api("/login", {
        method: "POST",
        body: { username: username.trim(), password },
      });
      saveSession(session);
      router.push(DASHBOARD_FOR_ROLE[session.role]);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-600">
        <h1 className="text-4xl font-bold text-white mb-6">
          Vital Events Registering System
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow-lg bg-white"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-xl text-gray-800 font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl text-gray-800 font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 mt-2 flex items-center"
              >
                <Image
                  src={showPassword ? eyePasswordHide : eyePasswordShow}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          href="/about"
          className="text-lg text-black underline hover:text-blue-200 transition duration-200"
        >
          Go to About Page
        </Link>
      </div>
    </>
  );
}
