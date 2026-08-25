// api/chat.ts
import { GoogleGenAI } from "@google/genai";
import { PROFILE_CONTEXT } from "./data/profile-context";

// Import statis di atas (bukan dynamic import dari "../src/...") supaya
// Vercel bisa mendeteksi dan ikut membundel file ini ke serverless
// function. File-nya juga sengaja ditaruh di dalam folder api/ (bukan
// src/), karena src/ dianggap milik build frontend dan tidak otomatis
// ikut ter-bundle ke function.

const SYSTEM_PROMPT = (context: string) => `
Kamu adalah asisten AI di website portofolio. Jawab pertanyaan HANYA berdasarkan informasi berikut tentang pemilik portofolio. Jika informasi tidak ada di dalam data, katakan dengan sopan bahwa kamu tidak punya informasi tersebut. Jawab singkat, ramah, dan gunakan bahasa yang sama dengan pertanyaan pengguna.

=== DATA PROFIL ===
${context}
=== AKHIR DATA ===
`;

type SimpleReq = {
  method?: string;
  body?: { message?: string; history?: { role: string; text: string }[] };
};

type SimpleRes = {
  status: (code: number) => SimpleRes;
  json: (data: unknown) => void;
  send: (data: unknown) => void;
};

export default async function handler(req: SimpleReq, res: SimpleRes) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const { message = "", history = [] } = req.body ?? {};

  const apiKey = process.env.GEMINI_API_KEY;

  console.log(
    "API key ada?",
    apiKey ? `ya, panjang ${apiKey.length}` : "TIDAK ADA / undefined"
  );

  if (!apiKey) {
    res.status(200).json({
      reply: "Konfigurasi server belum lengkap (API key tidak ditemukan).",
    });
    return;
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
      ...history.map((h) => ({
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

    res.status(200).json({ reply });
  } catch (err) {
    console.error("=== GEMINI SDK ERROR ===");
    console.error(err);
    console.error("========================");

    res.status(200).json({
      reply: "Maaf, terjadi kesalahan pada server AI. Coba lagi sebentar lagi.",
    });
  }
}
