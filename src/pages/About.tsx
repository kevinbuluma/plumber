import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { ShieldCheck, Users, Target, Clock, Hammer, Award, Globe } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "About — Davis | Premium Plumbing & Hardware";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#004B50] text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="container relative z-10 text-center space-y-4">
            <div className="font-black text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]">The Davis Legacy</div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Our <span className="text-white/30 italic">Commitment</span></h1>
          </div>
        </div>

        <section className="container py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-[#D4AF37] text-[#004B50] text-[9px] font-black uppercase tracking-[0.3em]">
                Since 2010
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#002D30] leading-none">
                Building the <br />Future of <span className="text-[#004B50]">Ongata Rongai.</span>
              </h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Davis Plumbing & Hardware has evolved from a local supplier into Nairobi's most trusted 
                destination for high-end sanitary ware and industrial solutions. Located in the heart 
                of Ongata Rongai on Magadi Road, we serve contractors, architects, and homeowners 
                with equal passion.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-[#004B50]">15+</div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Years Expertise</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-[#004B50]">5000+</div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Projects Done</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Industrial Heritage" 
                className="w-full h-full object-cover shadow-elevated"
              />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-[#D4AF37] p-8 hidden md:flex flex-col justify-end">
                <Award className="h-10 w-10 text-[#004B50]" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50 py-24">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: ShieldCheck, title: "Uncompromising Quality", desc: "We only source from global leaders like Grohe, Kohler, and Bosch." },
                { icon: Globe, title: "Nairobi-Wide Support", desc: "Our technicians reach you anywhere in the city within hours." },
                { icon: Users, title: "Project Partnership", desc: "We don't just sell tools; we partner in your construction success." }
              ].map((v, i) => (
                <div key={i} className="space-y-6 group">
                  <div className="h-16 w-16 bg-[#004B50] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <v.icon className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#002D30]">{v.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="container py-32 text-center max-w-3xl mx-auto space-y-8">
          <Target className="h-12 w-12 text-[#004B50] mx-auto" />
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#002D30]">Our Mission</h2>
          <p className="text-xl text-muted-foreground italic font-medium leading-relaxed">
            "To provide Kenya with the highest standard of plumbing engineering and hardware supplies, 
            blending modern global designs with local reliability and craftsmanship."
          </p>
          <div className="pt-8 flex justify-center gap-4">
            <div className="h-1 w-12 bg-[#D4AF37]" />
            <div className="h-1 w-4 bg-[#D4AF37]/30" />
            <div className="h-1 w-12 bg-[#D4AF37]" />
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default About;
