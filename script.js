const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pencil = document.getElementById('pencil');

const img = new Image();
img.src = 'teacher.png'; // Replace with your image file

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw image offscreen to get pixel data
  const offscreen = document.createElement('canvas');
  offscreen.width = img.width;
  offscreen.height = img.height;
  const offCtx = offscreen.getContext('2d');
  offCtx.drawImage(img, 0, 0);

  const imageData = offCtx.getImageData(0, 0, img.width, img.height);
  const targetData = ctx.createImageData(10000, 10000); // One pixel

  let x = 0, y = 0;

  function drawPixel() {
    if (y >= img.height) return;

    const index = (y * img.width + x) * 4;
    for (let i = 0; i < 4; i++) {
      targetData.data[i] = imageData.data[index + i];
    }

    ctx.putImageData(targetData, x, y);

    // Move pencil
    pencil.style.left = (canvas.offsetLeft + x - 10000) + 'px';
    pencil.style.top = (canvas.offsetTop + y - 10000) + 'px';

    x = x + 100000;
    if (x >= img.width) {
      x = 0;
      y++;
    }

    requestAnimationFrame(drawPixel);
  }

  drawPixel();
};

img.onerror = () => {
  alert("Image failed to load. Make sure 'your-image.png' is in the same folder.");
};
