import { Link } from "wouter";
import { ArrowRight, Droplet, Zap, Layers, ShieldAlert } from "lucide-react";
import { systems } from "@/lib/data";
import { motion } from "framer-motion";

export default function SystemsPage() {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[600px] h-[600px] -top-40 -right-40" />
      <div className="smart-shape w-[400px] h-[400px] bottom-0 -left-20" />

      <div className="bg-primary text-white py-24 relative rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold">System Architecture</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl leading-relaxed">
            We don't sell components. We design systems based on how they will be used in the field.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32 relative z-10">
        {systems.map((system, i) => (
          <motion.div
            key={system.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="w-full lg:w-1/2 overflow-hidden rounded-[3rem] h-[450px] shadow-2xl border-4 border-white">
              <img src={system.image} alt={system.title} className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="w-full lg:w-1/2 space-y-8 bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white/60 shadow-xl shadow-blue-900/5">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {system.slug.includes('pumping') ? <Droplet size={16} /> : system.slug.includes('on-grid') ? <Zap size={16} /> : <Layers size={16} />}
                <span>Architectural Type</span>
              </div>

              <h2 className="text-4xl font-bold text-primary">{system.title}</h2>
              <p className="text-xl text-slate-700 leading-relaxed font-light">{system.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-blue-100">
                <div className="bg-blue-50 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">When to use</h3>
                  <p className="text-slate-700 text-sm">{system.whenToUse}</p>
                </div>
                <div className="bg-red-50 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-4 flex items-center">
                    <ShieldAlert size={16} className="mr-2" /> Key Risks
                  </h3>
                  <p className="text-red-900 text-sm font-medium">{system.risks}</p>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center font-bold text-primary bg-accent/20 px-8 py-3 rounded-full hover:bg-accent/40 transition-all group"
                >
                  Request Technical Assessment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
