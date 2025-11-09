"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Deluti Secondary School</div>
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div
          className={`md:flex md:space-x-4 items-center ${
            open ? "block" : "hidden"
          }`}
        >
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/students">Students</Link>
          <Link href="/teachers">Teacher's and Staff</Link>
          <Link href="/results">Result</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact Us</Link>

          {user ? (
            <button
              onClick={logout}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
