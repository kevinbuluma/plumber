import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AIChat from "@/components/AIChat";
import ProductCard, { ProductCardData } from "@/components/ProductCard";
import RecentProjects from "@/components/RecentProjects";
import Testimonials from "@/components/Testimonials";
import { CATEGORIES, categoryImage } from "@/lib/products";
import { Truck, Wrench, MapPin, Zap, Smartphone, CreditCard, Clock, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { PLUMBING_SERVICES, getWhatsAppLink } from "@/lib/services";

const Index = () => {
  const [featured, setFeatured] = useState<ProductCardData[]>([]);

  useEffect(() => {
    document.title = "Davis | Premium Plumbing & Hardware Solutions";
    supabase.from("products").select("id,slug,name,price,stock,category,image_url").eq("featured", true).limit(8)
      .then(({ data }) => setFeatured((data as ProductCardData[]) ?? []));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Premium Trust Banner */}
        <div className="bg-[#002D30] text-[#D4AF37] py-4 border-y border-[#D4AF37]/10">
          <div className="container flex items-center justify-between overflow-hidden">
            <div className="flex animate-pulse-glow items-center gap-10 whitespace-nowrap">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-3"><div className="h-2 w-2 bg-[#D4AF37] rotate-45" /> Official Distributor: Grohe & Kohler</span>
                  <span className="flex items-center gap-3"><div className="h-2 w-2 bg-[#D4AF37] rotate-45" /> Certified Master Plumbers</span>
                  <span className="flex items-center gap-3"><div className="h-2 w-2 bg-[#D4AF37] rotate-45" /> 24-Hour Emergency Response</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Categories Section - Hardware Homes Inspiration */}
        <section className="py-24 bg-[#f3f4f6] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#004B50]/5 -skew-x-12 translate-x-1/2" />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 bg-[#004B50] text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em]">
                  Departments
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#002D30] leading-none">
                  Project <br /><span className="text-[#004B50]/30 italic">Categories</span>
                </h2>
              </div>
              <div className="max-w-md text-right text-muted-foreground text-sm font-medium leading-relaxed">
                Explore our curated selection of premium hardware and specialized 
                plumbing services tailored for both residential and commercial projects.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Sanitary Ware", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", color: "#004B50" },
                { label: "Construction Tools", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", color: "#D4AF37" },
                { label: "Tiles & Marble", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", color: "#004B50" },
                { label: "Electrical Fix", image: "https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=800", color: "#004B50" },
              ].map((cat, i) => (
                <div key={i} className="group relative aspect-[4/5] overflow-hidden bg-black shadow-elevated transition-all duration-500 hover:-translate-y-2">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Browse Project</div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{cat.label}</h3>
                    <div className="h-1 w-12 bg-[#D4AF37] mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                  <Link to="/shop" className="absolute inset-0 z-20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services - Hardware Homes 3D Grid Inspiration */}
        <section className="bg-white py-32">
          <div className="container">
            <div className="flex items-center gap-4 mb-20">
              <div className="h-px flex-1 bg-gray-100" />
              <div className="text-center px-10 space-y-2">
                <div className="text-[#004B50] font-black uppercase tracking-[0.4em] text-[10px]">Professional Expertise</div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-[#002D30]">Our Core Services</h2>
              </div>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {PLUMBING_SERVICES.slice(0, 10).map((service) => (
                <div key={service.id} className="group flex flex-col bg-white border border-gray-100 p-2 shadow-sm hover:shadow-elevated transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative bg-gray-50 mb-6">
                    <img src={service.image} alt={service.label} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur shadow-md transform rotate-45 group-hover:rotate-0 transition-transform">
                      <Wrench className="h-5 w-5 text-[#004B50] -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                  <div className="px-4 pb-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-black text-[11px] uppercase tracking-wider text-[#002D30] mb-2 line-clamp-1">{service.label}</h3>
                      <p className="text-muted-foreground text-[10px] font-medium leading-relaxed line-clamp-2">{service.description}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="text-[10px] font-black text-[#004B50]">{service.price}</div>
                      <a 
                        href={getWhatsAppLink(`Hi, I'd like to book: ${service.label}`)}
                        target="_blank"
                        className="p-3 bg-[#004B50] text-white hover:bg-[#002D30] transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RecentProjects />

        {/* Catalog Section - Clean 3D Style */}
        <section className="container py-32 border-t border-gray-50">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <div className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px]">Premium Hardware</div>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-[#002D30]">Global <span className="text-gray-300">Catalog</span></h2>
            </div>
            <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#004B50]">
              <span className="group-hover:mr-2 transition-all">Explore Whole Shop</span>
              <div className="h-10 w-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#004B50] group-hover:text-white transition-all">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        <Testimonials />

        {/* Global CTA - Hardware Homes Style */}
        <section className="py-32 bg-[#004B50] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto bg-[#002D30] p-12 md:p-20 shadow-2xl relative">
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#D4AF37] opacity-20 blur-3xl" />
              <div className="text-center space-y-8">
                <div className="text-[#D4AF37] font-black uppercase tracking-[0.5em] text-[10px]">Let's Build Together</div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
                  Expert Solutions <br />For Every <span className="text-[#D4AF37]">Budget</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto text-sm font-medium leading-relaxed">
                  Join 1000+ happy clients in Nairobi. From minor leak repairs to full commercial fit-outs, Davis is your lifelong project partner.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <a href="tel:+254703335788" className="h-16 px-12 bg-white text-[#004B50] hover:bg-[#D4AF37] hover:text-[#002D30] font-black uppercase tracking-widest text-[11px] flex items-center justify-center transition-all shadow-xl">
                    Call Technician
                  </a>
                  <a href={getWhatsAppLink("Hello! I'd like a quote for a plumbing project.")} target="_blank" className="h-16 px-12 border-2 border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[11px] flex items-center justify-center transition-all">
                    WhatsApp Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
