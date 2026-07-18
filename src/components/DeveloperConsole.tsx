import { useState, useEffect } from "react";
import { 
  Terminal, 
  Mail, 
  Workflow, 
  PlusCircle, 
  Send, 
  Calendar, 
  X, 
  CheckCircle2, 
  Clock, 
  BellRing,
  ExternalLink
} from "lucide-react";
import { Booking, ContactMessage, EmailLog } from "../types";

export default function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "emails" | "messages">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notifText, setNotifText] = useState("");

  const loadData = async () => {
    try {
      const [bRes, eRes, mRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/emails"),
        fetch("/api/contact/messages"),
      ]);

      if (bRes.ok) setBookings(await bRes.json());
      if (eRes.ok) setEmails(await eRes.json());
      if (mRes.ok) setMessages(await mRes.json());
    } catch (e) {
      console.error("Fallo al refrescar consola de operaciones fullstack:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      const interval = setInterval(loadData, 4500); // Polling logs every 4.5s
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const triggerReminder = async (bookingId: string) => {
    try {
      const res = await fetch("/api/emails/send-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      if (res.ok) {
        showFeedNotif("¡Recordatorio automático despachado! Revisa la pestaña de Correos.");
        loadData();
      }
    } catch (e) {
      showFeedNotif("Error al despachar el recordatorio.");
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "POST"
      });

      if (res.ok) {
        showFeedNotif("Reserva cancelada y sincronizada en Google Calendar.");
        loadData();
      }
    } catch (e) {
      showFeedNotif("Ocurrió un error.");
    }
  };

  const showFeedNotif = (text: string) => {
    setNotifText(text);
    setTimeout(() => setNotifText(""), 4000);
  };

  return (
    <>
      {/* Floating Widget bubble trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-3.5 px-4 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 transition-all font-mono text-xs font-semibold shadow-2xl cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Panel de Sincronización Realtime</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </button>
      </div>

      {/* Slide-over Console Interface */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-slate-950 text-slate-100 border-l border-slate-800 shadow-2xl z-50 flex flex-col font-mono text-xs">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-slate-100">LUXPROC Operations & Calendar Monitor</p>
                <p className="text-[10px] text-slate-400 uppercase">CONEXIÓN FIREBASE & SINC de calendario GOOGLE ACTIVA</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Toast Feed status notification */}
          {notifText && (
            <div className="bg-blue-600 text-white p-2 text-center text-[10px] font-bold tracking-wider animate-fadeIn">
              ℹ️ {notifText}
            </div>
          )}

          {/* Subheader tabs selector */}
          <div className="flex bg-slate-900 border-b border-slate-800 text-[10px]">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-grow p-3 text-center border-b-2 font-bold transition-all cursor-pointer ${
                activeTab === "bookings" ? "border-blue-500 text-blue-400 bg-slate-950" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              RESERVAS GOOGLE ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("emails")}
              className={`flex-grow p-3 text-center border-b-2 font-bold transition-all cursor-pointer ${
                activeTab === "emails" ? "border-emerald-500 text-emerald-400 bg-slate-950" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              CORREOS / RECORDATORIOS ({emails.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-grow p-3 text-center border-b-2 font-bold transition-all cursor-pointer ${
                activeTab === "messages" ? "border-purple-500 text-purple-400 bg-slate-950" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              MENSAJES RECIBIDOS ({messages.length})
            </button>
          </div>

          {/* Content scroll area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            
            {/* 1. SEC: BOOKINGS MONITORS */}
            {activeTab === "bookings" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-slate-400 pb-2 border-b border-slate-900">
                  <span>CLIENTE / PROYECTO</span>
                  <span>ESTADO</span>
                </div>
                
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-200">{booking.projectName}</p>
                        <p className="text-[10px] text-slate-400">Cliente: {booking.name} ({booking.email})</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                        booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] bg-slate-950 p-2 rounded border border-slate-800 text-slate-400 font-mono">
                      <span>📆 {booking.date} a las {booking.time} ({booking.timezone})</span>
                      <a 
                        href={booking.meetUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className="text-blue-400 hover:underline flex items-center gap-1 text-[9px]"
                      >
                        Meet Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {booking.status === "confirmed" && (
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => triggerReminder(booking.id)}
                          className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-550 text-white font-bold text-[9px] cursor-pointer flex items-center gap-1"
                        >
                          <BellRing className="w-3 h-3" /> Despachar Recordatorio 15m
                        </button>
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-red-900 hover:border-red-500 transition-all text-slate-400 hover:text-white border border-transparent font-bold text-[9px] cursor-pointer"
                        >
                          Cancelar Reunión
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {bookings.length === 0 && (
                  <p className="text-center text-slate-500 py-10 italic">Ningún evento programado actualmente.</p>
                )}
              </div>
            )}

            {/* 2. SEC: NOTIFICATION EMAILS DELIVERED LOGS */}
            {activeTab === "emails" && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-405 leading-relaxed text-[11px] mb-2">
                  ℹ️ <strong>Remitentes automatizados:</strong> Los recordatorios por correo de la plataforma se procesan cada 30 minutos previniendo solapamientos. En este panel interactivo puedes verificar las plantillas despachadas.
                </div>

                {emails.map((e) => (
                  <div key={e.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="flex items-center gap-1.5 font-bold text-slate-200">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        A: {e.recipient}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest ${
                        e.type === "confirmation" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                      }`}>
                        {e.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold">Asunto: {e.subject}</p>
                      <p className="text-[10px] text-slate-500 italic">Despachado: {new Date(e.sentAt).toLocaleTimeString()}</p>
                    </div>

                    <pre className="text-[10px] bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {e.body}
                    </pre>
                  </div>
                ))}

                {emails.length === 0 && (
                  <p className="text-center text-slate-500 py-10 italic">Historial de correo vacío.</p>
                )}
              </div>
            )}

            {/* 3. SEC: CORPORATE CONTACT INQUIRIES */}
            {activeTab === "messages" && (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-200">{m.name}</p>
                        <p className="text-[10px] text-slate-400">{m.email} / {m.company}</p>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="p-2 bg-slate-950 border border-slate-800 text-slate-300 rounded leading-relaxed font-sans text-xs">
                      {m.message}
                    </p>
                  </div>
                ))}

                {messages.length === 0 && (
                  <p className="text-center text-slate-500 py-10 italic">No se han recibido consultas comerciales aún.</p>
                )}
              </div>
            )}

          </div>

          {/* Footer operational details */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between text-[10px] text-slate-500">
            <span>Sincronización: Activa</span>
            <span>Estándar de Zona: CL, ES, MX - Autodetectar</span>
            <span>Uptime: 100%</span>
          </div>

        </div>
      )}
    </>
  );
}
