    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const pencil = document.getElementById('pencil');

    const img = new Image();
    img.src = 'teacher.png'; // Make sure this image exists

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Offscreen canvas to get pixel data
      const offscreen = document.createElement('canvas');
      offscreen.width = img.width;
      offscreen.height = img.height;
      const offCtx = offscreen.getContext('2d');
      offCtx.drawImage(img, 0, 0);

      const imageData = offCtx.getImageData(0, 0, img.width, img.height);

      let x = 0;
      let barHeight = 10; // Speed: draw 10 vertical pixels at once

      function drawBar() {
        if (x >= img.width) return;

        // Draw a vertical bar of pixels from (x, 0) to (x, height)
        const column = ctx.createImageData(1, img.height);
        for (let y = 0; y < img.height; y++) {
          const srcIndex = (y * img.width + x) * 4;
          const destIndex = y * 4;
          for (let i = 0; i < 4; i++) {
            column.data[destIndex + i] = imageData.data[srcIndex + i];
          }
        }

        ctx.putImageData(column, x, 0);

        // Move pencil to the latest x position
        pencil.style.left = (canvas.offsetLeft + x) + 'px';
        pencil.style.top = (canvas.offsetTop + img.height / 2) + 'px';

        x += 5; // Increase to draw wider bars, e.g., 5 pixels at once

        requestAnimationFrame(drawBar);
      }

      drawBar();
    };

    img.onerror = () => {
      alert("Image failed to load. Make sure 'teacher.png' is in the same folder.");
    };
