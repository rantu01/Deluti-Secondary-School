// app/page.jsx
export default function HomePage() {
  return (
    <section className="space-y-8">
      {/* Hero/Header - Improved */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">ডেলুটি মাধ্যমিক বিদ্যালয়ে স্বাগতম</h1>
        <p className="text-xl mb-6">জেসোর বোর্ডের অধীনে শিক্ষার ক্ষেত্রে উৎকর্ষ</p>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow">
            ভর্তি সম্পর্কিত তথ্য
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            অনলাইন ফলাফল
          </button>
        </div>
      </div>

      {/* Important Notice Section */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
        <div className="flex items-center mb-3">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
            জরুরি নোটিশ
          </span>
          <h2 className="text-2xl font-bold text-red-700">গুরুত্বপূর্ণ ঘোষণা</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
            <p className="text-gray-700">বার্ষিক পরীক্ষার সময়সূচী প্রকাশিত হয়েছে।</p>
          </div>
          <div className="flex items-start">
            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
            <p className="text-gray-700">বিদ্যালয় ১৫ই জানুয়ারি পুনরায় খুলবে।</p>
          </div>
          <div className="flex items-start">
            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
            <p className="text-gray-700">এই সেশনে নতুন শিক্ষকগণ যোগদান করেছেন।</p>
          </div>
        </div>
      </div>

      {/* Quick Links / Highlights - Improved */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-xl border-t-4 border-blue-500 hover:shadow-xl transition hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold">📝</span>
          </div>
          <h3 className="font-bold text-xl mb-2">ভর্তি প্রক্রিয়া</h3>
          <p className="text-gray-600 mb-4">নতুন ভর্তির জন্য অনলাইনে আবেদন করুন।</p>
          <button className="text-blue-600 font-semibold hover:underline">আরও জানুন →</button>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl border-t-4 border-green-500 hover:shadow-xl transition hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-green-600 font-bold">📊</span>
          </div>
          <h3 className="font-bold text-xl mb-2">অনলাইন ফলাফল</h3>
          <p className="text-gray-600 mb-4">ছাত্র-ছাত্রীদের ফলাফল অনলাইনে দেখুন।</p>
          <button className="text-green-600 font-semibold hover:underline">ফলাফল দেখুন →</button>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl border-t-4 border-purple-500 hover:shadow-xl transition hover:-translate-y-1">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-purple-600 font-bold">📷</span>
          </div>
          <h3 className="font-bold text-xl mb-2">গ্যালারি</h3>
          <p className="text-gray-600 mb-4">বিদ্যালয়ের বিভিন্ন অনুষ্ঠানের ছবি দেখুন।</p>
          <button className="text-purple-600 font-semibold hover:underline">গ্যালারি দেখুন →</button>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* School Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4 text-gray-800">আমাদের সম্পর্কে</h3>
          <p className="text-gray-600">
            ডেলুটি মাধ্যমিক বিদ্যালয় জেসোর শিক্ষা বোর্ডের অধীনে একটি স্বনামধন্য শিক্ষাপ্রতিষ্ঠান। 
            আমরা শিক্ষার্থীদের সার্বিক উন্নতির জন্য প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4 text-gray-800">যোগাযোগ</h3>
          <div className="space-y-2 text-gray-600">
            <p>📞 +880 XXXX-XXXXXX</p>
            <p>📧 info@delutischool.edu.bd</p>
            <p>📍 Deluti, jessore, বাংলাদেশ</p>
          </div>
        </div>
      </div>
    </section>
  );
}