import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Eye, 
  Target, 
  Compass, 
  Sparkles, 
  Building2, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Award, 
  MessageSquareText, 
  Layers, 
  ArrowLeft 
} from "lucide-react";

export default function BusinessInfo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleReset = () => setIsOpen(false);

    window.addEventListener("open-nosotros-fullview", handleOpen);
    window.addEventListener("reset-to-home", handleReset);

    return () => {
      window.removeEventListener("open-nosotros-fullview", handleOpen);
      window.removeEventListener("reset-to-home", handleReset);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
      scale: 1.12,
      transition: { type: "spring", stiffness: 120, damping: 10 }
    }
  };

  const targetVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: [1, 1.2, 0.95, 1.1, 1],
      rotate: [0, -8, 8, -4, 4, 0],
      transition: { duration: 0.7, ease: "easeInOut" }
    }
  };

  const eyeVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.12,
      transition: { duration: 0.3 }
    }
  };

  const valoresData = [
    {
      title: "Confianza",
      icon: ShieldCheck,
      color: "from-blue-500 to-cyan-500",
      text: "Cada solución entregada por LUXPROC debe ser predecible, segura y respaldada por un soporte real. La confianza se construye con cumplimiento sostenido en el tiempo, no con promesas puntuales, y se traduce visualmente en el uso del azul corporativo como color dominante del sistema."
    },
    {
      title: "Innovación",
      icon: Cpu,
      color: "from-sky-400 to-blue-600",
      text: "LUXPROC adopta de forma temprana pero responsable las tecnologías emergentes (inteligencia artificial, automatización, IoT) siempre subordinadas a la resolución de un problema real del cliente, nunca como ejercicio tecnológico por sí mismo."
    },
    {
      title: "Excelencia técnica",
      icon: Award,
      color: "from-indigo-500 to-blue-500",
      text: "El estándar de calidad de código, arquitectura de sistemas e infraestructura no se negocia por plazos ni presupuesto. La excelencia técnica es la base silenciosa que sostiene la reputación de confiabilidad de la marca."
    },
    {
      title: "Cercanía y claridad",
      icon: MessageSquareText,
      color: "from-cyan-500 to-teal-500",
      text: "A pesar de operar en un sector highly técnico, LUXPROC se comunica sin jerga innecesaria, explicando el valor de negocio de cada solución en términos que el cliente —sea o no especialista en tecnología— pueda comprender con claridad."
    },
    {
      title: "Escalabilidad y flexibilidad",
      icon: Layers,
      color: "from-blue-600 to-indigo-600",
      text: "Las soluciones se diseñan pensando en el crecimiento futuro del cliente, evitando arquitecturas rígidas que generen deuda técnica o dependencias insostenibles a mediano plazo."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-left"
        >
          {/* Ambient lighting overlays */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 dark:bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
              </button>

              <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                  Ventana Corporativa: <span className="font-bold text-slate-800 dark:text-white">Nosotros</span>
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span>Cultura, Misión, Visión & Principios</span>
              </div>
            </div>

            {/* Header Section */}
            <div className="mb-16 text-left max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                <span>Nosotros — Cultura & Principios LUXPROC</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Arquitectos del <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">Futuro Digital</span>
              </h1>
              <p className="mt-6 text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                LUXPROC nace con la visión de unificar ingeniería de hardware avanzada, desarrollo de software de misión crítica (ERPs, CRMs) y proyectos de innovación científica (I+D+i) para crear impacto real y sostenible.
              </p>
            </div>

            {/* 3 Main Cards: ¿Qué Hacemos?, Misión, Visión */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20"
            >
              {/* Card 1: ¿Qué Hacemos? */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <motion.div variants={compassVariants}>
                        <Compass className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                      Ecosistema
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-500 text-xs font-black">▲</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ¿Qué Hacemos?
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Diseñamos, desarrollamos e implementamos ecosistemas empresariales integrales. No solo escribimos código inteligente para CRM y ERP corporativos; también diseñamos soluciones de hardware dedicadas e instalaciones eléctricas certificadas que sustentan la infraestructura física de tu compañía.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <Terminal className="w-3.5 h-3.5" /> Software
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
                className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <motion.div variants={targetVariants}>
                        <Target className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                      Propósito
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sky-400 text-xs font-black">▲</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Misión
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Transformar los procesos de nuestros clientes mediante soluciones tecnológicas inteligentes, seguras y escalables, generando eficiencia, productividad y crecimiento sostenible.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="text-sky-600 dark:text-sky-400">Eficiencia</span>
                  <span>•</span>
                  <span>Seguridad</span>
                  <span>•</span>
                  <span>Crecimiento</span>
                </div>
              </motion.div>

              {/* Card 3: Visión */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <motion.div variants={eyeVariants}>
                        <Eye className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                      Futuro
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-indigo-400 text-xs font-black">▲</span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Visión
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Ser la empresa tecnológica de referencia en transformación digital e innovación, reconocida por su excelencia, confiabilidad e impacto en la modernización de organizaciones a nivel nacional e internacional.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Excelencia
                  </span>
                  <span>•</span>
                  <span>Impacto Global</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Section: Cultura & Principios (Valores) */}
            <div className="pt-8 mb-20 border-t border-slate-200/60 dark:border-slate-800/80">
              <div className="w-full mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Cultura & Principios
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Valores
                </h2>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed w-full">
                  Los valores son los principios de comportamiento no negociables que guían la manera en que LUXPROC toma decisiones, se relaciona con sus clientes y desarrolla sus productos. A diferencia de la misión y la visión, que se comunican principalmente hacia afuera, los valores operan sobre todo hacia adentro: son la cultura que sostiene la promesa de marca en cada interacción diaria.
                </p>
              </div>

              {/* Value Cards List */}
              <div className="space-y-4">
                {valoresData.map((val, idx) => {
                  return (
                    <motion.div
                      key={val.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="rounded-2xl bg-white dark:bg-slate-900 border-l-4 border-sky-400 p-6 shadow-sm border-y border-r border-slate-200/70 dark:border-slate-800/80 hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {val.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {val.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Corporate Numbers badge */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md mb-20">
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
            </div>

            {/* Bottom CTA to Agenda or Return */}
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-12">
              <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                ¿Quieres conocer más sobre nuestras capacidades de ingeniería?
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                Agenda una consultoría técnica directamente con nuestro equipo ejecutivo para analizar tu proyecto o requerimiento de software/hardware.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#calendario"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const target = document.getElementById("calendario");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  Agendar Consultoría de Ingeniería
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Volver a Inicio
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


