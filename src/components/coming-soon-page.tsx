"use client";

import Link from "next/link";

export const ComingSoonPage = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">

      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-mainColor rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-24 right-10 w-20 h-20 bg-thirdColor rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1 right-1/4 w-10 h-10 bg-otherColor rounded-full blur-xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-4xl rounded-[40px] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-neutral-800 px-8 md:px-16 py-16 text-center">

        {/* Badge */}
        <span className="inline-block mb-6 px-5 py-2 text-sm rounded-full bg-violet-100 text-mainColor dark:bg-blue-500/10 dark:text-blue-400 font-medium">
          Website Under Development
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          We're Refining
          <span className="block text-mainColor dark:text-blue-400">
            Our Digital Experience.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
          GONLINE is already operating and serving clients.
          Our official website is currently being crafted
          to deliver a better and more impactful experience.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="https://wa.me/6281292749915"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-mainColor text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Contact via WhatsApp →
          </Link>

          <Link
            href="https://www.instagram.com/gonline_id?igsh=aXc5c3ZtMTZleG93"
            target="_blank"
            className="px-8 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
          >
            Visit Instagram
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="https://wa.me/6281292749915"
            target="_blank"
            className="hover:text-mainColor transition"
          >
            WhatsApp
          </Link>

          <Link
            href="https://www.instagram.com/gonline_id?igsh=aXc5c3ZtMTZleG93"
            target="_blank"
            className="hover:text-mainColor transition"
          >
            Instagram
          </Link>

          <Link href="#" className="hover:text-mainColor transition">
            Facebook
          </Link>

          <Link href="#" className="hover:text-mainColor transition">
            LinkedIn
          </Link>

          <Link href="#" className="hover:text-mainColor transition">
            TikTok
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-neutral-400">
          © {new Date().getFullYear()} GONLINE. All rights reserved.
        </p>
      </div>
    </section>
  );
};
