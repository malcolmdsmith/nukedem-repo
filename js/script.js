"use strict";

window.addEventListener("load", function () {
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  loadGame();
});
// window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   //loadGame();
// });

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let moon = new Image();
moon.src = "assets/images/moon.jpg";
let saturn = new Image();
saturn.src = "assets/images/saturn.png";
let black_missile = new Image();
black_missile.src = "assets/images/black-missile.png";
let deathStar = new Image();
deathStar.src = "assets/images/deathStar2.png";
let white_missile = new Image();
white_missile.src = "assets/images/white-missile.png";
const MISSILE_SCALE = 6;
// let flames = new Image();
// flames.src = "assets/images/flames.gif";
let holeInGround = new Image();
holeInGround.src = "assets/images/holeInground.png";
const flames = document.getElementById("flames");

const MISS = 1;
const HIT = 2;
const OUT_OF_BOUNDS = 3;
const NO_HIT = 4;
const DESTROYED = 5;
const AWAITING_FIRE = 6;

const ACTIVE = 1;
const INACTIVE = 0;

const ANIMATION_LENGTH = 3000;

const MINIMUM_BASE_DISTANCE = 80;

const BASEWIDTH = 20;
const NUMBER_ROUNDS = 3;

let maxStars = 300;
let stars = [];
let hitPhrases = [];
let time = 0;
let timerInterval = 0.04;
let gameFrame = 0;
const staggerFrames = 155;
let windVelocity = 100;
let missileStatus = 1;
let playersTurn = 1;
let round = 1;

class HitPhrases {
  hitPhrases = new Array();

  constructor() {
    this.hitPhrases.push("NICE SHOT BOB. WAY TO GO <player>.");
    this.hitPhrases.push("NICE FIRING <player>.");
    this.hitPhrases.push("WOW! THIS GUYS A HOT SHOT!");
    this.hitPhrases.push("BETTER GET YOUR ACT TOGETHER <opponent>.");
    this.hitPhrases.push("CRACK SHOT, ACE!");
    this.hitPhrases.push("NICE SHOT! GO TEAM <player>.");
    this.hitPhrases.push("ALRIGHT!!!!!!");
    this.hitPhrases.push("TOP GUN HEY!");
    this.hitPhrases.push("WISE GUY, HUH!");
  }

  getPhrase(player, opponent) {
    let rand = Math.floor(Math.random() * this.hitPhrases.length);
    let phrase = this.hitPhrases[rand];
    if (player == "") phrase = phrase.replace("<player>", "JOE");
    else phrase = phrase.replace("<player>", player);
    if (opponent == "") phrase = phrase.replace("<opponent>", "JOE");
    else phrase = phrase.replace("<opponent>", opponent);

    return phrase;
  }
}

class ShootingStar {
  x;
  y;
  direction;
  trail;
  timeTolive;
  colors = [];
  color;
  constructor(num) {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.direction = num;
    this.colors[0] = "red";
    this.colors[1] = "white";
    this.colors[2] = "yellow";
    this.colors[3] = "green";
    this.init();
  }
  init() {
    this.trail = getRandomInt(20, 100);
    this.timeTolive = getRandomInt(300, 700);
    this.color = this.colors[getRandomInt(1, 4) - 1];
  }
  update() {
    if (this.x < 0 || this.y > canvas.height + 20 || this.timeTolive == 0) {
      this.x = Math.random() * canvas.width;
      this.y = getRandomInt(-10, 100);
      this.init();
    } else {
      this.x += 1 * this.direction;
      this.y += getRandomInt(1, 2);
      this.timeTolive -= 1;
    }
  }
  draw() {
    const grad = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + this.trail * this.direction,
      this.y + this.trail
    );
    grad.addColorStop(0, "black");
    grad.addColorStop(1, this.color);
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.trail * this.direction, this.y + this.trail);
    ctx.stroke();
  }
}

class NukedEmBaseType {
  fillColor;
  captionColor;
  points;
  missileBase;

  constructor(fillColor, captionColor, points, missileBase) {
    this.fillColor = fillColor;
    this.captionColor = captionColor;
    this.points = points;
    this.missileBase = missileBase;
  }
}

