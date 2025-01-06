import Link from "next/link";
import NavBar from "@/components/NavBar";
import Button from "@/components/ButtonRoute";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <NavBar />
      </div>
      <div className="mt-auto p-6">
        <Logout />
      </div>
    </div>
  );
};

const Logout = () => {
  return (
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
  );
};
const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white shadow">
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome to the Home page
      </h1>
    </header>
  );
};
const Desciption = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Vital Events Overview
      </h2>
      <p className="text-gray-700">
        View and manage all vital events in the system, including births,
        deaths, marriages, and divorces.
      </p>
    </section>
  );
};
const ActionButtons = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Button url="/register" name="Register New Event" />
      <Button url="/update" name="Update Events (Birth & Death)" />
      <Button url="/updatemd" name="Update Events (Marriage & Divorce)" />
    </section>
  );
};
const MainContent = () => {
  return (
    <div className="flex-1 bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Section */}
      <main className="px-8 py-6">
        <Desciption />
        {/* Action Buttons */}
        <ActionButtons />
      </main>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <MainContent />
    </div>
  );
}
