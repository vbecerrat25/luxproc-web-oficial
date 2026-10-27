import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollLock, resetScrollLock } from "../utils/scrollLock";
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  X,
  Sparkles,
  ArrowLeft,
  Calendar
} from "lucide-react";
import { useLanguage, FaqItemI18n } from "../utils/i18n";

interface FaqModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FaqModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: FaqModalProps) {
  const { t } = useLanguage();
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

  const [openId, setOpenId] = useState<string>("cip-indeci");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleReset = () => {
      setInternalIsOpen(false);
      resetScrollLock();
    };

    window.addEventListener("open-faq-fullview", handleOpen);
    window.addEventListener("open-faq-modal", handleOpen);
    window.addEventListener("reset-to-home", handleReset);

    // ESC key listener to close full screen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-faq-fullview", handleOpen);
      window.removeEventListener("open-faq-modal", handleOpen);
      window.removeEventListener("reset-to-home", handleReset);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const faqs: FaqItemI18n[] = t.faq.items;

  const filteredFaqs = faqs.filter((faq) => {
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
            <div className="absolute top-0 right-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 w-full">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al Inicio</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>BASE DE CONOCIMIENTO B2B</span>
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
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                {t.faq.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t.faq.title} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">{t.faq.titleHighlight}</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                {t.faq.subtitle}
              </p>

              {/* Search Box & Category Filters */}
              <div className="mt-8 max-w-2xl mx-auto space-y-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={t.faq.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  {[
                    { id: "all", label: t.faq.categories.all },
                    { id: "erp", label: t.faq.categories.erp },
                    { id: "mantenimiento", label: t.faq.categories.mantenimiento },
                    { id: "peritaje", label: t.faq.categories.peritaje },
                    { id: "general", label: t.faq.categories.general }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        filterCategory === category.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions Showcase Grid */}
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
                <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No encontramos respuestas para "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                  Puedes agendar una reunión directamente con nuestro equipo de ingeniería.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                >
                  Restablecer Búsqueda
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                {filteredFaqs.map((faq) => {
                  const isOpenItem = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                        aria-expanded={isOpenItem}
                      >
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {faq.badge}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-200 flex-shrink-0 mt-1 ${isOpenItem ? "rotate-180 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60" : ""}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpenItem && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 space-y-3">
                              <p>{faq.answer}</p>
                              
                              {faq.points && faq.points.length > 0 && (
                                <ul className="pt-2 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  {faq.points.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2">
                                      <span className="text-blue-500 font-bold">•</span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Direct Meeting Booking Action Section */}
            <div className="mt-12 sm:mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center border border-indigo-500/20 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <Sparkles className="w-10 h-10 text-blue-400 mx-auto animate-pulse" />
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t.faq.directCtaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.faq.directCtaDesc}
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
                    className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.faq.directCtaBtn}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
