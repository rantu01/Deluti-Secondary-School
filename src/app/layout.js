// app/layout.jsx
import './globals.css';
import Hero from './components/Hero';
import Menu from './components/Menu';

export const metadata = {
  title: 'Deluti Secondary School',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white shadow-md flex justify-between items-center px-8 py-4">
          <div className="text-xl font-bold">Deluti Secondary School</div>
          <a
            href="/auth"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </a>
        </header>

        {/* Hero */}
        <Hero />

        {/* Menu */}
        <Menu />

        {/* Main content + Sidebar */}
        <div className="container mx-auto flex gap-8 py-8">
          <main className="flex-1">{children}</main>
          <aside className="w-72 bg-white p-6 rounded-xl shadow-md border">
            <h2 className="font-bold text-xl mb-4 text-gray-800">দ্রুত লিংক</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition"
                >
                  <span className="mr-2">📋</span> একাডেমিক ক্যালেন্ডার
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded transition"
                >
                  <span className="mr-2">👨‍🏫</span> শিক্ষকবৃন্দ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded transition"
                >
                  <span className="mr-2">📚</span> পাঠ্যসূচি
                </a>
              </li>
            </ul>
          </aside>
        </div>

        {/* Footer */}
        <footer className="bg-gray-200 text-center p-4 mt-8">
          © 2025 Deluti Secondary School. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
