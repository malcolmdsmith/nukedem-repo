const POWER_CONTROL = 1;
const ANGLE_CONTROL = 2;
const power = document.getElementById("power");
const angle = document.getElementById("angle");

let clear_power_values = false;
let clear_angle_values = false;

let player1_Power = 101.12;
let player1_Angle = 55;
let player2_Power = 101.13;
let player2_Angle = 56;

function setPlayerValues() {
  if (playersTurn == 1) power.innerText = player1_Power;
  else power.innerText = player2_Power;

  if (playersTurn == 1) angle.innerText = player1_Angle;
  else angle.innerText = player2_Angle;
}

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
  if (playersTurn == 1) {
    player1_Power = power.innerText;
    player1_Angle = angle.innerText;
  } else {
    player2_Power = power.innerText;
    player2_Angle = angle.innerText;
  }
  nukedEm.nextMissile(power.innerText, angle.innerText);
});

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  const control = getActiveControl();
  if (control == POWER_CONTROL) power.innerText = "";
  else angle.innerText = "";
});

const increasePower = document.getElementById("increasePower");
increasePower.addEventListener("click", function () {
  power.innerText = (parseFloat(power.innerText) + 0.01).toFixed(2);
});

const decreasePower = document.getElementById("decreasePower");
decreasePower.addEventListener("click", function () {
  power.innerText = (parseFloat(power.innerText) - 0.01).toFixed(2);
});

const increaseAngle = document.getElementById("increaseAngle");
increaseAngle.addEventListener("click", function () {
  angle.innerText = parseInt(angle.innerText) + 1;
});

const decreaseAngle = document.getElementById("decreaseAngle");
decreaseAngle.addEventListener("click", function () {
  angle.innerText = parseInt(angle.innerText) - 1;
});

let divLaunch;
let gameStart;
function showLauncherSelectionPad(bases, player) {
  //console.info(bases);
  const playerBases = bases.filter((f) => f.player == player);
  divLaunch = document.createElement("div");
  document.body.appendChild(divLaunch);
  divLaunch.style.position = "absolute";
  divLaunch.style.backgroundColor = "rgb(209, 187, 187)";
  divLaunch.style.width = "250px";
  divLaunch.style.height = "200px";
  divLaunch.style.position = "absolute";
  if (player == 1) divLaunch.style.left = "100px";
  //canvas.width / 2 - 125 + "px";
  else divLaunch.style.right = "100px"; //canvas.width / 2 - 125 + "px";
  divLaunch.style.top = "200px"; //canvas.height / 2 - 50 + "px";
  divLaunch.style.borderRadius = "20px";
  divLaunch.style.border = "double black";
  divLaunch.style.display = "flex";
  divLaunch.style.flexDirection = "column";
  divLaunch.style.alignItems = "center";
  divLaunch.style.padding = "20px";
  const title = document.createElement("h4");
  let caption = "";
  if (gameStart) caption = "Select your launch base?";
  else caption = "Your launch base has been destroyed, pick a new base?";

  title.innerText = caption;
  divLaunch.appendChild(title);

  playerBases.forEach((base) => {
    if (base.baseStatus != DESTROYED) {
      const button = document.createElement("button");
      button.style.backgroundColor = base.fillColor;
      button.style.color = base.captionColor;
      button.style.width = "150px";
      button.style.height = "60px";
      button.style.border = "1px solid black";
      button.style.borderRadius = "10px";
      button.style.margin = "5px";
      button.innerText = base.points + "pts";
      button.addEventListener("click", () => {
        doBaseLaunchSelection(base);
      });
      divLaunch.appendChild(button);
    } else base.missileBase = false;
  });
}

function doBaseLaunchSelection(base) {
  document.body.removeChild(divLaunch);

  base.missileBase = true;

  nukedEm.showPowerAnglePad("block");
}
