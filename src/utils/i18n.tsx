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
      scheduleCta: "Agendar Consultoría de Ingeniería",
      valuesList: [
        {
          title: "Confianza",
          text: "Cada solución entregada por LUXPROC debe ser predecible, segura y respaldada por un soporte real. La confianza se construye con cumplimiento sostenido en el tiempo, no con promesas puntuales."
        },
        {
          title: "Innovación",
          text: "LUXPROC adopta de forma temprana pero responsable las tecnologías emergentes (inteligencia artificial, automatización, IoT) siempre subordinadas a la resolución de un problema real del cliente."
        },
        {
          title: "Excelencia técnica",
          text: "El estándar de calidad de código, arquitectura de sistemas e infraestructura no se negocia por plazos ni presupuesto. La excelencia técnica es la base silenciosa que sostiene la confiabilidad de la marca."
        },
        {
          title: "Cercanía y claridad",
          text: "A pesar de operar en un sector altamente técnico, LUXPROC se comunica sin jerga innecesaria, explicando el valor de negocio de cada solución en términos que cualquier cliente pueda comprender."
        },
        {
          title: "Escalabilidad y flexibilidad",
          text: "Las soluciones se diseñan pensando en el crecimiento futuro del cliente, evitando arquitecturas rígidas que generen deuda técnica o dependencias insostenibles a mediano plazo."
        }
      ]
    },
    solutions: {
      headerBadge: "Nuestras Soluciones Corporativas",
      headerTitle: "Ingeniería que trasciende límites",
      headerDesc: "Unificamos el espectro tecnológico completo. Desde la consultoría e implementación de software de planificación empresarial (ERP) y relaciones comerciales (CRM), hasta el diseño de hardware robusto y automatizaciones industriales (instalaciones eléctricas).",
      viewAllBtn: "Ver Vista Completa de Soluciones",
      knowMore: "Conocer más especificaciones",
      items: {
        crm: {
          title: "Soluciones CRM a la Medida",
          description: "Sistemas avanzados de retención, automatización de embudos comerciales y fidelización de clientes con integraciones omnicanal.",
          badge: "Software",
          details: "Sistemas CRM robustos diseñados desde cero o integrados con plataformas líderes. Automatizamos sus flujos de ventas y de soporte de extremo a extremo.",
          features: [
            "WhatsApp API integrada & CRM Multiagente",
            "Módulo de Campañas automatizadas y segmentación",
            "Reportabilidad BI avanzada y analítica en tiempo real",
            "Modelos IA predictivos para scoring de leads"
          ]
        },
        erp: {
          title: "Ecosistemas ERP de Clase Mundial",
          description: "Automatización total de inventarios, contabilidad, adquisiciones y logística integral, centralizando la toma de decisiones empresariales.",
          badge: "Enterprise",
          details: "Soporte completo para facturación electrónica, adquisiciones, control de inventario multialmacén y contabilidad integrada.",
          features: [
            "Facturación Electrónica corporativa",
            "Gestión Multibodega y trazabilidad en tiempo real",
            "Control de Activos, Costos de Importación y Compras",
            "Contabilidad analítica y libros integrados"
          ]
        },
        web: {
          title: "Arquitectura Web Moderna",
          description: "Plataformas web ultra-veloces SSR/ISR utilizando React, Next.js y Tailwind CSS, optimizadas nativamente para SEO (Motores de Búsqueda) y UX.",
          badge: "Sistemas",
          details: "Portales de alto rendimiento y arquitecturas web optimizadas para ofrecer la mejor velocidad de carga posible y un posicionamiento orgánico imbatible.",
          features: [
            "Tiempo de carga récord (Core Web Vitals óptimos)",
            "Estructura optimizada para SEO y conversiones",
            "Pasarelas de Pago integradas con cifrado SSL",
            "Infraestructura Cloud autoadaptativa (Serverless)"
          ]
        },
        electricidad: {
          title: "Instalaciones Eléctricas de Alta Potencia",
          description: "Ingeniería eléctrica, automatizaciones de tableros industriales y cableado estructurado según normativas de seguridad internacionales.",
          badge: "Hardware & Electricidad",
          details: "Servicios certificados para el tendido, estructurado y montaje de tableros de transferencia, control industrial PLC y automatizaciones generales.",
          features: [
            "Planos e Ingeniería certificada conforme a normas CNE",
            "Tableros con medición telemétrica IP integrada",
            "Sistemas de respaldo de energía y UPS industriales",
            "Optimización de factor de potencia y eficiencia de red"
          ]
        },
        hardware: {
          title: "Hardware y Software a Medida",
          description: "Diseño de firmware, integración de sensores IoT, desarrollo de microcontroladores y programación integrada de bajo nivel.",
          badge: "Integración Física",
          details: "Ingeniería de hardware integrada con desarrollo de placas PCB personalizadas, conectividad IoT de largo alcance y telemetría de campo.",
          features: [
            "Diseño de placas de circuito impreso PCB multicapa",
            "Firmware robusto basado en RTOS (Real-time OS)",
            "Conectividad inalámbrica avanzada (LoRaWAN, LTE-M)",
            "Monitoreo continuo con telemetría de sensores industriales"
          ]
        },
        innovacion: {
          title: "Proyectos de Innovación (I+D+i)",
          description: "Investigación, desarrollo tecnológico e innovación aplicada para generar soluciones de patentes que resuelvan cuellos de botella científicos.",
          badge: "Innovación Científica",
          details: "Soporte completo en la estructuración de proyectos de I+D+i, formulación para financiamientos y prototipado físico/virtual avanzado.",
          features: [
            "Diseño conceptual y viabilidad para patentes de invención",
            "Formulación de proyectos para fondos de innovación",
            "Simulación por computadora y prototipos virtuales (CAD/FEA)",
            "Análisis riguroso de pre-factibilidad técnica y científica"
          ]
        }
      },
      sandbox: {
        badge: "Sandbox de Configuración en Movimiento",
        title: "Diseña tu Ecosistema CRM / ERP Interactivo",
        desc: "Haz clic para alternar entre plataformas y activa o desactiva módulos para simular cómo interactúan las bases de datos de hardware y los tableros de clientes en tiempo real.",
        tabCrm: "Ecosistemas CRM",
        tabErp: "Ecosistemas ERP",
        modulesInstalled: "Módulos instalados en la arquitectura:",
        noModulesTitle: "Ningún módulo activo",
        noModulesDesc: "Activa alguno de los interruptores modulares de la izquierda para ver su comportamiento interactivo.",
        serverStatus: "Estado del Servidor: ACTIVO",
        dbEngine: "Motor de BD: MariaDB Core",
        latency: "Latencia: ~8ms"
      },
      fullviews: {
        backHome: "Volver al Inicio",
        platform: "Plataforma",
        erp: {
          platformName: "LUXPROC Cloud",
          platformSub: "Ecosistema de Planificación Avanzado",
          badge: "Ecosistema ERP Empresarial",
          title: "Ecosistemas ERP de Clase Mundial",
          desc: "El sistema nervioso digital para tu empresa. Centraliza, optimiza e integra cada departamento operativo en un único motor de toma de decisiones en tiempo real.",
          whatIsTitle: "¿Qué es un ERP y para qué sirve?",
          whatIsDesc: "Un ERP (Enterprise Resource Planning) es el sistema de planificación de recursos empresariales encargado de unificar los datos y procesos de todos los departamentos en un solo lugar. En lugar de tener la información fragmentada, un ERP sirve como una base de datos integrada única. Esto permite que el área de ventas, finanzas, bodega y operaciones compartan la misma información al instante, automatizando tareas administrativas pesadas y eliminando la duplicidad de datos.",
          whyTitle: "¿Por qué es crucial para la gestión moderna?",
          whyDesc: "Las empresas que operan con sistemas desconectados sufren de cuellos de botella constantes, pérdidas de stock inexplicables, falta de visibilidad en márgenes y demoras regulatorias. Un ERP elimina estas barreras:",
          whyPoints: [
            { title: "Control Total de Inventarios", desc: "Trazabilidad completa multialmacén de insumos y productos listos." },
            { title: "Facturación Certificada", desc: "Facturación, guías de despacho y libros contables automatizados." },
            { title: "Flujo de Caja Preciso", desc: "Conciliación bancaria, cuentas por cobrar y pagos integrados al instante." },
            { title: "Márgenes en Tiempo Real", desc: "Conoce el costo de importación, margen bruto y neto por cada transacción." }
          ],
          modulesTitle: "Módulos Core del ERP LUXPROC",
          scheduleCta: "Agendar Demostración Técnica",
          sectorsTitleBadge: "Sectores de Aplicación Directa",
          sectorsTitle: "Ecosistemas ERP Diseñados para tu Industria",
          sectorsDesc: "En LUXPROC desarrollamos plataformas ERP optimizadas para el modelo de negocio específico de cada rubro, listas para la carga de integraciones y visuales personalizadas.",
          shoeLeather: {
            title: "Luxproc Shoe & Leather ERP",
            sector: "Cuero, Calzado y Textil",
            desc: "Control integral de inventario de materia prima (MP), control de producción, control de ventas, gestión de operadores, indicadores clave, órdenes de compra, generador de QR, código de barras e impresión de reportes PDF.",
            features: [
              "Control de Inventario Materia Prima (MP) & Órdenes de Compra",
              "Control de Producción, Operadores, Ventas e Indicadores KPI",
              "Generador de QR, Código de Barras e Impresión de Reportes PDF"
            ],
            ctaText: "Ir a Luxproc Shoe & Leather ERP",
            mockupBadge: "MOCKUP DE PLATAFORMA",
            mockupPlaceholder: "[Aquí cargarás imágenes e hipervínculos del ERP]"
          },
          bannerTitle: "¿Listo para crear un ERP adaptado a tus necesidades?",
          bannerDesc: "El verdadero potencial se desbloquea con un software diseñado a la medida de tus procesos de negocio. Conversemos con nuestro equipo de ingenieros sobre tus flujos de trabajo hoy mismo.",
          bannerCta: "Cotizar ERP Personalizado"
        },
        crm: {
          platformName: "LUXPROC CRM Omnicanal",
          platformSub: "Gestión Comercial & Sincronización de Stock",
          badge: "Ecosistema Comercial & Clientes",
          title: "Soluciones CRM a la Medida",
          desc: "Acelera tus ventas, fideliza a tus clientes y automatiza embudos comerciales omnicanal con integración directa a tu catálogo de productos, inventario por almacén y pedidos en tiempo real.",
          whatIsTitle: "¿Qué es un CRM a la Medida y para qué sirve?",
          whatIsDesc: "Un CRM (Customer Relationship Management) a la medida es la plataforma tecnológica central diseñada para gestionar, optimizar y automatizar cada punto de contacto con clientes, distribuidores y prospectos. En lugar de depender de registros en papel o chats dispersos, un CRM a la medida unifica el historial de cotizaciones, pedidos y preferencias de compra en un panel sincronizado con el inventario real.",
          whyTitle: "¿Por qué es crucial para tus ventas?",
          whyDesc: "La pérdida de oportunidades por falta de seguimiento y la falta de visibilidad en el embudo comercial frenan el crecimiento. Un CRM a la medida resuelve esto de raíz:",
          whyPoints: [
            { title: "Embudo Comercial Visual", desc: "Seguimiento en tiempo real de cada cotización y lead hasta el cierre." },
            { title: "WhatsApp & Omnicanal Multiagente", desc: "Múltiples asesores atendiendo desde una sola bandeja centralizada." },
            { title: "Historial de Cliente 360°", desc: "Conoce compras anteriores, pagos pendientes y productos favoritos al instante." },
            { title: "Automatización de Recompras", desc: "Alertas automáticas para reactivar clientes inactivos o con pedidos periódicos." }
          ],
          modulesTitle: "Módulos y Capacidades del CRM LUXPROC",
          scheduleCta: "Agendar Consultoría CRM",
          sectorsTitleBadge: "Sectores de Aplicación Directa",
          sectorsTitle: "Ecosistemas CRM Diseñados para tu Industria",
          sectorsDesc: "En LUXPROC desarrollamos plataformas CRM especializadas, optimizadas para el modelo comercial, inventario por curvas y logística de cada sector.",
          shoeInventory: {
            title: "CRM Inventario Calzado",
            sector: "Cuero, Calzado y Retail",
            desc: "Gestión integral de clientes mayoristas y minoristas con sincronización de inventario en tiempo real. Control de stock por curva de numeración (tallas 35-44), colores, pedidos pendientes, cotizador rápido y catálogo comercial interactivo.",
            features: [
              "Control de Clientes, Pedidos & Trazabilidad por Curva de Tallas y Colores",
              "Sincronización Directa de Inventario de Producto Terminado y Almacenes",
              "Generación Instantánea de Notas de Pedido, Cotizaciones y Reportes PDF"
            ],
            ctaText: "Ir a CRM Inventario Calzado",
            mockupBadge: "MOCKUP DE PLATAFORMA",
            mockupPlaceholder: "[Curva de Tallas 35-44 • Stock Multialmacén Sincronizado en Tiempo Real]"
          },
          bannerTitle: "¿Listo para crear un CRM adaptado a tus ventas?",
          bannerDesc: "El verdadero potencial se desbloquea con un software diseñado a la medida de tus procesos comerciales. Conversemos con nuestro equipo de ingenieros sobre tus flujos de clientes y stock hoy mismo.",
          bannerCta: "Cotizar CRM Personalizado"
        },
        web: {
          platformName: "LUXPROC Web Engine",
          platformSub: "Arquitectura Web de Alto Rendimiento",
          badge: "Arquitectura Web Moderna",
          title: "Portales Web Ultra-Veloces & Escalables",
          desc: "Portales de alto rendimiento y arquitecturas web optimizadas con React, Next.js y Tailwind CSS para ofrecer la mejor velocidad de carga posible y un posicionamiento orgánico imbatible.",
          whatIsTitle: "¿Por qué la arquitectura web moderna marca la diferencia?",
          whatIsDesc: "Un sitio web moderno no es solo una tarjeta de presentación; es un motor de conversión continuo. Construimos con renderizado del lado del servidor (SSR) y generación estática incremental (ISR) para asegurar puntuaciones de 100/100 en Google Core Web Vitals.",
          whyTitle: "Ventajas Competitivas de Nuestra Arquitectura",
          whyDesc: "Velocidad extrema, blindaje en seguridad y optimización para motores de búsqueda (SEO) desde la primera línea de código:",
          whyPoints: [
            { title: "Velocidad Sub-Segundo", desc: "Tiempos de carga menores a 1 segundo para reducir el rebote de visitantes." },
            { title: "Optimización SEO Nativa", desc: "Estructura semántica, OpenGraph y metadatos para dominar los buscadores." },
            { title: "Seguridad Grado TLS 1.3", desc: "Cabeceras HSTS y protección contra ataques CSRF/XSS incorporadas." },
            { title: "Diseño Responsivo Total", desc: "Experiencia de usuario perfecta en smartphones, tablets y pantallas 4K." }
          ],
          modulesTitle: "Tecnologías y Estándares Implementados",
          scheduleCta: "Agendar Consultoría Web",
          sectorsTitleBadge: "Sectores de Aplicación Directa",
          sectorsTitle: "Plataformas Web y Sistemas Cloud de Alto Rendimiento",
          sectorsDesc: "Arquitecturas modernas construidas para velocidad instantánea, diagnósticos en tiempo real y peritajes de ingeniería.",
          cards: {
            digitalDiagnosis: {
              title: "LUXPROC Diagnóstico de Madurez Digital",
              sector: "Evaluación Avanzada 2026",
              desc: "Auditoría interactiva en 20 dimensiones de negocio. Genera mapas de araña (Radar), análisis de semáforos, informe PDF y plan de mejora tecnológica.",
              features: [
                "Evaluación de 20 dimensiones críticas de negocio",
                "Gráfico Spider Radar & Matriz de Priorización Advisory",
                "Informe PDF descargable & Plan de Mejora en fases"
              ],
              ctaText: "Comenzar Diagnóstico Digital"
            },
            maintenanceCloud: {
              title: "LUXPROC Cloud Maintenance System",
              sector: "Mantenimiento Industrial & Confiabilidad",
              desc: "Gestión integral de activos industriales, KPIs OEE/MTBF/MTTR en tiempo real, mantenimiento preventivo/predictivo y control de repuestos ISO 9001/55001.",
              features: [
                "Monitoreo en tiempo real de OEE (91%), MTBF y MTTR",
                "Gestión de OT's e Inspección Predictiva (Termografía/Vibración)",
                "Almacén de Repuestos Críticos & Control de Cambios ISO"
              ],
              ctaText: "Acceder a LUXPROC Maintenance Cloud"
            },
            eDiagnosis: {
              title: "LUXPROC E-DIAGNOSIS",
              sector: "Auditoría & Peritaje Eléctrico",
              desc: "Plataforma profesional para realizar mediciones de corriente eléctrica, conexiones de luminarias y focos, diagnóstico de pozo a tierra y análisis técnico integral con documentación firmada por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra (sin vinculación institucional con el CIP, SUNAT u OSE).",
              features: [
                "Mediciones de corriente eléctrica, cargas y caída de tensión (CNE)",
                "Conexiones de luminarias, focos y fotometría lux (RNE EM.010)",
                "Diagnóstico de pozo a tierra y resistencia PAT (≤25Ω / IEEE 142)",
                "Análisis técnico con informes y dossier firmado por el ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra"
              ],
              ctaText: "Comenzar Diagnóstico Eléctrico"
            }
          },
          bannerTitle: "¿Quieres una plataforma web con velocidad e impacto superior?",
          bannerDesc: "Nuestros ingenieros en frontend y backend diseñan sistemas web listos para escalar tus ventas y automatizar procesos comerciales.",
          bannerCta: "Cotizar Arquitectura Web"
        },
        solutionsDirectory: {
          badge: "Catálogo Integral de Soluciones",
          title: "Todas Nuestras Soluciones de Ingeniería",
          desc: "Software corporativo, automatización física, diagnóstico eléctrico y proyectos de innovación científica a tu disposición.",
          filterAll: "Todas las Soluciones",
          filterSoftware: "Software & Cloud",
          filterHardware: "Hardware & Electricidad",
          filterInnovation: "Innovación I+D+i",
          viewDetail: "Ver Especificaciones Técnicas",
          holisticBadge: "Ingeniería Física y Digital",
          holisticTitle: "Ingeniería Física y Digital bajo el Mismo Techo",
          holisticDesc1: "La mayoría de las empresas se ven obligadas a coordinar con múltiples proveedores desconectados: una empresa para el software, otra para las instalaciones eléctricas y otra para el desarrollo web o hardware.",
          holisticDesc2: "En LUXPROC rompemos este paradigma. Nuestra visión unificada permite que la telemetría de tus sensores de planta alimente directamente tu ERP en la nube, mientras tu CRM canaliza la atención al cliente sin fricciones.",
          benefitsTitle: "¿Por qué elegir un ecosistema integral?",
          benefitsDesc: "Elimina intermediarios e incompatibilidades. Ofrecemos garantías técnicas de extremo a extremo:",
          benefitsList: [
            { title: "Sincronización Total", desc: "Comunicación fluida entre hardware, tableros y software." },
            { title: "Responsabilidad Única", desc: "Soporte centralizado sin culpar a terceros." },
            { title: "Optimizaciones de Costo", desc: "Arquitectura modular que aprovecha componentes ya instalados." },
            { title: "I+D+i para Patentes", desc: "Desarrollos a la medida protegidos intelectualmente." }
          ],
          pillarsBadge: "Portafolio Integral de Soluciones",
          pillarsTitle: "Los 6 Pilares de Ingeniería LUXPROC",
          pillarsDesc: "Haz clic en cualquiera de nuestras soluciones para abrir sus especificaciones técnicas completas.",
          bannerTitle: "¿Tienes un reto de ingeniería o un proyecto complejo?",
          bannerDesc: "Nuestros ingenieros analizan tu infraestructura actual y formulan la mejor estrategia de integración física y digital.",
          bannerCta: "Agendar Consultoría de Ingeniería"
        }
      }
    },
    calendar: {
      badge: "Sincronización en Tiempo Real",
      shieldBadge: "BLINDAJE DE SEGURIDAD • PERSISTENCIA PERPETUA",
      title: "Agendar Consultoría de Ingeniería",
      description: "Reserva una reunión de 30 minutos con nuestro equipo técnico principal para analizar el plan de arquitectura web, CRM, ERP o innovación aplicada. Sincronización bidireccional automática con Google Calendar y generación de salas para Google Meet al instante.",
      retentionNotice: "Garantía de Retención: Toda reunión generada con Google Meet y datos de cliente quedan salvaguardados en triple capa (Local + Cloud Firestore + Encriptación TLS 1.3).",
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
      rescheduleNotice: "Los datos de su reunión y sala virtual han sido salvaguardados correctamente.",
      weekDays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      formHeading: "Completar Datos de la Reunión",
      slotsHeading: "Horarios Disponibles",
      noSlots: "No hay horarios disponibles para esta fecha. Seleccione otro día.",
      syncGoogleCal: "Sincronizar con Google Calendar",
      newMeeting: "Agendar Otra Reunión",
      meetingSummary: "Resumen de la Cita:",
      step1: "Seleccione un Día hábil en el Calendario:",
      step2: "Seleccione una Hora disponible:",
      morning: "Mañana",
      afternoon: "Tarde",
      viewingNotice: "Visualizando el",
      blockedNotice: "Los bloques ocupados están bloqueados automáticamente.",
      bookedTag: "OCUPADO",
      duration30: "30 minutos",
      sslChannels: "Canales cifrados de extremo a extremo",
      meetApiTag: "API de Google Meet autogenerada",
      sessionDetailsTitle: "Detalles de la Sesión",
      sessionMeetBadge: "30 Mins • Meet",
      sessionMainTitle: "Consultoría de Alta Ingeniería y Ecosistemas Digitales",
      sessionMainDesc: "Una sesión uno-a-uno para analizar cuellos de botella en su ERP/CRM, optimización de infraestructura y factibilidad de desarrollos a medida.",
      executiveRole: "CEO & Co-Fundadora • Dirección Ejecutiva",
      whatCoverTitle: "¿Qué cubriremos en la sesión?",
      coverPoints: [
        "Diagnóstico de flujos operativos y silos de datos.",
        "Propuesta de sincronización en tiempo real.",
        "Estimación técnica preliminar y roadmap de R&D."
      ],
      selectDayPrompt: "Seleccione un día y hora disponible",
      selectDayHelp: "Habilite el formulario de registro instantáneo seleccionando un bloque de 30 mins a la izquierda.",
      bookingRegisterTitle: "Registro de Reserva",
      changeSchedule: "Cambiar Horario",
      preselectedTime: "Horario pre-seleccionado",
      timezonePrefix: "Huso:",
      verifiedEmailTag: "Correo Verificado",
      changeBtn: "Cambiar",
      autoEmailNote: "Reconocido automáticamente desde tu cuenta de Google (sin escribirlo)",
      linkGoogleBtn: "Vincular Google",
      officialAuthNote: "Autenticación oficial de Google. El correo y nombre se reconocen de manera automática.",
      syncingGoogleMeet: "Sincronizando Google Calendar & Meet...",
      placeholderName: "Nombre completo",
      placeholderProject: "Ej. Planificación de ERP / Sesión de Consultoría Técnica",
      placeholderPhone: "Ej. +51 987 654 321",
      placeholderNotes: "Ej. Analizar problemas de sincronización de la base de datos y proponer un roadmap de ingeniería..."
    },
    securityModal: {
      shieldTitle: "Escudo Militar de Seguridad Criptográfica",
      levelBadge: "NIVEL 4 (DEFENSA EN PROFUNDIDAD)",
      encryptionTitle: "Cifrado Militar de Extremo a Extremo (FIPS 140-2 / AES-256-GCM)",
      tlsBadge: "TLS 1.3 / AES-GCM 256",
      encryptionDesc: "Toda la información tratada en esta plataforma web (reuniones con Google Meet, datos del cliente, Libro de Reclamaciones, solicitudes ARCO y proyectos) está blindada bajo un escudo criptográfico militar de nivel 4. Se prohíbe y previene la exfiltración de datos, ataques Man-In-The-Middle, robo de información o suplantación (phishing).",
      persistenceTitle: "Garantía de Persistencia Perpetua Inmutable",
      persistenceBadge: "RETENCIÓN 100% GARANTIZADA",
      persistenceDesc: "Ninguna información de reuniones de Calendar, enlaces de Google Meet, quejas o datos de clientes se pierde al actualizar, modificar o reiniciar la plataforma. Funciona con un motor de triple capa de persistencia:",
      layer1Title: "Capa 1: Disco Inmutable",
      layer1Desc: "JSON Vault local protegido",
      layer2Title: "Capa 2: Cloud Firestore",
      layer2Desc: "Base de datos en la nube",
      layer3Title: "Capa 3: Bóveda Navegador",
      layer3Desc: "Almacenamiento encriptado",
      savedBookings: "Reuniones guardadas:",
      totalClaims: "Reclamaciones:",
      totalArco: "Solicitudes ARCO:",
      recipientTitle: "Persona Oficial Designada para Recepción y Validación",
      validatedBadge: "100% VALIDADO",
      legalRepLabel: "Representante Legal y Oficial de Datos Personales:",
      techDirLabel: "Dirección Técnica de Ingeniería:",
      techDirVal: "Ingeniero registrado con su código CIP, especialidad y departamento donde se encuentra (sin vinculación institucional con el CIP, SUNAT u OSE)",
      officialEmailLabel: "Correo Oficial Directo:",
      channelNote: "Cualquier gestión formal (Libro de Reclamaciones, Derechos ARCO o contrataciones) es canalizada formalmente y con sellos criptográficos SHA-256 hacia dicha titularidad.",
      antiPhishingTitle: "Medidas Oficiales contra Ataques de Phishing y Spoofing",
      certDomainTitle: "Dominio Oficial Certificado",
      certDomainDesc: "Verifique siempre el candado de seguridad y el dominio exacto.",
      rucTitle: "Registro Tributario Oficial (RUC)",
      rucDesc: "LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. - RUC Formal Activo.",
      emailTitle: "Único Correo Oficial de Contacto",
      emailDesc: "Rechace remitentes alternativos o no autorizados.",
      headersTitle: "Cabeceras de Servidor Blindadas",
      headersDesc: "X-Frame-Options SAMEORIGIN bloquea clonaciones maliciosas.",
      disclaimerTitle: "Aviso de Desvinculación Institucional",
      disclaimerDesc: "Esta plataforma tecnológica, sus desarrollos de software (ERP, CRM, sistemas cloud) y servicios de consultoría no tienen vínculo con CIP (Colegio de Ingenieros del Perú), SUNAT u OSE.",
      lawsNote: "Cumplimiento pleno de la Ley N° 29733 (Protección de Datos Personales de la República del Perú) y la Ley N° 29571 (Código de Protección y Defensa del Consumidor).",
      closeBtn: "Cerrar Certificado de Seguridad"
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
      scheduleCta: "Agendar Reunión por Google Meet",
      ceoQuote: "La verdadera innovación ocurre en la intersección de la precisión física y la escalabilidad digital. En LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. no solo creamos sistemas integrados de hardware y software; diseñamos soluciones de alta ingeniería que potencian el crecimiento y la soberanía tecnológica de nuestros socios comerciales.",
      ceoRole: "CEO & Co-Fundadora de LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C."
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
      bookConsultation: "Agendar Reunión",
      tlsBadge: "Plataforma Encriptada TLS 1.3 / AES-256",
      antiPhishingBadge: "• Protección Anti-Phishing HSTS Preload",
      lpdpBadge: "• Cumplimiento Ley N° 29733 (LPDP)"
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
      whatWeDoTitle: "What We Do?",
      whatWeDoDesc: "We design, develop, and deploy comprehensive enterprise ecosystems. We not only engineer high-performance code for CRM and ERP systems; we also create dedicated hardware solutions and certified electrical installations powering physical operations.",
      missionTitle: "Mission",
      missionDesc: "Transform client operations through intelligent, secure, and scalable technology solutions, generating sustainable efficiency and growth.",
      visionTitle: "Vision",
      visionDesc: "To be the benchmark technology firm in digital transformation and innovation, renowned for excellence, reliability, and business modernization.",
      valuesBadge: "Culture & Principles",
      valuesTitle: "Values",
      valuesDesc: "Our values are non-negotiable standards of behavior guiding how LUXPROC makes decisions, partners with clients, and delivers software.",
      backHome: "Back to Home",
      windowCorporate: "Corporate Window: About Us",
      cultureSubtitle: "Culture, Mission, Vision & Principles",
      statsUptime: "System Uptime",
      statsErp: "ERP/CRM Systems Deployed",
      statsProjects: "R&D Innovation Projects",
      statsSync: "Direct Calendar Sync",
      bottomCtaTitle: "Want to learn more about our engineering capabilities?",
      bottomCtaDesc: "Schedule an advisory meeting with our senior technical team to analyze your software or hardware requirements.",
      scheduleCta: "Schedule Engineering Consultation",
      valuesList: [
        {
          title: "Trust",
          text: "Every solution delivered by LUXPROC must be predictable, secure, and backed by genuine support. Trust is built through sustained execution over time, not isolated promises."
        },
        {
          title: "Innovation",
          text: "LUXPROC responsibly adopts emerging technologies (AI, automation, IoT), always dedicated to solving genuine operational problems for our clients."
        },
        {
          title: "Technical Excellence",
          text: "Our code quality standards, system architecture, and infrastructure are never compromised for deadlines or budget. Technical excellence is the quiet bedrock of our reliability."
        },
        {
          title: "Closeness & Clarity",
          text: "Despite working in a deeply technical field, LUXPROC communicates without unnecessary jargon, explaining business value clearly to all stakeholders."
        },
        {
          title: "Scalability & Flexibility",
          text: "Solutions are architected anticipating future client expansion, preventing rigid monolithic systems that create technical debt."
        }
      ]
    },
    solutions: {
      headerBadge: "Our Corporate Solutions",
      headerTitle: "Engineering that Transcends Boundaries",
      headerDesc: "We unify the full technological spectrum. From consulting and implementation of enterprise planning software (ERP) and customer relations (CRM), to robust hardware design and industrial automation.",
      viewAllBtn: "View Complete Solutions Directory",
      knowMore: "Explore technical specifications",
      items: {
        crm: {
          title: "Custom CRM Solutions",
          description: "Advanced client retention systems, sales funnel automation, and customer loyalty platforms with omnichannel integration.",
          badge: "Software",
          details: "Robust CRM platforms engineered from scratch or integrated with leading ecosystems. We automate your sales and support workflows end-to-end.",
          features: [
            "Integrated WhatsApp API & Multi-agent CRM",
            "Automated Campaigns & segmentation engine",
            "Advanced BI dashboards & real-time analytics",
            "Predictive AI models for lead scoring"
          ]
        },
        erp: {
          title: "World-Class ERP Ecosystems",
          description: "Full automation of inventory, accounting, purchasing, and comprehensive logistics, centralizing corporate decision-making.",
          badge: "Enterprise",
          details: "Complete support for electronic invoicing, acquisitions, multi-warehouse inventory control, and integrated financial accounting.",
          features: [
            "Corporate electronic invoicing & compliance",
            "Multi-warehouse management & real-time traceability",
            "Asset tracking, import landed costs & purchasing",
            "Analytical accounting & integrated ledgers"
          ]
        },
        web: {
          title: "Modern Web Architecture",
          description: "Ultra-fast SSR/ISR web platforms utilizing React, Next.js, and Tailwind CSS, natively optimized for search engines (SEO) and UX.",
          badge: "Systems",
          details: "High-performance web portals optimized to deliver maximum load speed and unrivaled organic search rankings.",
          features: [
            "Record load speeds (Optimal Core Web Vitals)",
            "Structure optimized for SEO & conversions",
            "Payment gateways integrated with SSL encryption",
            "Auto-scaling cloud infrastructure (Serverless)"
          ]
        },
        electricidad: {
          title: "High-Power Electrical Engineering",
          description: "Electrical engineering, industrial switchboard automation, and structured cabling compliant with international safety codes.",
          badge: "Hardware & Electrical",
          details: "Certified engineering for distribution boards, automatic transfer switches, PLC automation, and industrial safety compliance.",
          features: [
            "Certified technical engineering blueprints",
            "Switchboards with IP telemetry & monitoring",
            "Industrial UPS backup & power redundancy",
            "Power factor optimization & grid efficiency"
          ]
        },
        hardware: {
          title: "Custom Hardware & Embedded Software",
          description: "Firmware architecture, IoT sensor telemetry, microcontroller programming, and low-level embedded systems.",
          badge: "Physical Integration",
          details: "Hardware engineering integrated with multi-layer custom PCB design, long-range wireless connectivity, and telemetry.",
          features: [
            "Multi-layer printed circuit board (PCB) design",
            "Robust RTOS-based deterministic firmware",
            "Advanced wireless connectivity (LoRaWAN, LTE-M)",
            "Continuous monitoring with industrial sensors"
          ]
        },
        innovacion: {
          title: "R&D Innovation Projects",
          description: "Applied scientific research and technological development to engineer patentable solutions overcoming technical bottlenecks.",
          badge: "Scientific Innovation",
          details: "Full advisory in R&D project structuring, innovation grant formulation, and advanced physical/virtual rapid prototyping.",
          features: [
            "Conceptual design & patent feasibility studies",
            "Grant formulation for public & private funding",
            "Computer simulation & CAD/FEA digital twins",
            "Rigorous technical & scientific pre-feasibility analysis"
          ]
        }
      },
      sandbox: {
        badge: "Interactive Architecture Sandbox",
        title: "Design your Interactive CRM / ERP Ecosystem",
        desc: "Toggle between platforms and activate or deactivate modules to simulate how real-time databases and client dashboards interact.",
        tabCrm: "CRM Ecosystems",
        tabErp: "ERP Ecosystems",
        modulesInstalled: "Modules installed in the architecture:",
        noModulesTitle: "No active modules",
        noModulesDesc: "Activate any modular switch on the left to inspect interactive behavior.",
        serverStatus: "Server Status: ACTIVE",
        dbEngine: "DB Engine: MariaDB Core",
        latency: "Latency: ~8ms"
      },
      fullviews: {
        backHome: "Back to Home",
        platform: "Platform",
        erp: {
          platformName: "LUXPROC Cloud",
          platformSub: "Advanced Enterprise Planning Ecosystem",
          badge: "Enterprise ERP Ecosystem",
          title: "World-Class ERP Ecosystems",
          desc: "The digital nervous system for your enterprise. Centralize, optimize, and integrate every department into a single real-time decision engine.",
          whatIsTitle: "What is an ERP and what is it for?",
          whatIsDesc: "An ERP (Enterprise Resource Planning) is the business management platform responsible for unifying data and workflows across all operational departments into one single source of truth. Instead of maintaining disconnected spreadsheets for inventory, invoicing, and purchasing, an ERP integrates operations so sales, accounting, and logistics communicate instantaneously.",
          whyTitle: "Why is it crucial for modern management?",
          whyDesc: "Companies operating with disconnected silos suffer from operational bottlenecks, untracked inventory shrinkage, and delayed financial reporting. A modern ERP resolves this:",
          whyPoints: [
            { title: "Total Inventory Control", desc: "Multi-warehouse real-time tracking for raw materials and finished goods." },
            { title: "Certified Invoicing", desc: "Automated billing, dispatch documentation, and fiscal accounting." },
            { title: "Accurate Cash Flow", desc: "Instant bank reconciliation, receivables, and payables sync." },
            { title: "Real-Time Margins", desc: "Calculate exact landed costs and gross/net profit margins per transaction." }
          ],
          modulesTitle: "LUXPROC ERP Core Modules",
          scheduleCta: "Book Technical Demo",
          sectorsTitleBadge: "Direct Application Sectors",
          sectorsTitle: "ERP Ecosystems Designed for your Industry",
          sectorsDesc: "At LUXPROC we build specialized ERP platforms optimized for the specific business workflows of each industry, prepared for custom integrations and branding.",
          shoeLeather: {
            title: "Luxproc Shoe & Leather ERP",
            sector: "Leather, Footwear & Textiles",
            desc: "Comprehensive raw material (RM) inventory tracking, production scheduling, sales operations, machine operator tracking, KPI dashboards, purchase orders, QR/barcodes, and automated PDF reports.",
            features: [
              "Raw Material (RM) Inventory Control & Purchase Orders",
              "Production Scheduling, Operators, Sales & KPI Dashboards",
              "QR Code & Barcode Generator with Automated PDF Reporting"
            ],
            ctaText: "Go to Luxproc Shoe & Leather ERP",
            mockupBadge: "PLATFORM MOCKUP",
            mockupPlaceholder: "[ERP screenshots and operational links will load here]"
          },
          bannerTitle: "Ready to build an ERP tailored to your needs?",
          bannerDesc: "True operational potential is unlocked with software built specifically around your business processes. Let's discuss your workflow with our senior engineering team today.",
          bannerCta: "Quote Custom ERP"
        },
        crm: {
          platformName: "LUXPROC Omnichannel CRM",
          platformSub: "Sales Management & Stock Synchronization",
          badge: "Commercial & Client Ecosystem",
          title: "Custom CRM Solutions",
          desc: "Accelerate your sales pipeline, build enduring customer loyalty, and automate omnichannel funnels with direct inventory and catalog integration in real-time.",
          whatIsTitle: "What is a Custom CRM and what is it for?",
          whatIsDesc: "A custom CRM is the central software platform designed to manage and automate every client, distributor, and prospect interaction. Rather than relying on scattered messaging apps or paper notes, our CRM unifies quotation history, orders, and payment records synced with warehouse stock.",
          whyTitle: "Why is it vital for your revenue?",
          whyDesc: "Lost deals caused by sluggish follow-up and lack of pipeline visibility severely limit growth. A custom CRM system resolves this:",
          whyPoints: [
            { title: "Visual Sales Pipeline", desc: "Real-time tracking of every lead and quote from initiation to close." },
            { title: "WhatsApp & Multi-Agent Inbox", desc: "Multiple sales reps serving clients through a unified commercial queue." },
            { title: "360° Customer Profile", desc: "Instant view of order history, outstanding balances, and product affinity." },
            { title: "Automated Reorders", desc: "Proactive triggers to reactivate inactive accounts or cyclical reorders." }
          ],
          modulesTitle: "LUXPROC CRM Modules & Capabilities",
          scheduleCta: "Schedule CRM Consultation",
          sectorsTitleBadge: "Direct Application Sectors",
          sectorsTitle: "CRM Ecosystems Designed for your Industry",
          sectorsDesc: "At LUXPROC we engineer specialized CRM platforms tailored to commercial distribution, sizing curves, and sector-specific logistics.",
          shoeInventory: {
            title: "Footwear Inventory CRM",
            sector: "Leather, Footwear & Retail",
            desc: "Comprehensive wholesale and retail client management with real-time stock sync. Size curve inventory control (sizes 35-44), colors, pending orders, rapid quoter, and dynamic digital catalog.",
            features: [
              "Customer Management, Orders & Traceability by Size Curve & Color",
              "Direct Warehouse Sync for Finished Goods and Inventory",
              "Instant Generation of Order Notes, Quotations, and PDF Reports"
            ],
            ctaText: "Go to Footwear Inventory CRM",
            mockupBadge: "PLATFORM MOCKUP",
            mockupPlaceholder: "[Size Curve 35-44 • Multi-Warehouse Real-Time Synced Stock]"
          },
          bannerTitle: "Ready to build a CRM tailored to your sales?",
          bannerDesc: "True revenue potential is unlocked with software engineered around your exact customer acquisition and stock flows. Connect with our engineering team today.",
          bannerCta: "Quote Custom CRM"
        },
        web: {
          platformName: "LUXPROC Web Engine",
          platformSub: "High-Performance Web Architecture",
          badge: "Modern Web Architecture",
          title: "Ultra-Fast & Scalable Web Portals",
          desc: "High-performance web applications optimized with React, Next.js, and Tailwind CSS to guarantee peak loading speeds and unbeatable organic search positioning.",
          whatIsTitle: "Why does modern web architecture make the difference?",
          whatIsDesc: "A modern website is not merely an online brochure; it is an active conversion engine. We build with Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) to secure top ratings across Google Core Web Vitals.",
          whyTitle: "Competitive Advantages of Our Architecture",
          whyDesc: "Blazing speed, rock-solid security, and native search engine optimization from the ground up:",
          whyPoints: [
            { title: "Sub-Second Loading", desc: "Under 1-second load times to drastically minimize visitor bounce rates." },
            { title: "Native SEO Optimization", desc: "Semantic structure, OpenGraph cards, and schema metadata for search dominance." },
            { title: "TLS 1.3 Bank-Grade Security", desc: "HSTS headers, strict CORS, and protection against CSRF/XSS vectors." },
            { title: "Fully Responsive Precision", desc: "Flawless user experience on mobile phones, tablets, and ultra-wide screens." }
          ],
          modulesTitle: "Implemented Technologies & Standards",
          scheduleCta: "Schedule Web Consultation",
          sectorsTitleBadge: "Direct Application Sectors",
          sectorsTitle: "High-Performance Web Platforms & Cloud Systems",
          sectorsDesc: "Modern architectures built for instantaneous speed, real-time diagnostics, and certified engineering audits.",
          cards: {
            digitalDiagnosis: {
              title: "LUXPROC Digital Maturity Diagnosis",
              sector: "Advanced Assessment 2026",
              desc: "Interactive audit across 20 core business dimensions. Generates Spider Radar charts, traffic light matrices, downloadable PDF reports, and phased improvement roadmaps.",
              features: [
                "Assessment across 20 critical enterprise dimensions",
                "Spider Radar Chart & Advisory Prioritization Matrix",
                "Downloadable PDF report & phased technical roadmap"
              ],
              ctaText: "Start Digital Diagnosis"
            },
            maintenanceCloud: {
              title: "LUXPROC Cloud Maintenance System",
              sector: "Industrial Maintenance & Reliability",
              desc: "Comprehensive industrial asset management, real-time OEE/MTBF/MTTR KPIs, predictive maintenance, and ISO 9001/55001 spare part inventory.",
              features: [
                "Real-time monitoring of OEE (91%), MTBF, and MTTR",
                "Work Order (WO) dispatch & predictive inspection (Thermography/Vibration)",
                "Critical spare parts warehouse & ISO engineering change logs"
              ],
              ctaText: "Access LUXPROC Maintenance Cloud"
            },
            eDiagnosis: {
              title: "LUXPROC E-DIAGNOSIS",
              sector: "Electrical Audit & Technical Inspection",
              desc: "Professional platform for electric current metering, luminaire connections, ground well diagnostics, and comprehensive technical audits signed by registered engineers with their professional license code, specialty, and regional department (independent, not affiliated with CIP, SUNAT, or OSE).",
              features: [
                "Electric current metering, load balancing & voltage drop tests (CNE)",
                "Luminaire connections, bulbs, and photometry lux levels (RNE EM.010)",
                "Ground well & earthing resistance diagnostics (≤25Ω / IEEE 142)",
                "Technical dossiers and reports signed by the registered engineer with CIP license code, specialty, and regional department"
              ],
              ctaText: "Start Electrical Diagnosis"
            }
          },
          bannerTitle: "Looking for a high-speed, high-impact web platform?",
          bannerDesc: "Our frontend and backend software engineers design cloud web architectures ready to scale revenue and automate business workflows.",
          bannerCta: "Quote Web Architecture"
        },
        solutionsDirectory: {
          badge: "Complete Solutions Directory",
          title: "All Our Engineering Solutions",
          desc: "Enterprise software, hardware automation, electrical diagnostic audits, and scientific R&D initiatives at your service.",
          filterAll: "All Solutions",
          filterSoftware: "Software & Cloud",
          filterHardware: "Hardware & Electrical",
          filterInnovation: "R&D Innovation",
          viewDetail: "View Technical Specifications",
          holisticBadge: "Physical & Digital Engineering",
          holisticTitle: "Physical and Digital Engineering Under One Roof",
          holisticDesc1: "Most enterprises are forced to coordinate with disconnected vendors: one company for software, another for electrical switchboards, and yet another for embedded hardware.",
          holisticDesc2: "At LUXPROC we break this fragmented paradigm. Our unified vision allows telemetry from your plant sensors to feed your cloud ERP directly, while your CRM coordinates client orders without friction.",
          benefitsTitle: "Why choose an integrated ecosystem?",
          benefitsDesc: "Eliminate intermediaries and software incompatibilities. We provide end-to-end technical warranties:",
          benefitsList: [
            { title: "Total Synchronization", desc: "Seamless communication between hardware, panels, and software." },
            { title: "Single Accountability", desc: "Centralized support with no third-party finger pointing." },
            { title: "Cost Optimization", desc: "Modular architecture that leverages your existing plant infrastructure." },
            { title: "Patentable R&D", desc: "Custom developments protected under intellectual property frameworks." }
          ],
          pillarsBadge: "Comprehensive Solutions Portfolio",
          pillarsTitle: "The 6 LUXPROC Engineering Pillars",
          pillarsDesc: "Click on any of our solutions to open full technical specifications.",
          bannerTitle: "Do you have an engineering challenge or complex project?",
          bannerDesc: "Our engineers analyze your current infrastructure and formulate the best physical and digital integration strategy.",
          bannerCta: "Schedule Engineering Consultation"
        }
      }
    },
    calendar: {
      badge: "Real-Time Synchronization",
      shieldBadge: "SECURITY SHIELD • PERPETUAL PERSISTENCE",
      title: "Schedule Engineering Consultation",
      description: "Book a 30-minute session with our senior technical staff to analyze your web, CRM, ERP, or applied engineering architecture. Automatic bidirectional sync with Google Calendar and immediate Google Meet room generation.",
      retentionNotice: "Persistence Guarantee: Every meeting generated via Google Meet is backed up across a triple layer (Local + Cloud Firestore + TLS 1.3 encryption).",
      timezoneLabel: "Active Timezone",
      morningShift: "Morning Shift (09:00 - 12:30)",
      afternoonShift: "Afternoon Shift (13:00 - 17:30)",
      selectDay: "Selected Day:",
      nameLabel: "Full Name *",
      emailLabel: "Google Email Address *",
      phoneLabel: "Phone Number *",
      projectLabel: "Meeting Title / Project *",
      notesLabel: "Notes / Consultation Details",
      submitButton: "Schedule Meeting via Google Meet",
      loginWithGoogle: "Connect with Google & Schedule",
      downloadIcs: "Download Calendar Event (.ics)",
      successTitle: "Meeting Scheduled Successfully!",
      successMeetLabel: "Official Google Meet Room:",
      openMeet: "Join Google Meet",
      copyLink: "Copy Link",
      copied: "Copied!",
      rescheduleNotice: "Your meeting details and virtual room link have been securely archived.",
      weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      formHeading: "Complete Meeting Details",
      slotsHeading: "Available Time Slots",
      noSlots: "No available slots for this date. Please select another day.",
      syncGoogleCal: "Sync with Google Calendar",
      newMeeting: "Schedule Another Meeting",
      meetingSummary: "Meeting Summary:",
      step1: "Select a Business Day on the Calendar:",
      step2: "Select an Available Time Slot:",
      morning: "Morning",
      afternoon: "Afternoon",
      viewingNotice: "Viewing",
      blockedNotice: "Occupied slots are blocked automatically.",
      bookedTag: "OCCUPIED",
      duration30: "30 minutes",
      sslChannels: "End-to-end encrypted channels",
      meetApiTag: "Auto-generated Google Meet API",
      sessionDetailsTitle: "Session Details",
      sessionMeetBadge: "30 Mins • Meet",
      sessionMainTitle: "High-Engineering & Digital Ecosystems Consultation",
      sessionMainDesc: "A one-on-one session to analyze bottlenecks in your ERP/CRM, infrastructure optimization, and feasibility of custom developments.",
      executiveRole: "CEO & Co-Founder • Executive Management",
      whatCoverTitle: "What will we cover in the session?",
      coverPoints: [
        "Diagnosis of operational workflows and data silos.",
        "Real-time synchronization proposal.",
        "Preliminary technical estimate and R&D roadmap."
      ],
      selectDayPrompt: "Select an available day and time",
      selectDayHelp: "Enable the instant registration form by selecting a 30-min slot on the left.",
      bookingRegisterTitle: "Booking Registration",
      changeSchedule: "Change Time",
      preselectedTime: "Pre-selected Schedule",
      timezonePrefix: "Timezone:",
      verifiedEmailTag: "Verified Email",
      changeBtn: "Change",
      autoEmailNote: "Automatically recognized from your Google account (no typing needed)",
      linkGoogleBtn: "Link Google",
      officialAuthNote: "Official Google Authentication. Email and name are recognized automatically.",
      syncingGoogleMeet: "Syncing Google Calendar & Meet...",
      placeholderName: "Full name",
      placeholderProject: "e.g. ERP Architecture Planning / Technical Advisory Session",
      placeholderPhone: "e.g. +1 555 123 4567",
      placeholderNotes: "e.g. Analyze database sync bottlenecks and discuss an engineering roadmap..."
    },
    securityModal: {
      shieldTitle: "Military Cryptographic Security Shield",
      levelBadge: "LEVEL 4 (DEFENSE IN DEPTH)",
      encryptionTitle: "Military End-to-End Encryption (FIPS 140-2 / AES-256-GCM)",
      tlsBadge: "TLS 1.3 / AES-GCM 256",
      encryptionDesc: "All data handled on this web platform (Google Meet consultations, client credentials, Complaints Book, ARCO requests, and projects) is safeguarded by a Level-4 military cryptographic shield. Data exfiltration, Man-In-The-Middle attacks, data theft, and phishing attempts are proactively neutralized.",
      persistenceTitle: "Immutable Perpetual Persistence Guarantee",
      persistenceBadge: "100% RETENTION GUARANTEED",
      persistenceDesc: "No appointment records, Google Meet rooms, claims, or user data are lost during platform deployments or restarts. Operates with a triple-layer persistence engine:",
      layer1Title: "Layer 1: Immutable Disk",
      layer1Desc: "Local protected JSON Vault",
      layer2Title: "Layer 2: Cloud Firestore",
      layer2Desc: "Encrypted cloud database",
      layer3Title: "Layer 3: Browser Vault",
      layer3Desc: "Encrypted local storage",
      savedBookings: "Saved meetings:",
      totalClaims: "Claims:",
      totalArco: "ARCO requests:",
      recipientTitle: "Official Designated Person for Reception & Validation",
      validatedBadge: "100% VALIDATED",
      legalRepLabel: "Legal Representative & Personal Data Officer:",
      techDirLabel: "Technical Engineering Direction:",
      techDirVal: "Registered engineer with professional license code, specialty, and regional department (independent, not affiliated with CIP, SUNAT, or OSE)",
      officialEmailLabel: "Direct Official Email:",
      channelNote: "All formal procedures (Complaints Book, ARCO Rights, or corporate contracts) are channeled securely with SHA-256 cryptographic seals.",
      antiPhishingTitle: "Official Countermeasures Against Phishing & Spoofing",
      certDomainTitle: "Certified Official Domain",
      certDomainDesc: "Always verify the security padlock and the exact domain.",
      rucTitle: "Official Tax Identification (RUC)",
      rucDesc: "LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. - Active Official Tax Registry.",
      emailTitle: "Sole Official Contact Email",
      emailDesc: "Reject alternative or unauthorized senders.",
      headersTitle: "Hardened Server Headers",
      headersDesc: "X-Frame-Options SAMEORIGIN neutralizes malicious iframe attacks.",
      disclaimerTitle: "Institutional Disclaimer Notice",
      disclaimerDesc: "This technology platform, its software systems (ERP, CRM, cloud architectures), and consulting services have no institutional affiliation with CIP, SUNAT, or OSE.",
      lawsNote: "Full compliance with Peruvian Personal Data Protection Law No. 29733 and Consumer Protection Code Law No. 29571.",
      closeBtn: "Close Security Certificate"
    },
    contact: {
      badge: "Direct Contact",
      title: "Let's Discuss Your Project",
      subtitle: "Send us a message and we'll reply promptly, or book a live technical session via Google Meet.",
      nameLabel: "Full Name *",
      emailLabel: "Email Address *",
      companyLabel: "Company / Organization",
      messageLabel: "Message or Project Requirements *",
      sendButton: "Send Engineering Message",
      sending: "Sending message...",
      successMsg: "Message sent successfully. Our team will contact you shortly.",
      altSchedule: "Prefer to coordinate a live 30-minute consultation?",
      scheduleCta: "Schedule Meeting via Google Meet",
      ceoQuote: "True innovation occurs at the intersection of physical precision and digital scalability. At LUXPROC INNOVATION & TECHNOLOGY, we don't just build integrated hardware and software; we design high-engineering solutions that empower the growth and technological sovereignty of our commercial partners.",
      ceoRole: "CEO & Co-Founder of LUXPROC INNOVATION & TECHNOLOGY S.A.C."
    },
    faq: {
      badge: "Technical & Operational FAQ",
      title: "Answering Your Questions",
      titleHighlight: "Before Implementation",
      subtitle: "Transparent answers about deployment timelines, technical compliance, data security, and on-site engineering support.",
      categories: {
        all: "All",
        erp: "ERP Architecture",
        mantenimiento: "Maintenance Cloud",
        peritaje: "Technical Audit",
        general: "General"
      },
      searchPlaceholder: "Search question or technical topic...",
      directCtaTitle: "Do you have specific technical requirements or an active RFP?",
      directCtaDesc: "Coordinate an engineering advisory meeting directly with our technical leads.",
      directCtaBtn: "Schedule Meeting via Google Meet",
      items: [
        {
          id: "implementation-time",
          category: "general",
          badge: "DEPLOYMENT TIMELINE",
          question: "How long does full plant implementation take?",
          answer: "Our agile engineering deployment puts core modules into production in 1 to 3 weeks. Phase 1 imports product and asset catalogs with user provisioning; Phase 2 conducts on-site operator training and production line pilot testing; Phase 3 marks full Go-Live backed by continuous technical support.",
          points: [
            "Week 1: Process mapping and master data configuration.",
            "Week 2: On-site pilot runs and operator workflow training.",
            "Week 3: Go-Live with direct remote and on-site coverage."
          ]
        },
        {
          id: "operator-training",
          category: "erp",
          badge: "ON-SITE TRAINING",
          question: "How do you train operators with minimal computer experience?",
          answer: "We engineer touch-first, ultra-simplified interfaces tailored for shop-floor personnel (large buttons, barcode/QR optical scanners, and color-coded confirmation cues). Furthermore, we provide on-site hands-on station training, laminated PDF guides, and concise video tutorials.",
          points: [
            "Simplified 2-tap touch workflows for recording production output.",
            "Optical barcode/QR verification eliminating manual data entry.",
            "Laminated pocket manuals and dedicated engineering support."
          ]
        },
        {
          id: "cip-indeci",
          category: "peritaje",
          badge: "TECHNICAL AUDITS",
          question: "Do technical audit and grounding reports include registered engineer sign-off?",
          answer: "Yes. Every electrical audit dossier, ground well resistance test (PAT), infrared thermography, and testing protocol is formulated and signed by the registered engineer with CIP registration number, engineering specialty, and jurisdiction. Formulated in compliance with National Electrical Code (CNE) standards. Note: All technical services are independent professional consulting and do not imply institutional affiliation with CIP, SUNAT, or OSE.",
          points: [
            "Dossiers signed by the registered engineer with credentials and specialty.",
            "Ground well resistance testing conducted with certified telurometers.",
            "Engineering documentation conforming to CNE and building safety codes.",
            "Notice: Independent professional consulting without institutional affiliation to CIP, SUNAT, or OSE."
          ]
        },
        {
          id: "cloud-security",
          category: "mantenimiento",
          badge: "SECURITY & SOVEREIGNTY",
          question: "What level of security and sovereignty is provided for our industrial data?",
          answer: "All enterprise information resides on high-availability cloud servers with geographic redundancy and bank-grade encryption (TLS 1.3 in transit and AES-256 at rest). We perform daily automated backups, and each client operates within an isolated database instance. You maintain exclusive data ownership.",
          points: [
            "Tenant isolation with dedicated database partitioning.",
            "Automated daily backups across Tier III data centers.",
            "One-click data export to Excel, CSV, and JSON formats anytime."
          ]
        },
        {
          id: "legacy-machines",
          category: "mantenimiento",
          badge: "MACHINERY & ASSETS",
          question: "Can we integrate legacy machinery into LUXPROC Maintenance Cloud?",
          answer: "Yes. LUXPROC Cloud Maintenance is designed for both modern IoT-enabled machines and classical electromechanical plant equipment. For legacy assets, the platform schedules systematic lubrication, hour-meter bearing replacements, and critical spare parts tracking without requiring expensive sensors.",
          points: [
            "Work order (WO) management for any industrial machine type.",
            "Systematic lubrication plans driven by operating run hours.",
            "Optional IoT telemetry add-ons for primary power panels."
          ]
        },
        {
          id: "support-sla",
          category: "general",
          badge: "TECHNICAL SUPPORT",
          question: "What post-deployment support and SLA coverage do you provide?",
          answer: "We provide SLA engineering agreements with guaranteed first-response under 30 business minutes and scheduled on-site maintenance visits. Continuous platform security updates and optimizations are fully included.",
          points: [
            "Direct channel to schedule technical advisory and support.",
            "Guaranteed first-response under 30 business minutes.",
            "Continuous security and stability patches at no extra charge."
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
      bookConsultation: "Schedule Meeting",
      tlsBadge: "Encrypted Platform TLS 1.3 / AES-256",
      antiPhishingBadge: "• Anti-Phishing HSTS Preload Protection",
      lpdpBadge: "• Compliance Law N° 29733 (LPDP)"
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
      missionDesc: "Transformar os processos dos nossos clientes por meio de soluções tecnológicas inteligentes, seguras e escaláveis, gerando eficiência, produtividade e crescimento sustentável.",
      visionTitle: "Visão",
      visionDesc: "Ser a empresa de tecnologia de referência em transformação digital e inovação, reconhecida pela excelência, confiabilidade e impacto na modernização de organizações.",
      valuesBadge: "Cultura & Princípios",
      valuesTitle: "Valores",
      valuesDesc: "Os valores são os princípios inegociáveis que orientam a maneira como a LUXPROC toma decisões, se relaciona com os clientes e desenvolve produtos.",
      backHome: "Voltar ao Início",
      windowCorporate: "Janela Corporativa: Sobre Nós",
      cultureSubtitle: "Cultura, Missão, Visão & Princípios",
      statsUptime: "Uptime de Sistemas",
      statsErp: "Sistemas ERP/CRM Implantados",
      statsProjects: "Projetos de Inovação P&D",
      statsSync: "Sincronização Direta Calendar",
      bottomCtaTitle: "Quer saber mais sobre nossa capacidade de engenharia?",
      bottomCtaDesc: "Agende uma consultoria técnica diretamente com nossa equipe sênior para analisar seu projeto de software ou hardware.",
      scheduleCta: "Agendar Consultoria de Engenharia",
      valuesList: [
        {
          title: "Confiança",
          text: "Cada solução entregue pela LUXPROC deve ser previsível, segura e respaldada por suporte real. A confiança é construída com cumprimento consistente ao longo do tempo."
        },
        {
          title: "Inovação",
          text: "A LUXPROC adota tecnologias emergentes (IA, automação, IoT) de maneira responsável, sempre orientada a resolver problemas reais do cliente."
        },
        {
          title: "Excelência técnica",
          text: "O padrão de qualidade de código, arquitetura e infraestrutura não se negocia por prazos ou orçamento. A excelência técnica sustenta nossa reputação de confiabilidade."
        },
        {
          title: "Proximidade e clareza",
          text: "Mesmo operando em um setor altamente técnico, a LUXPROC se comunica sem jargões desnecessários, explicando o valor de negócio com máxima transparência."
        },
        {
          title: "Escalabilidade e flexibilidade",
          text: "As soluções são projetadas para o crescimento futuro da sua organização, evitando arquiteturas rígidas que gerem dívida técnica."
        }
      ]
    },
    solutions: {
      headerBadge: "Nossas Soluções Corporativas",
      headerTitle: "Engenharia que Transcende Limites",
      headerDesc: "Unificamos o espectro tecnológico completo. Da consultoria e implementação de software de planejamento empresarial (ERP) e relações comerciais (CRM), até o projeto de hardware robusto e automações industriais.",
      viewAllBtn: "Ver Catálogo Completo de Soluções",
      knowMore: "Conhecer mais especificações",
      items: {
        crm: {
          title: "Soluções CRM Sob Medida",
          description: "Sistemas avançados de retenção, automação de funis comerciais e fidelização de clientes com integrações multicanal.",
          badge: "Software",
          details: "Sistemas CRM robustos desenvolvidos do zero ou integrados a plataformas líderes. Automatizamos seus fluxos de vendas e atendimento de ponta a ponta.",
          features: [
            "WhatsApp API integrada & CRM Multiagente",
            "Módulo de Campanhas automatizadas e segmentação",
            "Relatórios BI avançados e análises em tempo real",
            "Modelos de IA preditivos para scoring de leads"
          ]
        },
        erp: {
          title: "Ecossistemas ERP de Classe Mundial",
          description: "Automação total de estoque, contabilidade, compras e logística integrada, centralizando a tomada de decisões empresariais.",
          badge: "Enterprise",
          details: "Suporte completo para faturamento eletrônico, compras, controle de estoque multiarmazém e contabilidade integrada.",
          features: [
            "Faturamento Eletrônico corporativo",
            "Gestão de Múltiplos Depósitos e rastreamento em tempo real",
            "Controle de Ativos, Custos de Importação e Compras",
            "Contabilidade gerencial e livros contábeis integrados"
          ]
        },
        web: {
          title: "Arquitetura Web Moderna",
          description: "Plataformas web ultra-rápidas SSR/ISR com React, Next.js e Tailwind CSS, otimizadas nativamente para SEO e UX.",
          badge: "Sistemas",
          details: "Portais de alto desempenho projetados para oferecer máxima velocidade de carregamento e excelente posicionamento orgânico.",
          features: [
            "Tempo de carregamento recorde (Core Web Vitals excelentes)",
            "Estrutura otimizada para SEO e conversões",
            "Gateways de Pagamento integrados com criptografia SSL",
            "Infraestrutura Cloud autoescalável (Serverless)"
          ]
        },
        electricidad: {
          title: "Instalações Elétricas de Alta Potência",
          description: "Engenharia elétrica, automação de quadros industriais e cabeamento estruturado conforme normas internacionais.",
          badge: "Hardware & Eletricidade",
          details: "Serviços certificados para montagem de quadros de transferência, automação CLP industrial e proteção elétrica.",
          features: [
            "Projetos e Engenharia certificados conforme normas CNE",
            "Quadros com medição telemétrica IP integrada",
            "Sistemas nobreak/UPS industriais de emergência",
            "Otimização de fator de potência e eficiência de rede"
          ]
        },
        hardware: {
          title: "Hardware e Software Sob Medida",
          description: "Projeto de firmware, integração de sensores IoT, desenvolvimento de microcontroladores e programação embarcada.",
          badge: "Integração Física",
          details: "Engenharia de hardware com placas de circuito impresso (PCB) personalizadas, conectividade sem fio de longo alcance e telemetria.",
          features: [
            "Projeto de placas de circuito impresso PCB multicamadas",
            "Firmware determinístico baseado em RTOS",
            "Conectividade sem fio avançada (LoRaWAN, LTE-M)",
            "Monitoramento contínuo com telemetria industrial"
          ]
        },
        innovacion: {
          title: "Projetos de Inovação (P&D)",
          description: "Pesquisa científica e desenvolvimento tecnológico aplicado para gerar soluções e patentes para desafios complexos.",
          badge: "Inovação Científica",
          details: "Estruturação completa de projetos de P&D, editais de financiamento e prototipagem física e virtual de alta fidelidade.",
          features: [
            "Projeto conceitual e viabilidade para patentes",
            "Formulação de propostas para fundos de fomento",
            "Simulação computacional e gêmeos digitais (CAD/FEA)",
            "Análise rigorosa de pré-viabilidade técnica e científica"
          ]
        }
      },
      sandbox: {
        badge: "Sandbox de Configuração Interativa",
        title: "Projete seu Ecossistema CRM / ERP Interativo",
        desc: "Alterne entre plataformas e ative ou desative módulos para simular como bancos de dados e painéis operacionais interagem em tempo real.",
        tabCrm: "Ecossistemas CRM",
        tabErp: "Ecossistemas ERP",
        modulesInstalled: "Módulos instalados na arquitetura:",
        noModulesTitle: "Nenhum módulo ativo",
        noModulesDesc: "Ative algum dos interruptores modulares à esquerda para visualizar o comportamento interativo.",
        serverStatus: "Status do Servidor: ATIVO",
        dbEngine: "Motor de BD: MariaDB Core",
        latency: "Latência: ~8ms"
      },
      fullviews: {
        backHome: "Voltar ao Início",
        platform: "Plataforma",
        erp: {
          platformName: "LUXPROC Cloud",
          platformSub: "Ecossistema de Planejamento Avançado",
          badge: "Ecossistema ERP Empresarial",
          title: "Ecossistemas ERP de Classe Mundial",
          desc: "O sistema nervoso digital da sua empresa. Centralize, otimize e integre cada departamento operacional em um único motor de tomada de decisões.",
          whatIsTitle: "O que é um ERP e para que serve?",
          whatIsDesc: "Um ERP (Enterprise Resource Planning) é o sistema responsável por unificar dados e processos de todos os departamentos em um só lugar. Em vez de planilhas desconexas, o ERP atua como uma base de dados integrada única para vendas, finanças, compras e estoques compartilharem dados em tempo real.",
          whyTitle: "Por que é fundamental para a gestão moderna?",
          whyDesc: "Empresas com sistemas fragmentados sofrem com retrabalho, perda de estoque e falta de visibilidade em margens. Um ERP elimina esses obstáculos:",
          whyPoints: [
            { title: "Controle Total de Estoque", desc: "Rastreabilidade multiarmazém de insumos e produtos acabados." },
            { title: "Faturamento Certificado", desc: "Emissão fiscal, guias de remessa e contabilidade automatizada." },
            { title: "Fluxo de Caixa Preciso", desc: "Conciliação bancária, contas a receber e pagar integradas." },
            { title: "Margens em Tempo Real", desc: "Cálculo exato de custos de aquisição e margens brutas por transação." }
          ],
          modulesTitle: "Módulos Principais do ERP LUXPROC",
          scheduleCta: "Agendar Demonstração Técnica",
          sectorsTitleBadge: "Setores de Aplicação Direta",
          sectorsTitle: "Ecossistemas ERP Projetados para sua Indústria",
          sectorsDesc: "Na LUXPROC desenvolvemos plataformas ERP otimizadas para o modelo de negócio específico de cada segmento, prontas para integrações e identidade personalizada.",
          shoeLeather: {
            title: "Luxproc Shoe & Leather ERP",
            sector: "Couro, Calçados e Têxtil",
            desc: "Controle integral de estoque de matéria-prima (MP), controle de produção, gestão de vendas, operadores de fábrica, indicadores-chave, ordens de compra, gerador de QR/código de barras e relatórios em PDF.",
            features: [
              "Controle de Estoque de Matéria-Prima (MP) & Ordens de Compra",
              "Controle de Produção, Operadores, Vendas e Indicadores KPI",
              "Gerador de QR Code, Código de Barras e Impressão de Relatórios PDF"
            ],
            ctaText: "Ir para Luxproc Shoe & Leather ERP",
            mockupBadge: "MOCKUP DE PLATAFORMA",
            mockupPlaceholder: "[Aqui serão carregadas imagens e hiperlinks do ERP]"
          },
          bannerTitle: "Pronto para criar um ERP adaptado às suas necessidades?",
          bannerDesc: "O verdadeiro potencial se desbloqueia com um software desenhado sob medida para seus processos operacionais. Converse com nossa equipe sênior de engenharia hoje mesmo.",
          bannerCta: "Cotar ERP Personalizado"
        },
        crm: {
          platformName: "LUXPROC CRM Multicanal",
          platformSub: "Gestão Comercial e Sincronização de Estoque",
          badge: "Ecossistema Comercial e Clientes",
          title: "Soluções CRM Sob Medida",
          desc: "Acelere suas vendas, fidelize clientes e automatize funis comerciais com integração direta ao catálogo de produtos e estoque em tempo real.",
          whatIsTitle: "O que é um CRM Sob Medida e para que serve?",
          whatIsDesc: "Um CRM sob medida é a plataforma central criada para gerenciar e automatizar cada ponto de contato com clientes e prospectos em um painel sincronizado com a disponibilidade de estoque real.",
          whyTitle: "Por que é essencial para suas vendas?",
          whyDesc: "Oportunidades perdidas por falta de acompanhamento e ausência de visibilidade no funil travam o crescimento. Um CRM sob medida resolve isso:",
          whyPoints: [
            { title: "Funil Comercial Visual", desc: "Acompanhamento em tempo real de cada proposta comercial até o fechamento." },
            { title: "WhatsApp e Caixa Centralizada", desc: "Vários consultores atendendo através de uma única fila de mensagens." },
            { title: "Perfil 360° do Cliente", desc: "Histórico de compras, pagamentos e produtos favoritos em um instante." },
            { title: "Automação de Recorrência", desc: "Alertas automáticos para reativar clientes com pedidos recorrentes." }
          ],
          modulesTitle: "Módulos e Recursos do CRM LUXPROC",
          scheduleCta: "Agendar Consultoria CRM",
          sectorsTitleBadge: "Setores de Aplicação Direta",
          sectorsTitle: "Ecossistemas CRM Projetados para sua Indústria",
          sectorsDesc: "Na LUXPROC desenvolvemos plataformas CRM especializadas, otimizadas para o modelo comercial, controle de estoque por grade e logística de cada setor.",
          shoeInventory: {
            title: "CRM Inventário de Calçados",
            sector: "Couro, Calçados e Varejo",
            desc: "Gestão integral de clientes atacadistas e varejistas com sincronização de estoque em tempo real. Controle por grade de numeração (tamanhos 35-44), cores, pedidos pendentes, cotador ágil e catálogo interativo.",
            features: [
              "Controle de Clientes, Pedidos & Rastreabilidade por Grade de Tamanhos e Cores",
              "Sincronização Direta de Estoque de Produtos Acabados e Depósitos",
              "Geração Instantânea de Notas de Pedido, Cotações e Relatórios em PDF"
            ],
            ctaText: "Ir para CRM Inventário de Calçados",
            mockupBadge: "MOCKUP DE PLATAFORMA",
            mockupPlaceholder: "[Grade de Tamanhos 35-44 • Estoque Multidepósito Sincronizado em Tempo Real]"
          },
          bannerTitle: "Pronto para criar um CRM adaptado às suas vendas?",
          bannerDesc: "O verdadeiro potencial se desbloqueia com um software desenhado sob medida para seu fluxo comercial. Converse com nossa equipe de engenharia hoje mesmo.",
          bannerCta: "Cotar CRM Personalizado"
        },
        web: {
          platformName: "LUXPROC Web Engine",
          platformSub: "Arquitetura Web de Alto Desempenho",
          badge: "Arquitetura Web Moderna",
          title: "Portais Web Ultra-Rápidos e Escaláveis",
          desc: "Portais de alto desempenho e arquiteturas web otimizadas com React, Next.js e Tailwind CSS para velocidade superior e visibilidade orgânica nos buscadores.",
          whatIsTitle: "Por que a arquitetura web moderna faz a diferença?",
          whatIsDesc: "Um site moderno é um motor contínuo de conversão. Construímos com Renderização no Servidor (SSR) e Geração Estática Incremental (ISR) para garantir notas máximas no Google Core Web Vitals.",
          whyTitle: "Vantagens Competitivas de Nossa Arquitetura",
          whyDesc: "Velocidade extrema, segurança reforçada e otimização SEO desde a concepção do código:",
          whyPoints: [
            { title: "Velocidade Sub-Segundo", desc: "Carregamento em menos de 1 segundo para minimizar a taxa de rejeição." },
            { title: "Otimização SEO Nativa", desc: "Estrutura semântica, OpenGraph e metadados para liderar pesquisas." },
            { title: "Segurança Padrão TLS 1.3", desc: "Cabeçalhos HSTS e proteção contra ataques CSRF/XSS integradas." },
            { title: "Design 100% Responsivo", desc: "Experiência perfeita em celulares, tablets e computadores de alta resolução." }
          ],
          modulesTitle: "Tecnologias e Padrões Implementados",
          scheduleCta: "Agendar Consultoria Web",
          sectorsTitleBadge: "Setores de Aplicação Direta",
          sectorsTitle: "Plataformas Web e Sistemas em Nuvem de Alto Desempenho",
          sectorsDesc: "Arquiteturas modernas construídas para velocidade instantânea, diagnósticos em tempo real e perícias técnicas certificadas.",
          cards: {
            digitalDiagnosis: {
              title: "LUXPROC Diagnóstico de Maturidade Digital",
              sector: "Avaliação Avançada 2026",
              desc: "Auditoria interativa em 20 dimensões de negócios. Gera gráficos Spider Radar, matrizes de priorização, relatórios para download em PDF e plano de modernização tecnológica.",
              features: [
                "Avaliação de 20 dimensões críticas empresariais",
                "Gráfico Spider Radar & Matriz de Priorização Consultiva",
                "Relatório em PDF para download & Plano de Modernização em fases"
              ],
              ctaText: "Iniciar Diagnóstico Digital"
            },
            maintenanceCloud: {
              title: "LUXPROC Cloud Maintenance System",
              sector: "Manutenção Industrial & Confiabilidade",
              desc: "Gestão completa de ativos industriais, indicadores OEE/MTBF/MTTR em tempo real, manutenção preditiva e controle de peças de reposição ISO 9001/55001.",
              features: [
                "Monitoramento em tempo real de OEE (91%), MTBF e MTTR",
                "Gestão de Ordens de Serviço (OS) & Inspeção Preditiva (Termografia/Vibração)",
                "Almoxarifado de Peças Críticas & Controle de Mudanças de Engenharia ISO"
              ],
              ctaText: "Acessar LUXPROC Maintenance Cloud"
            },
            eDiagnosis: {
              title: "LUXPROC E-DIAGNOSIS",
              sector: "Auditoria & Perícia Elétrica",
              desc: "Plataforma profissional para medição de corrente elétrica, conexões de luminárias e lâmpadas, diagnóstico de aterramento e análise técnica abrangente assinada por engenheiro habilitado com código profissional, especialidade e região (independente, sem vinculação institucional com o CIP, SUNAT ou OSE).",
              features: [
                "Medições de corrente elétrica, balanceamento de cargas e queda de tensão (CNE)",
                "Conexões de iluminação, lâmpadas e fotometria em lux (RNE EM.010)",
                "Diagnóstico de poço de aterramento e resistência (≤25Ω / IEEE 142)",
                "Laudos periciais e relatórios técnicos assinados pelo engenheiro habilitado com código CIP, especialidade e região"
              ],
              ctaText: "Iniciar Diagnóstico Elétrico"
            }
          },
          bannerTitle: "Quer uma plataforma web com velocidade e impacto superior?",
          bannerDesc: "Nossos engenheiros de software projetam arquiteturas web em nuvem preparadas para acelerar vendas e automatizar fluxos operacionais.",
          bannerCta: "Cotar Arquitetura Web"
        },
        solutionsDirectory: {
          badge: "Catálogo Integral de Soluções",
          title: "Todas as Nossas Soluções de Engenharia",
          desc: "Software corporativo, automação física, diagnósticos elétricos e projetos de inovação científica à sua disposição.",
          filterAll: "Todas as Soluções",
          filterSoftware: "Software & Cloud",
          filterHardware: "Hardware & Eletricidade",
          filterInnovation: "Inovação P&D",
          viewDetail: "Ver Especificações Técnicas",
          holisticBadge: "Engenharia Física e Digital",
          holisticTitle: "Engenharia Física e Digital sob o Mesmo Teto",
          holisticDesc1: "A maioria das empresas é forçada a coordenar com múltiplos prestadores desconectados: um para software, outro para painéis elétricos e outro para desenvolvimento de hardware.",
          holisticDesc2: "Na LUXPROC quebramos esse paradigma. Nossa visão unificada permite que a telemetria de sensores de fábrica alimente diretamente o seu ERP em nuvem, enquanto o CRM atende seus clientes sem atrito.",
          benefitsTitle: "Por que escolher um ecossistema integrado?",
          benefitsDesc: "Elimina intermediários e incompatibilidades técnicas. Oferecemos garantias de engenharia ponta a ponta:",
          benefitsList: [
            { title: "Sincronização Total", desc: "Comunicação fluida entre hardware, painéis e software." },
            { title: "Responsabilidade Única", desc: "Suporte centralizado sem repassar culpas a terceiros." },
            { title: "Otimização de Custos", desc: "Arquitetura modular que aproveita a infraestrutura já instalada." },
            { title: "P&D para Patentes", desc: "Desenvolvimentos exclusivos protegidos por propriedade intelectual." }
          ],
          pillarsBadge: "Portfólio Integral de Soluções",
          pillarsTitle: "Os 6 Pilares de Engenharia LUXPROC",
          pillarsDesc: "Clique em qualquer uma das nossas soluções para abrir suas especificações técnicas completas.",
          bannerTitle: "Você tem um desafio de engenharia ou um projeto complexo?",
          bannerDesc: "Nossos engenheiros analisam sua infraestrutura atual e formulam a melhor estratégia de integração física e digital.",
          bannerCta: "Agendar Consultoria de Engenharia"
        }
      }
    },
    calendar: {
      badge: "Sincronização em Tempo Real",
      shieldBadge: "ESCUDO DE SEGURANÇA • PERSISTÊNCIA PERPÉTUA",
      title: "Agendar Consultoria de Engenharia",
      description: "Reserve uma reunião de 30 minutos com nossa equipe técnica sênior para analisar sua arquitetura web, CRM, ERP ou engenharia aplicada. Sincronização automática com Google Calendar e sala oficial do Google Meet instantânea.",
      retentionNotice: "Garantia de Retenção: Todas as reuniões geradas no Google Meet são armazenadas em tripla camada de segurança (Local + Cloud Firestore + Criptografia TLS 1.3).",
      timezoneLabel: "Fuso Horário Ativo",
      morningShift: "Turno da Manhã (09:00 - 12:30)",
      afternoonShift: "Turno da Tarde (13:00 - 17:30)",
      selectDay: "Dia Selecionado:",
      nameLabel: "Nome Completo *",
      emailLabel: "E-mail (Google) *",
      phoneLabel: "Número de Celular *",
      projectLabel: "Título da Reunião / Projeto *",
      notesLabel: "Notas / Motivo da Consulta",
      submitButton: "Agendar Reunião no Google Meet",
      loginWithGoogle: "Conectar com Google e Agendar",
      downloadIcs: "Baixar Evento (.ics)",
      successTitle: "Reunião Agendada com Sucesso!",
      successMeetLabel: "Sala Oficial do Google Meet:",
      openMeet: "Entrar no Google Meet",
      copyLink: "Copiar Link",
      copied: "Copiado!",
      rescheduleNotice: "Os detalhes da sua reunião e sala virtual foram salvos com segurança.",
      weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      formHeading: "Preencher Dados da Reunião",
      slotsHeading: "Horários Disponíveis",
      noSlots: "Não há horários disponíveis para esta data. Selecione outro dia.",
      syncGoogleCal: "Sincronizar com Google Calendar",
      newMeeting: "Agendar Outra Reunião",
      meetingSummary: "Resumo da Reunião:",
      step1: "Selecione um Dia Útil no Calendário:",
      step2: "Selecione um Horário Disponível:",
      morning: "Manhã",
      afternoon: "Tarde",
      viewingNotice: "Visualizando o",
      blockedNotice: "Os blocos ocupados estão bloqueados automaticamente.",
      bookedTag: "OCUPADO",
      duration30: "30 minutos",
      sslChannels: "Canais criptografados de ponta a ponta",
      meetApiTag: "API do Google Meet autogerada",
      sessionDetailsTitle: "Detalhes da Sessão",
      sessionMeetBadge: "30 Mins • Meet",
      sessionMainTitle: "Consultoria de Alta Engenharia e Ecossistemas Digitais",
      sessionMainDesc: "Uma sessão individual para analisar gargalos em seu ERP/CRM, otimização de infraestrutura e viabilidade de desenvolvimentos sob medida.",
      executiveRole: "CEO & Co-Fundadora • Direção Executiva",
      whatCoverTitle: "O que cobriremos na sessão?",
      coverPoints: [
        "Diagnóstico de fluxos operacionais e silos de dados.",
        "Proposta de sincronização em tempo real.",
        "Estimativa técnica preliminar e roadmap de P&D."
      ],
      selectDayPrompt: "Selecione um dia e horário disponível",
      selectDayHelp: "Habilite o formulário de cadastro instantâneo selecionando um bloco de 30 min à esquerda.",
      bookingRegisterTitle: "Registro de Reserva",
      changeSchedule: "Mudar Horário",
      preselectedTime: "Horário pré-selecionado",
      timezonePrefix: "Fuso:",
      verifiedEmailTag: "E-mail Verificado",
      changeBtn: "Trocar",
      autoEmailNote: "Reconhecido automaticamente da sua conta Google (sem precisar digitar)",
      linkGoogleBtn: "Vincular Google",
      officialAuthNote: "Autenticação oficial do Google. O e-mail e nome são reconhecidos automaticamente.",
      syncingGoogleMeet: "Sincronizando Google Calendar & Meet...",
      placeholderName: "Nome completo",
      placeholderProject: "Ex. Planejamento de ERP / Sessão de Consultoria Técnica",
      placeholderPhone: "Ex. +55 11 98765-4321",
      placeholderNotes: "Ex. Analisar gargalos de sincronização do banco de dados e propor um roadmap de engenharia..."
    },
    securityModal: {
      shieldTitle: "Escudo Militar de Segurança Criptográfica",
      levelBadge: "NÍVEL 4 (DEFESA EM PROFUNDIDADE)",
      encryptionTitle: "Criptografia Militar Ponta a Ponta (FIPS 140-2 / AES-256-GCM)",
      tlsBadge: "TLS 1.3 / AES-GCM 256",
      encryptionDesc: "Todas as informações processadas nesta plataforma web (reuniões Google Meet, dados do cliente, Livro de Reclamações, solicitações ARCO e projetos) estão blindadas sob um escudo criptográfico militar de nível 4. Previne-se exfiltração de dados, ataques Man-In-The-Middle, roubo de dados ou tentativas de phishing.",
      persistenceTitle: "Garantia de Persistência Perpétua Imutável",
      persistenceBadge: "RETENÇÃO 100% GARANTIDA",
      persistenceDesc: "Nenhuma informação de reuniões do Calendar, links do Google Meet, reclamações ou dados de clientes é perdida ao atualizar, modificar ou reiniciar a plataforma. Opera com um motor de tripla camada de persistência:",
      layer1Title: "Camada 1: Disco Imutável",
      layer1Desc: "JSON Vault local protegido",
      layer2Title: "Camada 2: Cloud Firestore",
      layer2Desc: "Banco de dados em nuvem criptografado",
      layer3Title: "Camada 3: Cofre do Navegador",
      layer3Desc: "Armazenamento criptografado",
      savedBookings: "Reuniões salvas:",
      totalClaims: "Reclamações:",
      totalArco: "Solicitações ARCO:",
      recipientTitle: "Pessoa Oficial Designada para Recepção e Validação",
      validatedBadge: "100% VALIDADO",
      legalRepLabel: "Representante Legal e Encarregado de Dados Pessoais:",
      techDirLabel: "Diretoria Técnica de Engenharia:",
      techDirVal: "Engenheiro registrado com código de habilitação, especialidade e região onde atua (sem vínculo institucional com CIP, SUNAT ou OSE)",
      officialEmailLabel: "E-mail Oficial Direto:",
      channelNote: "Qualquer gestão formal (Livro de Reclamações, Direitos ARCO ou contratações) é canalizada formalmente com carimbos criptográficos SHA-256.",
      antiPhishingTitle: "Medidas Oficiais contra Ataques de Phishing e Spoofing",
      certDomainTitle: "Domínio Oficial Certificado",
      certDomainDesc: "Verifique sempre o cadeado de segurança e o domínio exato.",
      rucTitle: "Registro Tributário Oficial (RUC)",
      rucDesc: "LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. - Cadastro Ativo Oficial.",
      emailTitle: "Único E-mail Oficial de Contato",
      emailDesc: "Rejeite remetentes alternativos ou não autorizados.",
      headersTitle: "Cabeçalhos de Servidor Blindados",
      headersDesc: "X-Frame-Options SAMEORIGIN bloqueia clonagens maliciosas em iframes.",
      disclaimerTitle: "Aviso de Desvinculação Institucional",
      disclaimerDesc: "Esta plataforma tecnológica, seus sistemas de software (ERP, CRM, sistemas em nuvem) e consultorias não possuem vínculo com o CIP, SUNAT ou OSE.",
      lawsNote: "Pleno cumprimento da Lei Nº 29733 (Proteção de Dados Pessoais) e da Lei Nº 29571 (Código de Defesa do Consumidor).",
      closeBtn: "Fechar Certificado de Segurança"
    },
    contact: {
      badge: "Contato Direto",
      title: "Vamos Conversar Sobre Seu Projeto",
      subtitle: "Deixe sua mensagem para contato rápido ou agende diretamente uma reunião técnica no Google Meet.",
      nameLabel: "Nome Completo *",
      emailLabel: "E-mail *",
      companyLabel: "Empresa / Organização",
      messageLabel: "Mensagem ou Necessidade do Projeto *",
      sendButton: "Enviar Mensagem de Engenharia",
      sending: "Enviando mensagem...",
      successMsg: "Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.",
      altSchedule: "Prefere agendar uma reunião de 30 minutos ao vivo?",
      scheduleCta: "Agendar Reunião no Google Meet",
      ceoQuote: "A verdadeira inovação acontece na interseção entre a precisão física e a escalabilidade digital. Na LUXPROC INOVAÇÃO E TECNOLOGÍA S.A.C., não criamos apenas sistemas integrados de hardware e software; projetamos soluções de alta engenharia que impulsionam o crescimento e a soberania tecnológica de nossos parceiros comerciais.",
      ceoRole: "CEO e Co-Fundadora da LUXPROC INOVAÇÃO E TECNOLOGIA S.A.C."
    },
    faq: {
      badge: "Perguntas Frequentes Técnicas & Operacionais",
      title: "Esclareça Suas Dúvidas",
      titleHighlight: "Antes da Implantação",
      subtitle: "Respostas transparentes sobre prazos, conformidade técnica, segurança de dados e suporte presencial na fábrica.",
      categories: {
        all: "Todas",
        erp: "Arquitetura ERP",
        mantenimiento: "Maintenance Cloud",
        peritaje: "Auditoria Técnica",
        general: "Geral"
      },
      searchPlaceholder: "Pesquisar pergunta ou tópico técnico...",
      directCtaTitle: "Possui uma necessidade técnica específica ou licitação?",
      directCtaDesc: "Agende uma consultoria de engenharia diretamente com nossa equipe técnica.",
      directCtaBtn: "Agendar Reunião no Google Meet",
      items: [
        {
          id: "implementation-time",
          category: "general",
          badge: "PRAZOS DE IMPLANTAÇÃO",
          question: "Quanto tempo leva a implantação completa na fábrica?",
          answer: "Nossa metodologia ágil de engenharia permite colocar os módulos essenciais em operação de 1 a 3 semanas. A fase 1 contempla a importação do catálogo de insumos e configuração de usuários; a fase 2 compreende o treinamento presencial na fábrica e testes piloto; a fase 3 é a entrada oficial em produção com suporte técnico contínuo.",
          points: [
            "Semana 1: Mapeamento de processos e configuração de dados mestres.",
            "Semana 2: Testes piloto na linha de produção e capacitação da equipe.",
            "Semana 3: Entrada em produção (Go-Live) com acompanhamento direto."
          ]
        },
        {
          id: "operator-training",
          category: "erp",
          badge: "CAPACITAÇÃO DE OPERADORES",
          question: "Como vocês treinam a equipe com pouca experiência em informática?",
          answer: "Projetamos interfaces sensíveis ao toque simplificadas para operadores de chão de fábrica (botões grandes, leitor de código de barras/QR e confirmações visuais por cores). Além disso, realizamos treinamentos práticos nos postos de trabalho e fornecemos manuais ilustrados.",
          points: [
            "Fluxo de toque simplificado com até 2 cliques para registrar a produção.",
            "Validação óptica por código de barras/QR sem digitação manual.",
            "Manuais plastificados e suporte técnico dedicado."
          ]
        },
        {
          id: "cip-indeci",
          category: "peritaje",
          badge: "AUDITORIAS TÉCNICAS",
          question: "Os laudos periciais e de aterramento possuem assinatura de engenheiro habilitado?",
          answer: "Sim. Todo laudo de auditoria elétrica, medição de aterramento (SPDA/PAT), termografia e protocolo de ensaios é emitido e assinado pelo engenheiro registrado com código profissional, especialidade e jurisdição, em conformidade com as normas CNE. Nota: Os serviços de engenharia são consultorias profissionais independentes e não possuem vínculo institucional com CIP, SUNAT ou OSE.",
          points: [
            "Laudos técnicos assinados pelo engenheiro registrado habilitado.",
            "Medição de aterramento realizada com terrômetros calibrados e certificados.",
            "Dossiê técnico em total conformidade com normas CNE e segurança predial.",
            "Aviso legal: Consultorias profissionais independentes sem vínculo institucional com CIP, SUNAT ou OSE."
          ]
        },
        {
          id: "cloud-security",
          category: "mantenimiento",
          badge: "SEGURANÇA & SOBERANIA",
          question: "Qual o nível de segurança e soberania dos nossos dados industriais na nuvem?",
          answer: "Todas as informações residem em servidores cloud de alta disponibilidade com redundância geográfica e criptografia de padrão bancário (TLS 1.3 em trânsito e AES-256 em repouso). Realizamos backups automáticos diários com isolamento total de banco de dados por cliente. Você mantém a propriedade exclusiva dos dados.",
          points: [
            "Isolamento por cliente com bancos de dados independentes.",
            "Backups automáticos diários em data centers padrão Tier III.",
            "Exportação completa de dados em Excel, CSV e JSON a qualquer momento."
          ]
        },
        {
          id: "legacy-machines",
          category: "mantenimiento",
          badge: "MÁQUINAS & ATIVOS",
          question: "Posso integrar máquinas antigas ou quadros existentes ao LUXPROC Maintenance Cloud?",
          answer: "Sim. O LUXPROC Cloud Maintenance foi desenvolvido tanto para equipamentos modernos com telemetria quanto para maquinário eletromecânico clássico. Para equipamentos legados, o sistema gerencia planos de lubrificação, substituição de rolamentos por horímetro e controle de peças sobressalentes sem sensores caros.",
          points: [
            "Gestão de ordens de serviço (OS) para qualquer tipo de máquina industrial.",
            "Planos sistemáticos de lubrificação baseados em horas de funcionamento.",
            "Módulos opcionais de telemetria IoT para quadros e motores principais."
          ]
        },
        {
          id: "support-sla",
          category: "general",
          badge: "SUPORTE TÉCNICO",
          question: "Qual é a cobertura de suporte técnico e manutenção após a implantação?",
          answer: "Oferecemos acordos de nível de serviço (SLA) com tempo de primeira resposta garantido inferior a 30 minutos úteis e visitas presenciais agendadas. Atualizações contínuas de segurança e otimização do sistema estão incluídas sem custo adicional.",
          points: [
            "Canal direto para agendamento de suporte de engenharia.",
            "Primeira resposta garantida em menos de 30 minutos úteis.",
            "Atualizações contínuas de estabilidade e segurança sem custo extra."
          ]
        }
      ]
    },
    footer: {
      desc: "Líderes em engenharia física e digital integrada. Desenvolvemos ERPs, CRMs avançados, arquiteturas web escaláveis e lideramos projetos de inovação científica (P&D) para orquestrar a eficiência do amanhã.",
      brochureBtn: "Catálogo / Dossier 2026",
      ecosystems: "Ecossistemas",
      erp: "Plataformas ERP",
      maint: "Maintenance Cloud",
      diagnosis: "Auditoria Elétrica CNE",
      faq: "Perguntas Frecuentes",
      policiesTitle: "Políticas e Integrações",
      policiesDesc: "Ecossistema protegido por OAuth seguro e integrado nativamente com Google Calendar API e Google Meet API.",
      transparencyTitle: "Transparência e Leis",
      rights: "Todos os direitos reservados.",
      legalNotice: "Serviços profissionais independentes. Tudo o que é criado não possui vinculação institucional com o CIP, SUNAT ou OSE.",
      terms: "Termos e Condições",
      privacy: "Política de Privacidade",
      bookConsultation: "Agendar Reunião",
      tlsBadge: "Plataforma Criptografada TLS 1.3 / AES-256",
      antiPhishingBadge: "• Proteção Anti-Phishing HSTS Preload",
      lpdpBadge: "• Conformidade Lei N° 29733 (LPDP)"
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
