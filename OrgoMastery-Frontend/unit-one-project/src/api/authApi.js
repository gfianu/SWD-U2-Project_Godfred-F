import { API_BASE_URL } from "./config";

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await res.json()
      : await res.text();

  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data.message || "Registration failed"
    );
  }

  return data;
}

export async function loginUser(payload) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await res.json()
      : await res.text();

  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data.message || "Login failed"
    );
  }

  return data;
}

export async function fetchCurrentUser(token) {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`Failed to load user (${res.status})`);
  }

  return res.json();
}