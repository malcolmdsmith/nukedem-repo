"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.addEventListener("load", function () {
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  loadGame();
}); // window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   //loadGame();
// });

var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var moon = new Image();
moon.src = "assets/images/moon.jpg";
var saturn = new Image();
saturn.src = "assets/images/saturn.png";
var black_missile = new Image();
black_missile.src = "assets/images/black-missile.png";
var deathStar = new Image();
deathStar.src = "assets/images/deathStar2.png";
var white_missile = new Image();
white_missile.src = "assets/images/white-missile.png";
var MISSILE_SCALE = 6;
var mushroomCloud = new Image();
mushroomCloud.src = "assets/images/mushroomCloud.png";
var holeInGround = new Image();
holeInGround.src = "assets/images/holeInground.png";
var MISS = 1;
var HIT = 2;
var OUT_OF_BOUNDS = 3;
var NO_HIT = 4;
var DESTROYED = 5;
var AWAITING_FIRE = 6;
var ACTIVE = 1;
var INACTIVE = 0;
var ANIMATION_LENGTH = 5000;
var MINIMUM_BASE_DISTANCE = 80;
var maxStars = 200;
var stars = [];
var hitPhrases = [];
var time = 0;
var timerInterval = 0.1;
var gameFrame = 0;
var staggerFrames = 155;
var windVelocity = 100;
var baseWidth = 20;
var baseHeight = 10;
var missileStatus = 1;
var player1;
var player2;

