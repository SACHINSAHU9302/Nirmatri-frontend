"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-8">
          Super Admin
        </h2>

        <nav className="space-y-4 flex-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<Users size={18} />} label="Sellers" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<Package size={18} />} label="Products" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<ShoppingCart size={18} />} label="Orders" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<BarChart3 size={18} />} label="Reports" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<Settings size={18} />} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <button className="flex items-center gap-2 text-red-500 mt-6 hover:text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold capitalize">
            {activeTab}
          </h1>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <Bell size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                4
              </span>
            </div>

            <div className="font-medium">
              Super Admin
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "sellers" && <SellerManagement />}
          {activeTab === "products" && <ProductApproval />}
          {activeTab === "orders" && <OrdersManagement />}
          {activeTab === "reports" && <Reports />}
          {activeTab === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ icon, label, activeTab, setActiveTab }: any) {
  return (
    <div
      onClick={() => setActiveTab(label.toLowerCase())}
      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${
        activeTab === label.toLowerCase()
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

/* -------- Dashboard Overview -------- */

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Sellers" value="120" />
      <StatCard title="Pending Approvals" value="8" />
      <StatCard title="Total Products" value="560" />
      <StatCard title="Orders Count" value="320" />
      <StatCard title="Revenue" value="₹2,45,000" />
      <StatCard title="Recent Activity" value="12 New Actions" />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

/* -------- Seller Management -------- */

function SellerManagement() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Rahul Traders",
      sellerId: "seller1234",
      status: "approved",
      products: [
        { id: 101, name: "iPhone 15", price: 75000, status: "pending" },
        { id: 102, name: "AirPods Pro", price: 20000, status: "approved" },
      ],
    },
    {
      id: 2,
      name: "Tech World",
      sellerId: "seller5678",
      status: "pending",
      products: [
        { id: 201, name: "Gaming Laptop", price: 95000, status: "pending" },
      ],
    },
  ]);

  const [openSeller, setOpenSeller] = useState<number | null>(null);

  const updateProductStatus = (
    sellerId: number,
    productId: number,
    newStatus: string
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-6 text-lg">
        Seller Management
      </h2>

      {sellers.map((seller) => (
        <div key={seller.id} className="border rounded-lg mb-4">

          {/* Seller Header */}
          <div className="p-4 flex justify-between items-center bg-gray-50">
            <div>
              <p className="font-medium">{seller.name}</p>
              <p className="text-sm text-gray-500">{seller.sellerId}</p>
            </div>

            <button
              onClick={() =>
                setOpenSeller(
                  openSeller === seller.id ? null : seller.id
                )
              }
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {openSeller === seller.id
                ? "Hide Products"
                : "View Products"}
            </button>
          </div>

          {/* Product Section */}
          {openSeller === seller.id && (
            <div className="p-4 border-t space-y-3">

              {seller.products.map((product) => (
                <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="flex justify-between items-center border rounded p-3 cursor-pointer hover:bg-gray-50 transition"
               >
                  <div>
                    <p className="font-medium">{product.name}</p>
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
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded"
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
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded"
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
  );
}


/* -------- Product Approval -------- */

function ProductApproval() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Product Approval System</h2>
      <p>✔ Pending Product Requests</p>
      <p>✔ Accept / Reject Product</p>
      <p>✔ Product Details View</p>
      <p>✔ Search & Filter</p>
    </div>
  );
}

/* -------- Orders -------- */

function OrdersManagement() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Orders Management</h2>
      <p>✔ All Orders List</p>
      <p>✔ Order Status (Pending / Shipped / Delivered)</p>
      <p>✔ Cancel Orders</p>
      <p>✔ Refund Requests</p>
    </div>
  );
}

/* -------- Reports -------- */

function Reports() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Reports & Analytics</h2>
      <p>✔ Monthly Sales</p>
      <p>✔ Seller Performance</p>
      <p>✔ Top Products</p>
      <p>✔ Revenue Chart</p>
    </div>
  );
}

/* -------- Settings -------- */

function SettingsPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Admin Settings</h2>
      <p>✔ Change Password</p>
      <p>✔ Add Sub Admin</p>
      <p>✔ Role Management</p>
      <p>✔ Logout</p>
    </div>
  );
}
