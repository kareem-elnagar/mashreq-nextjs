import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, AlertCircle, Info, Calendar, MapPin, Gauge, User, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  slug: string;
}

export default function ProjectDetail({ slug }: Props) {
  const project = projects.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! > 0 ? i! - 1 : project.gallery.length - 1));
  const next = () => setLightboxIndex((i) => (i! < project.gallery.length - 1 ? i! + 1 : 0));

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[400px] h-[400px] -top-20 -right-20" />

      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[360px] rounded-b-[3rem] overflow-hidden shadow-2xl">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/projects" className="text-white/90 hover:text-white flex items-center mb-5 transition-colors drop-shadow-md w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-xl">{project.title}</h1>
            <div className="flex flex-wrap gap-5 text-white font-medium drop-shadow-lg text-sm">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {project.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> Installed {project.year}</span>
              <span className="flex items-center gap-1.5"><Gauge size={14} className="text-accent" /> {project.size}</span>
              {project.client && (
                <span className="flex items-center gap-1.5"><User size={14} className="text-accent" /> {project.client}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {project.stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow border border-blue-50">
              <p className="text-2xl font-black text-primary">{s.value}</p>
              <p className="text-xs text-blue-400 uppercase tracking-widest mt-1 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow">
              <div className="flex items-center gap-3 mb-5 text-primary">
                <Info size={22} />
                <h2 className="text-xl font-bold uppercase tracking-tight">The Situation</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">{project.situation}</p>
            </section>

            <section className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle size={22} className="text-accent" />
                <h2 className="text-xl font-bold text-primary uppercase tracking-tight">The Decision</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">{project.decision}</p>
            </section>

            <section className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-xl font-bold text-primary mb-5 uppercase tracking-tight">The System</h2>
              <p className="text-base text-gray-700 font-medium leading-relaxed">{project.system}</p>
            </section>

            {/* Photo gallery */}
            {project.gallery.length > 1 && (
              <section>
                <h2 className="text-xl font-bold text-primary mb-5 uppercase tracking-tight">Project Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(i)}
                      className="relative aspect-square overflow-hidden rounded-2xl group shadow hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={src}
                        alt={`${project.title} photo ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-bold transition-opacity">View</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary text-white p-10 rounded-[2rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden sticky top-24">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="flex items-center gap-3 mb-8 text-accent relative z-10">
                <CheckCircle2 size={28} />
                <h2 className="text-lg font-bold uppercase tracking-tight">Operation Proof</h2>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="border-b border-white/10 pb-6">
                  <p className="text-xs text-blue-200 uppercase font-black tracking-widest mb-2">Outcome</p>
                  <p className="text-base leading-relaxed">{project.outcome}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-black tracking-widest mb-2">Status</p>
                  <p className="text-xl font-bold text-accent">{project.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={project.gallery[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-5 text-white/50 text-sm">
              {lightboxIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
