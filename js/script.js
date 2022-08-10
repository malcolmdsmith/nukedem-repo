// window.addEventListener("load", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   this.alert("Hello");
//   //loadGame();
// });
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
let mushroomCloud = new Image();
mushroomCloud.src = "assets/images/mushroomCloud.png";
let holeInGround = new Image();
holeInGround.src = "assets/images/holeInground.png";

const MISS = 1;
const HIT = 2;
const OUT_OF_BOUNDS = 3;
const NO_HIT = 4;

let maxStars = 200;
let stars = [];
let hitPhrases = [];
let time = 0;
let timerInterval = 0.05;
let gameFrame = 0;
const staggerFrames = 155;
let windVelocity = 100;
let baseWidth = 15;
let baseHeight = 10;
let missileStatus = 1;
const ACTIVE = 1;
const INACTIVE = 0;

class HitPhrases {
  hitPhrases = [];

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
    const rand = Math.floor(Math.random() * this.hitPhrases.length);

    let phrase = this.hitPhrases[rand];
    if (player == "") phrase.replace("<player>", "JOE");
    else phrase.replace("<player>", player);
    if (opponent == "") phrase.replace("<opponent>", "JOE");
    else phrase.replace("<opponent>", opponent);

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

class Landscape {
  base1Y;
  base2Y;
  base1X;
  base2X;

  constructor() {
    this.createDemoLandscape();
  }

  createLandscape() {
    this.base1Y = getRandomInt(canvas.height - 300, canvas.height - 100);
    this.base2Y = getRandomInt(canvas.height - 300, canvas.height - 100);
    this.mountainX = canvas.width / 2;
    const h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
    this.mountainY = getRandomInt(200, h);
    this.mountainWidth = getRandomInt(200, 400);
    this.base1X = getRandomInt(30, this.mountainX - this.mountainWidth / 2);
    this.base2X = getRandomInt(
      this.mountainX + this.mountainWidth,
      canvas.width - 30
    );
  }
  createDemoLandscape() {
    this.base1Y = 550;
    this.base2Y = 600;
    this.mountainX = canvas.width / 2;
    const h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
    this.mountainY = 300;
    this.mountainWidth = 250;
    this.base1X = 100;
    this.base2X = canvas.width - 180;
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
    ///BASE 1
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.base1X - baseWidth / 2, this.base1Y);
    ctx.lineTo(this.base1X, this.base1Y - baseHeight);
    ctx.lineTo(this.base1X + baseWidth / 2, this.base1Y);
    ctx.fill();

