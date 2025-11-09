// components/EnhancedFooter.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  School,
  BookOpen,
  Users,
  Award,
  Calendar,
  Download,
  ArrowUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

const EnhancedFooter = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerSections = [
    {
      title: "ডেলুটি মাধ্যমিক বিদ্যালয়",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">ডেলুটি মাধ্যমিক বিদ্যালয়</h3>
              <p className="text-blue-200 text-sm">জেসোর শিক্ষা বোর্ড</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            শিক্ষা, শৃঙ্খলা, দেশপ্রেম - আমাদের মূলমন্ত্র। আমরা শিক্ষার্থীদের সার্বিক উন্নতি, নৈতিকতা ও দেশপ্রেমে উদ্বুদ্ধ করতে প্রতিশ্রুতিবদ্ধ।
          </p>
          <div className="flex items-center space-x-2 text-blue-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">এখনই ভর্তি চলছে</span>
          </div>
        </div>
      )
    },
    {
      title: "দ্রুত লিংক",
      content: (
        <ul className="space-y-3">
          {[
            { icon: BookOpen, label: "একাডেমিক তথ্য", href: "/academics" },
            { icon: Users, label: "শিক্ষকবৃন্দ", href: "/teachers" },
            { icon: Award, label: "ফলাফল", href: "/results" },
            { icon: Calendar, label: "ক্যালেন্ডার", href: "/calendar" },
            { icon: Download, label: "ভর্তি ফর্ম", href: "/admission" }
          ].map(link => (
            <motion.li key={link.href} whileHover={{ x: 5 }}>
              <a
                href={link.href}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 py-2"
              >
                <link.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="font-medium">{link.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      )
    },
    {
      title: "যোগাযোগ",
      content: (
        <ul className="space-y-4">
          {[
            { icon: MapPin, text: "ডেলুটি, জেসোর, বাংলাদেশ", subtext: "খুলনা বিভাগ", color: "text-green-400" },
            { icon: Phone, text: "+৮৮০ ১৭XX-XXXXXX", subtext: "প্রধান শিক্ষক", color: "text-blue-400" },
            { icon: Mail, text: "info@delutischool.edu.bd", subtext: "ইমেইল", color: "text-purple-400" }
          ].map((contact, idx) => (
            <motion.li key={idx} whileHover={{ x: 3 }} className="flex items-start space-x-3">
              <contact.icon className={`w-5 h-5 mt-1 ${contact.color}`} />
              <div>
                <p className="text-white font-medium">{contact.text}</p>
                <p className="text-gray-400 text-sm">{contact.subtext}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )
    },
    {
      title: "সংযুক্ত হোন",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 mb-4">আমাদের সামাজিক মাধ্যমে সংযুক্ত থাকুন এবং সর্বশেষ আপডেট পান।</p>
          <div className="flex space-x-3">
            {[
              { icon: Facebook, href: "#", color: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
              { icon: Twitter, href: "#", color: "bg-sky-500 hover:bg-sky-600", label: "Twitter" },
              { icon: Instagram, href: "#", color: "bg-pink-600 hover:bg-pink-700", label: "Instagram" },
              { icon: Youtube, href: "#", color: "bg-red-600 hover:bg-red-700", label: "YouTube" }
            ].map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${social.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.a>
            ))}
          </div>
        </div>
      )
    }
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl mx-4 mb-4 overflow-hidden"
      >
        {/* Decorative Top Border */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1 w-full"></div>

        <div className="p-8 lg:p-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {footerSections.map((section, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-6">
                <h3 className="font-bold text-xl text-white border-b-2 border-blue-500 pb-2 inline-block">
                  {section.title}
                </h3>
                {section.content}
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
          >
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>গর্বে তৈরি বাংলাদেশে</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span>শিক্ষা মন্ত্রণালয় অনুমোদিত</span>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-gray-400 flex flex-col sm:flex-row items-center justify-center lg:justify-end space-x-0 sm:space-x-2">
                <span>© {currentYear} ডেলুটি মাধ্যমিক বিদ্যালয়</span>
                <span className="hidden sm:inline">•</span>
                <span>সকল অধিকার সংরক্ষিত</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">Developed with ❤️ for better education</p>
            </div>
          </motion.div>
        </div>

        {/* Wave Decoration */}
        <div className="relative h-4 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -translate-y-1/2"></div>
        </div>
      </motion.footer>
    </>
  );
};

export default EnhancedFooter;
