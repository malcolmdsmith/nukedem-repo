const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawBase(x, y, radius) {
  console.info("drawBase");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x, y, radius, 1 * Math.PI, 0 * Math.PI);
  ctx.fill();
}

function isBaseInPath(baseData, path) {
  const radius = baseData.radius;
  for (
    let x = baseData.x - radius;
    x <= baseData.x + 2 * radius;
    x += 1 //radius
  ) {
    for (
      let y = baseData.y - radius;
      y <= baseData.y + 2 * radius;
      y += 1 //radius
    ) {
      // console.info("x:", x, " y:", y);
      if (ctx.isPointInPath(path, x, y)) return true;
    }
  }
  return false;
}

function drawPath(x, y, radius) {
  const path = new Path2D();
  ctx.strokeStyle = "white";
  path.moveTo(1090, 489);
  path.lineTo(1091, 490);
  ctx.stroke(path);

  const baseData = { radius, x, y };
  if (this.isBaseInPath(baseData, path)) {
    console.info("HIT");
    return true;
  } else {
    console.info("MISS");
  }
}

function drawShootingStar(x, y) {
  console.info("drawShootingStar");
  const grad = ctx.createLinearGradient(x, y, x + 40, y + 40);
  grad.addColorStop(0, "black");
  grad.addColorStop(1, "white");
  ctx.strokeStyle = grad;
  //ctx.fillRect(x, y, x + 40, y + 40);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 40, y + 40);
  ctx.stroke();
}

function drawGradient() {
  const gradient = ctx.createLinearGradient(20, 0, 220, 0);

  // Add three color stops
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "cyan");
  gradient.addColorStop(1, "green");

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  ctx.fillRect(20, 20, 200, 100);
}

drawBase(1089, 500, 10);
// drawPath(1089, 500, 10);
drawGradient();
drawShootingStar(400, 100);

let x = 400;
let y = 100;

function animate() {
  x += 1;
  y += 1;
  drawShootingStar(x, y);
  requestAnimationFrame(animate);
}

animate();
