// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");




// Variables
let num1 = null;
let num2 = null;
let operator = null;

let numDisplay = "";




// Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operator) {
    if (operator === "add") {
        let result = add(num1, num2);
        updateDisplay(`${result}`);
    }
    if (operator === "subtract") {
        let result = subtract(num1, num2);
        updateDisplay(`${result}`);
    }
    if (operator === "multiply") {
        let result = multiply(num1, num2);
        updateDisplay(`${result}`);
    }
    if (operator === "divide") {
        let result = divide(num1, num2);
        updateDisplay(`${result}`);
    }
}


function captureDigit(operatorType) {
    if (num1 === null) {
        operator = operatorType;

        console.log(display.textContent);
        num1 = parseInt(numDisplay);
        numDisplay = "";
    } else {
        console.log(display.textContent);
        num2 = parseInt(numDisplay);
        numDisplay = "";

        operate(num1, num2, operator);
    }
}


function updateDisplay(num) {
    numDisplay += num;
    display.textContent = numDisplay;
}


function clear() {
    display.textContent = "0"
    num1 = null;
    operator = null;
    num2 = null;
    numDisplay = "";
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
        case "negate": display.textContent = "negate"; break;
        case "percent": console.log("Percent button pushed"); break;
        case "divide": captureDigit("divide"); break;

        case "seven": updateDisplay("7"); break;
        case "eight": updateDisplay("8"); break;
        case "nine": updateDisplay("9"); break;
        case "multiply": captureDigit("multiply"); break;

        case "four": updateDisplay("4"); break;
        case "five": updateDisplay("5"); break;
        case "six": updateDisplay("6"); break;
        case "subtract": captureDigit("subtract"); break;

        case "one": updateDisplay("1"); break;
        case "two": updateDisplay("2"); break;
        case "three": updateDisplay("3"); break;
        case "add": captureDigit("add"); break;

        case "zero": updateDisplay("0"); break;
        case "decimal": updateDisplay("."); break;
        case "equals": captureDigit(); break;
    }
})
