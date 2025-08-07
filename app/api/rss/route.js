// app/api/rss/route.ts (App Router)
import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
    try {
        const feed = await parser.parseURL("https://shwetanshucodes.hashnode.dev/rss.xml");
        return NextResponse.json({ items: feed.items });
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 500 });
    }
}
