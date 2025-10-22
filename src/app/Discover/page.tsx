"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Template = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  category: string;
  likes: number;
  views: number;
  comments: number;
  videoUrl?: string;
};

const MOCK: Template[] = [
  {
    id: "1",
    title: "Neon Cyberwalk",
    author: "Gagandep",
    thumbnail: "/thumb1.jpg",
    category: "Gemini Prompts",
    likes: 1500,
    views: 5200,
    comments: 312,
    videoUrl: "/sample-video.mp4",
  },
  {
    id: "2",
    title: "Cinematic Intro",
    author: "Gagandep",
    thumbnail: "/thumb2.jpg",
    category: "Premiere Pro",
    likes: 420,
    views: 2100,
    comments: 81,
    videoUrl: "/sample-video.mp4",
  },
  {
    id: "3",
    title: "Astronaut Duo",
    author: "Gemini",
    thumbnail: "/thumb3.jpg",
    category: "Alight Motion",
    likes: 890,
    views: 3300,
    comments: 125,
    videoUrl: "/sample-video.mp4",
  },
];

const ALL_TAGS = ["Gemini Prompts", "Alight Motion", "Premiere Pro", "Trending"];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>("Trending");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK.filter((t) => {
      const matchesTag =
        !activeTag || activeTag === "Trending" ? true : t.category === activeTag;
      const matchesQuery = !q
        ? true
        : t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [query, activeTag]);

  return (
    <main className="p-4 md:p-8">
      {/* Search bar */}
      <section className="mb-6">
        <div className="neon-outline p-3 rounded-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, authors..."
                className="w-full bg-transparent outline-none py-3 px-4 rounded-lg text-sm border border-transparent focus:border-neon-purple/40"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {ALL_TAGS.map((t) => {
                const active = t === activeTag;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTag(active ? null : t)}
                    className={`text-sm px-3 py-1 rounded-full border ${
                      active
                        ? "bg-[rgba(139,92,246,0.14)] border-neon-purple/40"
                        : "bg-[rgba(255,255,255,0.02)] border-transparent"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trending row + grid */}
      <section>
        <h2 className="text-lg font-medium mb-4">Trending Gemini Prompts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((t) => (
            <motion.div
              key={t.id}
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() =>
                setHoveredId((prev) => (prev === t.id ? null : prev))
              }
              onClick={() => setModalOpen(t)}
              layout
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-lg overflow-hidden h-40 md:h-44 cursor-pointer ${
                hoveredId === t.id
                  ? "card-hover-glow border-neon-purple/30"
                  : "bg-[rgba(255,255,255,0.02)]"
              }`}
            >
              <img
                src={t.thumbnail}
                alt={t.title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute left-2 bottom-2 text-xs flex items-center gap-2">
                <div className="bg-black/60 px-2 py-1 rounded text-xs">
                  {t.author}
                </div>
              </div>

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredId === t.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-center items-center bg-black/40"
                  >
                    <div className="p-2 rounded-full border border-neon-purple/40 neon-outline">
                      <svg
                        width="52"
                        height="52"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#8B5CF6"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M10 8l4 4-4 4"
                          stroke="#A78BFA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-3 bg-[rgba(0,0,0,0.6)] px-3 py-2 rounded-md text-sm"
                    >
                      <div className="font-medium">{t.title}</div>
                      <div className="text-xs opacity-80 flex gap-3 mt-1">
                        <span>❤ {t.likes.toLocaleString()}</span>
                        <span>👁 {t.views.toLocaleString()}</span>
                        <span>💬 {t.comments}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No results view */}
      <section className="mt-10">
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-14 flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="p-8 rounded-full bg-[rgba(139,92,246,0.06)]"
              >
                <svg width="88" height="88" viewBox="0 0 24 24">
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="#8B5CF6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="#8B5CF6"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 8l6 6"
                    stroke="#8B5CF6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
              <div className="text-2xl font-semibold">No results found</div>
              <div className="text-sm text-slate-300">
                Try adjusting your search or filters
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Modal for video playback */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={() => setModalOpen(null)}
              className="absolute inset-0 bg-black/70"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-panel rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="text-lg font-semibold">
                    {modalOpen.title}
                  </div>
                  <div className="text-xs opacity-70">
                    {modalOpen.author} • {modalOpen.category}
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(null)}
                  className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)]"
                >
                  Close
                </button>
              </div>

              <div className="bg-black rounded-md overflow-hidden">
                <video
                  controls
                  src={modalOpen.videoUrl}
                  className="w-full h-64 md:h-96 bg-black object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
