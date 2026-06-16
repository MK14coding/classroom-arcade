```javascript
document.addEventListener("DOMContentLoaded", function () {
  const totalQuestions = 10;

  const gameDescriptions = {
    capitals: "Rewrite the sentence with capital letters and a full stop.",
    speech: "Rewrite the sentence with speech marks and correct punctuation.",
    endmark: "Choose whether the sentence needs a full stop, question mark or exclamation mark.",
    mixed: "A mix of capitals, full stops, speech marks and end marks."
  };

  const questionBanks = {
    capitals: [
      { prompt: "the dog ran home", answer: "The dog ran home." },
      { prompt: "my friend likes soccer", answer: "My friend likes soccer." },
      { prompt: "we went to the park", answer: "We went to the park." },
      { prompt: "sam ate his lunch", answer: "Sam ate his lunch." },
      { prompt: "the class worked quietly", answer: "The class worked quietly." },
      { prompt: "on monday we visited the library", answer: "On Monday we visited the library." },
      { prompt: "the bird flew over the fence", answer: "The bird flew over the fence." },
      { prompt: "mia found a shiny shell", answer: "Mia found a shiny shell." },
      { prompt: "ben packed his school bag", answer: "Ben packed his school bag." },
      { prompt: "the red bus stopped outside", answer: "The red bus stopped outside." }
    ],

    speech: [
      { prompt: "Tom said I am ready for school.", answer: 'Tom said, "I am ready for school."' },
      { prompt: "Mia asked Can I play too?", answer: 'Mia asked, "Can I play too?"' },
      { prompt: "Dad said Please pack your bag.", answer: 'Dad said, "Please pack your bag."' },
      { prompt: "The teacher said Line up quietly.", answer: 'The teacher said, "Line up quietly."' },
      { prompt: "Ava shouted Watch out!", answer: 'Ava shouted, "Watch out!"' },
      { prompt: "Noah asked Where is my hat?", answer: 'Noah asked, "Where is my hat?"' },
      { prompt: "Lily said I found the answer.", answer: 'Lily said, "I found the answer."' },
      { prompt: "Jack asked Are we nearly there?", answer: 'Jack asked, "Are we nearly there?"' },
      { prompt: "Mum said Dinner is ready.", answer: 'Mum said, "Dinner is ready."' },
      { prompt: "The coach shouted Great goal!", answer: 'The coach shouted, "Great goal!"' }
    ],

    endmark: [
      { prompt: "Where is my pencil", answer: "?" },
      { prompt: "The dog is sleeping", answer: "." },
      { prompt: "Watch out", answer: "!" },
      { prompt: "Can you help me", answer: "?" },
      { prompt: "I finished my work", answer: "." },
      { prompt: "What time is lunch", answer: "?" },
      { prompt: "That was amazing", answer: "!" },
      { prompt: "The book is on the desk", answer: "." },
      { prompt: "Please close the door", answer: "." },
      { prompt: "How did you solve it", answer: "?" }
    ]
  };

  const gameType = document.getElementById("gameType");
  const gameTypeInfo = document.getElementById("gameTypeInfo");
  const newGameButton = document.getElementById("newGameButton");
  const scoreDisplay = document.getElementById("score");
  const questionNumberDisplay = document.getElementById("questionNumber");
  const totalQuestionsDisplay = document.getElementById("totalQuestions");
  const streakDisplay = document.getElementById("streak");
  const taskLabel = document.getElementById("taskLabel");
  const sentenceBox = document.getElementById("sentenceBox");
  const typingArea = document.getElementById("typingArea");
  const choiceArea = document.getElementById("choiceArea");
  const answerInput = document.getElementById("answerInput");
  const checkButton = document.getElementById("checkButton");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const answerPanel = document.getElementById("answerPanel");
  const correctAnswerText = document.getElementById("correctAnswerText");
  const nextButton = document.getElementById("nextButton");
  const choiceButtons = document.querySelectorAll(".choice-button");

  let score = 0;
  let streak = 0;
  let questionNumber = 1;
  let currentQuestion = null;
  let currentMode = "capitals";
  let answered = false;
  let usedQuestions = [];

  totalQuestionsDisplay.textContent = totalQuestions;

  function normaliseText(text) {
    return text
      .trim()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.!?])/g, "$1");
  }

  function chooseMode() {
    if (gameType.value !== "mixed") {
      return gameType.value;
    }

    const modes = ["capitals", "speech", "endmark"];
    return modes[Math.floor(Math.random() * modes.length)];
  }

  function chooseQuestion(mode) {
    const bank = questionBanks[mode];

    let available = bank.filter(function (_, index) {
      return !usedQuestions.includes(mode + "-" + index);
    });

    if (available.length === 0) {
      usedQuestions = usedQuestions.filter(function (item) {
        return !item.startsWith(mode + "-");
      });

      available = bank;
    }

    const question = available[Math.floor(Math.random() * available.length)];
    const originalIndex = bank.indexOf(question);

    usedQuestions.push(mode + "-" + originalIndex);

    return question;
  }

  function loadQuestion() {
    answered = false;
    currentMode = chooseMode();
    currentQuestion = chooseQuestion(currentMode);

    gameTypeInfo.textContent = gameDescriptions[gameType.value];
    questionNumberDisplay.textContent = questionNumber;
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;

    sentenceBox.textContent = currentQuestion.prompt;
    answerInput.value = "";
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";
    answerPanel.style.display = "none";
    correctAnswerText.textContent = "";
    nextButton.style.display = "none";

    if (currentMode === "endmark") {
      taskLabel.textContent = "Guess the end mark";
      typingArea.style.display = "none";
      choiceArea.style.display = "block";
    } else if (currentMode === "speech") {
      taskLabel.textContent = "Add speech marks";
      typingArea.style.display = "grid";
      choiceArea.style.display = "none";
      setTimeout(function () {
        answerInput.focus();
      }, 100);
    } else {
      taskLabel.textContent = "Add capitals and full stops";
      typingArea.style.display = "grid";
      choiceArea.style.display = "none";
      setTimeout(function () {
        answerInput.focus();
      }, 100);
    }
  }

  function markCorrect() {
    score++;
    streak++;
    feedbackMessage.textContent = "Correct! Great punctuation.";
    feedbackMessage.className = "correct-feedback";
  }

  function markIncorrect() {
    streak = 0;
    feedbackMessage.textContent = "Not quite. Check the correct answer below.";
    feedbackMessage.className = "incorrect-feedback";
    answerPanel.style.display = "block";

    if (currentMode === "endmark") {
      correctAnswerText.textContent = "The correct end mark is " + currentQuestion.answer;
    } else {
      correctAnswerText.textContent = currentQuestion.answer;
    }
  }

  function finishQuestion(isCorrect) {
    answered = true;

    if (isCorrect) {
      markCorrect();
    } else {
      markIncorrect();
    }

    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
    nextButton.style.display = "inline-block";
  }

  function checkTypedAnswer() {
    if (answered) {
      return;
    }

    const studentAnswer = normaliseText(answerInput.value);
    const correctAnswer = normaliseText(currentQuestion.answer);

    if (studentAnswer === "") {
      feedbackMessage.textContent = "Type your answer first.";
      feedbackMessage.className = "incorrect-feedback";
      return;
    }

    finishQuestion(studentAnswer === correctAnswer);
  }

  function checkChoice(mark) {
    if (answered || currentMode !== "endmark") {
      return;
    }

    finishQuestion(mark === currentQuestion.answer);
  }

  function nextQuestion() {
    if (questionNumber >= totalQuestions) {
      sentenceBox.textContent = "Game complete!";
      taskLabel.textContent = "Final Score";
      typingArea.style.display = "none";
      choiceArea.style.display = "none";
      answerPanel.style.display = "none";
      feedbackMessage.textContent = "You scored " + score + " out of " + totalQuestions + ".";
      feedbackMessage.className = score >= 8 ? "correct-feedback" : "";
      nextButton.style.display = "none";
      return;
    }

    questionNumber++;
    loadQuestion();
  }

  function newGame() {
    score = 0;
    streak = 0;
    questionNumber = 1;
    usedQuestions = [];
    loadQuestion();
  }

  checkButton.addEventListener("click", checkTypedAnswer);

  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      checkTypedAnswer();
    }
  });

  choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      checkChoice(button.dataset.mark);
    });
  });

  nextButton.addEventListener("click", nextQuestion);
  newGameButton.addEventListener("click", newGame);

  gameType.addEventListener("change", function () {
    newGame();
  });

  newGame();
});
```
