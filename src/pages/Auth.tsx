import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Hammer } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
  displayName: z.string().min(1, "Required").max(60).optional(),
});

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${mode === "signin" ? "Sign in" : "Create account"} — DAVIS`;
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) navigate("/", { replace: true }); });
  }, [mode, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, displayName: mode === "signup" ? displayName : undefined });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else { toast.success("Welcome back"); navigate("/"); }
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/`, data: { display_name: displayName } },
      });
      if (error) toast.error(error.message);
      else { toast.success("Account created — welcome!"); navigate("/"); }
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid place-items-center container py-16">
        <div className="w-full max-w-md p-8 rounded-2xl glass border border-border/60 shadow-elevated">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-md bg-gradient-orange grid place-items-center"><Hammer className="h-5 w-5 text-primary-foreground" /></div>
            <div>
              <div className="font-display text-xl font-bold">{mode === "signin" ? "Welcome back" : "Create account"}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Davis Hardware Ltd</div>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Display name</Label>
                <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={busy} className="w-full bg-gradient-orange h-11 shadow-glow">
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-sm text-muted-foreground hover:text-primary text-center">
            {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
