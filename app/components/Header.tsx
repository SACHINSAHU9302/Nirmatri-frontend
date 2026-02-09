"use client";

import {
  Search,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import  NirmatriLogo  from "@/app/components/Nirmatri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export function Header() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTopBar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* MOBILE SEARCH */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="p-4 bg-[#6968A6]">
          <form action="/search" className="flex gap-2">
            <Input
              autoFocus
              name="q"
              type="search"
              placeholder="Search products..."
              className="flex-1 bg-white dark:bg-white/90"
            />
            <Button
              size="icon"
              type="submit"
              className="bg-gradient-to-br from-[#6968A6] to-[#085078]"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <header
        className="
          sticky top-0 z-50
          backdrop-blur-xl
          bg-black
        "
      >
        {/* TOP BAR (unchanged, auto hides) */}
        <div
          className={`overflow-hidden transition-all duration-700 ${
            showTopBar ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-[#CF9893] via-[#6968A6] to-[#085078] text-white text-xs py-2 text-center">
            Where tradition is handcrafted into elegance
          </div>
        </div>

        {/* MAIN HEADER — SLIM */}
        <div className="h-14">
          <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-3">
            {/* LOGO */}
            <div className="flex-shrink-0 transform -translate-x-8 sm:-translate-x-1 md:translate-x-1">
              <Link href="/" className="flex items-center">
                <NirmatriLogo />
              </Link>
            </div>

            {/* SEARCH (DESKTOP) */}
            <div className="hidden md:flex flex-1 justify-center">
              <form action="/search" className="relative w-full max-w-xl">
                <Input
                  name="q"
                  type="search"
                  placeholder="Search handcrafted products..."
                  className="
                    h-9 pl-4 pr-11 rounded-full
                    bg-white/90 dark:bg-white/95
                    text-sm text-gray-900
                    placeholder:text-gray-500
                    border border-[#6968A6]/20 dark:border-white/30
                    focus:ring-2 focus:ring-[#6968A6]/40
                  "
                />
                <Button
                  size="icon"
                  type="submit"
                  className="
                    absolute right-1 top-1/2 -translate-y-1/2
                    h-7 w-7 rounded-full
                    bg-gradient-to-br from-[#6968A6] to-[#085078]
                  "
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </form>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* MOBILE SEARCH */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-900 dark:text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* LOGIN */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      className="
                        hidden lg:flex h-8 px-3 text-sm gap-1.5
                        border-[#6968A6] text-[#085078]
                        hover:bg-[#CF9893]/20
                        dark:border-white/40 dark:text-white
                        dark:hover:bg-white/10
                      "
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden text-gray-900 dark:text-white"
                    >
                      <LogIn className="h-5 w-5" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/userauth/login">Continue as User</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/seller/login">Login as Seller</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}