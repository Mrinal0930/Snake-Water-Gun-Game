// Global variables
let userScore = 0;
let computerScore = 0;
const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const resultMessageElement = document.getElementById("result-message");
const gameOverElement = document.getElementById("game-over");
const gameOverMessageElement = document.getElementById("game-over-message");
const playAgainButton = document.getElementById("play-again");
const choiceButtons = document.querySelectorAll(".choice");

// Generate a random choice for the computer
const genCompChoice = () => {
  const options = ["snake", "water", "gun"];
  return options[Math.floor(Math.random() * options.length)];
};

// Determine the winner for the round
const determineWinner = (userChoice, compChoice) => {
  if (userChoice === compChoice) return "draw";
  if (
    (userChoice === "snake" && compChoice === "water") ||
    (userChoice === "water" && compChoice === "gun") ||
    (userChoice === "gun" && compChoice === "snake")
  ) {
    return "user";
  }
  return "computer";
};

// Update scores and display the result
const playRound = (userChoice) => {
  const compChoice = genCompChoice();
  const winner = determineWinner(userChoice, compChoice);

  if (winner === "user") {
    userScore++;
    resultMessageElement.textContent = `🎉 You won! 🐍💧🔫`;
  } else if (winner === "computer") {
    computerScore++;
    resultMessageElement.textContent = `🤖 Computer won! It chose ${compChoice}.`;
  } else {
    resultMessageElement.textContent = `🤝 It's a draw! Both chose ${userChoice}.`;
  }

  // Update scores
  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;

  // Check for game over
  if (userScore === 2 || computerScore === 2) {
    endGame();
  }
};

// Handle game over state
const endGame = () => {
  const winner = userScore === 2 ? "You" : "The Computer";
  gameOverMessageElement.textContent = `🎊 ${winner} won the Best of 3!`;
  gameOverElement.style.display = "block";

  // Disable choice buttons
  disableChoices();
};

// Disable all choice buttons
const disableChoices = () => {
  choiceButtons.forEach((button) => {
    button.disabled = true;
    button.classList.add("disabled");
  });
};

// Enable all choice buttons
const enableChoices = () => {
  choiceButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("disabled");
  });
};

// Reset the game
const resetGame = () => {
  userScore = 0;
  computerScore = 0;
  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;
  resultMessageElement.textContent = "Choose your move to start!";
  gameOverElement.style.display = "none";

  // Enable choice buttons
  enableChoices();
};

// Add event listeners for choices
choiceButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const userChoice = event.target.dataset.choice;
    playRound(userChoice);
  });
});

// Add event listener for play again button
playAgainButton.addEventListener("click", resetGame);
