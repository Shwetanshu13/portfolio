"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

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
      month: "long",
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="text-lg text-slate-500 dark:text-slate-400">
            Loading blogs...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-xl">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
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
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 font-outfit">
          Latest Blogs
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Sharing my thoughts, experiences, and learnings about web development,
          system design, and technology trends.
        </p>
        <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>

        {/* Status message */}
        {status && status.message && (
          <div
            className={`mt-6 max-w-2xl mx-auto p-3 rounded-lg text-sm backdrop-blur-md ${
              status.type === "warning"
                ? "bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400"
                : "bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>

      {/* Blogs Grid */}
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.link}
              target="_blank"
              className="group block relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-white/10 hover:border-orange-500/50 transform hover:-translate-y-1"
            >
              {/* Blog header */}
              <div className="p-6 pb-4 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors duration-300 shadow-sm">
                    <svg
                      className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {formatDate(blog.pubDate)}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                  {blog.title}
                </h2>
              </div>

              {/* Blog content */}
              <div className="px-6 pb-6 relative z-10">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {blog.contentSnippet
                    ? stripHtml(blog.contentSnippet)
                    : "Click to read the full article..."}
                </p>

                {/* Read more indicator */}
                <div className="flex items-center gap-2 mt-4 text-orange-500 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                  <span>Read Article</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <svg
              className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-slate-800 dark:text-slate-200 font-medium">
              No blogs available
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Read All Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;
