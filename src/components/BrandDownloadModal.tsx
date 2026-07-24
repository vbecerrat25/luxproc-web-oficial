import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Check, Copy, Sparkles, Image as ImageIcon, ShieldCheck, ExternalLink } from "lucide-react";

interface BrandDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandDownloadModal({ isOpen, onClose }: BrandDownloadModalProps) {
  const [bgMode, setBgMode] = useState<"grid" | "dark" | "light">("grid");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const mainHdImageUrl = "https://i.imgur.com/9PTaAa4.png";
  const horizontalImageUrl = "https://i.imgur.com/dQgxO9K.png";

  const handleDownload = async (url: string, filename: string) => {
    setDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: open in new window if blob fetch fails
      window.open(url, "_blank");
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Recursos Oficiales de Marca
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-500" />
                  Descargar Logo e Isotipo HD
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Obtén la versión vectorizada en alta definición (1254x1254 px) con fondo transparente.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Background switcher for preview */}
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Vista Previa de Alta Definición:
              </span>
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setBgMode("grid")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    bgMode === "grid"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Cuadrícula
                </button>
                <button
                  onClick={() => setBgMode("dark")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    bgMode === "dark"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Oscuro
                </button>
                <button
                  onClick={() => setBgMode("light")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    bgMode === "light"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Claro
                </button>
              </div>
            </div>

            {/* Main High-Res Image Card Showcase */}
            <div
              className={`relative w-full h-64 sm:h-72 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6 transition-colors duration-300 overflow-hidden group ${
                bgMode === "grid"
                  ? "bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 dark:bg-slate-950"
                  : bgMode === "dark"
                  ? "bg-slate-950"
                  : "bg-white"
              }`}
            >
              {/* Image element */}
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                src={mainHdImageUrl}
                alt="Logo Isotipo Oficial LUXPROC HD"
                className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* HD Badge overlay */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                1254 x 1254 px • PNG Transparente
              </div>
            </div>

            {/* Download Buttons Section */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => handleDownload(mainHdImageUrl, "LUXPROC-Isotipo-Oficial-1254x1254.png")}
                disabled={downloading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5 animate-bounce" />
                {downloading ? "Descargando Imagen HD..." : "Descargar Logo Isotipo HD (1254x1254 PNG)"}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownload(horizontalImageUrl, "LUXPROC-Logo-Horizontal.png")}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
                >
                  <Download className="w-4 h-4 text-blue-500" />
                  Descargar Logo Horizontal (1173x467)
                </button>

                <button
                  onClick={() => handleCopyLink(mainHdImageUrl)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      ¡Enlace Copiado al Portapapeles!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-500" />
                      Copiar Enlace Directo
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Legal / Usage note */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1">
                <span>© LUXPROC S.A.C.</span> • <span>Uso corporativo y de prensa libre de regalías.</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
