// app/results/page.jsx
"use client";
import React, { useEffect, useState } from "react";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/results"); // Client-side fetch
        if (!res.ok) throw new Error("Failed to fetch results");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  if (loading) return <p>Loading results...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      <ul className="space-y-2">
        {results.length === 0 && <p>No results found.</p>}
        {results.map((r) => (
          <li key={r._id} className="border p-2 rounded-md">
            <p>
              <b>{r.studentName}</b> — {r.subject}: {r.marks} marks
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
