"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { BookOpen, AlertTriangle, Info, ArrowRight, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const BlogsCarousel = ({ blogs, formatDate, stripHtml }) => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  return (
    <div className="relative">
      {/* Fading edges for scroll hint */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 no-scrollbar px-4"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[400px]"
          >
            <Link
              href={blog.link}
              target="_blank"
              className="group block relative h-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden border border-stone-200 dark:border-white/10 hover:border-teal-500/50 transform hover:-translate-y-1 flex flex-col"
            >
              {/* Subtle top gradient accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-rose-400 opacity-70 group-hover:opacity-100 transition-opacity" />
              
              {/* Blog header */}
              <div className="p-6 pb-4 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-stone-100 dark:bg-slate-900/50 border border-stone-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-colors duration-300 shadow-sm shrink-0">
                    <BookOpen className="w-5 h-5 text-stone-400 dark:text-slate-400 group-hover:text-teal-500 transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-500 dark:text-slate-400 font-medium truncate">
                      {formatDate(blog.pubDate)}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
                    <ExternalLink className="w-5 h-5 text-teal-500" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-stone-800 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-teal-500 transition-colors duration-200">
                  {blog.title}
                </h2>
              </div>

              {/* Blog content */}
              <div className="px-6 pb-6 relative z-10 flex-grow flex flex-col justify-end">
                <p className="text-stone-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {blog.contentSnippet
                    ? stripHtml(blog.contentSnippet)
                    : "Click to read the full article..."}
                </p>

                {/* Read more indicator */}
                <div className="flex items-center gap-2 mt-auto text-teal-600 dark:text-teal-400 font-medium text-sm transition-all duration-200">
                  <span className="relative">
                    Read Article
                    <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="max-w-xs mx-auto mt-4 h-1 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-teal-500"
          style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
        />
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const getBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (data.success) {
        setBlogs(data.blogs);

        if (data.fallback) {
          setStatus({
            type: "warning",
            message: "Showing fallback content. RSS feed temporarily unavailable.",
          });
        } else if (data.cached) {
          setStatus({
            type: "info",
            message: data.warning ? "Using cached data due to fetch error" : null,
          });
        }
      } else {
        setError(data.error || "Failed to load blogs");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          <span className="text-lg text-stone-500 dark:text-slate-400">
            Loading blogs...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 dark:text-red-400 font-medium">
            Failed to load blogs
          </p>
          <p className="text-red-600 dark:text-red-500 text-sm mt-1">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Latest Blogs
        </h1>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          Sharing my thoughts, experiences, and learnings about web development,
          system design, and technology trends.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>

        {/* Status message */}
        {status && status.message && (
          <div
            className={`mt-6 max-w-2xl mx-auto p-3 rounded-lg text-sm backdrop-blur-md ${
              status.type === "warning"
                ? "bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400"
                : "bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {status.type === "warning" ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
              {status.message}
            </div>
          </div>
        )}
      </div>

      {/* Blogs Horizontal Scroll */}
      {blogs && blogs.length > 0 ? (
        <BlogsCarousel blogs={blogs} formatDate={formatDate} stripHtml={stripHtml} />
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-stone-200 dark:border-white/10 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <BookOpen className="w-16 h-16 text-stone-400 dark:text-slate-500 mx-auto mb-4" />
            <p className="text-stone-800 dark:text-slate-200 font-medium">
              No blogs available
            </p>
            <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
              Check back later for new content
            </p>
          </div>
        </div>
      )}

      {/* View All Blogs Button */}
      {blogs && blogs.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="https://shwetanshucodes.hashnode.dev"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-stone-200 dark:border-white/10 text-stone-800 dark:text-slate-200 rounded-full font-medium hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 transform hover:-translate-y-0.5 group"
          >
            <BookOpen className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Read All Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;
