import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  TrendingDown, 
  ArrowRight, 
  Sparkles,
  ShieldAlert,
  CalendarCheck2
} from "lucide-react";

export default function RoiCalculator() {
  // Inputs
  const [currency, setCurrency] = useState<"USD" | "PEN">("USD");
  const [downtimeHoursPerMonth, setDowntimeHoursPerMonth] = useState<number>(10);
  const [hourlyDowntimeCost, setHourlyDowntimeCost] = useState<number>(350);
  const [inventoryWasteAnnual, setInventoryWasteAnnual] = useState<number>(15000);

  const exchangeRate = 3.75;
  const currencySymbol = currency === "USD" ? "$" : "S/.";

  // Calculations
  const results = useMemo(() => {
    const rawHourlyCost = currency === "PEN" ? hourlyDowntimeCost / exchangeRate : hourlyDowntimeCost;
    const rawWasteCost = currency === "PEN" ? inventoryWasteAnnual / exchangeRate : inventoryWasteAnnual;

    // Annual loss by unplanned downtime
    const annualDowntimeLossUSD = downtimeHoursPerMonth * 12 * rawHourlyCost;
    // Total annual operational bleed
    const totalAnnualLossUSD = annualDowntimeLossUSD + rawWasteCost;

    // LUXPROC typical mitigation: 70% reduction in unplanned downtime & 75% waste reduction
    const annualSavingsUSD = (annualDowntimeLossUSD * 0.70) + (rawWasteCost * 0.75);

    // Multiplier for display
    const mult = currency === "PEN" ? exchangeRate : 1;

    return {
      annualDowntimeLoss: Math.round(annualDowntimeLossUSD * mult),
      totalAnnualLoss: Math.round(totalAnnualLossUSD * mult),
      estimatedSavings: Math.round(annualSavingsUSD * mult),
      monthlyBleed: Math.round((totalAnnualLossUSD / 12) * mult),
      estimatedPaybackMonths: "1.8 - 2.5"
    };
  }, [currency, downtimeHoursPerMonth, hourlyDowntimeCost, inventoryWasteAnnual]);

  const handleConsultClick = () => {
    const target = document.getElementById("calendario");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculadora-roi" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Estimador Financiero de Ineficiencias Industriales
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            ¿Cuánto Dinero Pierde tu Planta por <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-amber-600 dark:from-rose-400 dark:to-amber-400">Paradas y Descontrol?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Las paradas imprevistas de maquinaria y la falta de control de materia prima son los costos ocultos más dañinos en manufactura. Calcula el impacto real en tus finanzas:
          </p>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-xs text-slate-500 font-medium">Moneda de cálculo:</span>
            <div className="p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "USD" 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("PEN")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "PEN" 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                PEN (S/.)
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Body: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Parámetros Operativos de tu Empresa
            </h3>

            {/* Slider 1: Horas de parada no programada */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Horas de parada no programada al mes:
                </label>
                <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg">
                  {downtimeHoursPerMonth} hrs / mes
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={60}
                step={1}
                value={downtimeHoursPerMonth}
                onChange={(e) => setDowntimeHoursPerMonth(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 hora (Mínimo)</span>
                <span>30 horas</span>
                <span>60 horas (Crítico)</span>
              </div>
            </div>

            {/* Slider 2: Costo por hora de línea detenida */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Costo estimado por hora de línea detenida (operarios parados + lucro cesante):
                </label>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg">
                  {currencySymbol}{hourlyDowntimeCost.toLocaleString()} / hr
                </span>
              </div>
              <input
                type="range"
                min={currency === "USD" ? 50 : 200}
                max={currency === "USD" ? 2000 : 7500}
                step={currency === "USD" ? 50 : 100}
                value={hourlyDowntimeCost}
                onChange={(e) => setHourlyDowntimeCost(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{currencySymbol}{currency === "USD" ? "50" : "200"}</span>
                <span>{currencySymbol}{currency === "USD" ? "1,000" : "3,500"}</span>
                <span>{currencySymbol}{currency === "USD" ? "2,000+" : "7,500+"}</span>
              </div>
            </div>

            {/* Slider 3: Mermas o pérdidas en almacén */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Pérdidas anuales por mermas, descuadres de stock o errores de destajo:
                </label>
                <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg">
                  {currencySymbol}{inventoryWasteAnnual.toLocaleString()} / año
                </span>
              </div>
              <input
                type="range"
                min={currency === "USD" ? 0 : 0}
                max={currency === "USD" ? 80000 : 300000}
                step={currency === "USD" ? 2500 : 10000}
                value={inventoryWasteAnnual}
                onChange={(e) => setInventoryWasteAnnual(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{currencySymbol}0</span>
                <span>{currencySymbol}{currency === "USD" ? "40,000" : "150,000"}</span>
                <span>{currencySymbol}{currency === "USD" ? "80,000+" : "300,000+"}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>
                Datos basados en la métrica estándar de manufactura según ISO 22400 e historiales reales de plantas en Perú con OEE inferior al 75%.
              </span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Diagnóstico Financiero
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  COSTOS OCULTOS
                </span>
              </div>

              {/* Loss Metric */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Fuga de capital anual estimada:</span>
                <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono tracking-tight">
                  {currencySymbol}{results.totalAnnualLoss.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1.5">/ año</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                  Aprox. <strong className="text-white">{currencySymbol}{results.monthlyBleed.toLocaleString()}</strong> mensuales perdidos.
                </span>
              </div>

              {/* Potential Savings */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Ahorro Proyectado con LUXPROC:
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
                  {currencySymbol}{results.estimatedSavings.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-400/80 ml-1">/ año</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Mitigando el 70% de paradas imprevistas y optimizando el consumo de insumos.
                </p>
              </div>

              {/* Payback period */}
              <div className="flex justify-between items-center text-xs py-2 border-y border-slate-800 text-slate-300">
                <span>Retorno de Inversión (Payback):</span>
                <span className="font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                  {results.estimatedPaybackMonths} meses
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 pt-6">
              <button
                onClick={handleConsultClick}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Agendar Auditoría para Mitigar Estas Pérdidas</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Evaluación presencial o remota por Ingeniero Mecánico-Eléctrico Colegiado.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
