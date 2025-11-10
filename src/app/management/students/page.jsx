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

    // Only filter if a class is selected
    if (selectedClass) {
      if (searchTerm) {
        filtered = filtered.filter(
          (s) =>
            s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.roll?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      filtered = filtered.filter((s) => s.class === selectedClass);
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
        setSuccessMessage("Student updated!");
      } else {
        await axios.post("/api/students", form);
        setSuccessMessage("Student added!");
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
    if (!confirm("Delete this student?")) return;

    try {
      const res = await axios.delete(`/api/students/${id}`);
      if (res.data.success) {
        setSuccessMessage("Student deleted!");
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Students Management
            </h1>
            <p className="text-gray-600 mt-1">Manage student records, admissions, and info</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <Plus className="w-5 h-5" />
              <span>{editingId ? "Edit Student" : "Add Student"}</span>
            </button>
          </div>
        </div>

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
              } border px-4 py-3 rounded-2xl mb-4 flex items-center gap-2`}
            >
              {successMessage.includes("Error") ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Class Filter */}
        <div className="bg-white rounded-3xl shadow-xl p-4 border border-gray-100 flex flex-col md:flex-row gap-3 md:gap-6 items-stretch">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, roll, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div className="flex-1 relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{editingId ? "Edit Student" : "Add Student"}</h3>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Photo URL */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <img
                    src={form.photo || "https://via.placeholder.com/80"}
                    alt="Student"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <input
                    type="text"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                    placeholder="Photo URL"
                    className="flex-1 px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div>
                  <label>Roll *</label>
                  <input name="roll" value={form.roll} onChange={handleChange} required className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div>
                  <label>Class *</label>
                  <input name="class" value={form.class} onChange={handleChange} required className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div>
                  <label>Section</label>
                  <input name="section" value={form.section} onChange={handleChange} className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div>
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-2xl" />
                </div>
                <div className="md:col-span-2">
                  <label>Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-2xl" />
                </div>

                <div className="md:col-span-2 flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded-2xl flex-1 flex justify-center items-center gap-2"
                  >
                    {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {submitting ? "Saving..." : editingId ? "Update Student" : "Add Student"}
                  </button>
                  <button type="button" onClick={handleCancel} disabled={submitting} className="border px-4 py-2 rounded-2xl flex-1">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Students Table */}
        {selectedClass ? (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Photo</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Roll</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Section</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-2">
                      <img src={s.photo || "https://via.placeholder.com/80"} alt="Student" className="w-12 h-12 rounded-full object-cover" />
                    </td>
                    <td className="px-2 py-2">{s.name}</td>
                    <td className="px-2 py-2">{s.roll}</td>
                    <td className="px-2 py-2">{s.class}</td>
                    <td className="px-2 py-2">{s.section}</td>
                    <td className="px-2 py-2">{s.email}</td>
                    <td className="px-2 py-2">{s.phone}</td>
                    <td className="px-2 py-2">{s.address}</td>
                    <td className="px-2 py-2 flex gap-1">
                      <button onClick={() => handleEdit(s)} className="bg-yellow-400 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(s._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && !loading && (
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-gray-500">
                      No students found for this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-6 text-center font-medium">
            Please select a class to view students.
          </div>
        )}
      </div>
    </div>
  );
}
