const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = (canvas.width = 300);

let ch = (canvas.height = 300);

let c = {};
c.x = cw / 2;
c.y = ch / 2;

let R = 50;
let r = 20;
let lineWidth = 30;
let m = { x: -100, y: -100 };

ctx.fillStyle = "#d9d9d9";
ctx.strokeStyle = "rgba(255,0,0,.5)";
ctx.lineWidth = 30;

// main circle
drawCircle(c.x, c.y, R);

canvas.addEventListener("mousemove", (evt) => {
  ctx.clearRect(0, 0, cw, ch);
  m = oMousePos(canvas, evt);
  drawCircle(c.x, c.y, R);
  drawCircle(m.x, m.y, r);

  if (dist(c, m) <= R + r + lineWidth) {
    output.innerHTML = "collision";
  } else {
    output.innerHTML = "";
  }
});

function drawCircle(cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function dist(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return {
    //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top),
  };
}
