'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedClient from '../components/ProtectedClient';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  Megaphone,
  UserPlus,
  BarChart3,
  CheckCircle2,
  Settings,
  UserCog,
  ChevronRight,
} from 'lucide-react';

export default function ManagementDashboard() {
  const router = useRouter();

  const dashboardCards = [
    {
      title: 'ছাত্র-ছাত্রী ব্যবস্থাপনা',
      description: 'ছাত্র-ছাত্রীদের তথ্য যোগ, সম্পাদনা ও দেখুন',
      href: '/management/students',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      stats: '৫০০+ শিক্ষার্থী',
    },
    {
      title: 'শিক্ষক ব্যবস্থাপনা',
      description: 'শিক্ষকদের তথ্য ও ক্লাস রুটিন ব্যবস্থাপনা',
      href: '/management/teachers',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      stats: '২৫+ শিক্ষক',
    },
    {
      title: 'ফলাফল ব্যবস্থাপনা',
      description: 'পরীক্ষার ফলাফল আপলোড ও প্রকাশ করুন',
      href: '/management/results',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      stats: '১০+ ক্লাস',
    },
  ];

  return (
    <ProtectedClient>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 rounded-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Settings className="text-white w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ডেলুটি মাধ্যমিক বিদ্যালয়ের সম্পূর্ণ ব্যবস্থাপনা সিস্টেম
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'মোট শিক্ষার্থী',
                icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
                bg: 'bg-blue-100',
              },
              {
                label: 'মোট শিক্ষক',
                icon: <Users className="w-6 h-6 text-green-600" />,
                bg: 'bg-green-100',
              },
              {
                label: 'ফলাফল ব্যবস্থাপনা',
                icon: <BookOpen className="w-6 h-6 text-purple-600" />,
                bg: 'bg-purple-100',
              },
              {
                label: 'আজকের উপস্থিতি',
                icon: <CheckCircle2 className="w-6 h-6 text-orange-600" />,
                bg: 'bg-orange-100',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center"
              >
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mr-4`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardCards.map((card, index) => (
              <Link key={index} href={card.href} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        {card.icon}
                      </div>
                      <span
                        className={`text-xs font-semibold ${card.textColor} bg-white px-2 py-1 rounded-full border`}
                      >
                        {card.stats}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-3 ${card.textColor} group-hover:translate-x-1 transition-transform duration-300`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${card.textColor} group-hover:underline`}
                      >
                        এক্সপ্লোর করুন
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 ${card.textColor} group-hover:translate-x-2 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/management/students')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl flex items-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              নতুন শিক্ষার্থী যোগ করুন
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/management/notices')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl flex items-center"
            >
              <Megaphone className="w-5 h-5 mr-2" />
              নোটিশ প্রকাশ করুন
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/management/staff')}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl flex items-center"
            >
              <UserCog className="w-5 h-5 mr-2" />
              স্টাফ ম্যানেজমেন্ট
            </motion.button>
          </div>
        </div>
      </motion.div>
    </ProtectedClient>
  );
}
