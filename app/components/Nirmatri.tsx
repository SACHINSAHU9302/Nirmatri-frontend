"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NirmatriLogo() {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.replace("/superadmin/login")}
        className="flex items-center justify-center min-h-screen bg-transparent"
      >
        <div className="relative w-[220px] h-[220px] flex items-center justify-center cursor-pointer">
          {/* Glow Logo */}
          <Image
            src="/logo.svg"
            alt="Nirmatri Logo Glow"
            width={200}
            height={200}
            className="
            absolute
            pointer-events-none
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
          {/* Main Logo */}
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
    </>
  );
}
