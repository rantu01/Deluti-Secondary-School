"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  User,
  BookOpen,
  Hash,
  Award,
  Calendar,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  School,
  Loader2,
  RefreshCw,
  Eye,
  FileText,
} from "lucide-react";
import ProtectedClient from "@/app/components/ProtectedClient";

function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    roll: "",
    class: "",
    subject: "",
    marks: "",
    year: new Date().getFullYear(),
    grade: "",
    examType: "annual",
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showClassAlert, setShowClassAlert] = useState(false);

  // Fetch results with better error handling
  const fetchResults = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await axios.get("/api/results");

      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      setResults(res.data);
      setFilteredResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setSuccessMessage("Error loading results. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Filter results
  useEffect(() => {
    let filtered = results;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (result) =>
          result.studentName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          result.roll?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by class
    if (selectedClass) {
      filtered = filtered.filter((result) => result.class === selectedClass);
    }

    // Filter by subject
    if (selectedSubject !== "all") {
      filtered = filtered.filter(
        (result) => result.subject === selectedSubject
      );
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(
        (result) => result.year.toString() === selectedYear
      );
    }

    setFilteredResults(filtered);
  }, [results, searchTerm, selectedClass, selectedSubject, selectedYear]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Auto-calculate grade based on marks
      if (name === "marks" && value) {
        const marks = parseInt(value);
        if (marks >= 80) updatedForm.grade = "A+";
        else if (marks >= 70) updatedForm.grade = "A";
        else if (marks >= 60) updatedForm.grade = "A-";
        else if (marks >= 50) updatedForm.grade = "B";
        else if (marks >= 40) updatedForm.grade = "C";
        else if (marks >= 33) updatedForm.grade = "D";
        else updatedForm.grade = "F";
      }

      return updatedForm;
    });
  };

  // Submit new result
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate class selection
    if (!form.class) {
      setShowClassAlert(true);
      setTimeout(() => setShowClassAlert(false), 3000);
      return;
    }

    setSubmitting(true);

    try {
      await axios.post("/api/results", form);
      setSuccessMessage("Result added successfully!");
      setForm({
        studentName: "",
        roll: "",
        class: "",
        subject: "",
        marks: "",
        year: new Date().getFullYear(),
        grade: "",
        examType: "annual",
      });
      setShowForm(false);
      await fetchResults(true);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving result:", err);
      setSuccessMessage("Error saving result. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete result
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this result?")) return;

    try {
      await axios.delete(`/api/results/${id}`);
      setSuccessMessage("Result deleted successfully!");
      await fetchResults(true);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting result:", err);
      setSuccessMessage("Error deleting result. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setForm({
      studentName: "",
      roll: "",
      class: "",
      subject: "",
      marks: "",
      year: new Date().getFullYear(),
      grade: "",
      examType: "annual",
    });
    setShowForm(false);
  };

  // Refresh data
  const handleRefresh = () => {
    fetchResults(true);
  };

  // Get unique values for filters
  const classes = [...new Set(results.map((r) => r.class))].sort();
  const subjects = ["all", ...new Set(results.map((r) => r.subject))].sort();
  const years = ["all", ...new Set(results.map((r) => r.year.toString()))].sort(
    (a, b) => b - a
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Get grade color
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "text-green-600 bg-green-100";
      case "A":
        return "text-green-600 bg-green-50";
      case "A-":
        return "text-blue-600 bg-blue-50";
      case "B":
        return "text-yellow-600 bg-yellow-50";
      case "C":
        return "text-orange-600 bg-orange-50";
      case "D":
        return "text-red-600 bg-red-50";
      case "F":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="space-y-4 p-6">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Results Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage student results, grades, and academic performance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden lg:block">Refresh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Result</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Class Selection Alert */}
        <AnimatePresence>
          {showClassAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Please select a class first before adding results!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${
                successMessage.includes("Error")
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-green-50 border-green-200 text-green-700"
              } border px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2`}
            >
              {successMessage.includes("Error") ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Class Selection Banner */}
            {!selectedClass && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-6 text-white"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                    <School className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      Select a Class to View Results
                    </h3>
                    <p className="text-orange-100">
                      Please choose a class from the filter below to view and
                      manage student results.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filters and Search */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Class Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="inline w-4 h-4 mr-1" />
                    Select Class *
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                    required
                  >
                    <option value="">Choose a class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline w-4 h-4 mr-1" />
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === "all" ? "All Years" : year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Search className="inline w-4 h-4 mr-1" />
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Search results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Add New Result
                    </h3>
                    <button
                      onClick={handleCancel}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Student Name *
                      </label>
                      <input
                        name="studentName"
                        value={form.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter student name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Hash className="inline w-4 h-4 mr-1" />
                        Roll Number *
                      </label>
                      <input
                        name="roll"
                        value={form.roll}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter roll number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <BookOpen className="inline w-4 h-4 mr-1" />
                        Class *
                      </label>
                      <select
                        name="class"
                        value={form.class}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>
                            Class {cls}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="inline w-4 h-4 mr-1" />
                        Subject *
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter subject"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Award className="inline w-4 h-4 mr-1" />
                        Marks *
                      </label>
                      <input
                        name="marks"
                        type="number"
                        value={form.marks}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter marks"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade
                      </label>
                      <input
                        name="grade"
                        value={form.grade}
                        readOnly
                        className={`w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 ${getGradeColor(
                          form.grade
                        )} font-bold text-center`}
                        placeholder="Auto-calculated"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Year *
                      </label>
                      <input
                        name="year"
                        type="number"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        min="2000"
                        max="2030"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Type
                      </label>
                      <select
                        name="examType"
                        value={form.examType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                      >
                        <option value="annual">Annual Exam</option>
                        <option value="half-yearly">Half Yearly</option>
                        <option value="term">Term Exam</option>
                        <option value="test">Class Test</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 flex space-x-3 pt-4">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        <span>{submitting ? "Adding..." : "Add Result"}</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancel}
                        disabled={submitting}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Table */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedClass
                      ? `Class ${selectedClass} Results`
                      : "Results"}{" "}
                    {!loading && `(${filteredResults.length})`}
                  </h3>
                  {!loading && (
                    <div className="text-sm text-gray-500">
                      {filteredResults.length} results found
                    </div>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <TableSkeleton />
              ) : !selectedClass ? (
                <div className="p-8 text-center">
                  <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    No Class Selected
                  </h4>
                  <p className="text-gray-500">
                    Please select a class from the filter above to view results
                  </p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-8 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    No Results Found
                  </h4>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ||
                    selectedSubject !== "all" ||
                    selectedYear !== "all"
                      ? "Try adjusting your search or filters"
                      : "No results available for this class. Add your first result!"}
                  </p>
                  {!searchTerm &&
                    selectedSubject === "all" &&
                    selectedYear === "all" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 mx-auto"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add First Result</span>
                      </motion.button>
                    )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Academic Info
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r._id}>
                          <td className="border p-2">{r.studentName}</td>
                          <td className="border p-2">{r.roll}</td>
                          <td className="border p-2">{r.class}</td>
                          <td className="border p-2">{r.subject}</td>
                          <td className="border p-2">{r.marks}</td>
                          <td className="border p-2">{r.year}</td>
                          <td className="border p-2 space-x-2">
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDelete(r._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white"
            >
              <h3 className="font-semibold mb-4">Results Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{results.length}</div>
                    <div className="text-blue-100 text-sm">Total Results</div>
                  </div>
                  <Award className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">{classes.length}</div>
                    <div className="text-blue-100 text-sm">Active Classes</div>
                  </div>
                  <BookOpen className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full text-left p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export Results</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full text-left p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Bulk Import</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full text-left p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors duration-200 flex items-center space-x-3"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Generate Report</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Class Performance */}
            {selectedClass && (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-800 mb-4">
                  Class {selectedClass} Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-semibold">
                      {new Set(filteredResults.map((r) => r.roll)).size}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subjects:</span>
                    <span className="font-semibold">
                      {new Set(filteredResults.map((r) => r.subject)).size}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Marks:</span>
                    <span className="font-semibold text-green-600">
                      {filteredResults.length > 0
                        ? (
                            filteredResults.reduce(
                              (sum, r) => sum + parseInt(r.marks),
                              0
                            ) / filteredResults.length
                          ).toFixed(1)
                        : "0"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedClient>
      <ResultsManagement />
    </ProtectedClient>
  );
}
