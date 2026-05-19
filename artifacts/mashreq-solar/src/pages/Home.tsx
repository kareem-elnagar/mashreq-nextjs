import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Factory, ShieldCheck, Droplet, TrendingUp, Clock, Sun, Download, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white relative">

      {/* Decorative blur shapes — behind everything */}
      <div className="smart-shape w-[600px] h-[600px] -top-32 -left-32 opacity-20 pointer-events-none absolute z-0" />
      <div className="smart-shape w-[500px] h-[500px] top-[35%] -right-40 opacity-15 pointer-events-none absolute z-0" style={{ animationDuration: '12s' }} />
      <div className="smart-shape w-[350px] h-[350px] bottom-0 left-[30%] opacity-10 pointer-events-none absolute z-0" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-[90vh] min-h-[620px] flex items-center overflow-hidden rounded-b-[3rem] shadow-2xl"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Clean dark overlay — left heavy, fades right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/90 via-[#0a0f1e]/55 to-[#0a0f1e]/10 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <p className="text-xs font-bold tracking-[0.25em] text-[#ffce07] uppercase mb-6">
              Engineering for Real Operation
            </p>

            <h1 className="text-4xl md:text-[3.5rem] font-black text-white leading-[1.1] mb-6">
              Solar systems that keep working<br className="hidden md:block" /> when it matters.
            </h1>

            <p className="text-base text-white/70 leading-relaxed mb-10 max-w-md">
              Designed for real farm conditions — not just installation day.
              Dust, heat, and load variations accounted for.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#0a0f1e] bg-[#ffce07] hover:bg-yellow-300 transition-all"
              >
                Get Assessment
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade into white */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-3 divide-x divide-slate-100">
          {[
            { value: "80%", label: "Solar Coverage", sub: "average across projects" },
            { value: "70%+", label: "Diesel Reduction", sub: "documented field results" },
            { value: "36mo+", label: "Uptime Record", sub: "zero growing-season downtime" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-8 first:pl-0 last:pr-0 text-center"
            >
              <p className="text-3xl md:text-4xl font-black text-[#1e4b8f]">{stat.value}</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OPERATIONAL PERFORMANCE ──────────────────────────── */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-[#ffce07] uppercase mb-3">Why Mashreq</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e4b8f] max-w-lg leading-tight">
              Built around how the system will actually run
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Design for Operation",
                text: "Every system is sized for dust accumulation, summer heat derating, and real load curves — not theoretical peak output.",
                accent: "#1e4b8f",
              },
              {
                icon: ShieldCheck,
                title: "Failure Analysis First",
                text: "We simulate failure modes on paper before a single panel goes in. If the system has a weakness, we find it during design.",
                accent: "#1e4b8f",
              },
              {
                icon: Droplet,
                title: "Matched to Your Schedule",
                text: "Pump sizing, battery capacity, and array orientation are tuned to your exact irrigation windows — not generic benchmarks.",
                accent: "#1e4b8f",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${item.accent}12` }}
                >
                  <item.icon size={22} style={{ color: item.accent }} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Second row — process steps */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 bg-[#1e4b8f] rounded-3xl overflow-hidden">
            {[
              { icon: Sun, step: "01", label: "Site Assessment", desc: "Load profile, irradiance, and field conditions reviewed before any proposal." },
              { icon: TrendingUp, step: "02", label: "System Design", desc: "Engineering-grade sizing with failure scenarios and seasonal variation baked in." },
              { icon: Clock, step: "03", label: "Operational Handover", desc: "We stay involved through the first season to verify performance matches design." },
            ].map((item, i) => (
              <div key={i} className="px-10 py-10 border-r border-white/10 last:border-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">{item.step}</span>
                  <item.icon size={16} className="text-[#ffce07]" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.label}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY PROFILE DOWNLOAD ─────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <FileText size={13} />
            Company Profile
          </div>
          <h2 className="text-3xl font-black text-[#1e4b8f] mb-3">Download Our Company Profile</h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">
            Full engineering portfolio, project case studies, and system capabilities — available in English and Arabic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Material/cp mashre_En.pdf"
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1e4b8f] text-white font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/15 group"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Download — English
            </a>
            <a
              href="/Material/cp mashreq Ar_organized.pdf"
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-[#1e4b8f] text-[#1e4b8f] font-bold hover:bg-blue-50 transition-all group"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              تحميل — عربي
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#ffce07] uppercase mb-4">Ready to start</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e4b8f] leading-tight mb-6">
            If your system stops,<br />everything stops.
          </h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">
            Tell us your setup. We'll review it and tell you exactly what the engineering should look like.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#1e4b8f] text-white font-bold hover:bg-blue-800 transition-all text-sm shadow-lg shadow-blue-900/20"
          >
            Start Your Assessment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
