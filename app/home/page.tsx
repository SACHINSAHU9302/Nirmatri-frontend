"use client";

import HeaderWrapper from "@/app/components/HeaderWrapper";
import { VideoLikeCarousel } from "@/app/components/VideoLikeCarousel";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { SponsoredProducts } from "@/app/components/SponsoredProducts";
import { ArtisanSpotlight } from "@/app/components/ArtisanSpotlight";
import { WhyShopWithUs } from "@/app/components/WhyShopWithUs";
import { NirmatriFooter } from "@/app/components/NirmatriFooter";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

export default function Page() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black transition-colors duration-300">
        
        {/* ✅ Navbar + Account Sidebar */}
        <HeaderWrapper />

        <VideoLikeCarousel />
        <CategoryShowcase />
        <SponsoredProducts />
        <ArtisanSpotlight />
        <WhyShopWithUs />

        <NirmatriFooter />
      </div>
    </ThemeProvider>
  );
}
