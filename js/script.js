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
let mushroomCloud = new Image();
mushroomCloud.src = "assets/images/mushroomCloud.png";
let holeInGround = new Image();
holeInGround.src = "assets/images/holeInground.png";

const MISS = 1;
const HIT = 2;
const OUT_OF_BOUNDS = 3;
const NO_HIT = 4;
const DESTROYED = 5;
const AWAITING_FIRE = 6;

const MINIMUM_BASE_DISTANCE = 80;
let maxStars = 200;
let stars = [];
let hitPhrases = [];
let time = 0;
let timerInterval = 0.05;
let gameFrame = 0;
const staggerFrames = 155;
let windVelocity = 100;
let baseWidth = 20;
let baseHeight = 10;
let missileStatus = 1;
const ACTIVE = 1;
const INACTIVE = 0;

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
    this.hitPhrases.push("DO YOU NEED GLASSES <opponent>?");
    this.hitPhrases.push("TOP GUN HEY!");
    this.hitPhrases.push("WISE GUY, HUH!");
    this.hitPhrases.push("WHERE'D YOU LEARN TO SHOOT <opponent>?");
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
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = Math.random() * 4 - 2;
  }
  update() {
    if (this.x < 0 || this.y > canvas.height + 100) {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.speed = Math.random() * 4 - 2;
    } else {
      this.x += this.speed;
      this.y += 1;
    }
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

class NukedEmBaseType {
  fillColor;
  points;
  missileBase;

  constructor(fillColor, points, missileBase) {
    this.fillColor = fillColor;
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
  points;
  player;
  missileBase;
  baseNo;
  baseStatus;

  constructor(x, y, x2, y2, fillColor, points, player, missileBase, baseNo) {
    this.X = x;
    this.Y = y;
    this.X2 = x2;
    this.Y2 = y2;
    this.fillColor = fillColor;
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
    baseType.points = 100;
    baseType.missileBase = true;
    this.nukedEmBaseTypes.push(baseType);

    baseType = new NukedEmBaseType();
    baseType.fillColor = "yellow";
    baseType.points = 70;
    baseType.missileBase = false;
    this.nukedEmBaseTypes.push(baseType);

    baseType = new NukedEmBaseType();
    baseType.fillColor = "blue";
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
  }

  createDemoLandscape() {
    this.base1Y = 540;
    this.base2Y = 540;
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
  }
  drawBases() {
    this.nukedEmBases.forEach((base) => {
      // console.info(base.X, base.Y, base.fillColor);

      if (base.baseStatus == DESTROYED) {
        ctx.drawImage(holeInGround, base.X + baseWidth / 2, base.Y, 50, 20);
      } else {
        ctx.beginPath();
        ctx.fillStyle = base.fillColor;
        ctx.arc(
          base.X + baseWidth / 2,
          base.Y,
          baseWidth / 2,
          1 * Math.PI,
          0 * Math.PI
        );
        ctx.fill();
      }
    });
  }

  updateScore() {
    // console.info(this.nukedEmBases);
    let hits = this.nukedEmBases.filter(
      (f) => f.player == 2 && f.baseStatus == DESTROYED
    );
    // console.info(hits);
    let player1Score = hits
      .map((hit) => hit.points)
      .reduce((partialsum, a) => partialsum + a, 0);
    hits = this.nukedEmBases.filter(
      (f) => f.player == 1 && f.baseStatus == DESTROYED
    );
    let player2Score = hits
      .map((hit) => hit.points)
      .reduce((partialsum, a) => partialsum + a, 0);

    let text = "Score " + player1Score + ":" + player2Score;
    const width = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height - 40);
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2 - width / 2 - 2, canvas.height - 42);
  }

  drawExplosion() {
    const sound = document.getElementById("explosion-sound");
    //sound.play();
    console.info("playing sound...");
    const base = this.nukedEmBases.filter((f) => f.baseStatus == HIT)[0];
    // console.info(base);
    ctx.drawImage(
      mushroomCloud,
      base.X - mushroomCloud.width / 2,
      base.Y - 78,
      57,
      78
    );
    ctx.drawImage(
      holeInGround,
      base.X - mushroomCloud.width / 2,
      base.Y,
      50,
      20
    );
    base.baseStatus = DESTROYED;
  }

  drawBaseMissiles(player1Missiles, player2Missiles) {
    let y = canvas.height - 70;
    let x = 5;

    for (let i = 1; i <= player1Missiles; i++) {
      ctx.drawImage(
        white_missile,
        x + i * 15,
        y,
        white_missile.width / 3,
        white_missile.height / 3
      );
    }
    x = canvas.width - 30;
    for (let i = 1; i <= player2Missiles; i++) {
      ctx.drawImage(
        white_missile,
        x - i * 15,
        y,
        white_missile.width / 3,
        white_missile.height / 3
      );
    }
  }

  drawMissMarkers(player1, player2) {
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
  hitAnimation(setUpScreen, player, opponent) {
    let r, g, b;
    let phrases = new HitPhrases();
    let text = phrases.getPhrase(player, opponent);
    const interval = setInterval(function () {
      r = Math.random() * 255;
      g = Math.random() * 255;
      b = Math.random() * 255;
      ctx.fillStyle = `rgba(${r},${g},${b}, 0.2)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText(
        text,
        canvas.width / 2 - ctx.measureText(text).width / 2,
        canvas.height / 2
      );
    }, 300);

    setTimeout(function () {
      clearInterval(interval);
      setUpScreen();
    }, 5000);
  }

  doGameOver(player1, player2) {
    let text = "";

    if (player1.score == player2.score) {
      text = "GAME OVER, DRAW!!!";
    } else {
      const winner =
        player1.score > player2.score ? player1.playerName : player2.playerName;

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
    this.startX = player == 1 ? x + baseWidth : x - baseWidth;
    this.startY = y - black_missile.height / 4;
    this.power = power;
    this.angle = angle;
    this.rotation = 0;
    this.missileId = id;
  }
  update() {
    let rad = this.angle * (Math.PI / 180);

    let vx = this.power * Math.cos(rad);
    let vy = this.power * Math.sin(rad);

    let vxWindVelocity = 0; //Math.cos(rad) * Math.abs(windVelocity) * 0.74;
    let vyWindVelocity = 0; //Math.sin(rad) * Math.abs(windVelocity) * 0.74 - 10;

    let x = vx * time;

    if (this.playerTurn == 1)
      this.missileX = Math.floor(this.startX + x - vxWindVelocity);
    else this.missileX = Math.floor(this.startX - x - vxWindVelocity);

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

    let base;

    for (let i = 0; i < landscape.nukedEmBases.length; i++) {
      base = landscape.nukedEmBases[i];
      // if (this.missileId == 1 && base.fillColor == "red" && base.player == 2) {
      //   console.info(
      //     this.missileX,
      //     this.missileY,
      //     " = ",
      //     base.X,
      //     base.X2,
      //     base.Y,
      //     base.Y2
      //   );
      //   //if (this.missileY > base.Y + 60) return HIT;
      // }
      if (
        (this.missileY + white_missile.height / MISSILE_SCALE < base.Y ||
          this.missileY > base.Y + baseHeight ||
          this.missileX + white_missile.width / MISSILE_SCALE < base.X ||
          this.missileX > base.X + white_missile.width / MISSILE_SCALE) == false
      ) {
        // if (
        //   this.missileX >= base.X &&
        //   this.missileX <= base.X2 &&
        //   this.missileY >= base.Y2
        // ) {
        base.baseStatus = HIT;
        console.info("HIT");
        return HIT;
      }
    }

    switch (this.playerTurn) {
      case 1:
        if (
          this.missileX > landscape.mountainX &&
          this.missileY >
            landscape.base2Y - white_missile.height / MISSILE_SCALE
        ) {
          this.missX = this.missileX + white_missile.width / MISSILE_SCALE;
          this.missY = landscape.base2Y;
          return MISS;
        }
        break;
      case 2:
        if (
          this.missileX < landscape.mountainX &&
          this.missileY >
            landscape.base1Y - white_missile.height / MISSILE_SCALE
        ) {
          this.missX = this.missileX - white_missile.width / MISSILE_SCALE;
          this.missY = landscape.base1Y;
          return MISS;
        }
        break;
    }

    return NO_HIT;
  }

  convertMissilePosition(xycoord, value) {
    if ((xycoord = "X")) return 0;
  }

  drawPath() {
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
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((degrees * Math.PI) / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h);
  ctx.strokeStyle = "yellow";
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
  playersTurn = 1;
  player1;
  player2;
  gameOver = false;
  numMissiles = 0;
  demoMode = true;

  initializeGame() {
    this.shootingStar = new ShootingStar();
    this.landscape = new Landscape();
    this.background = new Background();
    this.background.loadStars();
    this.background.draw(this.landscape);
    this.getPlayers();
  }

  alternateTurn() {
    if (this.playersTurn == 1) this.playersTurn = 2;
    else this.playersTurn = 1;
  }

  showPowerAnglePad(display) {
    // console.info("getPowerAngle....", this.playersTurn);
    const controls = document.getElementById("controls-container");
    controls.style.display = display;
    if (this.playersTurn == 1) controls.style.left = "100px";
    else controls.style.left = canvas.width - 350 + "px";
  }

  getPlayers() {
    this.player1 = new Player("Mal", 1);
    this.player2 = new Player("Waz", 2);
  }

  demoMissiles() {
    if (this.numMissiles == 0) {
      this.fireMissile(90, 65, 0);
    } else if (this.numMissiles == 1) {
      this.playersTurn = 1;
      this.fireMissile(93.9, 50, 1);
    }
    this.numMissiles++;
  }

  fireMissile(power, angle, id) {
    // console.info("fire", this.playersTurn);
    if (this.playersTurn == 1) {
      this.player1.reduceMissiles(1);

      this.missile = new Missile(
        1,
        this.landscape.getMissileBaseX(1),
        this.landscape.base1Y - 10,
        power,
        angle,
        id
      );
      this.player1.missiles.push(this.missile);
    } else {
      this.player2.reduceMissiles(1);

      this.missile = new Missile(
        2,
        this.landscape.getMissileBaseX(2),
        this.landscape.base2Y - 10,
        power,
        angle,
        id
      );
      this.player2.missiles.push(this.missile);
    }
  }

  doHit() {
    const base = this.landscape.determineBaseHit();
    const playerName =
      base.player == 1 ? this.player2.playerName : this.player1.playerName;
    const opponentName =
      base.player == 1 ? this.player1.playerName : this.player2.playerName;

    this.showPowerAnglePad("none");
    this.landscape.drawExplosion();
    this.background.hitAnimation(
      () => {
        this.drawScreen();
        this.showPowerAnglePad("block");
      },
      playerName,
      opponentName
    );
    this.landscape.drawBaseMissiles(
      this.player1.missiles,
      this.player2.missiles
    );
    // this.alternateTurn();
  }

  nextMissile(power, angle) {
    console.info("nextMissile...");
    this.showPowerAnglePad("none");
    missileStatus = ACTIVE;

    if (this.demoMode) {
      //this.demoMissiles();
      // return;
    }

    if (this.player1.missileCount == 0 && this.player2.missileCount == 0) {
      this.gameOver = true;
      return;
    }

    if (this.playersTurn == 1) {
      if (this.player1.missileCount > 0) {
        this.fireMissile(power, angle, 0);
      }
    } else {
      if (this.player2.missileCount > 0) this.fireMissile(power, angle, 0);
    }
  }

  newGame() {
    console.info("NEW GAME...");
    time = 0;
    missileStatus = ACTIVE;
    //this.fireMissile(99.9, 60, 0);
    this.showPowerAnglePad("block");
  }

  drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shootingStar.update();
    this.shootingStar.draw();
    this.background.draw(this.landscape);
    this.landscape.drawBaseMissiles(
      this.player1.missileCount,
      this.player2.missileCount
    );
    this.landscape.drawMissMarkers(this.player1, this.player2);
    this.landscape.updateScore(this.player1.score, this.player2.score);
    if (this.gameOver) this.background.doGameOver(this.player1, this.player2);
  }

  run() {
    // console.info("missileStatus...", missileStatus);
    if (missileStatus == ACTIVE) {
      // console.info("RUN...");
      this.drawScreen();
      let result;
      if (this.missile) result = this.missile.detectCollision(this.landscape);
      else result = AWAITING_FIRE;
      switch (result) {
        case HIT:
          console.info("explosion");
          this.doHit();
          missileStatus = HIT;
          //this.newGame();
          // this.showPowerAnglePad("block");
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
          this.missile.update();
          this.missile.drawPath();
      }
    } else if (missileStatus == INACTIVE) {
      this.drawScreen();
      // this.showPowerAnglePad("block");
    } else {
      //Do nothing until next missile.
    }
    time += timerInterval;
  }
}

let nukedEm;

function loadGame() {
  nukedEm = new NukedEmGame();
  nukedEm.initializeGame();
  nukedEm.newGame();
  animate();
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
