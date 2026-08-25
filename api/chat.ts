// api/chat.ts
import { GoogleGenAI } from "@google/genai";

// PENTING: runtime "edge" wajib ada di sini, karena handler-nya pakai
// signature Web API (Request/Response dengan .json()). Kalau baris ini
// dihapus, Vercel jalankan sebagai Node.js function klasik (req, res)
// dan req.json() tidak akan ada -> error "req.json is not a function".
export const config = {
  runtime: "edge",
};

const SYSTEM_PROMPT = (context: string) => `
Kamu adalah asisten AI di website portofolio. Jawab pertanyaan HANYA berdasarkan informasi berikut tentang pemilik portofolio. Jika informasi tidak ada di dalam data, katakan dengan sopan bahwa kamu tidak punya informasi tersebut. Jawab singkat, ramah, dan gunakan bahasa yang sama dengan pertanyaan pengguna.

=== DATA PROFIL ===
${context}
=== AKHIR DATA ===
`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { message, history = [] } = await req.json();
  const { PROFILE_CONTEXT } = await import("../src/data/profile-context");

  const apiKey = process.env.GEMINI_API_KEY;

  console.log(
    "API key ada?",
    apiKey ? `ya, panjang ${apiKey.length}` : "TIDAK ADA / undefined"
  );

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        reply: "Konfigurasi server belum lengkap (API key tidak ditemukan).",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT(PROFILE_CONTEXT) }] },
      {
        role: "model",
        parts: [
          { text: "Baik, saya siap menjawab pertanyaan seputar profil ini." },
        ],
      },
      ...history.map((h: { role: string; text: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });

    console.log("=== GEMINI SDK DEBUG ===");
    console.log("response.text:", response.text);
    console.log("========================");

    const reply =
      response.text ??
      "Maaf, saya sedang tidak bisa menjawab. Coba lagi sebentar lagi.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("=== GEMINI SDK ERROR ===");
    console.error(err);
    console.error("========================");

    return new Response(
      JSON.stringify({
        reply:
          "Maaf, terjadi kesalahan pada server AI. Coba lagi sebentar lagi.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
