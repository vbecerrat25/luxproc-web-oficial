import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sun, 
  Moon, 
  Terminal, 
  Layers, 
  Calendar, 
  Sparkles,
  Workflow,
  X,
  Share2
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

interface SocialItem {
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  url: string;
  actionText: string;
}

const SOCIAL_NETWORKS: SocialItem[] = [
  {
    name: "LinkedIn",
    description: "Conexiones corporativas de LUXPROC S.A.C., anuncios de proyectos de ingeniería I+D+i, ofertas de empleo tecnológico, y publicaciones del Ing. Víctor Becerra.",
    color: "text-[#0077B5]",
    bgColor: "bg-[#0077B5]/10",
    borderColor: "border-[#0077B5]/20 hover:border-[#0077B5]/50",
    url: "https://www.linkedin.com",
    actionText: "Conectar en LinkedIn",
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: "WhatsApp",
    description: "Asistencia de ingeniería inmediata. Solicita cotizaciones personalizadas de ERP/CRM, automatización industrial SEC y soporte técnico 24/7.",
    color: "text-[#25D366]",
    bgColor: "bg-[#25D366]/10",
    borderColor: "border-[#25D366]/20 hover:border-[#25D366]/50",
    url: "https://wa.me/51900000000",
    actionText: "Chatear por WhatsApp",
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.411 9.863-9.83 0-2.625-1.023-5.093-2.879-6.953-1.856-1.857-4.327-2.88-6.953-2.88-5.438 0-9.862 4.412-9.865 9.831-.001 1.765.463 3.49 1.345 5.021l-.975 3.558 3.638-.954zm10.155-7.142c-.273-.137-1.62-.8-1.871-.892-.253-.093-.437-.137-.62.137-.183.273-.708.892-.868 1.075-.16.183-.321.206-.594.069-.273-.137-1.153-.425-2.196-1.355-.811-.723-1.358-1.617-1.517-1.892-.16-.273-.017-.42.12-.557.123-.122.273-.321.411-.481.137-.16.183-.273.274-.457.09-.183.046-.343-.023-.48-.069-.137-.62-1.492-.85-2.043-.223-.538-.448-.464-.62-.473-.16-.008-.344-.01-.527-.01-.183 0-.48.069-.73.343-.25.273-.956.934-.956 2.278 0 1.343.977 2.639 1.084 2.784.11.146 1.921 2.932 4.654 4.113.65.28 1.157.447 1.554.573.654.208 1.25.178 1.72.108.524-.078 1.62-.663 1.85-1.302.23-.639.23-1.186.16-1.303-.07-.11-.253-.183-.526-.32z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    description: "Demostraciones técnicas de tableros de control IoT, simulaciones de circuitos impresos personalizados, y documentales de desarrollo de software empresarial.",
    color: "text-[#FF0000]",
    bgColor: "bg-[#FF0000]/10",
    borderColor: "border-[#FF0000]/20 hover:border-[#FF0000]/50",
    url: "https://www.youtube.com",
    actionText: "Ir al Canal de YouTube",
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    description: "Renders tridimensionales en CAD, modelados esquemáticos UX/UI, cobertura de eventos de innovación y el día a día de nuestro equipo.",
    color: "text-[#E1306C]",
    bgColor: "bg-[#E1306C]/10",
    borderColor: "border-[#E1306C]/20 hover:border-[#E1306C]/50",
    url: "https://www.instagram.com",
    actionText: "Ver Instagram",
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    description: "Casos de éxito y testimonios, reportes de soporte reactivo y preventivo, y actualizaciones de alianzas estratégicas corporativas.",
    color: "text-[#1877F2]",
    bgColor: "bg-[#1877F2]/10",
    borderColor: "border-[#1877F2]/20 hover:border-[#1877F2]/50",
    url: "https://www.facebook.com",
    actionText: "Seguir en Facebook",
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  }
];

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo design */}
          <a href="#" id="company-brand" className="flex items-center group cursor-pointer">
            <img 
              src="https://i.imgur.com/W8A2oCf.png" 
              alt="LUXPROC S.A.C." 
              className="h-14 md:h-16 w-auto object-contain dark:invert dark:hue-rotate-180 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Anchor Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#empresa"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors"
            >
              Quiénes Somos
            </a>
            <a
              href="#soluciones"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors"
            >
              Soluciones
            </a>
            <button
              onClick={() => setIsSocialsOpen(true)}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Nuestras Redes Sociales
            </button>
          </nav>

          {/* Controls - Light/Dark toggle + Call to action */}
          <div className="flex items-center gap-4">
            
            {/* Mobile/All screens networks shortcut */}
            <button
              onClick={() => setIsSocialsOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer relative"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-550 transition-colors text-xs font-bold text-white shadow-sm shadow-blue-500/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Agendar Ahora
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
              className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto z-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-blue-500 animate-pulse" />
                    Nuestras Redes Sociales
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Conéctate con el equipo de LUXPROC S.A.C. y descubre nuestra ingeniería.
                  </p>
                </div>
                <button
                  onClick={() => setIsSocialsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Social List */}
              <div className="space-y-4 overflow-y-auto pr-1">
                {SOCIAL_NETWORKS.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, scale: 1.01 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border bg-slate-50/40 dark:bg-slate-900/40 ${social.borderColor} transition-all cursor-pointer`}
                  >
                    <div className={`p-3 rounded-xl ${social.bgColor} ${social.color} flex-shrink-0`}>
                      {social.icon}
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                          {social.name}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-amber-400 underline">
                          {social.actionText} →
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {social.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Footer inside modal */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  Sigue a LUXPROC S.A.C. • Consultoría de Ingeniería de Precisión & Software de Alto Rendimiento
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
