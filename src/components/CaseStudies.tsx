import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollLock, resetScrollLock } from "../utils/scrollLock";
import { 
  TrendingUp, 
  Factory, 
  Zap, 
  Gauge, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  Calendar,
  Sparkles,
  Award,
  ArrowLeft,
  X,
  ExternalLink,
  Layers,
  BarChart3,
  PhoneCall,
  FileCheck
} from "lucide-react";

interface CaseStudy {
  id: string;
  tag: string;
  category: "manufactura" | "mantenimiento" | "peritaje";
  title: string;
  subtitle: string;
  clientType: string;
  location: string;
  period: string;
  challenge: string;
  challengePoints: string[];
  solution: string;
  solutionArchitecture: string[];
  kpis: { label: string; value: string; change: string; positive: boolean }[];
  quote: string;
  author: string;
  role: string;
  systemUsed: string;
  systemUrl?: string;
  icon: any;
  accentGradient: string;
  badgeBg: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "calzado-trujillo",
    tag: "MANUFACTURA & TEXTIL",
    category: "manufactura",
    title: "Reducción del 34% en Mermas de Cuero y Trazabilidad de 18,500 Pares/Mes",
    subtitle: "Digitalización Integral de Planta de Calzado de Seguridad y Exportación",
    clientType: "Fábrica de Calzado de Seguridad y Exportación",
    location: "Trujillo (El Porvenir / Parque Industrial) - Perú",
    period: "Despliegue: 3 semanas • Medición: 12 meses continuos",
    challenge: "Falta de control en el consumo de metraje de cuero por lote de corte, dispersión en el cálculo de destajos de más de 45 operarios en aparado y solado, y quiebres de stock recurrentes en adhesivos y suelas.",
    challengePoints: [
      "Pérdida promedio del 12.8% en rendimiento de metraje de cuero vacuno y badana.",
      "Cálculo manual de destajos en libretas físicas, generando discrepancias salariales.",
      "Desconocimiento del margen de contribución real por cada modelo y talla."
    ],
    solution: "Implementación a la medida de Luxproc Shoe & Leather ERP con motor de fichas técnicas por modelo, trazabilidad por código de barras en cada estación de trabajo y liquidación automática de destajos.",
    solutionArchitecture: [
      "Módulo de Corte con cálculo algorítmico de pies cuadrados consumidos vs. estándar.",
      "Estaciones táctiles de marcado para operarios con lector óptico 2D.",
      "Generación instantánea de Guías de Remisión Electrónicas (GRE) y Facturación SUNAT."
    ],
    kpis: [
      { label: "Mermas de Materia Prima", value: "-34%", change: "de 12.8% a 4.2%", positive: true },
      { label: "Volumen Procesado", value: "18.5K", change: "pares/mes certificados", positive: true },
      { label: "Precisión en Costeo", value: "99.2%", change: "margen neto exacto", positive: true },
      { label: "Tiempo de Liquidación", value: "15 min", change: "reducido de 2 días", positive: true }
    ],
    quote: "Antes calculábamos las mermas al ojo y los destajos en cuadernos que se extraviaban. Con Luxproc sabemos en tiempo real cuántos pies de cuero consume cada lote y el pago exacto a cada aparador al terminar su turno.",
    author: "Ing. Carlos Mendoza",
    role: "Gerente de Operaciones y Planta",
    systemUsed: "Luxproc Shoe & Leather ERP",
    systemUrl: "https://shoes-leather-erp-platform.ai.studio",
    icon: Factory,
    accentGradient: "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  },
  {
    id: "agroindustria-oee",
    tag: "MANTENIMIENTO INDUSTRIAL & OEE",
    category: "mantenimiento",
    title: "Incremento del OEE a 91.4% y Reducción del 48% en Tiempos de Parada No Programada",
    subtitle: "Gestión Predictiva de Activos Físicos y Fuerza Motriz bajo Estándar ISO 55001",
    clientType: "Planta de Procesamiento & Fuerza Motriz",
    location: "Ica / Chao - La Libertad, Perú",
    period: "Despliegue: 2 semanas • Medición: 8 meses",
    challenge: "Paradas intempestivas en compresores de tornillo y motores de línea de envasado, falta de inventario de rodamientos y sellos críticos, e historiales de mantenimiento dispersos en hojas de cálculo no estandarizadas.",
    challengePoints: [
      "MTBF bajo (menos de 200 horas entre fallas críticas en motores primarios).",
      "Costos de horas extras no presupuestadas por reparaciones de emergencia nocturnas.",
      "Ausencia de registros auditables para certificaciones de calidad alimentaria."
    ],
    solution: "Despliegue de LUXPROC Cloud Maintenance System: digitalización de órdenes de trabajo (OT), árbol de criticidad de activos, planes de lubricación sistemática e integración de monitoreo termográfico.",
    solutionArchitecture: [
      "Catálogo de activos con árbol jerárquico y cálculo en tiempo real de MTBF / MTTR.",
      "Checklists predictivos desde smartphones para mecánicos y electricistas de planta.",
      "Alertas automatizadas de reemplazo de consumibles críticos antes de rotura."
    ],
    kpis: [
      { label: "OEE Global de Planta", value: "91.4%", change: "+17.4 puntos de mejora", positive: true },
      { label: "Tiempo Reparación (MTTR)", value: "42 min", change: "reducido de 81 min", positive: true },
      { label: "Confiabilidad (MTBF)", value: "340 hrs", change: "+140 hrs entre fallas", positive: true },
      { label: "Ahorro Anual Estimado", value: "$42.5K", change: "en paradas evitadas", positive: true }
    ],
    quote: "La transición de apagar incendios a un mantenimiento predictivo y preventivo programado nos permitió asegurar la continuidad de la campaña de exportación sin perder ni una sola hora de frío.",
    author: "Ing. Roberto Alarcón",
    role: "Jefe de Mantenimiento y Confiabilidad",
    systemUsed: "LUXPROC Cloud Maintenance System",
    systemUrl: "https://maintenancecloud-1109.ai.studio",
    icon: Gauge,
    accentGradient: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/30",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  },
  {
    id: "peritaje-electrico",
    tag: "AUDITORÍA & SEGURIDAD ELÉCTRICA",
    category: "peritaje",
    title: "Certificación ITSE sin Observaciones y Resistencia de Pozo a Tierra Reducida a 3.8 Ω",
    subtitle: "Peritaje Técnico de Instalaciones, Calidad de Energía y Dossier Colegiado CIP",
    clientType: "Edificio Corporativo & Centro de Distribución Logística",
    location: "Lima (San Isidro / Lurín) - Perú",
    period: "Intervención: 5 días hábiles • Certificado INDECI Aprobado",
    challenge: "Notificación municipal de subsanación inmediata por pozos a tierra con 38.6 Ω de resistencia (excediendo ampliamente la norma de 25 Ω), caídas de tensión en tableros generales y riesgo de clausura comercial.",
    challengePoints: [
      "Riesgo de electrocución y daño en servidores de datos por falla de descarga a tierra.",
      "Plazo de 7 días hábiles otorgado por la Municipalidad para levantar observaciones ITSE.",
      "Desequilibrio de fases superior al 18% en el tablero general de distribución."
    ],
    solution: "Auditoría pericial integral con LUXPROC E-DIAGNOSIS: regeneración química de pozos PAT con telurómetro calibrado, balanceo de cargas en alimentadores y emisión de dossier pericial con firma de Ingeniero Colegiado CIP.",
    solutionArchitecture: [
      "Medición de resistividad de terreno y protocolo de pruebas de puesta a tierra.",
      "Inspección termográfica infrarroja en barras de distribución y llaves termomagnéticas.",
      "Firma y habilitación CIP N° 278034 del Ing. Mecánico-Eléctrico Víctor Becerra conforme CNE."
    ],
    kpis: [
      { label: "Resistencia PAT Final", value: "3.8 Ω", change: "norma exige ≤ 25 Ω", positive: true },
      { label: "Caída de Tensión", value: "1.8%", change: "dentro del límite CNE", positive: true },
      { label: "Aprobación INDECI", value: "100%", change: "inspección aprobada", positive: true },
      { label: "Plazo de Entrega", value: "72 hrs", change: "dossier físico + digital", positive: true }
    ],
    quote: "El expediente técnico con certificado de habilitación CIP y protocolo de pruebas firmado por LUXPROC fue aceptado inmediatamente por los inspectores de seguridad de la municipalidad, evitando la paralización del centro logístico.",
    author: "Lic. Patricia Saldaña",
    role: "Directora de Infraestructura y Operaciones",
    systemUsed: "LUXPROC E-DIAGNOSIS",
    systemUrl: "https://e-diagnosis-inteligente.ai.studio",
    icon: Zap,
    accentGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
  }
];

interface CaseStudiesProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CaseStudies({ isOpen: controlledIsOpen, onClose: controlledOnClose }: CaseStudiesProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
      resetScrollLock();
    }
  };

  useScrollLock(isOpen);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleReset = () => {
      setInternalIsOpen(false);
      resetScrollLock();
    };

    window.addEventListener("open-casos-fullview", handleOpen);
    window.addEventListener("reset-to-home", handleReset);

    // ESC key listener to close full screen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-casos-fullview", handleOpen);
      window.removeEventListener("reset-to-home", handleReset);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredStudies = selectedCategory === "all" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden text-left"
        >
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 w-full">
            
            {/* Top Navigation & Action Bar */}
            <div className="flex items-center justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al Inicio</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>CASOS DOCUMENTADOS</span>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Cerrar ventana (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Page Header */}
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Impacto Cuantitativo & Retorno de Inversión
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Casos de Éxito de <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">Ingeniería & Software</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Resultados medibles con datos de planta: optimización de mermas de materias primas, aumento del OEE en maquinaria crítica y peritajes normativos para empresas líderes en el Perú.
              </p>

              {/* Category Filters Bar */}
              <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit mx-auto shadow-sm">
                {[
                  { id: "all", label: "Todos los Casos" },
                  { id: "manufactura", label: "Manufactura & Calzado (ERP)" },
                  { id: "mantenimiento", label: "Mantenimiento Cloud & OEE" },
                  { id: "peritaje", label: "Peritaje Eléctrico CNE/ITSE" }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === category.id
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Detailed Showcase */}
            <div className="space-y-12 sm:space-y-16">
              {filteredStudies.map((study, index) => {
                const Icon = study.icon;
                return (
                  <motion.article
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.1 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative"
                  >
                    {/* Header Info */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100 dark:border-slate-800">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${study.badgeBg}`}>
                            {study.tag}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            {study.period}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                          {study.title}
                        </h2>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {study.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-center">
                        <div className="text-left lg:text-right text-xs">
                          <span className="font-bold text-slate-900 dark:text-white block">{study.clientType}</span>
                          <span className="text-slate-500 dark:text-slate-400 block">{study.location}</span>
                        </div>
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Content Grid: Challenge & Architecture vs KPIs & Testimonial */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      
                      {/* Left: Challenge and Solution Architecture (7 cols) */}
                      <div className="lg:col-span-7 space-y-6">
                        {/* The Challenge */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-rose-500/[0.04] dark:bg-rose-500/[0.06] border border-rose-500/20">
                          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Desafío Inicial & Diagnóstico:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            {study.challenge}
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                            {study.challengePoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-rose-500 mt-0.5">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* The Solution */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] border border-emerald-500/20">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Solución de Ingeniería LUXPROC:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            {study.solution}
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                            {study.solutionArchitecture.map((arch, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{arch}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Metrics / KPIs and Executive Quote (5 cols) */}
                      <div className="lg:col-span-5 space-y-6">
                        
                        {/* KPIs Grid */}
                        <div className="grid grid-cols-2 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                          {study.kpis.map((kpi, kIdx) => (
                            <div key={kIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 text-center">
                              <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                                {kpi.value}
                              </span>
                              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight mt-1">
                                {kpi.label}
                              </span>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {kpi.change}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Executive Quote */}
                        <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border-l-4 border-emerald-500 relative">
                          <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                            "{study.quote}"
                          </p>
                          <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                              {study.author.charAt(0)}
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                                {study.author}
                              </span>
                              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                                {study.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Platform Link */}
                        {study.systemUrl && (
                          <a
                            href={study.systemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
                          >
                            <span>Explorar Sistema: {study.systemUsed}</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}

                      </div>

                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-14 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white text-center border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  ¿Deseas lograr resultados similares en tu empresa?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Podemos realizar una auditoría técnica preliminar para cuantificar el margen de mejora en tu planta, almacén o infraestructura eléctrica.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#calendario"
                    onClick={() => {
                      handleClose();
                      setTimeout(() => {
                        const target = document.getElementById("calendario");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }, 120);
                    }}
                    className="py-3.5 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    Agendar Auditoría Técnica
                  </a>

                  <button
                    onClick={handleClose}
                    className="py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all cursor-pointer"
                  >
                    Volver a la Página Principal
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
