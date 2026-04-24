import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Truck, Zap, MapPin, Smartphone, CreditCard, Banknote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatKES } from "@/lib/products";
import { toast } from "sonner";

type Delivery = "delivery" | "same_day" | "pickup";
type Pay = "mpesa" | "card" | "cod";

const Checkout = () => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<Delivery>("delivery");
  const [pay, setPay] = useState<Pay>("mpesa");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { document.title = "Checkout — DAVIS"; }, []);
  useEffect(() => { if (!user) navigate("/auth"); }, [user, navigate]);
  useEffect(() => { if (items.length === 0) navigate("/cart"); }, [items, navigate]);

  const place = async () => {
    if (!user) return;
    if (delivery !== "pickup" && !address.trim()) { toast.error("Add a delivery address"); return; }
    if (!phone.trim()) { toast.error("Add a phone number"); return; }
    setBusy(true);
    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user.id, delivery, address: address || null, phone, notes: notes || null, total, status: "pending",
    }).select().single();
    if (error || !order) { toast.error(error?.message || "Failed to place order"); setBusy(false); return; }
    const { error: itemsErr } = await supabase.from("order_items").insert(
      items.map((i) => ({ order_id: order.id, product_id: i.id, product_name: i.name, unit_price: i.price, quantity: i.quantity }))
    );
    if (itemsErr) { toast.error(itemsErr.message); setBusy(false); return; }
    clear();
    toast.success("Order placed! We'll be in touch shortly.");
    navigate("/orders");
  };

  const Opt = ({ active, onClick, icon: Icon, label, sub }: any) => (
    <button onClick={onClick}
      className={`flex-1 p-4 rounded-xl border text-left transition ${active ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card/50 hover:border-border/100"}`}>
      <Icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <div className="font-display font-semibold text-sm">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display font-bold mb-3">Fulfilment</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <Opt active={delivery === "delivery"} onClick={() => setDelivery("delivery")} icon={Truck} label="Delivery" sub="1–2 days" />
                <Opt active={delivery === "same_day"} onClick={() => setDelivery("same_day")} icon={Zap} label="Same-day" sub="Order before 2pm" />
                <Opt active={delivery === "pickup"} onClick={() => setDelivery("pickup")} icon={MapPin} label="Pickup" sub="In-store" />
              </div>
            </section>
            <section className="space-y-3">
              <h2 className="font-display font-bold">Contact</h2>
              {delivery !== "pickup" && (
                <div className="space-y-2">
                  <Label htmlFor="addr">Delivery address</Label>
                  <Textarea id="addr" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Estate, street, building, gate…" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" />
              </div>
            </section>
            <section>
              <h2 className="font-display font-bold mb-3">Payment</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <Opt active={pay === "mpesa"} onClick={() => setPay("mpesa")} icon={Smartphone} label="M-Pesa" sub="STK push" />
                <Opt active={pay === "card"} onClick={() => setPay("card")} icon={CreditCard} label="Card" sub="Visa / Mastercard" />
                <Opt active={pay === "cod"} onClick={() => setPay("cod")} icon={Banknote} label="On delivery" sub="Cash / M-Pesa" />
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-3">
                Payment processing is not connected in this demo — orders are recorded as pending.
              </p>
            </section>
          </div>
          <aside className="h-fit p-6 rounded-xl glass border border-border/60 sticky top-24 space-y-3">
            <h2 className="font-display text-xl font-bold">Order</h2>
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground truncate pr-2">{i.quantity} × {i.name}</span>
                <span className="font-mono">{formatKES(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-border/60 pt-3 flex justify-between">
              <span className="font-display font-semibold">Total</span>
              <span className="font-mono text-xl font-bold text-gradient-orange">{formatKES(total)}</span>
            </div>
            <Button disabled={busy} onClick={place} className="w-full bg-gradient-orange h-12 shadow-glow">
              {busy ? "Placing…" : "Place order"}
            </Button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
