const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(resultBeforeCalc, operator, calcNumber) {
  calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}
let mathOperator;

function claculateResult(calculationType) {
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
  function writeToLog(
    operationIdentifier,
    prevResult,
    operationNumber,
    newResult
  ) {
    const logEntry = {
      operation: operationIdentifier,
      prevResult: prevResult,
      number: operationNumber,
      result: newResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
  }

  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredNumber;
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredNumber;
    mathOperator = "/";
  }
  createAndWriteOutput(initialResult, mathOperator, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener("click", claculateResult.bind(this, "ADD"));
subtractBtn.addEventListener("click", claculateResult.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", claculateResult.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", claculateResult.bind(this, "DIVIDE"));
