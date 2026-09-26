"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  id: string;
  title: string;
  featured: boolean;
  categories: { name: string } | null;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("id, title, featured, categories(name)")
      .order("created_at", { ascending: false });
    if (data) setProjects(data as unknown as Project[]);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-mainbg text-textprimary px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="text-textsecondary text-sm underline">
          Log Out
        </button>
      </div>

      <Link
        href="/admin/dashboard/add"
        className="inline-block mb-8 px-6 py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
      >
        + Add New Project
      </Link>

      {loading ? (
        <p className="text-textsecondary">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-textsecondary">No projects yet. Add your first one above.</p>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-card border border-borderc rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-semibold">
                  {p.title} {p.featured && <span className="text-accent text-xs ml-2">★ Featured</span>}
                </p>
                <p className="text-textsecondary text-sm">{p.categories?.name}</p>
              </div>
              <div className="flex gap-3">
                <Link href={`/admin/dashboard/edit/${p.id}`} className="text-accent text-sm underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-400 text-sm underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
