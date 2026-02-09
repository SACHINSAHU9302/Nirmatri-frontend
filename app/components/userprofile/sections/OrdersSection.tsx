"use client";

import { useState } from "react";
import {
  Download,
  Package,
  RefreshCw,
  Truck,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

const orders = [
  {
    id: "ORD-2024-001",
    date: "15 Jan 2024",
    status: "delivered",
    total: 2499,
    items: [
      { name: "Wireless Bluetooth Headphones", qty: 1, price: 2499, image: "🎧" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "20 Jan 2024",
    status: "shipped",
    total: 1299,
    items: [
      { name: "Smart Watch Band", qty: 2, price: 649, image: "⌚" },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "25 Jan 2024",
    status: "processing",
    total: 4999,
    items: [
      { name: "Running Shoes – Nike Air", qty: 1, price: 4999, image: "👟" },
    ],
  },
];

const statusConfig = {
  processing: { label: "Processing", icon: Package },
  shipped: { label: "Shipped", icon: Truck },
  delivered: { label: "Delivered", icon: Package },
};

export function OrdersSection() {
  const [invoiceLoading, setInvoiceLoading] = useState<string | null>(null);
  const [reorderLoading, setReorderLoading] = useState<string | null>(null);

  const fakeApi = () => new Promise((r) => setTimeout(r, 1200));

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          My Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Every order tells a story of craftsmanship
        </p>
      </div>

      
      {/* ================= ORDERS ================= */}
      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon =
            statusConfig[order.status as keyof typeof statusConfig].icon;

          return (
            <Card
              key={order.id}
              className="
                bg-white dark:bg-[#0f0f10]
                border-orange-200/60 dark:border-white/10
                shadow-sm hover:shadow-md transition
                rounded-2xl overflow-hidden
              "
            >
              <CardContent className="p-0">
                {/* -------- HEADER -------- */}
                <div
                  className="
                    flex flex-wrap gap-2 items-center justify-between
                    px-5 py-4
                    bg-orange-50/70 dark:bg-[#16181c]
                    border-b border-orange-200/60 dark:border-white/10
                  "
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-gray-500">
                      {order.id}
                    </span>
                    <Badge
                      className="
                        gap-1 rounded-full
                        bg-orange-100 text-orange-600
                        dark:bg-blue-500/20 dark:text-blue-300
                      "
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {order.date}
                  </span>
                </div>

                {/* -------- ITEMS -------- */}
                <div className="px-5 py-5 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div
                        className="
                          w-16 h-16 rounded-xl
                          bg-orange-100 dark:bg-[#1f232a]
                          flex items-center justify-center text-3xl
                        "
                      >
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* -------- FOOTER -------- */}
                <div
                  className="
                    flex flex-col sm:flex-row gap-3
                    items-start sm:items-center justify-between
                    px-5 py-4
                    border-t border-orange-200/60 dark:border-white/10
                    bg-orange-50/30 dark:bg-[#16181c]/40
                  "
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    Total&nbsp;
                    <span className="text-orange-600 dark:text-blue-400">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={invoiceLoading === order.id}
                      onClick={async () => {
                        setInvoiceLoading(order.id);
                        await fakeApi();
                        setInvoiceLoading(null);
                      }}
                      className="flex-1 sm:flex-none"
                    >
                      {invoiceLoading === order.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Invoice
                    </Button>

                    <Button
                      size="sm"
                      disabled={reorderLoading === order.id}
                      onClick={async () => {
                        setReorderLoading(order.id);
                        await fakeApi();
                        setReorderLoading(null);
                      }}
                      className="
                        flex-1 sm:flex-none
                        bg-orange-500 hover:bg-orange-600 text-white
                        dark:bg-blue-400 dark:hover:bg-blue-300 dark:text-black
                      "
                    >
                      {reorderLoading === order.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Re-ordering…
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Re-order
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
