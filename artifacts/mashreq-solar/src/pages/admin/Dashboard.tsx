import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Zap, FolderOpen, LogOut,
  MapPin, Calendar, ChevronRight, Eye, EyeOff,
  TrendingUp, Sun, Users, Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { projects } from "@/lib/data";

const TOTAL_KW = projects
  .map((p) => parseFloat(p.size))
  .filter(Boolean)
  .reduce((a, b) => a + b, 0);

const systemCounts = projects.reduce<Record<string, number>>((acc, p) => {
  const type = p.stats[1].value;
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

type Tab = "overview" | "projects";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("overview");

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#0f2a5e] flex flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-white/10">
          <img src="/img/Logo.png" alt="Mashreq" className="h-10 w-auto mb-1" />
          <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-semibold">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {(["overview", "projects"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-[#ffce07] text-[#0f2a5e]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {t === "overview" ? <LayoutDashboard size={16} /> : <FolderOpen size={16} />}
              {t === "overview" ? "Overview" : "Projects"}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="bg-white/10 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Shield size={14} className="text-[#ffce07]" />
              ) : (
                <Eye size={14} className="text-blue-300" />
              )}
              <div>
                <p className="text-white text-xs font-bold">{user?.username}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">
                  {isAdmin ? "Full Admin" : "Viewer"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-white/50 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-black text-gray-900 mb-1">Overview</h1>
              <p className="text-gray-400 text-sm mb-8">Live snapshot of all installed capacity and project activity.</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatCard icon={<Zap size={20} />} label="Total Installed" value={`${TOTAL_KW.toFixed(1)} kW`} color="blue" />
                <StatCard icon={<FolderOpen size={20} />} label="Projects" value={String(projects.length)} color="yellow" />
                <StatCard icon={<TrendingUp size={20} />} label="Hybrid Systems" value={String(systemCounts["Hybrid"] ?? 0)} color="green" />
                <StatCard icon={<Sun size={20} />} label="On-Grid Systems" value={String(systemCounts["On-Grid"] ?? 0)} color="orange" />
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-[#1e4b8f]" /> System Type Breakdown
                </h2>
                <div className="space-y-3">
                  {Object.entries(systemCounts).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-24">{type}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1e4b8f] transition-all"
                          style={{ width: `${(count / projects.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-500 w-6 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-[#1e4b8f]" /> Project Locations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map((p) => (
                    <div key={p.slug} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-[#1e4b8f] shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.location} · {p.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-black text-gray-900 mb-1">Projects</h1>
              <p className="text-gray-400 text-sm mb-8">
                {isAdmin
                  ? "Full project details including client information."
                  : "Project overview — client details are restricted to admin."}
              </p>

              <div className="space-y-4">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div className="flex items-center gap-0">
                      <div className="w-28 h-24 shrink-0 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin size={11} /> {p.location}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Calendar size={11} /> {p.year}
                              </span>
                              <span className="bg-blue-50 text-[#1e4b8f] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                {p.stats[1].value}
                              </span>
                            </div>

                            {isAdmin ? (
                              <div className="mt-2 flex items-center gap-4 flex-wrap">
                                <span className="text-xs text-gray-700 font-semibold">
                                  Client: <span className="text-[#1e4b8f]">{p.client ?? "—"}</span>
                                </span>
                                <span className="text-xs text-gray-700 font-semibold">
                                  Capacity: <span className="text-[#1e4b8f]">{p.size}</span>
                                </span>
                                <span className="text-xs text-gray-400 italic">{p.status}</span>
                              </div>
                            ) : (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-gray-700 font-semibold">
                                  Capacity: <span className="text-[#1e4b8f]">{p.size}</span>
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-300 italic">
                                  <EyeOff size={10} /> Client restricted
                                </span>
                              </div>
                            )}
                          </div>

                          <a
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-1 text-xs text-[#1e4b8f] font-semibold hover:underline"
                          >
                            View <ChevronRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="border-t border-gray-50 bg-gray-50/50 px-5 py-3">
                        <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Outcome:</span> {p.outcome}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StatCard({
  icon, label, value, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "yellow" | "green" | "orange";
}) {
  const colors = {
    blue:   "bg-blue-50 text-[#1e4b8f]",
    yellow: "bg-yellow-50 text-yellow-600",
    green:  "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
      <div className={`inline-flex p-2.5 rounded-xl mb-3 ${colors[color]}`}>{icon}</div>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5 font-medium">{label}</p>
    </div>
  );
}
