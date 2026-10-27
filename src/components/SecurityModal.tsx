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
import { useLanguage } from "../utils/i18n";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  useScrollLock(isOpen);
  const { t } = useLanguage();
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
                    {t.securityModal.shieldTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                    {t.securityModal.levelBadge}
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
                    {t.securityModal.encryptionTitle}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {t.securityModal.tlsBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {t.securityModal.encryptionDesc}
              </p>
            </div>

            {/* Multi-Layer Persistence Guarantee Card */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-xs">
                  <Database className="w-4 h-4 text-blue-500" />
                  <span>{t.securityModal.persistenceTitle}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded-full">
                  {t.securityModal.persistenceBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.securityModal.persistenceDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">{t.securityModal.layer1Title}</div>
                  <div className="text-slate-500">{t.securityModal.layer1Desc}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">{t.securityModal.layer2Title}</div>
                  <div className="text-slate-500">{t.securityModal.layer2Desc}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900">
                  <div className="font-bold text-blue-600 dark:text-blue-400">{t.securityModal.layer3Title}</div>
                  <div className="text-slate-500">{t.securityModal.layer3Desc}</div>
                </div>
              </div>
              {persistenceData?.metrics && (
                <div className="pt-1 text-[10px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                  <span>{t.securityModal.savedBookings} <strong>{persistenceData.metrics.totalBookings}</strong></span>
                  <span>{t.securityModal.totalClaims} <strong>{persistenceData.metrics.totalClaims}</strong></span>
                  <span>{t.securityModal.totalArco} <strong>{persistenceData.metrics.totalArcoRequests}</strong></span>
                </div>
              )}
            </div>

            {/* Designated Recipient Official Box */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                  <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.securityModal.recipientTitle}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full">
                  {t.securityModal.validatedBadge}
                </span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p>
                  <strong>{t.securityModal.legalRepLabel}</strong> {LUXPROC_DESIGNATED_RECIPIENT.legalRepresentative}
                </p>
                <p>
                  <strong>{t.securityModal.techDirLabel}</strong> {t.securityModal.techDirVal}
                </p>
                <p>
                  <strong>{t.securityModal.officialEmailLabel}</strong> <a href={`mailto:${LUXPROC_DESIGNATED_RECIPIENT.officialEmail}`} className="text-blue-600 dark:text-blue-400 font-bold underline">{LUXPROC_DESIGNATED_RECIPIENT.officialEmail}</a>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t.securityModal.channelNote}
                </p>
              </div>
            </div>

            {/* Anti-Phishing Highlights */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-500" /> {t.securityModal.antiPhishingTitle}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* 1. Official Domain */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{t.securityModal.certDomainTitle}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">https://luxproc.com</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.securityModal.certDomainDesc}</p>
                </div>

                {/* 2. Official RUC */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{t.securityModal.rucTitle}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">{LUXPROC_SECURITY_INFO.ruc}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.securityModal.rucDesc}</p>
                </div>

                {/* 3. Official Email */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{t.securityModal.emailTitle}</span>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${LUXPROC_SECURITY_INFO.officialEmail}`} className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs hover:underline">
                      {LUXPROC_SECURITY_INFO.officialEmail}
                    </a>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.securityModal.emailDesc}</p>
                </div>

                {/* 4. Strict Headers */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{t.securityModal.headersTitle}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">HSTS Preload & Anti-Clickjacking</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.securityModal.headersDesc}</p>
                </div>
              </div>
            </div>

            {/* Institutional Disclaimer Banner */}
            <div className="mt-5 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.securityModal.disclaimerTitle}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                {t.securityModal.disclaimerDesc}
              </p>
            </div>

            {/* Legal regulatory compliance footer note */}
            <p className="mt-5 text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
              {t.securityModal.lawsNote}
            </p>

            {/* Footer button */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {t.securityModal.closeBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
