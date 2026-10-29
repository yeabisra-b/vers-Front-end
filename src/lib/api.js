import { clearSession, getSession } from "./session";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Calls the backend and returns the parsed JSON body. Throws ApiError with the
 * server's error message on failure. Empty `query` values are left out.
 */
export async function api(path, { method = "GET", body, query } = {}) {
  const session = getSession();
  const url = new URL(path, API_URL);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (session) headers.Authorization = `Bearer ${session.token}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(`Cannot reach the server at ${API_URL}. Is the backend running?`, 0);
  }

  const data = await response.json().catch(() => null);

  if (response.status === 401 && session) {
    // Token expired or the account was removed
    clearSession();
    window.location.href = "/login";
  }
  if (!response.ok) {
    const fallback =
      response.status === 403
        ? "You don't have permission to do that."
        : `Request failed (${response.status}).`;
    throw new ApiError(data?.error || fallback, response.status);
  }
  return data;
}
