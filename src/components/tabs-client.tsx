"use client";

import { useState } from "react";

interface TabsProps {
  website: React.ReactNode;
  social: React.ReactNode;
}

export const TabsClient = ({ website, social }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<"website" | "social">("website");

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center p-2 bg-white dark:bg-black rounded-full w-fit gap-2">
          <button
            onClick={() => setActiveTab("website")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === "website"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-black dark:text-white hover:opacity-70"
            }`}
          >
            Website
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === "social"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-black dark:text-white hover:opacity-70"
            }`}
          >
            Social Media
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === "website" ? website : social}
      </div>
    </div>
  );
};
