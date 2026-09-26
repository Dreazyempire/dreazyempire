"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Category = { id: string; name: string };

export default function AddProject() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    supabase.from("categories").select("id, name").order("sort_order").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const uploadToCloudinary = async (file: File, resourceType: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dreazyempire_uploads");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/aobufb36/${resourceType}/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setStatusMsg("Uploading media, please wait...");

    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          title,
          category_id: categoryId,
          description,
          external_link: externalLink || null,
          featured,
        })
        .select()
        .single();

      if (projectError || !project) throw projectError;

      if (images) {
        for (let i = 0; i < images.length; i++) {
          const url = await uploadToCloudinary(images[i], "image");
          await supabase.from("project_media").insert({
            project_id: project.id,
            media_type: "image",
            url,
            sort_order: i,
          });
        }
      }

      if (videos) {
        for (let i = 0; i < videos.length; i++) {
          const url = await uploadToCloudinary(videos[i], "video");
          await supabase.from("project_media").insert({
            project_id: project.id,
            media_type: "video",
            url,
            sort_order: i,
          });
        }
      }

      setStatusMsg("✅ Project published!");
      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mainbg text-textprimary px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Add Project</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="block text-textsecondary text-sm mb-1">Project Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-secondarybg border border-borderc"
            required
          />
        </div>

        <div>
          <label className="block text-textsecondary text-sm mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-secondarybg border border-borderc"
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-textsecondary text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-secondarybg border border-borderc"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-textsecondary text-sm mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full text-textsecondary"
          />
        </div>

        <div>
          <label className="block text-textsecondary text-sm mb-1">Upload Videos</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => setVideos(e.target.files)}
            className="w-full text-textsecondary"
          />
        </div>

        <div>
          <label className="block text-textsecondary text-sm mb-1">External Link (optional)</label>
          <input
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-secondarybg border border-borderc"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            id="featured"
          />
          <label htmlFor="featured" className="text-textsecondary text-sm">Mark as Featured</label>
        </div>

        {statusMsg && <p className="text-sm">{statusMsg}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
        >
          {uploading ? "Publishing..." : "Publish Project"}
        </button>
      </form>
    </main>
  );
          }
