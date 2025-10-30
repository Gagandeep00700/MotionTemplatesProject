"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/auth-context";
import { supabase } from "@/app/supabaseClient";
import { UserProfile } from "../../../../lib/interfaces/interfaces";
import { useParams ,useRouter} from "next/navigation";
import HomePage from "../../../../components/Videos";
// import { Cabin_Sketch } from "next/font/google";
export default function ProfilePage() {
  const {user,loading,signOut}=useAuth()
  const [userProfile,setUserProfile]=useState<UserProfile | undefined>(undefined)
  // const [errorMessage,setErrorMessage]=useState<string>('')
  const {id}=useParams()
  const [isOwnProfile,setIsOwnProfile]=useState(false)
  const router=useRouter()
  const posts = [
    {
      id: 1,
      title: "Cinematic Title Pack",
      thumbnail: "/logo.png",
      description: "A sleek animated title template for Premiere Pro.",
      likes: 120,
      downloads: 80,
      creator: "Motion template User",
    },
    {
      id: 2,
      title: "Glitch Transition",
      thumbnail: "/placeholder.png",
      description: "Dynamic glitch transitions for video editing.",
      likes: 95,
      downloads: 60,
      creator: "Motion template User",
    },
  ];
 
  useEffect(() => {
  // if (loading || !user?.id) return; // wait until auth is loaded

  const getUserDetails = async () => {
    try{
        const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
      setUserProfile(data)
      if(error)
      {
       console.error("error while loading profile",error)
      }
    }catch(error)
    {
      console.error(error)
    }
  };

  getUserDetails();
}, [id]);
useEffect(() => {
  if (user && userProfile) {
    setIsOwnProfile(user.id === userProfile.id);
  }
}, [user, userProfile]);

 if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <p className="text-lg mb-4">No profile found. Please sign in.</p>
        <button
          onClick={() => router.push("/auth")}
          className="w-max p-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0d1a] to-black text-white px-4 py-6">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center">
        <div className="relative w-28 h-28 mb-3">
          <img
            src={userProfile && userProfile?.avatar_url!==null ? `${userProfile?.avatar_url}` : "/logo.png"}
            alt="Profile"
            width={500}
            height={500}
            className="rounded-full border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold">{userProfile?.username}</h1>
        <p className="text-gray-400 text-sm max-w-xs">
         {userProfile?.bio}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <span className="font-bold text-purple-400">{userProfile?.post_count}</span>
            <p className="text-gray-400">Uploads</p>
          </div>
          <div>
            <span className="font-bold text-purple-400">{userProfile?.download_count}</span>
            <p className="text-gray-400">Downloads</p>
          </div>
          <div>
            <span className="font-bold text-purple-400">{userProfile?.follower_count}</span>
            <p className="text-gray-400">Followers</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4">
          {isOwnProfile ? (
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition" onClick={()=>{router.push('/profile/Edit')}}>
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
                Follow
              </button>
              <button className="px-4 py-2 rounded-lg border border-purple-500 hover:bg-purple-500/20 transition">
                Message
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mt-6 border-b border-gray-700 pb-2 text-sm">
        <button className="text-purple-400 font-medium">All</button>
        <button className="hover:text-purple-300">Liked</button>
        <button className="hover:text-purple-300">Collections</button>
      </div>

      {/* Posts List */}
      <main className="mt-6 space-y-4">
        {/* {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-4 bg-[#111122] p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-28 h-20 flex-shrink-0">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-400 text-sm">{post.description}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                <span>❤️ {post.likes}</span>
                <span>⬇️ {post.downloads}</span>
                <span>👤 {post.creator}</span>
              </div>
            </div>
          </div>
        ))} */}
        <HomePage query={`${user.id}`} />
      </main>
    </div>)
}
