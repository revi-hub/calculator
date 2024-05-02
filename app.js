function add(a, b) {
    let intA = parseInt(a), intB = parseInt(b);
    if(!isNaN(intA) &&  !isNaN(intB))
        return intA + intB;
    else
        return 'ERROR'
}

function subtract(a, b) {
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