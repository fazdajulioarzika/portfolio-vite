import {
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";

const categories = ["Programming", "Teknologi", "Gaya Hidup"];

const links = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang Saya", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fazda-julio-arzika-a35737292/",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCf5MDnxpKS4E0gYA7K-pcKA",
    label: "YouTube",
  },
  { icon: Twitter, href: "https://twitter.com/ArtFazda", label: "Twitter" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/fazdajulio/",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://m.facebook.com/fazda.julio.1",
    label: "Facebook",
  },
  {
    icon: Github,
    href: "https://github.com/fazdajulioarzika",
    label: "GitHub",
  },
];
export default function Footer() {
  return (
    <footer className="dark:bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap">
          {/* Brand & Contact */}
          <div className="w-full px-4 mb-12 dark:text-slate-300 font-medium md:w-1/3">
            <h2 className="font-bold text-4xl dark:text-white mb-5">FJA</h2>
            <h3 className="font-bold text-2xl mb-2">Hubungi Kami</h3>
            <p>fazda473@gmail.com</p>
            <p>Jl. Sumur Jomblang Bogo</p>
            <p>Bojong, Pekalongan</p>
          </div>

          {/* Kategori */}
          <div className="w-full px-4 mb-12 md:w-1/3">
            <h3 className="font-semibold text-xl dark:text-white mb-5">
              Kategori Tulisan
            </h3>
            <ul className="dark:text-slate-300">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="inline-block text-base hover:text-primary mb-3 transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tautan */}
          <div className="w-full px-4 mb-12 md:w-1/3">
            <h3 className="font-semibold text-xl dark:text-white mb-5">
              Tautan
            </h3>
            <ul className="dark:text-slate-300">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block text-base hover:text-primary mb-3 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="w-full pt-10 border-t border-slate-700">
          <div className="flex items-center justify-center gap-3 mb-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex justify-center items-center border border-gray-900 dark:border-slate-300 dark:text-white hover:border-primary hover:bg-primary transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          {/* Copyright */}
          <p className="font-medium text-xs dark:text-slate-500 text-center md:text-sm">
            Dibuat dengan <span className="text-pink-500">❤</span> oleh{" "}
            <a
              href="https://www.instagram.com/fazdajulio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary"
            >
              Fazda Julio Arzika
            </a>
            , menggunakan{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-500"
            >
              Tailwind CSS
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
