// src/components/ChatWidget.tsx
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "user" | "model"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Halo! Tanya-tanya soal saya boleh banget 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(1), // tanpa pesan sambutan awal
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Maaf, terjadi kesalahan. Coba lagi ya." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {open && (
        <div className="mb-3 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-xl border border-primary/20 bg-white shadow-2xl shadow-primary/20 dark:bg-neutral-900">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span className="text-sm font-semibold">Tanya AI Saya</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Tutup chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  m.role === "user" ? "flex-row-reverse text-right" : ""
                }`}
              >
                <div
                  className={`mt-0.5 rounded-full p-1.5 ${
                    m.role === "user"
                      ? "bg-primary/10 text-primary"
                      : "bg-dark/10 text-dark dark:bg-white/10 dark:text-white"
                  }`}
                >
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-dark/5 text-dark dark:bg-white/10 dark:text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-dark/50 dark:text-white/50">
                <Bot size={14} /> mengetik...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-primary/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tulis pertanyaan..."
              className="flex-1 rounded-full border border-primary/20 bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:text-white"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              aria-label="Kirim pesan"
              className="rounded-full bg-primary p-2 text-white transition hover:opacity-90 disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Buka chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
