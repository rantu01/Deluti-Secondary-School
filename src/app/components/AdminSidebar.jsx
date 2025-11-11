'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BarChart3,
  Megaphone,
  UserCog,
  Settings,
  LogOut,
  Menu,
  Home,
  X,
} from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', icon: <Home />, href: '/' },
    { name: 'ড্যাশবোর্ড', icon: <LayoutDashboard />, href: '/management' },
    { name: 'ছাত্র-ছাত্রী', icon: <GraduationCap />, href: '/management/students' },
    { name: 'শিক্ষক', icon: <Users />, href: '/management/teachers' },
    { name: 'ফলাফল', icon: <BarChart3 />, href: '/management/results' },
    { name: 'নোটিশ', icon: <Megaphone />, href: '/management/notices' },
    { name: 'স্টাফ', icon: <UserCog />, href: '/management/staff' },
    { name: 'সেটিংস', icon: <Settings />, href: '/management/settings' },
  ];

  return (
    <div className="relative">
      {/* Toggle button (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl z-40 flex flex-col"
          >
            {/* Logo */}
            <div className="flex items-center justify-center h-20 border-b border-blue-400">
              <h2 className="text-xl font-bold tracking-wide">🎓 ডেলুটি স্কুল</h2>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-white/20 font-semibold'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="w-5 h-5">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                </Link>
              ))}
            </nav>

            
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
