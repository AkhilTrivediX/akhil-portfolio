import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/themeProvider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akhil Trivedi",
  description: "Self Taught Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-kanit relative`}>
        <ThemeProvider>
          <Navbar/>
          {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
