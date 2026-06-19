import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CallProvider } from "@/context/CallContext";
import CallOverlay from "@/components/CallOverlay";
import CursorEffect from "@/components/CursorEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "XchangeN — Trade Skills, Not Money",
  description: "Free peer-to-peer skill exchange platform. Swap what you know for what you want to learn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <AuthProvider>
          <CallProvider>
            <NavBar />
            {children}
            <Footer />
            <CallOverlay />
            <CursorEffect />
          </CallProvider>
        </AuthProvider>
      </body>
    </html>
  );
}