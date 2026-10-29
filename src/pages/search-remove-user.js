import { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import { useSession } from "../lib/session";

export default function SearchRemoveUserPage() {
  const session = useSession(["ADMIN"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async (search) => {
    try {
      setUsers(await api("/admin/users", { query: { search } }));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    const timer = setTimeout(() => loadUsers(searchTerm), 250);
    return () => clearTimeout(timer);
  }, [session, searchTerm, loadUsers]);

  if (!session) return null;

  const handleRemove = async (username) => {
    if (!window.confirm(`Are you sure you want to remove ${username}?`)) return;
    setError("");
    setSuccess("");
    try {
      await api("/admin/remove-user", { method: "DELETE", body: { username } });
      setSuccess(`${username} has been removed.`);
      loadUsers(searchTerm);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppLayout session={session} title="Manage Users">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <Notice error={error} success={success} />
        <div className="mb-6">
          <label htmlFor="search" className="block text-gray-900 font-medium mb-2">
            Search by Username
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center p-4 bg-gray-100 border border-gray-300 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 m-0">{user.username}</h2>
                  <p className="text-gray-700 text-sm m-0">{user.email}</p>
                  <p className="text-gray-500 text-sm m-0">Role: {user.role}</p>
                </div>
                {user.username !== session.username && (
                  <button
                    onClick={() => handleRemove(user.username)}
                    className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700">No users found.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
