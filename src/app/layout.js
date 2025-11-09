// app/layout.jsx
import './globals.css';
import { AuthProvider } from './lib/AuthContext';

export const metadata = {
  title: 'Deluti Secondary School',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 ">
        {/* Header */}
        

        
        {/* Main content + Sidebar */}
        <div className="container mx-auto flex gap-8">
          <main className="flex-1"> <AuthProvider>{children}</AuthProvider> </main>
          
        </div>

      </body>
    </html>
  );
}
