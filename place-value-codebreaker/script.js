document.addEventListener("DOMContentLoaded", function () {
  const placeValueLabels = {
    3: ["Hundreds", "Tens", "Ones"],
    4: ["Thousands", "Hundreds", "Tens", "Ones"],
    5: ["Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"],
    6: ["Hundred Thousands", "Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"],
    7: ["Millions", "Hundred Thousands", "Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"]
  };

  const levelNames = {
    3: "Hundreds",
    4: "Thousands",
    5: "Ten Thousands",
    6: "Hundred Thousands",
    7: "Millions"
  };

  const maxGuessesByDigits = {
    3: 7,
    4: 8,
    5: 9,
    6: 10,
    7: 11
  };

  const levelButtons = document.querySelectorAll(".level-button");
  const placeValueLabelsBox = document.getElementById("placeValueLabels");
  const digitInputsBox = document.getElementById("digitInputs");
  const historyHeader = document.getElementById("historyHeader");
  const checkButton = document.getElementById("checkButton");
  const newGameButton = document.getElementById("newGameButton");
  const message = document.getElementById("message");
  const historyList = document.getElementById("historyList");
  const guessCountDisplay = document.getElementById("guessCount");
  const maxGuessCountDisplay = document.getElementById("maxGuessCount");
  const digitCountDisplay = document.getElementById("digitCount");
  const levelNameDisplay = document.getElementById("levelName");

  let selectedDigitCount = 4;
  let maxGuesses = 8;
  let inputs = [];
  let secretDigits = [];
  let guessCount = 0;
  let gameOver = false;

  function setGridColumns() {
    document.documentElement.style.setProperty("--digit-count", selectedDigitCount);
  }

  function createInputGrid() {
    placeValueLabelsBox.innerHTML = "";
    digitInputsBox.innerHTML = "";
    historyHeader.innerHTML = "";

    placeValueLabels[selectedDigitCount].forEach(function (label) {
      const labelSpan = document.createElement("span");
      labelSpan.textContent = label;
      placeValueLabelsBox.appendChild(labelSpan);

      const historyLabel = document.createElement("span");
      historyLabel.textContent = label;
      historyHeader.appendChild(historyLabel);
    });

    for (let i = 0; i < selectedDigitCount; i++) {
      const input = document.createElement("input");
      input.className = "digit-input";
      input.type = "text";
      input.maxLength = 1;
      input.inputMode = "numeric";
      input.setAttribute("aria-label", placeValueLabels[selectedDigitCount][i] + " digit");

      input.addEventListener("input", function () {
        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value.length === 1 && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && input.value === "" && i > 0) {
          inputs[i - 1].focus();
        }

        if (event.key === "Enter") {
          checkGuess();
        }
      });

      digitInputsBox.appendChild(input);
    }

    inputs = Array.from(document.querySelectorAll(".digit-input"));
  }

  function createSecretNumber() {
    const digits = [];

    while (digits.length < selectedDigitCount) {
      const digit = Math.floor(Math.random() * 10);

      if (digits.length === 0 && digit === 0) {
        continue;
      }

      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }

    return digits;
  }

  function startNewGame() {
    maxGuesses = maxGuessesByDigits[selectedDigitCount];
    setGridColumns();
    createInputGrid();

    secretDigits = createSecretNumber();
    guessCount = 0;
    gameOver = false;

    historyList.innerHTML = "";
    guessCountDisplay.textContent = guessCount;
    maxGuessCountDisplay.textContent = maxGuesses;
    digitCountDisplay.textContent = selectedDigitCount;
    levelNameDisplay.textContent = levelNames[selectedDigitCount];

    inputs.forEach(function (input) {
      input.value = "";
      input.disabled = false;
      input.className = "digit-input";
    });

    checkButton.disabled = false;

    setMessage("New " + selectedDigitCount + "-digit number ready. Make your first guess!", "");
    inputs[0].focus();

    // This helps you test while building. Uncomment the next line if needed.
    // console.log("Secret number:", secretDigits.join(""));
  }

  function setMessage(text, className) {
    message.textContent = text;
    message.className = className;
  }

  function getGuessDigits() {
    return inputs.map(function (input) {
      return input.value.trim();
    });
  }

  function isValidGuess(guessDigits) {
    if (guessDigits.some(function (digit) { return digit === ""; })) {
      setMessage("Enter one digit in each place value column.", "message-warning");
      return false;
    }

    if (!guessDigits.every(function (digit) { return /^[0-9]$/.test(digit); })) {
      setMessage("Only use digits from 0 to 9.", "message-warning");
      return false;
    }

    if (guessDigits[0] === "0") {
      setMessage("The first digit cannot be 0.", "message-warning");
      return false;
    }

    const uniqueDigits = new Set(guessDigits);

    if (uniqueDigits.size !== selectedDigitCount) {
      setMessage("Use " + selectedDigitCount + " different digits for this game.", "message-warning");
      return false;
    }

    return true;
  }

  function getClueForDigit(digit, index) {
    const numberDigit = Number(digit);

    if (secretDigits[index] === numberDigit) {
      return "correct-place";
    }

    if (secretDigits.includes(numberDigit)) {
      return "wrong-place";
    }

    return "not-in-number";
  }

  function addGuessToHistory(guessDigits, clues) {
    const row = document.createElement("div");
    row.className = "history-row";

    guessDigits.forEach(function (digit, index) {
      const digitBox = document.createElement("div");
      digitBox.className = "history-digit " + clues[index];
      digitBox.textContent = digit;
      row.appendChild(digitBox);
    });

    historyList.prepend(row);
  }

  function clearInputs() {
    inputs.forEach(function (input) {
      input.value = "";
    });

    inputs[0].focus();
  }

  function checkGuess() {
    if (gameOver) {
      return;
    }

    const guessDigits = getGuessDigits();

    if (!isValidGuess(guessDigits)) {
      return;
    }

    const clues = guessDigits.map(function (digit, index) {
      return getClueForDigit(digit, index);
    });

    guessCount++;
    guessCountDisplay.textContent = guessCount;

    addGuessToHistory(guessDigits, clues);

    const isCorrect = clues.every(function (clue) {
      return clue === "correct-place";
    });

    if (isCorrect) {
      gameOver = true;
      checkButton.disabled = true;
      inputs.forEach(function (input) {
        input.disabled = true;
      });

      setMessage("Code cracked! You found the number in " + guessCount + " guesses.", "message-correct");
      return;
    }

    if (guessCount >= maxGuesses) {
      gameOver = true;
      checkButton.disabled = true;
      inputs.forEach(function (input) {
        input.disabled = true;
      });

      setMessage("Out of guesses! The number was " + secretDigits.join("") + ".", "message-warning");
      return;
    }

    setMessage("Use the colours to improve your next guess.", "");
    clearInputs();
  }

  levelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedDigitCount = Number(button.dataset.digits);

      levelButtons.forEach(function (otherButton) {
        otherButton.classList.remove("active");
      });

      button.classList.add("active");
      startNewGame();
    });
  });

  checkButton.addEventListener("click", checkGuess);
  newGameButton.addEventListener("click", startNewGame);

  startNewGame();
});
