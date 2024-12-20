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

  function hasWon(Player) {
    if (Player.movesMade() >= 3) {
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

      let d1Win = true;
      let d2Win = true;
      for (let i = 0; i < 3; i++) {
        if (gameArr[4 * i] != sign && d1Win) {
          d1Win = false;
        }

        if (gameArr[2 * i + 2] != sign && d2Win) {
          d2Win = false;
        }

        if (i == 2 && (d1Win || d2Win)) {
          return true;
        }
      }

      return false;
    } else {
      return false;
    }
  }

  function hasWonBruteForce(Player) {
    const sign = Player.getSign();

    // Row Condition
    if (
      (sign == gameArr[0] && sign == gameArr[1] && sign == gameArr[2]) ||
      (sign == gameArr[3] && sign == gameArr[4] && sign == gameArr[5]) ||
      (sign == gameArr[6] && sign == gameArr[7] && sign == gameArr[8])
    ) {
      return true;
    }
    // Col Condition
    // 0 1 2
    // 3 4 5
    // 6 7 8
    else if (
      (sign == gameArr[0] && sign == gameArr[3] && sign == gameArr[6]) ||
      (sign == gameArr[1] && sign == gameArr[4] && sign == gameArr[7]) ||
      (sign == gameArr[2] && sign == gameArr[5] && sign == gameArr[8])
    ) {
      return true;
    }
    // Diagonal Condition
    else if (
      (sign == gameArr[0] && sign == gameArr[4] && sign == gameArr[8]) ||
      (sign == gameArr[2] && sign == gameArr[4] && sign == gameArr[6])
    ) {
      return true;
    } else {
      return false;
    }
  }

  function boardFilled() {
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

  function getGameArray() {
    return gameArr;
  }

  return {
    getGameArray,
    // hasWon: hasWonBruteForce,
    hasWon,
    isValidMoveMark,
    markBoard,
    getLastMarkIndex,
    getLastPlayer,
    initialiseGameBoard,
    boardFilled,
  };
})();

const DisplayController = (function () {
  let inputModal = document.querySelector("#playerDetailsMenu");
  let startGameBtn = document.querySelector("#startNew");

  startGameBtn.addEventListener("click", (event) => {
    inputModal.showModal();
  });

  window.addEventListener("load", () => {
    inputModal.showModal();
  });

  function renderGameBoard(gameArray) {
    let signBox = [...document.querySelectorAll(".signBox")];
    for (let i = 0; i < gameArray.length; i++) {
      signBox[i].textContent = !gameArray[i] ? "" : gameArray[i];
    }
  }

  function renderStatusBlock(player1, player2, winner, gameEnded) {
    let p1Stats = [...document.querySelectorAll("#player1-status > p")];
    let p2Stats = [...document.querySelectorAll("#player2-status > p")];

    p1Stats[1].textContent = player1.getName();
    p2Stats[1].textContent = player2.getName();

    p1Stats[2].textContent = player1.getSign();
    p2Stats[2].textContent = player2.getSign();

    if (player1.isMyMove() && !gameEnded) {
      p1Stats[0].parentElement.style.backgroundColor = "green";
      p2Stats[0].parentElement.style.backgroundColor = "white";
    } else if (player2.isMyMove() && !gameEnded) {
      p1Stats[0].parentElement.style.backgroundColor = "white";
      p2Stats[0].parentElement.style.backgroundColor = "green";
    } else {
      p1Stats[0].parentElement.style.backgroundColor = "white";
      p2Stats[0].parentElement.style.backgroundColor = "white";
    }

    let gameStats = [...document.querySelectorAll("#game-status > p")];
    if (!gameEnded) {
      gameStats[1].textContent = "Game In Progress";
      gameStats[0].parentElement.style.backgroundColor = "white";
    } else {
      gameStats[1].textContent = `${winner.getName()} Wins!`;
      gameStats[0].parentElement.style.backgroundColor = "yellow";
    }
  }

  return { renderGameBoard, renderStatusBlock };
})();

const GameController = (function () {
  function getPlayers() {
    let player = {
      p1: { name: "", sign: "" },
      p2: { name: "", sign: "" },
    };

    player.p1.name = document.querySelector("#player1-name").value;
    player.p1.name =
      player.p1.name == ""
        ? document.querySelector("#player1-name").placeholder
        : player.p1.name;

    player.p2.name = document.querySelector("#player2-name").value;
    player.p2.name =
      player.p2.name == ""
        ? document.querySelector("#player2-name").placeholder
        : player.p2.name;

    player.p1.sign = Math.random();
    player.p1.sign = player.p1.sign < 0.5 ? "X" : "O";
    player.p2.sign = player.p1.sign == "X" ? "O" : "X";

    return player;
  }

  let players, p1, p2;

  function makeTurnSuccessful(Player, index) {
    if (GameBoard.isValidMoveMark(index)) {
      GameBoard.markBoard(Player, index);
      Player.incrementMoves();
      return true;
    } else {
      alert("Invalid Move");
      return false;
    }
  }

  function switchTurn() {
    if (p1.isMyMove()) {
      p1.setIsMyMove(false);
      p2.setIsMyMove(true);
    } else {
      p1.setIsMyMove(true);
      p2.setIsMyMove(false);
    }
  }

  function gameEnded() {
    if (
      GameBoard.boardFilled() ||
      GameBoard.hasWon(p1) ||
      GameBoard.hasWon(p2)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function gameResult() {
    if (GameBoard.hasWon(p1)) {
      return p1;
    } else if (GameBoard.hasWon(p2)) {
      return p2;
    } else {
      return createPlayer("No-One", "");
    }
  }

  function currentPlayer() {
    return p1.isMyMove() ? p1 : p2;
  }

  let submitNamesBtn = document.querySelector("#subtNames");
  submitNamesBtn.addEventListener("click", (event) => {
    players = getPlayers();
    p1 = createPlayer(players.p1.name, players.p1.sign);
    p2 = createPlayer(players.p2.name, players.p2.sign);
    GameBoard.initialiseGameBoard();
    DisplayController.renderGameBoard(GameBoard.getGameArray());
    DisplayController.renderStatusBlock(p1, p2, gameResult(), gameEnded());
  });

  let signBoxes = [...document.querySelectorAll(".signBox")];
  signBoxes.forEach((signBox) => {
    let blockIndex = signBox.getAttribute("data-block-index");
    signBox.addEventListener("click", (event) => {
      if (!gameEnded() && makeTurnSuccessful(currentPlayer(), blockIndex)) {
        switchTurn();
        DisplayController.renderGameBoard(GameBoard.getGameArray());
        DisplayController.renderStatusBlock(p1, p2, gameResult(), gameEnded());
      } else {
        DisplayController.renderGameBoard(GameBoard.getGameArray());
        DisplayController.renderStatusBlock(p1, p2, gameResult(), gameEnded());
      }
    });
  });
})();
