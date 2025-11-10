// components/NoticeSection.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Clock,
  AlertTriangle,
  Info,
  Megaphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(notices)

  // Fetch notices from API
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/notices');
      const sortedNotices = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotices(sortedNotices);
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    if (isPaused || notices.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, notices]);

  const nextNotice = () => setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
  const prevNotice = () => setCurrentNoticeIndex((prev) => (prev - 1 + notices.length) % notices.length);
  const goToNotice = (index) => setCurrentNoticeIndex(index);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'from-red-500 to-orange-500';
      case 'medium':
        return 'from-orange-500 to-yellow-500';
      case 'low':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-red-500 to-orange-500';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return Info;
      case 'low':
        return Megaphone;
      default:
        return Bell;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10 text-gray-500">
        Loading notices...
      </div>
    );
  }

  if (!notices.length) {
    return (
      <div className="flex justify-center items-center p-10 text-gray-500">
        No notices found.
      </div>
    );
  }

  const currentNotice = notices[currentNoticeIndex];
  const UrgencyIcon = getUrgencyIcon(currentNotice.urgency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div
        className={`bg-gradient-to-r ${getUrgencyColor(currentNotice.urgency)} mb-6 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 cursor-pointer`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg"
              >
                <UrgencyIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg inline-flex items-center space-x-1 mb-1"
                >
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>জরুরি নোটিশ</span>
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">গুরুত্বপূর্ণ ঘোষণা</h2>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={prevNotice}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex space-x-1">
                {notices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToNotice(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentNoticeIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={nextNotice}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Notice Content */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNotice._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Main Notice */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full mt-1 sm:mt-2"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{currentNotice.title}</h3>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-white/80 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(currentNotice.date).toLocaleDateString('bn-BD')}</span>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-2 sm:mb-4">{currentNotice.content}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 border border-white/30 text-sm sm:text-base"
                    >
                      {currentNotice.action}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Additional Notices Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {notices
                  .filter((_, index) => index !== currentNoticeIndex)
                  .slice(0, 2)
                  .map((notice) => {
                    const NoticeIcon = Bell; // Could map a type -> icon if you want
                    return (
                      <motion.div
                        key={notice._id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => goToNotice(notices.findIndex(n => n._id === notice._id))}
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 cursor-pointer transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <NoticeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                          <span className="text-white font-medium text-xs sm:text-sm line-clamp-2">{notice.title}</span>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <div className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-white/70 text-xs sm:text-sm space-y-1 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span>মোট নোটিশ: {notices.length}</span>
              <span>•</span>
              <span>সর্বশেষ আপডেট: আজ</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span>লাইভ আপডেট</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeSection;
