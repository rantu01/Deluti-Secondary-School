// app/page.jsx
import { AuthButtons } from "./components/AuthButtons";
import EnhancedFooter from "./components/EnhancedFooter";
import FeatureCards from "./components/FeatureCards";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoSections from "./components/InfoSections";
import Menu from "./components/Menu";
import NoticeSection from "./components/NoticeSection";
import QuickLinksSidebar from "./components/QuickLinksSidebar";
import "./globals.css";
import { AuthProvider } from "./lib/AuthContext";
import {School} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-amber-50 rounded-2xl p-4">
      <section className="space-y-8 max-w-6xl mx-auto px-4">
        {/* Header */}
        
        <header className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl flex justify-between items-center px-8 py-5 border border-white/30 transition-all duration-300 hover:shadow-2xl font-sans">
          {/* Left Side - Logo + Title */}
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-blue-600  rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <School className="w-8 h-8 text-white" />
              <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
            </div>

            <div>
              <h1 className="text-2xl md:text-2xl  text-black bg-clip-text  tracking-tight">
                Deluti Secondary School
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                দেলুটি মাধ্যমিক বিদ্যালয়
              </p>
            </div>
          </div>

          {/* Right Side - Auth Buttons */}
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

            <NoticeSection></NoticeSection>

            {/* Quick Links / Highlights */}

            <FeatureCards></FeatureCards>

            {/* Additional Sections */}

            <InfoSections></InfoSections>
          </div>

          {/* Sidebar */}

          <QuickLinksSidebar></QuickLinksSidebar>
        </div>
        {/* Footer */}
        <EnhancedFooter></EnhancedFooter>
      </section>
    </div>
  );
}
