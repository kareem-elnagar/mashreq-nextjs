import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Droplet, ShieldCheck } from "lucide-react";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-slate-50/50">
      <div className="smart-shape w-[500px] h-[500px] -top-20 -left-20 animate-pulse" />
      <div className="smart-shape w-[400px] h-[400px] top-[40%] -right-20 animate-bounce" style={{ animationDuration: '10s' }} />
      <div className="smart-shape w-[300px] h-[300px] -bottom-20 left-[20%]" />

      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden rounded-b-[4rem] shadow-2xl bg-[#1e4b8f]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1600"
            alt="Mashreq Solar Installation"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
              Solar systems that keep working when it matters
            </h1>
            <p className="mt-6 text-xl text-blue-50 font-bold drop-shadow-lg">
              Designed for real farm conditions — not just installation day.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-white text-accent px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center group shadow-2xl shadow-accent/20"
              >
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16 relative inline-block">
            Operational Performance
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Factory, title: "Design for Operation", text: "We factor in dust, heat, and load variations." },
              { icon: ShieldCheck, title: "Failure Analysis", text: "We solve problems on paper before installation." },
              { icon: Droplet, title: "Matching Real Use", text: "Matching systems to your specific schedule." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border border-white/50 shadow-xl shadow-blue-900/5"
              >
                <div className="bg-primary/10 p-6 rounded-3xl mb-6 text-primary"><item.icon size={32} /></div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-700 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0f172a] text-white text-center relative overflow-hidden">
        <div className="smart-shape w-[300px] h-[300px] top-0 right-0 opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">If your system stops,<br />everything stops.</h2>
          <Link href="/contact" className="inline-block bg-white text-accent px-12 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-accent/10">
            Start Your Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
