let operands = {
    firstOperand: "0",
    secondOperand: null
}
let canReset = true;


let operations = ["*", "/", "+", "-", "="]
let operator = null, currentOperand = "firstOperand";

const history = document.querySelector("#calculations-history");
const display = document.querySelector("#display");
const numpad = document.querySelector("#numpad");
const calculator = document.querySelector("#calculator");

function add(a, b) {
    let nums = [a, b];
    return (nums.includes(0.1) && nums.includes(0.2)) ? 0.3 : a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function changeMathematicalSign(string) {
    return string.includes("-") ? string.replace("-", "") : string.padStart(string.length + 1, "-");
}

function makeFloat(string) {
    return string.concat(".")
}

function roundResultToString(number) {
    return (Math.round(number * 1000) / 1000).toString();
}

function operate(a, b, operation) {
    a = Number(a);
    b = Number(b);
    let result;

    switch (operation) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = substract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            if (b == 0) {
                alert("Cannot divide by zero!");
                return a;
            }
            result = divide(a, b);
            break;
    }
    return roundResultToString(result);
}

let audio = [];

for(let i = 1; i <= 18; i++) {
    audio.push(new Audio(`audio/click${i}.ogg`));
    audio[i-1].volume = 1.0
}

function playSound(audio) {
    let randomNumber = Math.floor(Math.random() * 19);
    audio[randomNumber].play();
}


let previousOperandValue = null
function handleCalculator(event) {
    let buttonKey;
    if (event.target.hasAttribute("key")) {
        buttonKey = event.target.getAttribute("key");
    } else if (event.key) {
        buttonKey = event.key;
    } else {
        return null;
    }

    if (!isNaN(buttonKey)) {
        playSound(audio);
        if (canReset) {
            (operands[currentOperand] == "0") ? canReset = false : canReset = true;
            if (currentOperand == "firstOperand") {
                secondOperand = null
                history.textContent = "";
            }
            operands[currentOperand] = buttonKey;
            display.textContent = buttonKey;

        } else if (!canReset && (operands[currentOperand] != "0")) {
            operands[currentOperand] += buttonKey;
            display.textContent += buttonKey;
        }

    } else if (operations.includes(buttonKey)) {
        playSound(audio);
        if (buttonKey == "=") {
            let result;
            if (!operands.secondOperand && operator) {
                previousOperandValue = previousOperandValue == null ? operands.firstOperand : previousOperandValue
                result = operate(operands.firstOperand, previousOperandValue, operator);
                history.textContent = `${operands.firstOperand} ${operator} ${previousOperandValue} =`
                currentOperand = "firstOperand"
            }
            else if (operands.secondOperand && operator) {
                result = operate(operands.firstOperand, operands.secondOperand, operator);
                history.textContent = `${operands.firstOperand} ${operator} ${operands.secondOperand} =`
                currentOperand = "firstOperand";
                operator = null;
                operands.secondOperand = null;
                previousOperandValue = null;
            }
            else if (!operands.secondOperand && !operator) {
                history.textContent = `${operands.firstOperand} =`
                result = operands.firstOperand;
            }
            operands.firstOperand = result;
            display.textContent = result;
            canReset = true
        } else {
            if (operator && operands.secondOperand) {
                result = operate(operands.firstOperand, operands.secondOperand, operator);
                history.textContent = `${result} ${buttonKey}`
                operands.firstOperand = result;
                display.textContent = result;
                operands.secondOperand = null;
                previousOperandValue = null;
            } else {
                history.textContent = `${operands.firstOperand} ${buttonKey}`
            }
            canReset = true;
            operator = buttonKey;
            currentOperand = "secondOperand";
        }
    } else if (buttonKey == "Delete") {
        playSound(audio);
        display.textContent = "0";
        history.textContent = "";
        operands.firstOperand = "0";
        operands.secondOperand = null;
        currentOperand = "firstOperand";
        operator = null;
        previousOperandValue = null;
        canReset = true;
    } else if (buttonKey == "Backspace") {
        playSound(audio);
        display.textContent = "0";
        operands[currentOperand] = "0"
        previousOperandValue = null;
        canReset = true;
    } else if (buttonKey == "!") {
        playSound(audio);
        previousOperandValue = null;
        history.textContent = `negate(${operands[currentOperand]})`
        operands[currentOperand] = (-Number(operands[currentOperand])).toString();
        display.textContent = operands[currentOperand];
    } else if (buttonKey == "copy") {
        navigator.clipboard.writeText(event.target.textContent);
        alert("Saved to clipboard!");
    } else if (buttonKey == ".") {
        playSound(audio);
        if (!operands[currentOperand].includes(".")) {
            operands[currentOperand] += "."
            display.textContent += "."
            canReset = false;
        }
    }
}


document.addEventListener("keydown", handleCalculator)

calculator.addEventListener("click", handleCalculator);

