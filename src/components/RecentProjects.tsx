import { ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Modern Bathroom Overhaul",
    location: "Kilimani, Nairobi",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=800",
    badge: "Before & After",
    description: "Complete transformation from an old 90s style bathroom to a minimalist sanctuary."
  },
  {
    title: "Luxury Kitchen Plumbing",
    location: "Runda Estate",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
    badge: "Completed",
    description: "High-end fixture installation and custom piping for a new villa project."
  },
  {
    title: "Industrial Pipe Repair",
    location: "Mombasa Road",
    image: "https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=800",
    badge: "Emergency",
    description: "Urgent fix of high-pressure main line for a manufacturing plant."
  }
];

const RecentProjects = () => {
  return (
    <section className="container py-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
        <div className="space-y-2">
          <div className="text-[#e11d48] font-bold uppercase tracking-widest text-xs">Our Portfolio</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Recent Projects</h2>
        </div>
        <button className="text-[#e11d48] font-bold flex items-center gap-2 hover:underline uppercase text-xs tracking-widest">
          See More Work <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {PROJECTS.map((project, i) => (
          <div key={i} className="group relative bg-white border border-gray-100 overflow-hidden rounded-none shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#e11d48] text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-lg">
                {project.badge}
              </div>
            </div>
            <div className="p-8 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-[#e11d48]" />
                <div className="font-bold text-[10px] uppercase tracking-widest text-[#e11d48]">{project.location}</div>
              </div>
              <h3 className="font-black text-xl uppercase tracking-tight">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
