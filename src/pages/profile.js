import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import InputField from "../components/InputField";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import { useSession } from "../lib/session";

const EMPTY_PASSWORDS = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function ProfilePage() {
  const session = useSession();
  const [profile, setProfile] = useState(null);
  const [passwordData, setPasswordData] = useState(EMPTY_PASSWORDS);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!session) return;
    api("/me")
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, [session]);

  if (!session) return null;

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const passwordMismatch =
    passwordData.confirmPassword !== "" &&
    passwordData.newPassword !== passwordData.confirmPassword;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await api("/me/password", {
        method: "PUT",
        body: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
      });
      setSuccess("Password changed successfully.");
      setPasswordData(EMPTY_PASSWORDS);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppLayout session={session} title={`${session.username}'s Profile`}>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <Notice error={error} success={success} />

        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold text-black">Personal Information</h2>
          <InputField label="Username" id="username" value={profile?.username || ""} disabled readOnly />
          <InputField label="Email" id="email" value={profile?.email || ""} disabled readOnly />
          <InputField label="Role" id="role" value={profile?.role || ""} disabled readOnly />
          <InputField
            label="Member Since"
            id="created-at"
            value={profile ? profile.createdAt.slice(0, 10) : ""}
            disabled
            readOnly
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <InputField
              label="Current Password"
              id="current-password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
            />
            <InputField
              label="New Password (at least 8 characters)"
              id="new-password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <div>
              <InputField
                label="Confirm New Password"
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
              />
              {passwordMismatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
