// src/lib/toast.ts
type ToastItem = {
  id: number;
  title: string;
  description?: string;
};

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
let listeners: Listener[] = [];
let idCounter = 0;

function emit() {
  listeners.forEach((l) => l(toasts));
}

export function showToast(
  title: string,
  description?: string,
  duration = 3500
) {
  const id = ++idCounter;
  toasts = [...toasts, { id, title, description }];
  emit();
  setTimeout(() => dismissToast(id), duration);
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function subscribeToast(listener: Listener) {
  listeners.push(listener);
  listener(toasts);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
