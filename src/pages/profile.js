import { useState, useEffect } from "react";
import InputField from "../components/InputField";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    role: "registrar",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState(null);

  // Load profile data from local storage
  useEffect(() => {
    const loggedInUsername = localStorage.getItem("loggedin-username");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === loggedInUsername);
    console.log(user);
    setUser(user);
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "registrar",
      });
    }
  }, []);

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

    console.log(user.password, passwordData.currentPassword);
    if (passwordData.currentPassword !== user.password) {
      setPasswordError("Invalid current password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === profileData.username
        ? { ...u, password: passwordData.newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
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
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <InputField
          label="Username"
          id="username"
          value={profileData.username}
          onChange={() => {}}
          disabled
        />
        <InputField
          label="Email"
          id="email"
          value={profileData.email}
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Password Change */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <InputField
            label="Current Password"
            id="current-password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            name="currentPassword"
            type="password"
          />
          <InputField
            label="New Password"
            id="new-password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            name="newPassword"
            type="password"
          />
          <InputField
            label="Confirm New Password"
            id="confirm-password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            name="confirmPassword"
            type="password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
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
