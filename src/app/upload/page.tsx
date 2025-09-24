"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function UploadTemplatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!title || !description || !video || !thumbnail || !templateFile) {
      alert("All fields are required!");
      return;
    }
    if (description.length < 30 || description.length > 250) {
      alert("Description must be between 30 and 250 characters.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    // TODO: connect to backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-lg border border-neutral-800"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Upload Template
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Template Description (30–250 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
          required
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Video Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-300">
            Upload Video (9:16)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setVideo(e.target.files?.[0] || null)
            }
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white
              hover:file:opacity-80 cursor-pointer"
            required
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-300">
            Upload Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setThumbnail(e.target.files?.[0] || null)
            }
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white
              hover:file:opacity-80 cursor-pointer"
            required
          />
        </div>

        {/* Template File Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-gray-300">
            Upload Template File
          </label>
          <input
            type="file"
            accept=".zip,.json,.aep,.prproj,.mogrt,.psd,.ai"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTemplateFile(e.target.files?.[0] || null)
            }
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white
              hover:file:opacity-80 cursor-pointer"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-semibold
            bg-gradient-to-r from-pink-500 to-purple-600 text-white
            hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : success ? "Uploaded!" : "Upload"}
        </button>
      </form>
    </div>
  );
}
