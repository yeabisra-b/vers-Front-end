import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SESSION_KEY = "vers-session";

export const DASHBOARD_FOR_ROLE = {
  ADMIN: "/admindashboard",
  REGISTRAR: "/registrardashboard",
  OFFICIAL: "/officialdashboard",
};

function tokenExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload.exp * 1000;
  } catch {
    return 0;
  }
}

/** Stores the /login response: { token, role, username }. */
export function saveSession({ token, role, username }) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ token, role, username, expiresAt: tokenExpiry(token) })
  );
}

/** The current session, or null when logged out or the token has expired. */
export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (session?.token && session.expiresAt > Date.now()) return session;
  } catch {
    // Corrupt entry: treat as logged out
  }
  localStorage.removeItem(SESSION_KEY);
  return null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function logout() {
  clearSession();
  window.location.href = "/login";
}

/**
 * Guards a page: redirects to /login when logged out, or to the user's own
 * dashboard when their role isn't in `allowedRoles`. Returns the session once
 * access is confirmed, and null until then (render nothing while null).
 */
export function useSession(allowedRoles) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const rolesKey = allowedRoles ? allowedRoles.join(",") : "";

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
    } else if (rolesKey && !rolesKey.split(",").includes(current.role)) {
      router.replace(DASHBOARD_FOR_ROLE[current.role] || "/login");
    } else {
      setSession(current);
    }
  }, [router, rolesKey]);

  return session;
}
