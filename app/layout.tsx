import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavMenu } from "@/components/Navbar/nav-menu";
import { NavigationSheet } from "@/components/Navbar/navigation-sheet";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Navbar/logo";
import { ModeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/Footer/Footer";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UX Bits - ShadCN based UX solutions",
  description:
    "A collection of UX solutions with their implementation using ShadCN. All open source and free to use, added with a single CLI command.",
};

import Script from "next/script";
import CookieBanner from "@/Bits/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S9GVRPX097"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S9GVRPX097');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="h-16 bg-background border-b">
            {/* Make the inner container relative so we can absolutely center the desktop NavMenu */}
            <div className="container mx-auto px-4 h-full relative flex items-center justify-between">
              <Logo />

              {/* Desktop Menu: absolutely centered on md+ while hidden on small screens */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <NavMenu />
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com/Neliq/ux-bits"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary">
                    <Github className="mr-2" />
                    Star on Github
                  </Button>
                </Link>
                <ModeToggle />

                {/* Mobile Menu */}
                <div className="md:hidden">
                  <NavigationSheet />
                </div>
              </div>
            </div>
          </nav>
          <CookieBanner />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
