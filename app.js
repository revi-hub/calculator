function add(a, b) {
    let intA = parseInt(a), intB = parseInt(b);
    if(!isNaN(intA) &&  !isNaN(intB))
        return intA + intB;
    else
        return 'ERROR'
}

function substract(a, b) {
    let intA = parseInt(a), intB = parseInt(b);
    if(!isNaN(intA) &&  !isNaN(intB))
        return intA - intB;
    else
        return 'ERROR'
}

function multiply(a, b) {
    let intA = parseInt(a), intB = parseInt(b);
    if(!isNaN(intA) &&  !isNaN(intB))
        return intA * intB;
    else
        return 'ERROR'
}

function divide(a, b) {
    let intA = parseInt(a), intB = parseInt(b);
    if(!isNaN(intA) &&  !isNaN(intB)){
        if(intA == 0 && intB == 0)
            return 'Result is undefined';
        else if(intB == 0)
            return 'Cannot divide by zero';
        else
            return intA / intB;
    }
    else
        return 'ERROR'
}

let a = null, b = null, operation = null, inputting = "a";


function operate(a, b, operation) {
    if(a != null && b != null && operation != null) {

        switch (operation) {
            case '+':
                return add(a, b);
                break;
            case '-':
                return substract(a, b);
                break;
            case '*':
                return multiply(a, b);
                break;
            case '/':
                return divide(a, b);
                break;
        }

    }
        
}
const displayText = document.querySelector("#display-text");
const numpad = document.querySelector("#numpad");
const operations = document.querySelector("#operations");

numpad.addEventListener("click", (event) => {
    if(event.target.classList.contains("number"))
        if(inputting == "a") {
            if(a == null) {
                a = event.target.innerText;
                displayText.innerText = event.target.innerText;
            } else {
                a += event.target.innerText;
                displayText.innerText += event.target.innerText;
            }
        }
        if(inputting == "b") {
            if(b == null) {
                b = event.target.innerText;
                displayText.innerText = event.target.innerText;
            } else {
                b += event.target.innerText;
                displayText.innerText += event.target.innerText;
            }
        }
    });

operations.addEventListener("click", (event) => {
    if(event.target.classList.contains("operation-button")) {
        if(a != null && b != null && operation != null) {
            let result = operate(a, b, operation);
            displayText.innerText = result
            if(typeof result !== "number" && isNaN) {
                a = null;
                inputting = 'a';
            } else {
                a = result.toString();
            }
            if(event.target.innerText == '=')
                b = operation = null;
            else {
                b = null;
                operation = event.target.innerText;
            } 

        } else {
            operation = event.target.innerText;
            inputting = 'b';
        }
    }
        
});
