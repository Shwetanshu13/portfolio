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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 antialiased font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
        <div className="relative">
          {/* Global animated background blobs */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]"></div>
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px]"></div>
            <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-cyan-400/10 dark:bg-cyan-600/10 blur-[120px]"></div>
          </div>

          <Navbar />
          <main className="relative z-10">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 mt-20 py-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
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
