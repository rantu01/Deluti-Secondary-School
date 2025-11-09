'use client';
import Link from 'next/link';
import ProtectedClient from '../components/ProtectedClient';
import { useRouter } from 'next/navigation';

export default function ManagementDashboard() {
  const router = useRouter();

  const dashboardCards = [
    {
      title: "ছাত্র-ছাত্রী ব্যবস্থাপনা",
      description: "ছাত্র-ছাত্রীদের তথ্য যোগ, সম্পাদনা ও দেখুন",
      href: "/management/students",
      icon: "🎓",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      stats: "৫০০+ শিক্ষার্থী"
    },
    {
      title: "শিক্ষক ব্যবস্থাপনা",
      description: "শিক্ষকদের তথ্য ও ক্লাস রুটিন ব্যবস্থাপনা",
      href: "/management/teachers",
      icon: "👨‍🏫",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      stats: "২৫+ শিক্ষক"
    },
    {
      title: "ফলাফল ব্যবস্থাপনা",
      description: "পরীক্ষার ফলাফল আপলোড ও প্রকাশ করুন",
      href: "/management/results",
      icon: "📊",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      stats: "১০+ ক্লাস"
    },
    
  ];

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl text-white">⚙️</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ডেলুটি মাধ্যমিক বিদ্যালয়ের সম্পূর্ণ ব্যবস্থাপনা সিস্টেম
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-blue-600">🎓</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">মোট শিক্ষার্থী</p>
                  <p className="text-2xl font-bold text-gray-800">৫২৪</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-green-600">👨‍🏫</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">মোট শিক্ষক</p>
                  <p className="text-2xl font-bold text-gray-800">২৮</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-purple-600">📊</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">সক্রিয় ক্লাস</p>
                  <p className="text-2xl font-bold text-gray-800">১২</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-orange-600">✅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">আজকের উপস্থিতি</p>
                  <p className="text-2xl font-bold text-gray-800">৯২%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardCards.map((card, index) => (
              <Link
                key={index}
                href={card.href}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold ${card.textColor} bg-white px-2 py-1 rounded-full border`}>
                          {card.stats}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${card.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${card.textColor} group-hover:underline`}>
                        এক্সপ্লোর করুন
                      </span>
                      <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => router.push('/management/students/add')}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="mr-2">➕</span>
              নতুন শিক্ষার্থী যোগ করুন
            </button>
            <button 
              onClick={() => router.push('/management/notices/add')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="mr-2">📢</span>
              নোটিশ প্রকাশ করুন
            </button>
            <button 
              onClick={() => router.push('/management/results/upload')}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="mr-2">📤</span>
              ফলাফল আপলোড করুন
            </button>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}