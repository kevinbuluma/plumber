import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your DAVIS assistant. Ask me about materials, compatible parts, or help planning your project." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });
      if (resp.status === 429) { toast.error("Too many requests — please wait a moment."); setBusy(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted. Please add credits in workspace settings."); setBusy(false); return; }
      if (!resp.ok || !resp.body) throw new Error("AI failed");

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) setMessages((m) => {
              const copy = [...m]; copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + delta };
              return copy;
            });
          } catch { buf = line + "\n" + buf; break; }
        }
      }
    } catch (e) {
      toast.error("Couldn't reach the assistant.");
    } finally { setBusy(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-orange shadow-glow flex items-center justify-center hover:scale-105 transition-transform animate-pulse-glow"
        aria-label="AI assistant"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageSquare className="h-6 w-6 text-primary-foreground" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-2rem))] h-[520px] glass rounded-2xl shadow-elevated border border-border flex flex-col animate-slide-up">
          <div className="flex items-center gap-2 p-4 border-b border-border/60">
            <Sparkles className="h-4 w-4 text-primary" />
            <div>
              <div className="font-display font-semibold text-sm">DAVIS Assistant</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">AI-powered</div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>{m.content || "…"}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/60 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about pipes, tools, sizes…"
              disabled={busy}
              className="flex-1 bg-input rounded-md px-3 py-2 text-sm outline-none border border-border focus:border-primary transition"
            />
            <Button onClick={send} disabled={busy} size="icon" className="bg-gradient-orange">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
