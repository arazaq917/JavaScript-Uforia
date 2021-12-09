const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_CHOICE = "ROCK";
const RESULT_DRAW = "DRAW";
const COMPUTER_WIN = "COMPUTER WIN";
const PLAYER_WIN = "PLAYER WIN";

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS} ?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid Choice We choose ${DEFAULT_CHOICE} for you...`);
    return;
  }
  return selection;
};

function getCompuetrChoice() {
  const choice = Math.random();
  if (choice < 0.36) return ROCK;
  else if (choice < 0.67) return PAPER;
  else return SCISSORS;
}

const getWinner = (cChoice, pChoice = DEFAULT_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? PLAYER_WIN
    : COMPUTER_WIN;

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is Starting....");
  const playerChoice = getPlayerChoice();
  const computerChoice = getCompuetrChoice();

  let winner;
  if (winner) {
    winner = getWinner(computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice);
  }

  let message = `You pkicked ${
    playerChoice || DEFAULT_CHOICE
  } and Computer Picked ${computerChoice}, therefor You `;
  if (winner === RESULT_DRAW) {
    message = message + "had a draw";
  } else if (winner === PLAYER_WIN) {
    message = message + "Win";
  } else {
    message = message + "Lost";
  }
  alert(message);
  gameIsRunning = false;
});

//For Understanding Callback Function...

const combine = (resultHandler, operation, ...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };
  let sum = 0;
  for (const num of numbers) {
    if (operation === "ADD") {
      sum += validateNumber(num);
    } else {
      sum -= validateNumber(num);
    }
  }
  resultHandler(sum);
};

const showReult = (messageText, result) => {
  alert(messageText + " " + result);
};

combine(
  showReult.bind(this, "Result after adding is: "),
  "ADD",
  1,
  1,
  2,
  2,
  3,
  5,
  6
);
combine(
  showReult.bind(this, "Result after adding is: "),
  "ADD",
  17,
  14,
  20,
  2,
  34,
  52,
  66
);
combine(
  showReult.bind(this, "Result after subtracting is: "),
  "SUBTRACT",
  52,
  66,
  2,
  3,
  5,
  6
);
