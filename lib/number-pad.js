"use strict";

var POWER_CONTROL = 1;
var ANGLE_CONTROL = 2;
var power = document.getElementById("power");
var angle = document.getElementById("angle");
power.addEventListener("click", function () {
  power.style.backgroundColor = "rgb(255, 0, 0)";
  power.style.color = "rgb(255, 255, 255)";
  angle.style.backgroundColor = "rgb(255, 255, 255)";
  angle.style.color = "rgb(0, 0, 0)";
});
angle.addEventListener("click", function () {
  angle.style.backgroundColor = "rgb(255, 0, 0)";
  angle.style.color = "rgb(255, 255, 255)";
  power.style.backgroundColor = "rgb(255, 255, 255)";
  power.style.color = "rgb(0, 0, 0)";
});

function addNumber(num) {
  var control = getActiveControl();
  console.info(control);
  if (control == POWER_CONTROL) power.value += num;else angle.value += num;
}

function getActiveControl() {
  //   console.info(window.getComputedStyle(power).backgroundColor);
  if (window.getComputedStyle(power).backgroundColor == "rgb(255, 0, 0)") return POWER_CONTROL;else return ANGLE_CONTROL;
}

var number1 = document.getElementById("number1");
number1.addEventListener("click", function () {
  console.info("clcick");
  addNumber(1);
});
var number2 = document.getElementById("number2");
number2.addEventListener("click", function () {
  console.info("clcick");
  addNumber(2);
});
var number3 = document.getElementById("number3");
number3.addEventListener("click", function () {
  console.info("clcick");
  addNumber(3);
});
var number4 = document.getElementById("number4");
number4.addEventListener("click", function () {
  console.info("clcick");
  addNumber(4);
});
var number5 = document.getElementById("number5");
number5.addEventListener("click", function () {
  console.info("clcick");
  addNumber(5);
});
var number6 = document.getElementById("number6");
number6.addEventListener("click", function () {
  console.info("clcick");
  addNumber(6);
});
var number7 = document.getElementById("number7");
number7.addEventListener("click", function () {
  console.info("clcick");
  addNumber(7);
});
var number8 = document.getElementById("number8");
number8.addEventListener("click", function () {
  console.info("clcick");
  addNumber(8);
});
var number9 = document.getElementById("number9");
number9.addEventListener("click", function () {
  console.info("clcick");
  addNumber(9);
});
var number0 = document.getElementById("number0");
number0.addEventListener("click", function () {
  console.info("clcick");
  addNumber(0);
});
var period = document.getElementById("period");
period.addEventListener("click", function () {
  console.info("clcick");
  addNumber(".");
});
var fire = document.getElementById("fire");
fire.addEventListener("click", function () {
  console.info("Power : Angle - ", power.value, angle.value);
  nukedEm.nextMissile(power.value, angle.value);
});
var clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  var control = getActiveControl();
  if (control == POWER_CONTROL) power.value = "";else angle.value = "";
});
var increasePower = document.getElementById("increasePower");
increasePower.addEventListener("click", function () {
  power.value = (parseFloat(power.value) + 0.01).toFixed(2);
});
var decreasePower = document.getElementById("decreasePower");
decreasePower.addEventListener("click", function () {
  power.value = (parseFloat(power.value) - 0.01).toFixed(2);
});
var increaseAngle = document.getElementById("increaseAngle");
increaseAngle.addEventListener("click", function () {
  angle.value = parseInt(angle.value) + 1;
});
var decreaseAngle = document.getElementById("decreaseAngle");
decreaseAngle.addEventListener("click", function () {
  angle.value = parseInt(angle.value) - 1;
});