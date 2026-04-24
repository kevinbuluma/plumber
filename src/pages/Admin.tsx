import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatKES } from "@/lib/products";
import { toast } from "sonner";
import { Package, ShoppingBag, TrendingUp } from "lucide-react";

interface Product { id: string; name: string; category: string; price: number; stock: number; featured: boolean; }
interface Order { id: string; status: string; total: number; delivery: string; created_at: string; user_id: string; }

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { document.title = "Admin — DAVIS"; }, []);
  useEffect(() => {
    if (loading) return;
    if (!user) { navigate("/auth"); return; }
    if (!isAdmin) { toast.error("Admin access required"); navigate("/"); }
  }, [user, isAdmin, loading, navigate]);

  const load = async () => {
    const [{ data: p }, { data: o }] = await Promise.all([
      supabase.from("products").select("id,name,category,price,stock,featured").order("name"),
      supabase.from("orders").select("id,status,total,delivery,created_at,user_id").order("created_at", { ascending: false }),
    ]);
    setProducts((p as Product[]) ?? []);
    setOrders((o as Order[]) ?? []);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const updateStock = async (id: string, stock: number) => {
    const { error } = await supabase.from("products").update({ stock }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Stock updated");
  };
  const updatePrice = async (id: string, price: number) => {
    const { error } = await supabase.from("products").update({ price }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Price updated");
  };
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as Order["status"] as never }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Status updated"); load(); }
  };

  if (!isAdmin) return null;

  const revenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
  const lowStock = products.filter(p => p.stock < 30).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-display text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-5">
            <TrendingUp className="h-5 w-5 text-primary mb-2" />
            <div className="font-mono text-xs uppercase text-muted-foreground">Total revenue</div>
            <div className="font-display text-2xl font-bold text-gradient-orange">{formatKES(revenue)}</div>
          </div>
          <div className="glass rounded-xl p-5">
            <ShoppingBag className="h-5 w-5 text-primary mb-2" />
            <div className="font-mono text-xs uppercase text-muted-foreground">Orders</div>
            <div className="font-display text-2xl font-bold">{orders.length}</div>
          </div>
          <div className="glass rounded-xl p-5">
            <Package className="h-5 w-5 text-primary mb-2" />
            <div className="font-mono text-xs uppercase text-muted-foreground">Low stock items</div>
            <div className="font-display text-2xl font-bold">{lowStock}</div>
          </div>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="mt-4">
            <div className="rounded-xl border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr className="text-left font-mono text-xs uppercase text-muted-foreground">
                    <th className="p-3">Order</th><th className="p-3">Date</th><th className="p-3">Delivery</th><th className="p-3">Total</th><th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-border/60">
                      <td className="p-3 font-mono text-xs">#{o.id.slice(0, 8)}</td>
                      <td className="p-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="p-3"><Badge variant="outline" className="font-mono text-[10px] uppercase">{o.delivery.replace("_", " ")}</Badge></td>
                      <td className="p-3 font-mono">{formatKES(Number(o.total))}</td>
                      <td className="p-3">
                        <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                          <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && <div className="p-8 text-center text-muted-foreground font-mono text-sm">No orders yet.</div>}
            </div>
          </TabsContent>
          <TabsContent value="inventory" className="mt-4">
            <div className="rounded-xl border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr className="text-left font-mono text-xs uppercase text-muted-foreground">
                    <th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price (KES)</th><th className="p-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border/60">
                      <td className="p-3 font-display font-semibold">{p.name}</td>
                      <td className="p-3"><Badge variant="outline" className="font-mono text-[10px] uppercase">{p.category}</Badge></td>
                      <td className="p-3">
                        <Input type="number" defaultValue={p.price} className="h-8 w-28"
                          onBlur={(e) => { const v = Number(e.target.value); if (v !== p.price) updatePrice(p.id, v); }} />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue={p.stock} className={`h-8 w-24 ${p.stock < 30 ? "border-warning" : ""}`}
                          onBlur={(e) => { const v = Number(e.target.value); if (v !== p.stock) updateStock(p.id, v); }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
