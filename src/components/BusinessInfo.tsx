import { motion } from "motion/react";
import { Eye, Target, Compass, Sparkles, Building2, Terminal, ShieldCheck, Cpu, Award, MessageSquareText, Layers, ChevronRight } from "lucide-react";

export default function BusinessInfo() {
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
      text: "A pesar de operar en un sector altamente técnico, LUXPROC se comunica sin jerga innecesaria, explicando el valor de negocio de cada solución en términos que el cliente —sea o no especialista en tecnología— pueda comprender con claridad."
    },
    {
      title: "Escalabilidad y flexibilidad",
      icon: Layers,
      color: "from-blue-600 to-indigo-600",
      text: "Las soluciones se diseñan pensando en el crecimiento futuro del cliente, evitando arquitecturas rígidas que generen deuda técnica o dependencias insostenibles a mediano plazo."
    }
  ];

  return (
    <section id="empresa" className="relative py-24 px-4 bg-transparent transition-colors duration-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 whitespace-nowrap shadow-sm"
          >
            <Building2 className="w-4 h-4 shrink-0 text-blue-500" />
            <span>Información Corporativa</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Arquitectos del Futuro Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            LUXPROC nace con la visión de unificar ingeniería de hardware avanzada, desarrollo de software de misión crítica (ERPs, CRMs) y proyectos de innovación científica (I+D+i) para crear impacto real.
          </motion.p>
        </div>

        {/* 3 Main Cards: ¿Qué Hacemos?, Misión, Visión */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {/* Card 1: ¿Qué Hacemos? */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="group relative rounded-3xl p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
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
            className="group relative rounded-3xl p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
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
            className="group relative rounded-3xl p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
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

        {/* Section: Valores */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-200/60 dark:border-slate-800/80"
        >
          {/* Header of Valores */}
          <div className="w-full mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cultura & Principios
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Valores
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed w-full">
              Los valores son los principios de comportamiento no negociables que guían la manera en que LUXPROC toma decisiones, se relaciona con sus clientes y desarrolla sus productos. A diferencia de la misión y la visión, que se comunican principalmente hacia afuera, los valores operan sobre todo hacia adentro: son la cultura que sostiene la promesa de marca en cada interacción diaria.
            </p>
          </div>

          {/* Value Cards List (Full width stacked items matching Image 3) */}
          <div className="space-y-4">
            {valoresData.map((val, idx) => {
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-l-4 border-sky-400 p-6 shadow-sm border-y border-r border-slate-200/70 dark:border-slate-800/80 hover:shadow-md transition-all duration-200"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {val.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Corporate Numbers badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300"
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


