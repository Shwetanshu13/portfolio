import Navbar from "@/components/Navbar";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Shwetanshu Sinha | Full Stack Developer",
  description:
    "Full Stack Developer & System Design Enthusiast. Building innovative web applications with modern technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-stone-50 dark:bg-slate-900 text-stone-800 dark:text-slate-200 antialiased font-sans selection:bg-teal-500/30 overflow-x-hidden transition-colors duration-300">
        <div className="relative min-h-screen">
          
          <Navbar />
          <main className="relative z-10 pt-20">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 mt-20 py-8 border-t border-stone-200 dark:border-white/10 bg-stone-50/50 dark:bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-stone-600 dark:text-slate-400 font-medium">
                © {new Date().getFullYear()} Shwetanshu Sinha. Built with ❤️ using Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
