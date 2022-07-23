const calculatorDisplay = document.querySelector('h1');
const inputBts = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is o, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator value is pressed, don't add decimal
  if (awaitingNextValue) return;
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

// Calculate first and seconde values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber)  => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber)  => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber)  => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber)  => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber)  => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent miltiples operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  };
  // assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;

  operatorValue = operator;
}

// Add event listeners for numbers, operatos and decimal buttons
inputBts.forEach((inputBts) => {
  if (inputBts.classList.length === 0) {
    inputBts.addEventListener('click', () => sendNumberValue(inputBts.value));
  } else if (inputBts.classList.contains('operator')) {
    inputBts.addEventListener('click', () => useOperator(inputBts.value));
  } else if (inputBts.classList.contains('decimal')) {
    inputBts.addEventListener('click', () => addDecimal());
  }
});

// reset all
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// event listener
clearBtn.addEventListener('click', resetAll);