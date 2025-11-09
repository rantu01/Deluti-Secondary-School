'use client';

import { useAuth } from "../lib/AuthContext";

export default function Menu() {
  const { user } = useAuth(); // Get current user from context

  return (
    <nav className="bg-white shadow-md mt-4">
      <div className="container mx-auto flex justify-center space-x-8 py-4">
        <a href="/" className="hover:text-blue-600 font-medium">Home</a>
        <a href="/gallery" className="hover:text-blue-600 font-medium">Gallery</a>
        <a href="/results" className="hover:text-blue-600 font-medium">Results</a>
        <a href="/students" className="hover:text-blue-600 font-medium">Students</a>
        <a href="/teachers" className="hover:text-blue-600 font-medium">Teachers</a>

        {/* Show Management link only if logged in */}
        {user && (
          <a href="/management" className="hover:text-blue-600 font-medium">
            Management
          </a>
        )}
      </div>
    </nav>
  );
}
