let operands = {
    firstOperand: "0",
    secondOperand: "0"
}
let operation = null, inputting = "firstOperand";

const history = document.querySelector("#calculations-history")
const display = document.querySelector("#display");
const numpad = document.querySelector("#numpad");
const calculator = document.querySelector("#calculator");

function add(a, b) {
    return a + b;
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

    switch (operation) {
        case '+':
            return add(a, b);

        case '-':
            return substract(a, b);

        case '×':
            return multiply(a, b);

        case '÷':
            if (b == 0) {
                alert("Cannot divide by zero!");
                return a;
            }
            return divide(a, b);
    }
}

function handleNumpadClick(event) {
    const buttonClicked = event.target;
    if (buttonClicked.classList.contains("number")) {
        const buttonNumber = buttonClicked.innerText;

        if (operands["firstOperand"] == "0" && operation != null) {
            inputting = "secondOperand";
            operands[inputting] = buttonNumber;
            display.innerText = buttonNumber;

        } else if (!operands[inputting] || operands[inputting] == "0") {
            operands[inputting] = buttonNumber;
            display.innerText = buttonNumber;

        } else {
            operands[inputting] += buttonNumber;
            display.innerText += buttonNumber;
        }
    }
}

function handleOperationClick(event) {
    const buttonClicked = event.target;

    if (buttonClicked.classList.contains("operation-button")) {
        const buttonOperation = buttonClicked.innerText;

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

    } else if (buttonClicked.id == "clear-button") {
        display.innerText = "0";
        history.innerText = ``;
        operands["firstOperand"] = "0";
        operands["secondOperand"] = "0";
        operation = null;
        inputting = "firstOperand";

    } else if (buttonClicked.id == "clear-element-button") {

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

    } else if (buttonClicked.id == "change-sign-button") {
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
    } else if (buttonClicked.id == "float-button") {
        if (!operands[inputting].includes(".")) {
            const float = makeFloat(operands[inputting]);
            operands[inputting] = float;
            display.innerText = float;
        }
    } else if (buttonClicked.id == "display"){
        navigator.clipboard.writeText(display.innerText);
        alert("Saved number to clipboard!")
    }

}

numpad.addEventListener("click", handleNumpadClick);

calculator.addEventListener("click", handleOperationClick);

