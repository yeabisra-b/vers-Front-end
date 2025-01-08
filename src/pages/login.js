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
  const [loading, setLoading] = useState(false);

  const NEXT_PUBLIC_API_URL = "http://localhost:8080";
  
  const roleDashboardMap = {
    "ADMIN": "/admindashboard",
    "REGISTRAR": "/registrardashboard",
    "OFFICIAL": "/officialdashboard",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(NEXT_PUBLIC_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        const dashboardPage = roleDashboardMap[data.role];

        if (dashboardPage) {
          window.location.href = dashboardPage;
        }
        else {
          setError("Invalid role or no dashboard available!");
        }
      }
      else {
        const errorData = await response.json();
        setError(errorData.error || "An unknown error has occured!");
      }
    }
<<<<<<< HEAD
  };
=======
    catch (error) {
      setLoading(false);
      setError("Failed to connect to the server. Please try again." + error);
    }
  }

>>>>>>> 2482df1 (Initial commit for a branch)
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-600">
        <h1 className="text-4xl font-bold text-white mb-6">
          Vital Events Registering System
        </h1>
        <form
          onSubmit={handleSubmit}
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
            disabled={loading}
            className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
<<<<<<< HEAD
      <div className="mt-4 flex justify-center">
        <Link
          href="/about"
          className="text-lg text-black underline hover:text-blue-200 transition duration-200"
        >
          Go to About Page
        </Link>
      </div>
=======
>>>>>>> 2482df1 (Initial commit for a branch)
    </>
  );
}
