"use strict";
const boardBox = document.querySelectorAll(".board-box");
const playerTurn = document.querySelector(".player-turn");
const playAgainBtn = document.querySelector(".play-again-btn");
const startGameBtn = document.querySelector(".start-game-btn");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameStatus = false;

startGameBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", restartGame);

function startGame() {
  boardBox.forEach((boardBox) =>
    boardBox.addEventListener("click", boxClicked)
  );
  playAgainBtn.addEventListener("click", restartGame);
  playerTurn.textContent = `${currentPlayer} Turn!`;
  gameStatus = true;
}
function boxClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] !== "" || !gameStatus) {
    return;
  }

  updateBox(this, cellIndex);
  checkWinner();
}
function updateBox(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changeTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurn.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWinner = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === " " || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWinner = true;
      break;
    }
  }
  if (roundWinner) {
    playerTurn.textContent = `${currentPlayer} wins!`;
    gameStatus = false;
  } else if (!options.includes("")) {
    playerTurn.textContent = `Draw!`;
  } else {
    changeTurn();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  playerTurn.textContent = `${currentPlayer}'s turn`;
  boardBox.forEach((boardBox) => (boardBox.textContent = ""));
  gameStatus = true;
}

startGame();
