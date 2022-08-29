"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var MISSILE_SCALE = 6; // let flames = new Image();
// flames.src = "assets/images/flames.gif";

var holeInGround = new Image();
holeInGround.src = "assets/images/holeInground.png";
var flames = document.getElementById("flames");
var MISS = 1;
var HIT = 2;
var OUT_OF_BOUNDS = 3;
var NO_HIT = 4;
var DESTROYED = 5;
var AWAITING_FIRE = 6;
var ACTIVE = 1;
var INACTIVE = 0;
var ANIMATION_LENGTH = 8000;
var MINIMUM_BASE_DISTANCE = 80;
var BASEWIDTH = 20;
var maxStars = 300;
var stars = [];
var hitPhrases = [];
var time = 0;
var timerInterval = 0.04;
var gameFrame = 0;
var staggerFrames = 155;
var windVelocity = 100;
var missileStatus = 1;

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
    this.hitPhrases.push("TOP GUN HEY!");
    this.hitPhrases.push("WISE GUY, HUH!");
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
  function ShootingStar(num) {
    _classCallCheck(this, ShootingStar);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "direction", void 0);

    _defineProperty(this, "trail", void 0);

    _defineProperty(this, "timeTolive", void 0);

    _defineProperty(this, "colors", []);

    _defineProperty(this, "color", void 0);

    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.direction = num;
    this.colors[0] = "red";
    this.colors[1] = "white";
    this.colors[2] = "yellow";
    this.colors[3] = "green";
    this.init();
  }

  _createClass(ShootingStar, [{
    key: "init",
    value: function init() {
      this.trail = getRandomInt(20, 100);
      this.timeTolive = getRandomInt(300, 700);
      this.color = this.colors[getRandomInt(1, 4) - 1];
    }
  }, {
    key: "update",
    value: function update() {
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
  }, {
    key: "draw",
    value: function draw() {
      var grad = ctx.createLinearGradient(this.x, this.y, this.x + this.trail * this.direction, this.y + this.trail);
      grad.addColorStop(0, "black");
      grad.addColorStop(1, this.color);
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.trail * this.direction, this.y + this.trail);
      ctx.stroke();
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
    this.createDemoLandscape(); // this.createBases();
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
      var height = canvas.height * 0.8;
      this.base1Y = height;
      this.base2Y = height;
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
          ctx.drawImage(holeInGround, base.X - holeInGround.width / 2, base.Y, 50, 20);
        } else {
          ctx.beginPath();
          ctx.fillStyle = base.fillColor;
          ctx.arc(base.X, // + BASEWIDTH / 2,
          base.Y, BASEWIDTH / 2, 1 * Math.PI, 0 * Math.PI);
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
    value: function () {
      var _drawExplosion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var sound, base, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sound = document.getElementById("explosion-sound"); //sound.play();

                console.info("playing sound...");
                base = this.nukedEmBases.filter(function (f) {
                  return f.baseStatus == HIT;
                })[0]; // console.info(base);

                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(base.X, base.Y, BASEWIDTH / 2, 1 * Math.PI, 0 * Math.PI);
                ctx.fill(); // ctx.drawImage(flames, base.X - 25, base.Y - 58, 50, 58);

                ctx.drawImage(holeInGround, base.X - holeInGround.width / 2, base.Y, 50, 20);
                flames.style.top = base.Y - 58 + "px";
                flames.style.left = base.X - 25 + "px"; //console.info(flames.style.display);

                flames.style.display = "inline";
                _context.next = 13;
                return this.explosionPause(3000);

              case 13:
                result = _context.sent;
                flames.style.display = "none";
                base.baseStatus = DESTROYED;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function drawExplosion() {
        return _drawExplosion.apply(this, arguments);
      }

      return drawExplosion;
    }()
  }, {
    key: "explosionPause",
    value: function explosionPause(timeout) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, timeout);
      });
    }
  }, {
    key: "drawBaseMissiles",
    value: function drawBaseMissiles() {
      if (!player1 && !player2) return;
      var y = canvas.height - 70;
      var x = 5;

      for (var i = 1; i <= player1.missileCount; i++) {
        ctx.drawImage(white_missile, x + i * 15, y, white_missile.width / 3, white_missile.height / 3);
      }

      x = canvas.width - 30;

      for (var _i = 1; _i <= player2.missileCount; _i++) {
        ctx.drawImage(white_missile, x - _i * 15, y, white_missile.width / 3, white_missile.height / 3);
      }
    }
  }, {
    key: "drawPlayerNames",
    value: function drawPlayerNames() {
      if (!player1 && !player2) return;
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
      if (!player1 && !player2) return;
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

    _defineProperty(this, "shootingStars", []);

    this.loadStars();
    this.loadShootingStars();
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
    key: "loadShootingStars",
    value: function loadShootingStars() {
      var star = new ShootingStar(1);
      this.shootingStars.push(star);
      star = new ShootingStar(-1);
      this.shootingStars.push(star);
    }
  }, {
    key: "drawShootingStars",
    value: function drawShootingStars() {
      this.shootingStars.forEach(function (star) {
        star.update();
        star.draw();
      });
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
      console.info("anim", player, opponent);
      var phrases = new HitPhrases();
      var text = phrases.getPhrase(player, opponent);
      var interval = setInterval(function () {
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

    _defineProperty(this, "prevX", 0);

    _defineProperty(this, "prevY", 0);

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
    this.startX = x; //player == 1 ? x + BASEWIDTH : x - BASEWIDTH;

    this.startY = y - white_missile.height / MISSILE_SCALE;
    this.power = power;
    this.angle = angle;
    this.rotation = 0;
    this.missileId = id;
  }

  _createClass(Missile, [{
    key: "update",
    value: function update(landscape) {
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
      var rad = this.angle * (Math.PI / 180);
      var vx = this.power * Math.cos(rad);
      var vy = this.power * Math.sin(rad);
      var vxWindVelocity = 0; //Math.cos(rad) * Math.abs(windVelocity) * 0.74;

      var vyWindVelocity = 0; //Math.sin(rad) * Math.abs(windVelocity) * 0.74 - 10;

      var x = vx * time;

      if (this.playerTurn == 1) {
        this.missileX = Math.floor(this.startX + x - vxWindVelocity);
      } else {
        this.missileX = Math.floor(this.startX - x - vxWindVelocity);
      }

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
      if (this.playerTurn == 2 && this.missileX < 0) return OUT_OF_BOUNDS;else if (this.playerTurn == 1 && this.missileX > canvas.width) return OUT_OF_BOUNDS; //Has missile hit the mountain

      if (this.isMountainHit(landscape)) return MISS;
      var base;

      for (var i = 0; i < landscape.nukedEmBases.length; i++) {
        base = landscape.nukedEmBases[i];

        if (base.baseStatus != DESTROYED) {
          var path = new Path2D();
          path.moveTo(this.prevX, this.prevY);
          path.lineTo(this.missileX, this.missileY);
          path.closePath();
          var baseData = {
            radius: BASEWIDTH / 2,
            x: base.X,
            y: base.Y
          };

          if (this.isBaseInPath(baseData, path)) {
            base.baseStatus = HIT;
            return HIT;
          }
        }
      }

      switch (this.playerTurn) {
        case 1:
          if (this.missileX > landscape.mountainX && this.missileY > landscape.base2Y //    white_missile.height / MISSILE_SCALE
          ) {
            this.missX = this.missileX; // + white_missile.width / MISSILE_SCALE;

            this.missY = landscape.base2Y;
            return MISS;
          }

          break;

        case 2:
          if (this.missileX < landscape.mountainX && this.missileY > landscape.base1Y //- white_missile.height / MISSILE_SCALE
          ) {
            this.missX = this.missileX; // - white_missile.width / MISSILE_SCALE;

            this.missY = landscape.base1Y;
            return MISS;
          }

          break;
      }

      return NO_HIT;
    }
  }, {
    key: "isBaseInPath",
    value: function isBaseInPath(baseData, path) {
      var radius = baseData.radius;

      for (var x = baseData.x - radius; x <= baseData.x + 2 * radius; x += 1 //radius
      ) {
        for (var y = baseData.y - radius; y <= baseData.y + 2 * radius; y += 1 //radius
        ) {
          // console.info("x:", x, " y:", y);
          if (ctx.isPointInPath(path, x, y)) return true;
        }
      }

      return false;
    }
  }, {
    key: "isMountainHit",
    value: function isMountainHit(landscape) {
      if (this.prevX == 0) return false;

      if (this.doesLineCrossLine(this.prevX, this.prevY, this.missileX, this.missileY, landscape.mountainX - landscape.mountainWidth / 2, landscape.base1Y, landscape.mountainX, landscape.mountainY)) {
        return true;
      }

      if (this.doesLineCrossLine(this.prevX, this.prevY, this.missileX, this.missileY, landscape.mountainX, landscape.mountainY, landscape.mountainX + landscape.mountainWidth / 2, landscape.base2Y)) {
        return true;
      }

      return false;
    }
  }, {
    key: "doesLineCrossLine",
    value: function doesLineCrossLine(x1, y1, x2, y2, x3, y3, x4, y4) {
      var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
      var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)); // if uA and uB are between 0-1, lines are colliding

      if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "drawPath",
    value: function drawPath() {
      // ctx.fillStyle = "yellow";
      // ctx.fillRect(this.missileX, this.missileY, 2, 2);
      // return;
      drawRotatedImage(white_missile, this.missileX, this.missileY, white_missile.width / MISSILE_SCALE, white_missile.height / MISSILE_SCALE, this.rotation);
    }
  }]);

  return Missile;
}();

function drawRotatedImage(image, x, y, w, h, degrees) {
  ctx.save(); //  ctx.translate(x + w / 2, y + h / 2);

  ctx.translate(x, y);
  ctx.rotate(degrees * Math.PI / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h); // ctx.fillStyle = "red";
  // ctx.fillRect(x, y, 2, 2);

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

    _defineProperty(this, "landscape", new Landscape());

    _defineProperty(this, "background", new Background());
  }

  _createClass(NukedEmGame, [{
    key: "initializeGame",
    value: function initializeGame() {
      animate();
      this.getPlayers();
      this.background.draw(this.landscape);
      this.landscape.drawBaseMissiles();
    }
  }, {
    key: "newGame",
    value: function newGame() {
      console.info("NEW GAME...");
      time = 0;
      missileStatus = ACTIVE; //this.fireMissile(99.9, 60, 0);
      // this.showPowerAnglePad("block");
      // animate();
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      // player1 = new Player("", 1);
      // player2 = new Player("", 2);
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
      clear_power_values = true;
      clear_angle_values = true;
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
        this.missile = new Missile(1, this.landscape.getMissileBaseX(1), this.landscape.base1Y, power, angle, id);
        player1.missiles.push(this.missile);
      } else {
        player2.reduceMissiles(1);
        this.missile = new Missile(2, this.landscape.getMissileBaseX(2), this.landscape.base2Y, power, angle, id);
        player2.missiles.push(this.missile);
      }
    }
  }, {
    key: "doHit",
    value: function doHit() {
      var base = this.landscape.determineBaseHit();
      var playerName = base.player == 1 ? player2.playerName : player1.playerName;
      var opponentName = base.player == 1 ? player1.playerName : player2.playerName;
      this.showPowerAnglePad("none"); // const interval = setInterval(() => {
      // }, 3000)

      this.landscape.drawExplosion();
      var that = this;
      setTimeout(function () {
        //  clearInterval(interval);
        that.background.hitAnimation(function () {
          that.drawScreen();
          that.isGameOver();
          missileStatus = INACTIVE;
          if (!that.gameOver) that.showPowerAnglePad("block");
        }, playerName, opponentName);
      }, 3000);
      this.landscape.drawBaseMissiles(player1.missiles, player2.missiles);
    }
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
      this.background.draw(this.landscape);
      this.background.drawShootingStars();
      this.landscape.draw();
      this.landscape.drawBaseMissiles();
      this.landscape.drawMissMarkers();
      this.landscape.updateScore();
      if (this.gameOver) this.background.doGameOver(this.landscape);
    }
  }, {
    key: "run",
    value: function run() {
      // console.info("missileStatus...", missileStatus, this.gameOver);
      // if (time == 1) missileStatus = INACTIVE;
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
            this.missile.update(this.landscape);
            this.missile.drawPath();
        }
      } else if (missileStatus == INACTIVE) {
        this.drawScreen();
      } else if (missileStatus == HIT) {//Do nothing until next missile.
      } else {
        this.drawScreen();
      }

      time += timerInterval;
    }
  }]);

  return NukedEmGame;
}();

var player1 = new Player("", 1);
var player2 = new Player("", 2);
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