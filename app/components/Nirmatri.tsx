"use client";

import Image from "next/image";

export default function NirmatriLogo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">

        {/* 🔴 Bottom Logo – Glow / Effect */}
        <Image
          src="/logo.svg"
          alt="Nirmatri Logo Glow"
          width={200}
          height={200}
          className="
            absolute
            brightness-100
            saturate-100
            sepia
            saturate-[1000%]
            hue-rotate-[-10deg]
            blur-[2px]
            opacity-70
            scale-105
            drop-shadow-[0_0_12px_rgba(255,0,0,0.9)]
          "
        />

        {/* 🔴 Top Logo – Main Sharp Logo */}
        <Image
          src="/logo.svg"
          alt="Nirmatri Logo"
          width={200}
          height={200}
          className="relative z-10"
          priority
        />

      </div>
    </div>
  );
}
