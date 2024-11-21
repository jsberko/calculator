// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");
const decimalButton = document.querySelector("#decimal");


// Variables
let num1 = null;
let num2 = null;
let operator = null;
let nextOperator = null;
let displayNum = "";



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

function operate(num1, num2, operator, nextOperator) {
    if (operator === "+") {
        let result = add(num1, num2);
        console.log(`Add: ${num1} ${num2}`);
        updateDisplay(`${result}`);
        updateVariables(result, nextOperator);
    }
    if (operator === "-") {
        let result = subtract(num1, num2);
        console.log(`Subtract: ${num1} ${num2}`);
        updateDisplay(`${result}`);
        updateVariables(result, nextOperator);
    }

    if (operator === "*") {
        let result = multiply(num1, num2);
        console.log(`Multiply: ${num1} ${num2}`);
        updateDisplay(`${result}`);
        updateVariables(result, nextOperator);
    }
    if (operator === "/") {
        let result = divide(num1, num2);
        console.log(`Divide: ${num1} ${num2}`);
        updateDisplay(`${result}`);
        updateVariables(result, nextOperator);
    }
}

function updateVariables(result, nextOperator) {
    console.log("updateVariables called");
    num1 = result;
    num2 = null;
    operator = nextOperator;
    displayNum = "";
}


function updateOperator(operatorType) {
    console.log("updateOperator called");
    if (num1 === null) {
        //Capturing num1 first time
        console.log("First num1 capture");
        num1 = displayNum;
        displayNum = "";
        operator = operatorType;
    } else if (num1 && !operator) {
        console.log("Let's add num2!");
        operator = operatorType;
    } else if (num1 && num2 === null && operator) {
        console.log("Let's compute the current expression");
        nextOperator = operatorType;
        compute(nextOperator);
    }
}


function clearDisplay() {
    updateDisplay("0");
}

function compute(nextOperator) {
    console.log("compute called");
    //Capturing num2
    console.log("num2 captured");
    num2 = displayNum;
    // displayNum = "";
    num1 = +num1;
    num2 = +num2;
    // console.log(`num1: ${num1}`);
    // console.log(`num2: ${num2}`);

    operate(num1, num2, operator, nextOperator);
}

function updateDisplayNum(num) {
    displayNum += num;
    updateDisplay(displayNum);

}

function updateDisplay(text) {
    display.textContent = text;
}

function negatedDisplayNum() {
    displayNum = (displayNum * -1).toString();

    updateDisplay(displayNum);
}


//If I hit this button twice it adds another decimal
function percentageOfDisplayNum() {
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
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
        case "negate": negatedDisplayNum(); break;
        case "percent": percentageOfDisplayNum(); break;
        case "divide": updateOperator("/"); break;

        case "seven": updateDisplayNum("7"); break;
        case "eight": updateDisplayNum("8"); break;
        case "nine": updateDisplayNum("9"); break;
        case "multiply": updateOperator("*"); break;

        case "four": updateDisplayNum("4"); break;
        case "five": updateDisplayNum("5"); break;
        case "six": updateDisplayNum("6"); break;
        case "subtract": updateOperator("-"); break;

        case "one": updateDisplayNum("1"); break;
        case "two": updateDisplayNum("2"); break;
        case "three": updateDisplayNum("3"); break;
        case "add": updateOperator("+"); break;

        case "zero": updateDisplayNum("0"); break;
        //Every time I hit this button it adds a decimal
        case "decimal": updateDisplayNum("."); break;
        case "compute": compute(); break;
    }
})
