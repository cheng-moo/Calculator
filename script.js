
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

function operator (operator, n1, n2) {
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