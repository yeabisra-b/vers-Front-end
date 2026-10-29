import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DASHBOARD_FOR_ROLE, logout } from "../lib/session";

const NAV_LINKS = {
  ADMIN: [
    { href: "/add-user", label: "Add User" },
    { href: "/search-remove-user", label: "Manage Users" },
    { href: "/register", label: "Register Event" },
    { href: "/update", label: "Update Events" },
    { href: "/review", label: "Review Events" },
    { href: "/reports", label: "Reports" },
  ],
  REGISTRAR: [
    { href: "/register", label: "Register Event" },
    { href: "/update", label: "Update Events" },
  ],
  OFFICIAL: [
    { href: "/review", label: "Review Events" },
    { href: "/reports", label: "Reports" },
  ],
};

/** Page frame for logged-in users: sidebar with role-based links, header, logout. */
const AppLayout = ({ session, title, children }) => {
  const router = useRouter();
  const links = [
    { href: DASHBOARD_FOR_ROLE[session.role], label: "Dashboard" },
    ...NAV_LINKS[session.role],
    { href: "/profile", label: "Profile" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-1">VERS</h2>
          <p className="text-sm text-gray-400 mb-8">
            {session.username} · {session.role.toLowerCase()}
          </p>
          <nav>
            <ul className="space-y-2 list-none p-0">
              {links.map((link) => (
                <li key={link.href} className="m-0">
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg text-white hover:bg-gray-700 hover:no-underline ${
                      router.pathname === link.href ? "bg-gray-700" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) logout();
            }}
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 bg-gray-100 min-w-0">
        <header className="px-8 py-6 bg-white shadow">
          <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
        </header>
        <main className="px-8 py-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
