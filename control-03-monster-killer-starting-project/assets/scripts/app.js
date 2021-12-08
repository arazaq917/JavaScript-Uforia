const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 10;
const healValue = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];


function getMaxLifeValue(){
  const enteredLife = prompt("Max Life for You and Monster..", "100");
  let parsedValue = parseInt(enteredLife);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw {message: "Inalid Input, Input a number...!!"};
  }
  return parsedValue;
}

let chosenMaxLife
try{
  chosenMaxLife = getMaxLifeValue();
} catch(error){
  console.log(error);
  chosenMaxLife = 100;
  alert("You entered something worng so System used default value");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayeyerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntries = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayeHealth: playerHealth,
  };
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntries.target = "MONSTER";
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntries.target = "MONSTER";
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntries.target = "PLAYER";
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntries.target = "PLAYER";
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntries = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayeHealth: playerHealth,
    };
  }
  battleLog.push(logEntries);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayeyerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayeHealth = currentPlayeyerHealth;
  const palyerDamag = dealPlayerDamage(monsterAttackValue);
  currentPlayeyerHealth -= palyerDamag;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    palyerDamag,
    currentMonsterHealth,
    currentPlayeyerHealth
  );
  if (currentPlayeyerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayeyerHealth = initialPlayeHealth;
    setPlayerHealth(initialPlayeHealth);
    alert("Bonus Life...!!");
  }
  if (currentMonsterHealth <= 0 && currentPlayeyerHealth > 0) {
    alert("You won!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON!!",
      currentMonsterHealth,
      currentPlayeyerHealth
    );
  } else if ((currentPlayeyerHealth <= 0) & (currentMonsterHealth > 0)) {
    alert("You loss");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON!!",
      currentMonsterHealth,
      currentPlayeyerHealth
    );
  } else if ((currentMonsterHealth <= 0) & (currentPlayeyerHealth <= 0)) {
    alert("You have a Draw!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW!!",
      currentMonsterHealth,
      currentPlayeyerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayeyerHealth <= 0) {
    reset();
  }
}

function monsterAttack(mode) {
  const maxDamag = mode === MODE_ATTACK ? attackValue : strongAttackValue;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  const damag = dealMonsterDamage(maxDamag);
  currentMonsterHealth -= damag;
  writeToLog(logEvent, damag, currentMonsterHealth, currentPlayeyerHealth);
  endRound();
}

function attackHandler() {
  monsterAttack(MODE_ATTACK);
}

function strongAttack() {
  monsterAttack(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
  let healVal;
  if (currentPlayeyerHealth >= chosenMaxLife - healValue) {
    alert("You Can't use Heal..!! ");
    healVal = chosenMaxLife - currentPlayeyerHealth;
  } else {
    healVal = healValue;
  }
  increasePlayerHealth(healValue);
  currentPlayeyerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healVal,
    currentMonsterHealth,
    currentPlayeyerHealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttack);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
