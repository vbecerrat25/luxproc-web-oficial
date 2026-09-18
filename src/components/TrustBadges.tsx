import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  FileCheck2, 
  CheckCircle2, 
  Scale, 
  Zap, 
  Factory,
  ChevronRight,
  Info,
  X
} from "lucide-react";

interface BadgeItem {
  id: string;
  code: string;
  title: string;
  authority: string;
  description: string;
  normative: string;
  highlight: string;
  icon: any;
  color: string;
  borderColor: string;
  bgColor: string;
}

const ACCREDITATIONS: BadgeItem[] = [
  {
    id: "cip",
    code: "CIP N° 278034 - HABILITADO",
    title: "Colegio de Ingenieros del Perú",
    authority: "Consejo Nacional CIP / C.D. La Libertad - Lima",
    description: "Todos los peritajes eléctricos, expedientes técnicos de obras, certificaciones de pozo a tierra y auditorías de automatización cuentan con firma, sello y certificado de habilitación de Ingeniero Mecánico-Eléctrico Colegiado (CIP N° 278034).",
    normative: "Ley N° 28858 y Ley N° 16053 del Ejercicio Profesional de la Ingeniería en el Perú.",
    highlight: "Expedientes 100% admisibles para INDECI y Municipalidades",
    icon: Award,
    color: "text-amber-500 dark:text-amber-400",
    borderColor: "border-amber-500/30 hover:border-amber-500/70",
    bgColor: "bg-amber-500/10"
  },
  {
    id: "cne-rne",
    code: "CNE / RNE EM.010",
    title: "Normativa Eléctrica Nacional",
    authority: "Ministerio de Energía y Minas (MINEM) / MVCS",
    description: "Riguroso cálculo y contrastación de caídas de tensión (≤2.5% en alimentadores, ≤4.0% en circuitos derivados), dimensionamiento de conductores de cobre electrolítico, protecciones termomagnéticas y fotometría en lúmenes por m².",
    normative: "Código Nacional de Electricidad (Utilización) y RNE Norma Técnica EM.010.",
    highlight: "Cero observaciones en inspecciones de seguridad eléctrica",
    icon: Zap,
    color: "text-blue-500 dark:text-blue-400",
    borderColor: "border-blue-500/30 hover:border-blue-500/70",
    bgColor: "bg-blue-500/10"
  },
  {
    id: "ieee142",
    code: "IEEE 142 / PAT",
    title: "Puesta a Tierra Industrial",
    authority: "IEEE Green Book & CNE Regla 060-712",
    description: "Medición telurométrica certificada con protocolo de prueba de 3 o 4 picas (método de caída de potencial Wenner). Mantenimiento químico con dosis electrolítica y telurómetros calibrados con trazabilidad INACAL.",
    normative: "Resistencia PAT exigida: ≤ 25 Ω (baja tensión) y ≤ 5 Ω (centros de cómputo y servidores).",
    highlight: "Protección garantizada de PLC, variadores y operadores",
    icon: ShieldCheck,
    color: "text-emerald-500 dark:text-emerald-400",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/70",
    bgColor: "bg-emerald-500/10"
  },
  {
    id: "iso-standards",
    code: "ISO 9001 & ISO 55001",
    title: "Gestión de Calidad y Activos Físicos",
    authority: "International Organization for Standardization",
    description: "Arquitectura de procesos en LUXPROC Maintenance Cloud alineada a la norma ISO 55001 (Ciclo de Vida de Maquinaria Industrial) y control de no conformidades conforme a ISO 9001:2015 en plantas de producción.",
    normative: "Estándares internacionales de gestión de mantenimiento proactivo.",
    highlight: "Auditorías de certificación superadas con trazabilidad total",
    icon: Factory,
    color: "text-indigo-500 dark:text-indigo-400",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/70",
    bgColor: "bg-indigo-500/10"
  },
  {
    id: "sunat-ose",
    code: "SUNAT / UBL 2.1",
    title: "Comprobantes y Guías Electrónicas",
    authority: "Superintendencia Nacional de Aduanas y de Administración Tributaria",
    description: "Nuestros sistemas ERP generan facturas, boletas, notas de crédito y Guías de Remisión Electrónicas (GRE) validadas en tiempo real vía OSE / SUNAT con firma digital XML UBL 2.1 y códigos QR tributarios.",
    normative: "Resolución de Superintendencia N° 123-2022/SUNAT y normas conexas.",
    highlight: "Emisión sin caídas y sincronización contable automática",
    icon: FileCheck2,
    color: "text-cyan-500 dark:text-cyan-400",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/70",
    bgColor: "bg-cyan-500/10"
  },
  {
    id: "ley-29783",
    code: "SST LEY N° 29783",
    title: "Seguridad y Salud en el Trabajo",
    authority: "SUNAFIL / Ministerio de Trabajo (MTPE)",
    description: "Protocolos de bloqueo y etiquetado LOTO (Lockout/Tagout) en intervenciones mecánicas y eléctricas, matrices IPERC continuas y dotación de EPP dieléctrico norma ASTM para técnicos de campo.",
    normative: "Ley N° 29783 y D.S. N° 005-2012-TR.",
    highlight: "Tasa de accidentabilidad 0% en intervenciones técnicas",
    icon: Scale,
    color: "text-rose-500 dark:text-rose-400",
    borderColor: "border-rose-500/30 hover:border-rose-500/70",
    bgColor: "bg-rose-500/10"
  }
];

export default function TrustBadges() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  return (
    <section id="certificaciones" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Respaldo Normativo & Homologaciones Industriales
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Ingeniería Certificada Bajo <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Estándares Oficiales</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Nuestras plataformas tecnológicas, peritajes de campo y sistemas de automatización cumplen rigurosamente con las exigencias del Colegio de Ingenieros del Perú, INDECI, SUNAT y normativas internacionales.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ACCREDITATIONS.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.button
                key={badge.id}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBadge(badge)}
                className={`p-4 rounded-2xl bg-white dark:bg-slate-900/90 border ${badge.borderColor} shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer h-full`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${badge.bgColor} ${badge.color}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      OFICIAL
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight mb-1">
                    {badge.code}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
                    {badge.title}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  <span>Ver alcance</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Trust Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Ingeniero Mecánico-Eléctrico Colegiado y Habilitado (CIP N° 278034)
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Informes Validados para Inspecciones INDECI / ITSE
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            RUC 20504794637 - Empresa Formal y Homologable
          </span>
        </div>

      </div>

      {/* Modal Details */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${selectedBadge.bgColor} ${selectedBadge.color}`}>
                  <selectedBadge.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {selectedBadge.code}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedBadge.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Autoridad Reguladora:</span>
                  <p className="text-slate-500 dark:text-slate-400">{selectedBadge.authority}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Descripción Técnica:</span>
                  <p className="leading-relaxed">{selectedBadge.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Base Legal y Normativa:</span>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">{selectedBadge.normative}</p>
                </div>

                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{selectedBadge.highlight}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
