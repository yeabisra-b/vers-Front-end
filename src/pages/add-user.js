import { useState } from "react";
import AppLayout from "../components/AppLayout";
import InputField from "../components/InputField";
import Notice from "../components/Notice";
import SelectField from "../components/SelectField";
import { api } from "../lib/api";
import { useSession } from "../lib/session";

const EMPTY_FORM = {
  username: "",
  email: "",
  role: "REGISTRAR",
  password: "",
  confirmPassword: "",
};

export default function AddUserPage() {
  const session = useSession(["ADMIN"]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!session) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordMismatch =
    formData.confirmPassword !== "" && formData.password !== formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const { confirmPassword: _, ...user } = formData;
      await api("/admin/add-user", { method: "POST", body: user });
      setSuccess(`User "${formData.username}" has been added.`);
      setFormData(EMPTY_FORM);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppLayout session={session} title="Add New User">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Notice error={error} success={success} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={64}
          />
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <SelectField
            label="Role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { label: "Registrar", value: "REGISTRAR" },
              { label: "Official", value: "OFFICIAL" },
              { label: "Admin", value: "ADMIN" },
            ]}
          />
          <InputField
            label="Password (at least 8 characters)"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <div>
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add User
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
