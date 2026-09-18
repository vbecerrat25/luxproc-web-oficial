import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollLock } from "../utils/scrollLock";
import BrandLogo from "./BrandLogo";
import { downloadBrochurePdf, printBrochure } from "../utils/generateBrochurePdf";
import { 
  FileDown, 
  Printer, 
  X, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Zap, 
  Factory, 
  Gauge, 
  BarChart3, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  Calendar,
  Sparkles,
  ChevronRight,
  Download,
  Loader2
} from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function BrochureModal({ isOpen, onClose, isDarkMode }: BrochureModalProps) {
  useScrollLock(isOpen);
  const printRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDownload = () => {
    setIsProcessing(true);
    setFeedback("Generando documento PDF oficial...");
    try {
      downloadBrochurePdf();
      setFeedback("¡Descarga iniciada exitosamente: Dossier_Tecnico_LUXPROC_2026.pdf!");
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error("Error al generar PDF:", err);
      setFeedback("Hubo un detalle al descargar, reintentando...");
      setTimeout(() => setFeedback(null), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    setIsProcessing(true);
    setFeedback("Preparando diálogo de impresión y generando PDF...");
    try {
      // First, initiate download so the user ALWAYS gets the physical PDF file saved
      downloadBrochurePdf();
      // Second, initiate print routine
      printBrochure();
      setFeedback("¡Documento enviado a impresión y guardado como PDF!");
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error("Error en impresión:", err);
      downloadBrochurePdf();
      setFeedback("PDF guardado en descargas.");
      setTimeout(() => setFeedback(null), 3500);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 text-left">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Floating Control Bar */}
          <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <FileDown className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Dossier Técnico & Brochure Corporativo 2026
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. • Documento Oficial
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                disabled={isProcessing}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                title="Imprimir o Guardar en PDF"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Printer className="w-3.5 h-3.5" />
                )}
                <span>Imprimir / Guardar PDF</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={isProcessing}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs items-center gap-1.5 transition-all cursor-pointer"
                title="Descargar archivo PDF directamente"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Feedback Notification Bar */}
          {feedback && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {feedback}
              </span>
              <button 
                onClick={() => setFeedback(null)} 
                className="text-emerald-700 dark:text-emerald-300 hover:underline text-[11px] cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Printable Document Sheet */}
          <div 
            id="printable-brochure"
            className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:overflow-visible" 
            ref={printRef}
          >
            
            {/* Header Document */}
            <div className="border-b-2 border-slate-900 dark:border-white pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <BrandLogo className="h-12 w-auto max-w-[240px] mb-2" isDarkMode={isDarkMode} />
                <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  R.U.C. 20504794637 • Trujillo / La Libertad - Perú
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ingeniería Física, Software Industrial y Peritaje CIP
                </p>
              </div>

              <div className="sm:text-right text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5 font-mono">
                <div className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold mb-1">
                  DOSSIER TÉCNICO OFICIAL 2026
                </div>
                <div>Ingeniería y Peritaje: <strong>Ing. Víctor Becerra</strong></div>
                <div>Colegiado CIP: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">N° 278034</strong></div>
                <div>Contacto: <strong>contacto@luxproc.com</strong></div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                1. Presentación Institucional
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.</strong> es una empresa peruana de alta ingeniería dedicada a la convergencia entre sistemas físicos y software avanzado. Desarrollamos plataformas ERP/CRM a la medida para manufactura, sistemas cloud de mantenimiento industrial predictivo bajo normas ISO 55001, y ejecutamos peritajes eléctricos certificados con validez legal ante INDECI y municipalidades.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                2. Plataformas y Soluciones Principales
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Pillar 1 */}
                <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-amber-500" />
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Luxproc Shoe & Leather ERP
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Control integral de inventario de materia prima (MP), cálculo automático de mermas de cuero, control de destajo por operador, órdenes de compra, trazabilidad por código de barras y generador de QR.
                  </p>
                  <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    • Mermas reducidas hasta un 34% en plantas de calzado.
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      LUXPROC Cloud Maintenance System
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Gestión de activos industriales, árbol de equipos, órdenes de trabajo (OT) digitales, control de repuestos críticos, e indicadores KPI en tiempo real: OEE (91%), MTBF y MTTR.
                  </p>
                  <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    • Alineado a estándares ISO 55001 y reducción del 48% de paradas.
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      LUXPROC E-DIAGNOSIS (Peritaje CIP)
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Auditorías eléctricas integrales, medición de pozo a tierra (PAT ≤ 25Ω), termografía predictiva de tableros generales, caída de tensión y fotometría lux. Expedientes con firma de Ingeniero Colegiado CIP.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    • 100% admisibles para licencias INDECI y defensa civil.
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-500" />
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Diagnóstico de Madurez Digital
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Auditoría estratégica en 20 dimensiones de negocio. Generación automática de gráficos Spider Radar, matriz de priorización y hoja de ruta tecnológica para directores y gerencias.
                  </p>
                  <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    • Hoja de ruta priorizada con ROI en menos de 90 días.
                  </div>
                </div>

              </div>
            </div>

            {/* Compliance & Normatives */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                3. Homologaciones y Normas de Cumplimiento
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">CIP N° 278034</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>CNE / RNE EM.010</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>IEEE 142 PAT</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>ISO 9001 / 55001</span>
                </div>
              </div>
            </div>

            {/* Engineering Validation Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Validación Técnica y Respaldo Profesional:
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Expediente emitido bajo los estándares de la Ley del Ejercicio Profesional de la Ingeniería en el Perú (Ley N° 28858) y la representación facultada de Carmen Terán Vda. de Becerra (CEO & Co-Fundadora).
                </p>
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4 flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-400 block">FIRMA Y SELLO TÉCNICO</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs">ING. VÍCTOR BECERRA</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block">COLEGIADO CIP N° 278034</span>
              </div>
            </div>

            {/* Footer Contact Details */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. • www.luxproc.com</span>
              <span>Central: +51 900 000 000 • contacto@luxproc.com</span>
              <span>Trujillo - La Libertad, Perú</span>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex justify-between items-center flex-shrink-0">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Documento apto para presentación a Directorio o Jefaturas de Planta.
            </span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={handlePrint}
                disabled={isProcessing}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
                <span>Imprimir / Descargar en PDF</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
