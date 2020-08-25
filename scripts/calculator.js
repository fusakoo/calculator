// To Do (Last Update 08/25/2020)
// Current Issues:
// Key input - users can input multiple operator and . (works as intended on click)

let value = '';
let firstOperand = ''; // Stores Num1
let secondOperand = ''; // Stores Num2
let operation = ''; // Stores operator
let result = '';

let firstNumber = true;
let toggleEquals = false;

const log = document.getElementById('log');
const resultDisplay = document.getElementById('result');
resultDisplay.innerHTML = '0';

const history = document.getElementById('history');
let historyLog = '';

const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const dot = document.getElementById('.');

disableEquals();
disableOperators();

// Click inputs

// Convert numbers to an array and run forEach on it
Array.from(numbers).forEach(number => {
    number.addEventListener('click', () => {
        inputNumber(number.id);
    })
});

function inputNumber(number) {
    if (value.length < 15) {
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
        log.innerHTML += thousandSeparator(value);
        value = '';
    } else if (firstNumber === false) {
        secondOperand = value;
        if (secondOperand !== '') {
            result = operate(operation, firstOperand, secondOperand);
        }
        resultDisplay.innerHTML = thousandSeparator(result);
        firstOperand = result;
        value = '';
        log.innerHTML += thousandSeparator(secondOperand);
        secondOperand = '';
        if (toggleEquals === true) {
            log.innerHTML = thousandSeparator(result);
            toggleEquals = false;
        }
    }
}

dot.addEventListener('click', () => {
    if (value.indexOf('.') !== -1 ) {
        dot.disabled = true;
        return;
    } else { 
    value += '.';
    resultDisplay.innerHTML += '.';
    dot.disabled = true;
    }
})

equals.addEventListener('click', () => {
    calculate();
});

function calculate() {
    secondOperand = value;
    if (secondOperand !== '') {
        result = operate(operation, firstOperand, secondOperand);
    }
    resultDisplay.innerHTML = thousandSeparator(result);
    firstOperand = result;
    log.innerHTML += thousandSeparator(secondOperand);
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

function operate(operator, firstOperand, secondOperand) {
    num1 = Number(firstOperand);
    num2 = Number(secondOperand);
    let decimals = maxDecimal(num1, num2);
    switch (operator) {
        case '+':
            if (decimals === 0) {
                decimals = maxDecimal((num1 + num2), 0);
            }
            return decimalRound((num1 + num2), decimals);
            break;
        case '-':
            if (decimals === 0) {
                decimals = maxDecimal((num1 - num2), 0);
            }
            return decimalRound((num1 - num2), decimals);
            break;
        case '*':
            if (decimals === 0) {
                decimals = maxDecimal((num1 * num2), 0);
            }
            return decimalRound((num1 * num2), decimals);
            break;
        case '/':
            if (decimals === 0) {
                decimals = maxDecimal((num1 / num2), 0);
            }
            if (num2 !== 0) {
                decimalRound((num1 / num2), decimals);
            } else {
                alert('Wow there. Please don\'t try to break the calculator!');
                return result = 'Infinite';
            }
            break;
        default:
            return result = 0;
    }
}

function maxDecimal(number1, number2) {
    return Math.max(decimalPlaces(number1), decimalPlaces(number2));
}

function decimalPlaces(number) {
    number = number.toString();
    let arr = number.split('.');
    let decimalNumber = 0;
    if (arr.length === 1) {
        decimalNumber = 0;
    } else {
        decimalNumber = arr[1].length;
    }
    if (decimalNumber > 16) {
        decimalNumber = 16;
    }
    return decimalNumber;
}

function decimalRound(calculation, decimals) {
    let calculationResult = calculation.toFixed(decimals);
    if (result.length > 18) {
        return Number(result).toExponential();
    } else {
        return calculationResult;
    }
}

function thousandSeparator(number) {
    // Split the number (result) into an array
    let arr = number.split('.');
    if (arr.length === 1) {
        // Insert ',' to the 1st parenthesized submatch string (every 3 numbers)
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else if (arr.length === 2) {
        arr[0] = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return arr.join('.');
    }
}

// History feature

function updateScreen() {
    let tempHistory = `${log.innerHTML}` + `${thousandSeparator(result)}` + '<BR>';
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
        disableEquals();
    }
    if (e.key === "." && value.indexOf('.') === -1 ) {
        dot.click();
    }
});