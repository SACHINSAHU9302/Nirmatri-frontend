"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import AccountSidebar from "@/app/components/AccountSidebar";
import LeftPanel from "@/app/components/LeftPanel";

/* SECTIONS */
import MyProfileSection  from "@/app/components/userprofile/sections/MyProfileSection";
import { OrdersSection } from "@/app/components/userprofile/sections/OrdersSection";
import { AddressesSection } from "@/app/components/userprofile/sections/AddressesSection";
import { WishlistSection } from "@/app/components/userprofile/sections/WishlistSection";
import { CartSection } from "@/app/components/userprofile/sections/CartSection";
import { PaymentsSection } from "@/app/components/userprofile/sections/PaymentsSection";
import { ReturnsSection } from "@/app/components/userprofile/sections/ReturnsSection";
import { NotificationsSection } from "@/app/components/userprofile/sections/NotificationsSection";
import { SupportSection } from "@/app/components/userprofile/sections/SupportSection";
import  SettingsSection  from "@/app/components/userprofile/sections/SettingsSection";

type Section =
  | "profile"
  | "orders"
  | "addresses"
  | "wishlist"
  | "cart"
  | "payments"
  | "returns"
  | "notifications"
  | "support"
  | "settings";

export default function HeaderWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);   // Sidebar
  const [panelOpen, setPanelOpen] = useState(false); // Panel
  const [section, setSection] = useState<Section>("profile");

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || panelOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, panelOpen]);

  /* 🔹 SECTION RENDER */
  const renderSection = () => {
    switch (section) {
      case "orders": return <OrdersSection />;
      case "addresses": return <AddressesSection />;
      case "wishlist": return <WishlistSection />;
      case "cart": return <CartSection />;
      case "payments": return <PaymentsSection />;
      case "returns": return <ReturnsSection />;
      case "notifications": return <NotificationsSection />;
      case "support": return <SupportSection />;
      case "settings": return <SettingsSection />;
      // default: return <MyProfileSection />;
    }
  };

  /* 🔥 DEVICE CHECK */
  const isMobile = () => window.innerWidth < 1024; // lg breakpoint

  return (
    <>
      {/* ✅ USER ICON = TOGGLE SIDEBAR */}
      <Navbar onUserClick={() => setMenuOpen((prev) => !prev)} />

      {/* SIDEBAR */}
      <AccountSidebar
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          setPanelOpen(false); // ❗ only manual close pe panel band
        }}
        onSelect={(sec) => {
          setSection(sec as Section);
          setPanelOpen(true);

          // 📱 MOBILE pe sidebar band
          if (isMobile()) {
            setMenuOpen(false);
          }
          // 💻 DESKTOP pe sidebar open rahega
        }}
      />

      {/* LEFT PANEL */}
      <LeftPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      >
        {renderSection()}
      </LeftPanel>
    </>
  );
}
