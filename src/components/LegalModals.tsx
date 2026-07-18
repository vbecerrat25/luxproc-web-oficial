import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  ShieldCheck, 
  Gavel, 
  X, 
  Send, 
  CheckCircle2, 
  User, 
  FileText, 
  AlertCircle 
} from "lucide-react";

type ModalType = "reclamaciones" | "arco" | "terminos" | null;

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  // States for Libro de Reclamaciones
  const [docType, setDocType] = useState("DNI");
  const [docNum, setDocNum] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [claimType, setClaimType] = useState<"reclamo" | "queja">("reclamo");
  const [assetType, setAssetType] = useState<"producto" | "servicio">("servicio");
  const [assetDescription, setAssetDescription] = useState("");
  const [claimDetail, setClaimDetail] = useState("");
  const [consumerRequest, setConsumerRequest] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimId, setClaimId] = useState("");

  // States for ARCO Rights
  const [arcoType, setArcoType] = useState("Acceso");
  const [arcoDocType, setArcoDocType] = useState("DNI");
  const [arcoDocNum, setArcoDocNum] = useState("");
  const [arcoFullName, setArcoFullName] = useState("");
  const [arcoEmail, setArcoEmail] = useState("");
  const [arcoDetail, setArcoDetail] = useState("");
  const [arcoSuccess, setArcoSuccess] = useState(false);
  const [arcoId, setArcoId] = useState("");

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !docNum || !email || !claimDetail) {
      alert("Por favor, complete todos los campos obligatorios (*)");
      return;
    }
    const generatedId = `LR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setClaimId(generatedId);
    setClaimSuccess(true);
  };

  const handleArcoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arcoFullName || !arcoDocNum || !arcoEmail || !arcoDetail) {
      alert("Por favor, complete todos los campos obligatorios (*)");
      return;
    }
    const generatedId = `ARCO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setArcoId(generatedId);
    setArcoSuccess(true);
  };

  const resetForms = () => {
    setClaimSuccess(false);
    setArcoSuccess(false);
    // claim
    setDocNum("");
    setFullName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setAssetDescription("");
    setClaimDetail("");
    setConsumerRequest("");
    // arco
    setArcoDocNum("");
    setArcoFullName("");
    setArcoEmail("");
    setArcoDetail("");
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto z-10 text-left"
          >
            {/* Header close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LIBRO DE RECLAMACIONES */}
            {activeModal === "reclamaciones" && (
              <div className="space-y-6">
                {!claimSuccess ? (
                  <form onSubmit={handleClaimSubmit} className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">
                          Libro de Reclamaciones Virtual
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          LUXPROC S.A.C. • RUC: 20609341103 • Conforme a la Ley N° 29571 Código de Protección y Defensa del Consumidor.
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/15 p-3 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 leading-normal flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Nota legal:</strong> Un <strong>Reclamo</strong> es la disconformidad relacionada directamente con los productos o servicios adquiridos. Una <strong>Queja</strong> expresa un malestar respecto a la atención o disconformidades no ligadas a la calidad del bien entregado.
                      </div>
                    </div>

                    {/* Section 1: Consumer data */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                        1. Identificación del Consumidor Reclamante
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Tipo de Doc. *</label>
                          <select 
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
                          >
                            <option value="DNI">DNI</option>
                            <option value="CE">Carnet Extranjería (CE)</option>
                            <option value="RUC">RUC</option>
                            <option value="Pasaporte">Pasaporte</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Número de Documento *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ingrese su número de documento"
                            value={docNum}
                            onChange={(e) => setDocNum(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Nombres y Apellidos Completos *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nombre completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Correo Electrónico *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="usuario@dominio.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Teléfono o Celular</label>
                          <input 
                            type="tel" 
                            placeholder="Ej. +51 987 654 321"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Domicilio actual</label>
                          <input 
                            type="text" 
                            placeholder="Dirección, Distrito y Provincia"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Contracted asset details */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                        2. Detalle del Bien Contratado
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Tipo de Bien</label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                              <input 
                                type="radio" 
                                checked={assetType === "servicio"}
                                onChange={() => setAssetType("servicio")}
                                className="accent-blue-600"
                              />
                              Servicio
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                              <input 
                                type="radio" 
                                checked={assetType === "producto"}
                                onChange={() => setAssetType("producto")}
                                className="accent-blue-600"
                              />
                              Producto
                            </label>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Descripción del bien (Ecosistema CRM, Consultoría, etc.)</label>
                          <input 
                            type="text" 
                            placeholder="Ej. Sincronización API de WhatsApp / Licencia ERP"
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Claim details */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                        3. Detalle de la Reclamación y Pedido
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Tipo de Registro *</label>
                          <div className="flex flex-col gap-2 mt-1">
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                              <input 
                                type="radio" 
                                checked={claimType === "reclamo"}
                                onChange={() => setClaimType("reclamo")}
                                className="accent-blue-600"
                              />
                              Reclamo
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                              <input 
                                type="radio" 
                                checked={claimType === "queja"}
                                onChange={() => setClaimType("queja")}
                                className="accent-blue-600"
                              />
                              Queja
                            </label>
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Detalle del Reclamo o Queja *</label>
                            <textarea 
                              rows={3}
                              required
                              placeholder="Escriba de forma detallada los hechos ocurridos..."
                              value={claimDetail}
                              onChange={(e) => setClaimDetail(e.target.value)}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Pedido Concreto del Consumidor</label>
                            <textarea 
                              rows={2}
                              placeholder="¿Qué acción o compensación solicita?"
                              value={consumerRequest}
                              onChange={(e) => setConsumerRequest(e.target.value)}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Enviar Reclamación Virtual
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="w-16 h-16 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
                        ¡Hoja de Reclamación Registrada con Éxito!
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Tu reclamo ha sido procesado de forma oficial. Se ha enviado una copia digital de este reclamo al correo electrónico proporcionado.
                      </p>
                    </div>
                    
                    <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-left space-y-2 font-mono text-xs">
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Código de Registro:</span>
                        <span className="font-bold text-amber-500">{claimId}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Reclamante:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Tipo:</span>
                        <span className="font-bold uppercase text-slate-700 dark:text-slate-200">{claimType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plazo Legal de Respuesta:</span>
                        <span className="font-bold text-emerald-500">15 Días Hábiles</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow transition-all"
                    >
                      Entendido, Cerrar Ventana
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* DERECHOS ARCO */}
            {activeModal === "arco" && (
              <div className="space-y-6">
                {!arcoSuccess ? (
                  <form onSubmit={handleArcoSubmit} className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">
                          Ejercicio de Derechos ARCO
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          LUXPROC S.A.C. • Ley N° 29733 de Protección de Datos Personales en el Perú.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/15 p-3 rounded-xl text-[11px] text-blue-800 dark:text-blue-300 leading-normal flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        Como titular de datos personales, tienes el derecho constitucional de solicitar el Acceso, Rectificación, Cancelación u Oposición del almacenamiento de tu información en nuestras bases de datos de software.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">Derecho que desea ejercer *</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {["Acceso", "Rectificación", "Cancelación", "Oposición"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setArcoType(type)}
                              className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                                arcoType === type
                                  ? "bg-blue-600 text-white border-blue-600 shadow"
                                  : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Nombres y Apellidos Completos del Titular *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nombre del solicitante"
                            value={arcoFullName}
                            onChange={(e) => setArcoFullName(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Correo Electrónico de Contacto *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="usuario@dominio.com"
                            value={arcoEmail}
                            onChange={(e) => setArcoEmail(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Tipo de Documento</label>
                          <select 
                            value={arcoDocType}
                            onChange={(e) => setArcoDocType(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
                          >
                            <option value="DNI">DNI</option>
                            <option value="CE">CE</option>
                            <option value="RUC">RUC</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Número de Documento *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ingrese su número de documento"
                            value={arcoDocNum}
                            onChange={(e) => setArcoDocNum(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Detalle de la Solicitud / Fundamentos *</label>
                        <textarea 
                          rows={4}
                          required
                          placeholder="Por favor, explique con claridad y precisión los datos sobre los cuales ejerce su derecho..."
                          value={arcoDetail}
                          onChange={(e) => setArcoDetail(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-blue-500"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          required
                          id="dni_attach"
                          className="accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="dni_attach" className="text-[10px] text-slate-500 dark:text-slate-400 select-none cursor-pointer">
                          Declaro que soy el titular legal del documento adjunto y que toda la información brindada es verídica para el ejercicio de mis derechos de privacidad.
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Enviar Solicitud ARCO
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="w-16 h-16 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
                        Solicitud de Derechos ARCO Registrada
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Su solicitud ha sido enviada al Oficial de Cumplimiento de Datos Personales de LUXPROC S.A.C.
                      </p>
                    </div>

                    <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-left space-y-2 font-mono text-xs">
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Código ARCO:</span>
                        <span className="font-bold text-blue-500">{arcoId}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Titular:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{arcoFullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                        <span className="text-slate-400">Derecho Ejercido:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{arcoType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tiempo de Atención:</span>
                        <span className="font-bold text-emerald-500">10 Días Hábiles</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow transition-all"
                    >
                      Cerrar Ventana
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* TÉRMINOS Y CONDICIONES */}
            {activeModal === "terminos" && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/10 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">
                      Términos y Condiciones Generales
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Última actualización: 30 de Junio, 2026 • LUXPROC S.A.C.
                    </p>
                  </div>
                </div>

                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  <p>
                    Bienvenido a la plataforma oficial de LUXPROC S.A.C. Los siguientes términos y condiciones regulan el uso de nuestro sitio web, plataformas de software ERP/CRM, servicios de ingeniería y control de hardware. Al interactuar con nuestro ecosistema, usted acepta expresamente las cláusulas descritas a continuación.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">1. Licenciamiento y Uso del Software</h4>
                  <p>
                    LUXPROC S.A.C. otorga licencias de uso de software a medida y plataformas web según las estipulaciones contractuales acordadas de manera independiente para cada proyecto comercial. Queda terminantemente prohibida la ingeniería inversa, distribución no autorizada o explotación mercantil sin consentimiento expreso firmado por el Ingeniero Víctor Becerra o representante facultado de la empresa.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">2. Integraciones de Terceros e APIs</h4>
                  <p>
                    Nuestros sistemas integran herramientas de comunicación externa que requieren la utilización e interacción con APIs de terceros, tales como la API oficial de WhatsApp Cloud de Meta, Google Sheets API, Google Calendar API y Google Meet API. La sincronización e idoneidad de la transmisión de datos depende del correcto flujo, tokens de autenticación activos y las respectivas políticas de privacidad que dichas plataformas aplican de forma corporativa.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">3. Garantías de Hardware y Telecomunicaciones</h4>
                  <p>
                    Todo hardware, circuito integrado PCB, firmware embebido o instalación telemétrica provista por LUXPROC S.A.C. cumple con las normas de seguridad nacionales e internacionales. Los contratos de Nivel de Servicio (SLA) determinan el alcance del soporte predictivo, preventivo y reactivo de los equipos físicos ante anomalías de alimentación eléctrica, ruido electromagnético o factores ambientales externos.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">4. Propiedad Intelectual</h4>
                  <p>
                    La marca, códigos fuentes estructurados, metodologías de diseño industrial CAD/FEA, algoritmos de telemetría IoT, gráficos, renders y la maquetación UI de este sitio web constituyen propiedad única e intelectual protegida por leyes peruanas e internacionales de derechos de autor y patentes.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">5. Ley de Protección de Datos</h4>
                  <p>
                    De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales de Perú), los datos suministrados por los clientes potenciales a través de nuestros formularios y calendarizadores se conservarán con absoluta confidencialidad, aplicando los más rigurosos estándares de encriptación y seguridad informática.
                  </p>

                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase mt-3">6. Ley Aplicable</h4>
                  <p>
                    Para toda controversia o interpretación de las cláusulas de navegación y uso del software, las partes se someten a la legislación aplicable de la República del Perú y a la jurisdicción de los tribunales correspondientes de la provincia de Lima.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    He leído y Acepto los Términos
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Beautiful Badge trigger component to fit in the footer column beautifully.
interface RegulatoryBadgesProps {
  onOpenModal: (type: ModalType) => void;
}

export function RegulatoryBadges({ onOpenModal }: RegulatoryBadgesProps) {
  return (
    <div className="space-y-3 pt-1">
      {/* 1. Libro de Reclamaciones */}
      <motion.button
        type="button"
        whileHover={{ x: 3, scale: 1.01 }}
        onClick={() => onOpenModal("reclamaciones")}
        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-left hover:border-amber-500/40 hover:shadow transition-all duration-200 cursor-pointer select-none group"
      >
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform">
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-800 dark:text-slate-100 leading-none">
            Libro de Reclamaciones
          </h5>
          <span className="text-[9px] text-slate-400 block font-semibold leading-tight">
            Registra tu queja o reclamo virtual
          </span>
        </div>
      </motion.button>

      {/* 2. Derechos ARCO */}
      <motion.button
        type="button"
        whileHover={{ x: 3, scale: 1.01 }}
        onClick={() => onOpenModal("arco")}
        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-left hover:border-blue-500/40 hover:shadow transition-all duration-200 cursor-pointer select-none group"
      >
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-800 dark:text-slate-100 leading-none">
            Derechos ARCO
          </h5>
          <span className="text-[9px] text-slate-400 block font-semibold leading-tight">
            Acceso y privacidad de tus datos
          </span>
        </div>
      </motion.button>

      {/* 3. Términos y Condiciones */}
      <motion.button
        type="button"
        whileHover={{ x: 3, scale: 1.01 }}
        onClick={() => onOpenModal("terminos")}
        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-left hover:border-slate-400/40 dark:hover:border-slate-700/60 hover:shadow transition-all duration-200 cursor-pointer select-none group"
      >
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex-shrink-0 group-hover:scale-110 transition-transform">
          <Gavel className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-800 dark:text-slate-100 leading-none">
            Términos y Condiciones
          </h5>
          <span className="text-[9px] text-slate-400 block font-semibold leading-tight">
            Cláusulas de navegación y garantías
          </span>
        </div>
      </motion.button>
    </div>
  );
}
