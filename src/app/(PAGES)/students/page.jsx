// app/students/page.jsx
"use client";
import React, { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Students List</h2>
      <ul className="space-y-2">
        {students.length === 0 && <p>No students found.</p>}
        {students.map((s) => (
          <li key={s._id} className="border p-2 rounded-md">
            <p>
              <b>{s.name}</b> — Roll: {s.roll}, Class: {s.class}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
