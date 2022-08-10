/* DISPLAY */
const currentOperand = document.querySelector('#current-number');
const previousOperand = document.querySelector('#previous-number');

/* CONTROL DISPLAY */
const clearAll = document.querySelector('#clear-all');
const del = document.querySelector('#delete');

/* OPERATIONS */
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('#equal');

/* VARIABLES */
let lastNumber = '';
let currentNumber = '';
let op = undefined;

function displayNumber(number) {
  if(number === '.' && currentOperand.textContent.includes('.')) return;
  currentNumber += number;
  currentOperand.textContent += number;
}

function displayOperation(operation) {
  if(op !== undefined || currentNumber.length == 0) return;
  lastNumber = currentOperand.textContent;
  currentNumber = '';
  op = operation;
  previousOperand.textContent = `${lastNumber} ${operation}`;
  currentOperand.textContent = '';
}

function displayResult() {  
  if(op === undefined || currentNumber.length == 0) return;
  if(isFinite(calculateResult())) {
    previousOperand.textContent = `${lastNumber} ${op} ${currentNumber}`;
    currentOperand.textContent = `${calculateResult()}`;
    op = undefined;
  } else {
    clearAllOperation();
    previousOperand.textContent = 'Impossible division';
  }
  
}

function deleteOperand() {
  if(currentNumber.length == 0) return;
  currentOperand.textContent = currentOperand.textContent.slice(0, -1);
  currentNumber = currentNumber.slice(0, -1);
}

function clearAllOperation() {
  currentOperand.textContent = '';
  previousOperand.textContent = '';
  currentNumber = '';
  lastNumber = '';
  op = undefined;
}

function calculateResult() {
  let first = parseFloat(lastNumber);
  let second = parseFloat(currentNumber);
  let result = 0;
  switch (op) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = Math.floor((first * second) * 100) / 100;
      break;
    case '/':
      result = Math.floor((first / second) * 100) / 100;
      break;
  }
  return result;
}

numbers.forEach(number => {
  number.addEventListener('click', () => {
    displayNumber(number.textContent);
  });
});

operations.forEach(operation => {
  operation.addEventListener('click', () => 
    displayOperation(operation.textContent)
  );
});

equal.addEventListener('click', () => displayResult());

del.addEventListener('click', () => deleteOperand());

clearAll.addEventListener('click', () => clearAllOperation());