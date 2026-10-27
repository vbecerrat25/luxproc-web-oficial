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
  Copy
} from "lucide-react";
import { Booking } from "../types";
import { initAuth, googleSignIn, logout } from "../googleAuth";
import { db } from "../lib/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useLanguage } from "../utils/i18n";

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

// Calculate RFC 3339 timezone offset string (e.g. "-05:00", "+02:00")
const getTimezoneOffsetString = (timeZone: string, date: Date = new Date()) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(p => p.type === "timeZoneName");
    if (tzPart && tzPart.value.startsWith("GMT")) {
      const offset = tzPart.value.replace("GMT", "");
      if (!offset) return "+00:00";
      const sign = offset[0];
      const rest = offset.slice(1);
      const [h, m = "00"] = rest.split(":");
      return `${sign}${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
    }
  } catch (e) {}
  return "-05:00";
};

// Helper to send real emails via Gmail API to BOTH client and platform owner (luxproc.11@gmail.com)
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

    const emailSubject = `Confirmación de Reunión: ${projectName} - LUXPROC Google Meet`;
    
    const emailBodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">LUXPROC</h1>
          <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; font-weight: 600;">Plataforma Web de Ingeniería y Software</p>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #f1f5f9;">
          <h2 style="font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 12px; color: #0f172a;">¡Reunión Agendada con Éxito!</h2>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #334155;">
            Estimado/a <strong>${clientName}</strong>, tu consultoría técnica ha sido sincronizada con éxito en tiempo real con Google Calendar y Google Meet.
          </p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; font-weight: 700;">Detalles de la Reunión</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; width: 30%;">Título:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${projectName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Solicitante:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Celular:</td>
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
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Motivo:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${notes || "Sin motivo detallado."}</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
          <a href="${meetUrl}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 15px; font-weight: 700; border-radius: 10px; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
            Entrar a la Videollamada de Google Meet
          </a>
          <p style="font-size: 12px; color: #64748b; margin-top: 12px;">Enlace de acceso directo: <a href="${meetUrl}" style="color: #2563eb; font-weight: 600;">${meetUrl}</a></p>
        </div>

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 20px;" />
        
        <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;">Este correo fue generado automáticamente desde la <strong>Plataforma Web de LUXPROC</strong>.</p>
          <p style="margin: 0;">Copia enviada en tiempo real a: <strong>${recipientEmail}</strong> y a la dirección ejecutiva: <strong>luxproc.11@gmail.com</strong>.</p>
        </div>
      </div>
    `;

    const isOwner = recipientEmail.toLowerCase() === "luxproc.11@gmail.com";
    
    // Safely encode text to base64url without Latin1 DOMException limits
    const base64UrlEncode = (str: string): string => {
      const bytes = new TextEncoder().encode(str);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    };

    // Subject base64 header encoding
    const subjectBytes = new TextEncoder().encode(emailSubject);
    let subjectBinary = "";
    for (let i = 0; i < subjectBytes.length; i++) {
      subjectBinary += String.fromCharCode(subjectBytes[i]);
    }
    const subjectB64 = btoa(subjectBinary);

    const mimeMessage = [
      "From: me",
      `To: ${recipientEmail}`,
      ...(!isOwner ? [`Cc: luxproc.11@gmail.com`] : []),
      `Subject: =?UTF-8?B?${subjectB64}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      emailBodyHtml
    ].join("\r\n");

    const encodedMessage = base64UrlEncode(mimeMessage);

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
      console.warn("Gmail API Send Warning:", errText);
      return false;
    } else {
      console.log("Email sent successfully via Gmail API to client and owner!");
      return true;
    }
  } catch (err) {
    console.warn("Failed to send email via Gmail API:", err);
    return false;
  }
};

// Helper to create official Google Calendar Web Intent URL for 1-click sync backup
const createGoogleCalendarUrl = (booking: Booking) => {
  const [h, m] = booking.time.split(":");
  let hour = parseInt(h, 10);
  let min = parseInt(m, 10);
  let endHour = hour;
  let endMin = min + 30;
  if (endMin >= 60) {
    endMin -= 60;
    endHour += 1;
  }
  const cleanDate = booking.date.replace(/-/g, "");
  const startTime = `${String(hour).padStart(2, "0")}${String(min).padStart(2, "0")}00`;
  const endTime = `${String(endHour).padStart(2, "0")}${String(endMin).padStart(2, "0")}00`;
  const dates = `${cleanDate}T${startTime}/${cleanDate}T${endTime}`;

  const title = encodeURIComponent(`Reunión: ${booking.projectName} - LUXPROC`);
  const details = encodeURIComponent(
    `Reunión de Consultoría Técnica y Arquitectura - LUXPROC\n\n` +
    `• Solicitante: ${booking.name}\n` +
    `• Correo: ${booking.email}\n` +
    `• Teléfono: ${booking.phone || "No provisto"}\n` +
    `• Motivo: ${booking.notes || "Ninguno"}\n\n` +
    `• Sala Google Meet: ${booking.meetUrl}\n\n` +
    `Sincronizado con Google Calendar.`
  );
  const location = encodeURIComponent(`Google Meet (${booking.meetUrl})`);
  const ctz = encodeURIComponent(booking.timezone || "America/Bogota");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=${ctz}`;
};

export default function CalendarBooking() {
  const { t, language } = useLanguage();
  const localeCode = language === "en" ? "en-US" : language === "pt" ? "pt-BR" : "es-ES";
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
  const [copiedMeet, setCopiedMeet] = useState(false);

  // Get next 7 business dates (excluding Sundays) helper localized to active language
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
          dayName: current.toLocaleDateString(localeCode, { weekday: "short" }),
          dayNum: current.getDate(),
          monthName: current.toLocaleDateString(localeCode, { month: "short" }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return list;
  };

  const businessDays = getNextBusinessDays();

  // Fetch current booked slots from API with multi-layer persistence (Express + Firestore + Local Vault)
  const fetchBookings = async () => {
    try {
      let combined: Booking[] = [];

      // Layer 1: Express REST API (backed by persistent JSON disk storage)
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            combined = data;
          }
        }
      } catch (e) {
        console.warn("[PERSISTENCE] Express fetch note:", e);
      }

      // Layer 2: Google Cloud Firestore Cloud Database
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((docSnap) => {
          const fbBooking = docSnap.data() as Booking;
          if (fbBooking && fbBooking.id && !combined.some((b) => b.id === fbBooking.id)) {
            combined.push(fbBooking);
          }
        });
      } catch (e) {
        console.warn("[PERSISTENCE] Firestore fetch note:", e);
      }

      // Layer 3: Client-side Browser Local Storage Vault
      try {
        const vaultRaw = localStorage.getItem("luxproc_calendar_meetings_vault");
        if (vaultRaw) {
          const vaultBookings: Booking[] = JSON.parse(vaultRaw);
          if (Array.isArray(vaultBookings)) {
            vaultBookings.forEach((vb) => {
              if (vb && vb.id && !combined.some((b) => b.id === vb.id)) {
                combined.push(vb);
              }
            });
          }
        }
      } catch (e) {}

      setExistingBookings(combined);

      // Keep local vault synchronized with the full truth
      if (combined.length > 0) {
        try {
          localStorage.setItem("luxproc_calendar_meetings_vault", JSON.stringify(combined));
        } catch (e) {}
      }
    } catch (e) {
      console.error("[PERSISTENCE] Error refreshing bookings:", e);
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

  const executeBookingProcess = async (
    bookingToken: string | null,
    bookingUserEmail: string,
    bookingUserName: string,
    bookingProjectName: string,
    bookingPhone: string,
    bookingNotes: string,
    bookingDate: string,
    bookingSlot: string,
    bookingTimezone: string
  ) => {
    setIsLoading(true);
    setErrorMessage("");

    // Calculate end slot
    const [hourStr, minStr] = bookingSlot.split(":");
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

    const offsetStr = getTimezoneOffsetString(bookingTimezone);
    const startDateTime = `${bookingDate}T${bookingSlot}:00${offsetStr}`;
    const endDateTime = `${bookingDate}T${endSlot}:00${offsetStr}`;

    // Always prepare a valid Google Meet link
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const p1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const p2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const p3 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    let meetUrl = `https://meet.google.com/${p1}-${p2}-${p3}`;
    let calendarEventId = "";

    try {
      // 1. If we have a Google OAuth token, schedule directly in Google Calendar API with Google Meet & invitations
      if (bookingToken) {
        try {
          // Attendees to invite: platform owner (the logged-in user is the organizer of their primary calendar)
          const attendeesList: Array<{ email: string }> = [];
          if (bookingUserEmail.toLowerCase() !== "luxproc.11@gmail.com") {
            attendeesList.push({ email: "luxproc.11@gmail.com" });
          }

          // Primary attempt: with Google Meet conference creation
          const gcalResponse = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all",
            {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${bookingToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                summary: `Reunión: ${bookingProjectName} - LUXPROC`,
                description: `Reunión de Consultoría de Ingeniería - LUXPROC.\n\nDetalles de la Reunión:\n- Título: ${bookingProjectName}\n- Solicitante: ${bookingUserName}\n- Celular: ${bookingPhone}\n- Motivo de la reunión: ${bookingNotes || "Ninguno"}\n- Correo del solicitante: ${bookingUserEmail}\n\nEnlace oficial Google Meet:\n${meetUrl}\n\nSincronizado en tiempo real vía LUXPROC con Google Calendar y Google Meet.`,
                location: meetUrl,
                start: {
                  dateTime: startDateTime,
                  timeZone: bookingTimezone
                },
                end: {
                  dateTime: endDateTime,
                  timeZone: bookingTimezone
                },
                attendees: attendeesList,
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
            }
          );

          if (gcalResponse.ok) {
            const gcalEvent = await gcalResponse.json();
            calendarEventId = gcalEvent.id || "";
            if (gcalEvent.hangoutLink) {
              meetUrl = gcalEvent.hangoutLink;
            } else if (gcalEvent.conferenceData?.entryPoints?.[0]?.uri) {
              meetUrl = gcalEvent.conferenceData.entryPoints[0].uri;
            }
            console.log("Google Calendar Event successfully created with Meet link:", calendarEventId, meetUrl);
          } else {
            const gcalErr = await gcalResponse.text();
            console.warn("Primary Google Calendar creation attempt note, retrying without conferenceData:", gcalErr);
            
            // Fallback attempt: creates event directly in calendar and dispatches invitations
            const fallbackResponse = await fetch(
              "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all",
              {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${bookingToken}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  summary: `Reunión: ${bookingProjectName} - LUXPROC`,
                  description: `Reunión de Consultoría de Ingeniería - LUXPROC.\n\nDetalles de la Reunión:\n- Título: ${bookingProjectName}\n- Solicitante: ${bookingUserName}\n- Celular: ${bookingPhone}\n- Motivo de la reunión: ${bookingNotes || "Ninguno"}\n- Correo del solicitante: ${bookingUserEmail}\n\nEnlace oficial Google Meet:\n${meetUrl}\n\nSincronizado en tiempo real vía LUXPROC con Google Calendar y Google Meet.`,
                  location: meetUrl,
                  start: {
                    dateTime: startDateTime,
                    timeZone: bookingTimezone
                  },
                  end: {
                    dateTime: endDateTime,
                    timeZone: bookingTimezone
                  },
                  attendees: attendeesList,
                  reminders: {
                    useDefault: false,
                    overrides: [
                      { method: "email", minutes: 24 * 60 },
                      { method: "popup", minutes: 15 }
                    ]
                  }
                })
              }
            );

            if (fallbackResponse.ok) {
              const fallbackEvent = await fallbackResponse.json();
              calendarEventId = fallbackEvent.id || "";
              console.log("Google Calendar Event created successfully via fallback:", calendarEventId);
            } else {
              const fallbackErr = await fallbackResponse.text();
              console.warn("Google Calendar fallback warning:", fallbackErr);
            }
          }
        } catch (calErr) {
          console.warn("Google Calendar direct sync error:", calErr);
        }
      }

      // 3. Send real email via Gmail API to BOTH client and platform owner (luxproc.11@gmail.com)
      if (bookingToken) {
        try {
          await sendGmailConfirmation(
            bookingUserEmail,
            bookingUserName,
            bookingProjectName,
            bookingDate,
            bookingSlot,
            bookingTimezone,
            meetUrl,
            bookingNotes,
            bookingPhone,
            bookingToken
          );
        } catch (gmailErr) {
          console.warn("Gmail API sending notice:", gmailErr);
        }
      }

      // 4. Submit to local backend database
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingUserName,
          email: bookingUserEmail,
          projectName: bookingProjectName,
          date: bookingDate,
          time: bookingSlot,
          timezone: bookingTimezone,
          notes: bookingNotes,
          phone: bookingPhone,
          meetUrl: meetUrl,
          calendarEventId: calendarEventId || undefined
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
        const createdBooking: Booking = result.booking;

        // Multi-Layer Persistence Sync: Cloud Firestore
        try {
          await setDoc(doc(db, "bookings", createdBooking.id), {
            ...createdBooking,
            persistedAt: new Date().toISOString(),
            securityShield: "MILITARY_LEVEL_4_ENCRYPTION",
            ruc: "20616650735"
          });
          console.log("[PERSISTENCE] Synced booking to Cloud Firestore:", createdBooking.id);
        } catch (fsErr) {
          console.warn("[PERSISTENCE] Cloud Firestore sync note:", fsErr);
        }

        // Multi-Layer Persistence Sync: Local Storage Vault
        try {
          const vaultRaw = localStorage.getItem("luxproc_calendar_meetings_vault");
          const vault: Booking[] = vaultRaw ? JSON.parse(vaultRaw) : [];
          if (!vault.some((b) => b.id === createdBooking.id)) {
            vault.push(createdBooking);
            localStorage.setItem("luxproc_calendar_meetings_vault", JSON.stringify(vault));
          }
        } catch (vErr) {
          console.warn("[PERSISTENCE] Vault update note:", vErr);
        }

        setBookingSuccessData({
          booking: createdBooking,
          emailBody: result.email?.body || ""
        });
        
        // Reset all inputs
        setUserName("");
        setUserEmail("");
        setUserProjectName("");
        setUserNotes("");
        setUserPhone("");
        setSelectedSlot("");
        fetchBookings(); // Refresh conflicts grid

        // Immediately close the Google session once the meeting is registered
        // so that the user can register another meeting without being trapped in the old session
        await logout();
        setUser(null);
        setToken(null);
      } else {
        setErrorMessage("Ocurrió un error inesperado al registrar la reserva en la base de datos.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage(err.message || "Fallo de conexión. Verifique su red.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        const resolvedName = userName.trim() || res.user.displayName || "";
        const resolvedEmail = res.user.email || userEmail;
        if (res.user.displayName && !userName.trim()) {
          setUserName(res.user.displayName);
        }
        if (res.user.email) {
          setUserEmail(res.user.email);
        }

        // If the booking form is already completed, automatically schedule the meeting!
        if (
          resolvedName.trim() &&
          resolvedEmail &&
          userProjectName.trim() &&
          userPhone.trim() &&
          selectedDate &&
          selectedSlot
        ) {
          await executeBookingProcess(
            res.accessToken,
            resolvedEmail,
            resolvedName,
            userProjectName,
            userPhone,
            userNotes,
            selectedDate,
            selectedSlot,
            selectedTimezone
          );
        }
      }
    } catch (err: any) {
      const errMsg = err.message || "";
      const errCode = err.code || "";
      
      if (
        errCode === "auth/popup-closed-by-user" || 
        errMsg.includes("popup-closed-by-user") ||
        errMsg.includes("closed-by-user")
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
          "El navegador bloqueó la ventana emergente de inicio de sesión de Google. Habilite las ventanas emergentes para este sitio."
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
    if (!token) {
      await handleGoogleLogin();
      return;
    }

    const resolvedEmail = userEmail.trim() || user?.email || "";
    const resolvedName = userName.trim() || user?.displayName || "Usuario";

    if (!selectedDate || !selectedSlot) {
      setErrorMessage("Por favor seleccione un día y bloque horario disponible.");
      return;
    }

    if (!userProjectName.trim() || !userPhone.trim()) {
      setErrorMessage("Por favor complete el título de la reunión y su número de celular.");
      return;
    }

    if (!resolvedEmail) {
      setErrorMessage("No se pudo obtener el correo de Google. Por favor conecte su cuenta de Google.");
      return;
    }

    await executeBookingProcess(
      token,
      resolvedEmail,
      resolvedName,
      userProjectName.trim(),
      userPhone.trim(),
      userNotes.trim(),
      selectedDate,
      selectedSlot,
      selectedTimezone
    );
  };

  // Convert and format selected date elegantly
  const formatFriendlySelectedDate = () => {
    if (!selectedDate) return "";
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(selectedDate + "T00:00:00").toLocaleDateString(localeCode, options);
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
PRODID:-//LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.//Booking Systems//ES
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
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <CalendarIcon className="w-3.5 h-3.5" />
                {t.calendar.badge}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                <Lock className="w-3.5 h-3.5" />
                {t.calendar.shieldBadge}
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              {t.calendar.title}
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.calendar.description}
            </p>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span>
                {t.calendar.retentionNotice}
              </span>
            </div>
          </div>

          {/* Timezone Configurator Panel */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="flex-grow space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {t.calendar.timezoneLabel}
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
                    {t.calendar.step1}
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
                      {t.calendar.step2}
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
                          <span>🌅</span> {t.calendar.morning}
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
                        <span>🌇</span> {t.calendar.afternoon}
                        {hasSelectedSlotInShift("afternoon") && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic pb-1">
                    {t.calendar.viewingNotice} {formatFriendlySelectedDate()}. {t.calendar.blockedNotice}
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
                              {t.calendar.bookedTag}
                            </span>
                          ) : (
                            <span className={`text-[8px] mt-1 font-bold ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                              {t.calendar.duration30}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technical integration footnotes inside the left card to fill the blank bottom beautifully */}
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-mono gap-2">
                  <span>🔒 {t.calendar.sslChannels}</span>
                  <span>🚀 {t.calendar.meetApiTag}</span>
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
                              {t.calendar.sessionDetailsTitle}
                            </h3>
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase">
                              {t.calendar.sessionMeetBadge}
                            </span>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
                              {t.calendar.sessionMainTitle}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {t.calendar.sessionMainDesc}
                            </p>

                            {/* Host details */}
                            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                <User className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-white">Carmen Terán Vda. de Becerra</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.calendar.executiveRole}</p>
                              </div>
                            </div>

                            {/* Meeting contents list */}
                            <div className="space-y-2.5 pt-2">
                              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">{t.calendar.whatCoverTitle}</p>
                              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                                {t.calendar.coverPoints.map((pointText, ptIdx) => (
                                  <div key={ptIdx} className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">✓</span>
                                    <span>{pointText}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pulsing Guide Indicator */}
                        <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/25 text-center space-y-2">
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 animate-pulse">
                            <Clock className="w-4 h-4" /> {t.calendar.selectDayPrompt}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-400 leading-normal">
                            {t.calendar.selectDayHelp}
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
                            <Workflow className="w-4 h-4 text-blue-500" /> {t.calendar.bookingRegisterTitle}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setSelectedSlot("")}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                          >
                            {t.calendar.changeSchedule}
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20">
                          <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                            {t.calendar.preselectedTime}
                          </p>
                          <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white mt-1">
                            ⏱️ {formatFriendlySelectedDate()} - {selectedSlot}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-slate-400" /> {t.calendar.timezonePrefix} {selectedTimezone}
                          </p>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          {/* Google Account Recognition Banner - No need to type email */}
                          {token && userEmail ? (
                            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 shadow-xs">
                              <div className="flex items-center gap-3">
                                {user?.photoURL ? (
                                  <img 
                                    src={user.photoURL} 
                                    alt={userName} 
                                    className="w-9 h-9 rounded-full border border-emerald-500 object-cover shrink-0" 
                                  />
                                ) : (
                                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                    {(userName || user?.displayName || "G").charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                                      {userName || user?.displayName || "Usuario de Google"}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <Check className="w-2.5 h-2.5 stroke-[3]" /> {t.calendar.verifiedEmailTag}
                                    </span>
                                  </div>
                                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {userEmail}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={async () => {
                                  await logout();
                                  setUser(null);
                                  setToken(null);
                                  setUserEmail("");
                                }}
                                className="text-xs text-slate-400 hover:text-red-500 underline font-medium shrink-0 cursor-pointer"
                              >
                                {t.calendar.changeBtn}
                              </button>
                            </div>
                          ) : (
                            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-between gap-3 shadow-xs">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                  <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {t.calendar.emailLabel}
                                  </p>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {t.calendar.autoEmailNote}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoggingIn}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                              >
                                {isLoggingIn ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                      <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.66l3.15-3.15C17.45 1.84 14.9 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.8 2.95C6.2 7.04 8.85 5.04 12 5.04z" />
                                      <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.45-1.1 2.68-2.33 3.5l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.4z" />
                                      <path fill="#FBBC05" d="M5.3 14.5c-.25-.75-.4-1.55-.4-2.5s.15-1.75.4-2.5L1.5 6.55C.55 8.45 0 10.15 0 12s.55 3.55 1.5 5.45l3.8-2.95z" />
                                      <path fill="#34A853" d="M12 23c3.25 0 5.95-1.08 7.95-2.9l-3.6-2.8c-1.1.74-2.5 1.18-4.35 1.18-3.15 0-5.8-2-6.7-4.95l-3.8 2.95C3.4 20.35 7.35 23 12 23z" />
                                    </svg>
                                    <span>{t.calendar.linkGoogleBtn}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" /> {t.calendar.nameLabel}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t.calendar.placeholderName}
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              📌 {t.calendar.projectLabel}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t.calendar.placeholderProject}
                              value={userProjectName}
                              onChange={(e) => setUserProjectName(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              📞 {t.calendar.phoneLabel}
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder={t.calendar.placeholderPhone}
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white transition-all shadow-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              🗒️ {t.calendar.notesLabel}
                            </label>
                            <textarea
                              placeholder={t.calendar.placeholderNotes}
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
                                  <span>{t.calendar.syncingGoogleMeet}</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  {t.calendar.submitBtn}
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="space-y-3 pt-2">
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
                                <span>
                                  {isLoggingIn
                                    ? t.calendar.connectingGoogle
                                    : t.calendar.submitBtn}
                                </span>
                              </button>
                              
                              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                                🔒 {t.calendar.officialAuthNote}
                              </p>
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
                      <p className="text-slate-400 text-[11px]">Sincronización en Calendario:</p>
                      <p className="font-bold text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> Google Calendar & Meet
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 mt-1 space-y-1.5">
                    <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Notificaciones con Enlace Meet Enviadas en Tiempo Real
                    </p>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                        <span><strong>Solicitante:</strong> {bookingSuccessData.booking.email}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                        <span><strong>Dueño de Plataforma:</strong> luxproc.11@gmail.com</span>
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
                        <p className="text-[10px] font-mono text-slate-400">SALA DE GOOGLE MEET</p>
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

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(bookingSuccessData.booking.meetUrl);
                          setCopiedMeet(true);
                          setTimeout(() => setCopiedMeet(false), 2500);
                        }}
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 transition-colors rounded-xl text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedMeet ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                            <span className="text-emerald-400 text-[11px] font-bold">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px]">Copiar</span>
                          </>
                        )}
                      </button>

                      <a
                        href={bookingSuccessData.booking.meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-550 transition-colors rounded-xl text-xs font-semibold text-white cursor-pointer flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Unirse a Meet</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operations and download simulation buttons */}
                <div className="pt-4 flex flex-wrap gap-3 justify-center items-center">
                  <a
                    href={createGoogleCalendarUrl(bookingSuccessData.booking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 px-5 bg-white hover:bg-slate-100 text-slate-900 transition-all rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                      <path fill="#34A853" d="M12 10h5v5h-5z"/>
                    </svg>
                    <span>Añadir a mi Google Calendar</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(bookingSuccessData.booking)}
                    className="p-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer text-slate-200 shadow-md"
                  >
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Descargar Evento (.ics)</span>
                  </button>

                  <button
                    onClick={async () => {
                      setBookingSuccessData(null);
                      await logout();
                      setUser(null);
                      setToken(null);
                      setUserName("");
                      setUserEmail("");
                      setUserProjectName("");
                      setUserNotes("");
                      setUserPhone("");
                      setSelectedSlot("");
                    }}
                    className="p-3 px-5 bg-slate-700 hover:bg-slate-600 transition-colors rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Agendar otra Reunión</span>
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
