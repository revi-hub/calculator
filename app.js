let firstOperand = 0, secondOperand = null, operation = null, inputting = "firstOperand";

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

        if (inputting == "firstOperand") {
            if (firstOperand == "0" && operation != null) {
                inputting = "secondOperand";
                secondOperand = buttonNumber;
                display.innerText = buttonNumber;
            } else if (firstOperand == null || firstOperand == "0") {
                firstOperand = buttonNumber;
                display.innerText = buttonNumber;

            } else {
                firstOperand += buttonNumber;
                display.innerText += buttonNumber;
            }

        } else if (inputting == "secondOperand") {
            if (secondOperand == null || secondOperand == "0") {
                secondOperand = buttonNumber;
                display.innerText = buttonNumber;

            } else {
                secondOperand += buttonNumber;
                display.innerText += buttonNumber;
            }
        }
    }
});

calculator.addEventListener("click", (event) => {
    const buttonClicked = event.target;

    if (buttonClicked.classList.contains("operation-button")) {
        const buttonOperation = buttonClicked.innerText;

        if(!operation && buttonOperation != "=") {
            operation = buttonOperation;
            firstOperand ? inputting = "secondOperand" : inputting = "firstOperand";

        } else if(operation && buttonOperation == "=") {
            firstOperand = display.innerText =  operate(firstOperand, secondOperand, operation).toString();
            secondOperand = null;
            operation = null;

        } else if(operation == buttonOperation && buttonOperation != "=") {
            firstOperand = display.innerText =  operate(firstOperand, secondOperand, operation).toString();
            secondOperand = null;
        }
    }
});

