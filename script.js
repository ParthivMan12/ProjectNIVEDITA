const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'teacher.png'; // Must be in same folder

img.onload = function () {
   canvas.width = img.width;
   canvas.height = img.height;
   ctx.drawImage(img, 0, 0);
};

img.onerror = function () {
   alert("Could not load the image. Make sure the image is in the same folder.");
};