let operator = "";
let currentValue = "";
let previousValue = "";
let currentDisplay = document.querySelector(".currentNumber");
let previousDisplay = document.querySelector(".previousNumber");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete")
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

window.addEventListener("keydown", handleKeyPress)


numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    // currentDisplay.textContent = currentValue;
  });
});

function handleNumber(number) {
  if (currentValue.length <= 9) {
    currentValue += number;
    currentDisplay.textContent = currentValue;
  }
};

operators.forEach(btn => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  previousDisplay.textContent = previousValue + operator;
  currentValue = "";
  currentDisplay.textContent = "";
}

equal.addEventListener("click", () => {
  if (currentValue != "" && previousValue != "") {
    calculate()
  }
});

clear.addEventListener("click", clearDisplay);
decimal.addEventListener("click", addDecimal)

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else if (operator === "/") {
    if (currentValue <= 0) {
      previousValue = "Error";
      displayResult()
      return;
    }
    previousValue /= currentValue
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
  displayResult()

}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000
}

function displayResult() {
  previousDisplay.textContent = "";
  operator = "";
  if (previousValue.length <= 9) {
    currentDisplay.textContent = previousValue;
  } else {
    currentDisplay.textContent = previousValue.slice(0, 9) + "..."
  }
}

function clearDisplay() {
  currentValue = "";
  previousValue = "";
  operator = "";
  currentDisplay.textContent = "";
  previousDisplay.textContent = ""
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentDisplay.textContent = currentValue;
  }
}

function handleKeyPress(e) {
  e.preventDefault()
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key)
  }
  if (e.key === "Enter" || (e.key === "=" && currentValue != "" && previousValue != "")) {
    calculate()
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key)
  }
  if (e.key === "*") {
    handleOperator("x")
  }
  if (e.key === ".") {
    addDecimal()
  }
}