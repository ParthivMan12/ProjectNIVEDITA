function drawPixel() {
  let count = 0;
  while (count < 100000 && y < img.height) { // Draw 10 pixels per frame
    const index = (y * img.width + x) * 4;
    for (let i = 0; i < 4; i++) {
      targetData.data[i] = imageData.data[index + i];
    }

    ctx.putImageData(targetData, x, y);

    // Move pencil
    pencil.style.left = (canvas.offsetLeft + x - 10000) + 'px';
    pencil.style.top = (canvas.offsetTop + y - 10000) + 'px';

    x = x + 1;
    if (x >= img.width) {
      x = 0;
      y++;
    }
    count++;
  }

  if (y < img.height) {
    requestAnimationFrame(drawPixel);
  }
}
