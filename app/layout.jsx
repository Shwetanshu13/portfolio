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
      <body className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-orange-500/30 overflow-x-hidden transition-colors duration-300">
        <div className="relative min-h-screen">
          {/* Subtle grid background */}
          <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-100"></div>

          {/* Ambient Glowing Blobs */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-400/20 dark:bg-orange-600/10 blur-[120px] animate-blob"></div>
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-rose-400/20 dark:bg-rose-600/10 blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-[120px] animate-blob animation-delay-4000"></div>
          </div>
          
          <Navbar />
          <main className="relative z-10 pt-20">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 mt-20 py-8 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0a0f1c]/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                © {new Date().getFullYear()} Shwetanshu Sinha. Built with ❤️ using Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
