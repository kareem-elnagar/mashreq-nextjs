import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Activity } from "lucide-react";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[400px] h-[400px] -top-20 -left-20" />
      <div className="smart-shape w-[300px] h-[300px] top-[20%] -right-10" />

      <div className="bg-white/80 backdrop-blur-md py-16 border-b border-blue-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary">Operational Projects</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl">
            A track record of systems running under real field conditions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -10 }}
              className="group flex flex-col bg-white/70 backdrop-blur-sm border border-white/60 rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden rounded-t-[2.5rem]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center shadow-lg">
                  <Activity size={12} className="mr-2 text-accent" />
                  Operational
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center space-x-4 text-xs text-blue-500 mb-6 uppercase tracking-widest font-bold">
                  <span className="flex items-center"><MapPin size={12} className="mr-2" /> {project.location}</span>
                  <span className="flex items-center"><Calendar size={12} className="mr-2" /> {project.year}</span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-blue-700 transition-colors">{project.title}</h2>
                <p className="text-slate-700 text-sm mb-8 line-clamp-3 leading-relaxed font-light">{project.outcome}</p>
                <div className="mt-auto pt-8 border-t border-blue-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{project.size}</span>
                  <Link href={`/projects/${project.slug}`} className="bg-primary/5 text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-all">
                    <ArrowRight size={20} />
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
