import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: "BudgetMitra – Smart Price Comparator",
  description: "Compare smarter. Buy better. AI-powered price intelligence for smarter shopping.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-surface min-h-screen flex flex-col`}>
        <AuthProvider>
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          <footer className="w-full py-6 mt-auto flex items-center justify-center bg-surface">
            <p className="text-slate-500 text-sm">made by The GC Coders</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
