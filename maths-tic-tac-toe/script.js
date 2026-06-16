document.addEventListener("DOMContentLoaded", function () {
  const gameDescriptions = {
    add10: "Addition questions with answers up to 10.",
    add20: "Addition questions with answers up to 20.",
    add50: "Addition questions with answers up to 50.",
    sub10: "Subtraction questions starting from numbers up to 10.",
    sub20: "Subtraction questions starting from numbers up to 20.",
    sub50: "Subtraction questions starting from numbers up to 50.",
    mult5: "Multiplication questions using tables up to 5 × 5.",
    mult12: "Multiplication questions using tables up to 12 × 12.",
    div100: "Division questions with whole-number answers, using numbers up to 100."
  };

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const squares = document.querySelectorAll(".square");
  const gameType = document.getElementById("gameType");
  const gameTypeInfo = document.getElementById("gameTypeInfo");
  const newRoundButton = document.getElementById("newRoundButton");
  const resetScoresButton = document.getElementById("resetScoresButton");
  const scoreXDisplay = document.getElementById("scoreX");
  const scoreODisplay = document.getElementById("scoreO");
  const currentPlayerDisplay = document.getElementById("currentPlayer");
  const playerXCard = document.getElementById("playerXCard");
  const playerOCard = document.getElementById("playerOCard");
  const questionCard = document.getElementById("questionCard");
  const questionTitle = document.getElementById("questionTitle");
  const equationText = document.getElementById("equationText");
  const answerInput = document.getElementById("answerInput");
  const submitAnswerButton = document.getElementById("submitAnswerButton");
  const cancelQuestionButton = document.getElementById("cancelQuestionButton");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const gameMessage = document.getElementById("gameMessage");

  let board = Array(9).fill("");
  let currentPlayer = "X";
  let scoreX = 0;
  let scoreO = 0;
  let selectedSquareIndex = null;
  let currentAnswer = null;
  let roundOver = false;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateQuestion() {
    const type = gameType.value;

    if (type === "add10" || type === "add20" || type === "add50") {
      const maxTotal = type === "add10" ? 10 : type === "add20" ? 20 : 50;
      const first = randomInt(0, maxTotal);
      const second = randomInt(0, maxTotal - first);

      return {
        text: first + " + " + second + " = ?",
        answer: first + second
      };
    }

    if (type === "sub10" || type === "sub20" || type === "sub50") {
      const maxStart = type === "sub10" ? 10 : type === "sub20" ? 20 : 50;
      const first = randomInt(0, maxStart);
      const second = randomInt(0, first);

      return {
        text: first + " − " + second + " = ?",
        answer: first - second
      };
    }

    if (type === "mult5" || type === "mult12") {
      const maxFactor = type === "mult5" ? 5 : 12;
      const first = randomInt(1, maxFactor);
      const second = randomInt(1, maxFactor);

      return {
        text: first + " × " + second + " = ?",
        answer: first * second
      };
    }

    const divisor = randomInt(1, 10);
    const quotient = randomInt(1, Math.floor(100 / divisor));
    const dividend = divisor * quotient;

    return {
      text: dividend + " ÷ " + divisor + " = ?",
      answer: quotient
    };
  }

  function updateDisplay() {
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    currentPlayerDisplay.textContent = currentPlayer;
    gameTypeInfo.textContent = gameDescriptions[gameType.value];

    playerXCard.classList.toggle("active-player", currentPlayer === "X");
    playerOCard.classList.toggle("active-player", currentPlayer === "O");

    squares.forEach(function (square, index) {
      square.textContent = board[index];
      square.classList.toggle("x-square", board[index] === "X");
      square.classList.toggle("o-square", board[index] === "O");
      square.disabled = board[index] !== "" || roundOver || questionCard.classList.contains("visible");
    });
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateDisplay();
  }

  function openQuestion(index) {
    if (roundOver || board[index] !== "") {
      return;
    }

    selectedSquareIndex = index;
    const question = generateQuestion();
    currentAnswer = question.answer;

    questionTitle.textContent = "Player " + currentPlayer + ", solve to claim this square";
    equationText.textContent = question.text;
    answerInput.value = "";
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";

    questionCard.classList.add("visible");
    gameMessage.textContent = "Solve the equation correctly to place your " + currentPlayer + ".";
    updateDisplay();

    setTimeout(function () {
      answerInput.focus();
    }, 100);
  }

  function closeQuestion() {
    selectedSquareIndex = null;
    currentAnswer = null;
    questionCard.classList.remove("visible");
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";
    gameMessage.textContent = "Player " + currentPlayer + ", choose a square.";
    updateDisplay();
  }

  function checkWin() {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        pattern.forEach(function (index) {
          squares[index].classList.add("winning-square");
        });

        return board[a];
      }
    }

    if (board.every(function (cell) { return cell !== ""; })) {
      return "draw";
    }

    return null;
  }

  function submitAnswer() {
    const studentAnswer = Number(answerInput.value);

    if (answerInput.value.trim() === "") {
      feedbackMessage.textContent = "Type an answer first.";
      feedbackMessage.className = "incorrect-feedback";
      return;
    }

    if (studentAnswer === currentAnswer) {
      board[selectedSquareIndex] = currentPlayer;
      questionCard.classList.remove("visible");

      feedbackMessage.textContent = "";
      feedbackMessage.className = "";

      const result = checkWin();

      if (result === "X" || result === "O") {
        roundOver = true;

        if (result === "X") {
          scoreX++;
        } else {
          scoreO++;
        }

        gameMessage.textContent = "Player " + result + " wins the round!";
        updateDisplay();
        return;
      }

      if (result === "draw") {
        roundOver = true;
        gameMessage.textContent = "It's a draw! Start a new round.";
        updateDisplay();
        return;
      }

      gameMessage.textContent = "Correct! Player " + currentPlayer + " claimed the square.";
      switchPlayer();
      return;
    }

    questionCard.classList.remove("visible");
    gameMessage.textContent = "Not quite. The square stays empty and the turn passes to the other player.";
    switchPlayer();
  }

  function newRound() {
    board = Array(9).fill("");
    selectedSquareIndex = null;
    currentAnswer = null;
    roundOver = false;
    questionCard.classList.remove("visible");
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";
    gameMessage.textContent = "Player " + currentPlayer + " starts. Choose a square and solve the equation.";
    squares.forEach(function (square) {
      square.classList.remove("winning-square");
    });
    updateDisplay();
  }

  function resetScores() {
    scoreX = 0;
    scoreO = 0;
    currentPlayer = "X";
    newRound();
  }

  squares.forEach(function (square) {
    square.addEventListener("click", function () {
      const index = Number(square.dataset.index);
      openQuestion(index);
    });
  });

  submitAnswerButton.addEventListener("click", submitAnswer);

  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitAnswer();
    }
  });

  cancelQuestionButton.addEventListener("click", closeQuestion);

  newRoundButton.addEventListener("click", newRound);
  resetScoresButton.addEventListener("click", resetScores);

  gameType.addEventListener("change", function () {
    newRound();
  });

  updateDisplay();
});
