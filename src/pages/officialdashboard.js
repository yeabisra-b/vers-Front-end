import Link from "next/link";

export default function OfficialDashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
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
          <h1 className="text-3xl font-semibold">Welcome, Official</h1>
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
            Generate Reports
          </h2>
          <p className="text-gray-700 mb-6">
            Use the button below to generate detailed reports for vital events.
            This functionality is exclusive to officials.
          </p>

          {/* Action Button */}
          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/reports")}
              className="block w-full max-w-sm p-4 bg-green-500 text-white text-center font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            >
              Generate Reports
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
