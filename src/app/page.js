// app/page.jsx
import { AuthButtons } from "./components/AuthButtons";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import "./globals.css";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="space-y-8 max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl mt-4 flex justify-between items-center px-8 py-5 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Deluti Secondary School
              </h1>
              <p className="text-sm text-gray-600">Jessore Education Board</p>
            </div>
          </div>
          
          {/* Auth buttons */}
          <AuthButtons />
        </header>

        {/* Hero Section */}
        <Hero />

        {/* Menu */}
        <Menu />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Important Notice Section */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-2xl mb-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold mr-4 shadow-lg">
                    🔔 জরুরি নোটিশ
                  </div>
                  <h2 className="text-3xl font-bold text-white">গুরুত্বপূর্ণ ঘোষণা</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 animate-pulse"></div>
                    <p className="text-white text-lg font-medium">বার্ষিক পরীক্ষার সময়সূচী প্রকাশিত হয়েছে</p>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 animate-pulse"></div>
                    <p className="text-white text-lg font-medium">বিদ্যালয় ১৫ই জানুয়ারি পুনরায় খুলবে</p>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 animate-pulse"></div>
                    <p className="text-white text-lg font-medium">এই সেশনে নতুন শিক্ষকগণ যোগদান করেছেন</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links / Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📝</span>
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-800">ভর্তি প্রক্রিয়া</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  নতুন শিক্ষাবর্ষের ভর্তির জন্য অনলাইনে আবেদন করুন এবং প্রয়োজনীয় তথ্য সংগ্রহ করুন।
                </p>
                <button className="text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors duration-300 flex items-center group-hover:translate-x-2 transition-transform">
                  আরও জানুন 
                  <span className="ml-2 text-xl">→</span>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-800">অনলাইন ফলাফল</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ছাত্র-ছাত্রীদের পরীক্ষার ফলাফল অনলাইনে দেখুন এবং ডাউনলোড করুন।
                </p>
                <button className="text-green-600 font-bold text-lg hover:text-green-800 transition-colors duration-300 flex items-center group-hover:translate-x-2 transition-transform">
                  ফলাফল দেখুন
                  <span className="ml-2 text-xl">→</span>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📷</span>
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-800">গ্যালারি</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  বিদ্যালয়ের বিভিন্ন অনুষ্ঠান, ক্রীড়া ও সাংস্কৃতিক活动的 ছবি দেখুন।
                </p>
                <button className="text-purple-600 font-bold text-lg hover:text-purple-800 transition-colors duration-300 flex items-center group-hover:translate-x-2 transition-transform">
                  গ্যালারি দেখুন
                  <span className="ml-2 text-xl">→</span>
                </button>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* School Info */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
                <h3 className="font-bold text-2xl mb-6 flex items-center">
                  <span className="mr-3">🏫</span>
                  আমাদের সম্পর্কে
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  ডেলুটি মাধ্যমিক বিদ্যালয় জেসোর শিক্ষা বোর্ডের অধীনে একটি স্বনামধন্য শিক্ষাপ্রতিষ্ঠান। 
                  আমরা শিক্ষার্থীদের সার্বিক উন্নতি, নৈতিকতা ও দেশপ্রেমে উদ্বুদ্ধকরনের জন্য প্রতিশ্রুতিবদ্ধ।
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">২৫+</div>
                    <div className="text-sm">বছরের অভিজ্ঞতা</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">৫০০+</div>
                    <div className="text-sm">বর্তমান শিক্ষার্থী</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <span className="mr-3">📞</span>
                  যোগাযোগ
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <span className="text-2xl mr-4">📞</span>
                    <div>
                      <div className="font-semibold">+৮৮০ ১৭XX-XXXXXX</div>
                      <div className="text-sm text-gray-600">প্রধান শিক্ষক</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <span className="text-2xl mr-4">📧</span>
                    <div>
                      <div className="font-semibold">info@delutischool.edu.bd</div>
                      <div className="text-sm text-gray-600">ইমেইল</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <div className="font-semibold">ডেলুটি, জেসোর</div>
                      <div className="text-sm text-gray-600">বাংলাদেশ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <aside className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 sticky top-8">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b-2 border-blue-500 pb-3">
                দ্রুত লিংক
              </h2>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 group">
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">📋</span>
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">একাডেমিক ক্যালেন্ডার</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group">
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">👨‍🏫</span>
                    <span className="font-semibold text-gray-700 group-hover:text-green-600 transition-colors">শিক্ষকবৃন্দ</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 group">
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">📚</span>
                    <span className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">পাঠ্যসূচি</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 group">
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">🏆</span>
                    <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">অর্জন</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 group">
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">📰</span>
                    <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">নোটিশ বোর্ড</span>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl mt-12 p-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">ডেলুটি মাধ্যমিক বিদ্যালয়</h3>
              <p className="text-gray-300">
                শিক্ষা, শৃঙ্খলা, দেশপ্রেম - এই是我们的 মূলমন্ত্র
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">হোম</a></li>
                <li><a href="#" className="hover:text-white transition-colors">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ভর্তি তথ্য</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">যোগাযোগ</h4>
              <ul className="space-y-2 text-gray-300">
                <li>ডেলুটি, জেসোর</li>
                <li>+৮৮০ XXXX-XXXXXX</li>
                <li>info@delutischool.edu.bd</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">অনুসরণ করুন</h4>
              <div className="flex space-x-4">
                <button className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">f</button>
                <button className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">in</button>
                <button className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">ig</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© ২০২৫ ডেলুটি মাধ্যমিক বিদ্যালয়। সকল অধিকার সংরক্ষিত।</p>
          </div>
        </footer>
      </section>
    </div>
  );
}