let result = 0;
let num = 0, a, b;
let operator = '';
let displayValue = '';

const log = document.querySelector('#log');
const resultValue = document.querySelector('#result');

function add (a, b) {
	result = a + b;
}

function subtract (a, b) {
	result = a - b;
}

function multiply (a, b) {
    result = a * b;
}

function divide (a, b) {
    result = a / b;
}

function operate (operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a,b);
    } else if (operator === '*') {
        return multiply(a,b);
    } else if (operator === '/') {
        return divide(a,b);
    } else {
        result = Number(num);
    }
}

function updateScreen() {
    log.innerHTML = displayValue;
    resultValue.innerHTML = result;
}

function checkInput(e) {
    if (this.id == '+' || this.id == '-' || this.id == '*' || this.id == '/') {
        if (result !== 0) {
            displayValue = result;
        }
        operator = this.id;
        a = Number(num);
        num = 0;
        displayValue += this.id;
        updateScreen();
    } else if (this.id == '.') {
        num += this.id;
        displayValue += this.id;
        updateScreen();
    } else if (this.id == 'equals') {
        b = Number(num);
        operate(operator, a, b);
        console.log(result);

        updateScreen();
        num = result;
    } else if (this.id == 'clear-entry') {
        num = num.slice(0, num.length-1);
        displayValue = displayValue.slice(0, displayValue.length-1);
        updateScreen;
    } else if (this.id == 'all-clear') {
        result = 0;
        num = 0;
        a = 0;
        b = 0;
        displayValue = '';
        updateScreen();
    } else {
        num += this.id;
        displayValue += this.id;
        updateScreen;
    }
    updateScreen();
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', checkInput));

window.addEventListener('keypress', keys);
function keys(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    this.id = key;
}