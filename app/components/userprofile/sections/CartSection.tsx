"use client";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useState } from "react";

const initialCartItems = [
  {
    id: 1,
    name: "Bluetooth Speaker - JBL Flip 6",
    price: 8999,
    quantity: 1,
    image: "🔊",
    color: "Black",
  },
  {
    id: 2,
    name: "USB-C Charging Cable (3 Pack)",
    price: 599,
    quantity: 2,
    image: "🔌",
    color: "White",
  },
];

export function CartSection() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [checkingOut, setCheckingOut] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    await new Promise((r) => setTimeout(r, 1500));
    setCheckingOut(false);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <ShoppingBag className="w-6 h-6 text-orange-500 dark:text-blue-400" />
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {cartItems.length} items in your cart
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10"
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-orange-100 dark:bg-[#1f232a] flex items-center justify-center text-4xl shrink-0">
                    {item.image}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Color: {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-orange-50 dark:bg-[#1f232a] rounded-lg p-1">
  <button
    onClick={() => updateQuantity(item.id, -1)}
    aria-label="Decrease quantity"
    className="w-8 h-8 rounded-md hover:bg-orange-100 dark:hover:bg-white/10 flex items-center justify-center"
  >
    <Minus className="w-4 h-4" />
  </button>

  <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
    {item.quantity}
  </span>

  <button
    onClick={() => updateQuantity(item.id, 1)}
    aria-label="Increase quantity"
    className="w-8 h-8 rounded-md hover:bg-orange-100 dark:hover:bg-white/10 flex items-center justify-center"
  >
    <Plus className="w-4 h-4" />
  </button>
</div>


                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ₹{item.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
  <button
    onClick={() => removeItem(item.id)}
    aria-label="Remove item"
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty cart */}
          {cartItems.length === 0 && (
            <Card className="bg-white dark:bg-[#0f0f10]">
              <CardContent className="py-12 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add items to start shopping
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <Card className="h-fit sticky top-4 bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              {shipping === 0 && (
                <div className="text-xs text-green-600 bg-green-100 dark:bg-green-500/10 p-2 rounded-lg">
                  🎉 You saved ₹49 on shipping!
                </div>
              )}

              <div className="border-t border-orange-200 dark:border-white/10 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout */}
            <Button
              size="lg"
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || checkingOut}
              className="
                w-full mt-6 gap-2
                bg-orange-500 hover:bg-orange-600 text-white
                dark:bg-blue-400 dark:hover:bg-blue-300 dark:text-black
                disabled:opacity-60
              "
            >
              {checkingOut ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing…
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              Free shipping on orders above ₹500
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
