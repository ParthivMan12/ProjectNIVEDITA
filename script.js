const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pencil = document.getElementById('pencil');

const img = new Image();
img.src = 'teacher.png'; // Replace with your actual image name

img.onload = () => {
  const imgWidth = img.width;
  const imgHeight = img.height;

  canvas.width = imgWidth;
  canvas.height = imgHeight;

  let y = 0;
  const speed = 2; // pixels per frame

  function drawLine() {
    if (y >= imgHeight) return;

    // Draw horizontal strip from image
    ctx.drawImage(img, 0, y, imgWidth, speed, 0, y, imgWidth, speed);

    // Move the pencil along the current y position
    pencil.style.left = (canvas.offsetLeft + imgWidth - 24) + 'px';
    pencil.style.top = (canvas.offsetTop + y) + 'px';

    y += speed;
    requestAnimationFrame(drawLine);
  }

  drawLine();
};

img.onerror = () => {
  alert("Image failed to load. Make sure the image is in the same folder.");
};
