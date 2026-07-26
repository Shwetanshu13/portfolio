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
      <body className="min-h-screen bg-[#F7F3EC] dark:bg-[#161513] text-[#1F2320] dark:text-[#EDE8E0] antialiased font-sans selection:bg-[#E8614A]/30 overflow-x-hidden transition-colors duration-300">
        <div className="relative min-h-screen">
          
          <Navbar />
          <main className="relative z-10 pt-20">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 mt-20 py-8 border-t border-[#D8D2C8] dark:border-[#2E2B28] bg-[#F7F3EC]/70 dark:bg-[#161513]/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[#4A4F4B] dark:text-[#A89F94] font-medium">
                © {new Date().getFullYear()} Shwetanshu Sinha. Built with ❤️ using Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
