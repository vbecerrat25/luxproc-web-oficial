import { useState } from "react";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

interface BrandLogoProps {
  className?: string;
  isDarkMode?: boolean;
}

export default function BrandLogo({
  className = "h-11 md:h-12 w-auto",
  isDarkMode = false,
}: BrandLogoProps) {
  const [loadError, setLoadError] = useState(false);

  // En modo oscuro: las letras son 100% blancas (#FFFFFF), el isotipo gráfico mantiene sus colores originales idénticos.
  // En modo claro: todo el logo y sus letras se mantienen exactamente con los colores originales.
  const activeLogo = isDarkMode ? logoDark : logoLight;
  const fallbackUrl = "https://i.imgur.com/WWChkA9.png";

  return (
    <div className="inline-flex items-center select-none group">
      <img
        src={loadError ? fallbackUrl : activeLogo}
        alt="LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C."
        className={`${className} object-contain transition-all duration-300 group-hover:scale-[1.02]`}
        onError={() => setLoadError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
