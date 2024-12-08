const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
const telescope = document.getElementById('telescope');
const message = document.getElementById('message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let constellations = [];
let found = false;

let isDragging = false;

// Generar estrellas aleatorias
function createStars() {
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: 'white',
    });
  }

  // Generar una constelación especial
  constellations = [
    { x: 200, y: 300 },
    { x: 250, y: 350 },
    { x: 300, y: 300 },
  ];
}

// Dibujar estrellas
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar todas las estrellas
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  });

  // Dibujar la constelación
  ctx.beginPath();
  ctx.strokeStyle = found ? 'red' : 'white';
  ctx.lineWidth = 2;

  constellations.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });

  ctx.stroke();
}

// Detectar si el telescopio encuentra la constelación
function checkConstellation(x, y) {
  let inside = true;

  constellations.forEach((point) => {
    const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
    if (distance > 50) inside = false;
  });

  if (inside && !found) {
    found = true;
    message.classList.remove('hidden');
  }
}

// Manejo del movimiento del telescopio
telescope.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    telescope.style.left = '${e.clientX}px';
    telescope.style.top = '${e.clientY}px';

    // Detectar si está sobre la constelación
    checkConstellation(e.clientX, e.clientY);
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Inicializar
createStars();
setInterval(drawStars, 50);