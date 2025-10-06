"use client";
import { useState } from "react";

export default function UploadTemplate() {
  const [mode, setMode] = useState<"file" | "prompt">("file");

  return (
    <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg border border-gray-500">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Template</h2>

      {/* Title */}
      <label className="block text-sm mb-1">Template Title</label>
      <input
        type="text"
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
        placeholder="Enter template title"
      />

      {/* Description */}
      <label className="block text-sm mb-1">
        Template Description (30–250 characters)
      </label>
      <textarea
        rows={3}
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
        placeholder="Write a short description"
      />

      {/* Tags */}
      <label className="block text-sm mb-1">Tags (comma separated)</label>
      <input
        type="text"
        className="w-full mb-3 p-2 rounded bg-black border border-gray-600 focus:outline-none"
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
            className="w-full text-sm text-gray-400"
          />
        </div>
      ) : (
        <div className="mb-3">
          <label className="block text-sm mb-1">Enter Prompt</label>
          <textarea
            rows={3}
            className="w-full p-2 rounded bg-black border border-gray-600 focus:outline-none"
            placeholder="Enter your editing instructions prompt"
          />
        </div>
      )}

      {/* Video Upload */}
      <label className="block text-sm mb-1">Upload Video (9:16)</label>
      <input
        type="file"
        accept="video/*"
        className="w-full mb-3 text-sm text-gray-400"
      />

      {/* Thumbnail Upload */}
      <label className="block text-sm mb-1">Upload Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        className="w-full mb-4 text-sm text-gray-400"
      />

      {/* Submit */}
      <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
        Upload
      </button>
    </div>
  );
}
