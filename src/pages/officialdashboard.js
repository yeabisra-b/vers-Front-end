import Link from "next/link";
import AppLayout from "../components/AppLayout";
import { useSession } from "../lib/session";

export default function OfficialDashboardPage() {
  const session = useSession(["OFFICIAL"]);
  if (!session) return null;

  return (
    <AppLayout session={session} title="Welcome, Official">
      <p className="text-gray-700 mb-6">
        Approve or reject events submitted by registrars, and generate statistical
        reports on registered events.
      </p>
      <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <Link
          href="/review"
          className="p-6 bg-green-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:no-underline transition duration-300"
        >
          Review Events
        </Link>
        <Link
          href="/reports"
          className="p-6 bg-green-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:no-underline transition duration-300"
        >
          Generate Reports
        </Link>
      </section>
    </AppLayout>
  );
}
