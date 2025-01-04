import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
          <nav>
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
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                window.location.href = "/login";
              }
            }}
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-white shadow">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome to the Home page
          </h1>
        </header>

        {/* Main Section */}
        <main className="px-8 py-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Vital Events Overview
            </h2>
            <p className="text-gray-700">
              View and manage all vital events in the system, including births,
              deaths, marriages, and divorces.
            </p>
          </section>

          {/* Action Buttons */}
          <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => (window.location.href = "/register")}
              className="p-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Register New Event
            </button>

            <button
              onClick={() => (window.location.href = "/update")}
              className="p-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Update Events (Birth & Death)
            </button>

            <button
              onClick={() => (window.location.href = "/updatemd")}
              className="p-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Update Events (Marriage & Divorce)
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
