import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BrandLogo from "./BrandLogo";
import { useScrollLock } from "../utils/scrollLock";
import { useLanguage, LANGUAGE_OPTIONS, Language } from "../utils/i18n";
import { 
  Sun, 
  Moon, 
  Calendar, 
  Sparkles, 
  Workflow, 
  X, 
  Share2, 
  Clock,
  ShieldCheck,
  Globe,
  ChevronDown,
  Check
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenBrochure?: () => void;
  onOpenFaq?: () => void;
  onOpenCasos?: () => void;
}

interface SocialItem {
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  isActive: boolean;
  url?: string;
  actionText?: string;
  isInternalAnchor?: boolean;
}

const SOCIAL_NETWORKS: SocialItem[] = [
  {
    name: "Google Meet",
    description: "Canal oficial activo. Agendamiento técnico directo de 30 minutos. Coordina con nuestro equipo de ingeniería la arquitectura de tu software ERP/CRM o asesoría tecnológica con enlace oficial.",
    color: "text-[#00897B]",
    bgColor: "bg-[#00897B]/10",
    borderColor: "border-[#00897B]/30 hover:border-[#00897B]/60",
    url: "#calendario",
    actionText: "Agendar Reunión Meet",
    isActive: true,
    isInternalAnchor: true,
    icon: (
      <Calendar className="w-6 h-6" />
    )
  },
  {
    name: "LinkedIn",
    description: "Canal corporativo para anuncios de proyectos de ingeniería I+D+i, ofertas de empleo tecnológico y publicaciones del equipo de ingeniería.",
    color: "text-[#0077B5]",
    bgColor: "bg-[#0077B5]/10",
    borderColor: "border-[#0077B5]/20",
    isActive: false,
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    description: "Canal de demostraciones técnicas de tableros IoT, simulaciones de circuitos impresos personalizados y software empresarial.",
    color: "text-[#FF0000]",
    bgColor: "bg-[#FF0000]/10",
    borderColor: "border-[#FF0000]/20",
    isActive: false,
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    description: "Canal de renders tridimensionales en CAD, modelados esquemáticos UX/UI y novedades de tecnología.",
    color: "text-[#E1306C]",
    bgColor: "bg-[#E1306C]/10",
    borderColor: "border-[#E1306C]/20",
    isActive: false,
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    description: "Canal de actualizaciones corporativas, comunicados técnicos y reportes de desarrollo.",
    color: "text-[#1877F2]",
    bgColor: "bg-[#1877F2]/10",
    borderColor: "border-[#1877F2]/20",
    isActive: false,
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  }
];

export default function Navbar({ isDarkMode, setIsDarkMode, onOpenBrochure, onOpenFaq }: NavbarProps) {
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useScrollLock(isSocialsOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFaqClick = () => {
    if (onOpenFaq) {
      onOpenFaq();
    } else {
      window.dispatchEvent(new CustomEvent("open-faq-modal"));
    }
  };

  const currentLangOption = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo design */}
          <a 
            href="#" 
            id="company-brand" 
            className="flex items-center group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.dispatchEvent(new CustomEvent("reset-to-home"));
            }}
          >
            <BrandLogo className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain" isDarkMode={isDarkMode} id="navbar-logo-fallback" />
          </a>

          {/* Desktop Anchor Navigation links (Casos de éxito hidden per user request) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-nosotros-fullview"));
              }}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <a
              href="#soluciones"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-solutions-fullview"));
              }}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t.nav.solutions}
            </a>
            <button
              onClick={handleFaqClick}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => setIsSocialsOpen(true)}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t.nav.networks}
            </button>
          </nav>

          {/* Controls - Language Switcher, Light/Dark toggle + Call to action */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Automatic Multi-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
                title="Cambiar Idioma / Change Language / Mudar Idioma"
                aria-label="Language Selector"
                aria-expanded={isLangMenuOpen}
              >
                <span className="text-sm">{currentLangOption.flag}</span>
                <span className="hidden sm:inline font-mono uppercase text-[11px]">{currentLangOption.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isLangMenuOpen ? "rotate-180 text-blue-500" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      {t.nav.language}
                    </div>
                    {LANGUAGE_OPTIONS.map((opt) => {
                      const isSelected = opt.code === language;
                      return (
                        <button
                          key={opt.code}
                          onClick={() => {
                            setLanguage(opt.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                              : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{opt.flag}</span>
                            <span>{opt.name}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Security & Anti-Phishing Shield Button */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-security-modal"));
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 transition-all text-xs font-bold cursor-pointer"
              title="Plataforma Encriptada TLS 1.3 / Escudo Anti-Phishing (RUC 20616650735)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">{t.nav.secureSite}</span>
            </button>

            {/* Mobile Nosotros button */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-nosotros-fullview"));
              }}
              className="lg:hidden px-2.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider hover:bg-blue-500/20 transition-all cursor-pointer"
            >
              {t.nav.about}
            </button>

            {/* Mobile/All screens networks shortcut */}
            <button
              onClick={() => setIsSocialsOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer relative"
              title="Redes Sociales"
            >
              <Share2 className="w-4.5 h-4.5" />
            </button>

            {/* Innovations Theme toggler switch with spring movement animations */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer relative"
              title={isDarkMode ? "Cambiar a modo Claro" : "Cambiar a modo Oscuro"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0, scale: [0.85, 1] }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-blue-600" />}
              </motion.div>
            </button>

            <a
              href="#calendario"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-550 transition-colors text-xs font-bold text-white shadow-sm shadow-blue-500/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.nav.bookNow}
            </a>
          </div>

        </div>
      </header>

      {/* Social networks modal overlay */}
      <AnimatePresence>
        {isSocialsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSocialsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto z-10 flex flex-col text-left"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-blue-500 animate-pulse" />
                    {t.nav.networkTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t.nav.networkSubtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsSocialsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notice Banner - Networks Not Active */}
              <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[11px] sm:text-xs text-amber-800 dark:text-amber-300">
                    {t.nav.networkSubtitle}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {t.nav.networkNotice}
                  </p>
                </div>
              </div>

              {/* Social List */}
              <div className="space-y-4 overflow-y-auto pr-1">
                {SOCIAL_NETWORKS.map((social) => {
                  if (social.isActive && social.isInternalAnchor) {
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        onClick={() => {
                          setIsSocialsOpen(false);
                          setTimeout(() => {
                            const el = document.getElementById("calendario");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        whileHover={{ x: 3, scale: 1.01 }}
                        className={`flex items-start gap-4 p-4 rounded-2xl border bg-emerald-50/50 dark:bg-emerald-950/20 ${social.borderColor} transition-all cursor-pointer`}
                      >
                        <div className={`p-3 rounded-xl ${social.bgColor} ${social.color} flex-shrink-0`}>
                          {social.icon}
                        </div>
                        <div className="space-y-1.5 flex-grow">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                              {social.name}
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                                {t.nav.networkActiveBadge}
                              </span>
                            </span>
                            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 underline">
                              {social.actionText} →
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {social.description}
                          </p>
                        </div>
                      </motion.a>
                    );
                  }

                  return (
                    <div
                      key={social.name}
                      className="flex items-start gap-4 p-4 rounded-2xl border bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 transition-all opacity-85"
                    >
                      <div className={`p-3 rounded-xl ${social.bgColor} ${social.color} flex-shrink-0 opacity-75`}>
                        {social.icon}
                      </div>
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                            {social.name}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {t.nav.networkInactiveBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {social.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Footer inside modal */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. • Consultoría de Ingeniería de Precisión & Software de Alto Rendimiento
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