var HitPhrases = /*#__PURE__*/function () {
  function HitPhrases() {
    _classCallCheck(this, HitPhrases);

    _defineProperty(this, "hitPhrases", new Array());

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

  _createClass(HitPhrases, [{
    key: "getPhrase",
    value: function getPhrase(player, opponent) {
      var rand = Math.floor(Math.random() * this.hitPhrases.length);
      var phrase = this.hitPhrases[rand];
      if (player == "") phrase = phrase.replace("<player>", "JOE");else phrase = phrase.replace("<player>", player);
      if (opponent == "") phrase = phrase.replace("<opponent>", "JOE");else phrase = phrase.replace("<opponent>", opponent);
      return phrase;
    }
  }]);

  return HitPhrases;
}();

var ShootingStar = /*#__PURE__*/function () {
  function ShootingStar() {
    _classCallCheck(this, ShootingStar);

    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = Math.random() * 4 - 2;
  }

  _createClass(ShootingStar, [{
    key: "update",
    value: function update() {
      if (this.x < 0 || this.y > canvas.height + 100) {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 4 - 2;
      } else {
        this.x += this.speed;
        this.y += 1;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x, this.y, 2, 2);
    }
  }]);

  return ShootingStar;
}();

var NukedEmBaseType = /*#__PURE__*/_createClass(function NukedEmBaseType(fillColor, points, missileBase) {
  _classCallCheck(this, NukedEmBaseType);

  _defineProperty(this, "fillColor", void 0);

  _defineProperty(this, "points", void 0);

  _defineProperty(this, "missileBase", void 0);

  this.fillColor = fillColor;
  this.points = points;
  this.missileBase = missileBase;
});

var NukedEmBase = /*#__PURE__*/_createClass(function NukedEmBase(x, y, x2, y2, fillColor, points, player, missileBase, baseNo) {
  _classCallCheck(this, NukedEmBase);

  _defineProperty(this, "X", void 0);

  _defineProperty(this, "Y", void 0);

  _defineProperty(this, "X2", void 0);

  _defineProperty(this, "Y2", void 0);

  _defineProperty(this, "fillColor", void 0);

  _defineProperty(this, "points", void 0);

  _defineProperty(this, "player", void 0);

  _defineProperty(this, "missileBase", void 0);

  _defineProperty(this, "baseNo", void 0);

  _defineProperty(this, "baseStatus", void 0);

  this.X = x;
  this.Y = y;
  this.X2 = x2;
  this.Y2 = y2;
  this.fillColor = fillColor;
  this.points = points;
  this.player = player;
  this.missileBase = missileBase;
  this.baseNo = baseNo;
});

var Landscape = /*#__PURE__*/function () {
  function Landscape() {
    _classCallCheck(this, Landscape);

    _defineProperty(this, "base1Y", void 0);

    _defineProperty(this, "base2Y", void 0);

    _defineProperty(this, "base1X", void 0);

    _defineProperty(this, "base2X", void 0);

    _defineProperty(this, "mountainX", void 0);

    _defineProperty(this, "mountainWidth", void 0);

    _defineProperty(this, "nukedEmBaseTypes", []);

    _defineProperty(this, "nukedEmBases", []);

    this.createBaseTypes();
    this.createLandscape(); // this.createBases();
  }

  _createClass(Landscape, [{
    key: "createBaseTypes",
    value: function createBaseTypes() {
      var baseType = new NukedEmBaseType();
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
  }, {
    key: "createLandscape",
    value: function createLandscape() {
      this.base1Y = getRandomInt(canvas.height - 300, canvas.height - 100);
      this.base2Y = getRandomInt(canvas.height - 300, canvas.height - 100);
      this.mountainX = canvas.width / 2;
      var h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
      this.mountainY = getRandomInt(200, h);
      this.mountainWidth = getRandomInt(200, 400);
      this.createBases();
    }
  }, {
    key: "createDemoLandscape",
    value: function createDemoLandscape() {
      this.base1Y = 500;
      this.base2Y = 500;
      this.mountainX = canvas.width / 2;
      var h = this.base1Y < this.base2Y ? this.base1Y : this.base2Y;
      this.mountainY = 300;
      this.mountainWidth = 250;
      this.createDemoBases();
    }
  }, {
    key: "createBases",
    value: function createBases() {
      var _this = this;

      this.nukedEmBaseTypes.forEach(function (baseType) {
        var x = 0;
        var cntr = 0; //Player 1 Bases

        var max = Math.floor(_this.mountainX - _this.mountainWidth / 2 - 30);

        do {
          x = getRandomInt(0, max);
          cntr += 1;
          if (cntr > 20) break;
        } while (_this.checkMinimumDistanceBetweenBases(x, 1) === false);

        _this.createBase(x, _this.base1Y, 0, 0, 1, baseType); //Player 2 Bases


        cntr = 0;

        do {
          x = getRandomInt(_this.mountainX + _this.mountainWidth / 2 + 30, canvas.width);
          cntr += 1;
          if (cntr > 20) break;
        } while (_this.checkMinimumDistanceBetweenBases(x, 2) === false);

        _this.createBase(x, _this.base2Y, 0, 0, 2, baseType);
      });
    }
  }, {
    key: "createBase",
    value: function createBase(x, y, x2, y2, player, baseType) {
      var nukedEmBase = new NukedEmBase(x, y, x2, y2, baseType.fillColor, baseType.points, player, baseType.missileBase);
      this.nukedEmBases.push(nukedEmBase);
    }
  }, {
    key: "createDemoBases",
    value: function createDemoBases() {
      this.createBase(100, this.base1Y, 120, this.base1Y - 10, 1, this.nukedEmBaseTypes[0]);
      this.createBase(250, this.base1Y, 270, this.base1Y - 10, 1, this.nukedEmBaseTypes[1]);
      this.createBase(350, this.base1Y, 370, this.base1Y - 10, 1, this.nukedEmBaseTypes[2]);
      this.createBase(canvas.width - 100, this.base2Y, canvas.width - 80, this.base2Y - 10, 2, this.nukedEmBaseTypes[0]);
      this.createBase(canvas.width - 250, this.base2Y, canvas.width - 230, this.base2Y - 10, 2, this.nukedEmBaseTypes[1]);
      this.createBase(canvas.width - 350, this.base2Y, canvas.width - 330, this.base2Y - 10, 2, this.nukedEmBaseTypes[2]);
    }
  }, {
    key: "getMissileBaseX",
    value: function getMissileBaseX(player) {
      var base = this.nukedEmBases.filter(function (f) {
        return f.player == player && f.missileBase === true;
      });
      return base[0].X;
    }
  }, {
    key: "determineBaseHit",
    value: function determineBaseHit() {
      return this.nukedEmBases.filter(function (f) {
        return f.baseStatus == HIT;
      })[0];
    }
  }, {
    key: "areAllBasesDestroyed",
    value: function areAllBasesDestroyed() {
      var player1bases = this.nukedEmBases.filter(function (f) {
        return f.player == 1 && f.baseStatus == DESTROYED;
      });
      var player2bases = this.nukedEmBases.filter(function (f) {
        return f.player == 2 && f.baseStatus == DESTROYED;
      });
      console.info("count:", player1bases.length, player2bases.length);
      if (player1bases.length == this.nukedEmBaseTypes.length || player2bases.length == this.nukedEmBaseTypes.length) return true;
      return false;
    }
  }, {
    key: "checkMinimumDistanceBetweenBases",
    value: function checkMinimumDistanceBetweenBases(x, player) {
      //   const bases = this.nukedEmBases.filter((base) => (base.player = player));
      this.nukedEmBases.forEach(function (base) {
        var diff = x - base.X;
        var result = Math.abs(diff) > MINIMUM_BASE_DISTANCE;

        if (result === false) {// console.info(
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
  }, {
    key: "draw",
    value: function draw() {
      var grd = ctx.createLinearGradient(0, this.mountainY, 0, canvas.height);
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
  }, {
    key: "drawBases",
    value: function drawBases() {
      this.nukedEmBases.forEach(function (base) {
        // console.info(base.X, base.Y, base.fillColor);
        if (base.baseStatus == DESTROYED) {
          ctx.drawImage(holeInGround, base.X + baseWidth / 2, base.Y, 50, 20);
        } else {
          ctx.beginPath();
          ctx.fillStyle = base.fillColor;
          ctx.arc(base.X + baseWidth / 2, base.Y, baseWidth / 2, 1 * Math.PI, 0 * Math.PI);
          ctx.fill();
        }
      });
    }
  }, {
    key: "getScoreForPlayer",
    value: function getScoreForPlayer(player) {
      var opponentsBase = player == 1 ? 2 : 1;
      var hits = this.nukedEmBases.filter(function (f) {
        return f.player == opponentsBase && f.baseStatus == DESTROYED;
      }); // console.info(hits);

      var score = hits.map(function (hit) {
        return hit.points;
      }).reduce(function (partialsum, a) {
        return partialsum + a;
      }, 0);
      return score;
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      var player1Score = this.getScoreForPlayer(1);
      var player2Score = this.getScoreForPlayer(2);
      var text = "Score " + player1Score + ":" + player2Score;
      var width = ctx.measureText(text).width;
      ctx.fillStyle = "black";
      ctx.font = "36px Arial";
      ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height - 40);
      ctx.fillStyle = "white";
      ctx.fillText(text, canvas.width / 2 - width / 2 - 2, canvas.height - 42);
    }
  }, {
    key: "drawExplosion",
    value: function drawExplosion() {
      var sound = document.getElementById("explosion-sound"); //sound.play();

      console.info("playing sound...");
      var base = this.nukedEmBases.filter(function (f) {
        return f.baseStatus == HIT;
      })[0]; // console.info(base);

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(base.X + baseWidth / 2, base.Y, baseWidth / 2, 1 * Math.PI, 0 * Math.PI);
      ctx.fill();
      ctx.drawImage(mushroomCloud, base.X - mushroomCloud.width / 2, base.Y - 78, 57, 78);
      ctx.drawImage(holeInGround, base.X - holeInGround.width / 2, base.Y, 50, 20);
      base.baseStatus = DESTROYED;
    }
  }, {
    key: "drawBaseMissiles",
    value: function drawBaseMissiles(player1Missiles, player2Missiles) {
      var y = canvas.height - 70;
      var x = 5;

      for (var i = 1; i <= player1Missiles; i++) {
        ctx.drawImage(white_missile, x + i * 15, y, white_missile.width / 3, white_missile.height / 3);
      }

      x = canvas.width - 30;

      for (var _i = 1; _i <= player2Missiles; _i++) {
        ctx.drawImage(white_missile, x - _i * 15, y, white_missile.width / 3, white_missile.height / 3);
      }
    }
  }, {
    key: "drawPlayerNames",
    value: function drawPlayerNames() {
      ctx.fillStyle = "black";
      ctx.font = "36px Arial";
      ctx.fillText(player1.playerName, 30, canvas.height - 80);
      ctx.fillStyle = "white";
      ctx.fillText(player1.playerName, 28, canvas.height - 82);
      var text = player2.playerName;
      var width = ctx.measureText(text).width;
      ctx.fillStyle = "black";
      ctx.font = "36px Arial";
      ctx.fillText(text, canvas.width - width - 40, canvas.height - 80);
      ctx.fillStyle = "white";
      ctx.fillText(text, canvas.width - width - 42, canvas.height - 82);
    }
  }, {
    key: "drawMissMarkers",
    value: function drawMissMarkers() {
      ctx.fillStyle = "white";
      player1.missiles.forEach(function (missile) {
        ctx.fillRect(missile.missX, missile.missY - 2, 2, 4);
      });
      player2.missiles.forEach(function (missile) {
        ctx.fillRect(missile.missX, missile.missY - 2, 2, 4);
      });
    }
  }]);

  return Landscape;
}();

var Background = /*#__PURE__*/function () {
  function Background() {
    _classCallCheck(this, Background);
  }

  _createClass(Background, [{
    key: "loadStars",
    value: function loadStars() {
      for (var i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() * 3,
          height: Math.random() * 3
        });
      }
    }
  }, {
    key: "draw",
    value: function draw(landscape) {
      // console.info("Start...", canvas.width);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      for (var i = 0; i < maxStars; i++) {
        ctx.fillRect(stars[i].x, stars[i].y, stars[i].width, stars[i].height);
      }

      ctx.drawImage(deathStar, canvas.width - 150, 15, 121, 107);
      ctx.drawImage(saturn, 100, 45, 42, 25);
      ctx.drawImage(moon, 220, 45, 38, 32);
      landscape.draw();
    }
  }, {
    key: "hitAnimation",
    value: function hitAnimation(drawScreen, player, opponent) {
      var r, g, b;
      console.info("anim");
      var phrases = new HitPhrases();
      var text = phrases.getPhrase(drawScreen, player, opponent);
      var interval = setInterval(function () {
        console.info("color", canvas.width, canvas.height);
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ", 0.2)");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2);
      }, 300);
      setTimeout(function () {
        clearInterval(interval);
        drawScreen();
      }, ANIMATION_LENGTH);
    }
  }, {
    key: "doGameOver",
    value: function doGameOver(landscape) {
      var text = "";
      var player1Score = landscape.getScoreForPlayer(1);
      var player2Score = landscape.getScoreForPlayer(2);

      if (player1Score == player2Score) {
        text = "GAME OVER, DRAW!!!";
      } else {
        var winner = player1Score > player2Score ? nukedEm.player1.playerName : nukedEm.player2.playerName;
        text = "GAME OVER, WELL DONE " + winner + "!!!";
      }

      var textWidth = ctx.measureText(text).width;
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2);
    }
  }]);

  return Background;
}();

