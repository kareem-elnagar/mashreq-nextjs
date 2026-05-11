import { useState } from "react";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[500px] h-[500px] -top-20 -right-20 animate-pulse" />
      <div className="smart-shape w-[400px] h-[400px] bottom-0 -left-20 animate-bounce" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">Technical Consultation</h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                We don't start with equipment. We start with how your system needs to run.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-center space-x-6 bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-xl shadow-blue-900/5">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary"><Mail size={24} /></div>
                <div><h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-1">Direct Email</h3><p className="text-gray-600">engineering@mashreqsolar.com</p></div>
              </div>
              <div className="flex items-center space-x-6 bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-xl shadow-blue-900/5">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary"><Phone size={24} /></div>
                <div><h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-1">Office Support</h3><p className="text-gray-600">+20 123 456 7890</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] p-8 md:p-12">
            {submitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="inline-flex items-center justify-center bg-green-50 p-6 rounded-full mb-4 text-green-600 shadow-inner"><CheckCircle2 size={48} /></div>
                <h2 className="text-3xl font-bold text-primary">Brief Received</h2>
                <p className="text-slate-700 font-light">An engineer will contact you shortly to review your technical requirements.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <input required type="text" className="w-full bg-slate-100/50 border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 py-4 focus:ring-0 outline-none transition-all placeholder-slate-400 text-slate-800" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-slate-100/50 border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 py-4 focus:ring-0 outline-none transition-all placeholder-slate-400 text-slate-800" placeholder="+20..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2">System Interest</label>
                  <select className="w-full bg-slate-100/50 border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 py-4 focus:ring-0 outline-none transition-all text-slate-800 appearance-none">
                    <option>Select System Type</option>
                    <option>Off-Grid Solar Pumping</option>
                    <option>On-Grid Solar System</option>
                    <option>Hybrid Diesel-Solar</option>
                    <option>Technical Assessment / Audit</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2">Technical Brief</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-slate-100/50 border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 py-4 focus:ring-0 outline-none transition-all placeholder-slate-400 text-slate-800 resize-none"
                    placeholder="Describe your current power situation or technical goals..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center group hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20">
                  Submit Brief
                  <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
