import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, AlertCircle, Info, Calendar, MapPin, Gauge } from "lucide-react";
import { projects } from "@/lib/data";

interface Props {
  slug: string;
}

export default function ProjectDetail({ slug }: Props) {
  const project = projects.find((p) => p.slug === slug);

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

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="smart-shape w-[400px] h-[400px] -top-20 -right-20" />

      <div className="relative h-[60vh] min-h-[400px] rounded-b-[4rem] overflow-hidden shadow-2xl">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/projects" className="text-white/90 hover:text-white flex items-center mb-6 transition-colors drop-shadow-md">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-xl">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-white font-medium drop-shadow-lg">
              <span className="flex items-center"><MapPin size={16} className="mr-2 text-accent" /> {project.location}</span>
              <span className="flex items-center"><Calendar size={16} className="mr-2 text-accent" /> Installed {project.year}</span>
              <span className="flex items-center"><Gauge size={16} className="mr-2 text-accent" /> {project.size}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] border border-white">
              <div className="flex items-center space-x-3 mb-6 text-primary">
                <Info size={24} />
                <h2 className="text-2xl font-bold uppercase tracking-tight">The Situation</h2>
              </div>
              <p className="text-xl text-slate-800 leading-relaxed font-light">{project.situation}</p>
            </section>

            <section className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] border border-white">
              <div className="flex items-center space-x-3 mb-6 text-accent">
                <AlertCircle size={24} />
                <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">The Decision</h2>
              </div>
              <p className="text-xl text-slate-800 leading-relaxed">{project.decision}</p>
            </section>

            <section className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-8 uppercase tracking-tight">The System</h2>
              <p className="text-lg text-gray-700 font-medium">{project.system}</p>
            </section>
          </div>

          <div className="space-y-12">
            <div className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="flex items-center space-x-3 mb-10 text-accent relative z-10">
                <CheckCircle2 size={32} />
                <h2 className="text-xl font-bold uppercase tracking-tight">Operation Proof</h2>
              </div>
              <div className="space-y-8 relative z-10">
                <div className="border-b border-white/10 pb-6 last:border-0">
                  <p className="text-xs text-blue-200 uppercase font-black tracking-widest mb-3">Outcome</p>
                  <p className="text-lg leading-relaxed">{project.outcome}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-black tracking-widest mb-3">Status</p>
                  <p className="text-2xl font-bold text-accent">{project.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
