// Keyboard support of the calculator
window.addEventListener('keydown', function(e) {
    // Prevents Quick Search popping up when '/' key is pressed
    e.preventDefault();
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!key) return;

    if (key.id == '+' || key.id == '-' || key.id == '*' || key.id == '/') {
        if (result !== 0) {
            displayValue = result;
        }
        operator = key.id;
        a = Number(num);
        num = 0;
        displayValue += key.id;
        updateScreen();
    } else if (key.id == '.') {
        if (displayValue.indexOf('.') === -1 ) {
            num += key.id;
            displayValue += key.id;
            updateScreen();
        } return;
    } else if (key.id == 'equals') {
        b = Number(num);
        operate(operator, a, b);
        console.log(result);

        updateScreen();
        num = result;
    } else if (key.id == 'clear-entry') {
        num = num.slice(0, num.length-1);
        displayValue = displayValue.slice(0, displayValue.length-1);
        updateScreen;
    } else if (key.id == 'all-clear') {
        result = 0;
        num = 0;
        a = 0;
        b = 0;
        displayValue = '';
        updateScreen();
    } else if (key.id == 'clear-history') {
        return;
    } else {
        num += key.id;
        displayValue += key.id;
        updateScreen;
    }
    updateScreen();
});