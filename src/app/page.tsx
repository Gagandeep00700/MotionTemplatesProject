"use client"
import Image from "next/image";
import { supabase } from "./supabaseClient";
import Router, { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { useEffect } from "react";
import HomePage from "../../components/Videos";
export default function Home() {
  const router=useRouter()
  const {signOut}=useAuth()
  useEffect(()=>{
    async function getSession() {
      const {data,error}=await supabase.auth.getSession()
      if(error)
      {
        console.error("error while getting session:",error)
        router.push('/auth')
        return
      }
      if(!data || !data?.session?.user?.id)
      {
        router.push('/auth')
      }
    }
  },[])
  /* ====== CONFIG: toggle features here ====== */
const ENABLED_ACTIONS = {
  like: true,
  save: true,
  share: true,
  creator: true,
  duration: true,
  views: true,
  moreMenu: true,
};
/* ====== End config ====== */

/* Sample placeholder data — replace with your API data later */
const videos = Array.from({ length: 18 }).map((_, i) => ({
  id: `vid-${i + 1}`,
  title: `Cool clip #${i + 1}`,
  creator: `Creator${(i % 6) + 1}`,
  duration: `${Math.floor(Math.random() * 4) + 0}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")}`,
  views: Math.floor(Math.random() * 20000) + 120,
  // placeholderColor used to create visual thumbnail placeholders
  placeholderColor: `linear-gradient(135deg, rgba(${50 + (i * 10) % 200}, ${20 + (i * 25) % 200}, ${100 + (i * 30) % 155}, 0.95), rgba(40,10,60,0.95))`,
}));

/* Tailwind-friendly gradient accent that matches your theme */
const ACCENT_GRADIENT = "bg-gradient-to-r from-[#7C4DFF] to-[#FF4DA6]";

  return (
      <HomePage />
  );
}
