// app/layout.jsx
import "./globals.css";
import { AuthProvider } from "./lib/AuthContext";

export const metadata = {
  title: "Deluti Secondary School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-800 relative">
        {/* Particle Background Image */}
        <div className="particle-bg fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"></div>

        <div className="flex gap-8 min-h-screen">
          <main className="flex-1 p-4">
            <div className="max-w-6xl w-full mx-auto relative z-10">
              <AuthProvider>{children}</AuthProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}