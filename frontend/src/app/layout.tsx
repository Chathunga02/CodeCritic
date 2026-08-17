import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ApiClientProvider from "@/services/ApiClientProvider";
import AuthSync from "@/store/AuthSync";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "CodeCritic", description: "Peer code review platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <ApiClientProvider>
            <AuthSync />
            {children}
          </ApiClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
