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