import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project } = await supabase
    .from("projects")
    .select("id, title, description, external_link, categories(name), project_media(url, media_type, sort_order)")
    .eq("id", params.id)
    .single();

  if (!project) return notFound();

  const media = (project.project_media || []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const images = media.filter((m: any) => m.media_type === "image");
  const videos = media.filter((m: any) => m.media_type === "video");

  return (
    <main className="min-h-screen bg-mainbg text-textprimary px-6 py-10">
      <Link href="/#work" className="text-accent text-sm">← Back to Work</Link>

      <div className="max-w-3xl mx-auto mt-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-textsecondary mt-1">{(project.categories as any)?.name}</p>

        {project.description && (
          <p className="text-textsecondary mt-6 leading-relaxed">{project.description}</p>
        )}

        {project.external_link && (
          <a
            href={project.external_link}
            target="_blank"
            className="inline-block mt-4 text-accent underline text-sm"
          >
            Visit External Link →
          </a>
        )}

        {images.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img: any, i: number) => (
                <img key={i} src={img.url} alt={project.title} className="w-full rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-1 gap-4">
              {videos.map((vid: any, i: number) => (
                <video key={i} src={vid.url} controls className="w-full rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
