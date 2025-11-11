'use client';
import AdminSidebar from '../components/AdminSidebar';
import Menu from '../components/Menu';
import ProtectedClient from '../components/ProtectedClient';

export default function ManagementLayout({ children }) {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gray-100 max-w-6xl mx-auto">
        <AdminSidebar />
        <div className="container mx-auto p-4">{children}</div>
      </div>
    </ProtectedClient>
  );
}
