const calculator = document.querySelector(".calculator");

const keys = calculator.querySelector(".calculator-keys");

const display = document.querySelector(".calculator-display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      calculator.dataset.previousKeysType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      console.log("operator key");
    }

    if (action === "decimal") {
      display.textContent = displayedNum + ".";
      console.log("decimal key");
    }
    if (action === "clear") {
      console.log("clear key");
    }
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue)
      console.log("equal key");
    }

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
  }
});

// const display = calculator.querySelector('.calculator-display');

// const clear = document.querySelector('.clear');

// const buttonKeys = document.querySelectorAll('.key');

// const targetEvent = e => {

//     const key = e.target;
//     const action = key.dataset.action;
//     const keyContent = key.textContent;
//     const displayedNum = display.textContent.substring(0,11);
//     const previusKeyType = calculator.dataset.previusKeyType;

//     const calculate = (n1, operator, n2) => {
//         const firstNum = parselFloat
//     }

// }
