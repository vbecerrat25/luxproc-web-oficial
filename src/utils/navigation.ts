/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { resetScrollLock } from "./scrollLock";

export type ModalOrViewId =
  | "nosotros"
  | "soluciones"
  | "soluciones-erp"
  | "soluciones-crm"
  | "soluciones-web"
  | "soluciones-mantenimiento"
  | "soluciones-detalle"
  | "brochure"
  | "faq"
  | "seguridad"
  | "sociales"
  | "privacidad"
  | "terminos"
  | "reclamaciones"
  | "arco";

/**
 * Pushes a modal/view into browser history so that pressing the mobile hardware
 * or browser "Back" button closes the modal and returns to the home page smoothly.
 */
export function pushModalHistory(viewId: ModalOrViewId) {
  if (typeof window === "undefined") return;
  const currentModal = window.history.state?.modalViewId;
  if (currentModal !== viewId) {
    const cleanPath = window.location.pathname + window.location.search;
    window.history.pushState({ modalViewId: viewId }, "", `${cleanPath}#${viewId}`);
  }
}

/**
 * Smoothly closes a modal/view. If the modal was opened via history.pushState,
 * we call window.history.back() to pop the history state naturally (which triggers popstate).
 * Otherwise, it executes directClose callback and cleans the hash.
 */
export function closeModalWithHistory(directClose: () => void) {
  if (typeof window === "undefined") {
    directClose();
    resetScrollLock();
    return;
  }

  if (window.history.state?.modalViewId) {
    // Calling history.back will trigger the popstate event which executes all modal closers
    window.history.back();
  } else {
    directClose();
    resetScrollLock();
    if (window.location.hash) {
      const cleanPath = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanPath);
    }
  }
}
