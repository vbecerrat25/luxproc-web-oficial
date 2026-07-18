import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// Storage objects
interface Booking {
  id: string;
  name: string;
  email: string;
  projectName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24h)
  timezone: string;
  meetUrl: string;
  notes?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
  calendarEventId?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
}

interface EmailLog {
  id: string;
  bookingId: string;
  recipient: string;
  subject: string;
  body: string;
  sentAt: string;
  type: "confirmation" | "reminder";
}

// In-memory data structures initialized with sample professional data
let bookings: Booking[] = [
  {
    id: "b1",
    name: "Alejandro Ruiz",
    email: "aruiz@nova-corp.io",
    projectName: "CRM Integrado de Ventas",
    date: new Date().toISOString().split("T")[0], // Today
    time: "13:00",
    timezone: "America/Santiago",
    meetUrl: "https://meet.google.com/abc-xzy-qwe",
    notes: "Reunión de alineación arquitectónica para ERP",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b2",
    name: "Elena Gómez",
    email: "elena@vertex-digital.com",
    projectName: "Arquitectura Web con NextJS",
    date: new Date().toISOString().split("T")[0], // Today
    time: "13:30",
    timezone: "Europe/Madrid",
    meetUrl: "https://meet.google.com/tgk-vypw-jqs",
    notes: "Análisis técnico de migración de CRM legacy.",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b3",
    name: "Soporte Técnico",
    email: "soporte@luxproc.cl",
    projectName: "Mantenimiento de Servidores I+D+i",
    date: new Date().toISOString().split("T")[0], // Today
    time: "14:00",
    timezone: "America/Santiago",
    meetUrl: "https://meet.google.com/xyz-abc-123",
    notes: "Bloque de mantenimiento reservado por LUXPROC.",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  }
];

let contactMessages: ContactMessage[] = [
  {
    id: "m1",
    name: "Carlos Mendoza",
    email: "cmendoza@volt-solutions.com",
    company: "Volt Solutions",
    message: "Cotización para una arquitectura modular de IoT e instalaciones eléctricas customizadas para planta automatizada de I+D+i.",
    createdAt: new Date().toISOString()
  }
];

let emailLogs: EmailLog[] = [
  {
    id: "e1",
    bookingId: "b1",
    recipient: "aruiz@nova-corp.io",
    subject: "Confirmación de Reunión: CRM Integrado de Ventas - Google Meet",
    body: "¡Hola Alejandro! Tu reunión ha sido programada con éxito para hoy a las 10:00 (Huso: America/Chile). Enlace Meet: https://meet.google.com/abc-xzy-qwe",
    sentAt: new Date().toISOString(),
    type: "confirmation"
  }
];

// Helper to generate a Google Meet code structure (abc-defg-hij)
function generateMeetUrl() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const p1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const p2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const p3 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `https://meet.google.com/${p1}-${p2}-${p3}`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API - Get bookings
  app.get("/api/bookings", (req, res) => {
    res.json(bookings);
  });

  // API - Create booking
  app.post("/api/bookings", (req, res) => {
    const { name, email, projectName, date, time, timezone, notes, meetUrl: customMeetUrl, calendarEventId } = req.body;

    if (!name || !email || !projectName || !date || !time) {
      return res.status(400).json({ error: "Faltan campos obligatorios para agendar la cita." });
    }

    // Check for double booking conflict in the same slot (strict 30-minute window checks)
    const isConflict = bookings.some(
      (b) => b.status === "confirmed" && b.date === date && b.time === time
    );

    if (isConflict) {
      return res.status(409).json({
        error: "Conflicto de horario: Este bloque horario ya ha sido reservado y sincronizado con Google Calendar."
      });
    }

    const meetUrl = customMeetUrl || generateMeetUrl();
    const newBooking: Booking = {
      id: "b_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      projectName,
      date,
      time,
      timezone: timezone || "UTC",
      meetUrl,
      notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      calendarEventId: calendarEventId || undefined,
    };

    bookings.push(newBooking);

    // Create an automatic mock confirmation email
    const emailConfirm: EmailLog = {
      id: "e_" + Math.random().toString(36).substr(2, 9),
      bookingId: newBooking.id,
      recipient: email,
      subject: `Confirmación de Reunión: ${projectName} via Google Meet`,
      body: `Estimado/a ${name},\n\nSu reservación para el proyecto "${projectName}" ha sido sincronizada con éxito en nuestro calendario corporativo de Google.\n\nDetalles del evento:\n- Fecha: ${date}\n- Hora: ${time} (${timezone})\n- Enlace de Google Meet: ${meetUrl}\n\nSe enviará un correo recordatorio automático 15 minutos antes de la reunión.\n\nSaludos cordiales,\nSyncDevelopment Corp.`,
      sentAt: new Date().toISOString(),
      type: "confirmation"
    };
    emailLogs.push(emailConfirm);

    res.status(201).json({ booking: newBooking, email: emailConfirm });
  });

  // API - Cancel booking
  app.post("/api/bookings/:id/cancel", (req, res) => {
    const { id } = req.params;
    const booking = bookings.find((b) => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    booking.status = "cancelled";

    // Notify cancellation
    const emailCancel: EmailLog = {
      id: "e_" + Math.random().toString(36).substr(2, 9),
      bookingId: booking.id,
      recipient: booking.email,
      subject: `Cancelación de Reunión: ${booking.projectName}`,
      body: `Hola ${booking.name},\n\nLe confirmamos que la reunión para el proyecto "${booking.projectName}" programada para el ${booking.date} a las ${booking.time} ha sido cancelada.\n\nSi desea re-agendar, puede ingresar al portal corporativo en tiempo real.\n\nSaludos cordiales.`,
      sentAt: new Date().toISOString(),
      type: "reminder"
    };
    emailLogs.push(emailCancel);

    res.json({ message: "Reserva cancelada correctamente", booking });
  });

  // API - Get email delivery logs
  app.get("/api/emails", (req, res) => {
    res.json(emailLogs);
  });

  // API - Trigger manual simulated reminder email
  app.post("/api/emails/send-reminder", (req, res) => {
    const { bookingId } = req.body;
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada para el recordatorio." });
    }

    const emailReminder: EmailLog = {
      id: "e_" + Math.random().toString(36).substr(2, 9),
      bookingId: booking.id,
      recipient: booking.email,
      subject: `Recordatorio Automático: Reunión sobre ${booking.projectName} en 15 Minutos`,
      body: `¡Atención! Este es un recordatorio automático de que tu sesión corporativa comenzará en breve.\n\nDetalles:\n- Proyecto: ${booking.projectName}\n- Fecha: ${booking.date}\n- Hora: ${booking.time} (${booking.timezone})\n- Unirse a Google Meet: ${booking.meetUrl}\n\nPor favor, conéctese puntualmente.`,
      sentAt: new Date().toISOString(),
      type: "reminder"
    };

    emailLogs.push(emailReminder);
    res.json({ success: true, email: emailReminder });
  });

  // API - Submit corporate interest inquiries
  app.post("/api/contact", (req, res) => {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Por favor, complete los campos prioritarios del contacto." });
    }

    const newMessage: ContactMessage = {
      id: "msg_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      company: company || "Particular",
      message,
      createdAt: new Date().toISOString()
    };

    contactMessages.push(newMessage);
    res.status(201).json({ success: true, message: newMessage });
  });

  // API - Fetch client contact logs
  app.get("/api/contact/messages", (req, res) => {
    res.json(contactMessages);
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK ENGINE] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("FATAL ERROR BOOTING THE FULLSTACK BACKEND:", e);
});
