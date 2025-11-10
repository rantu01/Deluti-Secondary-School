"use client";
import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebaseClient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import ProtectedClient from '@/app/components/ProtectedClient';
import Swal from 'sweetalert2';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing staff accounts on load
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('/api/staff/list');
        const data = await res.json();
        if (res.ok) {
          setStaffList(data);
        } else {
          toast.error(data.error || 'স্টাফ লিস্ট ফেচ করা যায়নি');
        }
      } catch (err) {
        console.error(err);
        toast.error('স্টাফ লিস্ট ফেচ করতে সমস্যা হয়েছে');
      }
    };
    fetchStaff();
  }, []);

  // Create new staff
  const createStaffAccount = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('সব ফিল্ড পূরণ করুন');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const newStaff = { id: userCredential.user.uid, name, email };
      setStaffList(prev => [...prev, newStaff]);

      setName('');
      setEmail('');
      setPassword('');
      toast.success('স্টাফ অ্যাকাউন্ট তৈরি হয়েছে');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'কিছু ভুল হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Delete staff using SweetAlert
  const deleteStaff = async (uid) => {
    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: "স্টাফ অ্যাকাউন্ট মুছে ফেলা হবে!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'হ্যাঁ, মুছে দিন!',
      cancelButtonText: 'না',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/staff/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid }),
        });
        const data = await res.json();
        if (res.ok) {
          setStaffList(prev => prev.filter(s => s.id !== uid));
          Swal.fire('মুছে ফেলা হয়েছে!', 'স্টাফ অ্যাকাউন্ট মুছে ফেলা হয়েছে।', 'success');
        } else {
          Swal.fire('ভুল হয়েছে!', data.error || 'কিছু ভুল হয়েছে', 'error');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('ভুল হয়েছে!', 'কিছু ভুল হয়েছে', 'error');
      }
    }
  };

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
            স্টাফ ম্যানেজমেন্ট
          </h1>

          {/* Create Staff Form */}
          <form onSubmit={createStaffAccount} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="text" placeholder="স্টাফ নাম" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"/>
              <input type="email" placeholder="ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"/>
              <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"/>
            </div>
            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg">
              {loading ? 'সৃষ্টি হচ্ছে...' : 'স্টাফ অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </form>

          {/* Staff Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">নাম</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ইমেইল</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffList.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button onClick={() => deleteStaff(staff.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
