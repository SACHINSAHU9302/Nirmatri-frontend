"use client";

import {
  User,
  Package,
  MapPin,
  Heart,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { useRouter } from "next/navigation";

interface ProfileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "support", label: "Help & Support", icon: HelpCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

export function ProfileSidebar({
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // 🔴 future me yahan auth clear kar sakte ho
    // localStorage.removeItem("token");
    // cookies delete
    router.push("/");
  };

  return (
    <aside
      className="
        w-72 min-h-screen p-4 flex flex-col
        bg-white dark:bg-[#0f0f10]
        border-r border-gray-200 dark:border-white/10
      "
    >
      {/* ================= PROFILE HEADER ================= */}
      <div
        className="
          flex items-center gap-4 p-4 mb-6 rounded-xl
          bg-orange-50 dark:bg-blue-500/10
        "
      >
        <div
          className="
            w-14 h-14 rounded-full
            bg-orange-500 text-white
            dark:bg-blue-500 dark:text-black
            flex items-center justify-center
            text-xl font-bold shadow-lg
          "
        >
          RK
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            Raghav Kumar
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            +91 98765 43210
          </p>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  text-left transition-all duration-200
                `,
                isActive
                  ? `
                      bg-orange-500 text-white shadow-sm
                      dark:bg-blue-500 dark:text-black
                    `
                  : `
                      text-gray-700 dark:text-gray-300
                      hover:bg-orange-50 dark:hover:bg-blue-500/10
                    `
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 font-medium">{item.label}</span>

              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform",
                  isActive && "translate-x-1"
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* ================= LOGOUT ================= */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-3 px-4 py-3 mt-4 rounded-xl
          text-orange-600 hover:bg-orange-50
          dark:text-blue-400 dark:hover:bg-blue-500/10
          transition-colors
        "
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
