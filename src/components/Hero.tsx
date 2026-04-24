import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MessageCircle, ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#004B50]">
      {/* Background with subtle texture and 3D depth */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1920" 
          alt="Industrial Texture" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      
      {/* 3D Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#004B50] rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10 py-20 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-none border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" /> Trusted by 5000+ Professionals
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.85]">
            Hardware <br />
            <span className="text-[#D4AF37]">Homes</span> <span className="text-white/20">&</span> Plumbing
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Nairobi's premier destination for high-end sanitary ware, industrial tools, 
            and professional plumbing solutions. Quality that builds legacies.
          </p>

          {/* Functional Modern Search Bar - Hardware Homes Inspiration */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group mt-12">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl group-hover:bg-[#D4AF37]/30 transition-all duration-500 rounded-none" />
            <div className="relative flex items-center bg-white shadow-elevated">
              <div className="pl-6 text-[#004B50]">
                <Search className="h-6 w-6" />
              </div>
              <Input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for Taps, Tiles, Pipes, Tools..."
                className="h-20 border-0 bg-transparent text-[#004B50] text-lg font-bold placeholder:text-[#004B50]/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-6"
              />
              <Button type="submit" className="h-20 px-10 bg-[#004B50] hover:bg-[#002D30] text-white font-black uppercase tracking-widest rounded-none border-l border-[#004B50]">
                Search Catalog
              </Button>
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {["PPR Pipes", "Mixers", "MDF Board", "Sanitary Ware"].map(s => (
                <button key={s} onClick={() => setQuery(s)} className="text-[10px] font-bold text-white/40 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <Button size="lg" asChild className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] bg-[#D4AF37] hover:bg-[#B8860B] text-[#004B50] rounded-none shadow-glow transition-all active:scale-95">
              <Link to="/services">Book Service</Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] border-2 border-white/20 text-white hover:bg-white/10 rounded-none transition-all active:scale-95">
              <Link to="/shop">View Catalog</Link>
            </Button>
          </div>
        </div>

        {/* Feature Icons Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 max-w-5xl mx-auto pt-12 border-t border-white/5">
          {[
            { icon: Truck, title: "Same-Day Delivery", sub: "Within Nairobi" },
            { icon: Zap, title: "Instant Setup", sub: "Plumbing services" },
            { icon: ShieldCheck, title: "2 Year Warranty", sub: "On all hardware" },
            { icon: MessageCircle, title: "24/7 Expert Support", sub: "WhatsApp & Call" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 group">
              <div className="h-14 w-14 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors">
                <item.icon className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-white font-black uppercase tracking-tight text-[11px]">{item.title}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
