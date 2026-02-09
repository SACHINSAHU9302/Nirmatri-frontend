"use client";

import {
  Heart,
  ShoppingCart,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useState } from "react";

const wishlistItems = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: "👝",
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    image: "🎵",
    inStock: true,
  },
  {
    id: 3,
    name: "Cotton Casual Shirt",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    image: "👔",
    inStock: false,
  },
];

export function WishlistSection() {
  const [addingId, setAddingId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const fakeApi = (ms: number) =>
    new Promise((r) => setTimeout(r, ms));

  const handleAddToCart = async (id: number) => {
    setAddingId(id);
    await fakeApi(1200);
    setAddingId(null);
  };

  const handleRemove = async (id: number) => {
    setRemovingId(id);
    await fakeApi(800);
    setRemovingId(null);
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          My Wishlist
          <Heart className="w-6 h-6 text-orange-500 dark:text-blue-400 fill-current" />
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {wishlistItems.length} items saved for later
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className="
              group overflow-hidden transition-all duration-300
              bg-white dark:bg-[#0f0f10]
              border border-orange-200 dark:border-white/10
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            <CardContent className="p-0">
              {/* IMAGE */}
              <div className="relative aspect-square bg-orange-50 dark:bg-[#16181c] flex items-center justify-center text-6xl overflow-hidden">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {item.image}
                </div>

                {item.discount > 0 && (
                  <span className="
                    absolute top-3 left-3
                    bg-orange-500 text-white
                    dark:bg-blue-500 dark:text-black
                    text-xs px-2 py-1 rounded-full font-semibold
                  ">
                    {item.discount}% OFF
                  </span>
                )}
    
                {/* REMOVE HEART */}
                <Button
                  className="
                    absolute top-3 right-3 w-9 h-9 rounded-full
                    bg-white/80 dark:bg-[#0f0f10]/80 backdrop-blur
                    flex items-center justify-center
                    text-orange-500 dark:text-blue-400
                    hover:bg-orange-500 hover:text-white
                    dark:hover:bg-blue-500 dark:hover:text-black
                    transition
                  "
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                <h3 className="font-medium leading-snug line-clamp-2 text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>

                {!item.inStock && (
                  <p className="text-sm font-medium text-red-500">
                    Out of Stock
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">
                  {/* ADD TO CART */}
                  <Button
                    disabled={!item.inStock || addingId === item.id}
                    onClick={() => handleAddToCart(item.id)}
                    className="
                      flex-1 gap-2
                      bg-orange-500 hover:bg-orange-600 text-white
                      dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black
                      disabled:bg-orange-300 dark:disabled:bg-blue-500/40
                    "
                  >
                    {addingId === item.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Adding…
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  {/* REMOVE */}
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={removingId === item.id}
                    onClick={() => handleRemove(item.id)}
                    className="
                      border-orange-300 text-orange-600 hover:bg-orange-50
                      dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10
                    "
                  >
                    {removingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
