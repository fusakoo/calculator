// To Do (Last Update 08/24/2020)
// 1. Add Error message when user divide num / 0
// Clear
// 2. User should be able to string together several operations
// Bugged. User can input, but causes NaN issue
// 3. Prevent users from inputting multiple '.' (limit to 1)
// Bugged. Multiple . appearing on click/key input
// 4. Add history feature when user press Enter for =
// Somewhat working.

let value = '';
let firstOperand = ''; // Stores Num1
let secondOperand = ''; // Stores Num2
let operation = ''; // Stores operator
let result = '';

let firstNumber = true;
let toggleEquals = false;

let historyLog = '';

const log = document.getElementById('log');
const resultDisplay = document.getElementById('result');
resultDisplay.innerHTML = '0';

const history = document.getElementById('history');

const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const dot = document.getElementById('.');

disableEquals();
disableOperators();

// Click inputs

// Convert numbers to an array
Array.from(numbers).forEach(number => {
    number.addEventListener('click', () => {
        inputNumber(number.id);
    })
});

function inputNumber(number) {
    if (value.length < 10) {
        value += number;
    }
    resultDisplay.innerHTML = value;
    disableEquals();
    disableOperators();
}

Array.from(operators).forEach(operator => {
    operator.addEventListener('click', () => {
        inputOperator(operator.id);
    })
});

function inputOperator(operator) {
    dot.disabled = false;
    checkInput();
    operation = operator;
    log.innerHTML += operator;
    firstNumber = false;
    disableEquals();
    disableOperators();
}


function checkInput() {
    if (firstNumber === true) {
        firstOperand = value;
        log.innerHTML += value;
        value = '';
    } else if (firstNumber === false) {
        secondOperand = value;
        if (secondOperand !== '') {
            result = operate(operation, firstOperand, secondOperand);
        }
        resultDisplay.innerHTML = result;
        firstOperand = result;
        value = '';
        log.innerHTML += secondOperand;
        secondOperand = '';
        if (toggleEquals === true) {
            log.innerHTML = result;
            toggleEquals = false;
        }
    }
}

dot.addEventListener('click', () => {
        addDot();
})

function addDot() {
    
    value += '.';
    resultDisplay.innerHTML += '.';
    dot.disabled = true;
}

equals.addEventListener('click', () => {
    calculate();
});

function calculate() {
    secondOperand = value;
    if (secondOperand !== '') {
        operate(operation, firstOperand, secondOperand);
    }
    resultDisplay.innerHTML = result;
    firstOperand = result;
    log.innerHTML += secondOperand;
    log.innerHTML += equals.innerHTML;
    value = '';
    disableEquals();
    toggleEquals = true;
    dot.disabled = false;
    updateScreen();
}

clear.addEventListener('click', () => {
    reset();
});

function reset() {
    firstOperand = '';
    secondOperand = '';
    firstNumber = true;
    operation = '';
    result = '';
    value = '';
    log.innerHTML = '';
    resultDisplay.innerHTML = '0';
    toggleEquals = false;
    for (let number of numbers) {
        number.disabled = false;
    }
    for (let operator of operators) {
        operator.disabled = true;
    }
    dot.disabled = false;
    del.disabled = false;
}

del.addEventListener('click', () => {
    remove();
});

function remove() {
    value = value.slice(0,-1);
    if (value !== '') {
        resultDisplay.innerHTML = value;
    } else {
        resultDisplay.innerHTML = '0';
    }
}

function disableOperators() {
    for (let operator of operators) {
        if (value === '') {
            operator.disabled = true;
        } else {
            operator.disabled = false;
        }
    }
}

function disableEquals() {
    if (firstNumber === true || firstOperand === '' || value === '') {
        equals.disabled = true;
    } else {
        equals.disabled = false;
    }
}

// Calculation

function add(num1, num2) {
	result = +num1 + +num2;
}

function subtract(num1, num2) {
	result = +num1 - +num2;
}
function multiply(num1, num2) {
    result = +num1 * +num2;
}
function divide(num1, num2) {
    result = +num1 / +num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        if (num2 == 0) {
            alert('Wow there. Please don\'t try to break the calculator!');
            return result = 'Infinite';
        }
        return divide(num1, num2);
    } else {
        result = 0;
    }
}

function updateScreen() {
    let tempHistory = `${log.innerHTML}` + `${result}` + '<BR>';
    historyLog += tempHistory;
    history.innerHTML = historyLog;
}

const historyButton = document.querySelector('#clear-history')
historyButton.addEventListener('click', clearHistory);

function clearHistory() { 
    history.innerHTML = '';
}


// Key input support

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
const opKeys = ["+", "-", "*", "/"];

// Note: Requires the user to have their Numlock enabled in case of num pad/ten key
document.addEventListener('keydown', (e) => {
    console.log(e.key)
    e.preventDefault();
    if (numberKeys.includes(e.key)) {
        inputNumber(e.key);
    }
    if (opKeys.includes(e.key)) {
        inputOperator(e.key);
    }
    if (e.key === 'Backspace') {
        remove();
    }
    if (e.key === 'c') {
        reset();
    }
    if (e.key === 'Enter' || e.key === '=') {
        calculate();
    }
    if (value.indexOf('.') !== -1 ) {
        dot.disabled = true;
    } else if (e.key === ".") {
        addDot();
    }
});