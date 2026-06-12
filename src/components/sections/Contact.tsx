import { Mail, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = `Halo, nama saya ${form.name}.\n\n${form.message}\n\nBalas ke: ${form.email}`;

    const mailtoLink = `mailto:fazda473@gmail.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      className="py-32 px-4"
      data-aos="fade-down"
      data-aos-duration="1100"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Hubungi Saya</h2>
          <p className="text-slate-400">
            Saya selalu terbuka untuk menerima pesan dari anda
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <User size={15} /> Nama
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-gray-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={15} /> Email Kamu
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@email.com"
                className="w-full bg-gray-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={15} /> Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Kerja Sama / Pertanyaan / dll"
                className="w-full bg-gray-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Pesan */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare size={15} /> Pesan
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tulis pesanmu di sini..."
                className="w-full bg-gray-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
              />
            </div>

            {/* Tombol */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              <Send size={18} /> Buka di Aplikasi Email
            </Button>
          </form>

          {/* Info */}
          <p className="text-slate-600 text-xs text-center mt-4">
            Kami akan menghubungi anda.
          </p>
        </div>
      </div>
    </section>
  );
}
