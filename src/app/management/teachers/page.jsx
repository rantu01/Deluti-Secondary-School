"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  User,
  Mail,
  Building,
  Award,
  Users,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Phone,
  Calendar,
  BookOpen,
  Loader2,
  RefreshCw,
  Filter,
  MoreVertical,
} from "lucide-react";

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    qualification: "",
    joiningDate: "",
    experience: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch teachers with better error handling
  const fetchTeachers = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await axios.get("/api/teachers");

      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTeachers(res.data);
      setFilteredTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setSuccessMessage("Error loading teachers. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filter teachers
  useEffect(() => {
    let filtered = teachers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.designation
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          teacher.department
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.department === selectedDepartment
      );
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, selectedDepartment]);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        // Update
        await axios.put(`/api/teachers/${editingId}`, form);
        setSuccessMessage("Teacher updated successfully!");
      } else {
        // Create
        await axios.post("/api/teachers", form);
        setSuccessMessage("Teacher added successfully!");
      }

      setForm({
        name: "",
        designation: "",
        department: "",
        email: "",
        phone: "",
        qualification: "",
        joiningDate: "",
        experience: "",
      });
      setEditingId(null);
      setShowForm(false);
      await fetchTeachers(true);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving teacher:", err);
      setSuccessMessage("Error saving teacher. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Edit teacher
  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name || "",
      designation: teacher.designation || "",
      department: teacher.department || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      qualification: teacher.qualification || "",
      joiningDate: teacher.joiningDate || "",
      experience: teacher.experience || "",
    });
    setEditingId(teacher._id);
    setShowForm(true);
  };

  // Delete teacher
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await axios.delete(`/api/teachers/${id}`);
      setSuccessMessage("Teacher deleted successfully!");
      await fetchTeachers(true);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting teacher:", err);
      setSuccessMessage("Error deleting teacher. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({
      name: "",
      designation: "",
      department: "",
      email: "",
      phone: "",
      qualification: "",
      joiningDate: "",
      experience: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Refresh data
  const handleRefresh = () => {
    fetchTeachers(true);
  };

  // Get unique departments for filter
  const departments = [
    "all",
    ...new Set(teachers.map((t) => t.department)),
  ].sort();

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

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="space-y-4 p-6">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const getDesignationColor = (designation) => {
    const lowerDesignation = designation?.toLowerCase() || "";
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
      lowerDesignation.includes("coordinator") ||
      lowerDesignation.includes("instructor")
    )
      return "from-green-500 to-emerald-600";
    return "from-gray-500 to-slate-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6 rounded-2xl">
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
                Faculty Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage teacher profiles, departments, and academic staff
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
                <span>{editingId ? "Editing Teacher" : "Add New Teacher"}</span>
              </motion.button>
            </div>
          </div>
        </div>

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
            {/* Filters and Search */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search teachers by name, department, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                {/* Department Filter */}
                <div className="flex-1">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden lg:block">Export</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="hidden lg:block">Import</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Teacher Form */}
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
                      {editingId ? "Edit Teacher" : "Add New Teacher"}
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter teacher's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Award className="inline w-4 h-4 mr-1" />
                        Designation *
                      </label>
                      <input
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="e.g., Professor, Lecturer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="inline w-4 h-4 mr-1" />
                        Department *
                      </label>
                      <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                        placeholder="Enter department"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-1" />
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <BookOpen className="inline w-4 h-4 mr-1" />
                        Qualification
                      </label>
                      <input
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="e.g., M.Sc., Ph.D."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Joining Date
                      </label>
                      <input
                        name="joiningDate"
                        type="date"
                        value={form.joiningDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience (Years)
                      </label>
                      <input
                        name="experience"
                        type="number"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Years of experience"
                      />
                    </div>

                    <div className="md:col-span-2 flex space-x-3 pt-4">
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
                        <span>
                          {submitting
                            ? "Saving..."
                            : editingId
                            ? "Update Teacher"
                            : "Add Teacher"}
                        </span>
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

            {/* Teachers Table */}
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
                    Faculty List {!loading && `(${filteredTeachers.length})`}
                  </h3>
                  {!loading && (
                    <div className="text-sm text-gray-500">
                      {filteredTeachers.length} teachers found
                    </div>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <TableSkeleton />
              ) : filteredTeachers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    No teachers found
                  </h4>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || selectedDepartment !== "all"
                      ? "Try adjusting your search or filters"
                      : "No teachers available. Add your first teacher!"}
                  </p>
                  {!searchTerm && selectedDepartment === "all" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 mx-auto"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add First Teacher</span>
                    </motion.button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Designation & Department
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Contact & Experience
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((t) => (
                        <tr key={t._id}>
                          <td className="border p-2">{t.name}</td>
                          <td className="border p-2">{t.designation}</td>
                          <td className="border p-2">{t.department}</td>
                          <td className="border p-2">{t.email}</td>
                          <td className="border p-2 space-x-2">
                            <button
                              className="bg-yellow-400 text-white px-2 py-1 rounded"
                              onClick={() => handleEdit(t)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDelete(t._id)}
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
              <h3 className="font-semibold mb-4">Faculty Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{teachers.length}</div>
                    <div className="text-blue-100 text-sm">Total Teachers</div>
                  </div>
                  <Users className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">
                      {departments.length - 1}
                    </div>
                    <div className="text-blue-100 text-sm">Departments</div>
                  </div>
                  <Building className="w-8 h-8 text-white/80" />
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
                  <span className="font-medium">Export Faculty Data</span>
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
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Generate Report</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Department Distribution */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Departments</h3>
              <div className="space-y-3">
                {departments
                  .filter((dept) => dept !== "all")
                  .map((dept, index) => {
                    const count = teachers.filter(
                      (t) => t.department === dept
                    ).length;
                    return (
                      <div
                        key={dept}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{dept}</span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                          {count} teachers
                        </span>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
