"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Users,
  Filter,
  Eye,
} from "lucide-react";

export default function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [form, setForm] = useState({
    photo: "",
    name: "",
    roll: "",
    class: "",
    section: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students
  const fetchStudents = async (showRefresh = false) => {
    try {
      showRefresh ? setRefreshing(true) : setLoading(true);
      const res = await axios.get("/api/students");
      const studentsWithId = res.data.map((s) => ({ ...s, _id: s._id || s.id }));
      setStudents(studentsWithId);
      setFilteredStudents(studentsWithId);
    } catch (err) {
      console.error("Error fetching students:", err);
      setSuccessMessage("Error loading students");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter((s) => s.class === selectedClass);
      
      if (searchTerm) {
        filtered = filtered.filter(
          (s) =>
            s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.roll?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    } else {
      filtered = [];
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedClass]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`/api/students/${editingId}`, form);
        setSuccessMessage("Student updated successfully!");
      } else {
        await axios.post("/api/students", form);
        setSuccessMessage("Student added successfully!");
      }
      setForm({
        photo: "",
        name: "",
        roll: "",
        class: "",
        section: "",
        email: "",
        phone: "",
        address: "",
      });
      setEditingId(null);
      setShowForm(false);
      await fetchStudents(true);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Error saving student.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleEdit = (student) => {
    setForm({ ...student });
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await axios.delete(`/api/students/${id}`);
      if (res.data.success) {
        setSuccessMessage("Student deleted successfully!");
        await fetchStudents(true);
      } else {
        setSuccessMessage("Error deleting student.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("Error deleting student.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setForm({
      photo: "",
      name: "",
      roll: "",
      class: "",
      section: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleRefresh = () => fetchStudents(true);

  const classes = [...new Set(students.map((s) => s.class))].sort();

  // Stats calculation
  const totalStudents = students.length;
  const activeClassStudents = filteredStudents.length;
  const totalClasses = classes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6 rounded-2xl">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Students Management
                </h1>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Manage student records, admissions, and information</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? "animate-spin" : ""}`} />
                <span className="text-sm sm:text-base">Refresh</span>
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{editingId ? "Edit Student" : "Add Student"}</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="bg-blue-50/80 rounded-xl p-3 sm:p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{totalStudents}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50/80 rounded-xl p-3 sm:p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Classes</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{totalClasses}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50/80 rounded-xl p-3 sm:p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Active Class</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{activeClassStudents}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success/Error Message */}
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
              } border rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 shadow-lg`}
            >
              {successMessage.includes("Error") ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm sm:text-base">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name, roll, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white/80"
              />
            </div>

            {/* Class Filter */}
            <div className="flex-1 relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white/80 appearance-none"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 lg:gap-3">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 sm:px-4 py-2 rounded-xl border transition-colors ${
                  viewMode === "table"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm sm:text-base">Table</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 sm:px-4 py-2 rounded-xl border transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm sm:text-base">Grid</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {editingId ? "Edit Student" : "Add New Student"}
                </h3>
                <button
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Photo URL */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-blue-50/50 rounded-xl">
                  <div className="flex-shrink-0">
                    <img
                      src={form.photo || "/api/placeholder/80/80"}
                      alt="Student preview"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      name="photo"
                      value={form.photo}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      name="roll"
                      value={form.roll}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="Enter roll number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class *
                    </label>
                    <input
                      type="text"
                      name="class"
                      value={form.class}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="Enter class"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="Enter section"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="student@school.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white resize-none"
                    placeholder="Enter full address"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {submitting ? "Saving..." : editingId ? "Update Student" : "Add Student"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={submitting}
                    className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Students Display */}
        {!selectedClass ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8 text-center"
          >
            <BookOpen className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-2">
              Select a Class
            </h3>
            <p className="text-yellow-700 text-sm sm:text-base">
              Please select a class from the dropdown above to view and manage students.
            </p>
          </motion.div>
        ) : filteredStudents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center border border-gray-100"
          >
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No Students Found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              No students match your search criteria in Class {selectedClass}.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Student
            </button>
          </motion.div>
        ) : viewMode === "table" ? (
          // Table View
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-0">
                  Class {selectedClass} Students
                  <span className="ml-2 text-blue-100">({filteredStudents.length})</span>
                </h2>
                <p className="text-blue-100 text-sm">
                  {searchTerm ? `Search: "${searchTerm}"` : "All students"}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Class & Section
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                      Address
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.photo || "/api/placeholder/60/60"}
                            alt={student.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">
                              {student.name}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 md:hidden">
                              <Mail className="w-3 h-3" />
                              {student.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {student.roll}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                        <div className="text-sm text-gray-900">Class {student.class}</div>
                        <div className="text-sm text-gray-500">{student.section || "No section"}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                        <div className="space-y-1">
                          {student.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              <span className="truncate">{student.email}</span>
                            </div>
                          )}
                          {student.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              <span>{student.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden xl:table-cell">
                        <div className="flex items-center gap-2 text-sm text-gray-600 max-w-xs">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{student.address || "No address"}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredStudents.map((student) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4 sm:p-6">
                  {/* Student Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={student.photo || "/api/placeholder/80/80"}
                      alt={student.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">
                        {student.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Roll: {student.roll}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Class {student.class}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-3">
                    {student.section && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>Section: {student.section}</span>
                      </div>
                    )}
                    {student.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{student.email}</span>
                      </div>
                    )}
                    {student.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{student.phone}</span>
                      </div>
                    )}
                    {student.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{student.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(student)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}