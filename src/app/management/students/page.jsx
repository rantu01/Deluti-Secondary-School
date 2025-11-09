'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', roll: '', class: '', section: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`/api/students/${editingId}`, form);
        setEditingId(null);
      } else {
        // Create
        await axios.post('/api/students', form);
      }
      setForm({ name: '', roll: '', class: '', section: '' });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit student
  const handleEdit = (s) => {
    setForm({ name: s.name, roll: s.roll, class: s.class, section: s.section });
    setEditingId(s._id);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded bg-white">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="roll"
          placeholder="Roll"
          value={form.roll}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {/* Students Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.roll}</td>
              <td className="border p-2">{s.class}</td>
              <td className="border p-2">{s.section}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
