import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Hammer, Drill, Calendar, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PLUMBING_SERVICES, getWhatsAppLink } from "@/lib/services";

const SLOTS = ["08:00", "10:00", "12:00", "14:00", "16:00"];

const Services = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(PLUMBING_SERVICES[0]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { document.title = "Services — DAVIS PLUMBING"; }, []);

  const book = async () => {
    if (!user) { navigate("/auth"); return; }
    if (!date || !address || !phone) { toast.error("Fill date, address and phone"); return; }
    setBusy(true);
    const { error } = await supabase.from("service_bookings").insert({
      user_id: user.id, 
      service_type: selectedService.id, 
      scheduled_date: date, 
      time_slot: slot, 
      address, 
      phone, 
      notes: notes || null,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else { 
      toast.success("Booked! A technician will confirm shortly."); 
      setAddress(""); setPhone(""); setNotes(""); setDate(""); 
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi, I'd like to book a ${selectedService.label} service. My location is ${address || "Nairobi"}.`;
    window.open(getWhatsAppLink(msg), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Services & Solutions</div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">Professional Plumbing</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">From emergency leaks to full installations, our vetted technicians are ready to help.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.open("tel:+254703335788")} className="gap-2">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
            <Button onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-[#20ba5a] text-white gap-2">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Select a Service</h2>
                <span className="text-xs font-mono text-muted-foreground">{PLUMBING_SERVICES.length} available</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {PLUMBING_SERVICES.map((s) => {
                  const active = selectedService.id === s.id;
                  return (
                    <button key={s.id} onClick={() => setSelectedService(s)}
                      className={`p-5 rounded-xl border text-left transition relative group ${active ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-card/50 hover:border-border/100"}`}>
                      {active && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                      <div className="font-display font-semibold mb-1">{s.label}</div>
                      <div className="text-xs text-muted-foreground mb-3 line-clamp-2">{s.description}</div>
                      <div className="text-sm font-mono font-bold text-primary">{s.price}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8 bg-card/50 p-8 rounded-2xl border border-border/60">
              <section className="space-y-4">
                <h2 className="font-display text-xl font-bold">When</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date</Label>
                    <Input id="date" type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Slot</Label>
                    <div className="flex flex-wrap gap-2">
                      {SLOTS.map((s) => (
                        <button key={s} onClick={() => setSlot(s)}
                          className={`px-3 py-1.5 rounded-md text-sm font-mono border transition ${slot === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl font-bold">Where & Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addr">Address / Location</Label>
                    <Input id="addr" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Building, street, estate…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7…" />
                  </div>
                </div>
              </section>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us more about the issue..." className="min-h-[100px]" />
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div className="p-6 rounded-xl glass border border-border/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold">Booking Summary</h2>
              </div>
              <div className="space-y-3 text-sm font-mono text-muted-foreground mb-8">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span>Service:</span>
                  <span className="text-foreground text-right">{selectedService.label}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span>Date:</span>
                  <span className="text-foreground">{date || "Not set"}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span>Slot:</span>
                  <span className="text-foreground">{slot}</span>
                </div>
                <div className="flex justify-between font-bold text-primary pt-2">
                  <span>Est. Starting:</span>
                  <span>{selectedService.price}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button onClick={book} disabled={busy} className="w-full bg-gradient-orange h-12 shadow-glow text-base">
                  {busy ? "Processing..." : "Confirm Booking"}
                </Button>
                <Button variant="outline" onClick={handleWhatsApp} className="w-full h-12 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5">
                  <MessageCircle className="mr-2 h-4 w-4" /> Book via WhatsApp
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 text-center font-mono uppercase tracking-widest">
                No upfront payment required
              </p>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="font-display font-bold mb-2">Why choose us?</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "24/7 Emergency Support",
                  "Vetted & Certified Technicians",
                  "Transparent Pricing",
                  "Satisfaction Guaranteed"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Services;
