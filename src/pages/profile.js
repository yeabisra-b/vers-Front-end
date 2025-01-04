import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import SectionHeader from "../components/SectionHeader";

export default function ProfilePage({ user }) {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    role: "registrar", // Default role
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "registrar",
      });
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordError(
        name === "confirmPassword" && passwordData.newPassword !== value
          ? "Passwords do not match."
          : ""
      );
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    console.log("Password Change Data:", passwordData);
    alert("Password changed successfully.");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Profile</h1>

      {/* Personal Information */}
      <div className="mb-6">
        <SectionHeader title="Personal Information" />
        <div className="space-y-4">
          <InputField
            label="Username"
            id="username"
            value={profileData.username}
            onChange={() => {}}
            name="username"
            required
            disabled
          />
          <InputField
            label="Email"
            id="email"
            value={profileData.email}
            onChange={() => {}}
            name="email"
            type="email"
            required
            disabled
          />
          <SelectField
            label="Role"
            id="role"
            value={profileData.role}
            onChange={() => {}}
            name="role"
            options={[
              { value: "registrar", label: "Registrar" },
              { value: "official", label: "Official" },
              { value: "admin", label: "Admin" },
            ]}
            disabled
          />
        </div>
      </div>

      {/* Password Change */}
      <div className="mb-6">
        <SectionHeader title="Change Password" />
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <InputField
              label="Current Password"
              id="current-password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              name="currentPassword"
              type="password"
              required
            />
            <InputField
              label="New Password"
              id="new-password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              name="newPassword"
              type="password"
              required
            />
            <InputField
              label="Confirm New Password"
              id="confirm-password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              name="confirmPassword"
              type="password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
