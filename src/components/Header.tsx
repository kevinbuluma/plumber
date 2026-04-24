import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Hammer, LogOut, LayoutDashboard, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="w-full z-50">
      {/* Top Professional Bar */}
      <div className="bg-[#002D30] text-white/80 py-2.5 border-b border-white/5">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <a href="tel:+254703335788" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
              <Phone className="h-3 w-3 text-[#D4AF37]" /> +254 703 335 788
            </a>
            <a href="mailto:info@davisplumbing.co.ke" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
              <Mail className="h-3 w-3 text-[#D4AF37]" /> info@davisplumbing.co.ke
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-[#D4AF37]" /> Sheikh Karume Rd, Nairobi
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <Facebook className="h-3 w-3 cursor-pointer hover:text-[#D4AF37] transition-colors" />
            <Instagram className="h-3 w-3 cursor-pointer hover:text-[#D4AF37] transition-colors" />
            <Twitter className="h-3 w-3 cursor-pointer hover:text-[#D4AF37] transition-colors" />
            <div className="h-3 w-px bg-white/10 mx-1" />
            <button onClick={() => navigate("/auth")} className="hover:text-white transition-colors">Login / Register</button>
          </div>
        </div>
      </div>

      {/* Main Premium Bar */}
      <div className="bg-[#004B50] py-5 sticky top-0 shadow-elevated">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="h-12 w-12 flex items-center justify-center bg-[#D4AF37] shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
              <Hammer className="text-[#004B50] h-7 w-7" />
            </div>
            <div className="text-white">
              <div className="font-display text-3xl font-black tracking-tight uppercase leading-none">Davis</div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] mt-1">Plumbing & Hardware</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {["Home", "Services", "Shop", "About", "Contact"].map((link) => (
              <NavLink
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] ${
                    isActive ? "text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1" : "text-white"
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="relative text-white hover:bg-white/5">
              <ShoppingCart className="h-6 w-6" />
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-[#D4AF37] text-[#004B50] border-0 text-[10px] font-black">
                  {count}
                </Badge>
              )}
            </Button>
            
            {user && (
              <Button variant="ghost" size="icon" onClick={() => signOut()} className="text-white hover:bg-white/5">
                <LogOut className="h-6 w-6" />
              </Button>
            )}
            
            {!user && (
              <Button onClick={() => navigate("/auth")} className="bg-[#D4AF37] text-[#004B50] hover:bg-[#B8860B] font-black uppercase text-[10px] tracking-[0.2em] px-8 h-12">
                Order Online
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
