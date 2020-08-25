// To Do (Last Update 08/21/2020)
// clear 1. Add Error message when user divide num / 0
// 2. User should be able to string together several operations -> currently bugged (only operates last 2 nums)
// clear 3. Prevent users from inputting multiple '.' (limit to 1)
// 4. Add history feature when user press Enter for =

let result = 0;
let num = 0, a, b;
let operator = '';
let displayValue = '';
let historyLog = '';
let tempHistory = displayValue + '=' + result + '<BR>';

const log = document.querySelector('#log');
const history = document.querySelector('#history');
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
        if (b == 0) {
            alert('Wow there. Please don\'t try to break the calculator!');
            return result = 'Infinite';
        }
        return divide(a,b);
    } else {
        result = Number(num);
    }
}

function updateScreen() {
    log.innerHTML = displayValue;
    resultValue.innerHTML = result;
    document.getElementById('equals').onclick = () => {
        let tempHistory = displayValue + '=' + result + '<BR>';
        historyLog += tempHistory;
        history.innerHTML = historyLog;
    }
    // Issue 08/24/2020 - functioning BUT adds multiple result lines. 
    /* window.addEventListener('keydown', (e) => {
        const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (key.id == 'equals') {
            let tempHistory = displayValue + '=' + result + '<BR>';
            historyLog += tempHistory;
            history.innerHTML = historyLog;
        }
    }); */
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
        if (displayValue.indexOf('.') === -1 ) {
            num += this.id;
            displayValue += this.id;
            updateScreen();
        } return;
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
    } else if (this.id == 'clear-history') {
        return;
    } else {
        num += this.id;
        displayValue += this.id;
        updateScreen;
    }
    updateScreen();
}

function clearHistory() {
    history.innerHTML = '';
}

const historyButton = document.querySelector('#clear-history')
historyButton.addEventListener('click', clearHistory);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', checkInput));