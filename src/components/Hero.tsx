import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Cpu, 
  Activity,
  Terminal,
  Zap,
  Radio,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../utils/i18n";

// Robust, elegant Typewriter Heading adapting smoothly to language changes
function TypewriterHeading() {
  const { language, t } = useLanguage();
  const tw = t.hero.typewriter;
  const fullText = `${tw.part1}${tw.part2}${tw.part3}`;
  const p1Len = tw.part1.length;
  const p2Len = tw.part2.length;

  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typewriter when language changes
  useEffect(() => {
    setCharCount(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charCount < fullText.length) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 50); // Smooth typing speed
      } else {
        // Pause for 3.5s when typing completes
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3500);
      }
    } else {
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 20); // Faster deletion speed
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, fullText.length]);

  const currentTypedText = fullText.slice(0, charCount);
  const part1 = currentTypedText.slice(0, p1Len);
  const part2 = currentTypedText.length > p1Len ? currentTypedText.slice(p1Len, p1Len + p2Len) : "";
  const part3 = currentTypedText.length > p1Len + p2Len ? currentTypedText.slice(p1Len + p2Len) : "";

  return (
    <span className="notranslate inline whitespace-pre-wrap" translate="no">
      {part1}
      {part2 && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
          {part2}
        </span>
      )}
      {part3}
      <span className="inline-block w-[3px] h-[0.85em] bg-blue-600 dark:bg-amber-400 ml-1.5 translate-y-[8%] animate-pulse" />
    </span>
  );
}

// Live Operating Dashboard mockup component (Simulating active system execution)
function LiveOperatingDashboard() {
  const { t } = useLanguage();
  const [latency, setLatency] = useState(12);
  const [execCount, setExecCount] = useState(1420);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const logs = t.hero.dashLogs;

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 10);
      setExecCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logs.length);
    }, 3200);
    return () => clearInterval(logInterval);
  }, [logs.length]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl relative overflow-hidden text-left">
      
      {/* Top Header Bar */}
      <div className="flex justify-between items-center pb-3.5 border-b border-slate-100 dark:border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/90" />
            <div className="w-3 h-3 rounded-full bg-amber-400/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 ml-2 tracking-wide hidden sm:inline">
            SECURE_DASHBOARD://LOGISTICS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            LIVE {latency}ms
          </span>
        </div>
      </div>

      {/* Main Dashboard Interactive Elements */}
      <div className="space-y-3.5 font-sans select-none">
        
        {/* Box 1: Dynamic KPI Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/15 dark:border-blue-500/20 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider">{t.hero.dashEfficiency}</span>
              <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            </div>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">
              +240%
            </span>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <Zap className="w-2.5 h-2.5 fill-current" /> {t.hero.dashRealtime}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/15 dark:border-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider">{t.hero.dashAutoProcesses}</span>
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            </div>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
              99.9%
            </span>
            <div className="mt-1 text-[9px] text-slate-500 dark:text-slate-400 font-mono">
              {execCount.toLocaleString()} ops/min
            </div>
          </div>
        </div>

        {/* Box 2: Meeting integration row with animated streaming indicator */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 shrink-0">
                <Cpu className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {t.hero.dashMeetConnected}
                  </h5>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                  {t.hero.dashMeetStatus}
                </p>
              </div>
            </div>

            <span className="text-[9px] font-mono px-2 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 shrink-0">
              {t.hero.dashConnected}
            </span>
          </div>

          {/* Animated data pulse beam */}
          <div className="mt-2.5 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
            <motion.div 
              animate={{ x: ["-100%", "200%"] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" 
            />
          </div>
        </div>

        {/* Box 3: Flow chart simulation with animated equalizer telemetry bars */}
        <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-blue-500" />
              {t.hero.dashDevTitle}
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">{t.hero.dashPhase}</span>
          </div>

          {/* Equalizer bars animation */}
          <div className="flex gap-1.5 h-5 items-end pt-1">
            <motion.div animate={{ height: ["40%", "80%", "50%", "90%", "40%"] }} transition={{ repeat: Infinity, duration: 1.8 }} className="bg-slate-300 dark:bg-slate-700 w-full rounded-sm" />
            <motion.div animate={{ height: ["60%", "30%", "95%", "60%", "70%"] }} transition={{ repeat: Infinity, duration: 2.2 }} className="bg-slate-300 dark:bg-slate-700 w-full rounded-sm" />
            <motion.div animate={{ height: ["80%", "50%", "70%", "40%", "85%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="bg-slate-300 dark:bg-slate-700 w-full rounded-sm" />
            <motion.div animate={{ height: ["50%", "100%", "60%", "90%", "50%"] }} transition={{ repeat: Infinity, duration: 1.9 }} className="bg-blue-600 w-full rounded-sm shadow-sm shadow-blue-500/50" />
            <motion.div animate={{ height: ["90%", "60%", "100%", "75%", "90%"] }} transition={{ repeat: Infinity, duration: 2.1 }} className="bg-blue-500 w-full rounded-sm shadow-sm shadow-blue-500/50" />
            <motion.div animate={{ height: ["70%", "95%", "50%", "85%", "70%"] }} transition={{ repeat: Infinity, duration: 1.7 }} className="bg-indigo-500 w-full rounded-sm shadow-sm shadow-indigo-500/50" />
          </div>

          {/* Live system log ticker line */}
          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-blue-500 font-bold">&gt;</span>
              <motion.span 
                key={activeLogIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="truncate"
              >
                {logs[activeLogIndex]}
              </motion.span>
            </div>
            <span className="text-emerald-500 font-bold shrink-0 ml-2">100% OK</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero-section" className="relative pt-20 pb-20 px-4 overflow-hidden text-left">
      
      {/* Absolute ambient lights */}
      <div className="absolute top-1/4 right-[10%] w-[35rem] h-[35rem] bg-gradient-to-br from-blue-500/10 to-indigo-600/5 dark:from-blue-600/10 dark:to-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-[15%] w-[25rem] h-[25rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Copy Section (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 lg:pr-10">
          
          {/* Innovations floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold leading-none w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Core display typography with dynamic typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="notranslate text-4xl sm:text-5xl md:text-6xl lg:text-6.5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            translate="no"
          >
            <TypewriterHeading />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl"
          >
            {t.hero.description}
          </motion.p>

          {/* Action triggers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center"
          >
            <a
              href="#calendario"
              className="p-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-550 text-white font-bold text-xs md:text-sm shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              {t.hero.bookCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#soluciones"
              className="p-3.5 px-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 font-semibold text-xs md:text-sm text-center transition-colors cursor-pointer"
            >
              {t.hero.exploreCta}
            </a>
          </motion.div>

          {/* Value proof items */}
          <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t.hero.check1}</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t.hero.check2}</span>
            </div>
          </div>

        </div>

        {/* Right Dashboard Mockup Graphic Section (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          {/* Background glowing frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent rounded-3xl blur-2xl -z-10" />

          {/* Interactive Live Operating Dashboard */}
          <LiveOperatingDashboard />
        </motion.div>

      </div>
    </section>
  );
}
