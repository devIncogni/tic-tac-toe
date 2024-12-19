function game() {
  // let opponents = [];

  let player1, player2;

  let winner = undefined;
  let gameInProgress = false;

  function isGameOngoing() {
    return gameInProgress;
  }

  function start() {
    gameInProgress = true;
    // Disable game start btn
    GameBoard.initialiseGameBoard();
    // Ask for names of players and their Signs
  }

  function cont(player, markIndex) {
    if (!GameBoard.checkBoardFilled()) {
      if (GameBoard.isValidMoveMark(markIndex)) {
        GameBoard.markBoard(player, markIndex);
        player.incrementMoves();

        endTurn(player);
      } else {
        alert("Invalid Spot");
      }
    } else {
      endTurn(player);
    }
  }

  function endTurn(player) {
    
    if (player1.isMyMove()) {
      player1.setIsMyMove(false);
      player2.setIsMyMove(true);
    } else {
      player1.setIsMyMove(false);
      player2.setIsMyMove(true);
    }
  }

  function whoWon() {
    return winner;
  }
  function setWinner(winner) {
    winner = winner;
  }

  // Event Listeners

  let subtNameBtn = document.querySelector("#subtNames");
  subtNameBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // #region NAME AND SIGN SELECTION
    let p1Name = document.querySelector("#player1-name").value;
    p1Name =
      p1Name == ""
        ? document.querySelector("#player1-name").placeholder
        : p1Name;

    let p2Name = document.querySelector("#player2-name").value;
    p2Name =
      p2Name == ""
        ? document.querySelector("#player2-name").placeholder
        : p2Name;

    let p1Sign = Math.random();
    p1Sign = p1Sign < 0.5 ? "X" : "O";
    let p2Sign = p1Sign == "X" ? "O" : "X";
    // #endregion NAME AND SIGN SELECTION

    player1 = createPlayer(p1Name, p1Sign);
    player2 = createPlayer(p2Name, p2Sign);

    start();
    inputModal.close();
  });

  let signBox = [...document.querySelectorAll(".signBox")];
  signBox.forEach((box) => {
    box.addEventListener("click", (event) => {
      console.log(box.getAttribute("data-block-index"));
      let markPos = box.getAttribute("data-block-index");
      if (player1.isMyMove()) {
        cont(player1, markPos - 1);
      } else {
        cont(player2, markPos - 1);
      }
    });
  });

  return { start, endTurn, cont, whoWon, setWinner, isGameOngoing };
}

function createPlayer(name, sign) {
  let playerMoves = 0;
  let myMove = sign == "X" ? true : false;

  function movesMade() {
    return playerMoves;
  }
  function getName() {
    return name;
  }
  function getSign() {
    return sign;
  }
  function isMyMove() {
    return myMove;
  }
  function setIsMyMove(isMyMove) {
    myMove = isMyMove;
  }
  function incrementMoves() {
    playerMoves++;
  }
  return { getName, getSign, movesMade, isMyMove, setIsMyMove, incrementMoves };
}

const GameBoard = (function () {
  let gameArr = [];
  let lastIndex = undefined;
  let LastPlayer = undefined;

  function initialiseGameBoard() {
    gameArr = new Array(9);
    lastIndex = undefined;
    LastPlayer = undefined;
  }

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

  function checkBoardFilled() {
    for (let i = 0; i < 9; i++) {
      if (gameArr[i] == undefined) {
        return false;
      } else {
        continue;
      }
    }
    return true;
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
    checkBoardFilled,
    checkWon,
    initialiseGameBoard,
  };
})();

const Display = (function () {
  let inputModal = document.querySelector("#playerDetailsMenu");
  let startGameBtn = document.querySelector("#startNew");

  startGameBtn.addEventListener("click", (event) => {
    inputModal.showModal();
  });

  window.addEventListener("load", () => {
    inputModal.showModal();
  });
})();
