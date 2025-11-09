// app/students/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiUsers,
  FiBook,
  FiMail,
  FiPhone,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import {
  GraduationCap,
  UserPlus,
  School,
  Hash,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Filter and sort students
  useEffect(() => {
    let filtered = [...students];

    // Filter by class
    if (selectedClass !== "all") {
      filtered = filtered.filter((student) => student.class === selectedClass);
    }

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

    // Sort students
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "roll") return a.roll.localeCompare(b.roll);
      if (sortBy === "class") return a.class.localeCompare(b.class);
      return 0;
    });

    setFilteredStudents(filtered);
  }, [students, search, selectedClass, sortBy]);

  // Extract unique classes
  const classes = ["all", ...new Set(students.map((s) => s.class))].sort();

  // Statistics
  const totalStudents = students.length;
  const classesCount = new Set(students.map((s) => s.class)).size;

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
            Manage and explore student information efficiently
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard
            icon={<FiUsers className="w-6 h-6" />}
            title="Total Students"
            value={totalStudents}
            color="blue"
          />
          <StatCard
            icon={<School className="w-6 h-6" />}
            title="Active Classes"
            value={classesCount}
            color="green"
          />
          <StatCard
            icon={<UserPlus className="w-6 h-6" />}
            title="New Students"
            value="0"
            color="purple"
            trend="+5 this month"
          />
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiSearch className="inline w-4 h-4 mr-1" />
                Search Students
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, roll, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Class Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiBook className="inline w-4 h-4 mr-1" />
                Filter by Class
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls === "all" ? "All Classes" : `Class ${cls}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
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

        {/* Students Grid */}
        <AnimatePresence>
          {filteredStudents.length === 0 ? (
            <EmptyState
              icon={<FiUsers className="w-16 h-16" />}
              title="No Students Found"
              description={
                search || selectedClass !== "all"
                  ? "Try adjusting your search or filters"
                  : "No students available in the system"
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredStudents.map((student, index) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Loading Spinner Component
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

// Statistics Card Component
function StatCard({ icon, title, value, color, trend }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-center"
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClasses[color]} text-white mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {trend && <p className="text-sm text-green-600 font-medium">{trend}</p>}
    </motion.div>
  );
}

// Student Card Component
function StudentCard({ student, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Student Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <FiUser className="w-8 h-8" />
          </div>
          <div className="text-right">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
              Class {student.class}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold truncate">{student.name}</h3>
        <p className="text-blue-100 opacity-90">Student</p>
      </div>

      {/* Student Details */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Hash className="w-4 h-4 mr-3 text-blue-500" />
            <span className="font-medium">Roll:</span>
            <span className="ml-2 text-gray-900">{student.roll}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <School className="w-4 h-4 mr-3 text-green-500" />
            <span className="font-medium">Class:</span>
            <span className="ml-2 text-gray-900">{student.class}</span>
          </div>

          {student.email && (
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-purple-500" />
              <span className="truncate">{student.email}</span>
            </div>
          )}

          {student.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-orange-500" />
              <span>{student.phone}</span>
            </div>
          )}

          {student.admissionDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3 text-red-500" />
              <span>
                Admitted: {new Date(student.admissionDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-6 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
            View Profile
          </button>
          <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Empty State Component
function EmptyState({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 bg-white rounded-2xl shadow-lg"
    >
      <div className="text-gray-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-600 mb-3">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{description}</p>
    </motion.div>
  );
}
