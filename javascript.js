// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");




// Variables
let num1 = null;
let num2 = null;
let operator = null;

let displayNum = "";
let newNum = "";





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
    if (b === 0) {
        return "Nice try";
    } else {
        return a / b;
    }
}

function operate(num1, num2, operator) {
    if (operator === "add") {
        let result = add(num1, num2);
        updateDisplay(`${result}`);
        updateVariables(result);
    }
    if (operator === "subtract") {
        let result = subtract(num1, num2);
        updateDisplay(`${result}`);
        updateVariables(result);
    }

    if (operator === "multiply") {
        let result = multiply(num1, num2);
        updateDisplay(`${result}`);
        updateVariables(result);
    }
    if (operator === "divide") {
        let result = divide(num1, num2);
        updateDisplay(`${result}`);
        updateVariables(result);
    }
}

function updateVariables(result) {
    num1 = result;
    num2 = "";
    operator = null;
}


function updateOperator(operatorType) {
    operator = operatorType;

    num1 = displayNum;
}

function compute() {
    num2 = displayNum;

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    operate(num1, num2, operator);
}

function updateDisplayNum(num) {
    if (operator) {
        displayNum = ""
    }

    displayNum += num;

    updateDisplay(displayNum);
}

function updateDisplay(text) {
    display.textContent = text;
}

function negatedisplayNum() {
    displayNum = (displayNum * -1).toString();

    updateDisplay(displayNum);
}


function percentageOfdisplayNum() {
    if (displayNum.length <= 1) {
        displayNum = `0.0${displayNum}`;
    } else if (displayNum.length <= 2) {
        displayNum = `0.${displayNum}`;
    } else if (displayNum.length >= 3) {
        let displayNumArr = displayNum.split("");
        let spliceIndex = displayNumArr.length - 2;
        displayNumArr.splice(spliceIndex, 0, ".");

        displayNum = displayNumArr.join("");
    }
    updateDisplay(displayNum);
}

function clear() {
    display.textContent = "0"
    num1 = null;
    operator = null;
    num2 = null;
    displayNum = "";
    newNum = "";
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
        case "negate": negatedisplayNum(); break;
        case "percent": percentageOfdisplayNum(); break;
        case "divide": updateOperator("divide"); break;

        case "seven": updateDisplayNum("7"); break;
        case "eight": updateDisplayNum("8"); break;
        case "nine": updateDisplayNum("9"); break;
        case "multiply": updateOperator("multiply"); break;

        case "four": updateDisplayNum("4"); break;
        case "five": updateDisplayNum("5"); break;
        case "six": updateDisplayNum("6"); break;
        case "subtract": updateOperator("subtract"); break;

        case "one": updateDisplayNum("1"); break;
        case "two": updateDisplayNum("2"); break;
        case "three": updateDisplayNum("3"); break;
        case "add": updateOperator("add"); break;

        case "zero": updateDisplayNum("0"); break;
        case "decimal": updateDisplayNum("."); break;
        case "compute": compute(); break;
    }
})
