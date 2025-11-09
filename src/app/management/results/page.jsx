'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedClient from '@/app/components/ProtectedClient';

function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    studentName: '',
    roll: '',
    class: '',
    subject: '',
    marks: '',
    year: new Date().getFullYear(),
  });

  // Fetch results
  const fetchResults = async () => {
    try {
      const res = await axios.get('/api/results');
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new result
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/results', form);
      setForm({
        studentName: '',
        roll: '',
        class: '',
        subject: '',
        marks: '',
        year: new Date().getFullYear(),
      });
      fetchResults();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete result
  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/results/${id}`);
      fetchResults();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Results</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded bg-white">
        <input name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} className="border p-2 w-full" required />
        <input name="roll" placeholder="Roll" value={form.roll} onChange={handleChange} className="border p-2 w-full" required />
        <input name="class" placeholder="Class" value={form.class} onChange={handleChange} className="border p-2 w-full" required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="border p-2 w-full" required />
        <input name="marks" type="number" placeholder="Marks" value={form.marks} onChange={handleChange} className="border p-2 w-full" required />
        <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Result</button>
      </form>

      {/* Results Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Actions</th>
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
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
