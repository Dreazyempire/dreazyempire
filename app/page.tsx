import { supabase } from "@/lib/supabaseClient";
import PortfolioSection from "@/components/PortfolioSection";

type Project = {
  id: string;
  title: string;
  categories: { name: string } | null;
  project_media: { url: string; media_type: string }[];
};

async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("id, title, categories(name), project_media(url, media_type)")
    .order("created_at", { ascending: false });
  return (data as unknown as Project[]) || [];
}

export const revalidate = 0;

const services = [
  { name: "Content Editing", desc: "Editing and shaping content across platforms and formats" },
  { name: "Media Hosting", desc: "Hosting conversations and media for digital audiences" },
  { name: "Web3 & Crypto Design", desc: "Visual design for on-chain projects and communities" },
  { name: "Social Media Design", desc: "Design built for feeds, platforms and campaigns" },
  { name: "Branding & Identity", desc: "Marks and systems that hold up anywhere" },
  { name: "Motion Graphics", desc: "Short-form animation and video content" },
];

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-mainbg text-textprimary">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-borderc">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790405860/330421.jpg"
            alt="Dreazy Empire logo"
            className="w-9 h-9 rounded-md object-cover"
          />
          <span className="text-lg font-bold tracking-tight">Dreazy Empire</span>
        </div>
        <a href="#contact" className="text-sm border border-borderc rounded-full px-4 py-2 hover:border-accent hover:text-accent transition">
          Let's work
        </a>
      </nav>

      <section className="px-6 pt-16 pb-20 border-b border-borderc">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bold leading-[0.9] tracking-tight text-[15vw] md:text-8xl bg-gradient-to-br from-highlight via-accent to-accent2 bg-clip-text text-transparent">
            Dreazy
            <br />
            <span className="block ml-[10vw] md:ml-28">Empire</span>
          </h1>

          <div className="mt-10 pt-6 border-t border-borderc flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="max-w-md text-textsecondary leading-relaxed">
              Content editor, media host and graphic designer working across Web3, digital brands and online communities.
            </p>
            <div className="flex gap-4">
              <a href="#work" className="px-5 py-3 bg-accent text-mainbg font-semibold rounded-full hover:bg-highlight transition">
                View my work
              </a>
              <a href="#contact" className="px-5 py-3 border border-borderc rounded-full hover:border-accent hover:text-accent transition">
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection projects={projects} />

      <section id="about" className="px-6 py-20 bg-secondarybg border-b border-borderc">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790401456/file_00000000827881f496906b0227b2a77f.png"
            alt="Dreazy Empire"
            className="w-48 h-48 rounded-full object-cover border-2 border-accent flex-shrink-0"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-highlight to-accent2 bg-clip-text text-transparent inline-block">
              About Me
            </h2>
            <p className="text-textsecondary leading-relaxed mb-4">
              I'm a Content Editor, Media Host, and Graphic Designer working at the intersection of media, design, technology, and Web3.
            </p>
            <p className="text-textsecondary leading-relaxed mb-4">
              I create content, host conversations, and design visual experiences that help ideas, brands, and projects communicate clearly and connect with their audience.
            </p>
            <p className="text-textsecondary leading-relaxed mb-4">
              I'm passionate about creativity, emerging technology, and building things that have real-world impact.
            </p>
            <p className="text-textsecondary leading-relaxed">
              Founder of Asset Oracle, a project exploring the intersection of real-world information, decentralized verification, and on-chain intelligence.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-20 border-b border-borderc">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 bg-gradient-to-r from-highlight to-accent2 bg-clip-text text-transparent inline-block">
            Services
          </h2>
          <div className="divide-y divide-borderc">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex flex-col md:flex-row md:items-baseline md:justify-between py-5 group"
              >
                <p className="text-lg font-semibold group-hover:text-accent transition">{s.name}</p>
                <p className="text-textsecondary text-sm mt-1 md:mt-0 md:max-w-xs md:text-right">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl bg-gradient-to-br from-highlight via-accent to-accent2 bg-clip-text text-transparent">
            Let's create something that connects.
          </h2>
          <p className="text-textsecondary mt-6 max-w-md">
            Have a project, campaign or piece of content you want brought to life? Reach out below.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <a href="mailto:dreazyempire@gmail.com" className="underline underline-offset-4 hover:text-accent transition">
              Email
            </a>
            <a href="https://x.com/dreazyempire" target="_blank" className="underline underline-offset-4 hover:text-accent transition">
              X / Twitter
            </a>
            <a href="https://t.me/dreazyempire" target="_blank" className="underline underline-offset-4 hover:text-accent transition">
              Telegram
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-textsecondary text-sm border-t border-borderc">
        © {new Date().getFullYear()} Dreazy Empire. All rights reserved.
      </footer>
    </main>
  );
}
