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
