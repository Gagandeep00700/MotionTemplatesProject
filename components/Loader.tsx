"use client";
import { useEffect, useState } from "react";

export default function Loader({ isLoading }: { isLoading: boolean }) {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Wait for fade-out before hiding completely
      const timeout = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timeout);
    } else {
      setVisible(true);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-[1500ms] ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Rotating Ring */}
      <div className="absolute w-40 h-40 border-4 border-purple-500/30 border-t-blue-500 rounded-full animate-spin" />

      {/* Motion Templates Logo */}
      <h1 className="relative text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
        Motion Templates
      </h1>
    </div>
  );
}
