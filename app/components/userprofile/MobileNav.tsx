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
  Menu
} from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";

interface MobileNavProps {
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
];

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (section: string) => {
    onSectionChange(section);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50 bg-card shadow-lg">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-card">
        {/* Profile Header */}
        <div className="flex items-center gap-4 p-4 bg-accent">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-bold">
            RK
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Rahul Kumar</h2>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
