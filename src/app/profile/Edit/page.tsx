// app/profile/edit/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuth } from "../../../../contexts/auth-context";
import { uploadProfilePic } from "../../../../lib/actions/actions";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ username?: string; bio?: string }>({});
  const [errorMessage,setErrorMessage]=useState()
  const [loading,setLoading]=useState(false)
  const [success,setSuccess]=useState(false)
  const {user}=useAuth()
  const router=useRouter()
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { username?: string; bio?: string } = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!bio.trim()) newErrors.bio = "Bio cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (!validate()) return;
    if(user?.id){
   const url=await uploadProfilePic(user?.id,avatar)
    // TODO: Submit form data to your backend or supabase
    try{
      const {data,error}=await supabase.from('users').update({username:username,bio:bio,avatar_url:url}).eq('id',user?.id)
    console.log(data)
    if(error) throw error.message
      setSuccess(true);
      router.push(`/profile/${user.id}`);
    console.log({ username, bio, avatar });
  }catch(error)
  {
    console.error("Error Saving Profile",error)
  }finally{
    setLoading(false)
  }
  }};

  useEffect(() => {
    if (loading || !user?.id) return; // wait until auth is loaded
  
    const getUserDetails = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();
  
      if (error) {
        setErrorMessage(error.message);
      } else {
        
        setUsername(data.username)
        setBio(data.bio)
      }
    };
  
    getUserDetails();
  }, [user?.id]);
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] md:bg-[#111] rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 p-6 flex flex-col">
        <h1 className="text-white text-2xl font-bold text-center mb-6">Edit Profile</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 mb-2">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                  Avatar
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-white text-sm"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#222] text-white placeholder-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-[#222] text-white placeholder-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={4}
            ></textarea>
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
           {loading ? "Loading..." : success ? "Saved!" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
