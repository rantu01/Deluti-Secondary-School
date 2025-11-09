"use client";
import React, { useEffect, useState } from "react";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // Fetch all results from API
  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/results");
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

  // Filter results whenever class or search changes
  useEffect(() => {
    if (!selectedClass) {
      setFilteredResults([]);
      return;
    }

    let filtered = results.filter((r) => r.class === selectedClass);

    // Filter by search (name or roll)
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.studentName.toLowerCase().includes(lowerSearch) ||
          r.roll.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredResults(filtered);
  }, [selectedClass, search, results]);

  // Extract unique classes for dropdown
  const classes = Array.from(new Set(results.map((r) => r.class))).sort();

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="max-w-6xl  mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Results</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border p-2 rounded-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {selectedClass && (
          <input
            type="text"
            placeholder="Search by name or roll"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-md flex-1"
          />
        )}
      </div>

      {!selectedClass ? (
        <p className="text-gray-500">Please select a class to view results.</p>
      ) : filteredResults.length === 0 ? (
        <p>No results found for this class.</p>
      ) : (
        <ul className="space-y-2">
          {filteredResults.map((r) => (
            <li key={r._id} className="border p-2 rounded-md">
              <p>
                <b>{r.studentName}</b> — Roll: {r.roll} — {r.subject}: {r.marks} marks
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
