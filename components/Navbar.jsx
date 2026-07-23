"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("system"); // "system" | "light" | "dark"
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme based on localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(systemPrefersDark ? "dark" : "light");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

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
      root.classList.remove("light", "dark"); // system relies on media query
    }
  };

  const toggleTheme = () => {
    const newTheme = document.documentElement.classList.contains("dark") || 
      (!document.documentElement.classList.contains("light") && window.matchMedia("(prefers-color-scheme: dark)").matches) 
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
          ? "bg-white/70 dark:bg-[#0a0f1c]/70 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-300 font-outfit">
              Shwetanshu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* CTA Button */}
            <Link
              href="#socials"
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-full font-medium shadow-sm hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-orange-500"
                aria-label="Toggle theme"
              >
                {theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 dark:text-slate-400 hover:text-orange-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-xl">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#socials"
                className="block mx-4 mt-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl text-center font-medium shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
