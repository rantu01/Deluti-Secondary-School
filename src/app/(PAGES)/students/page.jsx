"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiSearch, FiBook, FiFilter, FiMail, FiPhone, FiUser, FiAward } from "react-icons/fi";
import { GraduationCap, Users, BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); 
  const [sortBy, setSortBy] = useState("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    
    if (selectedClass !== "") {
      filtered = filtered.filter(
        (student) => String(student.class) === String(selectedClass)
      );

      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(
          (student) =>
            student.name.toLowerCase().includes(lowerSearch) ||
            student.roll.toLowerCase().includes(lowerSearch) ||
            (student.email && student.email.toLowerCase().includes(lowerSearch))
        );
      }

      filtered.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "roll") return a.roll.localeCompare(b.roll);
        if (sortBy === "class") return a.class.localeCompare(b.class);
        return 0;
      });
    } else {
      filtered = [];
    }

    setFilteredStudents(filtered);
  }, [students, search, selectedClass, sortBy]);

  const classes = [...new Set(students.map((s) => s.class))].sort();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 group"
            >
              <FiArrowLeft 
                size={18} 
                className="group-hover:-translate-x-1 transition-transform duration-200" 
              />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>
          </div>

          {/* Title Section */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <GraduationCap className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-blue-700" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent leading-tight">
                Student Directory
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore and manage student information across all classes
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{students.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-purple-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Classes</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{classes.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-green-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiAward className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Active</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{filteredStudents.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 mb-6"
        >
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200"
            >
              <span className="font-semibold text-blue-800">Filters & Search</span>
              <FiFilter className={`text-blue-700 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Class Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiBook className="w-4 h-4 text-blue-600" />
                  Select Class
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
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

              {/* Search */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiSearch className="w-4 h-4 text-blue-600" />
                  Search Students
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, roll, or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiFilter className="w-4 h-4 text-blue-600" />
                  Sort By
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="roll">Roll Number</option>
                  <option value="class">Class</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <AnimatePresence mode="wait">
          {selectedClass === "" ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="max-w-md mx-auto px-4">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  Select a Class
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Choose a class from the dropdown above to view student information
                </p>
              </div>
            </motion.div>
          ) : filteredStudents.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="max-w-md mx-auto px-4">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No Students Found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  No students match your search criteria in Class {selectedClass}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Table Header */}
              <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-0">
                    Class {selectedClass} Students
                    <span className="ml-2 text-blue-100">({filteredStudents.length})</span>
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Sorted by {sortBy === 'name' ? 'Name' : sortBy === 'roll' ? 'Roll Number' : 'Class'}
                  </p>
                </div>
              </div>

              {/* Table - Responsive */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <FiUser className="h-3 w-3" />
                          <span className="hidden xs:inline">Name</span>
                        </div>
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                        Class
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <FiMail className="h-3 w-3" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <FiPhone className="h-3 w-3" />
                          <span>Phone</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-blue-50/50 transition-colors duration-150 group"
                      >
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-white">
                                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {student.name}
                              </div>
                              <div className="text-xs text-gray-500 sm:hidden">
                                Roll: {student.roll}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {student.roll}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                          Class {student.class}
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <FiMail className="h-3 w-3 text-gray-400" />
                            {student.email || "-"}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <FiPhone className="h-3 w-3 text-gray-400" />
                            {student.phone || "-"}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="lg:hidden p-4 space-y-3">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-500">Roll: {student.roll}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Class {student.class}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {student.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMail className="h-3 w-3" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiPhone className="h-3 w-3" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"
        />
        <p className="text-gray-600 text-lg font-medium">Loading student data...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}