class NukedEmBase {
  X;
  Y;
  X2;
  Y2;
  fillColor;
  captionColor;
  points;
  player;
  missileBase;
  baseStatus = ACTIVE;

  constructor(
    x,
    y,
    x2,
    y2,
    fillColor,
    captionColor,
    points,
    player,
    missileBase,
    baseNo
  ) {
    this.X = x;
    this.Y = y;
    this.X2 = x2;
    this.Y2 = y2;
    this.fillColor = fillColor;
    this.captionColor = captionColor;
    this.points = points;
    this.player = player;
    this.missileBase = missileBase;
    this.baseNo = baseNo;
  }
}

class Landscape {
  base1Y;
  base2Y;
  base1X;
  base2X;
  mountainX;
  mountainWidth;
  nukedEmBaseTypes = [];
  nukedEmBases = [];

  constructor() {
    this.createBaseTypes();
    this.createDemoLandscape();
    // this.createBases();
  }

  createBaseTypes() {
    let baseType = new NukedEmBaseType();
    baseType.fillColor = "red";
    baseType.captionColor = "white";
    baseType.points = 100;
    baseType.missileBase = false;
    this.nukedEmBaseTypes.push(baseType);

    baseType = new NukedEmBaseType();
    baseType.fillColor = "yellow";
    baseType.captionColor = "black";
    baseType.points = 70;
    baseType.missileBase = false;
    this.nukedEmBaseTypes.push(baseType);

    baseType = new NukedEmBaseType();
    baseType.fillColor = "blue";
    baseType.captionColor = "white";
    baseType.points = 40;
    baseType.missileBase = false;
    this.nukedEmBaseTypes.push(baseType);
  }

  createLandscape() {
    this.base1Y = getRandomInt(canvas.height - 300, canvas.height - 100);
    this.base2Y = getRandomInt(canvas.height - 300, canvas.height - 100);
    this.mountainX = canvas.width / 2;
    const h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
    this.mountainY = getRandomInt(200, h);
    this.mountainWidth = getRandomInt(200, 400);
    this.createBases();
  }

  createDemoLandscape() {
    const height = canvas.height * 0.8;
    this.base1Y = height;
    this.base2Y = height;
    this.mountainX = canvas.width / 2;
    const h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
    this.mountainY = 300;
    this.mountainWidth = 250;
    this.createDemoBases();
  }

  createBases() {
    this.nukedEmBaseTypes.forEach((baseType) => {
      let x = 0;
      let cntr = 0;
      //Player 1 Bases
      let max = Math.floor(this.mountainX - this.mountainWidth / 2 - 30);
      do {
        x = getRandomInt(0, max);
        cntr += 1;
        if (cntr > 20) break;
      } while (this.checkMinimumDistanceBetweenBases(x, 1) === false);
      this.createBase(x, this.base1Y, 0, 0, 1, baseType);

      //Player 2 Bases
      cntr = 0;
      do {
        x = getRandomInt(
          this.mountainX + this.mountainWidth / 2 + 30,
          canvas.width
        );

        cntr += 1;
        if (cntr > 20) break;
      } while (this.checkMinimumDistanceBetweenBases(x, 2) === false);
      this.createBase(x, this.base2Y, 0, 0, 2, baseType);
    });
  }

  createBase(x, y, x2, y2, player, baseType) {
    let nukedEmBase = new NukedEmBase(
      x,
      y,
      x2,
      y2,
      baseType.fillColor,
      baseType.captionColor,
      baseType.points,
      player,
      baseType.missileBase
    );
    this.nukedEmBases.push(nukedEmBase);
  }

