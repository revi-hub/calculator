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

let a = null, b = null, operation = null;


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

numpad.addEventListener("click", (event) => {
    switch (event.target.innerText) {
        case '1':
            displayText.innerText = '1'
            break;
        case '2':
            displayText.innerText = '2'
            break;
        case '3':
            displayText.innerText = '3'
            break;
        case '4':
            displayText.innerText = '4'
            break;
        case '5':
            displayText.innerText = '5'
            break;
        case '6':
            displayText.innerText = '6'
            break;
        case '7':
            displayText.innerText = '7'
            break;
        case '8':
            displayText.innerText = '8'
            break;
        case '9':
            displayText.innerText = '9'
            break;
        case '0':
            displayText.innerText = '0'
            break;
        default:
            break;
    }
});

