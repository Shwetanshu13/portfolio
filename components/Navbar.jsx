"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(systemPrefersDark ? "dark" : "light");
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (newTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.remove("light", "dark");
    }
  };

  const toggleTheme = () => {
    const newTheme =
      document.documentElement.classList.contains("dark") ||
      (!document.documentElement.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "light"
        : "dark";

    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Blogs", href: "#blogs" },
    { name: "Socials", href: "#socials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F3EC]/80 dark:bg-[#161513]/80 backdrop-blur-xl shadow-sm border-b border-[#D8D2C8] dark:border-[#2E2B28]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold text-[#1F2320] dark:text-[#EDE8E0] group-hover:text-[#E8614A] transition-colors duration-300 font-outfit">
              Shwetanshu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#4A4F4B] dark:text-[#A89F94] hover:text-[#0F6B6B] dark:hover:text-[#1A8F8F] font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0F6B6B] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[#4A4F4B] dark:text-[#A89F94] hover:text-[#E8614A] dark:hover:text-[#E8614A] hover:bg-[#EDE8DF] dark:hover:bg-[#1E1B18] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            {/* CTA Button */}
            <Link
              href="#socials"
              className="bg-[#E8614A] text-white px-6 py-2 rounded-[9999px] font-semibold shadow-sm hover:shadow-lg hover:shadow-[#E8614A]/30 hover:bg-[#C94B35] transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[#4A4F4B] dark:text-[#A89F94] hover:text-[#E8614A]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4A4F4B] dark:text-[#A89F94] hover:text-[#E8614A] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-[#F7F3EC]/95 dark:bg-[#161513]/95 backdrop-blur-xl border-b border-[#D8D2C8] dark:border-[#2E2B28] shadow-xl"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-[#1F2320] dark:text-[#EDE8E0] hover:text-[#E8614A] hover:bg-[#EDE8DF] dark:hover:bg-[#1E1B18] rounded-[8px] font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#socials"
                  className="block mx-4 mt-6 bg-[#E8614A] text-white px-6 py-3 rounded-[12px] text-center font-semibold shadow-sm hover:bg-[#C94B35]"
                  onClick={() => setIsOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
