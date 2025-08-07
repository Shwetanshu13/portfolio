import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Shwetanshu Sinha",
  description: "Shwetanshu Sinha's personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
