"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, X, CheckCircle, AlertCircle, Loader2, RefreshCw, Edit, Trash2 } from "lucide-react";

export default function NoticesManagement() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchNotices = async (showRefresh = false) => {
    try {
      showRefresh ? setRefreshing(true) : setLoading(true);
      const res = await axios.get("/api/notices");
      setNotices(res.data);
    } catch (err) {
      setSuccessMessage("Error loading notices");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`/api/notices/${editingId}`, form);
        setSuccessMessage("Notice updated!");
      } else {
        await axios.post("/api/notices", form);
        setSuccessMessage("Notice added!");
      }
      setForm({ title: "", content: "" });
      setEditingId(null);
      await fetchNotices(true);
    } catch (err) {
      setSuccessMessage("Error saving notice.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleEdit = (notice) => {
    setForm({ title: notice.title, content: notice.content });
    setEditingId(notice._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await axios.delete(`/api/notices/${id}`);
      setSuccessMessage("Notice deleted!");
      await fetchNotices(true);
    } catch (err) {
      setSuccessMessage("Error deleting notice.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">নোটিশ ব্যবস্থাপনা</h1>
          <button onClick={() => fetchNotices(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-2xl hover:bg-gray-200">
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
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

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">{editingId ? "নোটিশ সম্পাদনা করুন" : "নতুন নোটিশ যোগ করুন"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label>শিরোনাম *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-2xl" />
            </div>
            <div>
              <label>বিস্তারিত *</label>
              <textarea name="content" value={form.content} onChange={handleChange} required rows={4} className="w-full px-3 py-2 border rounded-2xl"></textarea>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded-2xl flex-1 flex justify-center items-center gap-2">
                {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                {submitting ? "Saving..." : editingId ? "Update Notice" : "Add Notice"}
              </button>
              <button type="button" onClick={() => { setForm({ title: "", content: "" }); setEditingId(null); }} className="border px-4 py-2 rounded-2xl flex-1">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Notices Table */}
        <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">শিরোনাম</th>
                <th className="px-4 py-2 text-left">বিস্তারিত</th>
                <th className="px-4 py-2 text-left">তারিখ</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n) => (
                <tr key={n._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-2 py-2">{n.title}</td>
                  <td className="px-2 py-2">{n.content}</td>
                  <td className="px-2 py-2">{new Date(n.date).toLocaleDateString()}</td>
                  <td className="px-2 py-2 flex gap-2">
                    <button onClick={() => handleEdit(n)} className="bg-yellow-400 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => handleDelete(n._id)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    কোনো নোটিশ পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
