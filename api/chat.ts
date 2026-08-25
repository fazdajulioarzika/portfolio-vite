// api/chat.ts
import { GoogleGenAI } from "@google/genai";

// PROFILE_CONTEXT ditaruh LANGSUNG di sini (bukan import dari file lain),
// supaya tidak ada masalah resolusi modul antar-file di runtime Node ESM
// Vercel. Kalau mau update datanya, edit langsung di bawah ini.
const PROFILE_CONTEXT = `
=== FAKTA CEPAT ===
Nama: Fazda Julio Arzika
Email: fazda473@gmail.com
Telepon/WhatsApp: +62 858 2626 8379
Lokasi: Pekalongan, Jawa Tengah, Indonesia
LinkedIn: https://www.linkedin.com/in/fazda-julio-arzika-a35737292/
Portofolio: https://fazdajulioarzika-portfolio.vercel.app/
Status: Fresh graduate Informatika (lulus 2025)
IPK Sarjana: 3.81

=== RINGKASAN PROFIL ===
Saya Fazda Julio Arzika, fresh graduate Informatika dengan keterampilan dalam
pengembangan web, dukungan teknisi TI, dan administrasi jaringan. Saya memiliki
pemahaman yang baik tentang sistem basis data, troubleshooting perangkat keras
dan jaringan, serta pengembangan aplikasi berbasis web. Saya juga tersertifikasi
dalam manajemen proyek, SQL, administrator jaringan muda, dan cloud computing.
Saya pernah menjalani magang dengan pengalaman membuat website company profile
sebagai salah satu proyek utama saya.

=== PENDIDIKAN ===

ITSNU Pekalongan | Sarjana Komputer | IPK 3.81 | 2021 - 2025
Selama menempuh pendidikan di ITSNU Pekalongan, saya aktif terlibat dalam
berbagai kegiatan di luar akademis, khususnya di dunia e-sport. Saya turut
menjadi bagian dari organisasi e-sport di kampus, yang menjadi platform untuk
mengembangkan keterampilan sosial, kepemimpinan, dan kerja sama tim. Saya juga
memiliki pengalaman sebagai anggota kepanitiaan dalam berbagai kegiatan kampus,
yang memperkaya wawasan saya dalam mengelola acara dan bekerja dalam tim.

SMK N 1 Kedungwuni | Teknik Komputer Jaringan | Nilai Akhir 87.64 | 2018 - 2021
Selama menjalani pendidikan di SMKN 1 Kedungwuni, saya berhasil mencapai
berbagai pencapaian di bidang teknologi informasi, salah satunya sertifikat
Network Administrator Muda dari Lembaga Sertifikasi Profesi (LSP), yang
mencerminkan kompetensi teknis saya dalam mengelola jaringan.

=== PENGALAMAN KERJA / MAGANG ===

LPK - LKP Dewa Computer, Pekalongan
Posisi: Web Developer Intern
Periode: Januari - Maret 2024
- Membuat dan mengembangkan website company profile menggunakan Laravel dan
  Tailwind CSS.
- Berkolaborasi dengan tim untuk merancang tampilan website yang responsif dan
  user-friendly.
- Mengimplementasikan fitur dasar seperti halaman profil perusahaan, kontak,
  dan layanan.

Balai Pemasyarakatan Kelas II Pekalongan, Pekalongan
Posisi: General Affair - Program Maganghub Kemnaker Angkatan I
Periode: November 2025 - Mei 2026
- Mengelola operasional, aset, dan fasilitas kantor untuk mendukung
  kelancaran operasional kantor.
- Melakukan pembuatan dan pengarsipan dokumen kantor sesuai format yang
  berlaku.
- Mengimplementasikan aplikasi layanan dan bimbingan untuk mempermudah
  pekerjaan pegawai.

=== SERTIFIKASI ===
- Assisten Pengembang Web, LSP BBPVP Semarang - BNSP, 2026
- Network Administrator Muda, LSP Komputer - BNSP, Nomor ICT 2940008752, 2021
- Belajar Dasar Manajemen Proyek, Dicoding Indonesia, Nomor N9ZO8JMQRXG5, 2023
- Belajar Dasar Structured Query Language, Dicoding Indonesia, Nomor
  JLX1DEKEGZ72, 2023
- Dasar Pemrograman Pengembang Software, Dicoding Indonesia, Nomor
  L4PQGJWY2ZO1, 2023
- Optimalisasi Fungsi SEO pada Kampanye Digital Marketing, Kode Creative Hub
  (diklatkerja.com), 2025
- ERP Implementation for Supply Chain Management, BKTI-PII (diklatkerja.com),
  2025

=== KEAHLIAN (SKILLS) ===
Programming & Web: HTML, CSS, JavaScript, PHP, Laravel, ReactJS, Tailwind CSS,
Bootstrap, CodeIgniter

Database: MySQL, Firebase, Supabase, PostgreSQL

Networking: Cisco Packet Tracer, Winbox, Linux Ubuntu, Debian

Tools Lainnya: Microsoft Office, CorelDRAW, Adobe Photoshop, Canva, Figma

Soft Skill: Kemampuan komunikasi, kemampuan problem solving, kreativitas,
ketelitian, adaptabilitas, inisiatif, keterampilan manajemen waktu, kemampuan
belajar berkelanjutan.
`;

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
      model: "gemini-3.6-flash",
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
    console.error(
      "Error message:",
      err instanceof Error ? err.message : String(err)
    );
    console.error("Full error JSON:", JSON.stringify(err, null, 2));
    console.error("========================");

    res.status(200).json({
      reply: "Maaf, terjadi kesalahan pada server AI. Coba lagi sebentar lagi.",
    });
  }
}
