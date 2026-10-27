import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles,
  Calendar
} from "lucide-react";
import { useLanguage, FaqItemI18n } from "../utils/i18n";

export default function FaqSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string>("cip-indeci");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    <section id="faq-tecnica" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          {t.faq.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {t.faq.title} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{t.faq.titleHighlight}</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.faq.subtitle}
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.faq.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {[
              { id: "all", label: t.faq.categories.all },
              { id: "erp", label: t.faq.categories.erp },
              { id: "mantenimiento", label: t.faq.categories.mantenimiento },
              { id: "peritaje", label: t.faq.categories.peritaje },
              { id: "general", label: t.faq.categories.general }
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
            No se encontraron respuestas para "{searchQuery}".
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
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                        <p>{faq.answer}</p>
                        {faq.points && faq.points.length > 0 && (
                          <ul className="pt-1.5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            {faq.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5">
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
          })
        )}
      </div>

      {/* Meeting Booking Direct Action Card (No WhatsApp, directly to Meet Calendar) */}
      <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-teal-600/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {t.faq.directCtaTitle}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.faq.directCtaDesc}
          </p>
        </div>
        <a
          href="#calendario"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md flex-shrink-0 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t.faq.directCtaBtn}</span>
        </a>
      </div>
    </section>
  );
}
