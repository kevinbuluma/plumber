import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight } from "lucide-react";
import { formatKES } from "@/lib/products";
import { useEffect } from "react";

const Cart = () => {
  const { items, setQty, remove, total, count } = useCart();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Cart — Davis | Premium Plumbing & Hardware"; }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-32 text-center container">
          <div className="h-32 w-32 bg-gray-50 flex items-center justify-center mb-8 relative">
            <ShoppingBag className="h-12 w-12 text-gray-200" />
            <div className="absolute inset-0 border border-dashed border-gray-200" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#002D30]">Order List Empty</h1>
            <p className="text-muted-foreground font-medium max-w-xs mx-auto">Build your project catalog. Explore our premium hardware departments to get started.</p>
            <Button asChild className="bg-[#004B50] hover:bg-[#002D30] text-white rounded-none font-black uppercase text-[10px] tracking-widest px-10 h-14 mt-6">
              <Link to="/shop">Explore Departments</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-gray-50 border-b border-gray-100 py-16">
          <div className="container">
            <div className="font-black text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4">Review Order</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-[#002D30]">Project <span className="text-white/80 italic">Cart</span></h1>
          </div>
        </div>

        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Items in Order ({count})</span>
                <span>Subtotal</span>
              </div>
              {items.map((i) => (
                <div key={i.id} className="flex gap-8 p-8 border border-gray-100 hover:border-[#004B50] transition-colors group">
                  <div className="h-32 w-32 bg-gray-50 p-4 shrink-0">
                    <img src={i.image} alt={i.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-black text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">{i.category}</div>
                      <div className="font-black text-lg uppercase tracking-tight text-[#002D30]">{i.name}</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-gray-100 bg-gray-50 h-10 px-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#004B50] hover:bg-white" onClick={() => setQty(i.id, i.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                        <span className="font-black w-10 text-center text-[11px] text-[#004B50]">{i.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#004B50] hover:bg-white" onClick={() => setQty(i.id, i.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:underline">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-lg text-[#004B50]">{formatKES(i.price * i.quantity)}</div>
                    <div className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{formatKES(i.price)} / Unit</div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit p-10 bg-[#002D30] text-white shadow-2xl relative overflow-hidden lg:sticky lg:top-32">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Order Summary</h2>
                <div className="space-y-6">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/40">
                    <span>Subtotal</span>
                    <span>{formatKES(total)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/40">
                    <span>Delivery</span>
                    <span className="text-[#25D366]">Complimentary</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Grand Total</span>
                    <span className="text-3xl font-black text-[#D4AF37]">{formatKES(total)}</span>
                  </div>
                  <div className="pt-8">
                    <Button onClick={() => navigate("/checkout")} className="w-full h-16 bg-[#D4AF37] hover:bg-[#B8860B] text-[#004B50] rounded-none font-black uppercase tracking-[0.2em] text-[11px] shadow-xl group">
                      Proceed to Checkout <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-[9px] text-white/30 text-center mt-6 font-bold uppercase tracking-[0.2em]">Secure Checkout — Guaranteed Quality</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
