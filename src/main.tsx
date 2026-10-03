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
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
