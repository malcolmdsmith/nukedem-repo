"use strict";

var POWER_CONTROL = 1;
var ANGLE_CONTROL = 2;
var power = document.getElementById("power");
var angle = document.getElementById("angle");
var clear_power_values = false;
var clear_angle_values = false;
power.addEventListener("click", function () {
  power.style.backgroundColor = "rgb(0, 128, 0)";
  power.style.color = "rgb(255, 255, 255)";
  angle.style.backgroundColor = "rgb(255, 255, 255)";
  angle.style.color = "rgb(0, 0, 0)";
});
angle.addEventListener("click", function () {
  angle.style.backgroundColor = "rgb(0, 128, 0)";
  angle.style.color = "rgb(255, 255, 255)";
  power.style.backgroundColor = "rgb(255, 255, 255)";
  power.style.color = "rgb(0, 0, 0)";
});

function addNumber(num) {
  var control = getActiveControl();
  console.info(control);

  if (control == POWER_CONTROL) {
    if (clear_power_values) power.innerText = "";
    power.innerText += num;
    clear_power_values = false;
  } else {
    if (clear_angle_values) angle.innerText = "";
    angle.innerText += num;
    clear_angle_values = false;
  }
}

function getActiveControl() {
  //   console.info(window.getComputedStyle(power).backgroundColor);
  if (window.getComputedStyle(power).backgroundColor == "rgb(0, 128, 0)") return POWER_CONTROL;else return ANGLE_CONTROL;
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
  nukedEm.nextMissile(power.innerText, angle.innerText);
});
var clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  var control = getActiveControl();
  if (control == POWER_CONTROL) power.innerText = "";else angle.innerText = "";
});
var increasePower = document.getElementById("increasePower");
increasePower.addEventListener("click", function () {
  power.innerText = (parseFloat(power.innerText) + 0.01).toFixed(2);
});
var decreasePower = document.getElementById("decreasePower");
decreasePower.addEventListener("click", function () {
  power.innerText = (parseFloat(power.innerText) - 0.01).toFixed(2);
});
var increaseAngle = document.getElementById("increaseAngle");
increaseAngle.addEventListener("click", function () {
  angle.innerText = parseInt(angle.innerText) + 1;
});
var decreaseAngle = document.getElementById("decreaseAngle");
decreaseAngle.addEventListener("click", function () {
  angle.innerText = parseInt(angle.innerText) - 1;
});