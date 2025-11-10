// app/students/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiUsers, FiSearch, FiBook, FiFilter } from "react-icons/fi";
import { GraduationCap, School, Hash, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // start empty
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
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

  useEffect(() => {
    let filtered = [...students];

    // Filter by selected class
    if (selectedClass !== "") {
      filtered = filtered.filter(
        (student) => String(student.class) === String(selectedClass)
      );

      // Filter by search
      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(
          (student) =>
            student.name.toLowerCase().includes(lowerSearch) ||
            student.roll.toLowerCase().includes(lowerSearch) ||
            (student.email && student.email.toLowerCase().includes(lowerSearch))
        );
      }

      // Sort
      filtered.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "roll") return a.roll.localeCompare(b.roll);
        if (sortBy === "class") return a.class.localeCompare(b.class);
        return 0;
      });
    } else {
      filtered = []; // no class selected, show nothing
    }

    setFilteredStudents(filtered);
  }, [students, search, selectedClass, sortBy]);

  // Extract unique classes
  const classes = [...new Set(students.map((s) => s.class))].sort();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Directory
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a class to view students
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiBook className="inline w-4 h-4 mr-1" />
                Select Class
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiSearch className="inline w-4 h-4 mr-1" />
                Search Students
              </label>
              <input
                type="text"
                placeholder="Search by name, roll, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFilter className="inline w-4 h-4 mr-1" />
                Sort By
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="roll">Roll Number</option>
                <option value="class">Class</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Show message if no class selected */}
        {selectedClass === "" ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg text-gray-600 font-medium">
            Please select a class to view student data.
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg text-gray-600 font-medium">
            No students found in this class.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.roll}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.phone || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"
        />
        <p className="text-gray-600 text-lg">Loading students...</p>
      </div>
    </div>
  );
}
