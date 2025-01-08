import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  
  const NEXT_PUBLIC_API_URL = "http://localhost:8080";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("REGISTRAR");
  const [removeUsername, setRemoveUsername] = useState("");
  const [message, setMessage] = useState("");

  const addUser = async () => {
    try {
      const response = await fetch(NEXT_PUBLIC_API_URL + "/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, password, email, role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "User added successfully.");
      } else {
        setMessage(data.error || "Failed to add user.");
      }
    } catch (error) {
      setMessage("An error occured while adding user." + error);
    }
  };

  const removeUser = async () => {
    try {
      const response = await fetch(NEXT_PUBLIC_API_URL + "/admin/remove-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
                body: JSON.stringify({ username: removeUsername
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "User removed successfully.");
      } else {
        setMessage(data.error || "Failed to remove user.");
      }
    } catch (error) {
      setMessage("An error occured while removing user." + error);
    }

  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/about"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200"
            >
              <span>ℹ️</span> About
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200"
            >
              <span>👤</span> Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Welcome, Admin</h1>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                window.location.href = "/login";
              }
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Logout
          </button>
        </header>

        {/* Main Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Manage Users
          </h2>
          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Button to Add a Registrar */}
            <button
              onClick={() => (window.location.href = "/add-user")}
              className="block w-full max-w-sm p-4 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add a User
            </button>

            {/* Button to Remove a Registrar */}
            <button
              onClick={() => (window.location.href = "/search-remove-user")}
              className="block w-full max-w-sm p-4 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Remove a User
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
