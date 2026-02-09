"use client";

import { useState } from "react";

import { ProfileSidebar } from "@/app/components/userprofile/ProfileSidebar";
import { MobileNav } from "@/app/components/userprofile/MobileNav";

import { MyProfileSection } from "@/app/components/userprofile/sections/MyProfileSection";
import { OrdersSection } from "@/app/components/userprofile/sections/OrdersSection";
import { AddressesSection } from "@/app/components/userprofile/sections/AddressesSection";
import { WishlistSection } from "@/app/components/userprofile/sections/WishlistSection";
import { CartSection } from "@/app/components/userprofile/sections/CartSection";
import { PaymentsSection } from "@/app/components/userprofile/sections/PaymentsSection";
import { ReturnsSection } from "@/app/components/userprofile/sections/ReturnsSection";
import { NotificationsSection } from "@/app/components/userprofile/sections/NotificationsSection";
import { SupportSection } from "@/app/components/userprofile/sections/SupportSection";

const UserDashboard = () => { 
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <MyProfileSection />;
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressesSection />;
      case "wishlist":
        return <WishlistSection />;
      case "cart":
        return <CartSection />;
      case "payments":
        return <PaymentsSection />;
      case "returns":
        return <ReturnsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "support":
        return <SupportSection />;
      default:
        return <MyProfileSection />;
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0f0f0f]">
      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden lg:block">
        <ProfileSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* ================= Mobile Navigation ================= */}
      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* ================= Main Content ================= */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto pt-12 lg:pt-0">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
