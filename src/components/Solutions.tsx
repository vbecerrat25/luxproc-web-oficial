import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, 
  Settings, 
  Terminal, 
  Lightbulb, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Database, 
  Briefcase, 
  MessageSquare,
  Sparkles,
  BarChart3,
  X,
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Coins,
  Truck,
  Factory,
  ShieldAlert,
  Globe,
  Code,
  Layout,
  Server,
  Lock,
  Search,
  CreditCard,
  Smartphone,
  Gauge,
  Workflow
} from "lucide-react";

// Types for the CRM and ERP modules
interface Module {
  id: string;
  name: string;
  category: "CRM" | "ERP";
  description: string;
  icon: any;
  color: string;
  previewWidget: () => React.ReactNode;
}

export default function Solutions() {
  const [selectedCategory, setSelectedCategory] = useState<"CRM" | "ERP">("CRM");
  const [activeModules, setActiveModules] = useState<string[]>(["leads", "funnel", "intelligence"]);
  const [selectedSolution, setSelectedSolution] = useState<any | null>(null);
  const [isERPFulviewOpen, setIsERPFulviewOpen] = useState(false);
  const [isWebFullviewOpen, setIsWebFullviewOpen] = useState(false);
  const [isSolutionsFullviewOpen, setIsSolutionsFullviewOpen] = useState(false);

  // Listen for reset-to-home and custom fullview triggers
  useEffect(() => {
    const handleReset = () => {
      setIsERPFulviewOpen(false);
      setIsWebFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
    };
    const handleOpenSolutions = () => {
      setIsSolutionsFullviewOpen(true);
      setIsERPFulviewOpen(false);
      setIsWebFullviewOpen(false);
      setSelectedSolution(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenWeb = () => {
      setIsWebFullviewOpen(true);
      setIsERPFulviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenERP = () => {
      setIsERPFulviewOpen(true);
      setIsWebFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("reset-to-home", handleReset);
    window.addEventListener("open-solutions-fullview", handleOpenSolutions);
    window.addEventListener("open-web-fullview", handleOpenWeb);
    window.addEventListener("open-erp-fullview", handleOpenERP);

    return () => {
      window.removeEventListener("reset-to-home", handleReset);
      window.removeEventListener("open-solutions-fullview", handleOpenSolutions);
      window.removeEventListener("open-web-fullview", handleOpenWeb);
      window.removeEventListener("open-erp-fullview", handleOpenERP);
    };
  }, []);

  // All core solutions list
  const CORE_SOLUTIONS = [
    {
      id: "crm",
      title: "Soluciones CRM a la Medida",
      description: "Sistemas avanzados de retención, automatización de embudos comerciales y fidelización de clientes con integraciones omnicanal.",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      badge: "Software",
      details: "Sistemas CRM robustos diseñados desde cero o integrados con plataformas líderes. Automatizamos sus flujos de ventas y de soporte de extremo a extremo.",
      features: ["WhatsApp API integrada & CRM Multiagente", "Módulo de Campañas automatizadas y segmentación", "Reportabilidad BI avanzada y analítica en tiempo real", "Modelos IA predictivos para scoring de leads"]
    },
    {
      id: "erp",
      title: "Ecosistemas ERP de Clase Mundial",
      description: "Automatización total de inventarios, contabilidad, adquisiciones y logística integral, centralizando la toma de decisiones empresariales.",
      icon: Building,
      color: "from-purple-500 to-indigo-700",
      badge: "Enterprise",
      details: "Soporte completo para facturación electrónica, adquisiciones, control de inventario multialmacén y contabilidad integrada con normativas fiscales chilenas.",
      features: ["Facturación Electrónica SII certificada", "Gestión Multibodega y trazabilidad en tiempo real", "Control de Activos, Costos de Importación y Compras", "Contabilidad de doble entrada adaptada al SII"]
    },
    {
      id: "web",
      title: "Arquitectura Web Moderna",
      description: "Plataformas web ultra-veloces SSR/ISR utilizando React, Next.js y Tailwind CSS, optimizadas nativamente para SEO (Motores de Búsqueda) y UX.",
      icon: Terminal,
      color: "from-emerald-500 to-teal-600",
      badge: "Sistemas",
      details: "Portales de alto rendimiento y arquitecturas web optimizadas para ofrecer la mejor velocidad de carga posible y un posicionamiento orgánico imbatible.",
      features: ["Tiempo de carga récord (Core Web Vitals óptimos)", "Estructura optimizada para SEO y conversiones", "Pasarelas de Pago integradas con cifrado SSL", "Infraestructura Cloud autoadaptativa (Serverless)"]
    },
    {
      id: "electricidad",
      title: "Instalaciones Eléctricas de Alta Potencia",
      description: "Ingeniería eléctrica, automatizaciones de tableros industriales y cableado estructurado según normativas de seguridad internacionales.",
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      badge: "Hardware & Electricidad",
      details: "Servicios certificados SEC para el tendido, estructurado y montaje de tableros de transferencia, control industrial PLC y automatizaciones generales.",
      features: ["Planos e Ingeniería certificada por instaladores SEC", "Tableros con medición telemétrica IP integrada", "Sistemas de respaldo de energía y UPS industriales", "Optimización de factor de potencia y eficiencia de red"]
    },
    {
      id: "hardware",
      title: "Hardware y Software a Medida",
      description: "Diseño de firmware, integración de sensores IoT, desarrollo de microcontroladores y programación integrada de bajo nivel.",
      icon: Cpu,
      color: "from-cyan-500 to-blue-600",
      badge: "Integración Física",
      details: "Ingeniería de hardware integrada con desarrollo de placas PCB personalizadas, conectividad IoT de largo alcance y telemetría de campo.",
      features: ["Diseño de placas de circuito impreso PCB multicapa", "Firmware robusto basado en RTOS (Real-time OS)", "Conectividad inalámbrica avanzada (LoRaWAN, LTE-M)", "Monitoreo continuo con telemetría de sensores industriales"]
    },
    {
      id: "innovacion",
      title: "Proyectos de Innovación (I+D+i)",
      description: "Investigación, desarrollo tecnológico e innovación aplicada para generar soluciones de patentes que resuelvan cuellos de botella científicos.",
      icon: Lightbulb,
      color: "from-rose-500 to-pink-600",
      badge: "Innovación Científica",
      details: "Soporte completo en la estructuración de proyectos de I+D+i, formulación para financiamientos CORFO y prototipado físico/virtual avanzado.",
      features: ["Diseño conceptual y viabilidad para patentes de invención", "Formulación de proyectos para fondos públicos y CORFO", "Simulación por computadora y prototipos virtuales (CAD/FEA)", "Análisis riguroso de pre-factibilidad técnica y científica"]
    }
  ];

  // Modules available to configure for CRM & ERP
  const PREVIEW_MODULES: Module[] = [
    // CRM Modules
    {
      id: "leads",
      name: "Embudo de Prospectos Pros",
      category: "CRM",
      description: "Asignación automática de oportunidades mediante aprendizaje predictivo.",
      icon: Users,
      color: "text-blue-500 bg-blue-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.06)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer select-none"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400">EMBUDO ACTIVO</span>
            <motion.span 
              whileHover={{ scale: 1.08 }}
              className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
            >
              ALTA TASA
            </motion.span>
          </div>
          <div className="space-y-2">
            <motion.div 
              whileHover={{ x: 4, scale: 1.01 }}
              className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg text-xs transition-colors hover:bg-blue-50/80 dark:hover:bg-slate-600/50"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-200">Carlos Mendoza</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">S/ 18,200</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 4, scale: 1.01 }}
              className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg text-xs transition-colors hover:bg-blue-50/80 dark:hover:bg-slate-600/50"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-200">Alianzas Siemens</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">S/ 47,500</span>
            </motion.div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-right">Actualizado hace un momento...</p>
        </motion.div>
      )
    },
    {
      id: "funnel",
      name: "Tasa de Conversión CRM",
      category: "CRM",
      description: "Pipeline interactivo con arrastre y cálculo de ROI inmediato.",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.15), 0 10px 10px -5px rgba(16, 185, 129, 0.06)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer select-none"
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </motion.div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">CONVERSIÓN DE LEADS</h4>
          </div>
          <div className="flex items-end gap-1.5 h-20 pt-4 px-2">
            <motion.div 
              whileHover={{ scaleY: 1.2, originY: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="bg-blue-500/80 dark:bg-blue-600/80 hover:bg-blue-500 h-1/3 w-full rounded-t-md transition-colors" 
            />
            <motion.div 
              whileHover={{ scaleY: 1.2, originY: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="bg-blue-500/80 dark:bg-blue-600/80 hover:bg-blue-500 h-1/2 w-full rounded-t-md transition-colors" 
            />
            <motion.div 
              whileHover={{ scaleY: 1.2, originY: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="bg-blue-500/80 dark:bg-blue-600/80 hover:bg-blue-500 h-2/3 w-full rounded-t-md transition-colors" 
            />
            <motion.div 
              whileHover={{ scaleY: 1.15, originY: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="bg-emerald-500/90 hover:bg-emerald-500 h-5/6 w-full rounded-t-md transition-colors shadow-sm shadow-emerald-500/20" 
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-2">
            <span>Marzo</span>
            <span>Abril</span>
            <span>Mayo</span>
            <motion.span 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="font-bold text-emerald-500 dark:text-emerald-400"
            >
              Junio (+42%)
            </motion.span>
          </div>
        </motion.div>
      )
    },
    {
      id: "intelligence",
      name: "IA Copilot Conversaciones",
      category: "CRM",
      description: "Análisis semántico del tono y necesidades en consultas de clientes.",
      icon: MessageSquare,
      color: "text-purple-500 bg-purple-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            rotate: 0.5,
            boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.15)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-md relative overflow-hidden cursor-pointer select-none"
        >
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute right-2 top-2 text-white/20"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <h4 className="text-xs font-mono tracking-widest text-indigo-100 uppercase mb-2">PREDICCIONES IA</h4>
          <p className="text-xs font-semibold relative z-10">Cliente potencial muestra un 94% de intención de compra para licenciamiento ERP.</p>
          <div className="mt-3 flex gap-2 relative z-10">
            <motion.span 
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-medium"
            >
              Sugerir Cotización
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.08, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
              className="text-[9px] bg-emerald-600 px-2 py-0.5 rounded-full font-medium"
            >
              Enviar Email
            </motion.span>
          </div>
        </motion.div>
      )
    },
    // ERP Modules
    {
      id: "inventory",
      name: "Control de Inventario Robot",
      category: "ERP",
      description: "Trazabilidad de almacenes con alertas inteligentes y auto-reabastecimiento.",
      icon: Database,
      color: "text-amber-500 bg-amber-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.15), 0 10px 10px -5px rgba(245, 158, 11, 0.06)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer select-none"
        >
          <span className="text-[10px] font-bold text-amber-500 tracking-wider">STOCK CRÍTICO</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Microcontroladores I+D</span>
            <motion.span 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xs font-bold text-red-500"
            >
              12 unid.
            </motion.span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden mt-1.5">
            <motion.div 
              initial={{ width: "15%" }}
              whileHover={{ width: "35%" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-red-500 h-full rounded-full" 
            />
          </div>
          <div className="mt-3 flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Reordenar automático: Sí</span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded text-[9px] font-bold"
            >
              Solicitado a Siemens
            </motion.span>
          </div>
        </motion.div>
      )
    },
    {
      id: "operations",
      name: "Logística y Facturación",
      category: "ERP",
      description: "Generación automática de pólizas contables e impuestos en tiempo real.",
      icon: Briefcase,
      color: "text-emerald-500 bg-emerald-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.15), 0 10px 10px -5px rgba(16, 185, 129, 0.06)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer select-none"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Facturación</span>
            <motion.span 
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-emerald-500 dark:text-emerald-400 text-xs font-bold flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              ACTIVO
            </motion.span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <motion.span 
              whileHover={{ scale: 1.05, color: "#10b981" }}
              className="text-xl font-extrabold text-slate-800 dark:text-white transition-colors"
            >
              S/ 75,410
            </motion.span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Facturado hoy</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between">
            <span>Boletas autorizadas</span>
            <motion.span 
              whileHover={{ scale: 1.05, color: "#10b981" }}
              className="text-slate-700 dark:text-slate-200 font-semibold font-mono"
            >
              SII OK
            </motion.span>
          </div>
        </motion.div>
      )
    },
    {
      id: "architect",
      name: "Orquestador de Infraestructura",
      category: "ERP",
      description: "Consola de consumo eléctrico, potencia de servidores y control IoT integrado.",
      icon: Cpu,
      color: "text-indigo-500 bg-indigo-500/10",
      previewWidget: () => (
        <motion.div 
          whileHover={{ 
            y: -6, 
            scale: 1.025, 
            rotate: -0.5,
            boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.25), 0 10px 10px -5px rgba(99, 102, 241, 0.12)" 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs relative overflow-hidden shadow-md cursor-pointer select-none"
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-blue-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
              SYS.MONITOR
            </span>
            <span className="text-slate-500 text-[10px]">ZONE-A</span>
          </div>
          <div className="space-y-1.5 mt-2 text-[11px]">
            <motion.p whileHover={{ x: 3, color: "#10b981" }} className="transition-colors">🔋 Consumo: <span className="text-emerald-400">4.12 KW</span></motion.p>
            <motion.p whileHover={{ x: 3, color: "#3b82f6" }} className="transition-colors">⚙️ Procesos: <span className="text-blue-400">89 Hilos</span></motion.p>
            <motion.p whileHover={{ x: 3, color: "#f59e0b" }} className="transition-colors">⚡ Voltaje Tablero: <span className="text-amber-400">380V (Tri)</span></motion.p>
          </div>
        </motion.div>
      )
    }
  ];

  // Modules currently being rendered
  const categoryModules = PREVIEW_MODULES.filter((m) => m.category === selectedCategory);

  const toggleModule = (id: string) => {
    setActiveModules((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  // Helper to retrieve highly customized, unique micro-interactions for each of the 6 core solution icons (triggered when parent card is hovered)
  const getIconVariants = (id: string) => {
    switch (id) {
      case "crm": // Users icon: Bounces up and sways gracefully
        return {
          hover: { 
            scale: [1, 1.25, 1.15],
            rotate: [0, -8, 8, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          },
          tap: { scale: 0.92 }
        };
      case "erp": // Building icon: Solid upward structural rise
        return {
          hover: { 
            y: [0, -8, -4],
            scale: 1.15,
            transition: { duration: 0.4, ease: "easeOut" }
          },
          tap: { scale: 0.95, y: 0 }
        };
      case "web": // Terminal icon: horizontal slider mimicking command execution cursor
        return {
          hover: { 
            x: [0, 5, -3, 3, 0],
            scale: 1.12,
            transition: { duration: 0.5, ease: "easeInOut" }
          },
          tap: { scale: 0.95 }
        };
      case "electricidad": // Zap icon: Fast electric jitter and expand
        return {
          hover: { 
            scale: 1.25,
            x: [0, -2, 2, -2, 2, 0],
            y: [0, 1.5, -1.5, 1, -1, 0],
            transition: { duration: 0.35, repeat: Infinity, repeatType: "reverse" as const }
          },
          tap: { scale: 0.92, rotate: -15 }
        };
      case "hardware": // Cpu icon: Rotates on clock cycles
        return {
          hover: { 
            rotate: 180,
            scale: 1.2,
            transition: { type: "spring", stiffness: 220, damping: 12 }
          },
          tap: { scale: 0.9, rotate: 270 }
        };
      case "innovacion": // Lightbulb icon: dynamic pulsing glow beacon
        return {
          hover: { 
            scale: [1, 1.28, 1.2],
            filter: ["brightness(1)", "brightness(1.4)", "brightness(1.15)"],
            transition: { 
              duration: 1.1, 
              repeat: Infinity, 
              repeatType: "reverse" as const,
              ease: "easeInOut"
            }
          },
          tap: { scale: 0.92 }
        };
      default:
        return {
          hover: { scale: 1.2, rotate: 12 },
          tap: { scale: 0.9, rotate: -10 }
        };
    }
  };

  return (
    <section id="soluciones" className="relative py-24 px-4 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            onClick={() => {
              setIsSolutionsFullviewOpen(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 cursor-pointer hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            Nuestras Soluciones Corporativas
          </div>
          <h2 
            onClick={() => {
              setIsSolutionsFullviewOpen(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Ingeniería que trasciende límites
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            Unificamos el espectro tecnológico completo. Desde la consultoría e implementación de software de planificación empresarial (ERP) y relaciones comerciales (CRM), hasta el diseño de hardware robusto y automatizaciones industriales (instalaciones eléctricas).
          </p>
          <button
            onClick={() => {
              setIsSolutionsFullviewOpen(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
          >
            Ver Vista Completa de Soluciones <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Grid Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {CORE_SOLUTIONS.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.99, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { 
                    y: -6, 
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  },
                  tap: { 
                    scale: 0.98,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }
                }}
                onClick={() => {
                  if (sol.id === "erp") {
                    setIsERPFulviewOpen(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (sol.id === "web") {
                    setIsWebFullviewOpen(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setSelectedSolution(sol);
                  }
                }}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-shadow transition-colors duration-300 flex flex-col justify-between cursor-pointer select-none"
              >
                <div>
                  <motion.div 
                    variants={getIconVariants(sol.id)}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${sol.color} text-white w-fit mb-6 shadow-md shadow-blue-500/10 flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    {sol.badge}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mt-4 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold group-hover:gap-3 transition-all">
                  Conocer más especificaciones <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INTERACTIVE COMPONENT - CRM vs ERP Sandbox with Animation movement */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400 font-mono">
                  Sandbox de Configuración en Movimiento
                </span>
                <h3 className="text-2xl md:text-3.5xl font-extrabold text-slate-800 dark:text-white leading-tight">
                  Diseña tu Ecosistema CRM / ERP Interactivo
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Haz clic para alternar entre plataformas y activa o desactiva módulos para simular cómo interactúan las bases de datos de hardware y los tableros de clientes en tiempo real.
                </p>
              </div>

              {/* Selector Tabs */}
              <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 w-fit">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory("CRM");
                    setActiveModules(["leads", "funnel"]);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    selectedCategory === "CRM"
                      ? "bg-white dark:bg-slate-900 shadow-md text-blue-600 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
                >
                  Ecosistemas CRM
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory("ERP");
                    setActiveModules(["inventory", "operations"]);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    selectedCategory === "ERP"
                      ? "bg-white dark:bg-slate-900 shadow-md text-purple-600 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
                >
                  Ecosistemas ERP
                </motion.button>
              </div>

              {/* Module choices checks with custom interactive colors */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Módulos instalados en la arquitectura:
                </p>
                <div className="space-y-3">
                  {categoryModules.map((mod) => {
                    const isActive = activeModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                          isActive
                            ? "bg-blue-50/50 dark:bg-slate-800/80 border-blue-500/50 shadow-sm"
                            : "bg-transparent border-slate-200 dark:border-slate-800/60 opacity-65 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${mod.color}`}>
                            <mod.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white">
                              {mod.name}
                            </p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-200 line-clamp-1">
                              {mod.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isActive
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 dark:border-slate-800"
                          }`}
                        >
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side animated dashboard panel display with actual movement */}
            <div className="lg:col-span-7 bg-slate-100/75 dark:bg-slate-950/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800/80 shadow-inner relative min-h-[460px] flex flex-col justify-between">
              {/* Fake web browser frame top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  sandbox_pruebas://{selectedCategory.toLowerCase()}.luxproc.io
                </div>
                <div className="w-10"></div>
              </div>

              {/* Status information of compilation */}
              <div className="mb-4 flex items-center justify-between text-xs px-2 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-500">
                    ESTADO ARC
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    Sincronización en curso
                  </span>
                </div>
                <span className="font-mono text-[10px] text-blue-500 dark:text-blue-400 font-bold">
                  {activeModules.length} de {categoryModules.length} Activos
                </span>
              </div>

              {/* Real-time Widget Canvas Grid with movement animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow content-start">
                <AnimatePresence mode="popLayout">
                  {categoryModules.map((mod) => {
                    const isActive = activeModules.includes(mod.id);
                    if (!isActive) return null;

                    return (
                      <motion.div
                        key={mod.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full relative cursor-default"
                      >
                        <mod.previewWidget />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {activeModules.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-1 md:col-span-2 h-64 flex flex-col items-center justify-center text-center p-8 text-slate-500"
                  >
                    <BarChart3 className="w-12 h-12 text-slate-400 dark:text-slate-500 animate-pulse mb-3" />
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-200">Ningún módulo activo</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mt-1">Activa alguno de los interruptores modulares de la izquierda para ver su comportamiento interactivo.</p>
                  </motion.div>
                )}
              </div>

              {/* Floating control bar */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex justify-between items-center text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  Estado del Servidor: <span className="text-emerald-500">ACTIVO</span>
                </span>
                <span>Motor de BD: MariaDB Core</span>
                <span>Latencia: ~8ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalle de Solución / Modal Interactivo */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop con blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left"
            >
              {/* Decorative design highlight */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedSolution.color}`} />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedSolution.color} text-white shadow-md shadow-blue-500/5`}>
                  {React.createElement(selectedSolution.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {selectedSolution.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white mt-1 leading-tight">
                    {selectedSolution.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Descripción de la Solución</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {selectedSolution.details}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Especificaciones Técnicas</h4>
                  <ul className="space-y-2.5">
                    {selectedSolution.features.map((feature: string, fIdx: number) => (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: fIdx * 0.05 }}
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contacto"
                    onClick={() => {
                      setSelectedSolution(null);
                      setTimeout(() => {
                        const targetElement = document.getElementById("contacto");
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    }}
                    className="flex-grow text-center py-3 px-5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/15 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Solicitud Directa de Ingeniería
                  </a>
                  <button
                    onClick={() => setSelectedSolution(null)}
                    className="py-3 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-750 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ERP Full-page View */}
      <AnimatePresence>
        {isERPFulviewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-left"
          >
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsERPFulviewOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </button>
                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Plataforma: <span className="font-bold text-slate-800 dark:text-white">LUXPROC Cloud</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Ecosistema de Planificación Avanzado</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Building className="w-3.5 h-3.5" />
                  Ecosistema ERP Empresarial
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Ecosistemas ERP de <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Clase Mundial</span>
                </h1>
                <p className="mt-6 text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  El sistema nervioso digital para tu empresa. Centraliza, optimiza e integra cada departamento operativo en un único motor de toma de decisiones en tiempo real.
                </p>
              </div>

              {/* Content Grid: ¿Qué es? & ¿Por qué importa? */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                
                {/* Section: ¿Qué es un ERP y para qué sirve? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
                  <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit rounded-2xl mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    ¿Qué es un ERP y para qué sirve?
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                    Un <strong>ERP (Enterprise Resource Planning)</strong> es el sistema de planificación de recursos empresariales encargado de unificar los datos y procesos de todos los departamentos en un solo lugar. 
                    <br /><br />
                    En lugar de tener la información fragmentada (hojas de cálculo de inventario por un lado, facturas por otro, reportes de compras perdidos en correos), un ERP sirve como una <strong>base de datos integrada única</strong>. Esto permite que el área de ventas, finanzas, bodega y operaciones compartan la misma información al instante, automatizando tareas administrativas pesadas y eliminando la duplicidad de datos.
                  </p>
                </div>

                {/* Section: ¿Por qué es Crucial / Importante? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit rounded-2xl mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      ¿Por qué es crucial para la gestión moderna?
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Las empresas que operan con sistemas desconectados sufren de cuellos de botella constantes, pérdidas de stock inexplicables, falta de visibilidad en márgenes y demoras regulatorias. Un ERP elimina estas barreras:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "Control Total de Inventarios", desc: "Trazabilidad completa multialmacén de insumos y productos listos." },
                        { title: "SII de Chile Certificado", desc: "Facturación, guías de despacho y libros contables automatizados." },
                        { title: "Flujo de Caja Preciso", desc: "Conciliación bancaria, cuentas por cobrar y pagos integrados al instante." },
                        { title: "Márgenes en Tiempo Real", desc: "Conoce el costo de importación, margen bruto y neto por cada transacción." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Title Sector: PLATAFORMAS ERP ESPECIALIZADAS POR SECTOR */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-mono">
                  Sectores de Aplicación Directa
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  Ecosistemas ERP Diseñados para tu Industria
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  En LUXPROC desarrollamos plataformas ERP optimizadas para el modelo de negocio específico de cada rubro, listas para la carga de integraciones y visuales personalizadas.
                </p>
              </div>

              {/* Grid 4 Sectores: PREPARADO PARA ENLACES E IMÁGENES DEL CLIENTE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {[
                  {
                    id: "industrial",
                    title: "LUXPROC Industrial (MRP)",
                    sector: "Manufactura e Ingeniería",
                    desc: "Control de órdenes de fabricación, costos de materias primas, control de mermas e integración con sensores IoT para telemetría de producción en planta física.",
                    icon: Factory,
                    color: "border-orange-500/30 hover:border-orange-500/60",
                    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                    btnColor: "bg-orange-600 hover:bg-orange-700",
                    features: ["Planificación de Requerimiento de Materiales (MRP)", "Tiempos de máquina e integración con PLC", "Costeo automático de productos terminados"]
                  },
                  {
                    id: "commerce",
                    title: "LUXPROC Omnichannel Commerce",
                    sector: "Retail y Distribución",
                    desc: "Ecosistema sincronizado en tiempo real para control de tiendas físicas y plataformas e-commerce. Inventario unificado para evitar quiebres de stock.",
                    icon: Globe,
                    color: "border-blue-500/30 hover:border-blue-500/60",
                    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    btnColor: "bg-blue-600 hover:bg-blue-700",
                    features: ["Sincronización automática de stock con Shopify/WooCommerce", "Punto de Venta (POS) rápido e intuitivo", "Módulo de despachos automatizado para logística local"]
                  },
                  {
                    id: "finance",
                    title: "LUXPROC Financial & SII Chile",
                    sector: "Finanzas y Contabilidad",
                    desc: "Centralización contable automatizada que genera balances de manera autónoma al facturar o comprar. Normativas impositivas chilenas actualizadas.",
                    icon: Coins,
                    color: "border-emerald-500/30 hover:border-emerald-500/60",
                    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    btnColor: "bg-emerald-600 hover:bg-emerald-700",
                    features: ["Conexión SII certificada directa", "Conciliación bancaria automatizada con un clic", "Balances generales, estados de resultados automáticos"]
                  },
                  {
                    id: "logistics",
                    title: "LUXPROC Smart Logistics",
                    sector: "Transporte y Bodegaje",
                    desc: "Optimización de rutas de despacho, control de conductores, asignación de guías de despacho electrónicas y tracking satelital GPS integrado.",
                    icon: Truck,
                    color: "border-purple-500/30 hover:border-purple-500/60",
                    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                    btnColor: "bg-purple-600 hover:bg-purple-700",
                    features: ["Asignación inteligente de rutas por zona geográfica", "Guías de despacho con firma electrónica SII", "Telemetría de camiones e indicadores de entrega (OTD)"]
                  }
                ].map((sec) => (
                  <div
                    key={sec.id}
                    className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border ${sec.color} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      {/* Badge and Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${sec.badgeColor}`}>
                          {sec.sector}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <sec.icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sec.title}</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{sec.desc}</p>

                      {/* Bullet Specs */}
                      <div className="space-y-2 mb-6">
                        {sec.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-2 items-center text-xs text-slate-600 dark:text-slate-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Visual Mockup Container (Prepared for Customer Screenshots and links) */}
                      <div className="relative border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/50 mb-6 overflow-hidden min-h-[140px] flex flex-col justify-between text-left">
                        <div className="absolute top-0 right-0 p-1 bg-blue-500/10 text-blue-500 rounded-bl-xl text-[9px] font-mono tracking-wider">
                          MOCKUP DE PLATAFORMA
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-1.5 items-center">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 ml-1">LUX_DASHBOARD://{sec.id}</span>
                          </div>
                          <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                          <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                        </div>
                        
                        {/* Space for future images/links */}
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wide">
                            [Aquí cargarás imágenes e hipervínculos del ERP]
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-not-allowed">
                      Ver Demo del Sector <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* High-fidelity engineering consultation request */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  ¿Listo para crear un ERP adaptado a tus necesidades?
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  El verdadero potencial se desbloquea con un software diseñado a la medida de tus procesos de negocio. Conversemos con nuestro equipo de ingenieros sobre tus flujos de trabajo hoy mismo.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#contacto"
                    onClick={() => {
                      setIsERPFulviewOpen(false);
                      setTimeout(() => {
                        const target = document.getElementById("contacto");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    Cotizar ERP Personalizado
                  </a>
                  <button
                    onClick={() => {
                      setIsERPFulviewOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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

      {/* Web Full-page View */}
      <AnimatePresence>
        {isWebFullviewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-left"
          >
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsWebFullviewOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </button>
                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Motor Web: <span className="font-bold text-slate-800 dark:text-white">LUXPROC SSR/ISR</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Arquitectura de Alto Rendimiento</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  Arquitectura Web Moderna
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Plataformas Web Ultra-Veloces & <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-400">SEO de Alto Rendimiento</span>
                </h1>
                <p className="mt-6 text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Construimos experiencias web avanzadas utilizando React, Next.js y Tailwind CSS. Optimizadas nativamente para ofrecer tiempos de carga récord, Core Web Vitals impecables y posicionamiento orgánico imbatible en motores de búsqueda.
                </p>
              </div>

              {/* Content Grid: ¿Qué es? & ¿Por qué importa? */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                
                {/* Section: ¿Qué es la Arquitectura Web Moderna? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit rounded-2xl mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    ¿Qué es la Arquitectura Web Moderna y para qué sirve?
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    A diferencia de los sitios web tradicionales lentos y rígidos, una <strong>Arquitectura Web Moderna (SSR/ISR)</strong> procesa la información en la nube antes de enviarla al usuario, entregando páginas instantáneas pre-renderizadas.
                    <br /><br />
                    Sirve para ofrecer una experiencia de navegación fluida tipo app nativa, eliminar pantallas de carga congeladas y permitir que las plataformas comerciales procesen miles de usuarios en paralelo con integración directa a pasarelas de pago y sistemas CRM.
                  </p>
                </div>

                {/* Section: ¿Por qué es crucial para la presencia digital? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit rounded-2xl mb-6">
                      <Gauge className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      ¿Por qué es crucial para tu negocio digital?
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Un sitio web lento pierde hasta el 53% de sus visitantes antes de cargar. Nuestra ingeniería web garantiza máximas conversiones y seguridad:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "SEO Orgánico Prioritario", desc: "Código semántico limpio indexado instantáneamente por Google." },
                        { title: "Core Web Vitals < 1.0s", desc: "Tiempos de respuesta súper-rápidos con distribución CDN global." },
                        { title: "Cifrado SSL & Pagos", desc: "Pasarelas de pago integradas con estándares bancarios." },
                        { title: "Infraestructura Serverless", desc: "Escalado automático que soporta picos masivos de tráfico sin caídas." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Title Sector: PLATAFORMAS WEB ESPECIALIZADAS */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-mono">
                  Ecosistemas Web Especializados
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  Soluciones Web Diseñadas para tu Propósito
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  Desarrollamos soluciones web escalables adaptadas a cada necesidad operativa y comercial de tu organización.
                </p>
              </div>

              {/* Grid 4 Web Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {[
                  {
                    id: "web-seo",
                    title: "LUXPROC Corporate SEO Web",
                    sector: "Branding & Posicionamiento",
                    desc: "Portales empresariales diseñados para proyectar solvencia corporativa, dominar las búsquedas en Google y captar prospectos calificados en tiempo real.",
                    icon: Search,
                    color: "border-emerald-500/30 hover:border-emerald-500/60",
                    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    features: ["Estructura Schema.org completa para Google", "Tiempo de carga récord (<800ms LCP)", "Formularios integrados con CRM multiagente"]
                  },
                  {
                    id: "web-saas",
                    title: "LUXPROC SaaS & App Dashboards",
                    sector: "Sistemas Web Complejos",
                    desc: "Paneles administrativos en tiempo real para gestión de usuarios, métricas financieras, visualizaciones gráficas y orquestación de datos masivos.",
                    icon: Layout,
                    color: "border-blue-500/30 hover:border-blue-500/60",
                    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    features: ["Autenticación por roles y permisos JWT", "Actualizaciones de datos por WebSockets", "Exportación de reportes PDF/Excel en 1 clic"]
                  },
                  {
                    id: "web-ecommerce",
                    title: "LUXPROC Omnichannel E-commerce",
                    sector: "Ventas Digitales",
                    desc: "Tiendas virtuales de alta velocidad con checkout sin fricción, integración nativa con pasarelas de pago y sincronización de inventario con ERP.",
                    icon: CreditCard,
                    color: "border-purple-500/30 hover:border-purple-500/60",
                    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                    features: ["Pasarelas Webpay, Stripe & Mercado Pago", "Catálogo dinámico optimizado para móviles", "Cálculo automático de costos de envío por zona"]
                  },
                  {
                    id: "web-pwa",
                    title: "LUXPROC Cloud PWA & Serverless",
                    sector: "Progresive Web Apps",
                    desc: "Plataformas web instalables como aplicaciones en teléfonos y computadoras, con funcionamiento fuera de línea e infraestructura autoadaptativa.",
                    icon: Smartphone,
                    color: "border-cyan-500/30 hover:border-cyan-500/60",
                    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
                    features: ["Notificaciones push personalizadas", "Caché inteligente para uso sin internet", "Despliegue distribuido en CDN global"]
                  }
                ].map((sec) => (
                  <div
                    key={sec.id}
                    className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border ${sec.color} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${sec.badgeColor}`}>
                          {sec.sector}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <sec.icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sec.title}</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{sec.desc}</p>

                      <div className="space-y-2 mb-6">
                        {sec.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-2 items-center text-xs text-slate-600 dark:text-slate-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Web Performance Metrics Box */}
                      <div className="relative border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/50 mb-6 font-mono text-[10px] text-slate-600 dark:text-slate-300 space-y-1.5">
                        <div className="flex justify-between items-center text-emerald-500 font-bold border-b border-slate-200 dark:border-slate-800 pb-1">
                          <span>CORE WEB VITALS</span>
                          <span>SCORES: 100%</span>
                        </div>
                        <div className="flex justify-between"><span>LCP (Speed):</span> <span className="text-emerald-500 font-bold">0.6s</span></div>
                        <div className="flex justify-between"><span>CLS (Stability):</span> <span className="text-emerald-500 font-bold">0.00</span></div>
                        <div className="flex justify-between"><span>FID (Interactivity):</span> <span className="text-emerald-500 font-bold">12ms</span></div>
                      </div>
                    </div>

                    <button className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-not-allowed">
                      Ver Demo de Arquitectura Web <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Consultation call */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950 text-white text-center border border-teal-500/20 shadow-xl relative overflow-hidden mb-16">
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  ¿Quieres una plataforma web con velocidad e impacto superior?
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  Nuestros ingenieros en frontend y backend diseñan sistemas web listos para escalar tus ventas y automatizar procesos comerciales.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#contacto"
                    onClick={() => {
                      setIsWebFullviewOpen(false);
                      setTimeout(() => {
                        const target = document.getElementById("contacto");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Cotizar Arquitectura Web
                  </a>
                  <button
                    onClick={() => {
                      setIsWebFullviewOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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

      {/* Solutions Full-page View: Ingeniería que trasciende límites */}
      <AnimatePresence>
        {isSolutionsFullviewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-left"
          >
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsSolutionsFullviewOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </button>
                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Ingeniería LUXPROC: <span className="font-bold text-slate-800 dark:text-white">Física & Digital</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Soluciones Integradas de Alto Impacto</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Layers className="w-3.5 h-3.5" />
                  Nuestras Soluciones Corporativas
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Ingeniería que <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Trasciende Límites</span>
                </h1>
                <p className="mt-6 text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Unificamos el espectro tecnológico completo. Desde la consultoría e implementación de software de planificación empresarial (ERP) y relaciones comerciales (CRM), hasta el diseño de hardware robusto, proyectos de innovación científica (I+D+i) y automatizaciones industriales (instalaciones eléctricas).
                </p>
              </div>

              {/* Content Grid: Enfoque Holístico & ¿Por qué un ecosistema integrado? */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                
                {/* Section: Enfoque de Ingeniería Integrada */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
                  <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit rounded-2xl mb-6">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Ingeniería Física y Digital bajo el Mismo Techo
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    La mayoría de las empresas se ven obligadas a coordinar con múltiples proveedores desconectados: una empresa para el software, otra para las instalaciones eléctricas y otra para el desarrollo web o hardware.
                    <br /><br />
                    En LUXPROC rompemos este paradigma. Nuestra visión unificada permite que la telemetría de tus sensores de planta alimente directamente tu ERP en la nube, mientras tu CRM canaliza la atención al cliente sin fricciones.
                  </p>
                </div>

                {/* Section: Beneficios del Ecosistema Integrado */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit rounded-2xl mb-6">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      ¿Por qué elegir un ecosistema integral?
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Elimina intermediarios e incompatibilidades. Ofrecemos garantías técnicas de extremo a extremo:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "Sincronización Total", desc: "Comunicación fluida entre hardware, tableros y software." },
                        { title: "Responsabilidad Única", desc: "Soporte centralizado sin culpar a terceros." },
                        { title: "Optimizaciones de Costo", desc: "Arquitectura modular que aprovecha componentes ya instalados." },
                        { title: "I+D+i para Patentes", desc: "Desarrollos a la medida protegidos intelectualmente." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Title Sector: MATRIZ DE LOS 6 PILARES DE INGENIERÍA */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-mono">
                  Portafolio Integral de Soluciones
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  Los 6 Pilares de Ingeniería LUXPROC
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  Haz clic en cualquiera de nuestras soluciones para abrir sus especificaciones técnicas completas.
                </p>
              </div>

              {/* Grid 6 Pillars Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {CORE_SOLUTIONS.map((sol, index) => {
                  const Icon = sol.icon;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (sol.id === "erp") {
                          setIsERPFulviewOpen(true);
                          setIsSolutionsFullviewOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else if (sol.id === "web") {
                          setIsWebFullviewOpen(true);
                          setIsSolutionsFullviewOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          setSelectedSolution(sol);
                        }
                      }}
                      className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${sol.color} text-white w-fit mb-6 shadow-md`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                          {sol.badge}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mt-4 mb-2 group-hover:text-blue-500 transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {sol.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold group-hover:gap-3 transition-all">
                        Abrir detalles completos <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Consultation Call */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-16">
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  ¿Tienes un reto de ingeniería o un proyecto complejo?
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  Nuestros ingenieros analizan tu infraestructura actual y formulan la mejor estrategia de integración física y digital.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#contacto"
                    onClick={() => {
                      setIsSolutionsFullviewOpen(false);
                      setTimeout(() => {
                        const target = document.getElementById("contacto");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Solicitar Diagnóstico Técnico
                  </a>
                  <button
                    onClick={() => {
                      setIsSolutionsFullviewOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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
    </section>
  );
}
