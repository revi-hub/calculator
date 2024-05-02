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

