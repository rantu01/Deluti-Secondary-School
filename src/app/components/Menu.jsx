"use client";

import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Transition } from "@headlessui/react";
import {
  Home,
  Images,
  Award,
  Users,
  UserCog,
  Settings,
  ChevronDown,
  Menu as MenuIcon,
  X,
  BookOpen,
  BarChart3,
  School,
} from "lucide-react";
import Link from "next/link";

export default function EnhancedMenu() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      description: "Back to homepage",
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: Images,
      description: "Photo gallery & events",
    },
    {
      href: "/results",
      label: "Results",
      icon: Award,
      description: "Exam results & reports",
    },
    {
      href: "/students",
      label: "Students",
      icon: Users,
      description: "Student directory",
    },
    {
      href: "/teachers",
      label: "Staff",
      icon: UserCog,
      description: "Faculty & staff",
    },
  ];

  const managementItems = [
    { href: "/management", label: "Dashboard", icon: BarChart3 },
    { href: "/management/students", label: "Student Management", icon: Users },
    { href: "/management/teachers", label: "Staff Management", icon: UserCog },
    {
      href: "/management/academics",
      label: "Academic Settings",
      icon: BookOpen,
    },
    { href: "/management/school", label: "School Info", icon: School },
    { href: "/management/settings", label: "System Settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl mt-4 border border-white/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Main Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.href === "/" ? "_self" : "_blank"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 group relative"
                >
                  <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Management Dropdown for Logged-in Users */}
            {user && (
              <Menu as="div" className="relative ">
                <Menu.Button
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 hover:text-blue-800 font-medium cursor-pointer group"
                >
                  <Settings className="w-4 h-4" />
                  <span>
                    <Link href="/management">Management</Link>
                  </span>
                </Menu.Button>
              </Menu>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden mt-4">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20 px-6 py-4 flex items-center justify-between text-gray-700 font-medium"
        >
          <span className="flex items-center space-x-2">
            <MenuIcon className="w-5 h-5" />
            <span>Navigation Menu</span>
          </span>
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {/* Mobile Menu Items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 mt-2 overflow-hidden"
            >
              <div className="py-2">
                {/* Main Navigation Items */}
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target={item.href === "/" ? "_self" : "_blank"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </motion.a>
                ))}

                {/* Management Section for Logged-in Users */}
                {user && (
                  <Menu as="div" className="relative">
                    <Menu.Button
                      as={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 hover:text-blue-800 font-medium cursor-pointer group"
                    >
                      <Settings className="w-4 h-4" />
                      <span>
                        <Link href="/management">Management</Link>
                      </span>
                    </Menu.Button>
                  </Menu>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/40 z-40">
        <div className="flex items-center justify-around px-2 py-3">
          {navigationItems.slice(0, 4).map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              target={item.href === "/" ? "_self" : "_blank"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.a>
          ))}
          {user && (
            <Menu as="div" className="relative z-[9999]">
              <Menu.Button
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center space-y-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 transition-colors duration-200 z-[9999]"
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs font-medium">More</span>
              </Menu.Button>

              <Transition
                as={motion.div}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute bottom-full mb-2 right-0 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 py-2">
                  {navigationItems.slice(4).map((item) => (
                    <Menu.Item key={item.href}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          target="_blank"
                          className={`flex items-center space-x-3 w-full px-4 py-3 text-sm ${
                            active
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          } transition-colors duration-200`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                  {user &&
                    managementItems.slice(0, 3).map((item) => (
                      <Menu.Item key={item.href}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={`flex items-center space-x-3 w-full px-4 py-3 text-sm ${
                              active
                                ? "bg-purple-50 text-purple-700"
                                : "text-gray-700"
                            } transition-colors duration-200`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </nav>
    </>
  );
}
