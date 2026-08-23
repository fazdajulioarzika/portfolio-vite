// src/components/ui/toast-container.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, Construction } from "lucide-react";
import { subscribeToast, dismissToast } from "@/lib/toast";

type ToastItem = { id: number; title: string; description?: string };

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => subscribeToast(setToasts), []);

  useEffect(() => {
    toasts.forEach((t) => {
      const el = refs.current[t.id];
      if (el && !el.dataset.animated) {
        el.dataset.animated = "true";
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
        );
      }
    });
  }, [toasts]);

  const handleDismiss = (id: number) => {
    const el = refs.current[id];
    if (el) {
      gsap.to(el, {
        opacity: 0,
        y: 10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => dismissToast(id),
      });
    } else {
      dismissToast(id);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex w-[calc(100%-3rem)] max-w-sm flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          ref={(el) => {
            refs.current[t.id] = el;
          }}
          className="flex items-start gap-3 rounded-lg border border-primary/20 bg-white p-4 shadow-lg shadow-primary/10 dark:bg-neutral-900"
        >
          <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
            <Construction size={16} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-dark dark:text-white">
              {t.title}
            </p>
            {t.description && (
              <p className="mt-0.5 text-xs text-dark/60 dark:text-white/60">
                {t.description}
              </p>
            )}
          </div>
          <button
            onClick={() => handleDismiss(t.id)}
            aria-label="Tutup notifikasi"
            className="text-dark/40 transition hover:text-dark dark:text-white/40 dark:hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
