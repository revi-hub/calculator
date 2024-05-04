let operands = {
    firstOperand : "0",
    secondOperand : null
}
let operation = null, inputting = "firstOperand";

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
    if(b == null)
        return a;

    switch (operation) {
        case '+':
            return add(a, b);

        case '-':
            return substract(a, b);

        case '×':
            return multiply(a, b);

        case '÷':
            if(b == 0) {
                alert("Cannot divide by zero!");
                return a;
            }
            return divide(a, b);
    }
}

numpad.addEventListener("click", (event) => {
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
});

calculator.addEventListener("click", (event) => {
    const buttonClicked = event.target;

    if (buttonClicked.classList.contains("operation-button")) {
        const buttonOperation = buttonClicked.innerText;

        if(!operation && buttonOperation != "=") {
            operation = buttonOperation;
            operands["firstOperand"] ? inputting = "secondOperand" : inputting = "firstOperand";

        } else if(operation && buttonOperation == "=") {
            operands["firstOperand"] = display.innerText =  operate(operands.firstOperand, operands.secondOperand, operation).toString();
            operands["secondOperand"] = null;
            operation = null;

        } else if(operation == buttonOperation && buttonOperation != "=") {
            operands["firstOperand"] = display.innerText =  operate(operands.firstOperand, operands.secondOperand, operation).toString();
            operands["secondOperand"] = null;
        }

    } else if (buttonClicked.id == "clear-button") {
        display.innerText = "0";
        operands["firstOperand"] = "0";
        operands["secondOperand"] = null;
        operation = null;
        inputting = "firstOperand";

    } else if (buttonClicked.id == "clear-element-button") {

        if(operands["secondOperand"]  == null) {
            display.innerText = "0"
            operation = null;
            operands["firstOperand"] = "0";
            inputting = "firstOperand"

        } else {
            operands["secondOperand"] = null;
            display.innerText = "0"
        }

    } else if (buttonClicked.id == "change-sign-button") {
            switch (operands[inputting]) {

                case null:
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
        if(operands[inputting] != null && !operands[inputting].includes(".")) {
            const float = makeFloat(operands[inputting]);
            operands[inputting] = float;
            display.innerText = float;
        }
        }

});

