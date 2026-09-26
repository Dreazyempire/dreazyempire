"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Category = { id: string; name: string };

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: cats } = await supabase.from("categories").select("id, name").order("sort_order");
      if (cats) setCategories(cats);

      const { data: project } = await supabase
        .from("projects")
        .select("title, category_id, description, external_link, featured")
        .eq("id", id)
        .single();

      if (project) {
        setTitle(project.title || "");
        setCategoryId(project.category_id || "");
        setDescription(project.description || "");
        setExternalLink(project.external_link || "");
        setFeatured(project.featured || false);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg("");

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        category_id: categoryId,
        description,
        external_link: externalLink || null,
        featured,
      })
      .eq("id", id);

    setSaving(false);
    if (error) {
      setStatusMsg("❌ Something went wrong. Please try again.");
    } else {
      setStatusMsg("✅ Saved!");
      setTimeout(() => router.push("/admin/dashboard"), 1000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-mainbg text-textprimary px-6 py-10">
        <p className="text-textsecondary">Loading project...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mainbg text-textprimary px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSave} className="max-w-xl space-y-5">
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
          disabled={saving}
          className="w-full py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
        }
