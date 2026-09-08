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
  // Set dynamic brand favicon from LUXPROC logo with 100% transparent background
  const setupFavicon = () => {
    try {
      // 100% transparent crisp LUXPROC isotype (Cyan & Royal Blue circuits and hexagon)
      const transparentFavicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC1klEQVR4Ae3BPY8bVRiG4fvdsb3x7rHzK5CJaChoadNRByq6oaCk4DcgIVEgFDISBTSIGokiiAJBlSIVzdDylQUJKZ5jz4xnznk4cqyVGe1mPygostfFjRsvPOM/cKUXO37hjGs44H9mXIMrvTiDXzjjiowrcKUXzyNQgNUrzrikAy7JlV7s8Qtn7PiFMwkUgA6OHlU6+rESlzDiAq70Yo9fOGOf2Fq97Izk6FElWlAD068r1W/MjOcwLuBKLwb8whnJ8U9eRGADq9ecsTN9WIkaVAtVoAaIoEZ079829hww4EovV3ox4BfOGOqBFtSK6XeVpt9UIqnvziz+LVSBIijA+NcZ45M5QyPO4UovBhSBwKnVq86OfqikFqhBrTj8Yika0BLUQ/fe3Eg6IMulLJdIQmFGMnKlF2fwC2ckrvRCPNMCgX9Zvz4zkltfLaUGtAZaGP82I/bQAVkucY4R53CllyKoByJbagQ9p259uVTz1txImntzG3/wVCSTv+Zs1qAIWS6RhMKMPVkukYz8whk7rvQiUYTVHWckx4+9iDyzBnWcUgOTB0tpDZPfZ+hPiB30EWLPVijMslzKcokzjEhc6cW+CMePvdQJ1YLAljyoFYefL9W+PTdVoA4mJzPCBmIPitDdN8tyiSTLJXZCYcZOlkskI3YUYXXHGQPTh5UIbGktVINqGH/4VONfZsQe+h5CBxKEB2YMhMKMJMslklCYhcKMZESiCES2jr6vRAD1UN+dmVZAIw4/W6p5c26Tj5dSI8ZP5nQ1xAj9p2bsyXKJPVkucQ5jYPptJQLQghqhNRBBK5j8MSM0UH9kNnlXCh1boTBjJ8slBkJhRpLlEkkozNgZMbQBbYAgmntzm9xfSg0cnswIDfQtZLm0+cQsyyV2slxiTyjMGAiFGQPGFWTv6CXEz1wgFGZcknENWS5xhlCYcUXGNWW5xJ5QmHENB9y48aL7BxeOmWB2HchfAAAAAElFTkSuQmCC";
      
      const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      if (links.length > 0) {
        links.forEach((l) => {
          l.href = transparentFavicon;
        });
      } else {
        const link = document.createElement("link");
        link.type = "image/png";
        link.rel = "shortcut icon";
        link.href = transparentFavicon;
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
