"use client";
import { supabase } from "@/app/supabaseClient";
import { useEffect, useState } from "react";
import { Template, Video } from "../lib/interfaces/UserProfile";

const videos = [
  {
    id: 1,
    thumbnail: "/videos/thumbnail1.jpg",
    video: "/videos/video1.mp4",
    creator: "NeonPulseFX",
    logo: "/logos/neon.png",
  },
  {
    id: 2,
    thumbnail: "/videos/thumbnail2.jpg",
    video: "/videos/video2.mp4",
    creator: "PixelAura",
    logo: "/logos/pixelaura.png",
  },
  {
    id: 3,
    thumbnail: "/videos/thumbnail3.jpg",
    video: "/videos/video3.mp4",
    creator: "MotionCraft",
    logo: "/logos/motioncraft.png",
  },
  {
    id: 4,
    thumbnail: "/videos/thumbnail4.jpg",
    video: "/videos/video4.mp4",
    creator: "CineFX",
    logo: "/logos/cinefx.png",
  },
];

export default function HomePage() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [videos, setVideos] = useState<Video[]>();
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const { data, error } = await supabase.from("templates").select(`
          *,
          users (
            id,
            username,
            email,
            avatar_url
          )
        `);
        if (error) {
          console.log("Error while getting videos", error);
        }
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getAllVideos();
  }, []);
  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 py-10">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {videos &&
          videos.map((v) => (
            <div
              key={v.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-purple-700/40"
              onMouseEnter={() => setHoveredVideo(v.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              {hoveredVideo === v.id ? (
                <video
                  src={v.preview_url}
                  autoPlay
                  loop
                  muted
                  className="w-full h-60 object-cover"
                />
              ) : (
                <img
                  src={v.thumbnail}
                  alt={v.users.username}
                  className="w-full h-60 object-cover"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

              {/* Creator Info */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <img
                  src={v.users.avatar_url}
                  alt={v.user}
                  className="w-7 h-7 rounded-full border border-gray-500"
                />
                <p className="text-gray-200 text-sm font-medium">{v.creator}</p>
              </div>

              {/* Buttons (visible only on hover) */}
              <div className="absolute bottom-3 right-3 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-gray-300 hover:text-purple-400 transition">
                  ❤️
                </button>
                <button className="text-gray-300 hover:text-purple-400 transition">
                  💬
                </button>
                <button className="text-gray-300 hover:text-purple-400 transition">
                  ↗️
                </button>
              </div>

              {/* Play Button (center overlay) */}
              {hoveredVideo !== v.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="none"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653v12.694a.75.75 0 0 0 1.125.65l10.125-6.347a.75.75 0 0 0 0-1.3L6.375 5.003a.75.75 0 0 0-1.125.65z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
