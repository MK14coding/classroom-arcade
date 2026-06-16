document.addEventListener("DOMContentLoaded", function () {
  const countryStyles = {
    "Mexico": { colours: ["#006847", "#FFFFFF", "#CE1126"], textColour: "#111111" },
    "South Africa": { colours: ["#007A4D", "#FFB612", "#DE3831"], textColour: "#111111" },
    "South Korea": { colours: ["#FFFFFF", "#C60C30", "#003478"], textColour: "#111111" },
    "Czechia": { colours: ["#FFFFFF", "#11457E", "#D7141A"], textColour: "#111111" },
    "Canada": { colours: ["#FF0000", "#FFFFFF", "#FF0000"], textColour: "#111111" },
    "Bosnia and Herzegovina": { colours: ["#002395", "#FECB00", "#002395"], textColour: "#FFFFFF" },
    "Qatar": { colours: ["#8A1538", "#FFFFFF", "#8A1538"], textColour: "#FFFFFF" },
    "Switzerland": { colours: ["#D52B1E", "#FFFFFF", "#D52B1E"], textColour: "#111111" },
    "Brazil": { colours: ["#009C3B", "#FFDF00", "#009C3B"], textColour: "#111111" },
    "Morocco": { colours: ["#C1272D", "#C1272D", "#006233"], textColour: "#FFFFFF" },
    "Haiti": { colours: ["#00209F", "#D21034", "#FFFFFF"], textColour: "#FFFFFF" },
    "Scotland": { colours: ["#005EB8", "#FFFFFF", "#005EB8"], textColour: "#FFFFFF" },
    "United States": { colours: ["#3C3B6E", "#FFFFFF", "#B22234"], textColour: "#111111" },
    "Paraguay": { colours: ["#D52B1E", "#FFFFFF", "#0038A8"], textColour: "#111111" },
    "Australia": { colours: ["#FFCD00", "#FFCD00", "#00843D"], textColour: "#111111" },
    "Turkey": { colours: ["#E30A17", "#FFFFFF", "#E30A17"], textColour: "#FFFFFF" },
    "Germany": { colours: ["#000000", "#DD0000", "#FFCE00"], textColour: "#FFFFFF" },
    "Curaçao": { colours: ["#002B7F", "#F9E814", "#002B7F"], textColour: "#FFFFFF" },
    "Ivory Coast": { colours: ["#F77F00", "#FFFFFF", "#009E60"], textColour: "#111111" },
    "Ecuador": { colours: ["#FCD116", "#003893", "#CE1126"], textColour: "#111111" },
    "Netherlands": { colours: ["#FF6600", "#FF6600", "#FF6600"], textColour: "#FFFFFF" },
    "Japan": { colours: ["#FFFFFF", "#BC002D", "#FFFFFF"], textColour: "#111111" },
    "Sweden": { colours: ["#006AA7", "#FECC02", "#006AA7"], textColour: "#FFFFFF" },
    "Tunisia": { colours: ["#E70013", "#FFFFFF", "#E70013"], textColour: "#FFFFFF" },
    "Belgium": { colours: ["#000000", "#FAE042", "#ED2939"], textColour: "#FFFFFF" },
    "Egypt": { colours: ["#CE1126", "#FFFFFF", "#000000"], textColour: "#111111" },
    "Iran": { colours: ["#239F40", "#FFFFFF", "#DA0000"], textColour: "#111111" },
    "New Zealand": { colours: ["#000000", "#FFFFFF", "#000000"], textColour: "#FFFFFF" },
    "Spain": { colours: ["#AA151B", "#F1BF00", "#AA151B"], textColour: "#111111" },
    "Cape Verde": { colours: ["#003893", "#FFFFFF", "#CF2027"], textColour: "#FFFFFF" },
    "Saudi Arabia": { colours: ["#006C35", "#FFFFFF", "#006C35"], textColour: "#111111" },
    "Uruguay": { colours: ["#75AADB", "#FFFFFF", "#75AADB"], textColour: "#111111" },
    "France": { colours: ["#002395", "#FFFFFF", "#ED2939"], textColour: "#111111" },
    "Senegal": { colours: ["#00853F", "#FDEF42", "#E31B23"], textColour: "#111111" },
    "Iraq": { colours: ["#CE1126", "#FFFFFF", "#000000"], textColour: "#111111" },
    "Norway": { colours: ["#BA0C2F", "#FFFFFF", "#00205B"], textColour: "#111111" },
    "Argentina": { colours: ["#75AADB", "#FFFFFF", "#75AADB"], textColour: "#111111" },
    "Algeria": { colours: ["#006233", "#FFFFFF", "#D21034"], textColour: "#111111" },
    "Austria": { colours: ["#ED2939", "#FFFFFF", "#ED2939"], textColour: "#111111" },
    "Jordan": { colours: ["#000000", "#FFFFFF", "#007A3D"], textColour: "#111111" },
    "Portugal": { colours: ["#006600", "#FF0000", "#FF0000"], textColour: "#FFFFFF" },
    "DR Congo": { colours: ["#007FFF", "#F7D618", "#CE1021"], textColour: "#111111" },
    "Uzbekistan": { colours: ["#0099B5", "#FFFFFF", "#1EB53A"], textColour: "#111111" },
    "Colombia": { colours: ["#FCD116", "#003893", "#CE1126"], textColour: "#111111" },
    "England": { colours: ["#FFFFFF", "#FFFFFF", "#C8102E"], textColour: "#111111" },
    "Croatia": { colours: ["#FFFFFF", "#FF0000", "#FFFFFF"], textColour: "#111111" },
    "Ghana": { colours: ["#CE1126", "#FCD116", "#006B3F"], textColour: "#111111" },
    "Panama": { colours: ["#FFFFFF", "#005293", "#D21034"], textColour: "#111111" }
  };

  const squads = {
    "Mexico": [["Guillermo Ochoa", 13], ["Edson Álvarez", 4], ["Hirving Lozano", 22], ["Raúl Jiménez", 9], ["Santiago Giménez", 11]],
    "South Africa": [["Ronwen Williams", 1], ["Percy Tau", 10], ["Teboho Mokoena", 4], ["Lyle Foster", 9], ["Themba Zwane", 11]],
    "South Korea": [["Son Heung-min", 7], ["Kim Min-jae", 4], ["Lee Kang-in", 18], ["Hwang Hee-chan", 11], ["Cho Gue-sung", 9]],
    "Czechia": [["Tomáš Souček", 22], ["Patrik Schick", 10], ["Adam Hložek", 9], ["Vladimír Coufal", 5], ["Antonín Barák", 7]],
    "Canada": [["Alphonso Davies", 19], ["Jonathan David", 20], ["Stephen Eustáquio", 7], ["Tajon Buchanan", 11], ["Cyle Larin", 9]],
    "Bosnia and Herzegovina": [["Edin Džeko", 11], ["Miralem Pjanić", 10], ["Sead Kolašinac", 5], ["Amar Dedić", 21], ["Ermedin Demirović", 23]],
    "Qatar": [["Akram Afif", 11], ["Almoez Ali", 19], ["Hassan Al-Haydos", 10], ["Pedro Miguel", 2], ["Boualem Khoukhi", 16]],
    "Switzerland": [["Granit Xhaka", 10], ["Manuel Akanji", 5], ["Yann Sommer", 1], ["Xherdan Shaqiri", 23], ["Breel Embolo", 7]],
    "Brazil": [["Vinícius Júnior", 7], ["Rodrygo", 11], ["Marquinhos", 4], ["Alisson", 1], ["Bruno Guimarães", 5]],
    "Morocco": [["Achraf Hakimi", 2], ["Hakim Ziyech", 7], ["Yassine Bounou", 1], ["Sofyan Amrabat", 4], ["Youssef En-Nesyri", 19]],
    "Haiti": [["Duckens Nazon", 9], ["Frantzdy Pierrot", 20], ["Fafà Picault", 10], ["Johny Placide", 1], ["Danley Jean Jacques", 17]],
    "Scotland": [["Andrew Robertson", 3], ["Scott McTominay", 4], ["John McGinn", 7], ["Kieran Tierney", 6], ["Billy Gilmour", 14]],
    "United States": [["Christian Pulisic", 10], ["Weston McKennie", 8], ["Tyler Adams", 4], ["Gio Reyna", 7], ["Antonee Robinson", 5]],
    "Paraguay": [["Miguel Almirón", 10], ["Julio Enciso", 19], ["Gustavo Gómez", 15], ["Ramón Sosa", 11], ["Mathías Villasanti", 23]],
    "Australia": [["Mathew Ryan", 1], ["Jackson Irvine", 22], ["Craig Goodwin", 23], ["Harry Souttar", 19], ["Nestory Irankunda", 17]],
    "Turkey": [["Hakan Çalhanoğlu", 10], ["Arda Güler", 8], ["Kenan Yıldız", 19], ["Merih Demiral", 3], ["Uğurcan Çakır", 23]],
    "Germany": [["Jamal Musiala", 10], ["Florian Wirtz", 17], ["Joshua Kimmich", 6], ["Antonio Rüdiger", 2], ["Kai Havertz", 7]],
    "Curaçao": [["Leandro Bacuna", 10], ["Juninho Bacuna", 7], ["Eloy Room", 1], ["Cuco Martina", 2], ["Rangelo Janga", 9]],
    "Ivory Coast": [["Sébastien Haller", 22], ["Franck Kessié", 8], ["Simon Adingra", 24], ["Oumar Diakité", 11], ["Willy Boly", 12]],
    "Ecuador": [["Moisés Caicedo", 23], ["Piero Hincapié", 3], ["Enner Valencia", 13], ["Pervis Estupiñán", 7], ["Kendry Páez", 10]],
    "Netherlands": [["Virgil van Dijk", 4], ["Frenkie de Jong", 21], ["Cody Gakpo", 11], ["Xavi Simons", 7], ["Matthijs de Ligt", 3]],
    "Japan": [["Kaoru Mitoma", 7], ["Takefusa Kubo", 20], ["Wataru Endo", 6], ["Daichi Kamada", 15], ["Ritsu Doan", 10]],
    "Sweden": [["Alexander Isak", 9], ["Dejan Kulusevski", 21], ["Viktor Gyökeres", 17], ["Emil Forsberg", 10], ["Victor Lindelöf", 3]],
    "Tunisia": [["Ellyes Skhiri", 17], ["Wahbi Khazri", 10], ["Hannibal Mejbri", 8], ["Aïssa Laïdouni", 14], ["Montassar Talbi", 3]],
    "Belgium": [["Kevin De Bruyne", 7], ["Romelu Lukaku", 10], ["Thibaut Courtois", 1], ["Jérémy Doku", 11], ["Youri Tielemans", 8]],
    "Egypt": [["Mohamed Salah", 10], ["Omar Marmoush", 7], ["Trézéguet", 21], ["Mohamed Elneny", 17], ["Mostafa Mohamed", 11]],
    "Iran": [["Mehdi Taremi", 9], ["Sardar Azmoun", 20], ["Alireza Jahanbakhsh", 7], ["Saman Ghoddos", 14], ["Hossein Kanani", 13]],
    "New Zealand": [["Chris Wood", 9], ["Liberato Cacace", 13], ["Joe Bell", 6], ["Sarpreet Singh", 10], ["Michael Boxall", 5]],
    "Spain": [["Rodri", 16], ["Lamine Yamal", 19], ["Pedri", 8], ["Nico Williams", 17], ["Dani Olmo", 10]],
    "Cape Verde": [["Ryan Mendes", 20], ["Garry Rodrigues", 11], ["Jovane Cabral", 7], ["Bebé", 21], ["Logan Costa", 5]],
    "Saudi Arabia": [["Salem Al-Dawsari", 10], ["Firas Al-Buraikan", 9], ["Mohamed Kanno", 23], ["Hassan Tambakti", 17], ["Mohammed Al-Owais", 21]],
    "Uruguay": [["Federico Valverde", 15], ["Darwin Núñez", 9], ["Ronald Araújo", 4], ["Luis Suárez", 9], ["José María Giménez", 2]],
    "France": [["Kylian Mbappé", 10], ["Antoine Griezmann", 7], ["Aurélien Tchouaméni", 8], ["William Saliba", 17], ["Mike Maignan", 16]],
    "Senegal": [["Sadio Mané", 10], ["Kalidou Koulibaly", 3], ["Édouard Mendy", 16], ["Ismaïla Sarr", 18], ["Nicolas Jackson", 7]],
    "Iraq": [["Aymen Hussein", 18], ["Ali Jasim", 17], ["Zidane Iqbal", 14], ["Mohanad Ali", 10], ["Hussein Ali", 3]],
    "Norway": [["Erling Haaland", 9], ["Martin Ødegaard", 10], ["Alexander Sørloth", 7], ["Oscar Bobb", 22], ["Sander Berge", 8]],
    "Argentina": [["Lionel Messi", 10], ["Julián Álvarez", 9], ["Lautaro Martínez", 22], ["Alexis Mac Allister", 20], ["Emiliano Martínez", 23]],
    "Algeria": [["Riyad Mahrez", 7], ["Ismaël Bennacer", 22], ["Ramy Bensebaini", 21], ["Houssem Aouar", 8], ["Youcef Belaïli", 10]],
    "Austria": [["David Alaba", 8], ["Marcel Sabitzer", 9], ["Marko Arnautović", 7], ["Konrad Laimer", 20], ["Christoph Baumgartner", 19]],
    "Jordan": [["Musa Al-Taamari", 10], ["Yazan Al-Naimat", 11], ["Ali Olwan", 9], ["Noor Al-Rawabdeh", 8], ["Abdallah Nasib", 3]],
    "Portugal": [["Cristiano Ronaldo", 7], ["Bruno Fernandes", 8], ["Bernardo Silva", 10], ["Rúben Dias", 4], ["João Cancelo", 20]],
    "DR Congo": [["Chancel Mbemba", 22], ["Cédric Bakambu", 17], ["Yoane Wissa", 20], ["Arthur Masuaku", 3], ["Silas Katompa Mvumpa", 11]],
    "Uzbekistan": [["Eldor Shomurodov", 14], ["Abbosbek Fayzullaev", 22], ["Abdukodir Khusanov", 2], ["Oston Urunov", 11], ["Odiljon Hamrobekov", 9]],
    "Colombia": [["Luis Díaz", 7], ["James Rodríguez", 10], ["Jhon Durán", 9], ["Daniel Muñoz", 21], ["Davinson Sánchez", 23]],
    "England": [["Harry Kane", 9], ["Jude Bellingham", 10], ["Bukayo Saka", 7], ["Phil Foden", 11], ["Declan Rice", 4]],
    "Croatia": [["Luka Modrić", 10], ["Joško Gvardiol", 4], ["Mateo Kovačić", 8], ["Andrej Kramarić", 9], ["Marcelo Brozović", 11]],
    "Ghana": [["Mohammed Kudus", 20], ["Thomas Partey", 5], ["Iñaki Williams", 19], ["Jordan Ayew", 9], ["Antoine Semenyo", 11]],
    "Panama": [["Adalberto Carrasquilla", 8], ["Michael Murillo", 23], ["José Fajardo", 17], ["Aníbal Godoy", 20], ["Édgar Bárcenas", 10]]
  };

  const players = [];

  for (const country in squads) {
    const style = countryStyles[country];

    squads[country].forEach(function (player) {
      const fullName = player[0];
      const number = player[1];

      players.push({
        name: makeShirtName(fullName),
        fullName: fullName,
        country: country,
        number: number,
        colours: style.colours,
        textColour: style.textColour
      });
    });
  }

  let correctAnswer = 0;
  let score = 0;
  let incorrectAnswers = 0;
  let numberOfPlayers = 2;

  const playersArea = document.getElementById("playersArea");
  const instructions = document.getElementById("instructions");

  const shirtOne = document.getElementById("shirtOne");
  const shirtTwo = document.getElementById("shirtTwo");
  const shirtThree = document.getElementById("shirtThree");
  const shirtFour = document.getElementById("shirtFour");

  const nameOne = document.getElementById("nameOne");
  const nameTwo = document.getElementById("nameTwo");
  const nameThree = document.getElementById("nameThree");
  const nameFour = document.getElementById("nameFour");

  const numberOne = document.getElementById("numberOne");
  const numberTwo = document.getElementById("numberTwo");
  const numberThree = document.getElementById("numberThree");
  const numberFour = document.getElementById("numberFour");

  const countryOne = document.getElementById("countryOne");
  const countryTwo = document.getElementById("countryTwo");
  const countryThree = document.getElementById("countryThree");
  const countryFour = document.getElementById("countryFour");

  const answerInput = document.getElementById("answerInput");
  const checkButton = document.getElementById("checkButton");
  const nextButton = document.getElementById("nextButton");
  const message = document.getElementById("message");
  const scoreDisplay = document.getElementById("score");
  const goalLives = document.querySelectorAll(".goal-life");
  const winnerScreen = document.getElementById("winnerScreen");
  const playAgainButton = document.getElementById("playAgainButton");

  function makeShirtName(fullName) {
    const namePartsToRemove = ["Jr", "Jr.", "II", "III", "IV"];
    let parts = fullName.replace(/\(.*?\)/g, "").trim().split(" ");

    while (parts.length > 1 && namePartsToRemove.includes(parts[parts.length - 1])) {
      parts.pop();
    }

    let shirtName = parts[parts.length - 1];

    if (shirtName.length < 4 && parts.length > 1) {
      shirtName = parts.slice(-2).join(" ");
    }

    return shirtName.toUpperCase().slice(0, 13);
  }

  function setShirt(shirt, player) {
    shirt.style.setProperty("--colour1", player.colours[0]);
    shirt.style.setProperty("--colour2", player.colours[1]);
    shirt.style.setProperty("--colour3", player.colours[2]);
    shirt.style.setProperty("--textColour", player.textColour);
  }

  function updateGoals() {
    goalLives.forEach(function (goal, index) {
      if (index < incorrectAnswers) {
        goal.classList.add("crossed");
      } else {
        goal.classList.remove("crossed");
      }
    });
  }

  function getLevelFromScore() {
    if (score >= 30) {
      return 4;
    }

    if (score >= 20) {
      return 3;
    }

    return 2;
  }

  function updateLevelDisplay() {
    numberOfPlayers = getLevelFromScore();

    playersArea.classList.remove("level-three");
    playersArea.classList.remove("level-four");

    if (numberOfPlayers === 4) {
      playersArea.classList.add("level-four");
      instructions.textContent = "Level 3: Add up the 4 numbers of these players' squad numbers.";
    } else if (numberOfPlayers === 3) {
      playersArea.classList.add("level-three");
      instructions.textContent = "Level 2: Add up the 3 numbers of these players' squad numbers.";
    } else {
      instructions.textContent = "Add up the 2 numbers of these players' squad numbers.";
    }
  }

  function getRandomPlayers(amount) {
    const selectedPlayers = [];
    const selectedIndexes = new Set();

    while (selectedPlayers.length < amount) {
      const randomIndex = Math.floor(Math.random() * players.length);

      if (!selectedIndexes.has(randomIndex)) {
        selectedIndexes.add(randomIndex);
        selectedPlayers.push(players[randomIndex]);
      }
    }

    return selectedPlayers;
  }

  function displayPlayer(player, nameElement, numberElement, countryElement, shirtElement) {
    nameElement.textContent = player.name;
    numberElement.textContent = player.number;
    countryElement.textContent = player.fullName + " - " + player.country;
    setShirt(shirtElement, player);
  }

  function newQuestion() {
    updateLevelDisplay();

    const combination = getRandomPlayers(numberOfPlayers);

    correctAnswer = 0;

    displayPlayer(combination[0], nameOne, numberOne, countryOne, shirtOne);
    displayPlayer(combination[1], nameTwo, numberTwo, countryTwo, shirtTwo);

    correctAnswer += combination[0].number;
    correctAnswer += combination[1].number;

    if (numberOfPlayers >= 3) {
      displayPlayer(combination[2], nameThree, numberThree, countryThree, shirtThree);
      correctAnswer += combination[2].number;
    }

    if (numberOfPlayers >= 4) {
      displayPlayer(combination[3], nameFour, numberFour, countryFour, shirtFour);
      correctAnswer += combination[3].number;
    }

    answerInput.value = "";
    message.textContent = "";
    message.className = "";

    checkButton.style.display = "inline-block";
    nextButton.style.display = "none";

    answerInput.focus();
  }

  function resetGameAfterThreeMisses() {
    score = 0;
    scoreDisplay.textContent = score;

    message.textContent = "Three missed chances! Your score has reset to 0.";
    message.className = "incorrect";

    checkButton.style.display = "none";
    nextButton.style.display = "none";

    setTimeout(function () {
      incorrectAnswers = 0;
      updateGoals();
      newQuestion();
    }, 1400);
  }

  function showWinnerScreen() {
    message.textContent = "You completed the challenge!";
    message.className = "correct";

    checkButton.style.display = "none";
    nextButton.style.display = "none";

    winnerScreen.classList.add("show");
  }

  function checkAnswer() {
    const studentAnswer = Number(answerInput.value);

    if (answerInput.value === "") {
      message.textContent = "Type your answer first.";
      message.className = "incorrect";
      return;
    }

    if (studentAnswer === correctAnswer) {
      score++;
      scoreDisplay.textContent = score;

      if (score === 20) {
        message.textContent = "Correct! You reached 20. Level 2 unlocked: now add 3 players!";
      } else if (score === 30) {
        message.textContent = "Correct! Level 3 unlocked: now add 4 players!";
      } else if (score >= 40) {
        showWinnerScreen();
        return;
      } else if (score > 30) {
        message.textContent = "Correct! Great 4-player addition!";
      } else if (score > 20) {
        message.textContent = "Correct! Great 3-player addition!";
      } else {
        message.textContent = "Correct! Great addition!";
      }

      message.className = "correct";

      checkButton.style.display = "none";
      nextButton.style.display = "inline-block";
    } else {
      incorrectAnswers++;
      updateGoals();

      if (incorrectAnswers >= 3) {
        resetGameAfterThreeMisses();
        return;
      }

      message.textContent = "Try again. You have used " + incorrectAnswers + " of your 3 chances.";
      message.className = "incorrect";
    }
  }

  function playAgain() {
    score = 0;
    incorrectAnswers = 0;
    scoreDisplay.textContent = score;
    winnerScreen.classList.remove("show");
    updateGoals();
    newQuestion();
  }

  checkButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", newQuestion);
  playAgainButton.addEventListener("click", playAgain);

  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

  updateGoals();
  newQuestion();

  message.textContent = "Top 5 from each World Cup nation loaded: " + players.length + " players.";
  message.className = "correct";

  setTimeout(function () {
    message.textContent = "";
    message.className = "";
  }, 2500);
});
