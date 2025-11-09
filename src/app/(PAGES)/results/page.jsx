"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiSearch,
  FiFilter,
  FiAward,
  FiTrendingUp,
  FiUser,
  FiBook,
  FiArrowLeft,
} from "react-icons/fi";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortBy, setSortBy] = useState("marks");

  // Fetch all results from API
  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
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

  // Filter and sort results whenever class, search, or sort changes
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

    // Sort results
    filtered.sort((a, b) => {
      if (sortBy === "marks") return b.marks - a.marks;
      if (sortBy === "name") return a.studentName.localeCompare(b.studentName);
      if (sortBy === "roll") return a.roll.localeCompare(b.roll);
      return 0;
    });

    setFilteredResults(filtered);
  }, [selectedClass, search, results, sortBy]);

  // Extract unique classes for dropdown
  const classes = Array.from(new Set(results.map((r) => r.class))).sort();

  // Calculate statistics
  const totalStudents = filteredResults.length;
  const averageMarks =
    totalStudents > 0
      ? (
          filteredResults.reduce((sum, r) => sum + r.marks, 0) / totalStudents
        ).toFixed(1)
      : 0;
  const topPerformer =
    totalStudents > 0
      ? filteredResults.reduce((top, current) =>
          current.marks > top.marks ? current : top
        )
      : null;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

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

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Academic Results
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track student performance and academic achievements
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Class Selection */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline w-4 h-4 mr-1" />
                Select Class
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Choose a class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            {selectedClass && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline w-4 h-4 mr-1" />
                  Search Students
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            )}

            {/* Sort Options */}
            {selectedClass && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="inline w-4 h-4 mr-1" />
                  Sort By
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="marks">Highest Marks</option>
                  <option value="name">Student Name</option>
                  <option value="roll">Roll Number</option>
                </select>
              </div>
            )}
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Total Students"
              value={totalStudents}
              color="blue"
            />
            <StatCard
              icon={<FiTrendingUp className="w-6 h-6" />}
              title="Average Marks"
              value={averageMarks}
              color="green"
            />
            <StatCard
              icon={<Award className="w-6 h-6" />}
              title="Top Score"
              value={
                topPerformer
                  ? `${topPerformer.marks} by ${topPerformer.studentName}`
                  : "N/A"
              }
              color="purple"
            />
          </motion.div>
        )}

        {/* Results List */}
        <AnimatePresence>
          {!selectedClass ? (
            <EmptyState
              icon={<BookOpen className="w-16 h-16" />}
              title="Select a Class"
              description="Choose a class from the dropdown above to view results"
            />
          ) : filteredResults.length === 0 ? (
            <EmptyState
              icon={<Search className="w-16 h-16" />}
              title="No Results Found"
              description={
                search
                  ? "Try adjusting your search criteria"
                  : "No students found in this class"
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {filteredResults.map((result, index) => (
                <ResultCard
                  key={result._id}
                  result={result}
                  index={index}
                  isTopPerformer={
                    topPerformer && result._id === topPerformer._id
                  }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading results...</p>
      </div>
    </div>
  );
}

// Statistics Card Component
function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-center"
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClasses[color]} text-white mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );
}

// Result Card Component
function ResultCard({ result, index, isTopPerformer }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getGradeColor = (marks) => {
    if (marks >= 80) return "text-green-600 bg-green-100";
    if (marks >= 60) return "text-blue-600 bg-blue-100";
    if (marks >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
        isTopPerformer ? "border-yellow-400 bg-yellow-50" : "border-blue-400"
      } transition-all duration-300`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              isTopPerformer ? "bg-yellow-100" : "bg-blue-100"
            }`}
          >
            {isTopPerformer ? (
              <Award className="w-6 h-6 text-yellow-600" />
            ) : (
              <FiUser className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              {result.studentName}
              {isTopPerformer && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-500 text-white rounded-full">
                  Top Performer
                </span>
              )}
            </h3>
            <p className="text-gray-600">
              Roll: {result.roll} • Class: {result.class}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4 sm:mt-0">
          <div className="text-center">
            <p className="text-sm text-gray-600">Subject</p>
            <p className="font-semibold text-gray-900">{result.subject}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Marks</p>
            <p
              className={`text-lg font-bold px-3 py-1 rounded-full ${getGradeColor(
                result.marks
              )}`}
            >
              {result.marks}
            </p>
          </div>
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
      className="text-center py-16"
    >
      <div className="text-gray-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  );
}
