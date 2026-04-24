import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { MapPin, Clock, Users, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const hours = [
  { d: "Mon — Fri", t: "07:00 — 19:00" },
  { d: "Saturday", t: "08:00 — 18:00" },
  { d: "Sunday", t: "09:00 — 16:00" },
];

const peak = [
  { h: "08", v: 30 }, { h: "10", v: 65 }, { h: "12", v: 90 }, { h: "14", v: 70 },
  { h: "16", v: 55 }, { h: "18", v: 40 },
];

const Visit = () => {
  useEffect(() => { document.title = "Visit — Davis | Premium Plumbing & Hardware"; }, []);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-[#004B50] text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="container relative z-10 text-center space-y-4">
            <div className="font-black text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]">Find Us</div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Visit Our <span className="text-white/30 italic">Store</span></h1>
          </div>
        </div>

        <div className="container py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="rounded-none overflow-hidden border border-gray-100 shadow-elevated aspect-square lg:aspect-auto bg-gray-50 relative group">
                <iframe
                  title="Davis Hardware Ltd location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=36.75%2C-1.40%2C36.77%2C-1.39&layer=mapnik"
                  className="w-full h-full min-h-[500px] grayscale transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[#004B50] text-white p-6 shadow-2xl flex items-center justify-between">
                  <div>
                    <div className="font-black uppercase tracking-tighter text-lg">Magadi Rd</div>
                    <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mt-1">Ongata Rongai, Kenya</div>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none h-12 gap-2 uppercase font-black text-[10px] tracking-widest">
                    <Navigation className="h-4 w-4" /> Get Directions
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-[#002D30]">Store Schedule</h2>
                <div className="bg-gray-50 p-8 space-y-6">
                  <div className="flex items-center gap-3 text-[#004B50]">
                    <Clock className="h-5 w-5" />
                    <span className="font-black uppercase tracking-[0.2em] text-xs">Opening Hours</span>
                  </div>
                  <div className="space-y-4">
                    {hours.map((h) => (
                      <div key={h.d} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                        <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{h.d}</span>
                        <span className="font-black text-sm text-[#002D30]">{h.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-[#002D30]">Busy Times</h2>
                  <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-[#004B50]" /> Live Activity
                  </div>
                </div>
                <div className="bg-[#002D30] p-8">
                  <div className="flex items-end gap-3 h-40">
                    {peak.map((p) => (
                      <div key={p.h} className="flex-1 flex flex-col items-center gap-3 group">
                        <div className="w-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37] transition-all duration-500 relative"
                          style={{ height: `${p.v}%` }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                            {p.v}%
                          </div>
                        </div>
                        <div className="font-black text-[9px] text-white/40 uppercase tracking-widest">{p.h}:00</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 text-[10px] text-white/30 font-bold uppercase tracking-widest text-center italic">
                    Fastest service usually before 10:00 AM daily.
                  </p>
                </div>
              </div>

              <a href="tel:+254703335788" className="flex items-center justify-between p-8 bg-gray-50 border-l-4 border-[#004B50] group hover:bg-[#004B50] transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-[#004B50] flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                    <Phone className="h-6 w-6 text-[#D4AF37] group-hover:text-[#004B50]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white/60 transition-colors">Call Main Store</div>
                    <div className="text-xl font-black text-[#002D30] group-hover:text-white transition-colors tracking-tight">+254 703 335 788</div>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-[#004B50] group-hover:text-white group-hover:translate-x-2 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

// ChevronRight was not imported, let's fix that
import { ChevronRight } from "lucide-react";

export default Visit;
