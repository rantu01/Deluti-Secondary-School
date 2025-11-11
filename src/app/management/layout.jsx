'use client';
import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import ProtectedClient from '../components/ProtectedClient';

export default function ManagementLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedClient>
      <div className="min-h-screen  flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 lg:ml-64 p-4 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </ProtectedClient>
  );
}
