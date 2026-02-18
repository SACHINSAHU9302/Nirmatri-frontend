"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SuperAdminLogin() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!adminId || !password) {
      setError("Please enter ID and Password");
      return;
    }

    // 🔐 Dummy credentials (change as needed)
    if (adminId === "admin123" && password === "12345") {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        router.push("/superadmin/dashboard");
      }, 1000);
    } else {
      setError("Invalid ID or Password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F7FF] px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
          Welcome to Super Admin Panel
        </h1>

        <p className="text-sm text-gray-500 mb-8 text-center">
          Manage your Seller, products and orders Approval.
        </p>

        {/* ID */}
        <div className="mb-4">
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Super Admin ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* SIGN IN */}
        <button
          type="button"
          disabled={loading}
          onClick={handleLogin}
          className={`w-full rounded-lg py-3 font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

      </div>
    </main>
  );
}
