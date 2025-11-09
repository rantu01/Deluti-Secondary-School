// components/QuickLinksSidebar.jsx
'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  BookOpen,
  Trophy,
  Bell,
  FileText,
  Download,
  School,
  Award,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

const QuickLinksSidebar = () => {
  const quickLinks = [
    { href: "/academic-calendar", label: "একাডেমিক ক্যালেন্ডার", icon: Calendar, color: "blue", description: "Academic schedule and events", badge: "Updated" },
    { href: "/teachers", label: "শিক্ষকবৃন্দ", icon: Users, color: "green", description: "Meet our faculty members", badge: "25 Teachers" },
    { href: "/syllabus", label: "পাঠ্যসূচি", icon: BookOpen, color: "purple", description: "Curriculum and course materials", badge: "2025" },
    { href: "/achievements", label: "অর্জন", icon: Trophy, color: "orange", description: "School achievements & awards", badge: "15+ Awards" },
    { href: "/notice-board", label: "নোটিশ বোর্ড", icon: Bell, color: "red", description: "Latest announcements", badge: "New" },
    { href: "/documents", label: "দাপ্তরিক ফর্ম", icon: FileText, color: "indigo", description: "Download official forms", badge: "PDF" },
    { href: "/admission", label: "ভর্তি তথ্য", icon: School, color: "teal", description: "Admission process & requirements", badge: "Open" },
    { href: "/results", label: "ফলাফল", icon: Award, color: "pink", description: "Exam results archive", badge: "Latest" }
  ];

  const contactInfo = [
    { icon: Clock, text: "সময়: সকাল ৯:০০ - বিকাল ৪:০০", subtext: "শনি - বৃহস্পতি", color: "blue" },
    { icon: MapPin, text: "ডেলুটি, জেসোর", subtext: "খুলনা বিভাগ", color: "green" },
    { icon: Phone, text: "+৮৮০ ১৭XX-XXXXXX", subtext: "প্রধান শিক্ষক", color: "purple" }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'group-hover:text-blue-600', icon: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'group-hover:text-green-600', icon: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'group-hover:text-purple-600', icon: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', text: 'group-hover:text-orange-600', icon: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', hover: 'hover:bg-red-100', text: 'group-hover:text-red-600', icon: 'text-red-600', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'group-hover:text-indigo-600', icon: 'text-indigo-600', border: 'border-indigo-200' },
      teal: { bg: 'bg-teal-50', hover: 'hover:bg-teal-100', text: 'group-hover:text-teal-600', icon: 'text-teal-600', border: 'border-teal-200' },
      pink: { bg: 'bg-pink-50', hover: 'hover:bg-pink-100', text: 'group-hover:text-pink-600', icon: 'text-pink-600', border: 'border-pink-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

  return (
    <div className="lg:w-80 w-full">
      <motion.aside 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-white/30 sticky top-6"
      >
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 sm:mb-8">
          <h2 className="font-bold text-xl sm:text-2xl mb-1 text-gray-800 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              দ্রুত লিংক
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">দ্রুত অ্যাক্সেস এবং গুরুত্বপূর্ণ তথ্য</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 sm:mt-3"></div>
        </motion.div>

        {/* Quick Links */}
        <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {quickLinks.map((link, index) => {
            const colorClasses = getColorClasses(link.color);
            return (
              <motion.li key={link.href} variants={itemVariants}>
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start sm:items-center p-3 sm:p-4 ${colorClasses.bg} ${colorClasses.hover} rounded-xl border ${colorClasses.border} transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex-shrink-0">
                    <link.icon className={`w-5 h-5 ${colorClasses.icon} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-sm sm:text-base text-gray-700 ${colorClasses.text} truncate`}>
                        {link.label}
                      </span>
                      {link.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${colorClasses.bg} ${colorClasses.text} font-medium ml-2 sm:ml-0`}>
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{link.description}</p>
                  </div>
                </motion.a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Contact Info */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
          <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-600" /> যোগাযোগ
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {contactInfo.map((info, idx) => {
              const colorClasses = getColorClasses(info.color);
              return (
                <motion.div key={idx} whileHover={{ x: 2 }} className={`flex items-center p-2 sm:p-3 ${colorClasses.bg} rounded-lg border ${colorClasses.border}`}>
                  <info.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClasses.icon} mr-3`} />
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-800">{info.text}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{info.subtext}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="p-4 sm:p-5 bg-green-50 rounded-2xl border border-green-200 text-center">
          <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">দাপ্তরিক ফর্ম</h4>
          <p className="text-gray-600 text-xs sm:text-sm mb-3">সমস্ত প্রয়োজনীয় ফর্ম ডাউনলোড করুন</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-medium py-2 rounded-xl transition-colors duration-200">
            ফর্ম ডাউনলোড
          </motion.button>
        </motion.div>
      </motion.aside>
    </div>
  );
};

export default QuickLinksSidebar;