  createDemoBases() {
    this.createBase(
      100,
      this.base1Y,
      120,
      this.base1Y - 10,
      1,
      this.nukedEmBaseTypes[0]
    );
    this.createBase(
      250,
      this.base1Y,
      270,
      this.base1Y - 10,
      1,
      this.nukedEmBaseTypes[1]
    );
    this.createBase(
      350,
      this.base1Y,
      370,
      this.base1Y - 10,
      1,
      this.nukedEmBaseTypes[2]
    );
    this.createBase(
      canvas.width - 100,
      this.base2Y,
      canvas.width - 80,
      this.base2Y - 10,
      2,
      this.nukedEmBaseTypes[0]
    );
    this.createBase(
      canvas.width - 250,
      this.base2Y,
      canvas.width - 230,
      this.base2Y - 10,
      2,
      this.nukedEmBaseTypes[1]
    );
    this.createBase(
      canvas.width - 350,
      this.base2Y,
      canvas.width - 330,
      this.base2Y - 10,
      2,
      this.nukedEmBaseTypes[2]
    );
  }

  getMissileBaseX(player) {
    const base = this.nukedEmBases.filter(
      (f) => f.player == player && f.missileBase === true
    );

    return base[0].X;
  }

  determineBaseHit() {
    return this.nukedEmBases.filter((f) => f.baseStatus == HIT)[0];
  }

  areAllBasesDestroyed() {
    let player1bases = this.nukedEmBases.filter(
      (f) => f.player == 1 && f.baseStatus == DESTROYED
    );
    let player2bases = this.nukedEmBases.filter(
      (f) => f.player == 2 && f.baseStatus == DESTROYED
    );

    console.info("count:", player1bases.length, player2bases.length);

    if (
      player1bases.length == this.nukedEmBaseTypes.length ||
      player2bases.length == this.nukedEmBaseTypes.length
    )
      return true;

    return false;
  }

  playerHasNoLaunchBase(player) {
    const bases = this.nukedEmBases.filter(
      (f) => f.player == player && f.missileBase == true
    );
    return bases.length == 0;
  }

  checkMinimumDistanceBetweenBases(x, player) {
    //   const bases = this.nukedEmBases.filter((base) => (base.player = player));

    this.nukedEmBases.forEach((base) => {
      let diff = x - base.X;
      let result = Math.abs(diff) > MINIMUM_BASE_DISTANCE;

      if (result === false) {
        // console.info(
        //   "Minimum = ",
        //   diff,
        //   ", ",
        //   base.player,
        //   result,
        //   base.fillColor,
        //   x,
        //   base.X
        // );
      }

      return result;
    });

    return false;
  }

  draw() {
    let grd = ctx.createLinearGradient(0, this.mountainY, 0, canvas.height);
    grd.addColorStop(0, "brown");
    grd.addColorStop(0.7, "orange");
    grd.addColorStop(1, "brown");
    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.moveTo(0, this.base1Y);
    ctx.lineTo(this.mountainX - this.mountainWidth / 2, this.base1Y);
    ctx.lineTo(this.mountainX, this.mountainY);
    ctx.lineTo(this.mountainX + this.mountainWidth / 2, this.base2Y);
    ctx.lineTo(canvas.width, this.base2Y);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
    this.drawBases();
    this.drawPlayerNames();
  }
  drawBases() {
    this.nukedEmBases.forEach((base) => {
      // console.info(base.X, base.Y, base.fillColor);

      if (base.baseStatus == DESTROYED) {
        ctx.drawImage(
          holeInGround,
          base.X - holeInGround.width / 2,
          base.Y,
          50,
          20
        );
      } else {
        ctx.beginPath();
        ctx.fillStyle = base.fillColor;
        ctx.arc(
          base.X, // + BASEWIDTH / 2,
          base.Y,
          BASEWIDTH / 2,
          1 * Math.PI,
          0 * Math.PI
        );
        ctx.fill();
      }
    });
  }

  getScoreForPlayer(player) {
    let opponentsBase = player == 1 ? 2 : 1;

    let hits = this.nukedEmBases.filter(
      (f) => f.player == opponentsBase && f.baseStatus == DESTROYED
    );
    // console.info(hits);
    let score = hits
      .map((hit) => hit.points)
      .reduce((partialsum, a) => partialsum + a, 0);

    return score;
  }

