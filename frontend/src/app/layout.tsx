import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ApiClientProvider from "@/services/ApiClientProvider";
import AuthSync from "@/store/AuthSync";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCritic",
  description: "Peer code review platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col font-sans">
          <ApiClientProvider>
            <AuthSync />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ApiClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
