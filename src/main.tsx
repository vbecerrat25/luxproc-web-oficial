import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite dev server WebSocket disconnect errors from appearing in console alerts or debug overlay
if (typeof window !== "undefined") {
  // Override console.error
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const errorStr = args.map(arg => String(arg)).join(" ");
    if (
      errorStr.includes("WebSocket") || 
      errorStr.includes("websocket") || 
      errorStr.includes("vite") || 
      errorStr.includes("HMR")
    ) {
      return; // swallow
    }
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  const originalConsoleWarn = console.warn;
  console.warn = function (...args) {
    const warnStr = args.map(arg => String(arg)).join(" ");
    if (
      warnStr.includes("WebSocket") || 
      warnStr.includes("websocket") || 
      warnStr.includes("vite") || 
      warnStr.includes("HMR")
    ) {
      return; // swallow
    }
    originalConsoleWarn.apply(console, args);
  };

  // Direct property listeners are more reliable and run early
  window.onerror = function (message) {
    const msg = String(message);
    if (
      msg.includes("WebSocket") || 
      msg.includes("websocket") || 
      msg.includes("vite")
    ) {
      return true; // prevent error alert / overlay
    }
  };

  window.onunhandledrejection = function (event) {
    const reasonStr = String(event.reason || event.reason?.message || "");
    if (
      reasonStr.includes("WebSocket") || 
      reasonStr.includes("websocket") || 
      reasonStr.includes("vite")
    ) {
      event.preventDefault();
      return true; // prevent error alert / overlay
    }
  };

  // Also keep the event listener syntax for extra safety
  window.addEventListener("unhandledrejection", (event) => {
    const reasonStr = String(event.reason || event.reason?.message || "");
    if (
      reasonStr.includes("WebSocket") || 
      reasonStr.includes("websocket") || 
      reasonStr.includes("vite")
    ) {
      event.preventDefault();
    }
  });

  window.addEventListener("error", (event) => {
    if (event.message && (
      event.message.includes("WebSocket") || 
      event.message.includes("vite")
    )) {
      event.preventDefault();
    }
  });
  // Set dynamic brand favicon from LUXPROC logo with high-contrast badge (optimized for both dark and light browser tabs)
  const setupFavicon = () => {
    try {
      // High-visibility LUXPROC badge (pure white squircle with subtle dark border and bold crystal isotype)
      const highVisibilityFavicon = "data:image/png;base64,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";
      
      const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      if (links.length > 0) {
        links.forEach((l) => {
          l.href = highVisibilityFavicon;
        });
      } else {
        const link = document.createElement("link");
        link.type = "image/png";
        link.rel = "shortcut icon";
        link.href = highVisibilityFavicon;
        document.head.appendChild(link);
      }
    } catch (e) {
      console.warn("Favicon processing fallback:", e);
    }
  };

  setupFavicon();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
