import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollLock } from "../utils/scrollLock";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  X, 
  Server, 
  Fingerprint, 
  Mail, 
  Database, 
  ShieldAlert, 
  UserCheck 
} from "lucide-react";
import { LUXPROC_SECURITY_INFO, LUXPROC_DESIGNATED_RECIPIENT } from "../utils/cryptoSecurity";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  useScrollLock(isOpen);
  const [persistenceData, setPersistenceData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch live persistence status
      fetch("/api/system/persistence-status")
        .then(res => res.json())
        .then(data => setPersistenceData(data))
        .catch(() => {});
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10 text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Escudo Militar de Seguridad Criptográfica
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                    NIVEL 4 (DEFENSA EN PROFUNDIDAD)
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {LUXPROC_SECURITY_INFO.companyName} • RUC {LUXPROC_SECURITY_INFO.ruc}
                </p>
              </div>
            </div>

            {/* Security Status Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-blue-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                    Cifrado Militar de Extremo a Extremo (FIPS 140-2 / AES-256-GCM)
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  TLS 1.3 / AES-GCM 256
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Toda la información tratada en esta plataforma web (reuniones con Google Meet, datos del cliente, Libro de Reclamaciones, solicitudes ARCO y proyectos) está blindada bajo un escudo criptográfico militar de nivel 4. Se prohíbe y previene la exfiltración de datos, ataques Man-In-The-Middle, robo de información o suplantación (phishing).
              </p>
            </div>

            {/* Multi-Layer Persistence Guarantee Card */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-xs">
                  <Database className="w-4 h-4 text-blue-500" />
                  <span>Garantía de Persistencia Perpetua Inmutable</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded-full">
                  RETENCIÓN 100% GARANTIZADA
                </span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                Ninguna información de reuniones de Calendar, enlaces de Google Meet, quejas o datos de clientes se pierde al actualizar, modificar o reiniciar la plataforma. Funciona con un motor de <strong>triple capa de persistencia</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">Capa 1: Disco Inmutable</div>
                  <div className="text-slate-500">JSON Vault local protegido</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">Capa 2: Cloud Firestore</div>
                  <div className="text-slate-500">Base de datos en la nube</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">Capa 3: Bóveda Navegador</div>
                  <div className="text-slate-500">Almacenamiento encriptado</div>
                </div>
              </div>
              {persistenceData?.metrics && (
                <div className="pt-1 text-[10px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Reuniones guardadas: <strong>{persistenceData.metrics.totalBookings}</strong></span>
                  <span>Reclamaciones: <strong>{persistenceData.metrics.totalClaims}</strong></span>
                  <span>Solicitudes ARCO: <strong>{persistenceData.metrics.totalArcoRequests}</strong></span>
                </div>
              )}
            </div>

            {/* Designated Recipient Official Box */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                  <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Persona Oficial Designada para Recepción y Validación</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full">
                  100% VALIDADO
                </span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p>
                  <strong>Representante Legal y Oficial de Datos Personales:</strong> {LUXPROC_DESIGNATED_RECIPIENT.legalRepresentative}
                </p>
                <p>
                  <strong>Dirección Técnica de Ingeniería:</strong> {LUXPROC_DESIGNATED_RECIPIENT.engineeringDirector}
                </p>
                <p>
                  <strong>Correo Oficial Directo:</strong> <a href={`mailto:${LUXPROC_DESIGNATED_RECIPIENT.officialEmail}`} className="text-blue-600 dark:text-blue-400 font-bold underline">{LUXPROC_DESIGNATED_RECIPIENT.officialEmail}</a>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Cualquier gestión formal (Libro de Reclamaciones, Derechos ARCO o contrataciones) es canalizada formalmente y con sellos criptográficos SHA-256 hacia dicha titularidad.
                </p>
              </div>
            </div>

            {/* Anti-Phishing Highlights */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-500" /> Medidas Oficiales contra Ataques de Phishing y Spoofing
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* 1. Official Domain */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Dominio Oficial Certificado</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">https://luxproc.com</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Verifique siempre el candado de seguridad y el dominio exacto.</p>
                </div>

                {/* 2. Official RUC */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Registro Tributario Oficial (RUC)</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">{LUXPROC_SECURITY_INFO.ruc}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. - RUC Formal Activo.</p>
                </div>

                {/* 3. Official Email */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Único Correo Oficial de Contacto</span>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${LUXPROC_SECURITY_INFO.officialEmail}`} className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs hover:underline">
                      {LUXPROC_SECURITY_INFO.officialEmail}
                    </a>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Rechace remitentes alternativos o no autorizados.</p>
                </div>

                {/* 4. Strict Headers */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Cabeceras de Servidor Blindadas</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">HSTS Preload & Anti-Clickjacking</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">X-Frame-Options SAMEORIGIN bloquea clonaciones maliciosas.</p>
                </div>
              </div>
            </div>

            {/* Institutional Disclaimer Banner */}
            <div className="mt-5 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Aviso de Desvinculación Institucional</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Esta plataforma tecnológica, sus desarrollos de software (ERP, CRM, sistemas cloud) y servicios de consultoría no tienen vínculo con CIP (Colegio de Ingenieros del Perú), SUNAT u OSE.
              </p>
            </div>

            {/* Legal regulatory compliance footer note */}
            <p className="mt-5 text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
              Cumplimiento pleno de la <strong>Ley N° 29733 (Protección de Datos Personales de la República del Perú)</strong> y la <strong>Ley N° 29571 (Código de Protección y Defensa del Consumidor)</strong>.
            </p>

            {/* Footer button */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Cerrar Certificado de Seguridad
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
