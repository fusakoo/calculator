let result = 0;
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
        return 'Error';
    }
}

function updateScreen() {
    resultValue.innerHTML = result;
}