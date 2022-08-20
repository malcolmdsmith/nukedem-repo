const POWER_CONTROL = 1;
const ANGLE_CONTROL = 2;
const power = document.getElementById("power");
const angle = document.getElementById("angle");

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
  const control = getActiveControl();
  console.info(control);
  if (control == POWER_CONTROL) power.value += num;
  else angle.value += num;
}

function getActiveControl() {
  //   console.info(window.getComputedStyle(power).backgroundColor);
  if (window.getComputedStyle(power).backgroundColor == "rgb(0, 128, 0)")
    return POWER_CONTROL;
  else return ANGLE_CONTROL;
}

const number1 = document.getElementById("number1");
number1.addEventListener("click", function () {
  console.info("clcick");
  addNumber(1);
});

const number2 = document.getElementById("number2");
number2.addEventListener("click", function () {
  console.info("clcick");
  addNumber(2);
});

const number3 = document.getElementById("number3");
number3.addEventListener("click", function () {
  console.info("clcick");
  addNumber(3);
});

const number4 = document.getElementById("number4");
number4.addEventListener("click", function () {
  console.info("clcick");
  addNumber(4);
});

const number5 = document.getElementById("number5");
number5.addEventListener("click", function () {
  console.info("clcick");
  addNumber(5);
});

const number6 = document.getElementById("number6");
number6.addEventListener("click", function () {
  console.info("clcick");
  addNumber(6);
});

const number7 = document.getElementById("number7");
number7.addEventListener("click", function () {
  console.info("clcick");
  addNumber(7);
});

const number8 = document.getElementById("number8");
number8.addEventListener("click", function () {
  console.info("clcick");
  addNumber(8);
});

const number9 = document.getElementById("number9");
number9.addEventListener("click", function () {
  console.info("clcick");
  addNumber(9);
});

const number0 = document.getElementById("number0");
number0.addEventListener("click", function () {
  console.info("clcick");
  addNumber(0);
});

const period = document.getElementById("period");
period.addEventListener("click", function () {
  console.info("clcick");
  addNumber(".");
});

const fire = document.getElementById("fire");
fire.addEventListener("click", function () {
  console.info("Power : Angle - ", power.value, angle.value);
  nukedEm.nextMissile(power.value, angle.value);
});

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  const control = getActiveControl();
  if (control == POWER_CONTROL) power.value = "";
  else angle.value = "";
});

const increasePower = document.getElementById("increasePower");
increasePower.addEventListener("click", function () {
  power.value = (parseFloat(power.value) + 0.01).toFixed(2);
});

const decreasePower = document.getElementById("decreasePower");
decreasePower.addEventListener("click", function () {
  power.value = (parseFloat(power.value) - 0.01).toFixed(2);
});

const increaseAngle = document.getElementById("increaseAngle");
increaseAngle.addEventListener("click", function () {
  angle.value = parseInt(angle.value) + 1;
});

const decreaseAngle = document.getElementById("decreaseAngle");
decreaseAngle.addEventListener("click", function () {
  angle.value = parseInt(angle.value) - 1;
});
