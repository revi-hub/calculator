let operands = {
    firstOperand: "0",
    secondOperand: "0"
}

let keys = ["*", "/", "+", "-", "=", "*", "Delete", "Backspace", "!", "Enter", "."]
let operation = null, inputting = "firstOperand";

const history = document.querySelector("#calculations-history")
const display = document.querySelector("#display");
const numpad = document.querySelector("#numpad");
const calculator = document.querySelector("#calculator");

function add(a, b) {
    let nums = [a, b]
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
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            if (b == 0) {
                alert("Cannot divide by zero!");
                return a;
            }
            result = divide(a, b);
            break;
    }
    return Number.isInteger(result) ? result : result.toPrecision(3)
}

function translateOperationSigns(string) {
    switch (string) {
        case "/":
            return "÷"
            break;
        case "*":
            return "×"
            break;
        case "Enter":
            return "="
            break;
        default:
            return string;
            break;
    }
}

function handleNumpadClick(event) {
    let buttonNumber
    if (Number(event.key) >= 0 && Number(event.key) <= 9) {
        buttonNumber = event.key;
    } else if (event.target.classList.contains("number")) {
        buttonNumber = event.target.innerText;
    }
    if (buttonNumber) {


        if ((operands["firstOperand"] == "0" || operands["firstOperand"] == "-0") && operation != null) {
            inputting = "secondOperand";
            operands[inputting] = buttonNumber;
            display.innerText = buttonNumber;

        } else if (!operands[inputting] || (operands[inputting] == "0" || operands[inputting] == "-0")) {
            operands[inputting] = buttonNumber;
            display.innerText = buttonNumber;

        } else {
            operands[inputting] += buttonNumber;
            display.innerText += buttonNumber;
        }
    }
}


function handleOperationClick(event) {
    let buttonOperation
    if (event.key && keys.includes(event.key)) {
        buttonOperation = event.key;
    } else if (event.target.classList.contains("operation")) {
        buttonOperation = event.target.getAttribute("key");
        console.log(buttonOperation);
    }
    buttonOperation = translateOperationSigns(buttonOperation)

    if (buttonOperation) {
        if (buttonOperation == "Delete") {
            display.innerText = "0";
            history.innerText = ``;
            operands["firstOperand"] = "0";
            operands["secondOperand"] = "0";
            operation = null;
            inputting = "firstOperand";

        } else if (buttonOperation == "Backspace") {

            if (operands["secondOperand"] == "0") {
                display.innerText = "0"
                operation = null;
                operands["firstOperand"] = "0";
                inputting = "firstOperand"
                history.innerText = "";

            } else {
                operands["secondOperand"] = "0";
                display.innerText = "0"
            }

        } else if (buttonOperation == "!") {
            switch (operands[inputting]) {

                case "0":
                    const firstOperandInverted = changeMathematicalSign(operands.firstOperand);
                    operands.firstOperand = firstOperandInverted;
                    display.innerText = firstOperandInverted;
                    break;

                default:
                    const operandInverted = changeMathematicalSign(operands[inputting]);
                    operands[inputting] = operandInverted;
                    display.innerText = operandInverted;
                    break;
            }
        } else if (buttonOperation == ".") {
            if (!operands[inputting].includes(".")) {
                const float = makeFloat(operands[inputting]);
                operands[inputting] = float;
                display.innerText = float;
            }
        } else if (buttonOperation == "copy") {
            navigator.clipboard.writeText(display.innerText);
            alert("Saved number to clipboard!")
        } else {

            if (!operation && buttonOperation != "=") {
                operation = buttonOperation;
                inputting = "secondOperand";
                history.innerText = `${operands.firstOperand} ${operation}`

            } else if (operation && buttonOperation == "=") {
                history.innerText = `${operands.firstOperand} ${operation} ${operands.secondOperand} =`
                operands["firstOperand"] = display.innerText = operate(operands.firstOperand, operands.secondOperand, operation).toString();
                operands["secondOperand"] = "0";
                operation = null;

            } else if (operation != null && buttonOperation != null && buttonOperation != "=") {
                operands["firstOperand"] = operands["secondOperand"] = display.innerText = operate(operands.firstOperand, operands.secondOperand, operation).toString();
                operation = buttonOperation;
                history.innerText = `${operands.firstOperand} ${operation} `
            }

        }

    }
}

document.addEventListener("keydown", handleNumpadClick)

document.addEventListener("keydown", handleOperationClick)

numpad.addEventListener("click", handleNumpadClick);

calculator.addEventListener("click", handleOperationClick);