  updateScore() {
    const player1Score = this.getScoreForPlayer(1);
    const player2Score = this.getScoreForPlayer(2);

    let text = "ROUND " + round;
    let width = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height - 80);
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2 - width / 2 - 2, canvas.height - 82);

    text = "Score: " + player1Score + " - " + player2Score;
    width = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height - 40);
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2 - width / 2 - 2, canvas.height - 42);
  }

  async drawExplosion() {
    const sound = document.getElementById("explosion-sound");
    //sound.play();
    console.info("playing sound...");
    const base = this.nukedEmBases.filter((f) => f.baseStatus == HIT)[0];
    // console.info(base);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(base.X, base.Y, BASEWIDTH / 2, 1 * Math.PI, 0 * Math.PI);
    ctx.fill();
    // ctx.drawImage(flames, base.X - 25, base.Y - 58, 50, 58);

    ctx.drawImage(
      holeInGround,
      base.X - holeInGround.width / 2,
      base.Y,
      50,
      20
    );

    this.createExplosion(base.X - 25, base.Y - 58);
    //flames.style.top = base.Y - 58 + "px";
    //flames.style.left = base.X - 25 + "px";
    //console.info(flames.style.display);
    //flames.style.display = "block";
    let result = await this.explosionPause(3000);
    //flames.style.display = "none";

    base.baseStatus = DESTROYED;
  }

  createExplosion(x, y) {
    const flames = document.createElement("video");
    var sourceMP4 = document.createElement("source");
    sourceMP4.type = "video/mp4";
    sourceMP4.src = "assets/images/flames.mp4";
    flames.appendChild(sourceMP4);
    flames.autoplay = true;
    flames.loop = true;
    flames.style.position = "absolute";
    flames.style.top = y + "px";
    flames.style.left = x + "px";
    flames.style.width = "50px";
    flames.style.height = "58px";
    document.body.appendChild(flames);
  }

  explosionPause(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  drawBaseMissiles() {
    if (!player1 && !player2) return;
    let y = canvas.height - 70;
    let x = 5;
    for (let i = 1; i <= player1.missileCount; i++) {
      ctx.drawImage(
        white_missile,
        x + i * 15,
        y,
        white_missile.width / 3,
        white_missile.height / 3
      );
    }
    x = canvas.width - 30;
    for (let i = 1; i <= player2.missileCount; i++) {
      ctx.drawImage(
        white_missile,
        x - i * 15,
        y,
        white_missile.width / 3,
        white_missile.height / 3
      );
    }
  }

  drawPlayerNames() {
    if (!player1 && !player2) return;

    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(player1.playerName, 30, canvas.height - 80);
    ctx.fillStyle = "white";
    ctx.fillText(player1.playerName, 28, canvas.height - 82);

    const text = player2.playerName;
    const width = ctx.measureText(text).width;

    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(text, canvas.width - width - 40, canvas.height - 80);
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width - width - 42, canvas.height - 82);
  }

  drawMissMarkers() {
    if (!player1 && !player2) return;

    ctx.fillStyle = "white";
    player1.missiles.forEach((missile) => {
      ctx.fillRect(missile.missX, missile.missY - 2, 2, 4);
    });
    player2.missiles.forEach((missile) => {
      ctx.fillRect(missile.missX, missile.missY - 2, 2, 4);
    });
  }
}

class Background {
  shootingStars = [];

  constructor() {
    this.loadStars();
    this.loadShootingStars();
  }

