const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 10;
const healValue = 20;

const enteredLife = prompt('Max Life for You and Monster..', '100');

let chosenMaxLife = parseInt(enteredLife);
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayeyerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayeyerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayeHealth = currentPlayeyerHealth;
  const palyerDamag = dealPlayerDamage(monsterAttackValue);
  currentPlayeyerHealth -= palyerDamag;
  if(currentPlayeyerHealth <= 0 && hasBonusLife){
      hasBonusLife = false;
      removeBonusLife();
      currentPlayeyerHealth = initialPlayeHealth;
      setPlayerHealth(initialPlayeHealth);
      alert('Bonus Life...!!');
  }
  if (currentMonsterHealth <= 0 && currentPlayeyerHealth > 0) {
    alert("You won!!");
  } else if ((currentPlayeyerHealth <= 0) & (currentMonsterHealth > 0)) {
    alert("You loss");
  } else if ((currentMonsterHealth <= 0) & (currentPlayeyerHealth <= 0)) {
    alert("You have a Draw!!");
  }

  if(currentMonsterHealth <= 0 || currentPlayeyerHealth <= 0){
    reset();
  }
}

function monsterAttack(mode) {
  let maxDamag;
  if (mode == "ATTACK") {
    maxDamag = attackValue;
  } else if (mode == "STRONG_ATTACK") {
    maxDamag = strongAttackValue;
  }
  const damag = dealMonsterDamage(maxDamag);
  currentMonsterHealth -= damag;
  endRound();
}

function attackHandler() {
  monsterAttack("ATTACK");
}

function strongAttack() {
  monsterAttack("STRONG_ATTACK");
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
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttack);
healBtn.addEventListener("click", healPlayerHandler);
