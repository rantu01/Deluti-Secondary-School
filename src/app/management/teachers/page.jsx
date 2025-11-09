'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', designation: '', department: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTeachers = async () => {
    const res = await axios.get('/api/teachers');
    setTeachers(res.data);
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/teachers/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('/api/teachers', form);
      }
      setForm({ name: '', designation: '', department: '', email: '' });
      fetchTeachers();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (t) => { setForm({ name: t.name, designation: t.designation, department: t.department, email: t.email }); setEditingId(t._id); };
  const handleDelete = async (id) => { if(!confirm('Are you sure?')) return; await axios.delete(`/api/teachers/${id}`); fetchTeachers(); };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Teachers</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded bg-white">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="border p-2 w-full" />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingId ? 'Update Teacher' : 'Add Teacher'}</button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
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
                <button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(t)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(t._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
