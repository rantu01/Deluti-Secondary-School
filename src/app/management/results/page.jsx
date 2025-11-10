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
    class: "", // Added 'class' to form state
    subject: "",
    marks: "",
    year: new Date().getFullYear(),
    grade: "",
    examType: "annual",
  });
  const [editingResultId, setEditingResultId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // Default: "" (No class selected)
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showClassAlert, setShowClassAlert] = useState(false);

  // Fetch results
  const fetchResults = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      // Add a small delay for better UX on fast networks
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await axios.get("/api/results");

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
    // Filter by selectedClass (required)
    if (selectedClass) filtered = filtered.filter((r) => r.class === selectedClass);
    if (selectedSubject !== "all") filtered = filtered.filter((r) => r.subject === selectedSubject);
    if (selectedYear !== "all") filtered = filtered.filter((r) => r.year.toString() === selectedYear);

    setFilteredResults(filtered);
  }, [results, searchTerm, selectedClass, selectedSubject, selectedYear]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Grade calculation logic
      if (name === "marks" && value) {
        // Ensure marks is an integer for calculation
        const marks = parseInt(value); 
        
        if (!isNaN(marks)) {
          if (marks >= 80) updatedForm.grade = "A+";
          else if (marks >= 70) updatedForm.grade = "A";
          else if (marks >= 60) updatedForm.grade = "A-";
          else if (marks >= 50) updatedForm.grade = "B";
          else if (marks >= 40) updatedForm.grade = "C";
          else if (marks >= 33) updatedForm.grade = "D";
          else updatedForm.grade = "F";
        } else {
            updatedForm.grade = "";
        }
      }

      return updatedForm;
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if class is selected in the form before submitting
    if (!form.class) {
      setShowClassAlert(true);
      setTimeout(() => setShowClassAlert(false), 3000);
      return;
    }

    setSubmitting(true);

    try {
      if (editingResultId) {
        // Update existing
        await axios.put(`/api/results/${editingResultId}`, form);
        setSuccessMessage("Result updated successfully!");
      } else {
        // Add new
        await axios.post("/api/results", form);
        setSuccessMessage("Result added successfully!");
      }

      // Reset form state
      setForm({
        studentName: "",
        roll: "",
        class: "", // Reset class
        subject: "",
        marks: "",
        year: new Date().getFullYear(),
        grade: "",
        examType: "annual",
      });
      setShowForm(false);
      setEditingResultId(null);
      await fetchResults(true); // Re-fetch results
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

  // Edit result
  const handleEdit = (result) => {
    setForm({
      studentName: result.studentName || "",
      roll: result.roll || "",
      class: result.class || "", // Set class for editing
      subject: result.subject || "",
      marks: result.marks || "",
      year: result.year || new Date().getFullYear(),
      grade: result.grade || "",
      examType: result.examType || "annual",
    });
    setEditingResultId(result._id);
    setShowForm(true);
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
    setEditingResultId(null);
    setShowForm(false);
  };

  const handleRefresh = () => fetchResults(true);

  // Filters
  const classes = [...new Set(results.map((r) => r.class))].filter(Boolean).sort(); // filter(Boolean) removes empty/undefined classes
  const subjects = ["all", ...new Set(results.map((r) => r.subject))].filter(Boolean).sort();
  // Filter out 'all' before sorting by year descending, then add it back
  const years = ["all", ...new Set(results.map((r) => r.year.toString()))].filter(y => y !== "all" && Boolean(y)).sort((a,b)=>b-a);
  years.unshift("all"); // Ensure 'all' is the first option

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { opacity: 0, y:20 }, visible: { opacity:1, y:0, transition:{duration:0.5} } };
  const getGradeColor = (grade) => {
    switch(grade){
      case "A+": return "text-green-700 bg-green-100";
      case "A": return "text-green-600 bg-green-50";
      case "A-": return "text-blue-600 bg-blue-50";
      case "B": return "text-yellow-700 bg-yellow-100";
      case "C": return "text-orange-600 bg-orange-50";
      case "D": return "text-red-500 bg-red-50";
      case "F": return "text-red-700 bg-red-100";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const TableSkeleton = () => (
    <div className="space-y-4 p-6">
      {[...Array(5)].map((_, index)=>(
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
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Results Management
              </h1>
              <p className="text-gray-600 mt-2">Manage student results, grades, and academic performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button 
                whileHover={{scale:1.05}} 
                whileTap={{scale:0.95}} 
                onClick={handleRefresh} 
                disabled={refreshing || loading} 
                className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin":""}`}/>
                <span className="hidden lg:block">Refresh</span>
              </motion.button>
              <motion.button 
                whileHover={{scale:1.05}} 
                whileTap={{scale:0.95}} 
                onClick={()=>setShowForm(!showForm)} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5"/>
                <span>{editingResultId ? "Edit Result" : "Add New Result"}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {showClassAlert && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2"><AlertCircle className="w-5 h-5"/><span>Please select a class first before adding results!</span></motion.div>}
          {successMessage && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className={`${successMessage.includes("Error") ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"} border px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2`}>
            {successMessage.includes("Error") ? <AlertCircle className="w-5 h-5"/> : <CheckCircle className="w-5 h-5"/>}
            <span>{successMessage}</span>
          </motion.div>}
        </AnimatePresence>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Class Banner (Only shows if no class is selected in filter) */}
            {!selectedClass && <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3"><School className="w-8 h-8"/></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Select a Class to View Results</h3>
                  <p className="text-orange-100">Please choose a class from the filter below to view and manage student results.</p>
                </div>
              </div>
            </motion.div>}

            {/* Filters */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="filter-class" className="block text-sm font-medium text-gray-700 mb-2"><BookOpen className="inline w-4 h-4 mr-1"/>Select Class *</label>
                  <select id="filter-class" name="filter-class" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200">
                    <option value="">Choose a class</option>
                    {classes.map(cls=><option key={cls} value={cls}>Class {cls}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="filter-subject" className="block text-sm font-medium text-gray-700 mb-2"><FileText className="inline w-4 h-4 mr-1"/>Subject</label>
                  <select id="filter-subject" name="filter-subject" value={selectedSubject} onChange={e=>setSelectedSubject(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200">
                    {subjects.map(subject=><option key={subject} value={subject}>{subject==="all" ? "All Subjects":subject}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="filter-year" className="block text-sm font-medium text-gray-700 mb-2"><Calendar className="inline w-4 h-4 mr-1"/>Year</label>
                  <select id="filter-year" name="filter-year" value={selectedYear} onChange={e=>setSelectedYear(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200">
                    {years.map(year=><option key={year} value={year}>{year==="all"?"All Years":year}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="search-term" className="block text-sm font-medium text-gray-700 mb-2"><Search className="inline w-4 h-4 mr-1"/>Search</label>
                  <input type="text" id="search-term" placeholder="Search results..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"/>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">{editingResultId ? "Edit Result" : "Add New Result"}</h3>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition-colors duration-200"><X className="w-6 h-6"/></button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* Student Name */}
                    <div>
                      <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2"><User className="inline w-4 h-4 mr-1"/>Student Name *</label>
                      <input id="studentName" name="studentName" value={form.studentName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required placeholder="Enter student name"/>
                    </div>

                    {/* Roll */}
                    <div>
                      <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-2"><Hash className="inline w-4 h-4 mr-1"/>Roll Number *</label>
                      <input id="roll" name="roll" value={form.roll} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required placeholder="Roll number"/>
                    </div>
                    
                    {/* Class - FIX: Added missing Class input */}
                    <div>
                      <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2"><School className="inline w-4 h-4 mr-1"/>Class *</label>
                      <input id="class" name="class" value={form.class} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required placeholder="e.g., 10"/>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2"><BookOpen className="inline w-4 h-4 mr-1"/>Subject *</label>
                      <input id="subject" name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required placeholder="Subject"/>
                    </div>

                    {/* Marks */}
                    <div>
                      <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-2"><Award className="inline w-4 h-4 mr-1"/>Marks *</label>
                      <input type="number" id="marks" min="0" max="100" name="marks" value={form.marks} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required placeholder="Marks"/>
                    </div>

                    {/* Year */}
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2"><Calendar className="inline w-4 h-4 mr-1"/>Year *</label>
                      <input type="number" id="year" name="year" value={form.year} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" required/>
                    </div>

                    {/* Grade */}
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                      <input id="grade" name="grade" value={form.grade} readOnly className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"/>
                    </div>

                    {/* Exam Type */}
                    <div>
                      <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                      <select id="examType" name="examType" value={form.examType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white transition-all duration-200">
                        <option value="annual">Annual</option>
                        <option value="midterm">Midterm</option>
                        <option value="test">Test</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4 mt-4">
                      <button type="button" onClick={handleCancel} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200">Cancel</button>
                      <button type="submit" disabled={submitting} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin"/>
                            <span>{editingResultId ? "Updating..." : "Adding..."}</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5"/>
                            <span>{editingResultId ? "Update Result" : "Add Result"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Table - Only renders if a class is selected (selectedClass is truthy) */}
            {selectedClass && (
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl overflow-x-auto border border-gray-100">
                    {loading ? <TableSkeleton/> : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredResults.map(r=>(
                                    <tr key={r._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.roll}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.class}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{r.marks}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 text-xs font-bold leading-5 ${getGradeColor(r.grade)} rounded-full`}>{r.grade}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>handleEdit(r)} className="text-white px-3 py-1 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 text-sm">
                                                <Eye className="w-4 h-4 inline mr-1 lg:hidden"/>Edit
                                            </motion.button>
                                            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>handleDelete(r._id)} className="text-white px-3 py-1 rounded-2xl bg-red-500 hover:bg-red-600 transition-all duration-200 text-sm">
                                                <Trash2 className="w-4 h-4 inline mr-1 lg:hidden"/>Delete
                                            </motion.button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredResults.length === 0 && <tr><td colSpan="7" className="text-center py-10 text-gray-500 text-lg">No results found for current filters.</td></tr>}
                            </tbody>
                        </table>
                    )}
                </motion.div>
            )}

          </div>

          {/* Sidebar (Stats) */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-blue-500"/> Performance Stats</h3>
              <hr className="my-2 border-gray-100"/>
              <p className="flex justify-between items-center text-gray-600">Total Results: <span className="font-bold text-lg text-purple-600">{results.length}</span></p>
              <p className="flex justify-between items-center text-gray-600">Filtered Results: <span className="font-bold text-lg text-blue-600">{filteredResults.length}</span></p>
              <p className="flex justify-between items-center text-gray-600">Distinct Classes: <span className="font-bold text-lg text-green-600">{classes.length}</span></p>
              <p className="flex justify-between items-center text-gray-600">Distinct Subjects: <span className="font-bold text-lg text-orange-600">{subjects.length > 0 ? subjects.length - 1 : 0}</span></p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center"><Award className="w-5 h-5 mr-2 text-yellow-500"/> Grade Guide</h3>
              <hr className="my-2 border-gray-100"/>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                    <span className={`${getGradeColor("A+")} px-2 rounded-full font-bold`}>A+</span> 
                    <span className="text-gray-600"> &ge; 80</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("A")} px-2 rounded-full font-bold`}>A</span> 
                    <span className="text-gray-600"> &ge; 70</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("A-")} px-2 rounded-full font-bold`}>A-</span> 
                    <span className="text-gray-600"> &ge; 60</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("B")} px-2 rounded-full font-bold`}>B</span> 
                    <span className="text-gray-600"> &ge; 50</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("C")} px-2 rounded-full font-bold`}>C</span> 
                    <span className="text-gray-600"> &ge; 40</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("D")} px-2 rounded-full font-bold`}>D</span> 
                    <span className="text-gray-600"> &ge; 33</span>
                </li>
                <li className="flex justify-between">
                    <span className={`${getGradeColor("F")} px-2 rounded-full font-bold`}>F</span> 
                    <span className="text-gray-600"> &lt; 33</span>
                </li>
              </ul>
            </div>
          </motion.div>
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