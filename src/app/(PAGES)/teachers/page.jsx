// app/teachers/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiUsers,
  FiMail,
  FiPhone,
  FiAward,
  FiBook,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import {
  GraduationCap,
  UserCog,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  Award,
  Building,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDesignation, setSelectedDesignation] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const res = await fetch("/api/teachers");
        if (!res.ok) throw new Error("Failed to fetch teachers");
        const data = await res.json();
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  // Filter and sort teachers
  useEffect(() => {
    let filtered = [...teachers];

    // Filter by department
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.department === selectedDepartment
      );
    }

    // Filter by designation
    if (selectedDesignation !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.designation === selectedDesignation
      );
    }

    // Filter by search
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(lowerSearch) ||
          teacher.department.toLowerCase().includes(lowerSearch) ||
          teacher.designation.toLowerCase().includes(lowerSearch) ||
          (teacher.email &&
            teacher.email.toLowerCase().includes(lowerSearch)) ||
          (teacher.qualification &&
            teacher.qualification.toLowerCase().includes(lowerSearch))
      );
    }

    // Sort teachers
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "department")
        return a.department.localeCompare(b.department);
      if (sortBy === "experience")
        return (b.experience || 0) - (a.experience || 0);
      return 0;
    });

    setFilteredTeachers(filtered);
  }, [teachers, search, selectedDepartment, selectedDesignation, sortBy]);

  // Extract unique departments and designations
  const departments = [
    "all",
    ...new Set(teachers.map((t) => t.department)),
  ].sort();
  const designations = [
    "all",
    ...new Set(teachers.map((t) => t.designation)),
  ].sort();

  // Statistics
  const totalTeachers = teachers.length;
  const departmentsCount = new Set(teachers.map((t) => t.department)).size;
  const averageExperience =
    teachers.length > 0
      ? (
          teachers.reduce((sum, t) => sum + (t.experience || 0), 0) /
          teachers.length
        ).toFixed(1)
      : 0;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
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
            <UserCog className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Faculty & Staff
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of educators and administrative
            professionals
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
            title="Total Staff"
            value={totalTeachers}
            color="indigo"
          />
          <StatCard
            icon={<Building className="w-6 h-6" />}
            title="Departments"
            value={departmentsCount}
            color="purple"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            title="Avg. Experience"
            value={`${averageExperience} years`}
            color="blue"
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
                Search Staff
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, department, qualification..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Department Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline w-4 h-4 mr-1" />
                Department
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BadgeCheck className="inline w-4 h-4 mr-1" />
                Designation
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
              >
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation === "all" ? "All Roles" : designation}
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
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="department">Department</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Teachers Grid */}
        <AnimatePresence>
          {filteredTeachers.length === 0 ? (
            <EmptyState
              icon={<FiUsers className="w-16 h-16" />}
              title="No Staff Members Found"
              description={
                search ||
                selectedDepartment !== "all" ||
                selectedDesignation !== "all"
                  ? "Try adjusting your search or filters"
                  : "No staff members available in the system"
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTeachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher._id}
                  teacher={teacher}
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"
        />
        <p className="text-gray-600 text-lg">Loading faculty information...</p>
      </div>
    </div>
  );
}

// Statistics Card Component
function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
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
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );
}

// Teacher Card Component
function TeacherCard({ teacher, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDesignationColor = (designation) => {
    const lowerDesignation = designation.toLowerCase();
    if (
      lowerDesignation.includes("professor") ||
      lowerDesignation.includes("head")
    )
      return "from-purple-500 to-pink-600";
    if (
      lowerDesignation.includes("assistant") ||
      lowerDesignation.includes("lecturer")
    )
      return "from-blue-500 to-cyan-600";
    if (
      lowerDesignation.includes("admin") ||
      lowerDesignation.includes("coordinator")
    )
      return "from-green-500 to-emerald-600";
    return "from-gray-500 to-slate-600";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Teacher Header with Gradient */}
      <div
        className={`bg-gradient-to-r ${getDesignationColor(
          teacher.designation
        )} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            
            {teacher.experience && (
              <div className="text-right">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {teacher.experience} yrs
                </span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold truncate">{teacher.name}</h3>
          <p className="text-white text-opacity-90 truncate">
            {teacher.designation}
          </p>
        </div>
      </div>

      {/* Teacher Details */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Building className="w-4 h-4 mr-3 text-purple-500" />
            <span className="font-medium">Dept:</span>
            <span className="ml-2 text-gray-900">{teacher.department}</span>
          </div>

          {teacher.qualification && (
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-4 h-4 mr-3 text-blue-500" />
              <span className="truncate">{teacher.qualification}</span>
            </div>
          )}

          {teacher.email && (
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-green-500" />
              <span className="truncate text-sm">{teacher.email}</span>
            </div>
          )}

          {teacher.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-orange-500" />
              <span className="text-sm">{teacher.phone}</span>
            </div>
          )}

          {teacher.joiningDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3 text-red-500" />
              <span className="text-sm">
                Since {new Date(teacher.joiningDate).getFullYear()}
              </span>
            </div>
          )}
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
