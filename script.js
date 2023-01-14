// Countdown

const countdown = () => {
  const countDate = new Date("January 1, 2024 00:00:00").getTime();
  let timeNow = new Date().getTime();
  let timeGap = countDate - timeNow;
  if (timeGap <= 0) return;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let amountOfDays = Math.floor(timeGap / day);
  let amountOfHours = Math.floor((timeGap % day) / hour);
  let amountOfMinutes = Math.floor((timeGap % hour) / minute);
  let amountOfSeconds = Math.floor((timeGap % minute) / second);

  document.querySelector(".days").innerHTML = amountOfDays;
  document.querySelector(".hours").innerHTML = amountOfHours;
  document.querySelector(".minutes").innerHTML = amountOfMinutes;
  document.querySelector(".seconds").innerHTML = amountOfSeconds;
};

setInterval(countdown, 1000);

//Snowfall

const snowfall = document.querySelector(".snowfall");
const ctx = snowfall.getContext("2d");
const particlesOnScreen = 270;
const particlesArray = [];
let width = (snowfall.width = window.innerWidth);
let height = (snowfall.height = window.innerHeight);

function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

function clientResize() {
  width = snowfall.width = window.innerWidth;
  height = snowfall.height = window.innerHeight;
}
window.addEventListener("resize", clientResize);

function createSnowflakes() {
  for (let i = 0; i < particlesOnScreen; i++) {
    particlesArray.push({
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: random(0.5, 1),
      speedX: random(-3, 3),
      speedY: random(1, 6),
      radius: random(0.5, 5),
    });
  }
}

function drawSnowflakes() {
  for (let i = 0; i < particlesArray.length; i++) {
    ctx.beginPath();
    ctx.arc(
      particlesArray[i].x,
      particlesArray[i].y,
      particlesArray[i].radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${particlesArray[i].opacity})`;
    ctx.fill();
  }
}

function moveSnowflakes() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;
    particlesArray[i].y += particlesArray[i].speedY;

    if (particlesArray[i].y > height) {
      particlesArray[i].x = Math.random() * width * 1.5;
      particlesArray[i].y = -50;
    }
  }
}

function updateSnowfall() {
  ctx.clearRect(0, 0, width, height);
  drawSnowflakes();
  moveSnowflakes();
}

setInterval(updateSnowfall, 50);
createSnowflakes();