  loadStars() {
    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 3,
        height: Math.random() * 3,
      });
    }
  }

  loadShootingStars() {
    let star = new ShootingStar(1);
    this.shootingStars.push(star);
    star = new ShootingStar(-1);
    this.shootingStars.push(star);
    star = new ShootingStar(-1);
    this.shootingStars.push(star);
  }

  drawShootingStars() {
    this.shootingStars.forEach((star) => {
      star.update();
      star.draw();
    });
  }

  draw(landscape) {
    // console.info("Start...", canvas.width);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (let i = 0; i < maxStars; i++) {
      ctx.fillRect(stars[i].x, stars[i].y, stars[i].width, stars[i].height);
    }
    ctx.drawImage(deathStar, canvas.width - 150, 15, 121, 107);
    ctx.drawImage(saturn, 100, 45, 42, 25);
    ctx.drawImage(moon, 220, 45, 38, 32);
    landscape.draw();
  }

  hitAnimation(drawScreen, player, opponent) {
    let r, g, b;
    console.info("anim", player, opponent);
    let phrases = new HitPhrases();
    let text = phrases.getPhrase(player, opponent);

    const div = document.createElement("div");
    div.style.width = canvas.width + "px";
    div.style.height = canvas.height + "px";
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.top = "0px";
    div.innerText = text;
    div.style.margin = "auto";
    div.style.color = "#fff";
    div.style.font = "40px Arial";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    document.body.appendChild(div);

    const interval = setInterval(function () {
      r = Math.random() * 255;
      g = Math.random() * 255;
      b = Math.random() * 255;
      div.style.backgroundColor = `rgba(${r},${g},${b}, 0.7)`;
      // ctx.fillStyle = `rgba(${r},${g},${b}, 0.2)`;
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      // ctx.fillStyle = "white";
      // ctx.font = "40px Arial";
      // ctx.fillText(
      // text,
      // canvas.width / 2 - ctx.measureText(text).width / 2,
      // canvas.height / 2
      // );
    }, 300);

    setTimeout(function () {
      clearInterval(interval);
      document.body.removeChild(div);
      drawScreen();
    }, ANIMATION_LENGTH);
  }

  doGameOver(landscape) {
    let text = "";

    const player1Score = landscape.getScoreForPlayer(1);
    const player2Score = landscape.getScoreForPlayer(2);

    if (player1Score == player2Score) {
      text = "GAME OVER, DRAW!!!";
    } else {
      const winner =
        player1Score > player2Score
          ? nukedEm.player1.playerName
          : nukedEm.player2.playerName;

      text = "GAME OVER, WELL DONE " + winner + "!!!";
    }
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2);
  }
}

class Missile {
  missileX = 0;
  missileY = 0;
  prevX = 0;
  prevY = 0;
  power = 0;
  angle = 0;
  startX = 0;
  startY = 0;
  hitX = 0;
  hitY = 0;
  playerTurn = 1;
  missileId = 0;

  constructor(player, x, y, power, angle, id) {
    time = 0;
    missileStatus = ACTIVE;
    this.playerTurn = player;
    this.startX = x; //player == 1 ? x + BASEWIDTH : x - BASEWIDTH;
    this.startY = y - white_missile.height / MISSILE_SCALE;
    this.power = power;
    this.angle = angle;
    this.rotation = 0;
    this.missileId = id;
  }
  update(landscape) {
    // console.info(
    //   "PX:PY  X:Y  ",
    //   this.prevX,
    //   this.prevY,
    //   this.missileX,
    //   this.missileY,
    //   landscape.nukedEmBases[3].X,
    //   landscape.nukedEmBases[3].Y,
    //   canvas.width
    // );
    this.prevX = this.missileX;
    this.prevY = this.missileY;

    let rad = this.angle * (Math.PI / 180);

    let vx = this.power * Math.cos(rad);
    let vy = this.power * Math.sin(rad);

    let vxWindVelocity = 0; //Math.cos(rad) * Math.abs(windVelocity) * 0.74;
    let vyWindVelocity = 0; //Math.sin(rad) * Math.abs(windVelocity) * 0.74 - 10;
    // console.info(vxWindVelocity, vyWindVelocity);
    let x = vx * time;

    if (this.playerTurn == 1) {
      this.missileX = Math.floor(this.startX + x - vxWindVelocity);
    } else {
      this.missileX = Math.floor(this.startX - x - vxWindVelocity);
    }

    let y = vy * time + 0.5 * -9.8 * Math.pow(time, 2);
    this.missileY = Math.floor(this.startY - y - vyWindVelocity);

    this.calcRotation(vx, rad);
  }

  calcRotation(vx, rad) {
    let multiplier = 0;

    if (this.playerTurn == 1) multiplier = 1;
    else multiplier = -1;

    let vy = this.power * Math.sin(rad) + -9.8 * time;
    let deg = 0;
    if (vy < 0) {
      deg = Math.atan((vx * multiplier) / (vy * -1)) * (180 / Math.PI);
      this.rotation = 90 - deg + 90;
    } else {
      deg = Math.atan((vx * multiplier) / vy) * (180 / Math.PI);
      this.rotation = deg;
    }
  }