var Missile = /*#__PURE__*/function () {
  function Missile(player, x, y, power, angle, id) {
    _classCallCheck(this, Missile);

    _defineProperty(this, "missileX", 0);

    _defineProperty(this, "missileY", 0);

    _defineProperty(this, "power", 0);

    _defineProperty(this, "angle", 0);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "hitX", 0);

    _defineProperty(this, "hitY", 0);

    _defineProperty(this, "playerTurn", 1);

    _defineProperty(this, "missileId", 0);

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

  _createClass(Missile, [{
    key: "update",
    value: function update() {
      var rad = this.angle * (Math.PI / 180);
      var vx = this.power * Math.cos(rad);
      var vy = this.power * Math.sin(rad);
      var vxWindVelocity = 0; //Math.cos(rad) * Math.abs(windVelocity) * 0.74;

      var vyWindVelocity = 0; //Math.sin(rad) * Math.abs(windVelocity) * 0.74 - 10;

      var x = vx * time;
      if (this.playerTurn == 1) this.missileX = Math.floor(this.startX + x - vxWindVelocity);else this.missileX = Math.floor(this.startX - x - vxWindVelocity);
      var y = vy * time + 0.5 * -9.8 * Math.pow(time, 2);
      this.missileY = Math.floor(this.startY - y - vyWindVelocity);
      this.calcRotation(vx, rad);
    }
  }, {
    key: "calcRotation",
    value: function calcRotation(vx, rad) {
      var multiplier = 0;
      if (this.playerTurn == 1) multiplier = 1;else multiplier = -1;
      var vy = this.power * Math.sin(rad) + -9.8 * time;
      var deg = 0;

      if (vy < 0) {
        deg = Math.atan(vx * multiplier / (vy * -1)) * (180 / Math.PI);
        this.rotation = 90 - deg + 90;
      } else {
        deg = Math.atan(vx * multiplier / vy) * (180 / Math.PI);
        this.rotation = deg;
      }
    }
  }, {
    key: "detectCollision",
    value: function detectCollision(landscape) {
      // console.info("detectCollision...");
      if (this.playerTurn == 2 && this.missileX < 0) return OUT_OF_BOUNDS;else if (this.playerTurn == 1 && this.missileX > canvas.width) return OUT_OF_BOUNDS;
      var base;

      for (var i = 0; i < landscape.nukedEmBases.length; i++) {
        base = landscape.nukedEmBases[i]; // if (this.missileId == 1 && base.fillColor == "red" && base.player == 2) {
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

        if ((this.missileY + white_missile.height / MISSILE_SCALE < base.Y || this.missileY > base.Y + baseHeight || this.missileX + white_missile.width / MISSILE_SCALE < base.X || this.missileX > base.X + white_missile.width / MISSILE_SCALE) == false) {
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
          if (this.missileX > landscape.mountainX && this.missileY > landscape.base2Y - white_missile.height / MISSILE_SCALE) {
            this.missX = this.missileX + white_missile.width / MISSILE_SCALE;
            this.missY = landscape.base2Y;
            return MISS;
          }

          break;

        case 2:
          if (this.missileX < landscape.mountainX && this.missileY > landscape.base1Y - white_missile.height / MISSILE_SCALE) {
            this.missX = this.missileX - white_missile.width / MISSILE_SCALE;
            this.missY = landscape.base1Y;
            return MISS;
          }

          break;
      }

      return NO_HIT;
    }
  }, {
    key: "drawPath",
    value: function drawPath() {
      drawRotatedImage(white_missile, this.missileX, this.missileY, white_missile.width / MISSILE_SCALE, white_missile.height / MISSILE_SCALE, this.rotation);
    }
  }]);

  return Missile;
}();

function drawRotatedImage(image, x, y, w, h, degrees) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(degrees * Math.PI / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 1; // ctx.strokeRect(x, y, w, h);

  ctx.restore();
}

var Player = /*#__PURE__*/function () {
  function Player(playerName, number) {
    _classCallCheck(this, Player);

    _defineProperty(this, "missiles", []);

    _defineProperty(this, "missileCount", 10);

    this.playerNumber = number;
    this.playerName = playerName;
    this.score = 0;
  }

  _createClass(Player, [{
    key: "calculateScore",
    value: function calculateScore(points) {
      this.score += points;
    }
  }, {
    key: "resetScore",
    value: function resetScore(score) {
      this.score = score;
    }
  }, {
    key: "reduceMissiles",
    value: function reduceMissiles(num) {
      this.missileCount -= num;
      return this.missileCount;
    }
  }]);

  return Player;
}();

var NukedEmGame = /*#__PURE__*/function () {
  function NukedEmGame() {
    _classCallCheck(this, NukedEmGame);

    _defineProperty(this, "missile", void 0);

    _defineProperty(this, "playersTurn", 1);

    _defineProperty(this, "gameOver", false);

    _defineProperty(this, "numMissiles", 0);

    _defineProperty(this, "demoMode", true);
  }

  _createClass(NukedEmGame, [{
    key: "initializeGame",
    value: function initializeGame() {
      this.shootingStar = new ShootingStar();
      this.getPlayers();
      this.landscape = new Landscape();
      this.background = new Background();
      this.background.loadStars();
      this.background.draw(this.landscape);
    }
  }, {
    key: "newGame",
    value: function newGame() {
      console.info("NEW GAME...");
      time = 0;
      missileStatus = ACTIVE; //this.fireMissile(99.9, 60, 0);
      // this.showPowerAnglePad("block");

      animate();
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      player1 = new Player("", 1);
      player2 = new Player("", 2);
      var start = document.getElementById("start");
      start.addEventListener("click", function () {
        var txtplayer1 = document.getElementById("player1");
        var txtplayer2 = document.getElementById("player2");

        if (txtplayer1.value == "" || txtplayer2.value == "") {
          var error = document.getElementById("error");
          error.innerText = "Please enter names for both players.";
          return;
        }

        player1.playerName = txtplayer1.value;
        player2.playerName = txtplayer2.value;
        var container = document.getElementById("players-container");
        container.style.display = "none";
        nukedEm.showPowerAnglePad("block");
        nukedEm.newGame();
      });
    }
  }, {
    key: "alternateTurn",
    value: function alternateTurn() {
      if (this.playersTurn == 1) this.playersTurn = 2;else this.playersTurn = 1;
    }
  }, {
    key: "showPowerAnglePad",
    value: function showPowerAnglePad(display) {
      // console.info("getPowerAngle....", this.playersTurn);
      var controls = document.getElementById("controls-container");
      controls.style.display = display;
      if (this.playersTurn == 1) controls.style.left = "100px";else controls.style.left = canvas.width - 350 + "px";
    }
  }, {
    key: "demoMissiles",
    value: function demoMissiles() {
      if (this.numMissiles == 0) {
        this.fireMissile(90, 65, 0);
      } else if (this.numMissiles == 1) {
        this.playersTurn = 1;
        this.fireMissile(93.9, 50, 1);
      }

      this.numMissiles++;
    }
  }, {
    key: "fireMissile",
    value: function fireMissile(power, angle, id) {
      // console.info("fire", this.playersTurn);
      if (this.playersTurn == 1) {
        player1.reduceMissiles(1);
        this.missile = new Missile(1, this.landscape.getMissileBaseX(1), this.landscape.base1Y - 10, power, angle, id);
        player1.missiles.push(this.missile);
      } else {
        player2.reduceMissiles(1);
        this.missile = new Missile(2, this.landscape.getMissileBaseX(2), this.landscape.base2Y - 10, power, angle, id);
        player2.missiles.push(this.missile);
      }
    }
  }, {
    key: "doHit",
    value: function doHit() {
      var _this2 = this;

      var base = this.landscape.determineBaseHit();
      var playerName = base.player == 1 ? player2.playerName : player1.playerName;
      var opponentName = base.player == 1 ? player1.playerName : player2.playerName;
      this.showPowerAnglePad("none");
      this.landscape.drawExplosion();
      this.background.hitAnimation(function () {
        _this2.drawScreen();

        _this2.isGameOver();

        _this2.missileStatus = INACTIVE;
        if (!_this2.gameOver) _this2.showPowerAnglePad("block");
      }, playerName, opponentName);
      this.landscape.drawBaseMissiles(player1.missiles, player2.missiles); // this.alternateTurn();
    } // async doHit() {
    //   const base = this.landscape.determineBaseHit();
    //   const playerName =
    //     base.player == 1 ? player2.playerName : player1.playerName;
    //   const opponentName =
    //     base.player == 1 ? player1.playerName : player2.playerName;
    //   // ctx.fillStyle = `red`;
    //   // ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   this.showPowerAnglePad("none");
    //   this.landscape.drawExplosion();
    //   this.background.hitAnimation(this.drawScreen, playerName, opponentName);
    //   // this.drawScreen();
    //   this.isGameOver();
    //   this.missileStatus = INACTIVE;
    //   if (!this.gameOver) this.showPowerAnglePad("block");
    //   this.landscape.drawBaseMissiles(player1.missiles, player2.missiles);
    // }

  }, {
    key: "isGameOver",
    value: function isGameOver() {
      if (player1.missileCount == 0 && player2.missileCount == 0) {
        this.gameOver = true;
        return;
      } else if (this.landscape.areAllBasesDestroyed()) {
        this.gameOver = true;
        return;
      }
    }
  }, {
    key: "nextMissile",
    value: function nextMissile(power, angle) {
      console.info("nextMissile...");
      this.showPowerAnglePad("none");
      missileStatus = ACTIVE;

      if (this.demoMode) {//this.demoMissiles();
        // return;
      }

      if (this.playersTurn == 1) {
        if (player1.missileCount > 0) {
          this.fireMissile(power, angle, 0);
        }
      } else {
        if (player2.missileCount > 0) this.fireMissile(power, angle, 0);
      }
    }
  }, {
    key: "drawScreen",
    value: function drawScreen() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.shootingStar.update();
      this.shootingStar.draw();
      this.background.draw(this.landscape);
      this.landscape.drawBaseMissiles(player1.missileCount, player2.missileCount);
      this.landscape.drawMissMarkers();
      this.landscape.updateScore();
      if (this.gameOver) this.background.doGameOver(this.landscape);
    }
  }, {
    key: "run",
    value: function run() {
      console.info("missileStatus...", missileStatus, this.gameOver);

      if (missileStatus == ACTIVE) {
        // console.info("RUN...");
        this.drawScreen();
        var result;
        if (this.missile) result = this.missile.detectCollision(this.landscape);else result = AWAITING_FIRE;

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
            this.missile.update();
            this.missile.drawPath();
        }
      } else if (missileStatus == INACTIVE) {
        this.drawScreen();
      } else {//Do nothing until next missile.
      }

      time += timerInterval;
    }
  }]);

  return NukedEmGame;
}();

var nukedEm;

function loadGame() {
  nukedEm = new NukedEmGame();
  nukedEm.initializeGame(); // nukedEm.newGame();
  //animate();
}

function animate() {
  nukedEm.run();
  requestAnimationFrame(animate);
} // animate();
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