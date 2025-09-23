"use client"
import Image from "next/image";
import { supabase } from "./supabaseClient";
import Router, { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { useEffect } from "react";
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
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button onClick={signOut}>SignOut</button>
    </div>
  );
}
