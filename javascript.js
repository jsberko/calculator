// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");




// Variables
let num1 = null;
let num2 = null;
let operator = null;

let workingNum = "";
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


function updateOperator(operatorType) {
    num1 = workingNum;
    operator = operatorType;
    workingNum = "";
}

function compute() {
    num2 = workingNum;

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    operate(num1, num2, operator);
}

function updateVariables() {

}


function updateWorkingNum(num) {
    workingNum += num;

    updateDisplay(workingNum);
}

function updateDisplay(text) {
    display.textContent = text;
}

function negateWorkingNum() {
    workingNum = (workingNum * -1).toString();

    updateDisplay(workingNum);
}


function percentageOfWorkingNum() {
    if (workingNum.length <= 1) {
        workingNum = `0.0${workingNum}`;
    } else if (workingNum.length <= 2) {
        workingNum = `0.${workingNum}`;
    } else if (workingNum.length >= 3) {
        let workingNumArr = workingNum.split("");
        let spliceIndex = workingNumArr.length - 2;
        workingNumArr.splice(spliceIndex, 0, ".");

        workingNum = workingNumArr.join("");
    }
    updateDisplay(workingNum);
}

function clear() {
    display.textContent = "0"
    num1 = null;
    operator = null;
    num2 = null;
    workingNum = "";
    newNum = "";
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
        case "negate": negateWorkingNum(); break;
        case "percent": percentageOfWorkingNum(); break;
        case "divide": updateOperator("divide"); break;

        case "seven": updateWorkingNum("7"); break;
        case "eight": updateWorkingNum("8"); break;
        case "nine": updateWorkingNum("9"); break;
        case "multiply": updateOperator("multiply"); break;

        case "four": updateWorkingNum("4"); break;
        case "five": updateWorkingNum("5"); break;
        case "six": updateWorkingNum("6"); break;
        case "subtract": updateOperator("subtract"); break;

        case "one": updateWorkingNum("1"); break;
        case "two": updateWorkingNum("2"); break;
        case "three": updateWorkingNum("3"); break;
        case "add": updateOperator("add"); break;

        case "zero": updateWorkingNum("0"); break;
        case "decimal": updateWorkingNum("."); break;
        case "compute": compute(); break;
    }
})
