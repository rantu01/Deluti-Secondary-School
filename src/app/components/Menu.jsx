// app/components/Menu.jsx
'use client';

export default function Menu() {
  return (
    <nav className="bg-white shadow-md mt-4">
      <div className="container mx-auto flex justify-center space-x-8 py-4">
        <a href="/" className="hover:text-blue-600 font-medium">Home</a>
        <a href="/gallery" className="hover:text-blue-600 font-medium">gallery</a>
        <a href="/results" className="hover:text-blue-600 font-medium">results</a>
        <a href="/students" className="hover:text-blue-600 font-medium">students</a>
        <a href="/teachers" className="hover:text-blue-600 font-medium">teachers</a>
      </div>
    </nav>
  );
}
