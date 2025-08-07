"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Parser from "rss-parser";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const parser = new Parser();
  const getBlogs = async () => {
    try {
      const feed = await parser.parseURL(
        "https://shwetanshucodes.hashnode.dev/rss.xml"
      );
      setBlogs(feed.items);
      console.log(feed.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        {blogs &&
          blogs.map((blog, index) => (
            <Link href={blog.link} target="_blank">
              <div key={index}>
                <h2>{blog.title}</h2>
                <p>{blog.pubDate}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: blog.contentSnippet }}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
