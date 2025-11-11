'use client';

import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">🚧 Coming Soon</h1>
      <p className="text-gray-600 text-lg mb-8">
        This page is under construction. Please check back later.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </a>
    </div>
  );
}
