import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contacto" className="relative pt-16 pb-4 px-4 bg-transparent transition-colors duration-300">
      
      {/* Background radial overlays */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CEO Quote block (Inspiring message from Victor Becerra) */}
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Elegant double quote styling */}
            <div className="relative inline-block">
              <span className="text-6xl md:text-8xl font-serif text-blue-500/20 dark:text-blue-500/10 absolute -top-8 -left-10 select-none">“</span>
              <p className="text-xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight relative z-10 px-4">
                La verdadera innovación ocurre en la intersección de la precisión física y la escalabilidad digital. En LUXPROC S.A.C. no solo creamos sistemas integrados de hardware y software; diseñamos soluciones de alta ingeniería que potencian el crecimiento y la soberanía tecnológica de nuestros socios comerciales.
              </p>
              <span className="text-6xl md:text-8xl font-serif text-blue-500/20 dark:text-blue-500/10 absolute -bottom-16 -right-6 select-none">”</span>
            </div>

            <div className="flex flex-col items-center gap-3 pt-6">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                src="https://i.imgur.com/XdWDVQ3.jpeg"
                alt="Victor Becerra"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-blue-500/35 shadow-lg shadow-blue-500/5 select-none"
                referrerPolicy="no-referrer"
              />
              <div className="text-center">
                <h4 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-white tracking-tight">
                  Victor Becerra
                </h4>
                <p className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1">
                  CEO & Co-Fundador de LUXPROC S.A.C.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
