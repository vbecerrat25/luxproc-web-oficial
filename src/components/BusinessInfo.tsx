import { motion } from "motion/react";
import { Eye, Target, Compass, Sparkles, Building2, Terminal } from "lucide-react";

export default function BusinessInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const compassVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 360,
      scale: 1.15,
      transition: { type: "spring", stiffness: 120, damping: 10 }
    }
  };

  const targetVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: [1, 1.25, 0.9, 1.15, 1],
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const eyeVariants = {
    initial: { scale: 1, scaleY: 1, x: 0, y: 0 },
    hover: {
      scale: 1.15,
      scaleY: [1, 0.15, 1, 1, 1],
      x: [0, 0, 0, -4, 4, 0],
      y: [0, 0, 0, -2, 2, 0],
      transition: {
        duration: 2,
        times: [0, 0.15, 0.3, 0.55, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  return (
    <section id="empresa" className="relative py-24 px-4 bg-transparent transition-colors duration-300 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Building2 className="w-3.5 h-3.5" />
            Información Corporativa
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white"
          >
            Arquitectos del Futuro Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
          >
            LUXPROC nace con la visión de unificar ingeniería de hardware avanzada, desarrollo de software de misión crítica (ERPs, CRMs) y proyectos de innovación científica (I+D+i) para crear impacto real.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Card 1: Qué Hacemos */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 w-fit mb-6 transition-colors duration-300 group-hover:bg-blue-500/20">
                <motion.div variants={compassVariants} className="relative z-10">
                  <Compass className="w-6 h-6" />
                </motion.div>
                {/* Custom rotating dotted outer indicator */}
                <span className="absolute inset-0 rounded-2xl border border-dashed border-blue-500/40 scale-110 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 pointer-events-none" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                ¿Qué Hacemos?
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-100 leading-relaxed mb-4">
                Diseñamos, desarrollamos e implementamos ecosistemas empresariales integrales. No solo escribimos código inteligente para CRM y ERP corporativos; también diseñamos soluciones de hardware dedicadas e instalaciones eléctricas certificadas que sustentan la infraestructura física de tu compañía.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3" /> Software
              </span>
              <span>•</span>
              <span>Hardware</span>
              <span>•</span>
              <span>I+D+i</span>
            </div>
          </motion.div>

          {/* Card 2: Misión */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit mb-6 transition-colors duration-300 group-hover:bg-emerald-500/20">
                <motion.div variants={targetVariants} className="relative z-10">
                  <Target className="w-6 h-6" />
                </motion.div>
                {/* Custom dynamic expanding radar wave ping */}
                <span className="absolute inset-0 rounded-2xl bg-emerald-500/20 scale-100 opacity-0 group-hover:animate-ping pointer-events-none" style={{ animationDuration: '1.2s' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                Nuestra Misión
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-100 leading-relaxed mb-4">
                Empoderar a empresas e instituciones mediante tecnología de vanguardia unificada. Transformamos operaciones complejas en flujos sencillos a través de automatización, software a medida altamente escalable y soporte físico robusto, asegurando una transición fluida al entorno digital del siglo XXI.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
              <span>Optimización</span>
              <span>•</span>
              <span>Eficiencia Real</span>
              <span>•</span>
              <span>Calidad</span>
            </div>
          </motion.div>

          {/* Card 3: Visión */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 w-fit mb-6 transition-colors duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                <motion.div variants={eyeVariants} className="relative z-10">
                  <Eye className="w-6 h-6" />
                </motion.div>
                {/* Custom glowing border expansion aura */}
                <span className="absolute inset-0 rounded-2xl border border-purple-500/30 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">
                Nuestra Visión 2030
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-100 leading-relaxed mb-4">
                Ser líderes indiscutibles en la integración físico-digital de Latinoamérica y Europa. Nos proyectamos como el socio estratégico definitivo para proyectos de innovación científica (I+D+i), destacando por nuestra capacidad de crear tecnología que fusiona de manera invisible el software moderno y los sistemas físicos.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Innovación
              </span>
              <span>•</span>
              <span>Escalabilidad</span>
              <span>•</span>
              <span>I+D</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Corporate Numbers badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="text-center">
            <p className="text-2xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">99.8%</p>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 mt-1">Uptime de Sistemas</p>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <p className="text-2xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">2</p>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 mt-1">Sistemas ERP/CRM Implementados</p>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <p className="text-2xl md:text-4xl font-extrabold text-purple-600 dark:text-purple-400">3</p>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 mt-1">Proyectos de Innovación I+D+i</p>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <p className="text-2xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</p>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300 mt-1">Sincronización Directa Calendar</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
