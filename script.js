// Game Object:
// Functions to implement:
// New Game
// End Game
// Edit Player Names
//
// GameBoard Object:
// Functions to implement:
// Check if game board is filled
// Check if someone has won?
// What was the last move and who played it
// Player Object//

function game() {
  let winner = "";
  function start() {}
  function end() {}
  function whoWon() {
    return winner;
  }
  function setWinner(winner) {
    winner = winner;
  }
  return { start, end, whoWon, setWinner };
}

function createPlayer(name, sign) {
  let playerMoves = 0;
  function movesMade() {
    return playerMoves;
  }
  function getName() {
    return name;
  }
  function getSign() {
    return sign;
  }
  return { getName, getSign, movesMade };
}

const GameBoard = (function () {
  const gameArr = new Array(9);
  let lastIndex = undefined;
  let LastPlayer = undefined;

  function checkWon(Player) {
    if (Player.movesMade() >= 3) {
      console.log(Player.movesMade());
      const sign = Player.getSign();

      // Check Rows
      for (let i = 0; i <= 6; i += 3) {
        let hasWon = false;
        for (let j = 0; j < 3; j++) {
          if (gameArr[j + i] != sign) {
            hasWon = false;
            break;
          } else {
            hasWon = true;
          }
        }
        if (hasWon) {
          return hasWon;
        }
      }
      // Check Cols
      for (let i = 0; i < 3; i++) {
        let hasWon = false;
        for (let j = 0; j <= 6; j += 3) {
          if (gameArr[j + i] != sign) {
            hasWon = false;
            break;
          } else {
            hasWon = true;
          }
        }
        if (hasWon) {
          return hasWon;
        }
      }
      // Check Diagonals
      for (let i = 0; i < 3; i++) {
        let d1Won = true;
        if (gameArr[2 * i + 2] != sign && d1Won) {
          d1Won = false;
        }

        let d2Won = true;
        if (gameArr[4 * i] != sign && d2Won) {
          d2Won = false;
        }

        if (i == 2 && (d1Won || d2Won)) {
          return true;
        }
      }
      return false;
    } else {
      return;
    }
  }

  function isValidMoveMark(index) {
    if (gameArr[index] == undefined) {
      return true;
    } else {
      return false;
    }
  }

  function markBoard(Player, index) {
    gameArr[index] = Player.getSign();
    lastIndex = index;
    LastPlayer = Player;
  }

  function getLastMarkIndex() {
    return lastIndex;
  }

  function getLastPlayer() {
    return LastPlayer;
  }

  return {
    checkWon,
    isValidMoveMark,
    markBoard,
    getLastMarkIndex,
    getLastPlayer,
  };
})();
