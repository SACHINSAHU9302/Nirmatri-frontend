"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  status: "pending" | "approved" | "rejected";
}

interface Seller {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved";
  products: Product[];
}

export default function SellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([
    {
      id: 1,
      name: "Rahul Traders",
      email: "rahul@gmail.com",
      status: "approved",
      products: [
        {
          id: 101,
          name: "iPhone 15",
          price: 75000,
          image: "https://via.placeholder.com/60",
          status: "pending",
        },
        {
          id: 102,
          name: "AirPods Pro",
          price: 20000,
          image: "https://via.placeholder.com/60",
          status: "approved",
        },
      ],
    },
  ]);

  const [openSeller, setOpenSeller] = useState<number | null>(null);

  const updateProductStatus = (
    sellerId: number,
    productId: number,
    newStatus: Product["status"]
  ) => {
    setSellers((prev) =>
      prev.map((seller) =>
        seller.id === sellerId
          ? {
              ...seller,
              products: seller.products.map((product) =>
                product.id === productId
                  ? { ...product, status: newStatus }
                  : product
              ),
            }
          : seller
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">
          Seller Management
        </h2>

        {sellers.map((seller) => (
          <div key={seller.id} className="border rounded-lg mb-4">

            {/* Seller Header */}
            <div className="p-4 flex justify-between items-center bg-gray-50">
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-gray-500">{seller.email}</p>
              </div>

              <button
                onClick={() =>
                  setOpenSeller(
                    openSeller === seller.id ? null : seller.id
                  )
                }
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {openSeller === seller.id
                  ? "Hide Products"
                  : "View Products"}
              </button>
            </div>

            {/* Product Section */}
            {openSeller === seller.id && (
              <div className="p-4 border-t bg-white space-y-4">

                {seller.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center border rounded-lg p-3 hover:shadow-sm transition"
                  >
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded object-cover border"
                      />

                      <div>
                        <p className="font-medium">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs mt-1 font-medium ${
                            product.status === "approved"
                              ? "text-green-600"
                              : product.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {product.status}
                        </p>
                      </div>
                    </div>

                    {/* Right Side Actions */}
                    {product.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateProductStatus(
                              seller.id,
                              product.id,
                              "approved"
                            )
                          }
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateProductStatus(
                              seller.id,
                              product.id,
                              "rejected"
                            )
                          }
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
