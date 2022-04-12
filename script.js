
//Operation Functions
function add (n1, n2) {
    return n1 + n2;
}
function subtract (n1, n2) {
    return n1 - n2;
}
function multiply (n1, n2) {
    return n1 * n2;
}
function divide (n1, n2) {
    return n1 / n2;
}
//Operator Function 

function operatorFun (operator, n1, n2) {
    if (operator === '+') {
        add(n1, n2);
    } else if (operator === '-') {
        subtract(n1, n2);
    } else if (operator === '*') {
        multiply(n1, n2);
    } else if (operator === '/') {
        divide(n1, n2);
    }
}
const display = document.querySelector('.display');
const numBtns = document.querySelectorAll('.num');
numBtns.forEach(btn => btn.addEventListener('click', displayVal))
function displayVal (e) {
    display.textContent = e.target.textContent;
}
const operators = document.querySelector('.operators');
const operatorsBtns = operators.querySelectorAll('button');
const equal = document.getElementById('equal');
operatorsBtns.forEach(btn => btn.addEventListener('click', store))
function store (e) {
    let operator = e.target.textContent;
    let firstNum = parseInt(display.textContent);
    console.log(operator)
    console.log(firstNum)
    equal.addEventListener('click', runOperate)
    function runOperate() {
        console.log(operatorFun(operator, firstNum, 2));
        
    }
    
}


