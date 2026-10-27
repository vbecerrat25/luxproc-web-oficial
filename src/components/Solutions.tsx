import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MaintenanceSystemModal from "./MaintenanceSystemModal";
import { useScrollLock, resetScrollLock } from "../utils/scrollLock";
import { useLanguage } from "../utils/i18n";
import { pushModalHistory, closeModalWithHistory } from "../utils/navigation";
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
  Workflow,
  Boxes,
  ShoppingBag,
  HeartHandshake,
  UserCheck
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
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"CRM" | "ERP">("CRM");
  const [activeModules, setActiveModules] = useState<string[]>(["leads", "funnel", "intelligence"]);
  const [selectedSolution, setSelectedSolution] = useState<any | null>(null);
  const [isERPFulviewOpen, setIsERPFulviewOpen] = useState(false);
  const [isWebFullviewOpen, setIsWebFullviewOpen] = useState(false);
  const [isCRMFullviewOpen, setIsCRMFullviewOpen] = useState(false);
  const [isSolutionsFullviewOpen, setIsSolutionsFullviewOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  // Lock background window scroll when any modal or fullview is open so that ONLY 1 scrollbar exists
  const isAnyFullviewOpen = isERPFulviewOpen || isWebFullviewOpen || isCRMFullviewOpen || isSolutionsFullviewOpen || Boolean(selectedSolution) || isMaintenanceModalOpen;
  useScrollLock(isAnyFullviewOpen);

  // Listen for reset-to-home, popstate (mobile hardware/gesture back), and custom fullview triggers
  useEffect(() => {
    const handleReset = () => {
      setIsERPFulviewOpen(false);
      setIsWebFullviewOpen(false);
      setIsCRMFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      setIsMaintenanceModalOpen(false);
      resetScrollLock();
    };

    const handleOpenSolutions = () => {
      setIsSolutionsFullviewOpen(true);
      setIsERPFulviewOpen(false);
      setIsWebFullviewOpen(false);
      setIsCRMFullviewOpen(false);
      setSelectedSolution(null);
      pushModalHistory("soluciones");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenWeb = () => {
      setIsWebFullviewOpen(true);
      setIsERPFulviewOpen(false);
      setIsCRMFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      pushModalHistory("soluciones-web");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenERP = () => {
      setIsERPFulviewOpen(true);
      setIsWebFullviewOpen(false);
      setIsCRMFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      pushModalHistory("soluciones-erp");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenCRM = () => {
      setIsCRMFullviewOpen(true);
      setIsERPFulviewOpen(false);
      setIsWebFullviewOpen(false);
      setIsSolutionsFullviewOpen(false);
      setSelectedSolution(null);
      pushModalHistory("soluciones-crm");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("reset-to-home", handleReset);
    window.addEventListener("close-all-modals", handleReset);
    window.addEventListener("popstate", handleReset);
    window.addEventListener("open-solutions-fullview", handleOpenSolutions);
    window.addEventListener("open-web-fullview", handleOpenWeb);
    window.addEventListener("open-erp-fullview", handleOpenERP);
    window.addEventListener("open-crm-fullview", handleOpenCRM);

    return () => {
      window.removeEventListener("reset-to-home", handleReset);
      window.removeEventListener("close-all-modals", handleReset);
      window.removeEventListener("popstate", handleReset);
      window.removeEventListener("open-solutions-fullview", handleOpenSolutions);
      window.removeEventListener("open-web-fullview", handleOpenWeb);
      window.removeEventListener("open-erp-fullview", handleOpenERP);
      window.removeEventListener("open-crm-fullview", handleOpenCRM);
    };
  }, []);

  // All core solutions list localized via t.solutions.items
  const CORE_SOLUTIONS = [
    {
      id: "crm",
      title: t.solutions.items.crm.title,
      description: t.solutions.items.crm.description,
      icon: HeartHandshake,
      color: "from-blue-500 to-indigo-600",
      badge: t.solutions.items.crm.badge,
      details: t.solutions.items.crm.details,
      features: t.solutions.items.crm.features
    },
    {
      id: "erp",
      title: t.solutions.items.erp.title,
      description: t.solutions.items.erp.description,
      icon: Boxes,
      color: "from-purple-500 to-indigo-700",
      badge: t.solutions.items.erp.badge,
      details: t.solutions.items.erp.details,
      features: t.solutions.items.erp.features
    },
    {
      id: "web",
      title: t.solutions.items.web.title,
      description: t.solutions.items.web.description,
      icon: Terminal,
      color: "from-emerald-500 to-teal-600",
      badge: t.solutions.items.web.badge,
      details: t.solutions.items.web.details,
      features: t.solutions.items.web.features
    },
    {
      id: "electricidad",
      title: t.solutions.items.electricidad.title,
      description: t.solutions.items.electricidad.description,
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      badge: t.solutions.items.electricidad.badge,
      details: t.solutions.items.electricidad.details,
      features: t.solutions.items.electricidad.features
    },
    {
      id: "hardware",
      title: t.solutions.items.hardware.title,
      description: t.solutions.items.hardware.description,
      icon: Cpu,
      color: "from-cyan-500 to-blue-600",
      badge: t.solutions.items.hardware.badge,
      details: t.solutions.items.hardware.details,
      features: t.solutions.items.hardware.features
    },
    {
      id: "innovacion",
      title: t.solutions.items.innovacion.title,
      description: t.solutions.items.innovacion.description,
      icon: Lightbulb,
      color: "from-rose-500 to-pink-600",
      badge: t.solutions.items.innovacion.badge,
      details: t.solutions.items.innovacion.details,
      features: t.solutions.items.innovacion.features
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
      case "crm": // HeartHandshake CRM icon: rhythmic heartbeat pulse & gentle harmonic sway that loops continuously while card is hovered
        return {
          hover: { 
            scale: [1, 1.18, 1.06, 1.22, 1.12, 1],
            rotate: [0, -6, 6, -4, 4, 0],
            y: [0, -4, -1, -5, -2, 0],
            transition: { 
              duration: 1.6, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "easeInOut" 
            }
          },
          tap: { scale: 0.92 }
        };
      case "erp": // Boxes ERP icon: continuous 3D modular elevation, subtle perspective tilt & expansion
        return {
          hover: { 
            y: [0, -6, -2, -7, -3, 0],
            scale: [1, 1.16, 1.08, 1.18, 1.12, 1],
            rotate: [0, 8, -6, 4, -2, 0],
            transition: { 
              duration: 1.8, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "easeInOut" 
            }
          },
          tap: { scale: 0.95, y: 0 }
        };
      case "web": // Terminal icon: continuous horizontal typing pulse & smooth command prompt bounce
        return {
          hover: { 
            x: [0, 4, -2, 3, 0],
            scale: [1, 1.14, 1.08, 1.14, 1],
            transition: { 
              duration: 1.3, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "easeInOut" 
            }
          },
          tap: { scale: 0.95 }
        };
      case "electricidad": // Zap icon: Fast electric jitter, energy pulsation and expand
        return {
          hover: { 
            scale: [1, 1.24, 1.12, 1.26, 1],
            rotate: [0, -8, 8, -4, 4, 0],
            y: [0, -3, 1, -2, 0],
            transition: { 
              duration: 0.7, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "easeInOut" 
            }
          },
          tap: { scale: 0.92, rotate: -15 }
        };
      case "hardware": // Cpu icon: continuous smooth clock-cycle rotation and data pulse
        return {
          hover: { 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.14, 1.18, 1.14, 1],
            transition: { 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "linear" 
            }
          },
          tap: { scale: 0.9, rotate: 270 }
        };
      case "innovacion": // Lightbulb icon: continuous radiant glow & breathing inspiration pulse
        return {
          hover: { 
            scale: [1, 1.24, 1.14, 1.24, 1],
            filter: ["brightness(1)", "brightness(1.4)", "brightness(1.1)", "brightness(1.4)", "brightness(1)"],
            transition: { 
              duration: 1.4, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "easeInOut"
            }
          },
          tap: { scale: 0.92 }
        };
      default:
        return {
          hover: { 
            scale: [1, 1.16, 1], 
            rotate: [0, 8, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          },
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
              pushModalHistory("soluciones");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 cursor-pointer hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            {t.solutions.headerBadge}
          </div>
          <h2 
            onClick={() => {
              setIsSolutionsFullviewOpen(true);
              pushModalHistory("soluciones");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.solutions.headerTitle}
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {t.solutions.headerDesc}
          </p>
          <button
            onClick={() => {
              setIsSolutionsFullviewOpen(true);
              pushModalHistory("soluciones");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
          >
            {t.solutions.viewAllBtn} <ArrowRight className="w-4 h-4" />
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
                    pushModalHistory("soluciones-erp");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (sol.id === "web") {
                    setIsWebFullviewOpen(true);
                    pushModalHistory("soluciones-web");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (sol.id === "crm") {
                    setIsCRMFullviewOpen(true);
                    pushModalHistory("soluciones-crm");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setSelectedSolution(sol);
                    pushModalHistory("soluciones-detalle");
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
                  {t.solutions.knowMore} <ArrowRight className="w-4 h-4" />
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
                  {t.solutions.sandbox.badge}
                </span>
                <h3 className="text-2xl md:text-3.5xl font-extrabold text-slate-800 dark:text-white leading-tight">
                  {t.solutions.sandbox.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t.solutions.sandbox.desc}
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
                  {t.solutions.sandbox.tabCrm}
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
                  {t.solutions.sandbox.tabErp}
                </motion.button>
              </div>

              {/* Module choices checks with custom interactive colors */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {t.solutions.sandbox.modulesInstalled}
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
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{t.solutions.sandbox.noModulesTitle}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mt-1">{t.solutions.sandbox.noModulesDesc}</p>
                  </motion.div>
                )}
              </div>

              {/* Floating control bar */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex justify-between items-center text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  {t.solutions.sandbox.serverStatus}
                </span>
                <span>{t.solutions.sandbox.dbEngine}</span>
                <span>{t.solutions.sandbox.latency}</span>
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
              onClick={() => closeModalWithHistory(() => setSelectedSolution(null))}
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
                onClick={() => closeModalWithHistory(() => setSelectedSolution(null))}
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
                      closeModalWithHistory(() => setSelectedSolution(null));
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
                    onClick={() => closeModalWithHistory(() => setSelectedSolution(null))}
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
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden text-left"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative w-full overflow-x-hidden">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 border-b border-slate-200 dark:border-slate-800 w-full">
                <button
                  onClick={() => closeModalWithHistory(() => setIsERPFulviewOpen(false))}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.solutions.fullviews.backHome}
                </button>
                <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {t.solutions.fullviews.platform}: <span className="font-bold text-slate-800 dark:text-white">{t.solutions.fullviews.erp.platformName}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-slate-500 dark:text-slate-400">{t.solutions.fullviews.erp.platformSub}</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-12 sm:mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                  <Boxes className="w-3.5 h-3.5" />
                  {t.solutions.fullviews.erp.badge}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                  {t.solutions.fullviews.erp.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {t.solutions.fullviews.erp.desc}
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
                    {t.solutions.fullviews.erp.whatIsTitle}
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                    {t.solutions.fullviews.erp.whatIsDesc}
                  </p>
                </div>

                {/* Section: ¿Por qué es Crucial / Importante? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit rounded-2xl mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {t.solutions.fullviews.erp.whyTitle}
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      {t.solutions.fullviews.erp.whyDesc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.solutions.fullviews.erp.whyPoints.map((item, idx) => (
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
              {/* Title Sector: PLATAFORMAS ERP ESPECIALIZADAS POR SECTOR */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-mono">
                  {t.solutions.fullviews.erp.sectorsTitleBadge}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {t.solutions.fullviews.erp.sectorsTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {t.solutions.fullviews.erp.sectorsDesc}
                </p>
              </div>

              {/* Grid Sectores: PREPARADO PARA ENLACES E IMÁGENES DEL CLIENTE */}
              <div className="max-w-2xl mx-auto mb-20">
                {[
                  {
                    id: "shoe-leather",
                    title: t.solutions.fullviews.erp.shoeLeather.title,
                    sector: t.solutions.fullviews.erp.shoeLeather.sector,
                    desc: t.solutions.fullviews.erp.shoeLeather.desc,
                    icon: Factory,
                    color: "border-amber-500/40 hover:border-amber-500/80 bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-950/20 dark:to-slate-900",
                    badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-300 font-extrabold border border-amber-500/30",
                    btnColor: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
                    features: t.solutions.fullviews.erp.shoeLeather.features,
                    externalUrl: "https://erp.calza.luxproc.com",
                    ctaText: t.solutions.fullviews.erp.shoeLeather.ctaText,
                    mockupBadge: t.solutions.fullviews.erp.shoeLeather.mockupBadge,
                    mockupPlaceholder: t.solutions.fullviews.erp.shoeLeather.mockupPlaceholder
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
                          {sec.mockupBadge}
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
                            {sec.mockupPlaceholder}
                          </span>
                        </div>
                      </div>
                    </div>

                    {sec.externalUrl ? (
                      <a
                        href={sec.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 px-4 rounded-xl ${sec.btnColor || "bg-orange-600 hover:bg-orange-700"} text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] cursor-pointer`}
                      >
                        {sec.ctaText} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-not-allowed">
                        {sec.ctaText} <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* High-fidelity engineering consultation request */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  {t.solutions.fullviews.erp.bannerTitle}
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  {t.solutions.fullviews.erp.bannerDesc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#calendario"
                    onClick={() => {
                      closeModalWithHistory(() => setIsERPFulviewOpen(false));
                      setTimeout(() => {
                        const target = document.getElementById("calendario");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.erp.bannerCta}
                  </a>
                  <button
                    onClick={() => {
                      closeModalWithHistory(() => setIsERPFulviewOpen(false));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.backHome}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRM Full-page View */}
      <AnimatePresence>
        {isCRMFullviewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden text-left"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative w-full overflow-x-hidden">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 border-b border-slate-200 dark:border-slate-800 w-full">
                <button
                  onClick={() => closeModalWithHistory(() => setIsCRMFullviewOpen(false))}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.solutions.fullviews.backHome}
                </button>
                <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {t.solutions.fullviews.platform}: <span className="font-bold text-slate-800 dark:text-white">{t.solutions.fullviews.crm.platformName}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-slate-500 dark:text-slate-400">{t.solutions.fullviews.crm.platformSub}</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-12 sm:mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  {t.solutions.fullviews.crm.badge}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                  {t.solutions.fullviews.crm.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {t.solutions.fullviews.crm.desc}
                </p>
              </div>

              {/* Content Grid: ¿Qué es? & ¿Por qué importa? */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                
                {/* Section: ¿Qué es un CRM a la Medida y para qué sirve? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
                  <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit rounded-2xl mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {t.solutions.fullviews.crm.whatIsTitle}
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                    {t.solutions.fullviews.crm.whatIsDesc}
                  </p>
                </div>

                {/* Section: ¿Por qué es Crucial / Importante? */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit rounded-2xl mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {t.solutions.fullviews.crm.whyTitle}
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      {t.solutions.fullviews.crm.whyDesc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.solutions.fullviews.crm.whyPoints.map((item, idx) => (
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

              {/* Title Sector: PLATAFORMAS CRM ESPECIALIZADAS POR SECTOR */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase font-mono">
                  {t.solutions.fullviews.crm.sectorsTitleBadge}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {t.solutions.fullviews.crm.sectorsTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {t.solutions.fullviews.crm.sectorsDesc}
                </p>
              </div>

              {/* Grid Sectores: CRM INVENTARIO CALZADO */}
              <div className="max-w-2xl mx-auto mb-20">
                {[
                  {
                    id: "crm-inventario-calzado",
                    title: t.solutions.fullviews.crm.shoeInventory.title,
                    sector: t.solutions.fullviews.crm.shoeInventory.sector,
                    desc: t.solutions.fullviews.crm.shoeInventory.desc,
                    icon: Boxes,
                    color: "border-blue-500/40 hover:border-blue-500/80 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-950/20 dark:to-slate-900",
                    badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-300 font-extrabold border border-blue-500/30",
                    btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
                    features: t.solutions.fullviews.crm.shoeInventory.features,
                    externalUrl: "https://crm.invent.calza.luxproc.com",
                    ctaText: t.solutions.fullviews.crm.shoeInventory.ctaText
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

                      {/* Visual Mockup Container */}
                      <div className="relative border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/50 mb-6 overflow-hidden min-h-[140px] flex flex-col justify-between text-left">
                        <div className="absolute top-0 right-0 p-1 bg-blue-500/10 text-blue-500 rounded-bl-xl text-[9px] font-mono tracking-wider">
                          {t.solutions.fullviews.crm.shoeInventory.mockupBadge}
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-1.5 items-center">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 ml-1">LUX_CRM://crm.invent.calza.luxproc.com</span>
                          </div>
                          <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                          <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wide">
                            {t.solutions.fullviews.crm.shoeInventory.mockupPlaceholder}
                          </span>
                        </div>
                      </div>
                    </div>

                    {sec.externalUrl ? (
                      <a
                        href={sec.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 px-4 rounded-xl ${sec.btnColor || "bg-blue-600 hover:bg-blue-700"} text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] cursor-pointer`}
                      >
                        {sec.ctaText || "Ingresar a la Plataforma"} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-not-allowed">
                        Ingresar a la Plataforma <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* High-fidelity engineering consultation request */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  {t.solutions.fullviews.crm.bannerTitle}
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  {t.solutions.fullviews.crm.bannerDesc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#calendario"
                    onClick={() => {
                      closeModalWithHistory(() => setIsCRMFullviewOpen(false));
                      setTimeout(() => {
                        const target = document.getElementById("calendario");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.crm.bannerCta}
                  </a>
                  <button
                    onClick={() => {
                      closeModalWithHistory(() => setIsCRMFullviewOpen(false));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.backHome}
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
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden text-left"
          >
            {/* Background elements confined to prevent horizontal scroll */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-teal-500/5 dark:bg-teal-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative w-full overflow-x-hidden">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 border-b border-slate-200 dark:border-slate-800 w-full">
                <button
                  onClick={() => closeModalWithHistory(() => setIsWebFullviewOpen(false))}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.solutions.fullviews.backHome}
                </button>
                <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {t.solutions.fullviews.platform}: <span className="font-bold text-slate-800 dark:text-white">{t.solutions.fullviews.web.platformName}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-slate-500 dark:text-slate-400">{t.solutions.fullviews.web.platformSub}</span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-12 sm:mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  {t.solutions.fullviews.web.badge}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                  {t.solutions.fullviews.web.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {t.solutions.fullviews.web.desc}
                </p>
              </div>

              {/* Content Grid: ¿Qué es? & ¿Por qué importa? */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-20">
                
                {/* Section: ¿Qué es la Arquitectura Web Moderna? */}
                <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
                  <div className="p-2.5 sm:p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    {t.solutions.fullviews.web.whatIsTitle}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.solutions.fullviews.web.whatIsDesc}
                  </p>
                </div>

                {/* Section: ¿Por qué es crucial para la presencia digital? */}
                <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-2.5 sm:p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                      <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                      {t.solutions.fullviews.web.whyTitle}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6">
                      {t.solutions.fullviews.web.whyDesc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {t.solutions.fullviews.web.whyPoints.map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
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
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
                <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-mono">
                  {t.solutions.fullviews.web.sectorsTitleBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 sm:mt-3 leading-tight break-words">
                  {t.solutions.fullviews.web.sectorsTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 sm:mt-3 leading-relaxed">
                  {t.solutions.fullviews.web.sectorsDesc}
                </p>
              </div>

              {/* Grid 3 Web Platforms (Real, functional platforms) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {[
                  {
                    id: "web-diagnostico",
                    title: t.solutions.fullviews.web.cards.digitalDiagnosis.title,
                    sector: t.solutions.fullviews.web.cards.digitalDiagnosis.sector,
                    desc: t.solutions.fullviews.web.cards.digitalDiagnosis.desc,
                    icon: BarChart3,
                    color: "border-blue-500/50 hover:border-blue-500/90 bg-gradient-to-br from-blue-500/5 to-teal-500/5 dark:from-blue-900/20 dark:to-slate-900",
                    badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-300 font-extrabold border border-blue-500/30",
                    features: t.solutions.fullviews.web.cards.digitalDiagnosis.features,
                    metrics: {
                      label: "CORE WEB VITALS",
                      score: "SCORES: 100%",
                      rows: [
                        { label: "LCP (Speed):", val: "0.6s" },
                        { label: "CLS (Stability):", val: "0.00" },
                        { label: "FID (Interactivity):", val: "12ms" }
                      ]
                    },
                    externalUrl: "https://diags.digital.luxproc.com/",
                    ctaText: t.solutions.fullviews.web.cards.digitalDiagnosis.ctaText
                  },
                  {
                    id: "web-mantenimiento",
                    title: t.solutions.fullviews.web.cards.maintenanceCloud.title,
                    sector: t.solutions.fullviews.web.cards.maintenanceCloud.sector,
                    desc: t.solutions.fullviews.web.cards.maintenanceCloud.desc,
                    icon: Gauge,
                    color: "border-blue-500/50 hover:border-blue-500/90 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-900/20 dark:to-slate-900",
                    badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-300 font-extrabold border border-blue-500/30",
                    features: t.solutions.fullviews.web.cards.maintenanceCloud.features,
                    metrics: {
                      label: "KPIs INDUSTRIALES",
                      score: "OEE: 91%",
                      rows: [
                        { label: "Disponibilidad Activos:", val: "98.4%" },
                        { label: "Confiabilidad (MTBF):", val: "340 hrs" },
                        { label: "Tiempo Reparación (MTTR):", val: "42 min" }
                      ]
                    },
                    externalUrl: "https://maintenancecloud-1109.ai.studio",
                    ctaText: t.solutions.fullviews.web.cards.maintenanceCloud.ctaText
                  },
                  {
                    id: "web-e-diagnosis",
                    title: t.solutions.fullviews.web.cards.eDiagnosis.title,
                    sector: t.solutions.fullviews.web.cards.eDiagnosis.sector,
                    desc: t.solutions.fullviews.web.cards.eDiagnosis.desc,
                    icon: Zap,
                    color: "border-amber-500/50 hover:border-amber-500/90 bg-gradient-to-br from-amber-500/5 to-blue-500/5 dark:from-amber-900/20 dark:to-slate-900",
                    badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-300 font-extrabold border border-amber-500/30",
                    features: t.solutions.fullviews.web.cards.eDiagnosis.features,
                    metrics: {
                      label: "PERITAJE CNE / RNE",
                      score: "CONFORME CNE / RNE",
                      rows: [
                        { label: "Pozo a Tierra (PAT):", val: "< 25 Ω (Cumple)" },
                        { label: "Caída de Tensión:", val: "< 2.5% (Conforme)" },
                        { label: "Expediente Pericial:", val: "Dossier Oficial" }
                      ]
                    },
                    externalUrl: "https://mapeo.energetico.luxproc.com",
                    ctaText: t.solutions.fullviews.web.cards.eDiagnosis.ctaText
                  }
                ].map((sec) => (
                  <div
                    key={sec.id}
                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border ${sec.color} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${sec.badgeColor}`}>
                          {sec.sector}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <sec.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug break-words">{sec.title}</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6">{sec.desc}</p>

                      <div className="space-y-2 mb-5 sm:mb-6">
                        {sec.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-2 items-start text-xs text-slate-600 dark:text-slate-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technical Metrics Box */}
                      <div className="relative border border-slate-200/60 dark:border-slate-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950/50 mb-5 sm:mb-6 font-mono text-[10px] text-slate-600 dark:text-slate-300 space-y-1.5">
                        <div className="flex justify-between items-center text-emerald-500 font-bold border-b border-slate-200 dark:border-slate-800 pb-1">
                          <span>{sec.metrics?.label || "CORE WEB VITALS"}</span>
                          <span>{sec.metrics?.score || "SCORES: 100%"}</span>
                        </div>
                        {sec.metrics?.rows ? (
                          sec.metrics.rows.map((row, rIdx) => (
                            <div key={rIdx} className="flex justify-between gap-2">
                              <span className="truncate">{row.label}</span>
                              <span className="text-emerald-500 font-bold whitespace-nowrap">{row.val}</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex justify-between"><span>LCP (Speed):</span> <span className="text-emerald-500 font-bold">0.6s</span></div>
                            <div className="flex justify-between"><span>CLS (Stability):</span> <span className="text-emerald-500 font-bold">0.00</span></div>
                            <div className="flex justify-between"><span>FID (Interactivity):</span> <span className="text-emerald-500 font-bold">12ms</span></div>
                          </>
                        )}
                      </div>
                    </div>

                    {sec.externalUrl ? (
                      <a
                        id={`btn-${sec.id}`}
                        href={sec.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] cursor-pointer min-h-[44px]"
                      >
                        {sec.ctaText || "Ingresar a la Plataforma"} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (sec as any).isInteractiveModal ? (
                      <button
                        onClick={(sec as any).modalTrigger}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer min-h-[44px]"
                      >
                        Acceder a LUXPROC Maintenance Cloud <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-not-allowed min-h-[44px]">
                        Ingresar a la Plataforma <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Consultation call */}
              <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950 text-white text-center border border-teal-500/20 shadow-xl relative overflow-hidden mb-12 sm:mb-16">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 mx-auto mb-4 sm:mb-6 animate-pulse" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 leading-tight break-words">
                  {t.solutions.fullviews.web.bannerTitle}
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
                  {t.solutions.fullviews.web.bannerDesc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <a
                    href="#calendario"
                    onClick={() => {
                      closeModalWithHistory(() => setIsWebFullviewOpen(false));
                      setTimeout(() => {
                        const target = document.getElementById("calendario");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="w-full sm:w-auto py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    {t.solutions.fullviews.web.bannerCta}
                  </a>
                  <button
                    onClick={() => {
                      closeModalWithHistory(() => setIsWebFullviewOpen(false));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all active:scale-[0.98] cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    {t.solutions.fullviews.backHome}
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
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden text-left"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative w-full overflow-x-hidden">
              
              {/* Floating Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 border-b border-slate-200 dark:border-slate-800 w-full">
                <button
                  onClick={() => closeModalWithHistory(() => setIsSolutionsFullviewOpen(false))}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.solutions.fullviews.backHome}
                </button>
                <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    LUXPROC: <span className="font-bold text-slate-800 dark:text-white">{t.solutions.fullviews.solutionsDirectory.holisticBadge}</span>
                  </span>
                </div>
              </div>

              {/* Main Banner Hero */}
              <div className="mb-12 sm:mb-16 text-left max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                  <Layers className="w-3.5 h-3.5" />
                  {t.solutions.fullviews.solutionsDirectory.badge}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                  {t.solutions.fullviews.solutionsDirectory.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {t.solutions.fullviews.solutionsDirectory.desc}
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
                    {t.solutions.fullviews.solutionsDirectory.holisticTitle}
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.solutions.fullviews.solutionsDirectory.holisticDesc1}
                    <br /><br />
                    {t.solutions.fullviews.solutionsDirectory.holisticDesc2}
                  </p>
                </div>

                {/* Section: Beneficios del Ecosistema Integrado */}
                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit rounded-2xl mb-6">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {t.solutions.fullviews.solutionsDirectory.benefitsTitle}
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      {t.solutions.fullviews.solutionsDirectory.benefitsDesc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.solutions.fullviews.solutionsDirectory.benefitsList.map((item, idx) => (
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
                  {t.solutions.fullviews.solutionsDirectory.pillarsBadge}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {t.solutions.fullviews.solutionsDirectory.pillarsTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {t.solutions.fullviews.solutionsDirectory.pillarsDesc}
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
                          pushModalHistory("soluciones-erp");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else if (sol.id === "web") {
                          setIsWebFullviewOpen(true);
                          setIsSolutionsFullviewOpen(false);
                          pushModalHistory("soluciones-web");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else if (sol.id === "crm") {
                          setIsCRMFullviewOpen(true);
                          setIsSolutionsFullviewOpen(false);
                          pushModalHistory("soluciones-crm");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          setSelectedSolution(sol);
                          pushModalHistory("soluciones-detalle");
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
                        {t.solutions.fullviews.solutionsDirectory.viewDetail} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Consultation Call */}
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden mb-16">
                <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  {t.solutions.fullviews.solutionsDirectory.bannerTitle}
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  {t.solutions.fullviews.solutionsDirectory.bannerDesc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#calendario"
                    onClick={() => {
                      closeModalWithHistory(() => setIsSolutionsFullviewOpen(false));
                      setTimeout(() => {
                        const target = document.getElementById("calendario");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.solutionsDirectory.bannerCta}
                  </a>
                  <button
                    onClick={() => {
                      closeModalWithHistory(() => setIsSolutionsFullviewOpen(false));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {t.solutions.fullviews.backHome}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MaintenanceSystemModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
      />
    </section>
  );
}
