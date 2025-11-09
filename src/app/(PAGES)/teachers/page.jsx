// app/teachers/page.jsx
"use client";
import React, { useEffect, useState } from "react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/teachers"); // Client fetch
        if (!res.ok) throw new Error("Failed to fetch teachers");
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) return <p>Loading staff...</p>;

  return (
    <div className="max-w-6xl  mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Teachers & Staff</h2>
      <ul className="space-y-2">
        {teachers.length === 0 && <p>No staff found.</p>}
        {teachers.map((t) => (
          <li key={t._id} className="border p-2 rounded-md">
            <p>
              <b>{t.name}</b> — {t.designation}, {t.department}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
