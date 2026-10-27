/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import BusinessInfo from "./components/BusinessInfo";
import Solutions from "./components/Solutions";
import CalendarBooking from "./components/CalendarBooking";
import ContactForm from "./components/ContactForm";
import FaqModal from "./components/FaqModal";
import BrochureModal from "./components/BrochureModal";
import BrandLogo from "./components/BrandLogo";
import { Cpu, FileDown, ShieldCheck } from "lucide-react";
import { LegalModals, RegulatoryBadges } from "./components/LegalModals";
import SecurityModal from "./components/SecurityModal";
import { useLanguage } from "./utils/i18n";

export default function App() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [activeLegalModal, setActiveLegalModal] = useState<"reclamaciones" | "arco" | "terminos" | "privacidad" | null>(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState<boolean>(false);
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState<boolean>(false);

  // Hash & URL query detection for legal modals (Google Verification support for /#privacidad)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === "#privacidad" || hash === "#politica-de-privacidad" || search.includes("modal=privacidad")) {
        setActiveLegalModal("privacidad");
      } else if (hash === "#terminos" || hash === "#terminos-y-condiciones" || search.includes("modal=terminos")) {
        setActiveLegalModal("terminos");
      } else if (hash === "#libro-de-reclamaciones" || hash === "#reclamaciones") {
        setActiveLegalModal("reclamaciones");
      } else if (hash === "#arco") {
        setActiveLegalModal("arco");
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    const handleOpenPrivacidad = () => setActiveLegalModal("privacidad");
    const handleOpenTerminos = () => setActiveLegalModal("terminos");
    window.addEventListener("open-privacidad-modal", handleOpenPrivacidad);
    window.addEventListener("open-terminos-modal", handleOpenTerminos);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("open-privacidad-modal", handleOpenPrivacidad);
      window.removeEventListener("open-terminos-modal", handleOpenTerminos);
    };
  }, []);

  // Listen to system prefers-color-scheme settings dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Update root system class to toggle tailwind modes smoothly
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Global event listeners for opening corporate brochure, FAQ & Security
  useEffect(() => {
    const handleOpenBrochure = () => setIsBrochureOpen(true);
    const handleOpenFaq = () => setIsFaqOpen(true);
    const handleOpenSecurity = () => setIsSecurityOpen(true);
    window.addEventListener("open-brochure-modal", handleOpenBrochure);
    window.addEventListener("open-faq-modal", handleOpenFaq);
    window.addEventListener("open-faq-fullview", handleOpenFaq);
    window.addEventListener("open-security-modal", handleOpenSecurity);
    return () => {
      window.removeEventListener("open-brochure-modal", handleOpenBrochure);
      window.removeEventListener("open-faq-modal", handleOpenFaq);
      window.removeEventListener("open-faq-fullview", handleOpenFaq);
      window.removeEventListener("open-security-modal", handleOpenSecurity);
    };
  }, []);

  return (
    <div className={isDarkMode ? "dark bg-slate-950 min-h-screen text-slate-100 transition-colors duration-300 relative overflow-x-hidden" : "bg-slate-50 min-h-screen text-slate-800 transition-colors duration-300 relative overflow-x-hidden"}>
      
      {/* 1. Innovative interactive background canvas */}
      <InteractiveBackground isDarkMode={isDarkMode} />

      {/* 2. Structured Sticky Navbar */}
      <Navbar 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
      />

      {/* 3. Hero Section with dynamic typewriter & stats */}
      <Hero />

      {/* 4. Scrolling conveyor belt of client/alliance partners */}
      <LogoMarquee />

      {/* 5. Bento Grid - Mission, Vision, What We Do (Quiénes Somos) */}
      <BusinessInfo />

      {/* 6. Advanced Interactive Solutions Configuration Segment (ERP, Maintenance Cloud, E-Diagnosis) */}
      <Solutions />

      {/* 7. Realtime schedule calendar booking wizard */}
      <CalendarBooking />

      {/* 8. Dedicated Contact formulations */}
      <ContactForm />

      {/* 9. Polished Corporate Footer */}
      <footer className="relative bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-10 pb-16 px-6 md:px-12 lg:px-20 z-10 text-center sm:text-left transition-colors duration-300 overflow-hidden">
        {/* Subtle decorative background glows to fill wide screen empty margins with ambient light */}
        <div className="absolute top-[-50px] left-[-80px] w-[350px] h-[350px] bg-blue-500/[0.04] dark:bg-blue-400/[0.03] rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-amber-500/[0.04] dark:bg-amber-400/[0.03] rounded-full blur-[80px] pointer-events-none z-0" />

        {/* Tech grid dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none z-0" />

        <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 z-10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col sm:items-start items-center gap-3">
              <BrandLogo 
                className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain" 
                isDarkMode={isDarkMode} 
                id="logo-text-fallback" 
              />
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm md:max-w-md leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setIsBrochureOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all cursor-pointer border border-blue-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>{t.footer.brochureBtn}</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">{t.footer.ecosystems}</h4>
            <div className="space-y-1.5 flex flex-col text-slate-500 dark:text-slate-400">
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">{t.footer.erp}</a>
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">{t.footer.maint}</a>
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">{t.footer.diagnosis}</a>
              <button 
                onClick={() => setIsFaqOpen(true)} 
                className="text-left hover:text-blue-500 transition-colors cursor-pointer"
              >
                {t.footer.faq}
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">{t.footer.policiesTitle}</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.footer.policiesDesc}
            </p>
            <div className="pt-2 text-[10px] text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1">
              <Cpu className="w-3 h-3 text-blue-500" /> Server Build v1.5.0 (Production)
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">{t.footer.transparencyTitle}</h4>
            <RegulatoryBadges onOpenModal={setActiveLegalModal} />
          </div>

        </div>

        {/* Legal notice banner */}
        <div className="relative max-w-[1400px] mx-auto mt-8 pt-4 border-t border-slate-200/40 dark:border-slate-800/60 text-center sm:text-left z-10">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic">
            🛡️ {t.footer.legalNotice}
          </p>
        </div>

        {/* Legal copyrights details bar */}
        <div className="relative max-w-[1400px] mx-auto mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium z-10">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. {t.footer.rights} | RUC: 20616650735 | Domicilio Legal: La Libertad, Perú | Dominio Oficial: <a href="https://luxproc.com" className="text-blue-500 hover:underline font-mono" target="_blank" rel="noopener noreferrer">www.luxproc.com</a></p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
              <button 
                onClick={() => setIsSecurityOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/25 transition-all cursor-pointer font-bold"
                title="Ver Certificado de Seguridad y Escudo Anti-Phishing"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Plataforma Encriptada TLS 1.3 / AES-256</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5"></span>
              </button>
              <button 
                onClick={() => setIsSecurityOpen(true)}
                className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
              >
                • Protección Anti-Phishing HSTS Preload
              </button>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                • Cumplimiento Ley N° 29733 (LPDP)
              </span>
              <a 
                href="mailto:luxproc.11@gmail.com" 
                className="flex items-center gap-1 text-blue-500 hover:underline"
              >
                • Contacto Oficial: luxproc.11@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <a 
              href="/terms.html"
              className="hover:text-blue-500 hover:underline cursor-pointer transition-colors"
              title="Ver Términos y Condiciones oficiales"
            >
              {t.footer.terms}
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href="/privacy.html"
              className="hover:text-emerald-500 hover:underline cursor-pointer font-semibold text-slate-600 dark:text-slate-300 transition-colors"
              title="Ver Política de Privacidad oficial estática"
            >
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Regulatory compliance modals */}
      <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />

      {/* Security & Anti-Phishing Certificate Modal */}
      <SecurityModal isOpen={isSecurityOpen} onClose={() => setIsSecurityOpen(false)} />

      {/* Official Corporate Brochure Modal & Printable PDF */}
      <BrochureModal 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
        isDarkMode={isDarkMode} 
      />

      {/* Technical FAQ Modal Window */}
      <FaqModal 
        isOpen={isFaqOpen} 
        onClose={() => setIsFaqOpen(false)} 
      />

    </div>
  );
}