    ///BASE 2
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(this.base2X - baseWidth / 2, this.base2Y);
    ctx.lineTo(this.base2X, this.base2Y - baseHeight);
    ctx.lineTo(this.base2X + baseWidth / 2, this.base2Y);
    ctx.fill();
  }
  updateScore(player1Score, player2Score) {
    let text = "Score " + player1Score + ":" + player2Score;
    const width = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height - 40);
  }
  drawExplosion(base) {
    const sound = document.getElementById("explosion-sound");
    //sound.play();
    console.info("playing sound...");
    if (base == 1) {
      ctx.drawImage(
        mushroomCloud,
        this.base2X - mushroomCloud.width / 2,
        this.base2Y - 78,
        57,
        78
      );
      ctx.drawImage(
        holeInGround,
        this.base2X - mushroomCloud.width / 2,
        this.base2Y,
        50,
        20
      );
    } else {
      ctx.drawImage(mushroomCloud, this.base1X, this.base1Y - 78, 57, 78);
      ctx.drawImage(
        holeInGround,
        this.base1X - mushroomCloud.width / 2,
        this.base1Y,
        50,
        20
      );
    }
  }
  drawBaseMissiles(player1Missiles, player2Missiles) {
    let y = canvas.height - 100;
    let x = 5;

    for (let i = 1; i <= player1Missiles; i++) {
      ctx.drawImage(black_missile, x + i * 25, y, 23, 72);
    }
    x = canvas.width - 30;
    for (let i = 1; i <= player2Missiles; i++) {
      ctx.drawImage(black_missile, x - i * 25, y, 23, 72);
    }
  }

  drawMissMarkers(player1, player2) {
    ctx.fillStyle = "white";
    player1.missiles.forEach((missile) => {
      ctx.fillRect(missile.hitX, missile.hitY - 2, 2, 4);
    });
    player2.missiles.forEach((missile) => {
      ctx.fillRect(missile.hitX, missile.hitY - 2, 2, 4);
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
  hitAnimation() {
    let r, g, b;
    let phrases = new HitPhrases();
    let text = phrases.getPhrase("", "");
    console.info(text);
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
    }, 3000);
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

  constructor(player, x, y, power, angle) {
    time = 0;
    missileStatus = ACTIVE;
    this.playerTurn = player;
    this.startX = player == 1 ? x + baseWidth : x - baseWidth;
    this.startY = y - black_missile.height / 4;
    this.power = power;
    this.angle = angle;
    this.rotation = 0;
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

  checkForHit(landscape, base) {
    switch (base) {
      case 1:
        if (this.missileX > canvas.width) return OUT_OF_BOUNDS;
      case 2:
        if (this.missileX < 0) return OUT_OF_BOUNDS;
    }
    // console.info(
    //   base,
    //   this.missileX,
    //   this.missileY,
    //   landscape.base2X,
    //   landscape.base2Y
    // );
    switch (base) {
      case 1:
        if (
          this.missileX >= landscape.base2X - baseWidth / 2 &&
          this.missileX <= landscape.base2X + baseWidth / 2 &&
          this.missileY >= landscape.base2Y - baseHeight
        ) {
          console.info("HIT");
          return HIT;
        } else if (
          this.missileX > landscape.mountainX &&
          this.missileY > landscape.base2Y - white_missile.height / 4
        ) {
          console.info("MISS");
          this.hitX = this.missileX + white_missile.width / 4;
          this.hitY = landscape.base2Y;
          return MISS;
        }
        console.info("MISS");
        return NO_HIT;
      case 2:
        if (
          this.missileX >= landscape.base1X - baseWidth / 2 &&
          this.missileX <= landscape.base1X + baseWidth / 2 &&
          this.missileY >= landscape.base1Y - baseHeight
        ) {
          console.info("HIT");
          return HIT;
        } else if (
          this.missileX < landscape.mountainX &&
          this.missileY > landscape.base1Y - white_missile.height / 4
        ) {
          console.info("MISS");
          this.hitX = this.missileX - white_missile.width / 4;
          this.hitY = landscape.base1Y;
          return MISS;
        }
        console.info("MISS");
        return NO_HIT;
        break;
      default:
        return MISS;
    }
  }

  drawPath() {
    drawRotatedImage(
      white_missile,
      this.missileX,
      this.missileY,
      white_missile.width / 4,
      white_missile.height / 4,
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
  ctx.restore();
}

class Player {
  missiles = [];
  missileCount = 5;

  constructor(playerName, number) {
    this.playerNumber = number;
    this.playerName = playerName;
    this.score = 0;
    this.missileCount = 5;
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
  playersTurn = 2;
  player1;
  player2;
  gameOver = false;

  initializeGame() {
    alert("initialize...");
    this.shootingStar = new ShootingStar();
    this.landscape = new Landscape();
    this.landscape.createDemoLandscape();
    this.background = new Background();
    this.background.loadStars();
    this.background.draw(this.landscape);
    this.getPlayers();
  }

  alternateTurn() {
    if (this.playersTurn == 1) this.playersTurn = 2;
    else this.playersTurn = 1;
  }

  getPlayers() {
    this.player1 = new Player("Mal", 1);
    this.player2 = new Player("Waz", 2);
  }

  fireMissile(power, angle) {
    if (this.playersTurn == 1) {
      this.player1.reduceMissiles(1);

      this.missile = new Missile(
        1,
        this.landscape.base1X,
        this.landscape.base1Y - 10,
        power,
        angle
      );
      this.player1.missiles.push(this.missile);
    } else {
      this.player2.reduceMissiles(1);

      this.missile = new Missile(
        2,
        this.landscape.base2X,
        this.landscape.base2Y - 10,
        power,
        angle
      );
      this.player2.missiles.push(this.missile);
    }
  }

  doHit() {
    if (this.playersTurn == 1) {
      this.player1.calculateScore(20);
    } else {
      this.player2.calculateScore(20);
    }
    this.landscape.drawBaseMissiles(
      this.player1.missiles,
      this.player2.missiles
    );
    this.alternateTurn();
  }

  nextMissile() {
    this.alternateTurn();
    if (this.player1.missileCount == 0 && this.player2.missileCount == 0) {
      this.gameOver = true;
      return;
    }

    if (this.playersTurn == 1) {
      if (this.player1.missileCount > 0) {
        this.fireMissile(getRandomInt(95, 108), 55);
      }
    } else {
      if (this.player2.missileCount > 0)
        this.fireMissile(getRandomInt(95, 108), 55);
    }
  }

  newGame() {
    time = 0;
    missileStatus = ACTIVE;
    this.fireMissile(99.9, 60);
  }

  setUpScreen() {
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
    if (missileStatus == ACTIVE) {
      this.setUpScreen();
      let result = this.missile.checkForHit(this.landscape, this.playersTurn);
      switch (result) {
        case HIT:
          this.landscape.drawExplosion(this.playersTurn);
          this.background.hitAnimation();
          this.doHit();
          missileStatus = HIT;
          this.newGame();
          break;
        case MISS:
          missileStatus = INACTIVE;
          this.nextMissile();
          break;
        case OUT_OF_BOUNDS:
          missileStatus = INACTIVE;
          this.nextMissile();
          break;
        default:
          this.missile.update();
          this.missile.drawPath();
      }
    } else if (missileStatus == INACTIVE) {
      this.setUpScreen();
    } else {
    }
    time += timerInterval;
  }
}

let nukedEm;

function loadGame() {
  alert("loadGame");
  nukedEm = new NukedEmGame();
  nukedEm.initializeGame();
  nukedEm.newGame();
  alert("animate...");
  animate();
}

function animate() {
  nukedEm.run();
  requestAnimationFrame(animate);
}
// animate();

window.addEventListener("click", function () {
  nukedEm.newGame();
});

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
