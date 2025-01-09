import { useState } from "react";
import InputField from "../components/InputField"; // Adjust the path based on your project structure
import SectionHeader from "../components/SectionHeader";
import SelectField from "../components/SelectField";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "REGISTRAR", // Default role
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Password validation
    if (name === "confirmPassword" || name === "password") {
      if (
        formData.password !== "" &&
        name === "confirmPassword" &&
        value !== formData.password
      ) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final password validation before submission
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    const newUser = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
      password: formData.password, // Ideally, passwords should be hashed before storing
    };
    existingUsers.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("User has been successfully added.");

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
                { label: "Registrar", value: "REGISTRAR" },
                { label: "Official", value: "OFFICIAL" },
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
      </div>
    </div>
  );
}
