import { motion } from "motion/react";
import { 
  Cpu, 
  Layers, 
  Bolt, 
  Globe, 
  ShieldAlert, 
  Database, 
  Network, 
  Activity 
} from "lucide-react";

const PARTNERS = [
  { name: "SANTIAGO TECH", icon: Cpu, color: "text-blue-500" },
  { name: "SIEMENS IND.", icon: Bolt, color: "text-teal-500" },
  { name: "SCHNEIDER ELEC.", icon: Layers, color: "text-emerald-500" },
  { name: "IBM CLOUD", icon: Database, color: "text-indigo-400" },
  { name: "VOLT ENERGY", icon: ShieldAlert, color: "text-amber-500" },
  { name: "APEX ERP", icon: Network, color: "text-sky-500" },
  { name: "GLOBAL SYSTEMS", icon: Globe, color: "text-purple-500" },
  { name: "BIO_LAB R&D", icon: Activity, color: "text-red-500" },
];

export default function LogoMarquee() {
  // Duplicate list to achieve continuous infinite scroll loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div id="logo-marquee-section" className="relative w-full py-10 bg-slate-50/70 dark:bg-slate-900/50 backdrop-blur-md overflow-hidden border-y border-slate-200/50 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-300 font-bold">
          Convenios, Alianzas y Colaboraciones de Alto Nivel
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden mask-gradient">
        {/* Transparent shade masks for extreme elegance */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-12 py-2"
          animate={{ x: [0, -1030] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {duplicatedPartners.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors duration-300"
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-200">
                  {item.name}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 ml-1"></span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
