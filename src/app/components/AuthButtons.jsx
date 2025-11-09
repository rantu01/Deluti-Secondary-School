"use client";
import { useAuth } from "../lib/AuthContext";

export function AuthButtons() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    );
  }

  return (
    <a
      href="/auth"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Login
    </a>
  );
}
