// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";
import Image from "next/image";


export default function Navbar() {
  
  const {user,loading,signOut}=useAuth()
  const links = [
  { name: "Home", href: "/" },
  { name: "Discover", href: "/discover" },
  { name: "Upload", href: "/upload" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Profile", href: `/profile/${user?.id}` },
];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router=useRouter()
  return (
    <nav className="bg-[#0D0D0D] text-white py-[16px] px-[32px] flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          className="object-contain"
          height={90}
          loading="lazy"
          width="60"
        />
        <span className="font-bold">Motion Templates</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative group"
          >
            <span
              className={`${
                pathname === link.href ? "text-white" : "text-gray-300"
              } transition`}
            >
              {link.name}
            </span>
            {/* Sliding underline */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                pathname === link.href ? "scale-x-100" : ""
              }`}
            />
          </Link>
        ))}
      </div>

      {/* Search + Icons */}
      <div className="hidden md:flex items-center gap-4">
        <div className="bg-gray-800 rounded px-2 py-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-gray-300 ml-1 outline-none"
          />
        </div>

        {/* Bell Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* User Icon */}
        {user ? <Link href={`/profile/${user?.id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.953 9.953 0 0112 15c2.485 0 4.735.905 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        </Link> : (
          <button onClick={()=>{router.push('/auth')}}>SignIn</button>
        )}
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col gap-4 p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href ? "text-indigo-400 z-50" : "text-gray-300 z-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
