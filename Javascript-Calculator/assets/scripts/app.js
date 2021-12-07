const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];


function getUserNumberInput(){
  return parseInt(userInput.value);
}

function createAndWriteOutput(resultBeforeCalc, operator, calcNumber){
  calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}
let mathOperator;

function claculateResult(calculationType){
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;

  if (
    calculationType !== "ADD" &&
    calculationType !== "SUBTRACT" &&
    calculationType !== "MULTIPLY" &&
    calculationType !== "DIVIDE"
  ) {
    return;
  }

  if(calculationType==='ADD'){
    currentResult += enteredNumber;
    mathOperator = '+';
  }
  else if(calculationType === 'SUBTRACT'){
    currentResult -= enteredNumber;
    mathOperator = '-';
  }
  else if(calculationType === 'MULTIPLY'){
    currentResult *= enteredNumber;
    mathOperator = '*';
  }
  else if(calculationType === 'DIVIDE'){
    currentResult /= enteredNumber;
    mathOperator = '/';
  }
  createAndWriteOutput(initialResult, mathOperator, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber,currentResult);
}

function add() {
  claculateResult('ADD');
}

function sub() {
  claculateResult('SUBTRACT');
}

function mul() {
  claculateResult('MULTIPLY');
}

function divi() {
  claculateResult('DIVIDE');
}

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', sub)
multiplyBtn.addEventListener('click', mul)
divideBtn.addEventListener('click', divi)


