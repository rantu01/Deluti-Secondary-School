"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FiBell,
  FiSearch,
  FiMessageSquare,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHome,
  FiBook,
  FiUsers,
  FiAward,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { School, Calendar, BarChart3, Mail, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: FiHome, label: "Home", active: true },
    { icon: FiBook, label: "Academics" },
    { icon: FiUsers, label: "Students" },
    { icon: FiAward, label: "Results" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Calendar, label: "Calendar" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 max-w-6xl mx-auto ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40"
          : "bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-white/30"
      }`}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <School className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </motion.div>

            <div className="space-y-0.5 sm:space-y-1">
              <motion.h1
                className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Deluti Secondary School
              </motion.h1>
              <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                <p className="text-gray-600 font-medium">Jessore Board</p>
                <div className="flex items-center space-x-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-[11px] sm:text-xs">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search (hidden on mobile) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center space-x-2 bg-gray-50/80 rounded-xl px-3 py-2 border border-gray-200/50"
            >
              <FiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-28 lg:w-44 placeholder-gray-400"
              />
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Notifications */}
            <Menu as="div" className="relative hidden sm:block">
              <Menu.Button as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
              >
                <FiBell className="w-5 h-5" />
                {hasNotifications && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                  />
                )}
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="p-4 text-center text-gray-500">
                    No new notifications
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Profile */}
            <Menu as="div" className="relative hidden sm:block">
              <Menu.Button as={motion.div}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-3 py-2 border border-blue-100/50 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 py-2">
                  {[
                    { icon: FiUser, label: "Profile" },
                    { icon: FiSettings, label: "Settings" },
                    { icon: Mail, label: "Messages" },
                  ].map((item) => (
                    <Menu.Item key={item.label}>
                      {({ active }) => (
                        <button
                          className={`flex items-center space-x-3 w-full px-4 py-2 text-sm ${
                            active
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                  <div className="border-t border-gray-100 my-1" />
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-sm ${
                          active
                            ? "bg-red-50 text-red-700"
                            : "text-red-600"
                        }`}
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl lg:hidden"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2 px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="border-t border-gray-200 my-2" />
              <button className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <FiLogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
    