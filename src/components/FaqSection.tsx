import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  MessageSquare,
  PhoneCall
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "erp" | "mantenimiento" | "peritaje" | "general";
  question: string;
  answer: string;
  badge: string;
}

const FAQS: FaqItem[] = [
  {
    id: "sunat-integration",
    category: "erp",
    badge: "ERP & FACTURACIÓN",
    question: "¿El sistema ERP se integra con facturación electrónica SUNAT y operadores OSE?",
    answer: "Sí, de manera nativa e inmediata. Luxproc ERP genera facturas, boletas, notas de crédito/débito y Guías de Remisión Electrónicas (GRE Remitente y Transportista) certificadas en formato XML UBL 2.1 con código QR tributario y validación automática ante SUNAT o el OSE de su preferencia (Bizlinks, Efact, Nubefact, etc.). La conciliación de ventas y compras es 100% autónoma."
  },
  {
    id: "implementation-time",
    category: "general",
    badge: "PLAZOS DE DESPLIEGUE",
    question: "¿Cuánto tiempo toma la puesta en marcha e implementación en planta?",
    answer: "Nuestra metodología ágil de ingeniería permite poner en marcha los módulos esenciales en 1 a 3 semanas. La fase 1 contempla la importación de catálogo de materias primas/activos y parametrización de usuarios; la fase 2 comprende la capacitación presencial en planta y pruebas piloto con lotes reales de producción; la fase 3 es la salida a producción con acompañamiento técnico continuo."
  },
  {
    id: "operator-training",
    category: "erp",
    badge: "CAPACITACIÓN EN PLANTA",
    question: "¿Cómo capacitan al personal operativo con poca experiencia informática?",
    answer: "Diseñamos interfaces táctiles ultrarrápidas pensadas para operarios de taller y planta (botones grandes, lector de código de barras / QR y confirmación visual por colores). Además, realizamos jornadas presenciales de capacitación en las estaciones de trabajo, entregamos manuales ilustrados paso a paso en PDF y videos breves accesibles desde el celular del operario."
  },
  {
    id: "cip-indeci",
    category: "peritaje",
    badge: "RESPALDO CIP / INDECI",
    question: "¿Los informes de peritaje y pozo a tierra cuentan con firma de Ingeniero Colegiado CIP habilitado para INDECI?",
    answer: "Absolutamente. Cada expediente de peritaje eléctrico, medición de resistencia de pozo a tierra (PAT), termografía infrarroja y protocolo de pruebas es emitido y firmado por el Ing. Mecánico-Eléctrico Víctor Becerra (CIP N° 278034), adjuntando el Certificado de Habilitación Profesional expedido por el Colegio de Ingenieros del Perú (CIP). Son documentos 100% admisibles ante inspecciones técnicas de seguridad en edificaciones (ITSE / INDECI) y municipalidades a nivel nacional."
  },
  {
    id: "cloud-security",
    category: "mantenimiento",
    badge: "SEGURIDAD & SOBERANÍA",
    question: "¿Qué nivel de seguridad y soberanía tienen nuestros datos industriales en la nube?",
    answer: "Toda la información reside en servidores cloud de alta disponibilidad con redundancia geográfica y encriptación de grado bancario (TLS 1.3 en tránsito y AES-256 en reposo). Realizamos copias de seguridad (backups) automáticas diarias y cada cliente cuenta con aislamiento de base de datos. Usted mantiene la propiedad exclusiva de sus datos y puede exportar inventarios y reportes en Excel/PDF en cualquier momento."
  },
  {
    id: "legacy-machines",
    category: "mantenimiento",
    badge: "ACTIVOS & MAQUINARIA",
    question: "¿Puedo integrar maquinaria antigua o tableros existentes a LUXPROC Maintenance Cloud?",
    answer: "Sí. LUXPROC Cloud Maintenance System está concebido tanto para equipos modernos con telemetría como para maquinaria electromecánica clásica. Para equipos antiguos, el sistema gestiona planes de lubricación, reemplazo de rodamientos por horómetro, checklists predictivos y control de repuestos críticos sin necesidad de sensores costosos. Para tableros eléctricos, instalamos monitoreo IoT compatible con Modbus/RS485."
  },
  {
    id: "support-sla",
    category: "general",
    badge: "SOPORTE TÉCNICO",
    question: "¿Qué cobertura de soporte técnico y mantenimiento ofrecen posventa?",
    answer: "Ofrecemos acuerdos de nivel de servicio (SLA) con soporte técnico 24/7 vía canal directo de WhatsApp para emergencias de planta, tickets de ingeniería con respuesta menor a 30 minutos y visitas técnicas presenciales programadas. Las actualizaciones de seguridad, mejoras del sistema y adaptaciones a cambios normativos de SUNAT están incluidas."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>("cip-indeci");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = filterCategory === "all" || faq.category === filterCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="faq-tecnica" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          Preguntas Frecuentes Técnicas & Operativas
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Resolvemos tus Dudas <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Antes de Implementar</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Respuestas transparentes sobre plazos, normativas SUNAT/CIP, seguridad informática y acompañamiento en planta.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tema o palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {[
              { id: "all", label: "Todas" },
              { id: "erp", label: "ERP & SUNAT" },
              { id: "mantenimiento", label: "Mantenimiento" },
              { id: "peritaje", label: "Peritaje CIP" },
              { id: "general", label: "Plazos & Soporte" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === cat.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No se encontraron respuestas para "{searchQuery}". Contáctanos directamente para atender tu caso.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                      {faq.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-200 flex-shrink-0 mt-1 ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Support Direct Contact Footer Card */}
      <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-teal-600/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ¿Tienes un requerimiento técnico específico o licitación?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Conversa directamente con el Ing. Víctor Becerra y el equipo de ingeniería de LUXPROC.
          </p>
        </div>
        <a
          href="https://wa.me/51900000000?text=Hola%20Ing.%20Víctor%20Becerra,%20deseo%20hacer%20una%20consulta%20técnica%20sobre%20los%20servicios%20de%20LUXPROC."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md flex-shrink-0 cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
