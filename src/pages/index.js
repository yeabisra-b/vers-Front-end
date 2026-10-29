import { useEffect } from "react";
import { useRouter } from "next/router";
import { DASHBOARD_FOR_ROLE, getSession } from "../lib/session";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    router.replace(session ? DASHBOARD_FOR_ROLE[session.role] : "/login");
  }, [router]);

  return (
    <div className="grid place-items-center min-h-screen">
      <p className="text-center font-semibold text-lg">Redirecting...</p>
    </div>
  );
}
