import { jsPDF } from "jspdf";

export interface BrochureData {
  companyName: string;
  ruc: string;
  domicile: string;
  technicalSpecialist: string;
  cipNumber: string;
  email: string;
  domain: string;
}

export const DEFAULT_BROCHURE_DATA: BrochureData = {
  companyName: "LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.",
  ruc: "20504794637",
  domicile: "La Libertad, Perú",
  technicalSpecialist: "Ing. Víctor Becerra",
  cipNumber: "278034",
  email: "contacto@luxproc.com",
  domain: "www.luxproc.com"
};

export function createBrochurePdf(data: BrochureData = DEFAULT_BROCHURE_DATA): jsPDF {
  // Create A4 PDF in portrait orientation (210 x 297 mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2; // 178 mm

  // --- Top Decorative Header Banner ---
  doc.setFillColor(15, 23, 42); // #0F172A (Deep Slate)
  doc.rect(0, 0, pageWidth, 28, "F");

  // Accent thin stripe
  doc.setFillColor(37, 99, 235); // #2563EB (Royal Blue)
  doc.rect(0, 28, pageWidth, 1.5, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("LUXPROC", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // #94A3B8
  doc.text("INNOVACIÓN Y TECNOLOGÍA S.A.C.", margin, 17);
  doc.text(`R.U.C. ${data.ruc} • ${data.domicile}`, margin, 22);

  // Right Header Badge (Technical Engineering & CIP - No "Liderazgo")
  doc.setFillColor(30, 41, 59); // #1E293B
  doc.roundedRect(pageWidth - margin - 62, 6, 62, 16, 2, 2, "F");
  doc.setTextColor(96, 165, 250); // #60A5FA
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("DOSSIER TÉCNICO OFICIAL 2026", pageWidth - margin - 59, 11);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(`Ingeniería y Peritaje: ${data.technicalSpecialist}`, pageWidth - margin - 59, 15);
  doc.setTextColor(52, 211, 153); // Emerald accent
  doc.setFont("helvetica", "bold");
  doc.text(`Colegiado CIP N° ${data.cipNumber}`, pageWidth - margin - 59, 19);

  let curY = 36;

  // --- Sub-header bar ---
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("INGENIERÍA FÍSICA, SOFTWARE INDUSTRIAL & TELEMETRÍA I+D+i", margin, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Dominio Oficial: https://${data.domain} • Contacto: ${data.email} • Central: +51 900 000 000`, margin, curY);
  curY += 7;

  // Divider
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.setLineWidth(0.5);
  doc.line(margin, curY, pageWidth - margin, curY);
  curY += 6;

  // --- SECTION 1: Presentación Institucional ---
  doc.setFillColor(239, 246, 255); // #EFF6FF (Light Blue)
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, "F");
  doc.setDrawColor(191, 219, 254); // #BFDBFE
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, "S");

  doc.setTextColor(29, 78, 216); // #1D4ED8
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("1. PRESENTACIÓN INSTITUCIONAL", margin + 4, curY + 5);

  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const introText = `${data.companyName} es una firma peruana de alta ingeniería dedicada a la convergencia entre sistemas físicos y software avanzado. Desarrollamos plataformas ERP/CRM a medida para plantas de manufactura, sistemas cloud de mantenimiento predictivo bajo normas ISO 55001, y ejecutamos peritajes eléctricos certificados con validez legal ante INDECI y municipalidades.`;
  const splitIntro = doc.splitTextToSize(introText, contentWidth - 8);
  doc.text(splitIntro, margin + 4, curY + 10);

  curY += 30;

  // --- SECTION 2: Plataformas y Soluciones Principales ---
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("2. PLATAFORMAS Y SOLUCIONES PRINCIPALES", margin, curY);
  curY += 4;

  const cardWidth = (contentWidth - 4) / 2;
  const cardHeight = 35;

  // Solution 1: Shoe & Leather ERP (Amber)
  doc.setFillColor(254, 252, 232); // Light amber
  doc.roundedRect(margin, curY, cardWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, curY, cardWidth, cardHeight, 2, 2, "S");

  doc.setTextColor(180, 83, 9);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Luxproc Shoe & Leather ERP", margin + 3, curY + 5);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const erpDesc = "Control integral de materia prima (MP), calculo automatico de mermas de cuero, control de destajo por operador, ordenes de compra, codigo de barras y QR.";
  doc.text(doc.splitTextToSize(erpDesc, cardWidth - 6), margin + 3, curY + 10);
  doc.setTextColor(180, 83, 9);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.text("• Mermas reducidas hasta un 34% en fabrica.", margin + 3, curY + cardHeight - 3);

  // Solution 2: Cloud Maintenance System (Blue)
  const col2X = margin + cardWidth + 4;
  doc.setFillColor(239, 246, 255); // Light blue
  doc.roundedRect(col2X, curY, cardWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(59, 130, 246);
  doc.roundedRect(col2X, curY, cardWidth, cardHeight, 2, 2, "S");

  doc.setTextColor(29, 78, 216);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("LUXPROC Cloud Maintenance", col2X + 3, curY + 5);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const maintDesc = "Gestion de activos industriales, arbol de equipos, ordenes de trabajo (OT) digitales, control de repuestos criticos y KPI en tiempo real: OEE (91%), MTBF y MTTR.";
  doc.text(doc.splitTextToSize(maintDesc, cardWidth - 6), col2X + 3, curY + 10);
  doc.setTextColor(29, 78, 216);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.text("• Norma ISO 55001 y reduccion del 48% de paradas.", col2X + 3, curY + cardHeight - 3);

  curY += cardHeight + 4;

  // Solution 3: E-DIAGNOSIS (Emerald) - Safe plain text encoding without symbols that break Helvetica
  doc.setFillColor(236, 253, 245); // Light emerald
  doc.roundedRect(margin, curY, cardWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(margin, curY, cardWidth, cardHeight, 2, 2, "S");

  doc.setTextColor(4, 120, 87);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("LUXPROC E-DIAGNOSIS (Peritaje CIP)", margin + 3, curY + 5);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const diagDesc = "Auditorias electricas integrales, medicion de pozo a tierra (PAT <= 25 Ohm), termografia de tableros, caida de tension y fotometria lux. Expedientes con firma CIP.";
  doc.text(doc.splitTextToSize(diagDesc, cardWidth - 6), margin + 3, curY + 10);
  doc.setTextColor(4, 120, 87);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.text("• 100% admisibles para licencias INDECI y CNE.", margin + 3, curY + cardHeight - 3);

  // Solution 4: Madurez Digital (Indigo)
  doc.setFillColor(238, 242, 255); // Light indigo
  doc.roundedRect(col2X, curY, cardWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(col2X, curY, cardWidth, cardHeight, 2, 2, "S");

  doc.setTextColor(67, 56, 202);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Diagnostico de Madurez Digital", col2X + 3, curY + 5);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const maturityDesc = "Auditoria estrategica en 20 dimensiones operativas. Generacion automatica de graficos Spider Radar, matriz de priorizacion y hoja de ruta tecnologica ejecutiva.";
  doc.text(doc.splitTextToSize(maturityDesc, cardWidth - 6), col2X + 3, curY + 10);
  doc.setTextColor(67, 56, 202);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.text("• Hoja de ruta tecnologica con ROI < 90 dias.", col2X + 3, curY + cardHeight - 3);

  curY += cardHeight + 7;

  // --- SECTION 3: Homologaciones y Normas de Cumplimiento ---
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("3. HOMOLOGACIONES Y NORMAS TECNICAS DE CUMPLIMIENTO", margin, curY);
  curY += 4;

  const badgeWidth = (contentWidth - 6) / 4;
  const badgeHeight = 12;

  // Explicit CIP N° 278034 as requested by user
  const badges = [
    { title: "CIP Habilitado", subtitle: `CIP N° ${data.cipNumber}` },
    { title: "CNE / RNE", subtitle: "Norma EM.010" },
    { title: "IEEE 142 PAT", subtitle: "Tierra <= 25 Ohm" },
    { title: "ISO 55001 / 9001", subtitle: "Gestion Activos" }
  ];

  badges.forEach((b, i) => {
    const bx = margin + i * (badgeWidth + 2);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(bx, curY, badgeWidth, badgeHeight, 1.5, 1.5, "F");
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(bx, curY, badgeWidth, badgeHeight, 1.5, 1.5, "S");

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(b.title, bx + badgeWidth / 2, curY + 5, { align: "center" });

    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text(b.subtitle, bx + badgeWidth / 2, curY + 9, { align: "center" });
  });

  curY += badgeHeight + 7;

  // --- SECTION 4: Validación y Respaldo Profesional ---
  doc.setFillColor(241, 245, 249); // #F1F5F9
  doc.roundedRect(margin, curY, contentWidth, 26, 2, 2, "F");
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, curY, contentWidth, 26, 2, 2, "S");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("VALIDACION TECNICA Y RESPALDO PROFESIONAL", margin + 4, curY + 5);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const legalText = "Este expediente tecnico y portafolio de ingenieria cuenta con la validez de la Ley del Ejercicio Profesional de la Ingenieria en el Peru y la representacion facultada de Carmen Teran Vda. de Becerra (CEO & Co-Fundadora).";
  doc.text(doc.splitTextToSize(legalText, contentWidth - 62), margin + 4, curY + 10);

  // Signature box on the right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 52, curY + 2.5, 49, 21, 1.5, 1.5, "F");
  doc.setDrawColor(148, 163, 184);
  doc.roundedRect(pageWidth - margin - 52, curY + 2.5, 49, 21, 1.5, 1.5, "S");

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.text("FIRMA Y SELLO TECNICO", pageWidth - margin - 27.5, curY + 6.5, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(7.5);
  doc.text(data.technicalSpecialist.toUpperCase(), pageWidth - margin - 27.5, curY + 12, { align: "center" });

  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text(`COLEGIADO CIP N° ${data.cipNumber}`, pageWidth - margin - 27.5, curY + 16.5, { align: "center" });

  curY += 32;

  // --- Bottom Footer Strip ---
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 282, pageWidth, 15, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(`${data.companyName} • RUC: ${data.ruc}`, margin, 288);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(6.5);
  doc.text(`Domicilio Legal: ${data.domicile} • Web: ${data.domain} • Correo: ${data.email}`, margin, 292);

  doc.setTextColor(96, 165, 250);
  doc.text("Documento apto para presentacion a Directorio o Jefaturas de Planta", pageWidth - margin, 290, { align: "right" });

  return doc;
}

/**
 * Downloads the PDF brochure directly to the user's filesystem
 */
export function downloadBrochurePdf(data: BrochureData = DEFAULT_BROCHURE_DATA): void {
  const doc = createBrochurePdf(data);
  doc.save("Dossier_Tecnico_LUXPROC_2026.pdf");
}

/**
 * Prints the document cleanly using the browser's print dialog or falls back to direct download
 */
export function printBrochure(data: BrochureData = DEFAULT_BROCHURE_DATA): void {
  try {
    if (typeof window !== "undefined") {
      window.print();
    }
  } catch {
    // If window.print is blocked by browser/iframe environment, fallback cleanly to PDF download
    downloadBrochurePdf(data);
  }
}
