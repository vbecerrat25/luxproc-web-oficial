import { jsPDF } from "jspdf";

export interface ClaimPdfData {
  trackingId: string;
  fullName: string;
  docType: string;
  docNum: string;
  email: string;
  phone?: string;
  address?: string;
  assetType: string;
  assetDescription: string;
  claimedAmount?: string;
  claimType: string;
  claimDetail: string;
  consumerRequest?: string;
  sha256Seal: string;
  createdAt: string;
}

export interface ArcoPdfData {
  trackingId: string;
  fullName: string;
  docType: string;
  docNum: string;
  email: string;
  arcoType: string;
  detail: string;
  sha256Seal: string;
  createdAt: string;
}

export function generateClaimPdf(data: ClaimPdfData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const margin = 16;
  let curY = margin;

  // Header Box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, curY, 178, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.", margin + 6, curY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("RUC: 20616650735 • Dominio Certificado: https://luxproc.com • Contacto: luxproc.11@gmail.com", margin + 6, curY + 14);
  doc.text("HOJA DE RECLAMACIÓN VIRTUAL - LEY N° 29571 (CÓDIGO DEL CONSUMIDOR)", margin + 6, curY + 19);

  curY += 28;

  // Tracking & Date Bar
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, curY, 178, 12, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`CÓDIGO DE REGISTRO: ${data.trackingId}`, margin + 4, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Fecha/Hora: ${new Date(data.createdAt).toLocaleString("es-PE")}`, margin + 110, curY + 7);

  curY += 18;

  // 1. Identificación del Consumidor Reclamante
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text("1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE", margin, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const rowH = 6;
  doc.text(`Nombres y Apellidos: ${data.fullName}`, margin, curY);
  curY += rowH;
  doc.text(`Documento de Identidad: ${data.docType} N° ${data.docNum}`, margin, curY);
  doc.text(`Correo Electrónico: ${data.email}`, margin + 90, curY);
  curY += rowH;
  doc.text(`Teléfono: ${data.phone || "No especificado"}`, margin, curY);
  doc.text(`Domicilio: ${data.address || "No especificado"}`, margin + 90, curY);
  curY += rowH + 2;

  // 2. Detalle del Bien Contratado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(217, 119, 6);
  doc.text("2. DETALLE DEL BIEN CONTRATADO", margin, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`Tipo de Bien: ${data.assetType === "producto" ? "PRODUCTO" : "SERVICIO"}`, margin, curY);
  doc.text(`Monto Reclamado: S/ ${data.claimedAmount || "0.00"}`, margin + 90, curY);
  curY += rowH;
  doc.text(`Descripción del Bien: ${data.assetDescription || "Servicio de software / consultoría tecnológica"}`, margin, curY);
  curY += rowH + 2;

  // 3. Detalle de la Reclamación
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(217, 119, 6);
  doc.text(`3. DETALLE DE LA RECLAMACIÓN (${data.claimType.toUpperCase()})`, margin, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const detailLines = doc.splitTextToSize(`Hechos reportados: ${data.claimDetail}`, 178);
  doc.text(detailLines, margin, curY);
  curY += detailLines.length * 4.5 + 3;

  const requestLines = doc.splitTextToSize(`Pedido Concreto del Consumidor: ${data.consumerRequest || "Atención y subsanación conforme a ley"}`, 178);
  doc.text(requestLines, margin, curY);
  curY += requestLines.length * 4.5 + 4;

  // Sello Criptográfico SHA-256
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, curY, 178, 20, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, curY, 178, 20, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("SELLO CRIPTOGRÁFICO DE SEGURIDAD & FIRMA DIGITAL SHA-256:", margin + 4, curY + 6);

  doc.setFont("courier", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(13, 148, 136); // teal-600
  doc.text(data.sha256Seal, margin + 4, curY + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Este documento ha sido transmitido mediante cifrado TLS 1.3 y registrado en la base de datos de LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.", margin + 4, curY + 17);

  curY += 26;

  // Legal Footer
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("PLAZO LEGAL DE ATENCIÓN:", margin, curY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Conforme al D.S. N° 011-2011-PCM, el proveedor debe dar respuesta en un plazo no mayor a 15 días hábiles improrrogables.", margin + 45, curY);

  curY += 6;
  doc.text("Copia oficial remitida a: luxproc.11@gmail.com con acuse de recibo para el consumidor.", margin, curY);

  return doc;
}

export function generateArcoPdf(data: ArcoPdfData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const margin = 16;
  let curY = margin;

  // Header Box
  doc.setFillColor(30, 58, 138); // blue-900
  doc.rect(margin, curY, 178, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.", margin + 6, curY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("RUC: 20616650735 • Dominio Certificado: https://luxproc.com • Correo Oficial: luxproc.11@gmail.com", margin + 6, curY + 14);
  doc.text("CONSTANCIA DE EJERCICIO DE DERECHOS ARCO - LEY N° 29733 (LPDP)", margin + 6, curY + 19);

  curY += 28;

  // Tracking & Date Bar
  doc.setFillColor(239, 246, 255); // blue-50
  doc.rect(margin, curY, 178, 12, "F");
  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`CÓDIGO DE TRÁMITE ARCO: ${data.trackingId}`, margin + 4, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Fecha/Hora: ${new Date(data.createdAt).toLocaleString("es-PE")}`, margin + 110, curY + 7);

  curY += 18;

  // Titular Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text("1. DATOS DEL TITULAR DE LOS DATOS PERSONALES", margin, curY);
  curY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`Titular: ${data.fullName}`, margin, curY);
  curY += 6;
  doc.text(`Documento de Identidad: ${data.docType} N° ${data.docNum}`, margin, curY);
  doc.text(`Correo Electrónico de Notificación: ${data.email}`, margin + 90, curY);
  curY += 8;

  // Solicitud Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text(`2. DERECHO EJERCIDO: ${data.arcoType.toUpperCase()}`, margin, curY);
  curY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const detailLines = doc.splitTextToSize(`Fundamentación y requerimiento: ${data.detail}`, 178);
  doc.text(detailLines, margin, curY);
  curY += detailLines.length * 4.5 + 6;

  // SHA-256 Seal
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, curY, 178, 20, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, curY, 178, 20, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("SELLO CRIPTOGRÁFICO DE INTEGRIDAD SHA-256 (LEY N° 29733):", margin + 4, curY + 6);

  doc.setFont("courier", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(2, 132, 199); // sky-600
  doc.text(data.sha256Seal, margin + 4, curY + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Garantía de inmutabilidad y confidencialidad. Transmisión cifrada de extremo a extremo.", margin + 4, curY + 17);

  curY += 26;

  // Legal Term
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("PLAZOS LEGALES DE ATENCIÓN SEGÚN LA LEY N° 29733:", margin, curY);
  curY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("• Derecho de Acceso: Veinte (20) días hábiles desde la presentación de la solicitud.", margin, curY);
  curY += 4.5;
  doc.text("• Derechos de Rectificación, Cancelación u Oposición: Diez (10) días hábiles.", margin, curY);
  curY += 6;
  doc.text("Copia oficial remitida a la Oficialía de Datos: luxproc.11@gmail.com.", margin, curY);

  return doc;
}
