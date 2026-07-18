import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Star, 
  ShieldCheck, 
  Cpu, 
  Layers 
} from "lucide-react";

function TypewriterHeading() {
  const text1 = "Sistemas ERP, CRM y ";
  const text2 = "Desarrollo Moderno";
  const text3 = " Sin Fricciones.";
  
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const totalLength = text1.length + text2.length + text3.length;
    
    if (!isDeleting) {
      if (charCount < totalLength) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 75); // Write pace
      } else {
        // Hold on completed state
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 4000);
      }
    } else {
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 25); // Faster deleting pace
      } else {
        // Pause momentarily on blank state before retyping
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 600);
      }
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting]);

  let display1 = "";
  let display2 = "";
  let display3 = "";

  let remaining = charCount;

  if (remaining <= text1.length) {
    display1 = text1.slice(0, remaining);
    remaining = 0;
  } else {
    display1 = text1;
    remaining -= text1.length;
  }

  if (remaining > 0) {
    if (remaining <= text2.length) {
      display2 = text2.slice(0, remaining);
      remaining = 0;
    } else {
      display2 = text2;
      remaining -= text2.length;
    }
  }

  if (remaining > 0) {
    display3 = text3.slice(0, remaining);
  }

  return (
    <span className="relative">
      <span>{display1}</span>
      {display2 && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
          {display2}
        </span>
      )}
      <span>{display3}</span>
      {/* Elegantly styled blinking cursor representing active input */}
      <span className="inline-block w-[3px] h-[0.9em] bg-blue-600 dark:bg-amber-400 ml-1 translate-y-[5%] animate-pulse" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero-section" className="relative pt-20 pb-20 px-4 overflow-hidden">
      
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
            <span>Consultoría de Ingeniería & Software Completo</span>
          </motion.div>

          {/* Core display typography with dynamic typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] min-h-[3.3em] md:min-h-[2.2em]"
          >
            <TypewriterHeading />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl"
          >
            Diseñamos soluciones tecnológicas integrales que vinculan software escalable, control logístico inteligente e ingeniería de hardware a la medida. Agenda una consultoría automatizada por Google Meet hoy.
          </motion.p>

          {/* Double Actions triggers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <a
              href="#calendario"
              className="p-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-550 text-white font-bold text-xs md:text-sm shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              Agendar Consultoría Gratuita 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#soluciones"
              className="p-4 px-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 font-semibold text-xs md:text-sm text-center transition-colors cursor-pointer"
            >
              Explorar Soluciones ERP/CRM
            </a>
          </motion.div>

          {/* Social proof items */}
          <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Sincronización en 30 minutos sin colisiones</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Ingeniería Física e Innovación (I+D+i)</span>
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

          {/* Double stack mockup browser frames for supreme visual polish */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider">SECURE_DASHBOARD://LOGISTICS</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </div>

            {/* Simulated UI components */}
            <div className="space-y-4 font-sans select-none">
              
              {/* Box 1: KPI Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none">EFICIENCIA ERP</span>
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">+240%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none">PROCESOS AUTOM.</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">99.9%</span>
                </div>
              </div>

              {/* Box 2: Meeting integration row */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">Conexión Google Meet</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Sincronización de Calendario Estable</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold">
                  CONECTADO
                </span>
              </div>

              {/* Box 3: Flow chart simulation */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                  <span>DESARROLLO A MEDIDA</span>
                  <span className="text-indigo-400">FASE I+D+i</span>
                </div>
                <div className="flex gap-1 h-3.5 items-end">
                  <div className="bg-slate-200 dark:bg-slate-800 h-full w-full rounded-sm" />
                  <div className="bg-slate-200 dark:bg-slate-800 h-full w-full rounded-sm" />
                  <div className="bg-slate-200 dark:bg-slate-800 h-full w-full rounded-sm" />
                  <div className="bg-blue-600 h-full w-full rounded-sm" />
                  <div className="bg-blue-600 h-5/6 w-full rounded-sm" />
                  <div className="bg-indigo-500 h-2/3 w-full rounded-sm" />
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
