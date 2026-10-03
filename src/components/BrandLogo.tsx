import React, { useState } from "react";

interface BrandLogoProps {
  className?: string;
  isDarkMode?: boolean;
  id?: string;
}

export default function BrandLogo({
  className = "h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain",
  isDarkMode = false,
  id = "logo-text-fallback",
}: BrandLogoProps) {
  const [src, setSrc] = useState<string>("https://i.imgur.com/WWChkA9.png");
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // 1. If external Imgur fails or is blocked by network/adblocker, immediately switch to local bundled official logo
    if (src === "https://i.imgur.com/WWChkA9.png") {
      setSrc("/logo-official.png");
      return;
    }
    // 2. If local logo fails, try local favicon
    if (src === "/logo-official.png") {
      setSrc("/favicon.png");
      return;
    }
    // 3. Only if all fail, hide img and reveal fallback element
    e.currentTarget.style.display = "none";
    setIsFailed(true);
    const fallbackEl = document.getElementById(id);
    if (fallbackEl) fallbackEl.style.display = "inline-flex";
  };

  return (
    <div className="inline-flex items-center select-none group">
      <img 
        src={src} 
        alt="LUXPROC" 
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
        referrerPolicy="no-referrer"
        onError={handleError}
      />
      <span 
        id={id} 
        style={{ display: isFailed ? "inline-flex" : "none" }}
        className="font-black text-xl tracking-tight text-slate-900 dark:text-white items-center gap-2"
      >
        <img 
          src="/favicon-32x32.png" 
          alt="LUXPROC" 
          className="w-7 h-7 object-contain inline-block" 
        />
        <span>LUXPROC</span>
      </span>
    </div>
  );
}
