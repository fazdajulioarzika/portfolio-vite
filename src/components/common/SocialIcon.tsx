import React from "react";

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
}

export default function SocialIcon({ href, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-9 h-9 mr-3 rounded-full flex justify-center items-center 
                 border border-slate-300 hover:border-primary hover:bg-primary 
                 hover:text-white transition"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
