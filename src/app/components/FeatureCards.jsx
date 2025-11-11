// components/FeatureCards.jsx
'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Award,
  Images,
  Users,
  Calendar,
  FileText,
  ArrowRight,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: BookOpen,
      title: "ভর্তি প্রক্রিয়া",
      description: "নতুন শিক্ষাবর্ষের ভর্তির জন্য অনলাইনে আবেদন করুন এবং প্রয়োজনীয় তথ্য সংগ্রহ করুন। সম্পূর্ণ অনলাইন প্রক্রিয়া সহজ ও দ্রুত।",
      color: "blue",
      stats: "৫০০+ নতুন ভর্তি",
      duration: "২ মিনিট",
      link: "আরও জানুন",
      href: "/admission",
      features: ["অনলাইন আবেদন", "ডিজিটাল পেমেন্ট", "দ্রুত নিশ্চিতকরণ"]
    },
    {
      icon: Award,
      title: "অনলাইন ফলাফল",
      description: "ছাত্র-ছাত্রীদের পরীক্ষার ফলাফল অনলাইনে দেখুন এবং ডাউনলোড করুন। বাস্তব সময়ে আপডেট ও সুরক্ষিত ফলাফল ব্যবস্থা।",
      color: "green",
      stats: "৯৮% সাফল্য",
      duration: "তাত্ক্ষণিক",
      link: "ফলাফল দেখুন",
      href: "/results",
      features: ["লাইভ আপডেট", "ডিজিটাল মার্কশিট", "বিশ্লেষণ রিপোর্ট"]
    },
    {
      icon: Images,
      title: "গ্যালারি",
      description: "বিদ্যালয়ের বিভিন্ন অনুষ্ঠান, ক্রীড়া ও সাংস্কৃতিক ছবি দেখুন। আমাদের স্মরণীয় মুহূর্তগুলির ডিজিটাল সংগ্রহ।",
      color: "purple",
      stats: "১০০০+ ছবি",
      duration: "২৪/৭ এক্সেস",
      link: "গ্যালারি দেখুন",
      href: "/gallery",
      features: ["হাই-রেজোলিউশন", "ক্যাটাগরি ভিত্তিক", "সামাজিক শেয়ার"]
    },
    {
      icon: Users,
      title: "শিক্ষকবৃন্দ",
      description: "আমাদের অভিজ্ঞ ও প্রশিক্ষিত শিক্ষকমণ্ডলীর সাথে পরিচিত হোন। তাদের Qualifications ও Expertise সম্পর্কে জানুন।",
      color: "orange",
      stats: "২৫+ শিক্ষক",
      duration: "সর্বোচ্চ ",
      link: "শিক্ষকবৃন্দ দেখুন",
      href: "/teachers",
      features: ["প্রোফাইল ভিউ", "বিষয় বিশেষজ্ঞ", "অভিজ্ঞতা"]
    },
    {
      icon: Calendar,
      title: "একাডেমিক ক্যালেন্ডার",
      description: "সম্পূর্ণ শিক্ষাবর্ষের গুরুত্বপূর্ণ তারিখ, পরীক্ষার সময়সূচী ও ছুটির তালিকা দেখুন। Never miss an important date.",
      color: "red",
      stats: "সম্পূর্ণ বছরের",
      duration: "রিয়েল-টাইম আপডেট",
      link: "ক্যালেন্ডার দেখুন",
      href: "/calendar",
      features: ["ইভেন্ট রিমাইন্ডার", "ডাউনলোডযোগ্য", "মোবাইল সিঙ্ক"]
    },
    {
      icon: FileText,
      title: "দাপ্তরিক ফর্ম",
      description: "সমস্ত প্রয়োজনীয় দাপ্তরিক ফর্ম অনলাইনে পূরণ করুন ও ডাউনলোড করুন। Save time with our digital form system.",
      color: "indigo",
      stats: "২০+ ফর্ম",
      duration: "ডিজিটাল সাইন",
      link: "ফর্ম ডাউনলোড",
      href: "/forms",
      features: ["PDF ফরম্যাট", "অটো-সেভ", "ই-সাইনচার"]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'text-blue-600', hoverText: 'hover:text-blue-700', border: 'border-blue-200', button: 'text-blue-600' },
      green: { gradient: 'from-green-500 to-green-600', light: 'bg-green-50', text: 'text-green-600', hoverText: 'hover:text-green-700', border: 'border-green-200', button: 'text-green-600' },
      purple: { gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', text: 'text-purple-600', hoverText: 'hover:text-purple-700', border: 'border-purple-200', button: 'text-purple-600' },
      orange: { gradient: 'from-orange-500 to-orange-600', light: 'bg-orange-50', text: 'text-orange-600', hoverText: 'hover:text-orange-700', border: 'border-orange-200', button: 'text-orange-600' },
      red: { gradient: 'from-red-500 to-red-600', light: 'bg-red-50', text: 'text-red-600', hoverText: 'hover:text-red-700', border: 'border-red-200', button: 'text-red-600' },
      indigo: { gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-600', hoverText: 'hover:text-indigo-700', border: 'border-indigo-200', button: 'text-indigo-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
    >
      {features.map((feature, index) => {
        const colorClasses = getColorClasses(feature.color);
        const IconComponent = feature.icon;

        return (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative flex flex-col h-full"
          >
            <div className={`bg-white rounded-2xl shadow-lg border ${colorClasses.border} flex flex-col overflow-hidden h-full transition-all duration-300`}>
              
              {/* Header */}
              <div className="p-4 sm:p-6 flex items-start justify-between mb-2 sm:mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colorClasses.gradient} rounded-xl flex items-center justify-center shadow-md sm:shadow-lg transition-all duration-300`}
                >
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <motion.div className={`${colorClasses.light} ${colorClasses.text} px-2 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1`}>
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span>{feature.stats}</span>
                </motion.div>
              </div>

              {/* Title & Description */}
              <div className="px-4 sm:px-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{feature.description}</p>

                {/* Features List */}
                {/* <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500 text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{feature.duration}</span>
                </div>
                <motion.a
                  href={feature.href}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${colorClasses.button} font-bold text-sm sm:text-base hover:${colorClasses.hoverText} flex items-center`}
                >
                  {feature.link} <ArrowRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </div>

            {/* Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FeatureCards;
