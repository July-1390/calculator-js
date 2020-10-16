const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = document.querySelector(".calculator-display");

Actions = {
  ADD: "ADD",
  SUBSTRACT: "SUBSTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
};

KeyTypes = {
  NUMBER: "number",
  DECIMAL: "decimal",
  OPERATOR: "operator",
  CLEAR: "clear",
  CALCULATE: "calculate",
};
const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === Actions.ADD) return firstNum + secondNum;
  if (operator === Actions.SUBSTRACT) return firstNum - secondNum;
  if (operator === Actions.MULTIPLY) return firstNum * secondNum;
  if (operator === Actions.DIVIDE) return firstNum / secondNum;
};

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return KeyTypes.NUMBER;
  if (
    action === Actions.ADD ||
    action === Actions.SUBSTRACT ||
    action === Actions.MULTIPLY ||
    action === Actions.DIVIDE
  )
    return KeyTypes.OPERATOR;
  // For everything else, return the action
  return action;
};

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;

  if (keyType === KeyTypes.NUMBER) {
    return displayedNum === "0" ||
      previousKeyType === KeyTypes.OPERATOR ||
      previousKeyType === KeyTypes.CALCULATE
      ? keyContent
      : displayedNum + keyContent;
  }

  if (keyType === KeyTypes.DECIMAL) {
    if (!displayedNum.includes(".")) return displayedNum + ".";
    if (
      previousKeyType === KeyTypes.OPERATOR ||
      previousKeyType === KeyTypes.CALCULATE
    )
      return "0.";
    return displayedNum;
  }

  if (keyType === KeyTypes.OPERATOR) {
    return firstValue &&
      operator &&
      previousKeyType !== KeyTypes.OPERATOR &&
      previousKeyType !== KeyTypes.CALCULATE
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === KeyTypes.CLEAR) return 0;

  if (keyType === KeyTypes.CALCULATE) {
    return firstValue
      ? previousKeyType === KeyTypes.CALCULATE
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType,
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === KeyTypes.OPERATOR) {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== KeyTypes.OPERATOR &&
      previousKeyType !== KeyTypes.CALCULATE
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === KeyTypes.CALCULATE) {
    calculator.dataset.modValue =
      firstValue && previousKeyType === KeyTypes.CALCULATE
        ? modValue
        : displayedNum;
  }

  if (keyType === KeyTypes.CLEAR && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.modValue = "";
    calculator.dataset.previousKeyType = "";
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove("is-depressed")
  );

  if (keyType === KeyTypes.OPERATOR) key.classList.add("is-depressed");

  if (keyType === KeyTypes.CLEAR && key.textContent !== "AC")
    key.textContent = "AC";

  if (keyType !== KeyTypes.CLEAR) {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }
};

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const key = e.target;
  const displayedNum = display.textContent;
  const resultString = createResultString(
    key,
    displayedNum,
    calculator.dataset
  );
  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
