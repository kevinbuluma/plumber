import { Hammer, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#002D30] text-white pt-32 pb-12">
    <div className="container grid gap-16 md:grid-cols-4 pb-20 border-b border-white/5">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center bg-[#D4AF37] shadow-lg transform rotate-12">
            <Hammer className="text-[#004B50] h-6 w-6" />
          </div>
          <span className="font-black text-3xl uppercase tracking-tighter">Davis</span>
        </div>
        <p className="text-sm text-white/40 leading-relaxed font-medium">
          The ultimate destination for premium hardware, global sanitary brands, 
          and expert plumbing services in Kenya. Building with excellence since 2010.
        </p>
        <div className="flex gap-6">
          {[Facebook, Instagram, Twitter].map((Icon, i) => (
            <div key={i} className="h-10 w-10 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#004B50] transition-all cursor-pointer">
              <Icon className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#D4AF37] mb-10">Our Departments</h4>
        <ul className="space-y-5 text-[11px] font-black text-white/60 uppercase tracking-widest">
          {["Sanitary Ware", "Industrial Tools", "Tiles & Marble", "Project Support"].map(item => (
            <li key={item}><Link to="/shop" className="hover:text-[#D4AF37] transition-colors flex items-center gap-3 group"><ChevronRight className="h-3 w-3 text-[#D4AF37]/40 group-hover:translate-x-1 transition-transform" /> {item}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#D4AF37] mb-10">Quick Support</h4>
        <ul className="space-y-5 text-[11px] font-black text-white/60 uppercase tracking-widest">
          {["Store Location", "Book Technician", "Order Tracking", "Refund Policy"].map(item => (
            <li key={item}><Link to={item === "Book Technician" ? "/services" : "/visit"} className="hover:text-[#D4AF37] transition-colors flex items-center gap-3 group"><ChevronRight className="h-3 w-3 text-[#D4AF37]/40 group-hover:translate-x-1 transition-transform" /> {item}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#D4AF37] mb-10">Contact Info</h4>
        <ul className="space-y-6 text-sm font-medium text-white/60">
          <li className="flex items-start gap-4 group">
            <Phone className="h-5 w-5 text-[#D4AF37] shrink-0" />
            <div>
              <a href="tel:+254703335788" className="text-white hover:text-[#D4AF37] transition-colors block font-black">+254 703 335 788</a>
              <span className="text-[9px] uppercase tracking-widest block mt-1 opacity-50">Main Hotline</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-[#D4AF37] shrink-0" />
            <a href="mailto:info@davisplumbing.co.ke" className="text-white hover:text-[#D4AF37] transition-colors block font-black">info@davisplumbing.co.ke</a>
          </li>
          <li className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0" />
            <span className="leading-relaxed font-bold">Sheikh Karume Rd, Nairobi Central, Kenya</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="container pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="font-bold text-[9px] uppercase tracking-[0.4em] text-white/20">
        © {new Date().getFullYear()} Davis Plumbing & Hardware Premium. Verified by Professionals.
      </div>
      <div className="flex gap-10 font-bold text-[9px] uppercase tracking-[0.3em] text-white/20">
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Sitemap</a>
      </div>
    </div>
  </footer>
);

export default Footer;
