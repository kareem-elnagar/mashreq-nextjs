import { Link } from "wouter";
import { ArrowRight, Droplet, Zap, Layers, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { systems } from "@/lib/data";
import { motion } from "framer-motion";

const systemIcons: Record<string, React.ReactNode> = {
  "off-grid-pumping": <Droplet size={28} />,
  "on-grid-solar": <Zap size={28} />,
  "hybrid-diesel-solar": <Layers size={28} />,
};

export default function SystemsPage() {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[500px] h-[500px] -top-32 -right-32" />
      <div className="smart-shape w-[350px] h-[350px] bottom-10 -left-20" />

      {/* Header */}
      <div className="bg-primary text-white py-20 relative rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">System Architecture</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl leading-relaxed">
            We design systems around how they'll actually be used in the field — not just on paper.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {systems.map((system, i) => (
            <motion.div
              key={system.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col bg-white/80 backdrop-blur-sm border border-white/60 rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={system.image}
                  alt={system.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 bg-accent text-primary p-3 rounded-2xl shadow-lg">
                  {systemIcons[system.slug]}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-primary mb-3 leading-tight">{system.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{system.description}</p>

                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                    <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">When to use</p>
                      <p className="text-xs text-green-900 leading-relaxed">{system.whenToUse}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl">
                    <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-1">When not to use</p>
                      <p className="text-xs text-red-900 leading-relaxed">{system.whenNotToUse}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Key risks</p>
                      <p className="text-xs text-amber-900 leading-relaxed">{system.risks}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-50">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full bg-primary/5 hover:bg-primary hover:text-white text-primary font-bold text-sm py-3 rounded-xl transition-all duration-300 group/btn"
                  >
                    Request Assessment
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary rounded-[2rem] p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which system fits?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            Our engineers will assess your site, load profile, and budget — then recommend the right architecture.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-primary font-bold px-10 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
          >
            Get a Free Technical Consultation
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
