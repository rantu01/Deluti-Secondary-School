// app/auth/layout.jsx
import '../../globals.css';

export const metadata = {
  title: 'Login - Deluti Secondary School',
};

export default function AuthLayout({ children }) {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
