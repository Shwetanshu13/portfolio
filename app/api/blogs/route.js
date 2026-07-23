import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
    try {
        const parser = new Parser();
        const feed = await parser.parseURL("https://shwetanshucodes.hashnode.dev/rss.xml");

        const blogs = feed.items.slice(0, 6).map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.isoDate || item.pubDate,
            contentSnippet: item.contentSnippet || item.content,
            guid: item.guid || item.link
        }));

        return NextResponse.json({ success: true, blogs, cached: false });
    } catch (error) {
        console.error("Error fetching Hashnode RSS:", error);

        // Fallback blogs if the fetch completely fails
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
