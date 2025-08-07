import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Shwetanshu Sinha | Full Stack Developer",
  description:
    "Full Stack Developer & System Design Enthusiast. Building innovative web applications with modern technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 antialiased">
        <div className="relative">
          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

          <Navbar />
          <main className="relative z-10">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 mt-20 py-8 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                © 2025 Shwetanshu Sinha. Built with ❤️ using Next.js & Tailwind
                CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
