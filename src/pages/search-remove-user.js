import { useState } from "react";

export default function RemoveUserPage() {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState("");

  const NEXT_PUBLIC_API_URL = "http://localhost:8080";

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setSearchResult(null);

    try {
      const response = await fetch(NEXT_PUBLIC_API_URL + "/admin/search-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Error: Failed to connect to the server.");
    }
  };

  const handleRemove = async () => {
    setMessage("");

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/remove-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setUsername("");
        setSearchResult(null);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Error: Failed to connect to the server.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Remove User</h1>
        {message && <p className="mb-4 text-center text-blue-500">{message}</p>}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Search User
          </button>
        </form>
        {searchResult && (
          <div className="mt-4">
            <p className="text-gray-700 mb-2">Username: {searchResult.username}</p>
            <p className="text-gray-700 mb-2">Email: {searchResult.email}</p>
            <p className="text-gray-700 mb-2">Role: {searchResult.role}</p>
            <p className="text-gray-700 mb-4">Created At: {new Date(searchResult.createdAt).toLocaleString()}</p>
            <button
              onClick={handleRemove}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Remove User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
