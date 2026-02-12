import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "gonline",
  description: "Creative. Connected. Online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body
        className={`${pjs.className} antialiased`}
      >
        <ThemeProvider enableSystem attribute={'class'}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
