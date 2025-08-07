import Parser from "rss-parser";
import { NextResponse } from "next/server";

// In-memory cache (in production, you might want to use Redis or another caching solution)
let cache = {
    data: null,
    timestamp: null,
    CACHE_DURATION: 10 * 60 * 1000, // 10 minutes in milliseconds
};

export async function GET() {
    try {
        // Check if we have cached data that's still valid
        const now = Date.now();
        if (cache.data && cache.timestamp && (now - cache.timestamp) < cache.CACHE_DURATION) {
            console.log("Returning cached blog data");
            return NextResponse.json({ success: true, blogs: cache.data, cached: true });
        }

        console.log("Fetching fresh blog data from RSS");
        const parser = new Parser({
            timeout: 10000, // 10 seconds timeout
            headers: {
                'User-Agent': 'Portfolio Website Blog Fetcher/1.0',
            }
        });

        const feed = await parser.parseURL("https://shwetanshucodes.hashnode.dev/rss.xml");

        // Return only the first 6 blog items with necessary data
        const blogs = feed.items.slice(0, 6).map(item => ({
            title: item.title || "Untitled",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            contentSnippet: item.contentSnippet || item.content?.substring(0, 200) + "..." || "Click to read more...",
            guid: item.guid || item.link || `blog-${Date.now()}-${Math.random()}`
        }));

        // Update cache
        cache.data = blogs;
        cache.timestamp = now;

        return NextResponse.json({ success: true, blogs, cached: false });
    } catch (error) {
        console.error("Error fetching RSS feed:", error);

        // If we have cached data, return it even if it's expired
        if (cache.data) {
            console.log("Returning expired cached data due to fetch error");
            return NextResponse.json({
                success: true,
                blogs: cache.data,
                cached: true,
                warning: "Using cached data due to fetch error"
            });
        }

        // Return fallback data if no cache is available
        const fallbackBlogs = [
            {
                title: "Welcome to my blog!",
                link: "https://shwetanshucodes.hashnode.dev",
                pubDate: new Date().toISOString(),
                contentSnippet: "Check out my latest articles on web development, system design, and technology trends.",
                guid: "fallback-1"
            }
        ];

        return NextResponse.json({
            success: true,
            blogs: fallbackBlogs,
            fallback: true,
            error: "Could not fetch latest blogs. Showing fallback content."
        });
    }
}
