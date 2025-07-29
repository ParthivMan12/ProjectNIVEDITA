const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load precached image
const img = new Image();
img.src = 'teacher.png';

img.onload = () => {
  const width = img.width;
  const height = img.height;
  canvas.width = width;
  canvas.height = height;

  // Draw the full image to an offscreen canvas
  const offCanvas = document.createElement('canvas');
  offCanvas.width = width;
  offCanvas.height = height;
  const offCtx = offCanvas.getContext('2d');
  offCtx.drawImage(img, 0, 0);
  const imageData = offCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // Convert to grayscale sketch style
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = avg;
  }

  // Animate drawing line by line
  let y = 0;
  function drawLine() {
    if (y >= height) return;
    const line = offCtx.createImageData(width, 1);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      line.data[x * 4 + 0] = pixels[i];
      line.data[x * 4 + 1] = pixels[i + 1];
      line.data[x * 4 + 2] = pixels[i + 2];
      line.data[x * 4 + 3] = 255;
    }
    ctx.putImageData(line, 0, y);
    y++;
    requestAnimationFrame(drawLine);
  }

  drawLine();
};
