import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en" | "pt";

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

export interface FaqItemI18n {
  id: string;
  category: "erp" | "mantenimiento" | "peritaje" | "general";
  badge: string;
  question: string;
  answer: string;
  points?: string[];
}

export const TRANSLATIONS = {
  es: {
    nav: {
      about: "Nosotros",
      solutions: "Soluciones",
      faq: "FAQ",
      networks: "Redes",
      secureSite: "Sitio Seguro",
      brochure: "Brochure PDF",
      bookNow: "Agendar Ahora",
      language: "Idioma",
      networkTitle: "Nuestras Redes Sociales",
      networkSubtitle: "Canales en preparación (Aún no se encuentran activas)",
      networkNotice: "Aviso: Nuestras redes sociales aún no están activas. Para contactarnos o coordinar asesorías, agenda directamente una reunión por Google Meet.",
      networkInactiveBadge: "Aún no activa • Próximamente",
      networkActiveBadge: "Canal Oficial Activo",
      scheduleSession: "Agendar Reunión",
      close: "Cerrar",
    },
    hero: {
      badge: "Consultoría de Ingeniería & Software Completo",
      typewriter: {
        part1: "Sistemas ERP, CRM y ",
        part2: "Desarrollo Moderno",
        part3: " Sin Fricciones."
      },
      description: "Diseñamos soluciones tecnológicas integrales que vinculan software escalable, control logístico inteligente e ingeniería de hardware a la medida. Agenda una consultoría automatizada por Google Meet hoy.",
      bookCta: "Agendar Consultoría Gratuita",
      exploreCta: "Explorar Soluciones ERP/CRM",
      brochureBtn: "Brochure 2026 (PDF)",
      check1: "Sincronización en 30 minutos sin colisiones",
      check2: "Ingeniería Física e Innovación (I+D+i)",
      dashEfficiency: "EFICIENCIA ERP",
      dashRealtime: "Optimización en tiempo real",
      dashAutoProcesses: "PROCESOS AUTOM.",
      dashMeetConnected: "Conexión Google Meet",
      dashMeetStatus: "Sincronización de Calendario Estable",
      dashDevTitle: "DESARROLLO A MEDIDA",
      dashPhase: "FASE I+D+i",
      dashConnected: "CONECTADO",
      dashLogs: [
        "Sincronización Google Meet: ACTIVA (0 colisiones)",
        "Engine ERP: Procesando cola de inventario real-time",
        "API Gateway: Transmisión TLS 1.3 WebSocket 100% OK",
        "Módulo I+D+i: Despliegue automático de microservicios"
      ]
    },
    marquee: {
      title: "TECNOLOGÍAS & ALIANZAS INDUSTRIALES"
    },
    business: {
      badge: "Nosotros — Cultura & Principios LUXPROC",
      title1: "Arquitectos del ",
      title2: "Futuro Digital",
      desc: "LUXPROC nace con la visión de unificar ingeniería de hardware avanzada, desarrollo de software de misión crítica (ERPs, CRMs) y proyectos de innovación científica (I+D+i) para crear impacto real y sostenible.",
      whatWeDoTitle: "¿Qué Hacemos?",
      whatWeDoDesc: "Diseñamos, desarrollamos e implementamos ecosistemas empresariales integrales. No solo escribimos código inteligente para CRM y ERP corporativos; también diseñamos soluciones de hardware dedicadas e instalaciones eléctricas certificadas que sustentan la infraestructura física de tu compañía.",
      missionTitle: "Misión",
      missionDesc: "Transformar los procesos de nuestros clientes mediante soluciones tecnológicas inteligentes, seguras y escalables, generando eficiencia, productividad y crecimiento sostenible.",
      visionTitle: "Visión",
      visionDesc: "Ser la empresa tecnológica de referencia en transformación digital e innovación, reconocida por su excelencia, confiabilidad e impacto en la modernización de organizaciones a nivel nacional e internacional.",
      valuesBadge: "Cultura & Principios",
      valuesTitle: "Valores",
      valuesDesc: "Los valores son los principios de comportamiento no negociables que guían la manera en que LUXPROC toma decisiones, se relaciona con sus clientes y desarrolla sus productos.",
      backHome: "Volver al Inicio",
      windowCorporate: "Ventana Corporativa: Nosotros",
      cultureSubtitle: "Cultura, Misión, Visión & Principios",
      statsUptime: "Uptime de Sistemas",
      statsErp: "Sistemas ERP/CRM Implementados",
      statsProjects: "Proyectos de Innovación I+D+i",
      statsSync: "Sincronización Directa Calendar",
      bottomCtaTitle: "¿Quieres conocer más sobre nuestras capacidades de ingeniería?",
      bottomCtaDesc: "Agenda una consultoría técnica directamente con nuestro equipo ejecutivo para analizar tu proyecto o requerimiento de software/hardware.",
      scheduleCta: "Agendar Consultoría de Ingeniería"
    },
    solutions: {
      badge: "Ecosistemas Integrales",
      title: "Ecosistemas Tecnológicos de Vanguardia",
      subtitle: "Desde software corporativo de misión crítica hasta diagnóstico e ingeniería de campo.",
      bookMeeting: "Agendar Reunión",
      viewDetails: "Ver detalles",
      backToOverview: "Volver al resumen",
      erpName: "LUXPROC ERP CLOUD",
      erpSector: "Gestión Corporativa & Operativa",
      erpDesc: "Plataforma integral modular para control de inventarios multialmacén, trazabilidad de compras y ventas, cuentas por cobrar y pagar, facturación y reportes analíticos con conciliación autónoma.",
      maintName: "LUXPROC MAINTENANCE CLOUD",
      maintSector: "Gestión de Mantenimiento Industrial",
      maintDesc: "Sistema cloud para la gestión proactiva de maquinaria, órdenes de trabajo (OT), horómetros, lubricación y control de repuestos críticos conforme a la norma ISO 55001.",
      diagName: "LUXPROC E-DIAGNOSIS",
      diagSector: "Auditoría & Peritaje Eléctrico",
      diagDesc: "Plataforma profesional para realizar mediciones de corriente eléctrica, diagnóstico de pozo a tierra y análisis técnico integral con informes y dossier firmado por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra (no vinculado con el CIP, SUNAT u OSE).",
      diagCompliant: "CONFORME CNE / RNE",
      diagFeature1: "Mediciones de corriente eléctrica, cargas y caída de tensión (CNE)",
      diagFeature2: "Conexiones de luminarias, focos y fotometría lux (RNE EM.010)",
      diagFeature3: "Diagnóstico de pozo a tierra y resistencia PAT (≤25Ω / IEEE 142)",
      diagFeature4: "Análisis técnico con informes y dossier firmado por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra."
    },
    calendar: {
      badge: "Sincronización en Tiempo Real",
      shieldBadge: "BLINDAJE MILITAR NIVEL 4 • PERSISTENCIA PERPETUA",
      title: "Agendar Consultoría de Ingeniería",
      description: "Reserva una reunión de 30 minutos con nuestro equipo técnico principal para analizar el plan de arquitectura web, CRM, ERP o innovación aplicada. Sincronización bidireccional automática con Google Calendar y generación de salas para Google Meet al instante.",
      retentionNotice: "Garantía de Retención Inmutable: Toda reunión generada con Google Meet y datos de cliente quedan salvaguardados en triple capa (Disco Local Inmutable + Cloud Firestore + Bóveda Criptográfica), 100% inmunes a cualquier actualización o modificación de la plataforma.",
      timezoneLabel: "Zona Horaria Activa",
      morningShift: "Turno Mañana (09:00 - 12:30)",
      afternoonShift: "Turno Tarde (13:00 - 17:30)",
      selectDay: "Día Seleccionado:",
      nameLabel: "Nombres y Apellidos *",
      emailLabel: "Correo Electrónico (Google) *",
      phoneLabel: "Número de Celular *",
      projectLabel: "Título de la Reunión / Proyecto *",
      notesLabel: "Notas / Motivo de la Consulta",
      submitButton: "Agendar Cita con Google Meet",
      loginWithGoogle: "Conectar con Google y Agendar",
      downloadIcs: "Descargar Evento (.ics)",
      successTitle: "¡Reunión Agendada con Éxito!",
      successMeetLabel: "Sala Oficial Google Meet:",
      openMeet: "Entrar a Google Meet",
      copyLink: "Copiar Enlace",
      copied: "Copiado",
      rescheduleNotice: "Los datos de su reunión y sala virtual han sido salvaguardados de forma inmutable."
    },
    contact: {
      badge: "Contacto Directo",
      title: "Hablemos de tu Proyecto",
      subtitle: "Déjanos tu mensaje y coordinaremos de inmediato o agenda directamente una sesión técnica por Google Meet.",
      nameLabel: "Nombres Completos *",
      emailLabel: "Correo Electrónico *",
      companyLabel: "Empresa / Organización",
      messageLabel: "Mensaje o Requerimiento *",
      sendButton: "Enviar Mensaje de Ingeniería",
      sending: "Enviando mensaje...",
      successMsg: "Mensaje enviado con éxito. Nuestro equipo se pondrá en contacto a la brevedad.",
      altSchedule: "¿Prefieres coordinar una reunión de 30 minutos en vivo?",
      scheduleCta: "Agendar Reunión por Google Meet"
    },
    faq: {
      badge: "Preguntas Frecuentes Técnicas & Operativas",
      title: "Resolvemos tus Dudas",
      titleHighlight: "Antes de Implementar",
      subtitle: "Respuestas transparentes sobre plazos, normativas técnicas, seguridad informática y acompañamiento en planta.",
      categories: {
        all: "Todas",
        erp: "Arquitectura ERP",
        mantenimiento: "Maintenance Cloud",
        peritaje: "Peritaje Técnico",
        general: "General"
      },
      searchPlaceholder: "Buscar pregunta o tema técnico...",
      directCtaTitle: "¿Tienes un requerimiento técnico específico o licitación?",
      directCtaDesc: "Coordina una consultoría de ingeniería directamente con nuestro equipo técnico para resolver tus consultas.",
      directCtaBtn: "Agendar Reunión por Google Meet",
      items: [
        {
          id: "implementation-time",
          category: "general",
          badge: "PLAZOS DE DESPLIEGUE",
          question: "¿Cuánto tiempo toma la puesta en marcha e implementación en planta?",
          answer: "Nuestra metodología ágil de ingeniería permite poner en marcha los módulos esenciales en 1 a 3 semanas. La fase 1 contempla la importación de catálogo de materias primas/activos y parametrización de usuarios; la fase 2 comprende la capacitación presencial en planta y pruebas piloto con lotes reales de producción; la fase 3 es la salida a producción con acompañamiento técnico continuo.",
          points: [
            "Semana 1: Levantamiento de procesos y parametrización de datos maestros.",
            "Semana 2: Pruebas piloto en línea y capacitación a operarios de taller.",
            "Semana 3: Salida en vivo (Go-Live) con soporte presencial y remoto."
          ]
        },
        {
          id: "operator-training",
          category: "erp",
          badge: "CAPACITACIÓN EN PLANTA",
          question: "¿Cómo capacitan al personal operativo con poca experiencia informática?",
          answer: "Diseñamos interfaces táctiles ultrarrápidas pensadas para operarios de taller y planta (botones grandes, lector de código de barras / QR y confirmación visual por colores). Además, realizamos jornadas presenciales de capacitación en las estaciones de trabajo, entregamos manuales ilustrados paso a paso en PDF y videos breves accesibles desde el celular del operario.",
          points: [
            "Flujo táctil simplificado de máximo 2 toques para registrar avance de producción.",
            "Validación de insumos con lectura óptica de código de barras / QR.",
            "Manuales operativos plastificados para taller y soporte directo."
          ]
        },
        {
          id: "cip-indeci",
          category: "peritaje",
          badge: "PERITAJE TÉCNICO",
          question: "¿Los informes de peritaje y pozo a tierra cuentan con firma y respaldo profesional?",
          answer: "Absolutamente. Cada expediente de peritaje eléctrico, medición de resistencia de pozo a tierra (PAT), termografía infrarroja y protocolo de pruebas es emitido y firmado por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra. Todos los informes y protocolos se elaboran conforme a las normas CNE y normativas técnicas de seguridad en edificaciones e inspecciones técnicas. Cabe precisar que los servicios y desarrollos son de autoría y responsabilidad profesional privada de la empresa y no implican vinculación institucional ni endoso por parte del Colegio de Ingenieros (CIP), SUNAT u OSE.",
          points: [
            "Expedientes firmados por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra.",
            "Protocolos de pruebas de puesta a tierra con telurómetro certificado y calibrado.",
            "Dossier pericial conforme a las normas CNE Suministro / Utilización y RNE EM.010.",
            "Aviso legal: Los trabajos profesionales se emiten de forma independiente y no representan vinculación con el CIP, SUNAT u OSE."
          ]
        },
        {
          id: "cloud-security",
          category: "mantenimiento",
          badge: "SEGURIDAD & SOBERANÍA",
          question: "¿Qué nivel de seguridad y soberanía tienen nuestros datos industriales en la nube?",
          answer: "Toda la información reside en servidores cloud de alta disponibilidad con redundancia geográfica y encriptación de grado bancario (TLS 1.3 en tránsito y AES-256 en reposo). Realizamos copias de seguridad (backups) automáticas diarias y cada cliente cuenta con aislamiento de base de datos. Usted mantiene la propiedad exclusiva de sus datos y puede exportar inventarios y reportes en Excel/PDF en cualquier momento.",
          points: [
            "Aislamiento por cliente con bases de datos independientes.",
            "Copias de respaldo automáticas cada 24 horas en centros de datos Tier III.",
            "Exportación completa de datos en formato Excel, CSV y JSON con un solo clic."
          ]
        },
        {
          id: "legacy-machines",
          category: "mantenimiento",
          badge: "ACTIVOS & MAQUINARIA",
          question: "¿Puedo integrar maquinaria antigua o tableros existentes a LUXPROC Maintenance Cloud?",
          answer: "Sí. LUXPROC Cloud Maintenance System está concebido tanto para equipos modernos con telemetría como para maquinaria electromecánica clásica. Para equipos antiguos, el sistema gestiona planes de lubricación, reemplazo de rodamientos por horómetro, checklists predictivos y control de repuestos críticos sin necesidad de sensores costosos.",
          points: [
            "Gestión de órdenes de trabajo (OT) para cualquier tipo de máquina industrial.",
            "Planes sistemáticos de lubricación y engrase basados en horas de marcha.",
            "Módulos opcionales de telemetría IoT para tableros eléctricos y motores principales."
          ]
        },
        {
          id: "support-sla",
          category: "general",
          badge: "SOPORTE TÉCNICO",
          question: "¿Qué cobertura de soporte técnico y mantenimiento ofrecen posventa?",
          answer: "Ofrecemos acuerdos de nivel de servicio (SLA) con tickets de ingeniería con respuesta menor a 30 minutos hábiles y visitas técnicas presenciales programadas. Las actualizaciones continuas de seguridad y optimización del sistema están incluidas.",
          points: [
            "Atención directa para agendar consultas técnicas y soporte de ingeniería.",
            "Tiempo de primera respuesta garantizado inferior a 30 minutos hábiles.",
            "Actualizaciones continuas de seguridad y estabilidad sin costo adicional."
          ]
        }
      ]
    },
    footer: {
      desc: "Líderes en ingeniería física y digital integrada. Desarrollamos ERPs, CRMs avanzados, arquitecturas web escalables y lideramos proyectos de innovación científica (I+D+i) para orquestar la eficiencia del mañana.",
      brochureBtn: "Dossier / Brochure 2026",
      ecosystems: "Ecosistemas",
      erp: "Plataformas ERP",
      maint: "Maintenance Cloud",
      diagnosis: "Peritaje Eléctrico CNE",
      faq: "Preguntas Frecuentes",
      policiesTitle: "Políticas e Integraciones",
      policiesDesc: "Ecosistema orquestado mediante OAuth seguro e integrado de manera nativa con Google Calendar API y Google Meet API.",
      transparencyTitle: "Transparencia y Leyes",
      rights: "Todos los derechos reservados.",
      legalNotice: "Servicios profesionales independientes. Todo lo que se crea no está vinculado con el CIP, SUNAT u OSE.",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
      bookConsultation: "Agendar Reunión"
    }
  },

  en: {
    nav: {
      about: "About Us",
      solutions: "Solutions",
      faq: "FAQ",
      networks: "Social",
      secureSite: "Secure Site",
      brochure: "Brochure PDF",
      bookNow: "Book Now",
      language: "Language",
      networkTitle: "Our Social Networks",
      networkSubtitle: "Channels in preparation (Not yet active)",
      networkNotice: "Notice: Our social media accounts are in preparation and not yet active. To contact us or schedule technical advisory, please book directly via Google Meet.",
      networkInactiveBadge: "Not active yet • Coming soon",
      networkActiveBadge: "Official Active Channel",
      scheduleSession: "Schedule Meeting",
      close: "Close",
    },
    hero: {
      badge: "Engineering Consultation & Complete Software",
      typewriter: {
        part1: "ERP, CRM Systems & ",
        part2: "Modern Development",
        part3: " Without Friction."
      },
      description: "We design comprehensive technology solutions uniting scalable software, intelligent logistics control, and custom hardware engineering. Schedule an automated Google Meet consultation today.",
      bookCta: "Book Free Consultation",
      exploreCta: "Explore ERP/CRM Solutions",
      brochureBtn: "Brochure 2026 (PDF)",
      check1: "30-minute sync without collisions",
      check2: "Physical Engineering & R&D Innovation",
      dashEfficiency: "ERP EFFICIENCY",
      dashRealtime: "Real-time optimization",
      dashAutoProcesses: "AUTOMATED PROCESSES",
      dashMeetConnected: "Google Meet Connection",
      dashMeetStatus: "Calendar Sync Stable",
      dashDevTitle: "CUSTOM DEVELOPMENT",
      dashPhase: "R&D PHASE",
      dashConnected: "CONNECTED",
      dashLogs: [
        "Google Meet Sync: ACTIVE (0 collisions)",
        "ERP Engine: Processing real-time inventory queue",
        "API Gateway: TLS 1.3 WebSocket transmission 100% OK",
        "R&D Module: Automatic microservices deployment"
      ]
    },
    marquee: {
      title: "TECHNOLOGIES & INDUSTRIAL ALLIANCES"
    },
    business: {
      badge: "About Us — LUXPROC Culture & Principles",
      title1: "Architects of the ",
      title2: "Digital Future",
      desc: "LUXPROC was founded to unify advanced hardware engineering, mission-critical software development (ERPs, CRMs), and scientific R&D innovation to generate real and lasting impact.",
      whatWeDoTitle: "What We Do",
      whatWeDoDesc: "We design, engineer, and implement comprehensive enterprise ecosystems. We don't just write intelligent code for corporate CRM and ERPs; we also engineer dedicated hardware solutions and certified electrical installations supporting your company's physical infrastructure.",
      missionTitle: "Mission",
      missionDesc: "To transform our clients' operations through intelligent, secure, and scalable technology solutions, driving efficiency, productivity, and sustainable growth.",
      visionTitle: "Vision",
      visionDesc: "To be the benchmark technology firm in digital transformation and innovation, recognized for its excellence, reliability, and impact on modernizing organizations worldwide.",
      valuesBadge: "Culture & Principles",
      valuesTitle: "Values",
      valuesDesc: "Our values are non-negotiable principles that guide how LUXPROC makes decisions, engages clients, and engineers products.",
      backHome: "Back to Home",
      windowCorporate: "Corporate Window: About Us",
      cultureSubtitle: "Culture, Mission, Vision & Principles",
      statsUptime: "System Uptime",
      statsErp: "Deployed ERP/CRM Systems",
      statsProjects: "R&D Innovation Projects",
      statsSync: "Direct Calendar Sync",
      bottomCtaTitle: "Want to learn more about our engineering capabilities?",
      bottomCtaDesc: "Book an engineering consultation directly with our executive team to review your software or hardware requirements.",
      scheduleCta: "Schedule Engineering Consultation"
    },
    solutions: {
      badge: "End-to-End Solutions",
      title: "Cutting-Edge Technological Ecosystems",
      subtitle: "From mission-critical enterprise software to field diagnostics and engineering.",
      bookMeeting: "Schedule Meeting",
      viewDetails: "View details",
      backToOverview: "Back to overview",
      erpName: "LUXPROC ERP CLOUD",
      erpSector: "Corporate & Operational Management",
      erpDesc: "Modular enterprise platform for multi-warehouse inventory control, procurement and sales tracking, accounts payable/receivable, invoicing, and autonomous analytical reporting.",
      maintName: "LUXPROC MAINTENANCE CLOUD",
      maintSector: "Industrial Maintenance Management",
      maintDesc: "Cloud system for proactive machinery management, work orders (WO), hour meters, lubrication, and critical spare parts control compliant with ISO 55001.",
      diagName: "LUXPROC E-DIAGNOSIS",
      diagSector: "Electrical Audit & Diagnostics",
      diagDesc: "Professional platform for electrical current measurements, ground resistance diagnostics, and comprehensive technical analysis with reports signed by an engineer registered with their CIP code, specialty, and department (not institutionally affiliated with CIP, SUNAT, or OSE).",
      diagCompliant: "CNE / RNE COMPLIANT",
      diagFeature1: "Electrical current, load balance and voltage drop measurements (CNE)",
      diagFeature2: "Lighting fixtures and lux photometry calculations (RNE EM.010)",
      diagFeature3: "Ground resistance diagnostics and PAT tests (≤25Ω / IEEE 142)",
      diagFeature4: "Comprehensive technical analysis with reports signed by an engineer registered with their CIP code, specialty, and department."
    },
    calendar: {
      badge: "Real-Time Synchronization",
      shieldBadge: "MILITARY SHIELD LEVEL 4 • PERPETUAL PERSISTENCE",
      title: "Schedule Engineering Consultation",
      description: "Book a 30-minute session with our lead engineering team to review your web architecture, CRM, ERP, or applied innovation plan. Automatic two-way sync with Google Calendar and instant Google Meet room generation.",
      retentionNotice: "Immutable Retention Guarantee: Every meeting created with Google Meet and client records are safeguarded in three layers (Local Immutable Disk + Cloud Firestore + Encrypted Vault), 100% immune to updates or changes.",
      timezoneLabel: "Active Timezone",
      morningShift: "Morning Shift (09:00 - 12:30)",
      afternoonShift: "Afternoon Shift (13:00 - 17:30)",
      selectDay: "Selected Day:",
      nameLabel: "Full Name *",
      emailLabel: "Email Address (Google) *",
      phoneLabel: "Mobile Phone *",
      projectLabel: "Meeting Title / Project *",
      notesLabel: "Notes / Consultation Reason",
      submitButton: "Schedule Meeting with Google Meet",
      loginWithGoogle: "Connect with Google and Schedule",
      downloadIcs: "Download Event (.ics)",
      successTitle: "Meeting Scheduled Successfully!",
      successMeetLabel: "Official Google Meet Room:",
      openMeet: "Join Google Meet",
      copyLink: "Copy Link",
      copied: "Copied",
      rescheduleNotice: "Your meeting details and virtual room have been saved with immutable persistence."
    },
    contact: {
      badge: "Direct Contact",
      title: "Let's Talk About Your Project",
      subtitle: "Leave your message and we will get back to you promptly, or book a direct technical session on Google Meet.",
      nameLabel: "Full Name *",
      emailLabel: "Email Address *",
      companyLabel: "Company / Organization",
      messageLabel: "Message or Requirement *",
      sendButton: "Send Engineering Message",
      sending: "Sending message...",
      successMsg: "Message sent successfully. Our team will contact you shortly.",
      altSchedule: "Prefer a direct 30-minute live video meeting?",
      scheduleCta: "Schedule on Google Meet"
    },
    faq: {
      badge: "Technical & Operational FAQ",
      title: "Frequently Asked Questions",
      titleHighlight: "Before Deployment",
      subtitle: "Transparent answers regarding timelines, technical standards, IT security, and onsite plant guidance.",
      categories: {
        all: "All",
        erp: "ERP Architecture",
        mantenimiento: "Maintenance Cloud",
        peritaje: "Technical Audits",
        general: "General"
      },
      searchPlaceholder: "Search question or technical topic...",
      directCtaTitle: "Have a specific technical requirement or bidding proposal?",
      directCtaDesc: "Coordinate an engineering consultation directly with our technical team to resolve all doubts.",
      directCtaBtn: "Schedule on Google Meet",
      items: [
        {
          id: "implementation-time",
          category: "general",
          badge: "DEPLOYMENT TIMELINE",
          question: "How long does onsite plant implementation take?",
          answer: "Our agile engineering methodology enables deployment of core modules within 1 to 3 weeks. Phase 1 covers catalog imports and user setup; Phase 2 includes onsite plant training and pilot testing with real batches; Phase 3 is the live rollout with continuous technical guidance.",
          points: [
            "Week 1: Process mapping and master data configuration.",
            "Week 2: On-line pilot testing and operator workshop training.",
            "Week 3: Go-Live with both onsite and remote engineering support."
          ]
        },
        {
          id: "operator-training",
          category: "erp",
          badge: "ONSITE TRAINING",
          question: "How do you train operators with minimal computer experience?",
          answer: "We design ultra-fast touch interfaces engineered for plant operators (large buttons, barcode/QR readers, and intuitive color-coded feedback). We also deliver hands-on training sessions, illustrated PDF guides, and short video tutorials accessible on mobile devices.",
          points: [
            "Simplified 2-touch workflow to log production progress.",
            "Material validation with optical barcode/QR scanning.",
            "Laminated shop-floor manuals and direct support."
          ]
        },
        {
          id: "cip-indeci",
          category: "peritaje",
          badge: "TECHNICAL AUDITS",
          question: "Are electrical audit and grounding reports signed by a registered engineer?",
          answer: "Yes, absolutely. Each electrical audit dossier, grounding PAT test, infrared thermography, and test protocol is issued and signed by an engineer registered with their CIP code, specialty, and department. All reports are developed according to CNE standards and safety regulations. Please note that our services are professional private works and do not imply institutional affiliation with or endorsement by the CIP, SUNAT, or OSE.",
          points: [
            "Files signed by an engineer registered with their CIP code, specialty, and department.",
            "Grounding test protocols using calibrated and certified meters.",
            "Technical dossier compliant with CNE and RNE EM.010 standards.",
            "Disclaimer: Professional work is performed independently and is not affiliated with CIP, SUNAT, or OSE."
          ]
        },
        {
          id: "cloud-security",
          category: "mantenimiento",
          badge: "SECURITY & SOVEREIGNTY",
          question: "What level of security and sovereignty do our industrial cloud records have?",
          answer: "All records reside in high-availability cloud servers with geographic redundancy and bank-grade encryption (TLS 1.3 in transit and AES-256 at rest). We perform automatic daily backups with database isolation per tenant. You maintain exclusive data ownership.",
          points: [
            "Isolated tenant databases.",
            "Automatic 24-hour backup copies in Tier III certified centers.",
            "Full data export in Excel, CSV, and JSON with one click."
          ]
        },
        {
          id: "legacy-machines",
          category: "mantenimiento",
          badge: "MACHINERY ASSETS",
          question: "Can I connect older machinery to LUXPROC Maintenance Cloud?",
          answer: "Yes. LUXPROC Maintenance Cloud supports modern telemetric machinery as well as classic electromechanical equipment. For legacy equipment, the system handles lubrication schedules, bearing replacements by hour-meter, and critical spares control without expensive sensors.",
          points: [
            "Work order management (WO) for all industrial equipment types.",
            "Systematic lubrication and greasing plans based on running hours.",
            "Optional IoT telemetry modules for electrical distribution boards."
          ]
        },
        {
          id: "support-sla",
          category: "general",
          badge: "TECHNICAL SUPPORT",
          question: "What technical support and maintenance coverage is provided?",
          answer: "We offer Service Level Agreements (SLA) with engineering ticket response times under 30 business minutes and scheduled onsite visits. Ongoing security updates and stability improvements are fully included.",
          points: [
            "Direct scheduling for engineering consultation and technical support.",
            "Guaranteed first response time under 30 business minutes.",
            "Continuous security and performance enhancements included."
          ]
        }
      ]
    },
    footer: {
      desc: "Leaders in integrated physical and digital engineering. We develop advanced ERPs, CRMs, scalable web architectures, and lead scientific R&D innovation for tomorrow's efficiency.",
      brochureBtn: "Dossier / Brochure 2026",
      ecosystems: "Ecosystems",
      erp: "ERP Platforms",
      maint: "Maintenance Cloud",
      diagnosis: "Electrical Audit CNE",
      faq: "FAQ",
      policiesTitle: "Policies & Integrations",
      policiesDesc: "Ecosystem orchestrated via secure OAuth, natively integrated with Google Calendar API and Google Meet API.",
      transparencyTitle: "Transparency & Legal",
      rights: "All rights reserved.",
      legalNotice: "Independent professional services. Everything created is not affiliated with CIP, SUNAT, or OSE.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      bookConsultation: "Schedule Meeting"
    }
  },

  pt: {
    nav: {
      about: "Sobre Nós",
      solutions: "Soluções",
      faq: "FAQ",
      networks: "Redes",
      secureSite: "Site Seguro",
      brochure: "Catálogo PDF",
      bookNow: "Agendar Agora",
      language: "Idioma",
      networkTitle: "Nossas Redes Sociais",
      networkSubtitle: "Canais em preparação (Ainda não estão ativas)",
      networkNotice: "Aviso: Nossas redes sociais ainda não estão ativas. Para nos contatar ou agendar consultoria técnica, agende diretamente pelo Google Meet.",
      networkInactiveBadge: "Ainda não ativa • Em breve",
      networkActiveBadge: "Canal Oficial Ativo",
      scheduleSession: "Agendar Reunião",
      close: "Fechar",
    },
    hero: {
      badge: "Consultoria de Engenharia & Software Completo",
      typewriter: {
        part1: "Sistemas ERP, CRM e ",
        part2: "Desenvolvimento Moderno",
        part3: " Sem Fricções."
      },
      description: "Desenvolvemos soluções tecnológicas integrais que unem software escalável, controle logístico inteligente e engenharia de hardware sob medida. Agende uma consultoria automatizada no Google Meet hoje.",
      bookCta: "Agendar Consultoria Gratuita",
      exploreCta: "Explorar Soluções ERP/CRM",
      brochureBtn: "Catálogo 2026 (PDF)",
      check1: "Sincronização em 30 minutos sem colisões",
      check2: "Engenharia Física e Inovação (P&D)",
      dashEfficiency: "EFICIÊNCIA ERP",
      dashRealtime: "Otimização em tempo real",
      dashAutoProcesses: "PROCESSOS AUTOM.",
      dashMeetConnected: "Conexão Google Meet",
      dashMeetStatus: "Sincronização de Calendário Estável",
      dashDevTitle: "DESENVOLVIMENTO SOB MEDIDA",
      dashPhase: "FASE P&D",
      dashConnected: "CONECTADO",
      dashLogs: [
        "Sincronização Google Meet: ATIVA (0 colisões)",
        "Motor ERP: Processando fila de estoque em tempo real",
        "API Gateway: Transmissão TLS 1.3 WebSocket 100% OK",
        "Módulo P&D: Implantação automática de microsserviços"
      ]
    },
    marquee: {
      title: "TECNOLOGIAS E ALIANÇAS INDUSTRIAIS"
    },
    business: {
      badge: "Sobre Nós — Cultura & Princípios LUXPROC",
      title1: "Arquitetos do ",
      title2: "Futuro Digital",
      desc: "A LUXPROC nasceu com a visão de unificar engenharia avançada de hardware, desenvolvimento de software de missão crítica (ERPs, CRMs) e projetos de inovação científica (P&D) para criar impacto real e sustentável.",
      whatWeDoTitle: "O Que Fazemos?",
      whatWeDoDesc: "Projetamos, desenvolvemos e implementamos ecossistemas empresariais integrais. Não apenas criamos software inteligente para CRM e ERP corporativos; também projetamos soluções de hardware dedicadas e instalações elétricas certificadas que sustentam a infraestrutura física da sua empresa.",
      missionTitle: "Missão",
      missionDesc: "Transformar os processos dos nossos clientes por meio de soluções tecnológicas inteligentes, seguras e escaláveis, promovendo eficiência, produtividade e crescimento sustentável.",
      visionTitle: "Visão",
      visionDesc: "Ser a empresa de tecnologia de referência em transformação digital e inovação, reconhecida pela excelência, confiabilidade e impacto na modernização de organizações nacional e internacionalmente.",
      valuesBadge: "Cultura & Princípios",
      valuesTitle: "Valores",
      valuesDesc: "Os valores são os princípios inegociáveis que orientam a tomada de decisões da LUXPROC, suas relações com clientes e o desenvolvimento de seus produtos.",
      backHome: "Voltar ao Início",
      windowCorporate: "Janela Corporativa: Sobre Nós",
      cultureSubtitle: "Cultura, Missão, Visão e Princípios",
      statsUptime: "Disponibilidade de Sistemas",
      statsErp: "Sistemas ERP/CRM Implementados",
      statsProjects: "Projetos de Inovação P&D",
      statsSync: "Sincronização Direta Calendar",
      bottomCtaTitle: "Deseja saber mais sobre nossas capacidades de engenharia?",
      bottomCtaDesc: "Agende uma consultoria técnica diretamente com nossa equipe executiva para avaliar seu projeto de software ou hardware.",
      scheduleCta: "Agendar Consultoria de Engenharia"
    },
    solutions: {
      badge: "Soluções Integrais",
      title: "Ecossistemas Tecnológicos de Vanguarda",
      subtitle: "Do software corporativo de missão crítica à auditoria e engenharia física de campo.",
      bookMeeting: "Agendar Reunião",
      viewDetails: "Ver detalhes",
      backToOverview: "Voltar ao resumo",
      erpName: "LUXPROC ERP CLOUD",
      erpSector: "Gestão Corporativa & Operacional",
      erpDesc: "Plataforma corporativa modular para controle de estoques multidepósito, compras, vendas, contas a pagar e receber, faturamento e relatórios analíticos com conciliação autônoma.",
      maintName: "LUXPROC MAINTENANCE CLOUD",
      maintSector: "Gestão de Manutenção Industrial",
      maintDesc: "Sistema cloud para gestão proativa de maquinário, ordens de serviço (OS), horímetros, lubrificação e controle de peças sobressalentes em conformidade com a ISO 55001.",
      diagName: "LUXPROC E-DIAGNOSIS",
      diagSector: "Auditoria & Diagnóstico Elétrico",
      diagDesc: "Plataforma profissional para medição de corrente elétrica, diagnóstico de aterramento e análise técnica com laudos e dossiê assinado por engenheiro registrado com código CIP, especialidade e departamento (sem vinculação institucional com o CIP, SUNAT ou OSE).",
      diagCompliant: "CONFORME CNE / RNE",
      diagFeature1: "Medições de corrente elétrica, carga e queda de tensão (CNE)",
      diagFeature2: "Conexões de luminárias e fotometria lux (RNE EM.010)",
      diagFeature3: "Diagnóstico de aterramento e resistência PAT (≤25Ω / IEEE 142)",
      diagFeature4: "Análise técnica com relatórios e dossiê assinado por engenheiro registrado com código CIP, especialidade e departamento."
    },
    calendar: {
      badge: "Sincronização em Tempo Real",
      shieldBadge: "BLINDAGEM MILITAR NÍVEL 4 • PERSISTÊNCIA PERPÉTUA",
      title: "Agendar Consultoria de Engenharia",
      description: "Reserve uma reunião de 30 minutos com nossa equipe técnica principal para analisar seu plano de arquitetura web, CRM, ERP ou inovação aplicada. Sincronização automática com Google Calendar e criação instantânea de salas no Google Meet.",
      retentionNotice: "Garantia de Retenção Imutável: Todas as reuniões criadas com Google Meet e dados de clientes são salvaguardados em três camadas (Disco Local Imutável + Cloud Firestore + Cofre Criptografado), 100% imunes a atualizações ou modificações.",
      timezoneLabel: "Fuso Horário Ativo",
      morningShift: "Turno da Manhã (09:00 - 12:30)",
      afternoonShift: "Turno da Tarde (13:00 - 17:30)",
      selectDay: "Dia Selecionado:",
      nameLabel: "Nome Completo *",
      emailLabel: "E-mail (Google) *",
      phoneLabel: "Telefone Celular *",
      projectLabel: "Título da Reunião / Projeto *",
      notesLabel: "Notas / Motivo da Consulta",
      submitButton: "Agendar Reunião no Google Meet",
      loginWithGoogle: "Conectar com Google e Agendar",
      downloadIcs: "Baixar Evento (.ics)",
      successTitle: "Reunião Agendada com Sucesso!",
      successMeetLabel: "Sala Oficial Google Meet:",
      openMeet: "Entrar no Google Meet",
      copyLink: "Copiar Link",
      copied: "Copiado",
      rescheduleNotice: "Os detalhes da sua reunião e da sala virtual foram salvos com persistência imutável."
    },
    contact: {
      badge: "Contato Direto",
      title: "Vamos Falar Sobre o Seu Projeto",
      subtitle: "Deixe sua mensagem e responderemos de imediato, ou agende diretamente uma videoconferência no Google Meet.",
      nameLabel: "Nome Completo *",
      emailLabel: "E-mail Corporativo *",
      companyLabel: "Empresa / Organização",
      messageLabel: "Mensagem ou Requisito *",
      sendButton: "Enviar Mensagem de Engenharia",
      sending: "Enviando mensagem...",
      successMsg: "Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.",
      altSchedule: "Prefere agendar uma reunião ao vivo de 30 minutos?",
      scheduleCta: "Agendar Reunião no Google Meet"
    },
    faq: {
      badge: "Perguntas Frequentes Técnicas & Operacionais",
      title: "Esclarecemos Suas Dúvidas",
      titleHighlight: "Antes da Implantação",
      subtitle: "Respostas transparentes sobre prazos, normas técnicas, segurança da informação e acompanhamento presencial em planta.",
      categories: {
        all: "Todas",
        erp: "Arquitetura ERP",
        mantenimiento: "Maintenance Cloud",
        peritaje: "Vistorias Técnicas",
        general: "Geral"
      },
      searchPlaceholder: "Buscar pergunta ou tema técnico...",
      directCtaTitle: "Tem uma solicitação técnica específica ou licitação?",
      directCtaDesc: "Agende uma consultoria de engenharia diretamente com nossa equipe técnica para esclarecer suas dúvidas.",
      directCtaBtn: "Agendar Reunião no Google Meet",
      items: [
        {
          id: "implementation-time",
          category: "general",
          badge: "PRAZOS DE IMPLANTAÇÃO",
          question: "Quanto tempo leva a implantação na fábrica?",
          answer: "Nossa metodologia ágil de engenharia permite implantar os módulos essenciais em 1 a 3 semanas. A fase 1 contempla a importação do catálogo de insumos/ativos e configuração de usuários; a fase 2 compreende o treinamento presencial e testes-piloto com lotes reais; a fase 3 é a entrada em produção com suporte contínuo.",
          points: [
            "Semana 1: Mapeamento de processos e parametrização de dados mestre.",
            "Semana 2: Testes-piloto e treinamento da equipe de chão de fábrica.",
            "Semana 3: Entrada em produção (Go-Live) com suporte presencial e remoto."
          ]
        },
        {
          id: "operator-training",
          category: "erp",
          badge: "TREINAMENTO EM PLANTA",
          question: "Como treinam operadores com pouca experiência em informática?",
          answer: "Desenvolvemos interfaces touch ultra-rápidas para operadores de fábrica (botões grandes, leitor de código de barras / QR e confirmação visual colorida). Realizamos capacitações práticas nas estações de trabalho, manuais ilustrados em PDF e vídeos curtos acessíveis pelo celular.",
          points: [
            "Fluxo touch simplificado de no máximo 2 toques para apontar produção.",
            "Validação de insumos com leitura óptica de código de barras / QR.",
            "Manuais plastificados para fábrica e suporte técnico direto."
          ]
        },
        {
          id: "cip-indeci",
          category: "peritaje",
          badge: "VISTORIA TÉCNICA",
          question: "Os laudos de aterramento e vistoria elétrica contam com assinatura profissional?",
          answer: "Sim, com certeza. Cada dossiê de perícia elétrica, medição de resistência de aterramento (PAT), termografia e protocolo de teste é emitido e assinado pelo engenheiro registrado com seu código CIP, especialidade e departamento onde se encontra. Todos os laudos são elaborados conforme normas CNE e regulamentos de segurança. Ressaltamos que os serviços são trabalhos profissionais independentes e não possuem vínculo institucional com o CIP, SUNAT ou OSE.",
          points: [
            "Laudos assinados pelo engenheiro registrado com seu código CIP, especialidade e departamento onde se encontra.",
            "Protocolos de medição de aterramento com terrômetro certificado e calibrado.",
            "Dossiê em conformidade com as normas técnicas CNE e RNE EM.010.",
            "Aviso legal: Os trabalhos profissionais são emitidos de forma independente e não representam vinculação com CIP, SUNAT ou OSE."
          ]
        },
        {
          id: "cloud-security",
          category: "mantenimiento",
          badge: "SEGURANÇA & SOBERANIA",
          question: "Qual o nível de segurança e soberania dos nossos dados industriais na nuvem?",
          answer: "Todas as informações residem em servidores cloud de alta disponibilidade com redundância geográfica e criptografia de nível bancário (TLS 1.3 em trânsito e AES-256 em repouso). Realizamos backups automáticos diários com isolamento de banco de dados por cliente.",
          points: [
            "Isolamento por cliente com bancos de dados independentes.",
            "Backups automáticos a cada 24 horas em data centers Tier III.",
            "Exportação completa de dados em Excel, CSV e JSON com um clique."
          ]
        },
        {
          id: "legacy-machines",
          category: "mantenimiento",
          badge: "ATIVOS E MAQUINÁRIO",
          question: "Posso integrar maquinário antigo ao LUXPROC Maintenance Cloud?",
          answer: "Sim. O LUXPROC Maintenance Cloud foi projetado tanto para equipamentos modernos com telemetria quanto para maquinário clássico. Para máquinas antigas, o sistema gerencia planos de lubrificação, horímetros e estoque de peças sobressalentes sem a necessidade de sensores caros.",
          points: [
            "Gestão de ordens de serviço (OS) para qualquer tipo de máquina industrial.",
            "Planos sistemáticos de lubrificação baseados em horas de operação.",
            "Módulos opcionais de telemetria IoT para painéis elétricos e motores."
          ]
        },
        {
          id: "support-sla",
          category: "general",
          badge: "SUPORTE TÉCNICO",
          question: "Qual a cobertura de suporte técnico e manutenção pós-venda?",
          answer: "Oferecemos Acordos de Nível de Serviço (SLA) com atendimento a chamados em menos de 30 minutos úteis e visitas técnicas programadas. Atualizações contínuas de segurança e melhorias do sistema estão totalmente incluídas.",
          points: [
            "Atendimento direto para agendar reuniões técnicas e suporte de engenharia.",
            "Tempo de primeira resposta garantido inferior a 30 minutos úteis.",
            "Atualizações contínuas de segurança e estabilidade sem custo adicional."
          ]
        }
      ]
    },
    footer: {
      desc: "Líderes em engenharia física e digital integrada. Desenvolvemos ERPs, CRMs avançados, arquiteturas web escaláveis e lideramos projetos de inovação científica (P&D) para orquestrar a eficiência do amanhã.",
      brochureBtn: "Catálogo / Brochure 2026",
      ecosystems: "Ecossistemas",
      erp: "Plataformas ERP",
      maint: "Maintenance Cloud",
      diagnosis: "Auditoria Elétrica CNE",
      faq: "FAQ",
      policiesTitle: "Políticas e Integrações",
      policiesDesc: "Ecossistema protegido por OAuth seguro e integrado nativamente com Google Calendar API e Google Meet API.",
      transparencyTitle: "Transparência e Leis",
      rights: "Todos os direitos reservados.",
      legalNotice: "Serviços profissionais independentes. Tudo o que é criado não possui vinculação institucional com o CIP, SUNAT ou OSE.",
      terms: "Termos e Condições",
      privacy: "Política de Privacidade",
      bookConsultation: "Agendar Reunião"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS["es"];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: TRANSLATIONS.es,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("luxproc_lang");
      if (saved === "es" || saved === "en" || saved === "pt") {
        return saved;
      }
    }
    return "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("luxproc_lang", lang);
      document.documentElement.lang = lang;
    } catch (e) {}
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch (e) {}
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.es,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
