const inputBoardSize = document.getElementById('board-size')
const restartButton = document.getElementById('restart')

let BOARD_SIZE = inputBoardSize.value
const EMPTY = "&nbsp;"
let boxes = []
let moves = "X"
let score = 0
let X_WIN = 0
let O_WIN = 0
let WIN = null

function init() {
  let board = document.createElement('table');
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < BOARD_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == BOARD_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("gameboard").appendChild(board);
  startNewGame();
}

// change board size
function changeBoardSize() {
  // Remove Table Element
  document.getElementsByTagName('table')[0].remove()
  BOARD_SIZE = inputBoardSize.value
  init()
}
inputBoardSize.addEventListener('change', changeBoardSize)

// Start new game
function startNewGame() {
  score = {
    "X": 0,
    "O": 0
  };
  WIN = null
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

// Check win condition
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#gameboard ' + testClass, turn);
    // winning condition: turn == BOARD_SIZE
    if (items.length == BOARD_SIZE) {
      return true;
    }
  }
  return false;
}

// check if a cell contains text
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

// set the table per turn
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  // Someone already win
  if (WIN) {
    if (confirm(`Player ${turn} already win, Restart the game?`)) {
      restart()
      return;
    } else {
      return
    }
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    WIN = turn
    if (turn === "X") {
      document.getElementById('x-score').innerHTML = X_WIN + 1
    } else {
      document.getElementById('o-score').innerHTML = O_WIN + 1
    }
    alert('Winner: Player ' + turn);
  } else if (moves === BOARD_SIZE * BOARD_SIZE) {
    alert("Draw");
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById('turn').textContent = `TURN : PLAYER ${turn}`;
  }
}

// restart the game
function restart() {
  startNewGame()
}
restartButton.addEventListener('click', restart)

//  initialize the game
init();
