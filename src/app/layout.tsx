import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/coming-soon-page";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "gonline",
  description: "Creative. Connected. Online.",
  robots:
    process.env.NEXT_PUBLIC_SITE_MODE === "coming"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};


const isComingSoon =
  process.env.NEXT_PUBLIC_SITE_MODE === "coming";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body className={`${pjs.className} antialiased`}>
        <ThemeProvider enableSystem attribute="class">
          {isComingSoon ? (
            <ComingSoonPage />
          ) : (
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
