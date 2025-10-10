"use client";
import { useState } from "react";
import { Template } from "../../../lib/interfaces/interfaces";
import { supabase } from "../supabaseClient";
import { useAuth } from "../../../contexts/auth-context";
import { useRouter } from "next/navigation";
export default function UploadTemplate() {
  const [mode, setMode] = useState<"file" | "prompt">("file");
  const {user}=useAuth()
const router=useRouter()
  const [uploadStructure,setUploadStructure]=useState<Template>({
    id:0,
    templateTitle:"",
    templateDescription:"",
    templateTags:"",
    templateMode:"",
    templateVideo:null,
    templatePrompt:"",
    templateThumbnail:null,
    templateFile:null,
  })
  

  const [loading,setLoading]=useState(false)
    function validateUploadForm(data:Template) {
  const errors: string[] = [];

  // Title
  if (!data.templateTitle.trim()) {
    errors.push("Title is required.");
  }

  // Description
  if (!data.templateDescription.trim()) {
    errors.push("Description is required.");
  } else if (
    data.templateDescription.length < 30 ||
    data.templateDescription.length > 250
  ) {
    errors.push("Description must be between 30 and 250 characters.");
  }

  // Mode-specific validation
  if (data.templateMode === "file") {
    if (!data.templateDescription) {
      errors.push("Template file is required.");
    }
  } else if (data.templateMode === "prompt") {
    if (!data.templatePrompt || !data.templatePrompt.trim()) {
      errors.push("Prompt is required when 'Prompt' mode is selected.");
    }
  }

  // Video
  if (!data.templateVideo) {
    errors.push("Video file is required.");
  } else if (!data.templateVideo.type.startsWith("video/")) {
    errors.push("Uploaded video must be a valid video file.");
  }

  // Thumbnail
  if (!data.templateThumbnail) {
    errors.push("Thumbnail image is required.");
  } else if (!data.templateThumbnail.type.startsWith("image/")) {
    errors.push("Uploaded thumbnail must be a valid image file.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
const UploadTemplate=async()=>{
  if(uploadStructure.templateFile)
  {
    const {data,error}=await supabase.storage.from("templates").upload(`/templates/${Date.now()}`,uploadStructure.templateFile!)
    if(data)
    {
      return supabase.storage.from("templates").getPublicUrl(data.path).data.publicUrl
    }else{
      return error;
    }
  }
}
const UploadVideo=async()=>{
  try{
    if(uploadStructure.templateVideo)
    {
        const {data,error}=await supabase.storage.from("previews").upload(`/previews/${user?.id}/${Date.now()}`,uploadStructure.templateVideo!)
        if(error){
          console.error(error)
        }
        if(data)
        {
          return supabase.storage.from("previews").getPublicUrl(data.path).data.publicUrl
        }
    }
    
  }catch(error)
  {
      console.error("Error while uploading video")
  }
}
const UploadThumbnail=async()=>{
  try{
    if(uploadStructure.templateThumbnail)
    {
        const {data,error}=await supabase.storage.from('Thumbnails').upload(`/${user?.id}/${Date.now()}/`,uploadStructure.templateThumbnail)
        if(error)
        {
          console.log("Error while uploading thumbnail",error)
        }
        if(data)
        {
          return supabase.storage.from('Thumbnails').getPublicUrl(data.path).data.publicUrl
        }
    }
    
  }catch(error)
  {
    console.log("error while uploading thumbnail",error)
  }
  

}
  const handleSubmit=async()=>{
    setLoading(true)
    const validateUpload=validateUploadForm(uploadStructure)
    try{
    if(validateUpload.errors.length===0)
    {
      const File_URL=await UploadTemplate()
      const videoUrl=await UploadVideo()
      const Thumbnail_url=await UploadThumbnail()
      const {data,error}=await supabase.from("templates").insert({
        user_id:user?.id,
        title:uploadStructure.templateTitle,
        description:uploadStructure.templateDescription,
        tags:uploadStructure.templateTags,
        Ai_prompts:uploadStructure.templatePrompt,
        file_url:File_URL,
        preview_url:videoUrl,
        Thumbnail_url:Thumbnail_url
      })
      if(error){
        setLoading(false)
        console.error("Error while uploading:",error)
      }
      if(data)
      {
        console.log(data);
      }
    }else{
      console.log(validateUpload.errors)
    }
  }catch(error)
  {
    console.error("error while uploading Template",error)
  }finally{
    setLoading(false)
  }
  
  }
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <p className="text-lg mb-4">No profile found. You Can&apos;t upload anything</p>
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
    <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg border border-gray-500">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Template</h2>

      {/* Title */}
      <label className="block text-sm mb-1">Template Title</label>
      <input
        type="text"
        value={uploadStructure.templateTitle}
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
        onChange={(e)=>{setUploadStructure(prev=>({...prev,templateTitle:e.target.value}))}}
        placeholder="Enter template title"
      />

      {/* Description */}
      <label className="block text-sm mb-1">
        Template Description (30–250 characters)
      </label>
      <textarea
        rows={3}
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
        value={uploadStructure.templateDescription}
        onChange={(e)=>{setUploadStructure(prev=>({...prev,templateDescription:e.target.value}))}}
        placeholder="Write a short description"
      />

      {/* Tags */}
      <label className="block text-sm mb-1">Tags (comma separated)</label>
      <input
        type="text"
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
        value={uploadStructure.templateTags}
        onChange={(e)=>{setUploadStructure(prev=>({...prev,templateTags:e.target.value}))}}
        placeholder="e.g. travel, vlog, cinematic"
      />

      {/* Toggle Option */}
      <div className="mb-3">
        <label className="block text-sm mb-2">Choose Input Type:</label>
        <div className="flex space-x-6">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="file"
              checked={mode === "file"}
              onChange={() => setMode("file")}
              className="mr-2"
            />
            Template File
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              value="prompt"
              checked={mode === "prompt"}
              onChange={() => setMode("prompt")}
              className="mr-2"
            />
            Prompt
          </label>
        </div>
      </div>

      {/* Conditional Input */}
      {mode === "file" ? (
        <div className="mb-3">
          <label className="block text-sm mb-1">Upload Template File</label>
          <input
            type="file"
            onChange={(e)=>{
              const files = e.target.files;
              const file = files && files.length > 0 ? files[0] : null;
              setUploadStructure(prev=>({...prev,templateFile:file}))}}
            accept="video/*"
            className="w-full text-sm text-gray-400"
          />
        </div>
      ) : (
        <div className="mb-3">
          <label className="block text-sm mb-1">Enter Prompt</label>
          <textarea
            rows={3}
            className="w-full p-2 rounded bg-black border border-gray-600 focus:outline-none"
            value={uploadStructure.templatePrompt}
            onChange={(e)=>setUploadStructure(prev=>({...prev,templatePrompt:e.target.value}))}
            placeholder="Enter your editing instructions prompt"
          />
        </div>
      )}

      {/* Video Upload */}
      <label className="block text-sm mb-1">Upload Video (9:16)</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e)=>{
          const files = e.target.files;
          const file = files && files.length > 0 ? files[0] : null;
          setUploadStructure(prev=>({...prev,templateVideo:file}))}}
        className="w-full mb-3 text-sm text-gray-400"
      />

      {/* Thumbnail Upload */}
      <label className="block text-sm mb-1">Upload Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e)=>{
          const files = e.target.files;
          const file = files && files.length > 0 ? files[0] : null;
          setUploadStructure(prev=>({...prev,templateThumbnail:file}))}}
        className="w-full mb-4 text-sm text-gray-400"
      />

      {/* Submit */}
      <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition" onClick={handleSubmit}>
        {loading ? "Uploading" : "Upload"}
      </button>
    </div>
  );
}
