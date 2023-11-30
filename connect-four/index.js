let board = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "R", "Y", "R", "R"],
  ["-", "-", "-", "Y", "Y", "R", "Y"],
  ["-", "-", "-", "Y", "R", "Y", "Y"],
  ["-", "-", "Y", "Y", "R", "R", "R"],
];

let board2 = [
  ["-", "-", "-", "R", "-", "-", "-"],
  ["-", "-", "-", "R", "R", "R", "-"],
  ["-", "-", "-", "Y", "Y", "R", "-"],
  ["-", "-", "R", "Y", "Y", "Y", "R"],
  ["-", "Y", "R", "Y", "Y", "R", "Y"],
  ["R", "Y", "Y", "R", "R", "Y", "R"],
];

function connectFour(board) {
  let count = 0;
  for (let line of board) {
    for (let cell of line) {
      if (cell === "-") {
        count++;
      }
    }
  }
  const trasposedBoard = transpose(board);
  let winner = checkWin(board);
  if (winner.done) {
    return winner.player;
  }
  winner = checkWin(trasposedBoard);
  if (winner.done) {
    return winner.player;
  }
  const diagonals = getDiagonals(board);
  console.log(diagonals);
  winner = checkWin(diagonals);
  if (winner.done) {
    return winner.player;
  }
  const trasposedDiagonals = getDiagonals(trasposedBoard);
  winner = checkWin(trasposedDiagonals);
  if (winner.done) {
    return winner.player;
  }

  if (count > 0) {
    return "in progress";
  }

  return "draw";
}

function getDiagonals(board) {
  const diagonals = [];
  const diagonals2 = [];
  for (let i = 0; i < board.length; i++) {
    diagonals.push([]);
    diagonals2.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      diagonals[i].push(board[i - j][j]);
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      diagonals2[i].push(board[board.length - 1 - i + j][j]);
    }
  }
  return diagonals.concat(diagonals2);
}

function checkWin(board) {
  for (let line of board) {
    let lineString = line.join("");
    if (lineString.includes("RRRR")) {
      return {
        done: true,
        player: "R",
      };
    } else if (lineString.includes("YYYY")) {
      return {
        done: true,
        player: "Y",
      };
    }
  }
  return {
    done: false,
  };
}

function transpose(board) {
  const trasposedBoard = [];
  for (let i = 0; i < board[0].length; i++) {
    trasposedBoard.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < trasposedBoard.length; j++) {
      trasposedBoard[j].push(board[i][j]);
    }
  }
  return trasposedBoard;
}

const winner = connectFour(board);

const winner2 = connectFour(board2);

console.log(winner);
console.log(winner2);
