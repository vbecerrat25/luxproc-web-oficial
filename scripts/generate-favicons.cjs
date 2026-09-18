const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const rawPath = path.join(__dirname, "../public/brand-logo-raw.png");
if (!fs.existsSync(rawPath)) {
  console.error("raw file not found");
  process.exit(1);
}

fs.createReadStream(rawPath)
  .pipe(new PNG())
  .on("parsed", function() {
    const src = this;
    // Bounding box of the symbol: x: 103..664 (w=562), y: 400..1040 (h=641)
    const symMinX = 103;
    const symMaxX = 664;
    const symMinY = 400;
    const symMaxY = 1040;
    const symW = symMaxX - symMinX + 1;
    const symH = symMaxY - symMinY + 1;

    // Helper to generate a square PNG of size N x N
    function generateSquare(size, withDarkBg = false) {
      const out = new PNG({ width: size, height: size });
      
      // Background: either dark (#0F172A) or transparent
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let idx = (size * y + x) << 2;
          if (withDarkBg) {
            out.data[idx] = 15;      // R
            out.data[idx + 1] = 23;  // G
            out.data[idx + 2] = 42;  // B
            out.data[idx + 3] = 255; // A
          } else {
            out.data[idx] = 0;
            out.data[idx + 1] = 0;
            out.data[idx + 2] = 0;
            out.data[idx + 3] = 0;   // Transparent
          }
        }
      }

      // Calculate target dimensions with ~15% padding
      const maxDim = size * 0.76;
      const scale = Math.min(maxDim / symW, maxDim / symH);
      const targetW = Math.round(symW * scale);
      const targetH = Math.round(symH * scale);
      const offsetX = Math.round((size - targetW) / 2);
      const offsetY = Math.round((size - targetH) / 2);

      // Resample nearest / bilinear from source symbol
      for (let ty = 0; ty < targetH; ty++) {
        for (let tx = 0; tx < targetW; tx++) {
          const sx = symMinX + Math.floor(tx / scale);
          const sy = symMinY + Math.floor(ty / scale);
          if (sx <= symMaxX && sy <= symMaxY) {
            const sIdx = (src.width * sy + sx) << 2;
            const sr = src.data[sIdx];
            const sg = src.data[sIdx + 1];
            const sb = src.data[sIdx + 2];
            
            // Check if source pixel is non-white
            const isWhite = (sr > 245 && sg > 245 && sb > 245);
            if (!isWhite) {
              const outX = offsetX + tx;
              const outY = offsetY + ty;
              if (outX >= 0 && outX < size && outY >= 0 && outY < size) {
                const outIdx = (size * outY + outX) << 2;
                out.data[outIdx] = sr;
                out.data[outIdx + 1] = sg;
                out.data[outIdx + 2] = sb;
                out.data[outIdx + 3] = 255;
              }
            }
          }
        }
      }

      return out;
    }

    const sizes = [
      { size: 512, name: "favicon-512x512.png" },
      { size: 192, name: "favicon-192x192.png" },
      { size: 96, name: "favicon-96x96.png" },
      { size: 64, name: "favicon.png" },
      { size: 48, name: "favicon-48x48.png" },
      { size: 32, name: "favicon-32x32.png" },
      { size: 16, name: "favicon-16x16.png" },
      { size: 180, name: "apple-touch-icon.png" }
    ];

    sizes.forEach(({ size, name }) => {
      // Use transparent background for clean modern appearance
      const png = generateSquare(size, false);
      const outPath = path.join(__dirname, "../public", name);
      const buffer = PNG.sync.write(png);
      fs.writeFileSync(outPath, buffer);
      console.log(`Generated ${name} (${size}x${size}) - ${buffer.length} bytes`);
    });

    console.log("All favicons generated successfully!");
  });
