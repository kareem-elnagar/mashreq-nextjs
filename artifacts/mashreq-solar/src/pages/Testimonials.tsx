import { useTestimonials } from "@/lib/testimonials-store";
import { Link } from "wouter";
import { Quote, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

// Helper to get consistent gradient based on name initials
function getAvatarGradient(name: string) {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  const gradients = [
    "linear-gradient(135deg, #1e4b8f, #60a5fa)",
    "linear-gradient(135deg, #1e4b8f, #ffce07)",
    "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #f59e0b, #d97706)",
  ];
  return gradients[code % gradients.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function TestimonialsPage() {
  const { testimonials } = useTestimonials();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f1f5f9]">
      {/* Decorative ambient blur shapes */}
      <div className="smart-shape w-[35rem] h-[35rem] -top-20 -left-20" />
      <div className="smart-shape w-[25rem] h-[25rem] bottom-10 -right-10" style={{ background: "linear-gradient(135deg, #ffce07, #3b82f6)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-accent stroke-accent" />
            <span>Proven In The Field</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-6"
          >
            Trusted by Egypt's Agri-Business Pioneers
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            We design, assemble, and support solar pumping and grid integrations built for real desert operations. Here is what leading farm operators say about our engineering.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm max-w-md mx-auto">
            <Quote className="w-12 h-12 text-blue-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Testimonials Yet</h3>
            <p className="text-gray-500 text-sm">Be the first to share your field experience with Mashreq Solar.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => {
              const gradient = getAvatarGradient(t.name);
              const initials = getInitials(t.name);

              return (
                <motion.div
                  key={t.id}
                  variants={itemVariants}
                  className="glass-tint flex flex-col justify-between p-8 rounded-2xl border border-white/80 shadow-md shadow-blue-900/5 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Decorative background quote icon */}
                  <Quote className="absolute -top-3 -right-3 w-24 h-24 text-blue-50/40 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

                  <div className="relative z-10 flex-grow">
                    <Quote className="w-8 h-8 text-accent mb-6" />
                    <p className="text-gray-700 leading-relaxed italic mb-8">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex items-center space-x-4">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border border-blue-100 flex-shrink-0"
                          onError={(e) => {
                            // Fallback to initials if image errors out
                            (e.target as HTMLImageElement).style.display = "none";
                            const sibling = (e.target as HTMLImageElement).nextElementSibling;
                            if (sibling) (sibling as HTMLDivElement).style.display = "flex";
                          }}
                        />
                      ) : null}
                      
                      {/* Avatar initials fallback (always rendered but hidden if image loads) */}
                      <div
                        className="w-12 h-12 rounded-full text-white font-bold text-sm items-center justify-center flex-shrink-0"
                        style={{
                          background: gradient,
                          display: t.image ? "none" : "flex",
                        }}
                      >
                        {initials}
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {t.role}
                          {t.company ? <span className="block text-primary font-medium">{t.company}</span> : null}
                        </p>
                      </div>
                    </div>

                    {t.projectSlug && (
                      <Link
                        href={`/projects/${t.projectSlug}`}
                        className="text-xs text-primary font-semibold hover:text-accent flex items-center space-x-1 group/link transition-colors flex-shrink-0 ml-2"
                        title="View Case Study"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
