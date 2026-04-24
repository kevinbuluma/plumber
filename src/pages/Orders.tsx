import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatKES } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface OrderRow {
  id: string; status: string; total: number; delivery: string; created_at: string;
  order_items: { id: string; product_name: string; quantity: number; unit_price: number }[];
}

const statusColor: Record<string, string> = {
  pending: "bg-warning/20 text-warning border-warning/40",
  confirmed: "bg-primary/20 text-primary border-primary/40",
  processing: "bg-primary/20 text-primary border-primary/40",
  shipped: "bg-primary/20 text-primary border-primary/40",
  delivered: "bg-success/20 text-success border-success/40",
  cancelled: "bg-destructive/20 text-destructive border-destructive/40",
};

const Orders = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const navigate = useNavigate();

  useEffect(() => { document.title = "Orders — DAVIS"; }, []);
  useEffect(() => { if (!loading && !user) navigate("/auth"); }, [user, loading, navigate]);
  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("id,status,total,delivery,created_at,order_items(id,product_name,quantity,unit_price)").order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data as OrderRow[]) ?? []));
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-display text-4xl font-bold mb-8">Your orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">No orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="p-5 rounded-xl glass border border-border/60">
                <div className="flex flex-wrap items-center gap-3 justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8)}</div>
                    <div className="font-mono text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                  </div>
                  <Badge variant="outline" className={`font-mono text-[10px] uppercase ${statusColor[o.status] ?? ""}`}>{o.status}</Badge>
                </div>
                <div className="space-y-1 text-sm border-t border-border/60 pt-3">
                  {o.order_items.map((i) => (
                    <div key={i.id} className="flex justify-between">
                      <span className="text-muted-foreground">{i.quantity} × {i.product_name}</span>
                      <span className="font-mono">{formatKES(Number(i.unit_price) * i.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/60 mt-3 pt-3 flex justify-between">
                  <span className="font-mono text-xs text-muted-foreground uppercase">{o.delivery.replace("_", " ")}</span>
                  <span className="font-mono font-bold text-gradient-orange">{formatKES(Number(o.total))}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