  detectCollision(landscape) {
    // console.info("detectCollision...");
    if (this.playerTurn == 2 && this.missileX < 0) return OUT_OF_BOUNDS;
    else if (this.playerTurn == 1 && this.missileX > canvas.width)
      return OUT_OF_BOUNDS;

    //Has missile hit the mountain
    if (this.isMountainHit(landscape)) return MISS;

    let base;
    for (let i = 0; i < landscape.nukedEmBases.length; i++) {
      base = landscape.nukedEmBases[i];

      // if (base.baseStatus != DESTROYED) {
      //   const path = new Path2D();
      //   path.moveTo(this.prevX, this.prevY);
      //   path.lineTo(this.missileX, this.missileY);
      //   path.closePath();
      //   const baseData = { radius: BASEWIDTH / 2, x: base.X, y: base.Y };
      //   if (this.isBaseInPath(baseData, path)) {
      //     base.baseStatus = HIT;
      //     return HIT;
      //   }
      // }
      if (base.baseStatus != DESTROYED) {
        if (this.isBaseHit(base)) {
          base.baseStatus = HIT;
          return HIT;
        }
      }
    }

    switch (this.playerTurn) {
      case 1:
        if (
          this.missileX > landscape.mountainX &&
          this.missileY > landscape.base2Y //    white_missile.height / MISSILE_SCALE
        ) {
          this.missX = this.missileX; // + white_missile.width / MISSILE_SCALE;
          this.missY = landscape.base2Y;
          return MISS;
        }
        break;
      case 2:
        if (
          this.missileX < landscape.mountainX &&
          this.missileY > landscape.base1Y //- white_missile.height / MISSILE_SCALE
        ) {
          this.missX = this.missileX; // - white_missile.width / MISSILE_SCALE;
          this.missY = landscape.base1Y;
          return MISS;
        }
        break;
    }

    return NO_HIT;
  }

  isBaseInPath(baseData, path) {
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

  isBaseHit(base) {
    const path = new Path2D();
    path.moveTo(this.prevX, this.prevY);
    path.lineTo(this.missileX, this.missileY);
    path.closePath();

    //TOP OF BASE
    let x1 = base.X - BASEWIDTH / 2;
    let x2 = base.X + BASEWIDTH / 2;
    let y1 = base.Y - BASEWIDTH / 2;
    let y2 = base.Y - BASEWIDTH / 2;
    if (
      this.doesLineCrossLine(
        this.prevX,
        this.prevY,
        this.missileX,
        this.missileY,
        x1,
        y1,
        x2,
        y2
      )
    ) {
      return true;
    }

    //LEFT SIDE OF BASE
    x1 = base.X - BASEWIDTH / 2;
    y1 = base.Y;
    x2 = base.X - BASEWIDTH / 2;
    y2 = base.Y - BASEWIDTH / 2;
    if (
      this.doesLineCrossLine(
        this.prevX,
        this.prevY,
        this.missileX,
        this.missileY,
        x1,
        y1,
        x2,
        y2
      )
    ) {
      return true;
    }

    //RIGHT SIDE OF BASE
    x1 = base.X - BASEWIDTH / 2;
    y1 = base.Y;
    x2 = base.X - BASEWIDTH / 2;
    y2 = base.Y - BASEWIDTH / 2;
    if (
      this.doesLineCrossLine(
        this.prevX,
        this.prevY,
        this.missileX,
        this.missileY,
        x1,
        y1,
        x2,
        y2
      )
    ) {
      return true;
    }
    return false;
  }

  isMountainHit(landscape) {
    if (this.prevX == 0) return false;

    if (
      this.doesLineCrossLine(
        this.prevX,
        this.prevY,
        this.missileX,
        this.missileY,
        landscape.mountainX - landscape.mountainWidth / 2,
        landscape.base1Y,
        landscape.mountainX,
        landscape.mountainY
      )
    ) {
      return true;
    }

    if (
      this.doesLineCrossLine(
        this.prevX,
        this.prevY,
        this.missileX,
        this.missileY,
        landscape.mountainX,
        landscape.mountainY,
        landscape.mountainX + landscape.mountainWidth / 2,
        landscape.base2Y
      )
    ) {
      return true;
    }

    return false;
  }

  doesLineCrossLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const uA =
      ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB =
      ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }

