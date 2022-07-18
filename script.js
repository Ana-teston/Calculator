const calculatorDisplay = document.querySelector('h1');
const inputBts = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

function sendNumberValue(number) {
  // if current display value is 0, replace it, if not add number
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent = displayValue ==='0' ? number : displayValue + number;
}

function addDecimal() {
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

// Add event listeners for numbers, operatos and decimal buttons
inputBts.forEach((inputBts) => {
  if (inputBts.classList.length === 0) {
    inputBts.addEventListener('click', () => sendNumberValue(inputBts.value));
  } else if (inputBts.classList.contains('operator')) {
    inputBts.addEventListener('click', () => sendNumberValue(inputBts.value));
  } else if (inputBts.classList.contains('decimal')) {
    inputBts.addEventListener('click', () => addDecimal());
  }
});

// reset all
function resetAll() {
  calculatorDisplay.textContent = '0';
}

// event listener
clearBtn.addEventListener('click', resetAll);