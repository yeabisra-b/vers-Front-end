import { useState } from "react";
import InputField from "../components/InputField"; // Adjust the path based on your project structure
import SectionHeader from "../components/SectionHeader";
import SelectField from "../components/SelectField";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "registrar", // Default role
    password: "",
    confirmPassword: "",
  });


  const NEXT_PUBLIC_API_URL = "http://localhost:8080";

  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return; // Prevent form submission
    } else {
      setPasswordError("");
    }

    const data = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      role: formData.role.toUpperCase(),
    };

    // Perform the API call or logic to add the user
    try {
      const response = await fetch(NEXT_PUBLIC_API_URL + "/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message);
      } else {
        setMessage("Error: " + (responseData.error || "Unknown error has occured!"));
      }
    } catch (err) {
      setMessage("Error: Failed to connect to the server.");
    }

    // Clear the form
    setFormData({
      username: "",
      email: "",
      role: "registrar",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <SectionHeader title="Add New User" />
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <InputField
              label="Username"
              id="username"
              value={formData.username}
              onChange={(e) =>
                handleChange({ target: { name: "username", value: e.target.value } })
              }
              required={true}
              type="text"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <InputField
              label="Email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                handleChange({ target: { name: "email", value: e.target.value } })
              }
              required={true}
              type="email"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <SelectField
              label="Role"
              id="role"
              value={formData.role}
              onChange={(e) =>
                handleChange({ target: { name: "role", value: e.target.value } })
              }
              options={[
                { label: "Registrar", value: "registrar" },
                { label: "Official", value: "official" },
              ]}
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <InputField
              label="New Password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                handleChange({ target: { name: "password", value: e.target.value } })
              }
              required={true}
              type="password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange({
                  target: { name: "confirmPassword", value: e.target.value },
                })
              }
              required={true}
              type="password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add User
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
