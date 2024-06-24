let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;

let grid;

function initialize() {
  grid = new Grid();
  updateGrid();
}

function Grid() {
  this.cells = new Array(9).fill(0);
}

Grid.prototype.isFull = function () {
  return this.cells.every(cell => cell !== 0);
};

Grid.prototype.checkWin = function (player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winningCombos.some(combo => {
    return combo.every(cell => this.cells[cell] === player);
  });
};

// Player makes a move
function playerMove(cellIndex) {
  if (grid.cells[cellIndex] === 0) {
    grid.cells[cellIndex] = currentPlayer;
    updateGrid();
    if (grid.checkWin(currentPlayer)) {
      if (currentPlayer === 1) {
        player1Score++;
      } else {
        player2Score++;
      }
      showModal("winAnnounce", `Player ${currentPlayer} wins!`);
      updateScores();
    } else if (grid.isFull()) {
      tieScore++;
      showModal("winAnnounce", "It's a tie!");
      updateScores();
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateGrid();
    }
  }
}

function updateGrid() {
  for (let i = 0; i < grid.cells.length; i++) {
    const cell = document.getElementById(`cell${i}`);
    if (grid.cells[i] === 1) {
      cell.textContent = "X";
      cell.classList.add("player1");
      cell.classList.remove("player2");
    } else if (grid.cells[i] === 2) {
      cell.textContent = "O";
      cell.classList.add("player2");
      cell.classList.remove("player1");
    } else {
      cell.textContent = "";
      cell.classList.remove("player1", "player2");
    }
    cell.style.pointerEvents = grid.cells[i] === 0 ? "auto" : "none";
  }
}


function updateScores() {
  document.getElementById("player1_score").textContent = player1Score;
  document.getElementById("player2_score").textContent = player2Score;
  document.getElementById("tie_score").textContent = tieScore;
}


function showModal(id, message) {
  const modal = document.getElementById(id);
  modal.style.display = "block";
  if (message) {
    document.getElementById("winText").textContent = message;
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
  initialize();
}

function cellClicked(cellIndex) {
  playerMove(cellIndex);
}

document.addEventListener("DOMContentLoaded", function () {
  initialize();
});
