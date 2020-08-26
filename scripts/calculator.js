// To Do (Last Update 08/26/2020)
// Current Issue(s)
// n/a

let value = ''; // Temporary value storage for firstOperand & secondOperand
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
const add = document.getElementById('+');
const subtract = document.getElementById('-');
const multiply = document.getElementById('*');
const divide = document.getElementById('/');
const equals = document.getElementById('Enter');
const clear = document.getElementById('c');
const del = document.getElementById('Backspace');
const dot = document.getElementById('.');

disableEquals();
disableOperators();

// Inputs

// Convert numbers to an array and run forEach on it
Array.from(numbers).forEach(number => {
    number.addEventListener('click', () => {
        inputNumber(number.id);
    })
});

function inputNumber(number) {
    // Limit the input to 15 characters
    if (value.length < 15) {
        value += number;
    }
    resultDisplay.innerHTML = value;
    disableEquals();
    disableOperators();
}

add.addEventListener('click', () => {
    inputOperator(add.id);
})
subtract.addEventListener('click', () => {
    inputOperator(subtract.id);
})
multiply.addEventListener('click', () => {
    inputOperator(multiply.id);
})
divide.addEventListener('click', () => {
    inputOperator(divide.id);
})

function inputOperator(operator) {
    dot.disabled = false;
    checkInput();
    operation = operator;
    log.innerHTML += operator;
    // Once operator is inputted, no longer store initial value as firstOperand (on to secondOperand)
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
        if (result === 'Infinite') {
            reset();
        }
    }
}

dot.addEventListener('click', () => {
    addDecimal();
})

function addDecimal() {
    if (value.indexOf('.') !== -1 ) {
        dot.disabled = true;
        return;
    } else { 
    value += '.';
    resultDisplay.innerHTML += '.';
    dot.disabled = true;
    }
}

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
    updateHistory();
    if (result === 'Infinite') {
        alert('Wow there. Please don\'t try to break the calculator!');
        equals.classList.toggle('button-active');
        reset();
    }
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
    nextSession();
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
            return num2 !== 0 ? decimalRound((num1 / num2), decimals) : 'Infinite';
            break;
    }
}

// Determines to what decimal place should the result be displaying to
function maxDecimal(number1, number2) {
    return Math.max(decimalPlaces(number1), decimalPlaces(number2));
}

// Return number of decimal places (i.e. 1.002 = '3'; 1.01 = '2')
function decimalPlaces(number) {
    number = number.toString();
    let arr = number.split('.');
    let decimalNumber = 0;
    // Checks length of arr, and check the length of arr[1] (i.e. 1.01 -> ['1', '01'] = '2')
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

// Rounds to the specified decimal point
// Convert long numbers to exponential form
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

function updateHistory() {
    let tempHistory = `${log.innerHTML}` + `${thousandSeparator(result)}` + '<BR>';
    historyLog += tempHistory;
    history.innerHTML = historyLog;
}

function nextSession() {
    historyLog += '<BR>';
    history.innerHTML = historyLog;
}

const historyButton = document.querySelector('#clear-history')
historyButton.addEventListener('click', clearHistory);

function clearHistory() { 
    historyLog = '';
    history.innerHTML = '';
}

// Key input support

// Note: Requires the user to have their Numlock enabled in case of num pad/ten key
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    e.preventDefault();
    toggleActive(e);
    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            inputNumber(e.key);
            break;
        // By separating (w/o using array method), prevents multiple operator input
        case '.':
            dot.click();
            break;
        case '+':
            add.click();
            break;
        case '-':
            subtract.click();
            break;
        case '*':
            multiply.click();
            break;
        case '/':
            divide.click();
            break;
        case '=':
        case 'Enter':
            equals.click();
            break;
        case 'Backspace':
            del.click();
            break;
        case 'c':
            clear.click();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    toggleActive(e);
});

function toggleActive(e) {
    let key = e.key;
    let button = document.getElementById(key);
    button.classList.toggle('button-active');
}