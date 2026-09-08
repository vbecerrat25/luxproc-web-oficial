import { useEffect } from "react";

let lockCount = 0;
let originalBodyOverflow = "";
let originalHtmlOverflow = "";

export function lockScroll() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  lockCount++;
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalBodyOverflow;
    document.documentElement.style.overflow = originalHtmlOverflow;
  }
}

export function resetScrollLock() {
  lockCount = 0;
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }
}

/**
 * React hook to lock body/html scroll when a modal or fullview is open,
 * preventing duplicate/double scrollbars from appearing on the viewport.
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [isLocked]);
}
