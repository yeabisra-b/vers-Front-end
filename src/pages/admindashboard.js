import Link from "next/link";
import AppLayout from "../components/AppLayout";
import { useSession } from "../lib/session";

const CARDS = [
  { href: "/add-user", label: "Add a User" },
  { href: "/search-remove-user", label: "Manage Users" },
  { href: "/register", label: "Register New Event" },
  { href: "/update", label: "Update Events" },
  { href: "/review", label: "Review Events" },
  { href: "/reports", label: "Generate Reports" },
];

export default function AdminDashboardPage() {
  const session = useSession(["ADMIN"]);
  if (!session) return null;

  return (
    <AppLayout session={session} title="Welcome, Admin">
      <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 bg-blue-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:no-underline transition duration-300"
          >
            {card.label}
          </Link>
        ))}
      </section>
    </AppLayout>
  );
}
