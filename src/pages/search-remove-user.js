import { useState } from "react";

export default function SearchRemoveUserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "john_doe", email: "john@example.com", role: "registrar" },
    { id: 2, username: "jane_smith", email: "jane@example.com", role: "official" },
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(term)
      )
    );
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      alert("User has been successfully removed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Search and Remove Users
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Search by Username
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter username"
          />
        </div>

        {/* User List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-4 bg-gray-100 border border-gray-300 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.username}
                  </h2>
                  <p className="text-gray-700 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-sm">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleRemove(user.id)}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
