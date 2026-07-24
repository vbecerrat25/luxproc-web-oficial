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
import BrandLogo from "./components/BrandLogo";
import BrandDownloadModal from "./components/BrandDownloadModal";
import { Cpu, Download } from "lucide-react";
import { LegalModals, RegulatoryBadges } from "./components/LegalModals";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [activeLegalModal, setActiveLegalModal] = useState<"reclamaciones" | "arco" | "terminos" | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Listen to system prefers-color-scheme settings dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    // Modern listener syntax
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Listen for global open-download-logo event
  useEffect(() => {
    const handleOpenDownload = () => {
      setIsDownloadModalOpen(true);
    };
    window.addEventListener("open-download-logo", handleOpenDownload);
    return () => window.removeEventListener("open-download-logo", handleOpenDownload);
  }, []);

  // Update root system class to toggle tailwind modes smoothly
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark bg-slate-950 min-h-screen text-slate-100 transition-colors duration-300 relative overflow-x-hidden" : "bg-slate-50 min-h-screen text-slate-800 transition-colors duration-300 relative overflow-x-hidden"}>
      
      {/* 1. Innovative interactive background canvas */}
      <InteractiveBackground isDarkMode={isDarkMode} />

      {/* 2. Structured Sticky Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* 3. Hero Section with stats counters */}
      <Hero />

      {/* 4. Scrolling conveyor belt of client/alliance partners */}
      <LogoMarquee />

      {/* 5. Bento Grid - Mission, Vision, What We Do (Quiénes Somos) */}
      <BusinessInfo />

      {/* 6. Advanced Interactive Solutions Configuration Segment (CRM/ERP Showcase) */}
      <Solutions />

      {/* 7. Realtime schedule calendar booking wizard */}
      <CalendarBooking />

      {/* 8. Dedicated Contact formulations */}
      <ContactForm />

      {/* 9. Polished Corporate Footer */}
      <footer className="relative bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-10 pb-16 px-6 md:px-12 lg:px-20 z-10 text-center sm:text-left transition-colors duration-300 overflow-hidden">
        {/* Subtle decorative background glows to fill wide screen empty margins with elegant ambient light */}
        <div className="absolute top-[-50px] left-[-80px] w-[350px] h-[350px] bg-blue-500/[0.04] dark:bg-blue-400/[0.03] rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-amber-500/[0.04] dark:bg-amber-400/[0.03] rounded-full blur-[80px] pointer-events-none z-0" />

        {/* Tech grid dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none z-0" />

        <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 z-10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col sm:items-start items-center gap-3">
              <BrandLogo className="h-20 md:h-24 w-auto" isDarkMode={isDarkMode} />
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs transition-all cursor-pointer border border-blue-500/20 shadow-sm active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                Descargar Logo Oficial (1254x1254 HD)
              </button>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Líderes en ingeniería física y digital integrada. Desarrollamos ERPs, CRMs avanzados, arquitecturas web escalables y lideramos proyectos de innovación científica (I+D+i) para orquestar la eficiencia del mañana.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">Ecosistemas</h4>
            <div className="space-y-1.5 flex flex-col text-slate-500 dark:text-slate-400">
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">Plataformas ERP</a>
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">Sistemas CRM</a>
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">Proyectos de I+D+i</a>
              <a href="#soluciones" className="hover:text-blue-500 transition-colors">Instalaciones Eléctricas</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">Políticas e Integraciones</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Ecosistema orquestado mediante OAuth seguro e integrado de manera nativa con Google Calendar API y Google Meet API.
            </p>
            <div className="pt-2 text-[10px] text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1">
              <Cpu className="w-3 h-3 text-blue-500" /> Server Build v1.4.1 (Stable)
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-[10px]">Transparencia y Leyes</h4>
            <RegulatoryBadges onOpenModal={setActiveLegalModal} />
          </div>

        </div>

        {/* Legal copyrights details bar */}
        <div className="relative max-w-[1400px] mx-auto mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium z-10">
          <p>© {new Date().getFullYear()} LUXPROC S.A.C. Todos los derechos reservados. | Dominio Oficial: <a href="http://www.luxproc.com" className="text-blue-500 hover:underline font-mono" target="_blank" rel="noopener noreferrer">www.luxproc.com</a></p>
        </div>
      </footer>

      {/* Interactive Regulatory compliance modals */}
      <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />

      {/* Brand & Logo HD Download Modal */}
      <BrandDownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />

    </div>
  );
}
