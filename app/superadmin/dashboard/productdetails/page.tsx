"use client";

import Link from "next/link";

export default function ProductsPage() {
  const products = [
    { id: 101, name: "iPhone 15", price: 75000, status: "pending" },
    { id: 102, name: "Samsung TV", price: 45000, status: "approved" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-6">
        Product Management
      </h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                ₹{product.price}
              </p>
            </div>

            <Link
              href={`/superadmin/products/${product.id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
