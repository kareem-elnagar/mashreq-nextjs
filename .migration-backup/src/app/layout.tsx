import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mashreq Solar — Engineering for Real Operation",
  description: "Solar systems designed for real field conditions and long-term performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div>
              <div className="font-bold text-xl text-primary tracking-tight">MASHREQ</div>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                Solar systems that keep working when it matters.
              </p>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Mashreq Engineering. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