  drawPath() {
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(this.missileX, this.missileY, 2, 2);
    // return;
    drawRotatedImage(
      white_missile,
      this.missileX,
      this.missileY,
      white_missile.width / MISSILE_SCALE,
      white_missile.height / MISSILE_SCALE,
      this.rotation
    );
  }
}

function drawRotatedImage(image, x, y, w, h, degrees) {
  ctx.save();
  //  ctx.translate(x + w / 2, y + h / 2);
  ctx.translate(x, y);
  ctx.rotate((degrees * Math.PI) / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h);
  // ctx.fillStyle = "red";
  // ctx.fillRect(x, y, 2, 2);
  ctx.lineWidth = 1;
  // ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

class Player {
  missiles = [];
  missileCount = 10;

  constructor(playerName, number) {
    this.playerNumber = number;
    this.playerName = playerName;
    this.score = 0;
  }
  calculateScore(points) {
    this.score += points;
  }
  resetScore(score) {
    this.score = score;
  }
  reduceMissiles(num) {
    this.missileCount -= num;
    return this.missileCount;
  }
}

class NukedEmGame {
  missile;
  gameOver = false;
  numMissiles = 0;
  demoMode = true;
  landscape = new Landscape();
  background = new Background();

  initializeGame() {
    animate();
    this.getPlayers();
    this.background.draw(this.landscape);
    this.landscape.drawBaseMissiles();
  }

  newGame() {
    console.info("NEW GAME...");
    time = 0;
    missileStatus = ACTIVE;
    gameStart = true;
    round = 1;
    showLauncherSelectionPad(this.landscape.nukedEmBases, 1);
  }

  getPlayers() {
    const start = document.getElementById("start");
    const container = document.getElementById("players-container");
    container.style.left = canvas.width / 2 - 130 + "px";
    container.style.display = "flex";
    start.addEventListener("click", function () {
      const txtplayer1 = document.getElementById("player1");
      const txtplayer2 = document.getElementById("player2");
      if (txtplayer1.value == "" || txtplayer2.value == "") {
        const error = document.getElementById("error");
        error.innerText = "Please enter names for both players.";
        return;
      }

      player1.playerName = txtplayer1.value;
      player2.playerName = txtplayer2.value;

      container.style.display = "none";
      nukedEm.newGame();
    });
  }

  alternateTurn() {
    if (playersTurn == 1) playersTurn = 2;
    else playersTurn = 1;
  }

  showPowerAnglePad(display) {
    if (gameStart) {
      showLauncherSelectionPad(this.landscape.nukedEmBases, 2);
      gameStart = false;
      return;
    }

    if (this.landscape.playerHasNoLaunchBase(playersTurn)) {
      showLauncherSelectionPad(this.landscape.nukedEmBases, playersTurn);
      return;
    }

    setPlayerValues();
    clear_power_values = true;
    clear_angle_values = true;
    const controls = document.getElementById("controls-container");
    controls.style.display = display;
    if (playersTurn == 1) controls.style.left = "100px";
    else controls.style.left = canvas.width - 350 + "px";
  }

  demoMissiles() {
    if (this.numMissiles == 0) {
      this.fireMissile(90, 65, 0);
    } else if (this.numMissiles == 1) {
      playersTurn = 1;
      this.fireMissile(93.9, 50, 1);
    }
    this.numMissiles++;
  }

  fireMissile(power, angle, id) {
    // console.info("fire", playersTurn);
    if (playersTurn == 1) {
      player1.reduceMissiles(1);

      this.missile = new Missile(
        1,
        this.landscape.getMissileBaseX(1),
        this.landscape.base1Y,
        power,
        angle,
        id
      );
      player1.missiles.push(this.missile);
    } else {
      player2.reduceMissiles(1);

      this.missile = new Missile(
        2,
        this.landscape.getMissileBaseX(2),
        this.landscape.base2Y,
        power,
        angle,
        id
      );
      player2.missiles.push(this.missile);
    }
  }

  doHit() {
    const base = this.landscape.determineBaseHit();
    const playerName =
      base.player == 1 ? player2.playerName : player1.playerName;
    const opponentName =
      base.player == 1 ? player1.playerName : player2.playerName;

    this.showPowerAnglePad("none");

    this.landscape.drawExplosion();
    var that = this;
    setTimeout(function () {
      that.background.hitAnimation(
        () => {
          that.drawScreen();
          that.isGameOver();
          missileStatus = INACTIVE;
          if (!that.checkForLaunchBaseDestroyed()) {
            if (!that.gameOver) that.showPowerAnglePad("block");
          }
        },
        playerName,
        opponentName
      );
    }, 1500);

    this.landscape.drawBaseMissiles(player1.missiles, player2.missiles);
  }

  checkForLaunchBaseDestroyed() {
    const launchBase = this.landscape.nukedEmBases.filter(
      (f) => f.player == playersTurn && f.baseStatus == DESTROYED
    );
    if (launchBase) {
      showLauncherSelectionPad(this.landscape.nukedEmBases, playersTurn);
      return true;
    }
    return false;
  }

  isGameOver() {
    if (player1.missileCount == 0 && player2.missileCount == 0) {
      if (round == NUMBER_ROUNDS) this.gameOver = true;
      else round += 1;
      return;
    } else if (this.landscape.areAllBasesDestroyed()) {
      if (round == NUMBER_ROUNDS) this.gameOver = true;
      else round += 1;
      return;
    }
  }

  nextMissile(power, angle) {
    this.showPowerAnglePad("none");
    missileStatus = ACTIVE;

    if (this.demoMode) {
      //this.demoMissiles();
      // return;
    }

    if (playersTurn == 1) {
      if (player1.missileCount > 0) {
        this.fireMissile(power, angle, 0);
      }
    } else {
      if (player2.missileCount > 0) this.fireMissile(power, angle, 0);
    }
  }

  drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.background.draw(this.landscape);
    this.background.drawShootingStars();
    this.landscape.draw();
    this.landscape.drawBaseMissiles();
    this.landscape.drawMissMarkers();
    this.landscape.updateScore();
    if (this.gameOver) this.background.doGameOver(this.landscape);
  }

  run() {
    // console.info("missileStatus...", missileStatus, this.gameOver);
    // if (time == 1) missileStatus = INACTIVE;
    if (missileStatus == ACTIVE) {
      // console.info("RUN...");
      this.drawScreen();
      let result;
      if (this.missile) result = this.missile.detectCollision(this.landscape);
      else result = AWAITING_FIRE;
      switch (result) {
        case HIT:
          console.info("explosion");
          missileStatus = HIT;
          this.doHit();
          this.alternateTurn();
          break;
        case MISS:
          console.info("Miss: ", this.missile.missileX, this.missile.missileY);
          missileStatus = INACTIVE;
          this.alternateTurn();
          this.showPowerAnglePad("block");
          break;
        case OUT_OF_BOUNDS:
          console.info("OUT OF BOUNDS");
          missileStatus = INACTIVE;
          this.alternateTurn();
          this.showPowerAnglePad("block");
          break;
        case AWAITING_FIRE:
          break;
        default:
          this.missile.update(this.landscape);
          this.missile.drawPath();
      }
    } else if (missileStatus == INACTIVE) {
      this.drawScreen();
    } else if (missileStatus == HIT) {
      //Do nothing until next missile.
    } else {
      this.drawScreen();
    }
    time += timerInterval;
  }
}

let player1 = new Player("", 1);
let player2 = new Player("", 2);
let nukedEm;

function loadGame() {
  nukedEm = new NukedEmGame();
  nukedEm.initializeGame();
  // nukedEm.newGame();
  //animate();
}

function animate() {
  nukedEm.run();
  requestAnimationFrame(animate);
}
// animate();

// window.addEventListener("click", function () {
//   nukedEm.newGame();
// });

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function colorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function convertRGBtoHex(red, green, blue) {
  return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}
