import { useEffect, useState } from "react";

interface BrandLogoProps {
  className?: string;
  isDarkMode?: boolean;
}

export default function BrandLogo({ className = "h-12 w-auto", isDarkMode = false }: BrandLogoProps) {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://i.imgur.com/dQgxO9K.png";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const x = (i / 4) % width;

          const brightness = (r + g + b) / 3;

          // Remove white/light background from original image
          if (r > 215 && g > 215 && b > 215) {
            data[i + 3] = 0; // Completely transparent
          } else if (r > 185 && g > 185 && b > 185) {
            // Soft anti-aliased edge transparency
            const alphaRatio = (215 - brightness) / 30;
            data[i + 3] = Math.floor(Math.max(0, Math.min(255, alphaRatio * 255)));
          }

          // Adjust non-transparent pixels
          if (data[i + 3] > 0) {
            if (isDarkMode) {
              // Right side: The text "LUXPROC" starts after 35% of image width
              if (x > width * 0.35) {
                // Convert dark text "LUXPROC" to clean bright white for dark mode
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
              }
              // Left side (x <= width * 0.35): The Icon (Hexagon + Cloud + Circuits)
              // Keeps 100% of its true original cyan/blue brand gradient!
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (isMounted) {
          setTransparentSrc(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        console.warn("Canvas processing error:", err);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [isDarkMode]);

  if (transparentSrc) {
    return (
      <img
        src={transparentSrc}
        alt="LUXPROC S.A.C."
        className={`${className} object-contain transition-all duration-300 pointer-events-none select-none`}
      />
    );
  }

  // Fallback while loading
  return (
    <img
      src="https://i.imgur.com/dQgxO9K.png"
      alt="LUXPROC S.A.C."
      className={`${className} object-contain transition-all duration-300 ${
        isDarkMode ? "mix-blend-screen brightness-120" : "mix-blend-multiply"
      }`}
      referrerPolicy="no-referrer"
    />
  );
}
