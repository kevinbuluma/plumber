import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, ChevronLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { resolveImage, formatKES } from "@/lib/products";
import { toast } from "sonner";

interface Product {
  id: string; slug: string; name: string; description: string | null;
  price: number; stock: number; category: string; image_url: string | null;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [p, setP] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    if (!slug) return;
    supabase.from("products").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => {
        setP(data as Product | null);
        if (data) document.title = `${data.name} — Davis Hardware`;
      });
  }, [slug]);

  if (!p) return (<><Header /><main className="container py-32 text-center text-muted-foreground uppercase font-black tracking-widest text-xs">Accessing Catalog...</main><Footer /></>);

  const img = resolveImage(p.image_url, p.category);
  const inStock = p.stock > 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Detail Header */}
        <div className="bg-gray-50 border-b border-gray-100 py-6">
          <div className="container">
            <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-[#004B50] transition-colors">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </Link>
          </div>
        </div>

        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="relative aspect-square bg-gray-50 border border-gray-100 p-8 shadow-elevated">
              <img src={img} alt={p.name} className="w-full h-full object-contain transition-transform duration-700 hover:scale-110" />
              <div className="absolute top-8 left-8">
                <Badge className="bg-[#004B50] text-[#D4AF37] border-0 rounded-none font-black uppercase text-[10px] tracking-widest px-4 py-1.5">
                  {p.category}
                </Badge>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="font-black text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">Premium Hardware</div>
                <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#002D30] leading-none">{p.name}</h1>
                <div className="text-3xl font-black text-[#004B50] pt-4">{formatKES(Number(p.price))}</div>
              </div>

              <div className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</div>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {p.description || "No specific description available. This premium hardware item is built to industrial standards for maximum durability and performance."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-6">
                <div className="flex items-center border-2 border-gray-100 bg-gray-50 h-16 px-2">
                  <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} className="hover:bg-white text-[#004B50]"><Minus className="h-4 w-4" /></Button>
                  <span className="font-black w-12 text-center text-[#004B50]">{qty}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} className="hover:bg-white text-[#004B50]"><Plus className="h-4 w-4" /></Button>
                </div>
                <Button
                  size="lg" disabled={!inStock}
                  onClick={() => { add({ id: p.id, name: p.name, price: Number(p.price), image: img, category: p.category }, qty); toast.success(`Added ${qty} × ${p.name}`); }}
                  className="bg-[#004B50] hover:bg-[#002D30] text-white flex-1 h-16 rounded-none font-black uppercase tracking-[0.2em] text-[11px] shadow-xl">
                  <ShoppingCart className="mr-3 h-5 w-5" /> {inStock ? "Add to Order" : "Sold Out"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                {[
                  { icon: Truck, t: "Same-day", s: "Delivery" },
                  { icon: Shield, t: "Genuine", s: "Warranty" },
                  { icon: RotateCcw, t: "Expert", s: "Install" },
                ].map(({ icon: I, t, s }) => (
                  <div key={t} className="space-y-2">
                    <I className="h-5 w-5 text-[#D4AF37]" />
                    <div className="font-black uppercase tracking-tight text-[11px] text-[#002D30]">{t}</div>
                    <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">{s}</div>
                  </div>
                ))}
              </div>

              <div className="font-black text-[9px] uppercase tracking-[0.3em] text-[#004B50] pt-6 flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${inStock ? 'bg-[#25D366]' : 'bg-red-500'}`} />
                {inStock ? `${p.stock} Units Available in Store` : "Currently unavailable"}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default ProductDetail;
