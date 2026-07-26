"use client";
// Interaction pattern: subtle vertical gradient editorial background + featured-first layout
// (first post full-width, large type) + title underline animates left-to-right on hover
// + read-time label fades in on hover (always visible on touch/mobile).

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BookOpen, AlertTriangle, Info, ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { typeScale, sectionBg } from "../../theme.js";

// ── Utility ───────────────────────────────────────────────────────────────────
const calcReadTime = (text) => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
};

// ── Featured (first) blog card ────────────────────────────────────────────────
const FeaturedBlogCard = ({ blog, isMobile }) => {
  const snippet = stripHtml(blog.contentSnippet);
  const readTime = calcReadTime(snippet);

  return (
    <Link
      href={blog.link}
      target="_blank"
      className={`group block relative bg-white/70 dark:bg-[#1A1714]/70 backdrop-blur-sm rounded-[20px] border border-[#D8D2C8] dark:border-[#2E2B28] overflow-hidden hover:border-[#E8614A]/50 hover:shadow-xl hover:shadow-[#E8614A]/8 transition-all duration-300 ${isMobile ? "touch-always" : ""}`}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-[#E8614A]" />

      <div className="p-8 md:p-10">
        {/* Meta row */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-10 bg-[#E8614A]/10 border border-[#E8614A]/25 rounded-[8px] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#E8614A]" />
          </div>
          <span className="text-sm text-[#7A8079] dark:text-[#6A6360] font-medium">
            {formatDate(blog.pubDate)}
          </span>
          <span
            className={`text-sm text-[#0F6B6B] dark:text-[#1A8F8F] font-medium transition-opacity duration-200 ${
              isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            · {readTime}
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-5 h-5 text-[#E8614A]" />
          </div>
        </div>

        {/* Title with left-to-right underline animation */}
        <h2 className="text-2xl md:text-3xl font-bold font-outfit text-[#1F2320] dark:text-[#EDE8E0] mb-4 leading-snug">
          <span className={`blog-title-underline ${isMobile ? "touch-always" : ""}`}>
            {blog.title}
          </span>
        </h2>

        {/* Excerpt */}
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] line-clamp-3 mb-6`}>
          {snippet || "Click to read the full article..."}
        </p>

        <div className="flex items-center gap-2 text-[#E8614A] font-semibold text-sm">
          <span className="relative">
            Read Article
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#E8614A] transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

// ── Regular blog card ─────────────────────────────────────────────────────────
const BlogCard = ({ blog, isMobile }) => {
  const snippet = stripHtml(blog.contentSnippet);
  const readTime = calcReadTime(snippet);

  return (
    <Link
      href={blog.link}
      target="_blank"
      className={`group block relative h-full bg-white/60 dark:bg-[#1A1714]/60 backdrop-blur-sm rounded-[20px] border border-[#D8D2C8] dark:border-[#2E2B28] overflow-hidden hover:border-[#0F6B6B]/40 hover:shadow-lg hover:shadow-[#0F6B6B]/8 transition-all duration-300 flex flex-col ${isMobile ? "touch-always" : ""}`}
    >
      <div className="h-0.5 w-full bg-[#0F6B6B]/40 group-hover:bg-[#0F6B6B] transition-colors duration-300" />

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-[#0F6B6B]/10 border border-[#0F6B6B]/20 rounded-[8px] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-[#0F6B6B] dark:text-[#1A8F8F]" />
          </div>
          <span className="text-sm text-[#7A8079] dark:text-[#6A6360] font-medium">
            {formatDate(blog.pubDate)}
          </span>
          <span
            className={`text-sm text-[#0F6B6B] dark:text-[#1A8F8F] font-medium transition-opacity duration-200 ${
              isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            · {readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold font-outfit text-[#1F2320] dark:text-[#EDE8E0] mb-3 line-clamp-2">
          <span className={`blog-title-underline ${isMobile ? "touch-always" : ""}`}>
            {blog.title}
          </span>
        </h3>

        <p className={`${typeScale.small} text-[#4A4F4B] dark:text-[#A89F94] line-clamp-3 mb-4 flex-grow`}>
          {snippet || "Click to read the full article..."}
        </p>

        <div className="flex items-center gap-2 text-[#0F6B6B] dark:text-[#1A8F8F] font-medium text-sm mt-auto">
          <span className="relative">
            Read Article
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#0F6B6B] transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

// ── BlogsSection ──────────────────────────────────────────────────────────────
const BlogsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs);
          if (data.fallback) {
            setStatus({ type: "warning", message: "Showing fallback content. RSS feed temporarily unavailable." });
          } else if (data.cached && data.warning) {
            setStatus({ type: "info", message: "Using cached data due to fetch error" });
          }
        } else {
          setError(data.error || "Failed to load blogs");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E8614A]" />
          <span className="text-lg text-[#4A4F4B] dark:text-[#A89F94]">Loading blogs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-[20px] p-6 max-w-md mx-auto">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 dark:text-red-400 font-medium">Failed to load blogs</p>
          <p className="text-red-600 dark:text-red-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div className={`rounded-[20px] p-8 md:p-12 space-y-12 ${sectionBg.blogs}`}>
      {/* Section header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Latest Blogs
        </h1>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          Sharing my thoughts, experiences, and learnings about web development,
          system design, and technology trends.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />

        {status?.message && (
          <div
            className={`mt-6 max-w-2xl mx-auto p-3 rounded-[8px] text-sm ${
              status.type === "warning"
                ? "bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400"
                : "bg-[#0F6B6B]/8 border border-[#0F6B6B]/20 text-[#0F6B6B] dark:text-[#1A8F8F]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {status.type === "warning" ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
              {status.message}
            </div>
          </div>
        )}
      </motion.div>

      {/* Blog layout: featured-first */}
      {blogs.length > 0 ? (
        <div className="space-y-6">
          {/* Featured — full width */}
          {featured && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <FeaturedBlogCard blog={featured} isMobile={isMobile} />
            </motion.div>
          )}

          {/* Remaining blogs — 2-column grid */}
          {rest.length > 0 && (
            <div className={`grid gap-6 ${rest.length === 1 ? "grid-cols-1 max-w-xl mx-auto" : "grid-cols-1 sm:grid-cols-2"}`}>
              {rest.map((blog, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : i * 0.1 + 0.15, duration: 0.5 }}
                >
                  <BlogCard blog={blog} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/70 dark:bg-[#1A1714]/70 border border-[#D8D2C8] dark:border-[#2E2B28] rounded-[20px] p-8 max-w-md mx-auto shadow-sm">
            <BookOpen className="w-16 h-16 text-[#7A8079] dark:text-[#6A6360] mx-auto mb-4" />
            <p className="text-[#1F2320] dark:text-[#EDE8E0] font-medium">No blogs available</p>
            <p className="text-[#4A4F4B] dark:text-[#A89F94] text-sm mt-1">Check back later for new content</p>
          </div>
        </div>
      )}

      {/* View All */}
      {blogs.length > 0 && (
        <div className="text-center">
          <Link
            href="https://shwetanshucodes.hashnode.dev"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/70 dark:bg-[#1A1714]/70 backdrop-blur-md border border-[#D8D2C8] dark:border-[#2E2B28] text-[#1F2320] dark:text-[#EDE8E0] rounded-[9999px] font-semibold hover:border-[#E8614A] hover:text-[#E8614A] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#E8614A]/10 transform hover:-translate-y-0.5 group"
          >
            <BookOpen className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Read All Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogsSection;
