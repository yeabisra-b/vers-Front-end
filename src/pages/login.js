import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  // State variables to hold the form values
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [error, setError] = useState(""); // For error messages

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Role-based dashboard mapping
    const roleDashboardMap = {
      ADMIN: "/admindashboard",
      REGISTRAR: "/registrardashboard",
      OFFICIAL: "/officialdashboard",
    };

    // Check if the role exists and redirect
    if (role in roleDashboardMap) {
      window.location.href = roleDashboardMap[role];
    } else {
      setError("Invalid role selected.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-600">
        <h1 className="text-4xl font-bold text-white mb-6">
          Vital Events Registering System
        </h1>

        {/* Login Form */}
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
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-xl text-gray-800 font-semibold"
            >
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="ADMIN">Admin</option>
              <option value="REGISTRAR">Registrar</option>
              <option value="OFFICIAL">Official</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Link to About Page */}
      <div className="mt-4 flex justify-center">
        <Link
          href="/about"
          className="text-lg text-white underline hover:text-blue-200 transition duration-200"
        >
          Go to About Page
        </Link>
      </div>
    </>
  );
}
