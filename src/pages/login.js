import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import eyePasswordShow from "../../public/images/eye-password-show.svg";
import eyePasswordHide from "../../public/images/eye-password-hide.svg";
//components
import LogInInputField from "@/components/LogInComponents";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const mockUsers = [
    { username: "adminUser", password: "adminPass", role: "ADMIN" },
    { username: "registrarUser", password: "registrarPass", role: "REGISTRAR" },
    { username: "officialUser", password: "officialPass", role: "OFFICIAL" },
  ];

  const roleDashboardMap = {
    ADMIN: "/admindashboard",
    REGISTRAR: "/registrardashboard",
    OFFICIAL: "/officialdashboard",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (user) {
      window.location.href = roleDashboardMap[user.role];
    } else {
      setError("Invalid username or password. Please try again.");
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
          {/*from this we can make a component that take a parameter {name, type, id, value, onchange function} */}
          <LogInInputField
            name={"Username"}
            type={"text"}
            id={"username"}
            value={username}
            setFunc={setUsername}
          />
          <LogInInputField
            name={"Password"}
            type={"password"}
            id={"password"}
            value={password}
            setFunc={setPassword}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
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
