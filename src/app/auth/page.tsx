"use client";

import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState<string>("")
  const router=useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(mode, { email, password });
    if(mode==="signup")
    {
      const {data,error}=await supabase.auth.signUp({email:email,password:password})
      
      if(data && data!==null)
      {
        setErrorMessage("Check Your Email For Confirmation Link")
      }
      if(error) setErrorMessage(error.message)
        console.log(error)
    }else{
      const {data,error}=await supabase.auth.signInWithPassword({email:email,password:password})
      if(error){ 
        setErrorMessage(error.message)
        return;
      }
        if(data && data!==null)
        {
          router.push('/')
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl bg-black/40 border border-purple-500/30 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-purple-400 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-purple-400 hover:underline"
              >
                Sign In
              </button>
            </>
          )}
          <br />
          {errorMessage ? errorMessage : ""}
        </p>
      </div>
    </div>
  );
}
