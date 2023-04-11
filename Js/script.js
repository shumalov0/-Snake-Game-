//  make food start

let playBoard = document.querySelector(".play-board");
let scoreElement = document.querySelector(".score");
let highscoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let score = 0;
let setintervalid;
let snakeX = 5,
  snakeY = 10;
let veloCityX = 0,
  veloCityY = 0;
let snakeBody = [];
let hightScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerHTML = `Yüksək Dərəcən ${hightScore}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);
};

const handleGameOver = () => {
  clearInterval(setintervalid);
  alert("Oyun Bitdi...");
  location.reload();
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && veloCityY != 1) {
    veloCityX = 0;
    veloCityY = -1;
  } else if (e.key === "ArrowDown" && veloCityY != -1) {
    veloCityX = 0;
    veloCityY = 1;
  } else if (e.key === "ArrowLeft" && veloCityX != 1) {
    veloCityX = -1;
    veloCityY = 0;
  } else if (e.key === "ArrowRight" && veloCityX != -1) {
    veloCityX = 1;
    veloCityY = 0;
  }
};
const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class= "food" style="grid-area:${foodY}/${foodX}" > </div>`;

  if (foodX === snakeX && foodY === snakeY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    hightScore = score >= hightScore ? score : hightScore;
    localStorage.setItem("high-score", hightScore);
    scoreElement.innerText = ` Dərəcən: ${score}`;
    highscoreElement.innerHTML = `Yüksək Dərəcən ${hightScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  //  snake
  snakeX += veloCityX;
  snakeY += veloCityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class= "head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}" > </div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setintervalid = setInterval(initGame, 125);

// make food end

document.addEventListener("keydown", changeDirection);
