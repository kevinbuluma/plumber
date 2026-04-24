import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact — Davis | Premium Plumbing & Hardware";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#004B50] text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="container relative z-10 text-center space-y-4">
            <div className="font-black text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]">Global Support</div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Get In <span className="text-white/30 italic">Touch</span></h1>
          </div>
        </div>

        <section className="container py-24">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-[#004B50] text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em]">
                  24/7 Availability
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-[#002D30] leading-none">
                  Let's Discuss <br /><span className="text-[#004B50]/30 italic">Your Project.</span>
                </h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-md">
                  Whether you need a single valve or a full industrial fit-out, 
                  our engineers and sales team are here to provide professional consultation.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: MapPin, title: "Headquarters", info: "Magadi Rd, Ongata Rongai" },
                  { icon: Phone, title: "Main Hotline", info: "+254 703 335 788" },
                  { icon: Mail, title: "Email Support", info: "info@davisplumbing.co.ke" },
                  { icon: Clock, title: "Business Hours", info: "Mon - Sat: 08:00 - 18:00" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 border border-gray-100 group hover:border-[#004B50] transition-colors">
                    <div className="h-12 w-12 bg-[#f3f4f6] flex items-center justify-center group-hover:bg-[#004B50] transition-colors">
                      <item.icon className="h-5 w-5 text-[#004B50] group-hover:text-[#D4AF37]" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.title}</div>
                      <div className="text-sm font-black text-[#002D30]">{item.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#002D30] p-10 md:p-16 shadow-elevated relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Project Inquiry</h3>
                  <p className="text-white/40 text-sm font-medium">Fill the form below and an expert will call you back.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Your Name</label>
                      <Input placeholder="John Doe" className="h-14 bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-[#D4AF37]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="h-14 bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Project Type</label>
                    <Input placeholder="e.g. Bathroom Renovation" className="h-14 bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Message</label>
                    <Textarea placeholder="Tell us about your requirements..." className="min-h-[150px] bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-[#D4AF37]" />
                  </div>
                  <Button className="w-full h-16 bg-[#D4AF37] hover:bg-[#B8860B] text-[#004B50] font-black uppercase tracking-[0.2em] text-[11px] rounded-none group">
                    Send Inquiry <Send className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-[500px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818625291416!2d36.8228!3d-1.2841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDMuMiJTIDM2wrA0OScyMi4xIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
            className="w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#004B50] text-white p-6 shadow-2xl space-y-2 pointer-events-none">
            <div className="font-black uppercase tracking-widest text-xs">Davis Headquarters</div>
            <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Magadi Rd, Ongata Rongai</div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Contact;
