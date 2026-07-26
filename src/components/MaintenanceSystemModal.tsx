import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  LayoutDashboard,
  Cog,
  Calendar,
  Wrench,
  Activity,
  Package,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Gauge,
  Clock,
  DollarSign,
  Printer,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Plus,
  Minus,
  Building2,
  Download,
  UserCheck,
  Check,
  Zap,
  Info,
  Thermometer,
  Waves,
  Droplet
} from "lucide-react";

interface MaintenanceSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaintenanceSystemModal({ isOpen, onClose }: MaintenanceSystemModalProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "catalogo" | "planes" | "ordenes" | "predictiva" | "almacen" | "auditoria"
  >("dashboard");

  const [roleSimulator, setRoleSimulator] = useState("Administrador");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState("COMP-01");
  const [selectedOtId, setSelectedOtId] = useState("OT-2026-045");
  const [selectedRepuestoId, setSelectedRepuestoId] = useState("REP-FI-1014");

  // State for inventory adjustment
  const [repuestoStock, setRepuestoStock] = useState(5);
  const [adjustAmount, setAdjustAmount] = useState(1);

  // State for checklist items in OT
  const [checklist, setChecklist] = useState({
    lubricante: true,
    corriente: true,
    filtro: false,
    fugas: false
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-7xl h-[94vh] bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-left"
        >
          {/* TOP HEADER BAR */}
          <div className="h-14 px-4 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between shrink-0">
            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-blue-500/30">
                L
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                  LUXPROC CLOUD <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">MAINTENANCE SYSTEM</span>
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 text-xs">
              {/* Simulator Role */}
              <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <span className="text-slate-400 font-mono text-[11px]">Rol Simulador:</span>
                <select
                  value={roleSimulator}
                  onChange={(e) => setRoleSimulator(e.target.value)}
                  className="bg-transparent font-bold text-white outline-none cursor-pointer text-xs"
                >
                  <option value="Administrador" className="bg-slate-900 text-white">Administrador</option>
                  <option value="Supervisor" className="bg-slate-900 text-white">Supervisor de Planta</option>
                  <option value="Técnico" className="bg-slate-900 text-white">Técnico Especialista</option>
                </select>
              </div>

              {/* User badge */}
              <div className="hidden lg:flex items-center gap-2 text-slate-300 text-[11px] font-mono">
                <span>Conectado como:</span>
                <span className="font-bold text-white">Ing. Carlos Mendoza (Admin)</span>
              </div>

              {/* Status Online */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CENTRAL ONLINE</span>
              </div>

              {/* Notification icon */}
              <div className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer relative text-slate-300">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MAIN BODY LAYOUT (Sidebar + Content) */}
          <div className="flex-1 flex overflow-hidden">
            {/* SIDEBAR NAVIGATION */}
            <div className="w-56 bg-[#0f172a]/90 border-r border-slate-800 p-3 flex flex-col justify-between shrink-0 font-sans">
              <div className="space-y-1">
                {[
                  { id: "dashboard", label: "Dashboard Principal", icon: LayoutDashboard },
                  { id: "catalogo", label: "Catálogo de Maquinaria", icon: Cog },
                  { id: "planes", label: "Planes Preventivos", icon: Calendar },
                  { id: "ordenes", label: "Órdenes de Trabajo", icon: Wrench },
                  { id: "predictiva", label: "Inspección Predictiva", icon: Activity },
                  { id: "almacen", label: "Almacén & Repuestos", icon: Package },
                  { id: "auditoria", label: "Control de Cambios", icon: ShieldCheck }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer info */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 font-mono space-y-1">
                <div className="text-slate-300 font-bold">LUXPROC INDUSTRY v4.2</div>
                <div>ISO 9001 / ISO 55001 Compliant</div>
                <div className="text-emerald-400 font-semibold">Telemetría Sensor IoT: Ok</div>
              </div>
            </div>

            {/* CONTENT VIEWPORT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0b1120]">
              {/* TAB 1: DASHBOARD PRINCIPAL */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Dashboard Industrial</h2>
                    <p className="text-xs text-slate-400 mt-1">Monitoreo en tiempo real de indicadores de mantenimiento y confiabilidad de planta.</p>
                  </div>

                  {/* Top 5 Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>TOTAL MAQUINARIA</span>
                        <Cog className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-white mt-1">5</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Fichas registradas</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>ACTIVAS / OPERANDO</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-emerald-400 mt-1">3</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Disponibilidad de línea</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>DETENIDAS / ALERTAS</span>
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-rose-400 mt-1">1</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">0 críticas detectadas</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>COSTO ACUMULADO</span>
                        <DollarSign className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-xl font-extrabold text-amber-400 mt-1">S/ 5,630</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Mano Obra + Repuestos</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 lg:col-span-1">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>ÓRDENES ACTIVAS</span>
                        <Wrench className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-purple-400 mt-1">1</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">1 pendientes</div>
                    </div>
                  </div>

                  {/* 4 KPI Banner Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-slate-300">OEE EFECTIVIDAD GLOBAL</span>
                        <Gauge className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-blue-400">91%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-blue-500 h-full w-[91%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-2">Disponibilidad (95%) x Rendimiento (98%)</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-slate-300">MTBF (MEDIA ENTRE FALLAS)</span>
                        <Clock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-emerald-400">1140 <span className="text-lg text-slate-400">h</span></div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[76%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-2">Meta: &gt;1,500 h (Estado: Excelente)</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-slate-300">MTTR (MEDIA DE REPARACIÓN)</span>
                        <Activity className="w-4 h-4 text-rose-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-rose-400">27 <span className="text-lg text-slate-400">h</span></div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-rose-500 h-full w-[60%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-2">Meta: &lt;4.0 h (Estado: Controlado)</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-slate-300">DISPONIBILIDAD OPERACIONAL</span>
                        <TrendingUp className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-indigo-400">97.7%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[97%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-2">Confiabilidad estimada de Planta: 95.4%</div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Bar chart Costo total por área */}
                    <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                          <BarChart3Icon className="w-4 h-4 text-emerald-400" /> Costo Total de Mantenimiento por Área (S/)
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">AÑO VIGENTE 2026</span>
                      </div>
                      <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full bg-blue-600 rounded-t-md h-[15%]" title="S/ 220" />
                          <span className="truncate w-full text-center">Servicios Aux.</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full bg-emerald-500 rounded-t-md h-[90%]" title="S/ 2840" />
                          <span className="truncate w-full text-center">Molienda y Flot.</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full bg-indigo-600 rounded-t-md h-[25%]" title="S/ 430" />
                          <span className="truncate w-full text-center">Proc. Térmicos</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full bg-emerald-400 rounded-t-md h-[28%]" title="S/ 510" />
                          <span className="truncate w-full text-center">Taller Mecánico</span>
                        </div>
                      </div>
                    </div>

                    {/* Donut chart Distribution */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-teal-400" /> Distribución de Estados
                      </h3>
                      <div className="flex items-center justify-center my-2">
                        <div className="relative w-36 h-36 rounded-full border-8 border-emerald-500 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-8 border-rose-500 border-t-transparent border-r-transparent rotate-45" />
                          <div className="text-center font-mono">
                            <span className="text-2xl font-extrabold text-white">5</span>
                            <span className="block text-[9px] text-slate-400">EQUIPOS</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Activas: 3</span>
                          <span className="font-bold text-emerald-400">60%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Detenidas: 1</span>
                          <span className="font-bold text-rose-400">20%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Mantenimiento: 1</span>
                          <span className="font-bold text-amber-400">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tendencia OEE vs Averias */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-sm text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" /> Tendencia de OEE vs Frecuencia de Averías
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">Últimos 6 meses</span>
                    </div>
                    <div className="h-36 flex items-center justify-between px-4 border-b border-slate-800 text-[11px] font-mono text-slate-400 relative">
                      {/* SVG Line path representation */}
                      <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 50">
                        <path d="M 5,10 Q 25,8 50,12 T 95,5" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <path d="M 5,25 Q 25,35 50,20 T 95,45" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      </svg>
                      {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"].map((m, i) => (
                        <span key={i} className="z-10 bg-slate-900/90 px-1 rounded text-slate-300">{m}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-3 text-xs font-mono">
                      <span className="flex items-center gap-2 text-blue-400"><span className="w-3 h-1 bg-blue-500 rounded" /> OEE (%)</span>
                      <span className="flex items-center gap-2 text-rose-400"><span className="w-3 h-1 bg-rose-500 rounded" /> Nº Averías</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CATÁLOGO DE MAQUINARIA */}
              {activeTab === "catalogo" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">Registro de Maquinaria</h2>
                      <p className="text-xs text-slate-400 mt-1">Administración de fichas técnicas, parámetros críticos y códigos QR de planta.</p>
                    </div>
                    <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer">
                      <Plus className="w-4 h-4" /> Registrar Equipo
                    </button>
                  </div>

                  {/* Search and Machine detail split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Machine List sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="Buscar por nombre, código..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 text-white text-xs pl-9 pr-3 py-2 rounded-xl outline-none border border-slate-700 focus:border-blue-500"
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 space-y-1">
                          <div>ÁREA INDUSTRIAL: <span className="text-white font-bold">Todas</span></div>
                          <div>ESTADO OPERACIÓN: <span className="text-white font-bold">Todos</span></div>
                        </div>
                      </div>

                      {/* Equipment cards */}
                      <div className="space-y-2">
                        {[
                          { id: "COMP-01", name: "Compresor Kaeser ASD 40", code: "PAT-2024-0042", area: "Servicios Auxiliares", status: "Activo", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
                          { id: "BOMB-32", name: "Bomba Sulzer APP-32", code: "APP32-100", area: "Molienda y Flotación", status: "En Mantenimiento", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
                          { id: "CALD-02", name: "Caldera Cleaver-Brooks 300HP", code: "CB-700-300", area: "Procesos Térmicos", status: "Activo", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
                          { id: "CNC-05", name: "Torno CNC Haas ST-30", code: "HAAS-ST30", area: "Taller Mecánico", status: "Activo", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" }
                        ].map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMachineId(m.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              selectedMachineId === m.id
                                ? "bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/10"
                                : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-mono text-[10px] text-blue-400 font-bold">{m.id}</span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${m.color}`}>
                                {m.status}
                              </span>
                            </div>
                            <h4 className="font-bold text-xs text-white">{m.name}</h4>
                            <div className="text-[10px] text-slate-400 mt-1">{m.area}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Machine Detail view */}
                    <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-6">
                      {/* Top banner image & info */}
                      <div className="relative rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-slate-800 p-6 overflow-hidden">
                        <div className="relative z-10 space-y-3">
                          <span className="text-xs font-mono font-bold text-blue-400 px-2.5 py-1 rounded bg-blue-500/20 border border-blue-500/30">
                            {selectedMachineId}
                          </span>
                          <h3 className="text-2xl font-extrabold text-white">
                            {selectedMachineId === "COMP-01" ? "Compresor de Tornillo Rotativo Kaeser ASD 40" : "Bomba Centrífuga de Pulpa Sulzer APP-32"}
                          </h3>
                          <p className="text-xs text-slate-300">Servicios Auxiliares • Línea de Aire Comprimido Principal • Bloque B</p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer">
                              Cambiar Fotografía
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
                              Código QR Única
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Plant Info Grid */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-blue-400 mb-3 flex items-center gap-1.5">
                          <Info className="w-4 h-4" /> INFORMACIÓN DE PLANTA & ACTIVO
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 font-mono">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Código Patrimonial</span>
                            <span className="font-bold text-white">PAT-2024-0042</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Fabricante / Proveedor</span>
                            <span className="font-bold text-white">Kaeser GmbH / Equipos SAC</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Serie del Motor</span>
                            <span className="font-bold text-white">ASD40-10492-2024</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Responsable Técnico</span>
                            <span className="font-bold text-white">Ing. Carlos Mendoza</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Operador de Línea</span>
                            <span className="font-bold text-white">Julio Espinoza</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Ubicación Precisa</span>
                            <span className="font-bold text-white">Sala de Compresores - Bloque B</span>
                          </div>
                        </div>
                      </div>

                      {/* Specs */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" /> ESPECIFICACIONES ELÉCTRICAS & MECÁNICAS
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-mono block">POTENCIA</span>
                            <span className="text-base font-extrabold text-white">30 kW</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-mono block">VOLTAJE</span>
                            <span className="text-base font-extrabold text-white">440 V</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-mono block">CORRIENTE</span>
                            <span className="text-base font-extrabold text-white">52 A</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-mono block">VELOCIDAD</span>
                            <span className="text-base font-extrabold text-white">3600 RPM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PLANES PREVENTIVOS */}
              {activeTab === "planes" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">Plan de Mantenimiento Anual</h2>
                      <p className="text-xs text-slate-400 mt-1">Administración y calendarización de tareas preventivas y ciclos por condición.</p>
                    </div>
                    <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer">
                      <Plus className="w-4 h-4" /> Programar Plan Anual
                    </button>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400 mr-2">FILTRAR POR CICLO:</span>
                    {["Todas", "Semanal", "Mensual", "Semestral", "Anual", "Por Horas", "Por Condición"].map((c, idx) => (
                      <button
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          idx === 0 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Plan Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          SEMANAL
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Planificado
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white">Inspección Semanal de Niveles y Fugas - COMP-01</h3>
                      <p className="text-xs text-slate-400">Compresor de Tornillo Rotativo Kaeser ASD 40</p>
                      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                        <div className="text-[10px] text-slate-500 font-bold">PASOS PREVENTIVOS CHECKLIST:</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Verificar nivel de Sigma Fluid en visor de cárter principal.</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Controlar presión diferencial de filtro de aire en pantalla Sigma Control.</div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs font-mono">
                        <span className="text-slate-400">Resp: Julio Espinoza</span>
                        <button
                          onClick={() => setActiveTab("ordenes")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1"
                        >
                          Generar OT
                        </button>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          SEMESTRAL
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Planificado
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white">Overhaul Semestral / Cambio de Filtros y Lubricante</h3>
                      <p className="text-xs text-slate-400">Compresor de Tornillo Rotativo Kaeser ASD 40</p>
                      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                        <div className="text-[10px] text-slate-500 font-bold">PASOS PREVENTIVOS CHECKLIST:</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Drenar aceite Sigma Fluid viejo a temperatura de servicio y rellenar.</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Cambiar cartucho de filtro de aire original Kaeser.</div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs font-mono">
                        <span className="text-slate-400">Resp: Tec. Víctor Hugo</span>
                        <button
                          onClick={() => setActiveTab("ordenes")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1"
                        >
                          Generar OT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ÓRDENES DE TRABAJO */}
              {activeTab === "ordenes" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Órdenes de Trabajo (OT)</h2>
                    <p className="text-xs text-slate-400 mt-1">Ejecución de mantenimiento preventivo, correctivo y predictivo en planta.</p>
                  </div>

                  {/* OT layout split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* OT list */}
                    <div className="lg:col-span-5 space-y-3">
                      {[
                        { id: "OT-2026-045", title: "Compresor Kaeser ASD 40", type: "Preventivo", prio: "Alta", state: "Aprobada por Supervisor", color: "border-emerald-500/50 bg-slate-900/90" },
                        { id: "OT-2026-046", title: "Bomba Sulzer APP-32", type: "Correctivo", prio: "Alta", state: "En Proceso", color: "border-amber-500/50 bg-slate-900/90" },
                        { id: "OT-2026-047", title: "Faja Transportadora", type: "Correctivo", prio: "Alta", state: "Pendiente", color: "border-slate-800 bg-slate-900/50" }
                      ].map((ot) => (
                        <div
                          key={ot.id}
                          onClick={() => setSelectedOtId(ot.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            selectedOtId === ot.id ? "bg-slate-800 border-blue-500 shadow-xl" : ot.color
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 text-xs font-mono">
                            <span className="font-bold text-blue-400">{ot.id}</span>
                            <span className="text-rose-400 font-bold">Pri: {ot.prio}</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{ot.title}</h4>
                          <div className="flex justify-between items-center mt-3 text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">{ot.type}</span>
                            <span className="text-emerald-400 font-bold">{ot.state}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* OT Sheet Detail */}
                    <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-blue-400">PREVENTIVO</span>
                          <h3 className="text-xl font-extrabold text-white mt-1">Orden de Trabajo: {selectedOtId}</h3>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Creada el: 2026-07-14</div>
                        </div>
                        <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer">
                          <Printer className="w-4 h-4 text-blue-400" /> Vista de Impresión (PDF)
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <div>
                          <span className="text-slate-500 text-[10px] block">MAQUINARIA</span>
                          <span className="font-bold text-white">Compresor Kaeser ASD 40</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">TÉCNICO ASIGNADO</span>
                          <span className="font-bold text-white">Tec. Víctor Hugo</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">ÁREA INDUSTRIAL</span>
                          <span className="font-bold text-white">Servicios Auxiliares</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">SUPERVISOR</span>
                          <span className="font-bold text-white">Ing. Carlos Mendoza</span>
                        </div>
                      </div>

                      {/* Checklist */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> MÓDULO PREVENTIVO: CHECKLIST DE INSPECCIÓN
                        </h4>
                        <div className="space-y-2 text-xs font-mono">
                          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={checklist.lubricante}
                                onChange={(e) => setChecklist({ ...checklist, lubricante: e.target.checked })}
                                className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={checklist.lubricante ? "line-through text-slate-400" : "text-white"}>
                                Revisión de nivel de lubricante en cárter
                              </span>
                            </div>
                            <span className="text-emerald-400 font-bold text-[10px]">Verificado</span>
                          </label>

                          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={checklist.corriente}
                                onChange={(e) => setChecklist({ ...checklist, corriente: e.target.checked })}
                                className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={checklist.corriente ? "line-through text-slate-400" : "text-white"}>
                                Control de corriente consumida por fase
                              </span>
                            </div>
                            <span className="text-emerald-400 font-bold text-[10px]">Verificado</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: INSPECCIÓN PREDICTIVA */}
              {activeTab === "predictiva" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">Mantenimiento Predictivo</h2>
                      <p className="text-xs text-slate-400 mt-1">Monitoreo por condición mediante termografía, análisis vibracional y lubricantes.</p>
                    </div>
                    <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30">
                      <Plus className="w-4 h-4" /> Registrar Lecturas Predictivas
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-xs font-mono font-bold text-slate-400">LECTURAS DE CAMPO - COMPRESOR KAESER ASD 40</span>
                      <h3 className="text-xl font-extrabold text-white mt-1">Tomado por: Tec. Víctor Hugo (2026-07-12)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Thermography */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono">
                          <Thermometer className="w-4 h-4" /> MÓDULO TERMOGRAFÍA
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Temperatura Máxima</span>
                          <span className="text-2xl font-extrabold text-white">68.4 °C</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Diferencia Térmica (ΔT): <span className="text-white font-bold">46.3 °C</span></div>
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                          ✓ Perfil térmico normal
                        </div>
                      </div>

                      {/* Vibration */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs font-mono">
                          <Waves className="w-4 h-4" /> ANÁLISIS VIBRACIONAL
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Velocidad de Vibración</span>
                          <span className="text-2xl font-extrabold text-white">1.8 mm/s</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Aceleración: <span className="text-white font-bold">0.12 g</span></div>
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                          ✓ Niveles estables
                        </div>
                      </div>

                      {/* Tribology */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                          <Droplet className="w-4 h-4" /> TRIBOLOGÍA (ACEITE)
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Viscosidad Cinemática</span>
                          <span className="text-2xl font-extrabold text-white">46.2 cSt</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Presencia de Agua: <span className="text-white font-bold">5 ppm</span></div>
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                          ✓ Lubricante: Bueno
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: ALMACÉN & REPUESTOS */}
              {activeTab === "almacen" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">Inventario de Repuestos Críticos</h2>
                      <p className="text-xs text-slate-400 mt-1">Control de stock, ubicaciones precisas y alertas de reabastecimiento en almacén.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                        <Download className="w-4 h-4" /> Exportar CSV
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                        <Plus className="w-4 h-4" /> Agregar Insumo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Item list */}
                    <div className="lg:col-span-5 space-y-3">
                      {[
                        { id: "REP-FI-1014", name: "Filtro de Aire Kaeser 1014-A", stock: repuestoStock, price: "S/ 145 c/u", loc: "Estante A-4" },
                        { id: "REP-SE-APP32", name: "Sello Mecánico Sulzer Shaft-Seal 1", stock: 1, price: "S/ 850 c/u", loc: "Gabinete Especial B" },
                        { id: "LUB-SHC-220", name: "Grasa Mobilith SHC 220 (Caja 10 Cartuch)", stock: 8, price: "S/ 128 c/u", loc: "Zona C - Líquidos" }
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedRepuestoId(item.id);
                            if (item.id === "REP-FI-1014") setRepuestoStock(repuestoStock);
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            selectedRepuestoId === item.id ? "bg-slate-800 border-blue-500 shadow-lg" : "bg-slate-900/80 border-slate-800"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 text-xs font-mono">
                            <span className="text-blue-400 font-bold">{item.id}</span>
                            <span className="text-emerald-400 font-bold">{item.stock} Unidad</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{item.name}</h4>
                          <div className="text-[10px] text-slate-400 font-mono mt-2">Ubicación: {item.loc} • {item.price}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Inventory Adjustment & Supplier info */}
                    <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
                      <div className="border-b border-slate-800 pb-4">
                        <span className="text-xs font-mono font-bold text-blue-400">REPUESTO SELECCIONADO</span>
                        <h3 className="text-xl font-extrabold text-white mt-1">Filtro de Aire Kaeser 1014-A</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Ubicación exacta en almacén: Estante A-4</p>
                      </div>

                      {/* Stock metrics */}
                      <div className="grid grid-cols-3 gap-3 text-center font-mono">
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">CÓDIGO SKU</span>
                          <span className="text-xs font-bold text-white">REP-FI-1014</span>
                        </div>
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">STOCK ACTUAL</span>
                          <span className="text-lg font-extrabold text-emerald-400">{repuestoStock} Unidad</span>
                        </div>
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">VALORIZADO TOTAL</span>
                          <span className="text-xs font-bold text-amber-400">S/ {repuestoStock * 145}.00</span>
                        </div>
                      </div>

                      {/* Quick Adjustment controls */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono">
                        <div className="text-xs font-bold text-slate-300">AJUSTE RÁPIDO DE INVENTARIO</div>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20 bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg text-xs outline-none"
                          />
                          <button
                            onClick={() => setRepuestoStock((prev) => prev + adjustAmount)}
                            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" /> Ingresar Stock
                          </button>
                          <button
                            onClick={() => setRepuestoStock((prev) => Math.max(0, prev - adjustAmount))}
                            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Minus className="w-4 h-4" /> Despachar / Retirar
                          </button>
                        </div>
                      </div>

                      {/* Official supplier */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                        <div className="text-amber-400 font-bold">CONTACTO OFICIAL PROVEEDOR HOMOLOGADO</div>
                        <div className="flex justify-between text-slate-300">
                          <span className="font-bold text-white">Kaeser Perú SAC</span>
                          <span className="text-slate-400">ventas@kaeserperusac.com</span>
                        </div>
                      </div>

                      <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20">
                        Generar Solicitud de Cotización / Orden de Compra <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: CONTROL DE CAMBIOS */}
              {activeTab === "auditoria" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">Control de Cambios e Historial de Auditoría</h2>
                      <p className="text-xs text-slate-400 mt-1">Libro de registro indeleble compatible con normativas de calidad ISO 9001 e ISO 55001.</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer">
                      <Download className="w-4 h-4" /> Exportar Libro de Auditoría (CSV)
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Toda modificación en fichas técnicas, planes preventivos, consumos de repuestos y autorizaciones se registra automáticamente en este ledger firmado electrónicamente.</span>
                  </div>

                  {/* Audit Ledger Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 font-mono text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[10px]">
                          <th className="p-3">FECHA / HORA</th>
                          <th className="p-3">AUDITOR / OPERADOR</th>
                          <th className="p-3">MÓDULO</th>
                          <th className="p-3">ACTIVO CONTEXTO</th>
                          <th className="p-3">CAMPO MODIFICADO</th>
                          <th className="p-3">VALOR ANTERIOR</th>
                          <th className="p-3">VALOR NUEVO</th>
                          <th className="p-3">JUSTIFICACIÓN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-[11px] text-slate-300">
                        <tr>
                          <td className="p-3 text-slate-400">2026-07-15 14:35</td>
                          <td className="p-3 font-bold text-white">Ing. Carlos Mendoza</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Maquinaria</span></td>
                          <td className="p-3 text-blue-400 font-bold">COMP-01 Kaeser ASD 40</td>
                          <td className="p-3">Estado</td>
                          <td className="p-3 text-rose-400">En Mantenimiento</td>
                          <td className="p-3 text-emerald-400">Activo</td>
                          <td className="p-3 text-slate-400">Se completó OT-2026-045</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-400">2026-07-19 10:15</td>
                          <td className="p-3 font-bold text-white">Ing. Jorge Valdivia</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Maquinaria</span></td>
                          <td className="p-3 text-blue-400 font-bold">BOMB-32 Sulzer APP-32</td>
                          <td className="p-3">Estado</td>
                          <td className="p-3 text-emerald-400">Activo</td>
                          <td className="p-3 text-rose-400">En Mantenimiento</td>
                          <td className="p-3 text-slate-400">Detención de urgencia por ruido interno</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-400">2026-07-20 08:30</td>
                          <td className="p-3 font-bold text-white">Ing. Jorge Valdivia</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Ordenes</span></td>
                          <td className="p-3 text-blue-400 font-bold">OT-2026-046</td>
                          <td className="p-3">Asignación Técnico</td>
                          <td className="p-3 text-slate-500">Sin Asignar</td>
                          <td className="p-3 text-emerald-400">Tec. Víctor Hugo</td>
                          <td className="p-3 text-slate-400">Técnico especialista en bombas centrífugas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function BarChart3Icon(props: any) {
  return <BarChart3 {...props} />;
}
