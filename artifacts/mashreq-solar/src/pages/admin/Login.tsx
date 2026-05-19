import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AdminLogin() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(username, password);
      setLoading(false);
      if (ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2a5e] via-[#1e4b8f] to-[#163a74] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#ffce07]/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white rounded-2xl p-3 mb-4 shadow-lg">
              <img src="/img/Logo.png" alt="Mashreq" className="h-12 w-auto" />
            </div>
            <h1 className="text-white font-black text-2xl tracking-tight">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-1">Restricted access — authorised personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-2 block">
                Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#ffce07]/60 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-2xl py-3 pl-10 pr-12 focus:outline-none focus:border-[#ffce07]/60 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 text-sm px-4 py-3 rounded-2xl"
              >
                <AlertCircle size={15} />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffce07] hover:bg-yellow-300 text-[#1e4b8f] font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Mashreq Engineering · Internal use only
        </p>
      </motion.div>
    </div>
  );
}
