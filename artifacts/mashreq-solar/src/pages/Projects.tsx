import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Activity, User } from "lucide-react";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[400px] h-[400px] -top-20 -left-20" />
      <div className="smart-shape w-[300px] h-[300px] top-[20%] -right-10" />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md py-16 border-b border-blue-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary">Operational Projects</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl">
            A track record of systems running under real field conditions.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col bg-white/80 backdrop-blur-sm border border-white/60 rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                  <Activity size={11} className="text-accent" />
                  Operational
                </div>
                {project.gallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {project.gallery.length} photos
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-blue-500 mb-3 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1"><MapPin size={10} /> {project.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} /> {project.year}</span>
                </div>

                {project.client && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <User size={12} />
                    <span>{project.client}</span>
                  </div>
                )}

                <h2 className="text-lg font-bold text-primary mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5">
                  {project.outcome}
                </p>

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-2 mb-6 items-stretch">
                  {project.stats.map((s) => (
                    <div
                      key={s.label}
                      className="bg-blue-50 rounded-xl px-2 py-3 flex flex-col items-center justify-center text-center min-h-[64px]"
                    >
                      <p className="text-primary font-black text-sm leading-tight truncate w-full text-center">{s.value}</p>
                      <p className="text-[9px] text-blue-400 uppercase tracking-wider mt-1 font-semibold leading-tight text-center">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold text-sm py-3 rounded-xl hover:bg-blue-800 transition-colors group/btn"
                  >
                    View Full Project
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
