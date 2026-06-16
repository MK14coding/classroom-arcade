document.addEventListener("DOMContentLoaded", function () {
  const wordBanks = {
    "sh": { label: "sh digraph", words: ["ship", "shop", "shut", "fish", "dish", "wish", "shell", "shark", "brush", "flash", "splash"] },
    "ch": { label: "ch digraph", words: ["chip", "chat", "chop", "chin", "much", "rich", "bench", "lunch", "chair", "beach", "catch"] },
    "th": { label: "th digraph", words: ["thin", "thick", "thank", "think", "thing", "three", "teeth", "mouth", "cloth", "thorn"] },
    "ck": { label: "ck digraph", words: ["back", "duck", "sock", "lock", "pick", "rock", "sick", "truck", "black", "clock"] },
    "ai": { label: "ai vowel digraph", words: ["rain", "tail", "mail", "paint", "train", "brain", "snail", "chain", "plain"] },
    "ay": { label: "ay vowel digraph", words: ["day", "play", "stay", "tray", "clay", "spray", "today", "away", "delay"] },
    "ee": { label: "ee vowel digraph", words: ["see", "tree", "green", "sleep", "three", "sheep", "teeth", "queen", "street"] },
    "ea": { label: "ea vowel digraph", words: ["sea", "tea", "team", "leaf", "beach", "clean", "dream", "speak", "treat"] },
    "oa": { label: "oa vowel digraph", words: ["boat", "coat", "road", "soap", "goat", "toast", "float", "coach", "throat"] },
    "ow": { label: "ow spelling pattern", words: ["snow", "show", "grow", "slow", "blow", "throw", "brown", "crown", "cloud"] },
    "oi": { label: "oi vowel digraph", words: ["coin", "soil", "boil", "join", "point", "spoil", "noise", "voice"] },
    "oy": { label: "oy vowel digraph", words: ["boy", "toy", "joy", "royal", "enjoy", "annoy", "destroy"] },
    "ar": { label: "ar phoneme", words: ["car", "star", "farm", "park", "hard", "shark", "smart", "spark", "garden"] },
    "or": { label: "or phoneme", words: ["fork", "corn", "storm", "short", "sport", "horse", "torch", "thorn"] },
    "er": { label: "er phoneme", words: ["her", "term", "fern", "verb", "person", "teacher", "number", "winter"] },
    "ir": { label: "ir phoneme", words: ["bird", "girl", "first", "shirt", "third", "stir", "circle", "thirst"] },
    "ur": { label: "ur phoneme", words: ["turn", "burn", "curl", "hurt", "surf", "church", "purple", "burger"] },
    "oo": { label: "oo vowel digraph", words: ["moon", "food", "boot", "soon", "spoon", "school", "room", "look", "book"] },
    "igh": { label: "igh trigraph", words: ["high", "light", "night", "right", "sight", "fight", "bright", "flight"] },
    "dge": { label: "dge trigraph", words: ["edge", "badge", "bridge", "fudge", "judge", "dodge", "smudge", "fridge"] },
    "tch": { label: "tch trigraph", words: ["itch", "catch", "match", "watch", "patch", "witch", "stretch", "scratch"] },
    "air": { label: "air trigraph", words: ["air", "hair", "fair", "pair", "chair", "stair", "repair", "airport"] },
    "ear": { label: "ear trigraph", words: ["ear", "hear", "near", "clear", "spear", "year", "fear", "beard"] },
    "are": { label: "are spelling pattern", words: ["care", "bare", "dare", "share", "scare", "square", "prepare"] }
  };

  const maxGuesses = 6;

  const phonemeSelect = document.getElementById("phonemeSelect");
  const newWordButton = document.getElementById("newWordButton");
  const focusInfo = document.getElementById("focusInfo");
  const guessGrid = document.getElementById("guessGrid");
  const guessInput = document.getElementById("guessInput");
  const guessButton = document.getElementById("guessButton");
  const message = document.getElementById("message");
  const guessCountDisplay = document.getElementById("guessCount");
  const maxGuessesDisplay = document.getElementById("maxGuesses");
  const focusDisplay = document.getElementById("focusDisplay");
  const wordLengthText = document.getElementById("wordLengthText");

  let selectedFocus = "sh";
  let secretWord = "";
  let currentGuess = 0;
  let gameOver = false;

  function setupPhonemeOptions() {
    Object.keys(wordBanks).forEach(function (focus) {
      const option = document.createElement("option");
      option.value = focus;
      option.textContent = wordBanks[focus].label + " - " + focus;
      phonemeSelect.appendChild(option);
    });

    phonemeSelect.value = selectedFocus;
  }

  function chooseWord() {
    const words = wordBanks[selectedFocus].words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase();
  }

  function startNewWord() {
    selectedFocus = phonemeSelect.value;
    secretWord = chooseWord();
    currentGuess = 0;
    gameOver = false;

    document.documentElement.style.setProperty("--word-length", secretWord.length);

    guessGrid.innerHTML = "";
    guessInput.value = "";
    guessInput.maxLength = secretWord.length;
    guessInput.disabled = false;
    guessButton.disabled = false;

    guessCountDisplay.textContent = currentGuess;
    maxGuessesDisplay.textContent = maxGuesses;
    focusDisplay.textContent = selectedFocus;
    wordLengthText.textContent = "Word length: " + secretWord.length + " letters";

    focusInfo.textContent = "Find a word that uses " + wordBanks[selectedFocus].label + ".";
    setMessage("New word ready. Type a " + secretWord.length + "-letter word.", "");

    for (let row = 0; row < maxGuesses; row++) {
      const guessRow = document.createElement("div");
      guessRow.className = "guess-row";

      for (let col = 0; col < secretWord.length; col++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        guessRow.appendChild(tile);
      }

      guessGrid.appendChild(guessRow);
    }

    guessInput.focus();
  }

  function setMessage(text, className) {
    message.textContent = text;
    message.className = className;
  }

  function getClues(guess) {
    const clues = Array(secretWord.length).fill("absent");
    const remainingLetters = secretWord.split("");

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secretWord[i]) {
        clues[i] = "correct";
        remainingLetters[i] = null;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (clues[i] === "correct") {
        continue;
      }

      const foundIndex = remainingLetters.indexOf(guess[i]);

      if (foundIndex !== -1) {
        clues[i] = "present";
        remainingLetters[foundIndex] = null;
      }
    }

    return clues;
  }

  function fillGuessRow(guess, clues) {
    const row = guessGrid.children[currentGuess];
    const tiles = row.children;

    for (let i = 0; i < guess.length; i++) {
      tiles[i].textContent = guess[i];
      tiles[i].classList.add(clues[i]);
    }
  }

  function checkGuess() {
    if (gameOver) {
      return;
    }

    const guess = guessInput.value.toLowerCase().trim();

    if (guess.length !== secretWord.length) {
      setMessage("Your guess must be " + secretWord.length + " letters long.", "message-warning");
      return;
    }

    if (!/^[a-z]+$/.test(guess)) {
      setMessage("Use letters only.", "message-warning");
      return;
    }

    if (!guess.includes(selectedFocus)) {
      setMessage("Your guess needs to include " + selectedFocus + ".", "message-warning");
      return;
    }

    const clues = getClues(guess);

    fillGuessRow(guess, clues);

    currentGuess++;
    guessCountDisplay.textContent = currentGuess;

    if (guess === secretWord) {
      gameOver = true;
      guessInput.disabled = true;
      guessButton.disabled = true;
      setMessage("Correct! You cracked the " + selectedFocus + " word.", "message-correct");
      return;
    }

    if (currentGuess >= maxGuesses) {
      gameOver = true;
      guessInput.disabled = true;
      guessButton.disabled = true;
      setMessage("Out of guesses! The word was " + secretWord + ".", "message-warning");
      return;
    }

    guessInput.value = "";
    setMessage("Good guess. Use the colours to try again.", "");
    guessInput.focus();
  }

  phonemeSelect.addEventListener("change", startNewWord);
  newWordButton.addEventListener("click", startNewWord);
  guessButton.addEventListener("click", checkGuess);

  guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

  setupPhonemeOptions();
  startNewWord();
});
