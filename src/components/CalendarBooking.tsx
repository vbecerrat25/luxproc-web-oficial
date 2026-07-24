import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  Video, 
  Check, 
  MapPin, 
  AlertTriangle, 
  Send,
  User,
  Mail,
  Workflow,
  Plus,
  RefreshCw,
  BellRing,
  ExternalLink,
  Lock,
  Download
} from "lucide-react";
import { Booking } from "../types";
import { initAuth, googleSignIn, logout } from "../googleAuth";

const TIMEZONES = [
  { id: "America/Bogota", name: "Bogotá / Lima (UTC-5)", offset: -5 },
  { id: "America/Santiago", name: "Santiago de Chile (UTC-4/3)", offset: -4 },
  { id: "Europe/Madrid", name: "Madrid / España (UTC+2/1)", offset: 120 }, // approximate representation in local standard formats
  { id: "America/Mexico_City", name: "Ciudad de México (UTC-6)", offset: -6 },
  { id: "America/Argentina/Buenos_Aires", name: "Buenos Aires (UTC-3)", offset: -3 },
  { id: "UTC", name: "Tiempo Universal Coordinado (UTC)", offset: 0 },
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

// Helper to send real emails via Gmail API authenticated with OAuth Token
const sendGmailConfirmation = async (
  recipientEmail: string,
  clientName: string,
  projectName: string,
  date: string,
  time: string,
  timezone: string,
  meetUrl: string,
  notes: string,
  phone: string,
  accessToken: string
) => {
  try {
    const formattedDate = new Date(date + "T00:00:00").toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailSubject = `Confirmación de Reunión: ${projectName}`;
    
    const emailBodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">LUXPROC</h1>
          <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; font-weight: 600;">Plataforma Web de Ingeniería y Software</p>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #f1f5f9;">
          <h2 style="font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 12px; color: #0f172a;">¡Reunión Agendada con Éxito!</h2>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #334155;">
            Estimado/a <strong>${clientName}</strong>, tu consultoría técnica ha sido sincronizada con éxito en el calendario corporativo.
          </p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; font-weight: 700;">Detalles de la Reunión</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; width: 30%;">Título de la Reunión:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${projectName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Solicitante:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Número de Celular:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${phone || "No provisto"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Fecha:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a; text-transform: capitalize;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Hora:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #2563eb;">${time} (${timezone})</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Motivo de la Reunión:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${notes || "Sin motivo detallado."}</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
          <a href="${meetUrl}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: 700; border-radius: 8px;">
            Entrar a la Videollamada de Google Meet
          </a>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 10px;">Enlace directo: <a href="${meetUrl}" style="color: #2563eb;">${meetUrl}</a></p>
        </div>

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 20px;" />
        
        <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;">Este correo fue generado automáticamente desde la <strong>Plataforma Web de LUXPROC</strong>.</p>
          <p style="margin: 0;">Sincronizado de forma segura bajo cuenta corporativa autorizada: <strong>luxproc.11@gmail.com</strong>.</p>
        </div>
      </div>
    `;

    // Safe UTF-8 Base64 helper
    const utf8_to_b64 = (str: string) => {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
    };

    const mimeParts = [
      `From: me`,
      `To: ${recipientEmail}`,
      `Cc: luxproc.11@gmail.com`,
      `Subject: =?utf-8?B?${utf8_to_b64(emailSubject)}?=`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      utf8_to_b64(emailBodyHtml)
    ];

    const rawMessage = mimeParts.join("\r\n");
    const encodedMessage = btoa(rawMessage)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const gmailResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        raw: encodedMessage
      })
    });

    if (!gmailResponse.ok) {
      const errText = await gmailResponse.text();
      console.error("Gmail Send Error Response:", errText);
    } else {
      console.log("Email sent successfully via Gmail API!");
    }
  } catch (err) {
    console.error("Failed to send email via Gmail API:", err);
  }
};

export default function CalendarBooking() {
  const [selectedTimezone, setSelectedTimezone] = useState("America/Bogota");
  const [dynamicTimezones, setDynamicTimezones] = useState(TIMEZONES);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [activeShift, setActiveShift] = useState<"morning" | "afternoon">("morning");
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Auth states
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProjectName, setUserProjectName] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [userPhone, setUserPhone] = useState("");
  
  // Results screen state
  const [bookingSuccessData, setBookingSuccessData] = useState<{
    booking: Booking;
    emailBody: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  // Get next 7 business dates (excluding Sundays) helper
  const getNextBusinessDays = () => {
    const list = [];
    let current = new Date();
    // Offset standard localized dates
    for (let i = 0; i < 12; i++) {
      if (list.length >= 7) break;
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0) { // Skip Sundays
        const yr = current.getFullYear();
        const mo = String(current.getMonth() + 1).padStart(2, "0");
        const dy = String(current.getDate()).padStart(2, "0");
        list.push({
          dateStr: `${yr}-${mo}-${dy}`,
          dayName: current.toLocaleDateString("es-ES", { weekday: "short" }),
          dayNum: current.getDate(),
          monthName: current.toLocaleDateString("es-ES", { month: "short" }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return list;
  };

  const businessDays = getNextBusinessDays();

  // Fetch current booked slots from API
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setExistingBookings(data);
      }
    } catch (e) {
      console.error("No se pudo conectar con el motor Express:", e);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Auto-detect and set system timezone
    try {
      const systemTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (systemTz) {
        // Map America/Lima to America/Bogota as they are identical UTC-5, or allow America/Lima itself
        const matchedTz = systemTz === "America/Lima" ? "America/Bogota" : systemTz;
        setSelectedTimezone(matchedTz);

        // Check if the timezone exists in our static list
        const exists = TIMEZONES.some((tz) => tz.id === matchedTz);
        if (!exists) {
          let offsetStr = "";
          try {
            const date = new Date();
            const offsetMinutes = -date.getTimezoneOffset();
            const offsetHours = Math.floor(offsetMinutes / 60);
            const sign = offsetHours >= 0 ? "+" : "";
            offsetStr = ` (UTC${sign}${offsetHours})`;
          } catch (err) {}

          const friendlyName = matchedTz.includes("/")
            ? matchedTz.split("/")[1].replace(/_/g, " ")
            : matchedTz;

          const newTz = {
            id: matchedTz,
            name: `${friendlyName}${offsetStr}`,
            offset: 0
          };
          setDynamicTimezones([newTz, ...TIMEZONES]);
        }
      }
    } catch (e) {
      console.warn("Could not auto-detect system timezone:", e);
    }

    // Pre-select first date
    if (businessDays.length > 0) {
      const firstDate = businessDays[0].dateStr;
      setSelectedDate(firstDate);
      
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, "0");
      const dy = String(now.getDate()).padStart(2, "0");
      const todayStr = `${yr}-${mo}-${dy}`;
      if (firstDate === todayStr && (now.getHours() * 60 + now.getMinutes()) >= (12 * 60 + 30)) {
        setActiveShift("afternoon");
      }
    }

    // Initialize auth state listener
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        if (currentUser.displayName) {
          setUserName(prev => prev.trim() ? prev : currentUser.displayName || "");
        }
        if (currentUser.email) setUserEmail(currentUser.email);
      },
      () => {
        // Clear cached auth but keep inputs if they were filled manually
        setUser(null);
        setToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        if (res.user.displayName) {
          setUserName(prev => prev.trim() ? prev : res.user.displayName || "");
        }
        if (res.user.email) setUserEmail(res.user.email);
      }
    } catch (err: any) {
      const errMsg = err.message || "";
      const errCode = err.code || "";
      
      if (
        errCode === "auth/popup-closed-by-user" || 
        errMsg.includes("popup-closed-by-user") ||
        errMsg.includes("closed-by-user") ||
        errMsg.includes("cerró")
      ) {
        console.warn("Google Sign-in closed by user/browser.");
        setErrorMessage(
          "La ventana de Google se cerró antes de completar el inicio de sesión."
        );
      } else if (
        errCode === "auth/popup-blocked" ||
        errMsg.includes("popup-blocked")
      ) {
        console.warn("Google Sign-in popup blocked by browser.");
        setErrorMessage(
          "El navegador bloqueó la ventana emergente de inicio de sesión de Google."
        );
      } else {
        console.error("Error during Google Sign-in:", err);
        setErrorMessage(
          err.message || "Fallo al iniciar sesión con Google. Por favor, inténtelo nuevamente."
        );
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userProjectName || !userPhone || !selectedDate || !selectedSlot) {
      setErrorMessage("Por favor complete todos los datos del formulario.");
      return;
    }

    if (!token) {
      setErrorMessage("Requiere iniciar sesión con Google para agendar en Google Calendar.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Calculate end time
    const [hourStr, minStr] = selectedSlot.split(":");
    let hour = parseInt(hourStr, 10);
    let min = parseInt(minStr, 10);
    min += 30;
    if (min >= 60) {
      min -= 60;
      hour += 1;
    }
    const endHourStr = String(hour).padStart(2, "0");
    const endMinStr = String(min).padStart(2, "0");
    const endSlot = `${endHourStr}:${endMinStr}`;

    const startDateTime = `${selectedDate}T${selectedSlot}:00`;
    const endDateTime = `${selectedDate}T${endSlot}:00`;

    try {
      // 1. Create Google Calendar Event and send real sync updates to all guests
      const gcalResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          summary: `Reunión: ${userProjectName}`,
          description: `Reunión de Consultoría de Ingeniería - LUXPROC.\n\nDetalles de la Reunión:\n- Título: ${userProjectName}\n- Solicitante: ${userName}\n- Número de Celular: ${userPhone}\n- Motivo de la reunión: ${userNotes || "Ninguno"}\n- Correo de contacto: ${userEmail}\n\nSincronizado de manera automática 100% real vía LUXPROC con Google Calendar y Meet.`,
          start: {
            dateTime: startDateTime,
            timeZone: selectedTimezone
          },
          end: {
            dateTime: endDateTime,
            timeZone: selectedTimezone
          },
          attendees: [
            { email: userEmail, responseStatus: "accepted" },
            { email: "luxproc.11@gmail.com" },
            { email: "soporte@luxproc.cl" }
          ],
          conferenceData: {
            createRequest: {
              requestId: "luxproc_" + Date.now().toString(36),
              conferenceSolutionKey: {
                type: "hangoutsMeet"
              }
            }
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 15 }
            ]
          }
        })
      });

      if (!gcalResponse.ok) {
        const errDetails = await gcalResponse.text();
        console.error("Google Calendar Error Response:", errDetails);
        throw new Error("No se pudo registrar la reunión en Google Calendar. ¿Tiene permisos suficientes?");
      }

      const gcalEvent = await gcalResponse.json();
      const meetUrl = gcalEvent.hangoutLink;
      if (!meetUrl) {
        throw new Error("No se pudo obtener un enlace real de Google Meet desde la API.");
      }

      // 1.5 Send real email to both attendees using Gmail API (with token)
      await sendGmailConfirmation(
        userEmail,
        userName,
        userProjectName,
        selectedDate,
        selectedSlot,
        selectedTimezone,
        meetUrl,
        userNotes,
        userPhone,
        token
      );

      // 2. Submit to local backend database
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          projectName: userProjectName,
          date: selectedDate,
          time: selectedSlot,
          timezone: selectedTimezone,
          notes: userNotes,
          phone: userPhone,
          meetUrl: meetUrl,
          calendarEventId: gcalEvent.id
        })
      });

      if (response.status === 409) {
        const err = await response.json();
        setErrorMessage(err.error || "Este horario ya fue tomado.");
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        setBookingSuccessData({
          booking: result.booking,
          emailBody: result.email.body
        });
        // Reset inputs
        setUserName("");
        setUserEmail("");
        setUserProjectName("");
        setUserNotes("");
        setUserPhone("");
        setSelectedSlot("");
        fetchBookings(); // Refresh conflicts grid
      } else {
        setErrorMessage("Ocurrió un error inesperado al registrar la reserva en la base de datos.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage(err.message || "Fallo de conexión. Verifique su red o sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  // Convert and format selected date elegantly
  const formatFriendlySelectedDate = () => {
    if (!selectedDate) return "";
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(selectedDate + "T00:00:00").toLocaleDateString('es-ES', options);
  };

  const isTodaySelected = () => {
    if (!selectedDate) return false;
    const now = new Date();
    const yr = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, "0");
    const dy = String(now.getDate()).padStart(2, "0");
    return selectedDate === `${yr}-${mo}-${dy}`;
  };

  const isTodayPast1230 = () => {
    if (!isTodaySelected()) return false;
    const now = new Date();
    return (now.getHours() * 60 + now.getMinutes()) >= (12 * 60 + 30);
  };

  // Verify conflicts for a specific slot on selected date
  const isSlotBooked = (slotTime: string) => {
    if (slotTime === "13:00" || slotTime === "13:30" || slotTime === "14:00") {
      return true;
    }
    
    // Check if slot has already passed today
    if (isTodaySelected()) {
      const now = new Date();
      const [sh, sm] = slotTime.split(":").map(Number);
      if ((sh * 60 + sm) < (now.getHours() * 60 + now.getMinutes())) {
        return true;
      }
    }

    return existingBookings.some(
      (b) => b.status === "confirmed" && b.date === selectedDate && b.time === slotTime
    );
  };

  // Generate an .ics calendar direct download
  const downloadIcsFile = (booking: Booking) => {
    const meetId = booking.meetUrl.replace("https://meet.google.com/", "");
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LUXPROC S.A.C.//Booking Systems//ES
BEGIN:VEVENT
UID:${booking.id}@luxproc.io
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${booking.date.replace(/-/g, "")}T${booking.time.replace(/:/g, "")}00Z
DURATION:PT30M
SUMMARY:Reunión de Ingeniería: ${booking.projectName}
DESCRIPTION:Unirse a Google Meet: ${booking.meetUrl}\\n\\nNotas: ${booking.notes || 'Ninguna'}\\n\\nSincronizado vía LUXPROC con Google Calendar.
LOCATION:Google Meet (${booking.meetUrl})
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `reunion-luxproc-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter displayed slots depending on selected shift (morning vs afternoon)
  const displayedSlots = TIME_SLOTS.filter((slot) => {
    const hour = parseInt(slot.split(":")[0], 10);
    if (activeShift === "morning") {
      return hour < 13;
    } else {
      return hour >= 13;
    }
  });

  // Helper to highlight shifts with active selection
  const hasSelectedSlotInShift = (shift: "morning" | "afternoon") => {
    if (!selectedSlot) return false;
    const hour = parseInt(selectedSlot.split(":")[0], 10);
    if (shift === "morning") return hour < 13;
    return hour >= 13;
  };

  const isFormFilled = 
    userName.trim() !== "" && 
    userProjectName.trim() !== "" && 
    userPhone.trim() !== "" && 
    userNotes.trim() !== "";

  return (
    <section id="calendario" className="py-24 px-4 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <CalendarIcon className="w-3.5 h-3.5" />
              Sincronización en Tiempo Real
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              Agendar Consultoría de Ingeniería
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              Reserva una reunión de 30 minutos con nuestro equipo técnico principal para analizar el plan de arquitectura web, CRM, ERP o innovación aplicada. Sincronización bidireccional automática con Google Calendar y generación de salas para Google Meet al instante.
            </p>
          </div>

          {/* Timezone Configurator Panel */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="flex-grow space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Zona Horaria Activa
              </label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full text-xs font-bold bg-transparent text-slate-800 dark:text-white focus:outline-none border-b border-slate-300 dark:border-slate-700 py-1 cursor-pointer"
              >
                {dynamicTimezones.map((tz) => (
                  <option key={tz.id} value={tz.id} className="dark:bg-slate-900 dark:text-white text-xs">
                    {tz.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Booking Screen Flow */}
        <AnimatePresence mode="wait">
          {!bookingSuccessData ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch"
            >
              
              {/* DATE AND HOUR SLOTS COL (7 COLUMNS) - Wrapped in matching card for pristine harmony */}
              <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 shadow-md flex flex-col justify-between space-y-6 md:space-y-8">
                
                {/* 1. Date Selector Track */}
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold">1</span>
                    Seleccione un Día hábil en el Calendario:
                  </h3>
                  
                  {/* Calendar list */}
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                    {businessDays.map((day) => {
                      const isSelected = selectedDate === day.dateStr;
                      return (
                        <button
                          key={day.dateStr}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.dateStr);
                            setSelectedSlot(""); // clear slot on day shift
                            
                            // Auto-set shift based on current time if selected date is today
                            const now = new Date();
                            const yr = now.getFullYear();
                            const mo = String(now.getMonth() + 1).padStart(2, "0");
                            const dy = String(now.getDate()).padStart(2, "0");
                            const todayStr = `${yr}-${mo}-${dy}`;
                            if (day.dateStr === todayStr && (now.getHours() * 60 + now.getMinutes()) >= (12 * 60 + 30)) {
                              setActiveShift("afternoon");
                            } else {
                              setActiveShift("morning");
                            }
                          }}
                          className={`flex-shrink-0 flex flex-col items-center justify-between p-4 w-20 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                              : "bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                            {day.dayName}
                          </span>
                          <span className="text-xl font-extrabold tracking-tight my-1">
                            {day.dayNum}
                          </span>
                          <span className={`text-[10px] uppercase font-bold ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                            {day.monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Hour list of slots strictly every 30 mins with shift toggles for extreme harmony and space optimization */}
                <div className="space-y-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold">2</span>
                      Seleccione una Hora disponible:
                    </h3>

                    {/* Shift tabs for compact visual size */}
                    <div className="flex bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-2xl w-fit border border-slate-300/40 dark:border-slate-800 self-start sm:self-auto gap-1">
                      {(!isTodaySelected() || !isTodayPast1230()) && (
                        <button
                          type="button"
                          onClick={() => setActiveShift("morning")}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            activeShift === "morning"
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/40 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <span>🌅</span> Mañana
                          {hasSelectedSlotInShift("morning") && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveShift("afternoon")}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                          activeShift === "afternoon"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/40 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <span>🌇</span> Tarde
                        {hasSelectedSlotInShift("afternoon") && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic pb-1">
                    Visualizando el {formatFriendlySelectedDate()}. Los bloques ocupados están bloqueados automáticamente.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {displayedSlots.map((slot) => {
                      const isBooked = isSlotBooked(slot);
                      const isSelected = selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`relative p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                            isBooked
                              ? "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200/30 dark:border-slate-800/80 text-slate-300 dark:text-slate-750 cursor-not-allowed"
                              : isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-md font-bold"
                              : "bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-semibold text-xs md:text-sm">
                            <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-white" : isBooked ? "text-slate-400" : "text-blue-500"}`} />
                            {slot}
                          </div>
                          
                          {/* Booked badging tag */}
                          {isBooked ? (
                            <span className="absolute bottom-1 text-[8px] font-bold text-red-500 tracking-tight uppercase">
                              OCUPADO
                            </span>
                          ) : (
                            <span className={`text-[8px] mt-1 font-bold ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                              30 minutos
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technical integration footnotes inside the left card to fill the blank bottom beautifully */}
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-mono gap-2">
                  <span>🔒 Canales cifrados de extremo a extremo</span>
                  <span>🚀 API de Google Meet autogenerada</span>
                </div>

              </div>

              {/* RESERVATION REGISTER FORM (5 COLUMNS) - Styled to perfectly match the left dashboard half */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 shadow-md relative flex-grow flex flex-col justify-between h-full">
                  <AnimatePresence mode="wait">
                    {!selectedSlot ? (
                      <motion.div
                        key="selection-guide"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-4 mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                              Detalles de la Sesión
                            </h3>
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase">
                              30 Mins • Meet
                            </span>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
                              Consultoría de Alta Ingeniería y Ecosistemas Digitales
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Una sesión uno-a-uno para analizar cuellos de botella en su ERP/CRM, optimización de infraestructura y factibilidad de desarrollos a medida.
                            </p>

                            {/* Host details */}
                            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 flex items-center gap-3">
                              <img
                                src="https://i.imgur.com/XdWDVQ3.jpeg"
                                alt="Victor Becerra"
                                className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-white">Victor Becerra</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">CEO & Co-Fundador • Consultor Líder</p>
                              </div>
                            </div>

                            {/* Meeting contents list */}
                            <div className="space-y-2.5 pt-2">
                              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">¿Qué cubriremos en la sesión?</p>
                              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                                <div className="flex items-start gap-2">
                                  <span className="text-blue-500 font-bold">✓</span>
                                  <span>Diagnóstico de flujos operativos y silos de datos.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-blue-500 font-bold">✓</span>
                                  <span>Propuesta de sincronización en tiempo real.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-blue-500 font-bold">✓</span>
                                  <span>Estimación técnica preliminar y roadmap de R&D.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pulsing Guide Indicator */}
                        <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/25 text-center space-y-2">
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 animate-pulse">
                            <Clock className="w-4 h-4" /> Seleccione un día y hora disponible
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-400 leading-normal">
                            Habilite el formulario de registro instantáneo seleccionando un bloque de 30 mins a la izquierda.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="booking-inputs"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-3 mb-3">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                            <Workflow className="w-4 h-4 text-blue-500" /> Registro de Reserva
                          </h3>
                          <button
                            type="button"
                            onClick={() => setSelectedSlot("")}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                          >
                            Cambiar Horario
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20">
                          <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                            Horario pre-seleccionado
                          </p>
                          <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white mt-1">
                            ⏱️ {formatFriendlySelectedDate()} a las {selectedSlot}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-slate-400" /> Huso: {selectedTimezone}
                          </p>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          {token && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-600 dark:text-emerald-400">
                              <span className="flex items-center gap-1 font-semibold">
                                <Check className="w-3.5 h-3.5 stroke-[3]" /> Conectado como: {userEmail}
                              </span>
                              <button
                                type="button"
                                onClick={() => logout()}
                                className="font-bold underline hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer"
                              >
                                Cerrar Sesión
                              </button>
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" /> Nombre de la Persona que solicita la reunión:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Nombre completo del solicitante"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5" /> Correo Electrónico:
                            </label>
                            {token ? (
                              <input
                                type="email"
                                required
                                readOnly
                                placeholder="Correo electrónico"
                                value={userEmail}
                                className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 focus:outline-none cursor-not-allowed shadow-sm"
                              />
                            ) : (
                              <div className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 italic">
                                * Se sincronizará automáticamente al iniciar sesión con Google
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              📌 Título de la Reunión:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Planificación de ERP / Sesión de Consultoría Técnica"
                              value={userProjectName}
                              onChange={(e) => setUserProjectName(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              📞 Número de Celular:
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="Ej. +51 987 654 321"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              🗒️ Motivo de la Reunión:
                            </label>
                            <textarea
                              required
                              placeholder="Ej. Analizar problemas de sincronización de la base de datos y proponer un roadmap de ingeniería..."
                              value={userNotes}
                              onChange={(e) => setUserNotes(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 h-20 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white transition-all shadow-sm resize-none"
                            />
                          </div>

                          {errorMessage && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 flex justify-between items-center font-semibold">
                              <span>⚠️ {errorMessage}</span>
                            </div>
                          )}

                          {token ? (
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-550 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isLoading ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>Sincronizando con Google Meet & Calendar...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  Confirmar y Agendar Cita
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="space-y-3 pt-2">
                              {!isFormFilled ? (
                                <div className="space-y-2">
                                  <button
                                    type="button"
                                    disabled
                                    className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                                  >
                                    <Lock className="w-4 h-4" />
                                    Complete los campos para iniciar sesión
                                  </button>
                                  <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                                    * Complete su nombre, título, celular y motivo de la reunión para desbloquear la sincronización con Google.
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-center">
                                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                                      <Check className="w-4 h-4 stroke-[3]" /> ¡Detalles de reunión listos!
                                    </p>
                                    <p className="text-[9.5px] text-slate-500 dark:text-slate-400 mt-1">
                                      Ahora proceda a iniciar sesión con Google para autorizar su calendario y sincronizar el enlace de Meet automáticamente.
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoggingIn}
                                    className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-blue-600 hover:bg-blue-550 text-white font-bold text-xs md:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
                                  >
                                    {isLoggingIn ? (
                                      <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.66l3.15-3.15C17.45 1.84 14.9 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.8 2.95C6.2 7.04 8.85 5.04 12 5.04z" />
                                        <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.45-1.1 2.68-2.33 3.5l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.4z" />
                                        <path fill="#FBBC05" d="M5.3 14.5c-.25-.75-.4-1.55-.4-2.5s.15-1.75.4-2.5L1.5 6.55C.55 8.45 0 10.15 0 12s.55 3.55 1.5 5.45l3.8-2.95z" />
                                        <path fill="#34A853" d="M12 23c3.25 0 5.95-1.08 7.95-2.9l-3.6-2.8c-1.1.74-2.5 1.18-4.35 1.18-3.15 0-5.8-2-6.7-4.95l-3.8 2.95C3.4 20.35 7.35 23 12 23z" />
                                      </svg>
                                    )}
                                    <span>{isLoggingIn ? "Conectando con Google..." : "Iniciar Sesión con Google"}</span>
                                  </button>
                                </div>
                              )}

                              {/* No 403 guide needed since we are live in production */}
                            </div>
                          )}
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          ) : (
            
            // BOOKING SUCCESS FEEDBACK COMPONENT
            <motion.div
              key="booking-success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
            >
              {/* Glowing particles blur background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-2">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold font-mono text-emerald-400 tracking-widest uppercase">
                    CORREO SINCRONIZADO CORRECTAMENTE
                  </p>
                  <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                    ¡Reunión Agendada Exitosamente!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto">
                    Tu consultoría ha sido registrada en tiempo real en nuestra cuenta de Google Calendar y vinculada de manera automática con un canal seguro de Google Meet.
                  </p>
                </div>

                {/* Event Summary Details and redirection links */}
                <div className="w-full text-left bg-slate-800/80 rounded-2xl p-6 border border-slate-800 space-y-4 max-w-xl">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400">Proyecto:</p>
                      <p className="font-bold text-sm text-slate-100">{bookingSuccessData.booking.projectName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Participante Principal:</p>
                      <p className="font-bold text-sm text-slate-100">{bookingSuccessData.booking.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Fecha y Hora (Local):</p>
                      <p className="font-bold text-sm text-slate-100">{bookingSuccessData.booking.date} @ {bookingSuccessData.booking.time}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Notificaciones Automáticas:</p>
                      <p className="font-bold text-xs text-emerald-400 flex items-center gap-1">
                        <BellRing className="w-3.5 h-3.5 animate-bounce" /> Programado / Activo
                      </p>
                    </div>
                  </div>

                  {/* Google Meet Redirection Trigger Link */}
                  <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <Video className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400">GOOGLE MEET AUTOMÁTICO</p>
                        <a 
                          href={bookingSuccessData.booking.meetUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-blue-400 hover:underline"
                        >
                          {bookingSuccessData.booking.meetUrl}
                        </a>
                      </div>
                    </div>

                    <a
                      href={bookingSuccessData.booking.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-550 transition-colors rounded-xl text-xs font-semibold text-white cursor-pointer"
                    >
                      Unirse a Meet
                    </a>
                  </div>
                </div>

                {/* Operations and download simulation buttons */}
                <div className="pt-4 flex flex-wrap gap-3 justify-center items-center">
                  <button
                    onClick={() => downloadIcsFile(bookingSuccessData.booking)}
                    className="p-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center gap-2.5 cursor-pointer text-slate-200 shadow-md"
                  >
                    <img 
                      src="https://i.imgur.com/9PTaAa4.png" 
                      alt="LUXPROC" 
                      className="w-5 h-5 object-contain"
                      referrerPolicy="no-referrer" 
                    />
                    <span>Descargar Evento (.ics)</span>
                  </button>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-download-logo"))}
                    className="p-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer text-slate-200"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Descargar Logo Oficial
                  </button>

                  <button
                    onClick={() => {
                      setBookingSuccessData(null);
                    }}
                    className="p-3 px-4 bg-blue-600 hover:bg-blue-550 transition-colors rounded-xl text-xs font-bold text-white cursor-pointer"
                  >
                    Volver al Calendario
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
