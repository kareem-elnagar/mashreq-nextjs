import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Zap, FolderOpen, LogOut,
  MapPin, Calendar, ChevronRight, Eye, EyeOff,
  TrendingUp, Sun, Shield, Pencil, X, RotateCcw, Save,
  Plus, Trash2, ImageIcon, Upload,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProjects } from "@/lib/projects-store";
import { Project } from "@/lib/data";

type Tab = "overview" | "projects";

const BLANK_PROJECT: Omit<Project, "slug"> = {
  title: "",
  client: "",
  location: "",
  year: new Date().getFullYear().toString(),
  size: "",
  image: "/img/projects/fahl/1.jpg",
  gallery: [],
  stats: [
    { label: "Capacity",    value: "" },
    { label: "System Type", value: "Hybrid" },
    { label: "Key Metric",  value: "" },
  ],
  status: "",
  situation: "",
  decision: "",
  system: "",
  outcome: "",
};

interface SavePayload extends Partial<Project> {
  slug?: string;
  imageFile?: File;
}

function ProjectModal({
  project,
  isNew,
  currentImageUrl,
  hasCustomImage,
  onSave,
  onRemoveImage,
  onClose,
}: {
  project: Project | typeof BLANK_PROJECT;
  isNew: boolean;
  currentImageUrl: string;
  hasCustomImage: boolean;
  onSave: (payload: SavePayload) => void;
  onRemoveImage: () => void;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title:      (project as Project).title ?? "",
    client:     (project as Project).client ?? "",
    location:   project.location,
    year:       project.year,
    size:       project.size,
    systemType: project.stats[1].value,
    stat3Label: project.stats[2].label,
    stat3Value: project.stats[2].value,
    status:     project.status,
    situation:  project.situation,
    decision:   project.decision,
    system:     project.system,
    outcome:    project.outcome,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null);
  const [error, setError] = useState("");

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function handleSave() {
    if (!form.title.trim())    { setError("Title is required.");    return; }
    if (!form.location.trim()) { setError("Location is required."); return; }
    if (!form.size.trim())     { setError("Capacity is required."); return; }
    setError("");

    const payload: SavePayload = {
      title:     form.title,
      client:    form.client || undefined,
      location:  form.location,
      year:      form.year,
      size:      form.size,
      stats: [
        { label: "Capacity",      value: form.size },
        { label: "System Type",   value: form.systemType },
        { label: form.stat3Label, value: form.stat3Value },
      ],
      status:    form.status,
      situation: form.situation,
      decision:  form.decision,
      system:    form.system,
      outcome:   form.outcome,
    };
    if (isNew) payload.slug = slugify(form.title) || `project-${Date.now()}`;
    if (selectedFile) payload.imageFile = selectedFile;
    onSave(payload);
    onClose();
  }

  const displayImage = previewUrl ?? currentImageUrl;

  const field = (label: string, key: string, multiline = false, required = false) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={(form as any)[key]}
          onChange={(e) => set(key, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1e4b8f] resize-none"
        />
      ) : (
        <input
          type="text"
          value={(form as any)[key]}
          onChange={(e) => set(key, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1e4b8f]"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h2 className="font-black text-gray-900 text-base">
              {isNew ? "Add New Project" : "Edit Project"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
              {isNew ? "Fill in the details below." : (project as Project).title}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-200 text-gray-500 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* ── Image section ── */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Cover Photo
            </label>
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-40 w-full mb-3">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon size={36} />
                </div>
              )}
              {previewUrl && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-[#1e4b8f]/10 hover:bg-[#1e4b8f]/20 text-[#1e4b8f] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                <Upload size={13} />
                {previewUrl ? "Change Photo" : "Upload Photo"}
              </button>
              {(hasCustomImage || previewUrl) && !previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveImage();
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                  className="flex items-center gap-2 text-red-400 hover:bg-red-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors border border-red-200"
                >
                  <Trash2 size={13} /> Remove Custom Photo
                </button>
              )}
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                  className="flex items-center gap-2 text-gray-400 hover:bg-gray-100 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors border border-gray-200"
                >
                  <X size={13} /> Cancel
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="text-[11px] text-gray-400 mt-1.5">
                {selectedFile.name} · {(selectedFile.size / 1024).toFixed(0)} KB
              </p>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* ── Text fields ── */}
          {isNew && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-xs text-[#1e4b8f]">
              The project will appear on the public site immediately after saving.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {field("Title",        "title",      false, true)}
            {field("Client",       "client")}
            {field("Location",     "location",   false, true)}
            {field("Year",         "year")}
            {field("Capacity",     "size",       false, true)}
            {field("System Type",  "systemType")}
            {field("3rd Stat Label","stat3Label")}
            {field("3rd Stat Value","stat3Value")}
          </div>
          {field("Status",              "status")}
          {field("Situation",           "situation",  true)}
          {field("Decision",            "decision",   true)}
          {field("System Description",  "system",     true)}
          {field("Outcome",             "outcome",    true)}

          {error && (
            <p className="text-xs text-red-500 font-semibold bg-red-50 px-4 py-2 rounded-xl">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1e4b8f] hover:bg-[#163a74] text-white font-bold text-sm py-3 rounded-2xl transition-colors"
          >
            {isNew ? <><Plus size={15} /> Add Project</> : <><Save size={15} /> Save Changes</>}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const {
    projects, updateProject, resetProject,
    addProject, deleteProject, isAdded,
    updateProjectImage, removeProjectImage, hasCustomImage,
  } = useProjects();
  const [, navigate] = useLocation();
  const [tab,          setTab]          = useState<Tab>("overview");
  const [editingSlug,  setEditingSlug]  = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const isAdmin = user?.role === "admin";

  const TOTAL_KW = projects
    .map((p) => parseFloat(p.size))
    .filter(Boolean)
    .reduce((a, b) => a + b, 0);

  const systemCounts = projects.reduce<Record<string, number>>((acc, p) => {
    const type = p.stats[1].value;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  async function handleSave(slug: string, payload: SavePayload) {
    const { imageFile, slug: _s, ...changes } = payload;
    updateProject(slug, changes);
    if (imageFile) await updateProjectImage(slug, imageFile);
  }

  async function handleAdd(payload: SavePayload) {
    const { imageFile, slug: newSlug, ...rest } = payload;
    const slug = newSlug ?? `project-${Date.now()}`;
    addProject({
      slug,
      title:     rest.title     ?? "",
      client:    rest.client,
      location:  rest.location  ?? "",
      year:      rest.year      ?? new Date().getFullYear().toString(),
      size:      rest.size      ?? "",
      image:     "/img/projects/fahl/1.jpg",
      gallery:   [],
      stats:     rest.stats     ?? [
        { label: "Capacity",    value: "" },
        { label: "System Type", value: "Hybrid" },
        { label: "Key Metric",  value: "" },
      ],
      status:    rest.status    ?? "",
      situation: rest.situation ?? "",
      decision:  rest.decision  ?? "",
      system:    rest.system    ?? "",
      outcome:   rest.outcome   ?? "",
    });
    if (imageFile) await updateProjectImage(slug, imageFile);
  }

  const editingProject = editingSlug
    ? projects.find((p) => p.slug === editingSlug) ?? null
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2a5e] flex flex-col shrink-0 min-h-screen">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="bg-white rounded-xl p-2 shrink-0">
            <img src="/img/Logo.png" alt="Mashreq" className="h-8 w-auto" />
          </div>
          <div>
            <p className="text-white font-black text-sm leading-tight">MASHREQ</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Admin Portal</p>
          </div>
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
          <div className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
            {isAdmin ? (
              <Shield size={14} className="text-[#ffce07] shrink-0" />
            ) : (
              <Eye size={14} className="text-blue-300 shrink-0" />
            )}
            <div>
              <p className="text-white text-xs font-bold">{user?.username}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">
                {isAdmin ? "Full Admin" : "Viewer"}
              </p>
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

      {/* Main */}
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
              <p className="text-gray-400 text-sm mb-8">
                Live snapshot of all installed capacity and project activity.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatCard icon={<Zap size={20} />}        label="Total Installed"  value={`${TOTAL_KW.toFixed(1)} kW`}           color="blue"   />
                <StatCard icon={<FolderOpen size={20} />} label="Projects"         value={String(projects.length)}               color="yellow" />
                <StatCard icon={<TrendingUp size={20} />} label="Hybrid Systems"   value={String(systemCounts["Hybrid"] ?? 0)}   color="green"  />
                <StatCard icon={<Sun size={20} />}        label="On-Grid Systems"  value={String(systemCounts["On-Grid"] ?? 0)}  color="orange" />
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
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-black text-gray-900">Projects</h1>
                {isAdmin && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-[#1e4b8f] hover:bg-[#163a74] text-white font-bold text-sm px-4 py-2.5 rounded-2xl transition-colors"
                  >
                    <Plus size={15} /> Add Project
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-8">
                {isAdmin
                  ? "Full project details. Add, edit photos, or remove any project."
                  : "Project overview — client details and editing are restricted to admin."}
              </p>

              <div className="space-y-4">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div className="flex items-center">
                      <div className="relative w-28 h-24 shrink-0 overflow-hidden bg-gray-100">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        {hasCustomImage(p.slug) && (
                          <div className="absolute bottom-1 left-1 bg-black/50 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                            <ImageIcon size={9} className="text-white" />
                            <span className="text-[9px] text-white font-bold">Custom</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                              {isAdded(p.slug) && (
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
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
                                <span className="text-xs text-gray-400 italic truncate max-w-xs">{p.status}</span>
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

                          <div className="flex items-center gap-2 shrink-0">
                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => setEditingSlug(p.slug)}
                                  className="flex items-center gap-1.5 text-xs bg-[#1e4b8f] hover:bg-[#163a74] text-white font-semibold px-3 py-1.5 rounded-xl transition-colors"
                                >
                                  <Pencil size={12} /> Edit
                                </button>
                                {isAdded(p.slug) ? (
                                  <button
                                    onClick={() => deleteProject(p.slug)}
                                    title="Delete project"
                                    className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => resetProject(p.slug)}
                                    title="Reset to default"
                                    className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-200 transition-colors"
                                  >
                                    <RotateCcw size={12} />
                                  </button>
                                )}
                              </>
                            )}
                            <a
                              href={`/projects/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1e4b8f] font-semibold"
                            >
                              View <ChevronRight size={13} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="border-t border-gray-50 bg-gray-50/50 px-5 py-3">
                        <p className="text-xs text-gray-500 line-clamp-2">
                          <span className="font-semibold text-gray-700">Outcome:</span>{" "}
                          {p.outcome || <span className="italic text-gray-300">No outcome set yet.</span>}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Edit modal */}
      <AnimatePresence>
        {editingProject && (
          <ProjectModal
            key={editingSlug!}
            project={editingProject}
            isNew={false}
            currentImageUrl={editingProject.image}
            hasCustomImage={hasCustomImage(editingProject.slug)}
            onSave={(payload) => handleSave(editingProject.slug, payload)}
            onRemoveImage={() => removeProjectImage(editingProject.slug)}
            onClose={() => setEditingSlug(null)}
          />
        )}
      </AnimatePresence>

      {/* Add modal */}
      <AnimatePresence>
        {showAddModal && (
          <ProjectModal
            key="new-project"
            project={{ ...BLANK_PROJECT, slug: "" } as Project}
            isNew={true}
            currentImageUrl="/img/projects/fahl/1.jpg"
            hasCustomImage={false}
            onSave={handleAdd}
            onRemoveImage={() => {}}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>
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
