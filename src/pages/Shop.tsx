import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import ProductCard, { ProductCardData } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const cat = params.get("category") ?? "all";
  const searchParam = params.get("search") ?? "";
  
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [q, setQ] = useState(searchParam);

  useEffect(() => { 
    document.title = "Davis | Hardware & Plumbing Shop"; 
  }, []);

  useEffect(() => {
    let qry = supabase.from("products").select("id,slug,name,price,stock,category,image_url").order("featured", { ascending: false });
    if (cat !== "all") qry = qry.eq("category", cat);
    qry.then(({ data }) => setProducts((data as ProductCardData[]) ?? []));
  }, [cat]);

  // Handle URL search param sync
  useEffect(() => {
    if (searchParam) setQ(searchParam);
  }, [searchParam]);

  const filtered = products.filter((p) => 
    p.name.toLowerCase().includes(q.toLowerCase()) || 
    p.category.toLowerCase().includes(q.toLowerCase())
  );

  const setCat = (c: string) => setParams(c === "all" ? {} : { category: c });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Shop Header */}
        <div className="bg-[#004B50] text-white py-16">
          <div className="container">
            <div className="font-black text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4">Catalog</div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Hardware <span className="text-white/30 italic">Shop</span></h1>
          </div>
        </div>

        <div className="container py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 space-y-8 h-fit lg:sticky lg:top-32">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#004B50] font-black uppercase text-xs tracking-widest">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Quick search..." 
                    value={q} 
                    onChange={(e) => setQ(e.target.value)} 
                    className="pl-10 h-12 border-gray-100 bg-gray-50 rounded-none focus-visible:ring-[#004B50]" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Categories</div>
                <Button 
                  variant="ghost" 
                  onClick={() => setCat("all")}
                  className={`w-full justify-start rounded-none h-10 font-bold uppercase text-[10px] tracking-widest ${cat === "all" ? "bg-[#004B50] text-white" : "hover:bg-gray-50"}`}
                >
                  All Departments
                </Button>
                {CATEGORIES.map((c) => (
                  <Button 
                    key={c.slug} 
                    variant="ghost" 
                    onClick={() => setCat(c.slug)}
                    className={`w-full justify-start rounded-none h-10 font-bold uppercase text-[10px] tracking-widest ${cat === c.slug ? "bg-[#004B50] text-white" : "hover:bg-gray-50"}`}
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Showing {filtered.length} products
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-32 space-y-4">
                  <div className="text-4xl font-black text-gray-100 uppercase tracking-tighter">No Results</div>
                  <p className="text-muted-foreground font-medium">Try adjusting your filters or search terms.</p>
                  <Button onClick={() => {setQ(""); setCat("all");}} variant="link" className="text-[#004B50] font-black uppercase text-xs tracking-widest">
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Shop;
