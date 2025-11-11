// components/InfoSections.jsx
'use client';

import { motion } from 'framer-motion';
import {
  School,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Award,
  GraduationCap,
  Clock,
  Heart,
  ArrowRight
} from 'lucide-react';

const InfoSections = () => {
  const schoolStats = [
    { icon: Calendar, value: "২৫+", label: "বছরের অভিজ্ঞতা", description: "গর্বের শিক্ষাদান ইতিহাস" },
    { icon: Users, value: "৫০০+", label: "বর্তমান শিক্ষার্থী", description: "সক্রিয় ছাত্র-ছাত্রী" },
    { icon: Award, value: "৯৮%", label: "সাফল্যের হার", description: "বোর্ড পরীক্ষায়" },
    { icon: GraduationCap, value: "১৫+", label: "প্রশিক্ষিত শিক্ষক", description: "যোগ্যতাসম্পন্ন" }
  ];

  const contactInfo = [
    { icon: Phone, title: "+৮৮০ ১৭XX-XXXXXX", subtitle: "প্রধান শিক্ষক", description: "সকাল ৯:০০ - বিকাল ৪:০০", color: "blue", href: "tel:+88017XXXXXXXX" },
    { icon: MapPin, title: "দেলুটি, যশোর", subtitle: "খুলনা বিভাগ", description: "বাংলাদেশ", color: "purple", href: "https://maps.google.com" },
    { icon: Clock, title: "সময়সূচী", subtitle: "শনি - বৃহস্পতি", description: "সকাল ৯:০০ - বিকাল ৪:০০", color: "orange", href: "/schedule" }
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-600', icon: 'text-blue-500', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
      green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-600', icon: 'text-green-500', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
      purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'text-purple-600', icon: 'text-purple-500', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
      orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
    >
      {/* About School */}
      <motion.div variants={itemVariants} className="relative">
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden h-full flex flex-col">
          {/* Background Patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center mb-6 sm:mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 sm:p-3 mr-3 sm:mr-4">
                <School className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">আমাদের সম্পর্কে</h3>
                <div className="w-12 sm:w-16 h-1 bg-white/50 rounded-full"></div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              দেলুটি মাধ্যমিক বিদ্যালয় যশোর শিক্ষা বোর্ডের অধীনে একটি স্বনামধন্য শিক্ষাপ্রতিষ্ঠান। আমরা শিক্ষার্থীদের সার্বিক উন্নতি, নৈতিকতা ও দেশপ্রেমে উদ্বুদ্ধকরনের জন্য প্রতিশ্রুতিবদ্ধ।
            </motion.p>

            {/* Stats Grid */}
            <motion.div className="grid grid-cols-2 gap-3 sm:gap-4">
              {schoolStats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.05, y: -2 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center border border-white/20 transition-all duration-300 flex flex-col items-center">
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <div className="bg-white/20 rounded-xl p-1 sm:p-2 transition-transform duration-300">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/90 text-sm sm:text-base font-medium mb-1">{stat.label}</div>
                  <div className="text-white/70 text-xs sm:text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center mb-3 sm:mb-0 space-x-2 sm:space-x-3">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">গর্বের সাথে শিক্ষাদান</p>
                  <p className="text-white/70 text-xs sm:text-sm">১৯৯৯ সাল থেকে</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 hover:bg-blue-50 transition-colors duration-300">
                <span>আরও জানুন</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div variants={itemVariants} className="relative">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500 h-full flex flex-col">
          {/* Header */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-2 sm:p-3 mr-3 sm:mr-4">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 text-gray-800">যোগাযোগ</h3>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Contact Items */}
          <motion.div className="space-y-3 sm:space-y-4">
            {contactInfo.map((contact, index) => {
              const colorClasses = getColorClasses(contact.color);
              return (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 ${colorClasses.bg} ${colorClasses.hover} rounded-2xl border ${colorClasses.border} transition-all duration-300 group cursor-pointer`}
                >
                  <div className={`bg-white rounded-xl p-2 sm:p-3 mr-0 sm:mr-4 mb-2 sm:mb-0 flex-shrink-0 transition-transform duration-300`}>
                    <contact.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses.icon}`} />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <h4 className={`font-bold text-sm sm:text-base ${colorClasses.text} mb-0.5`}>{contact.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm font-medium mb-0.5">{contact.subtitle}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{contact.description}</p>
                      </div>
                      <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + 0.3 }} className={`${colorClasses.bg} ${colorClasses.text} px-2 py-1 rounded-full text-xs sm:text-sm font-bold ml-2 sm:ml-0`}>
                        ক্লিক করুন
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Additional Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 mb-1 sm:mb-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">দ্রুত সাড়া প্রদান</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">আমরা ২৪ ঘন্টার মধ্যে আপনার সকল প্রশ্নের উত্তর দেব</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoSections;
