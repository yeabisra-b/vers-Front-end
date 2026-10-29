import Link from "next/link";
import AppLayout from "../components/AppLayout";
import { useSession } from "../lib/session";

export default function RegistrarDashboardPage() {
  const session = useSession(["REGISTRAR"]);
  if (!session) return null;

  return (
    <AppLayout session={session} title="Welcome, Registrar">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Vital Events Overview
        </h2>
        <p className="text-gray-700">
          Register births, deaths, marriages, and divorces, and correct existing
          records. Every new or edited event is reviewed by an official.
        </p>
      </section>
      <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <Link
          href="/register"
          className="p-6 bg-blue-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:no-underline transition duration-300"
        >
          Register New Event
        </Link>
        <Link
          href="/update"
          className="p-6 bg-blue-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:no-underline transition duration-300"
        >
          Update Events
        </Link>
      </section>
    </AppLayout>
  );
}
