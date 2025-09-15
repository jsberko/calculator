// Query Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");


// Variables
let num1;
let num2;
let currentOperator;
let result;
let readyForNum1 = true;
let readyForNum2 = false;
let readyToCalculate = false;
let runningCalculation = false;


// Math Functions
function add(a, b) { return a + b };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) {
    if (b === 0) {
        return "Nice Try";
    } else {
        return a / b;
    }
}


// Program Functions
function addDigit(numInput) {

    if (addingNum1()) {
        clearDisplay();
    }

    if (continuingCalculation()) {
        clearDisplay();
        updateVariables();
    }

    if (resultIsPresent()) {
        clearDisplay();
        resetVariables();
    }

    if (addingNum2()) {
        clearDisplay();
        readyForNum2 = false;
        readyToCalculate = true;
    }

    // Default behavior, including check to prevent user input from overflowing display
    if (inputFitsDisplay()) {
        display.textContent += numInput;
    }
}


function updateOperator(operatorInput) {
    if (readyToAssignNum1()) {
        assignNum1()
    }

    if (resultIsPresent()) {
        updateVariables();
    }

    if (readyToCompute()) {
        compute();
        runningCalculation = true;
    }

    // Default behavior
    currentOperator = operatorInput;
}


function compute() {

    if (readyToCompute() && calculationResultNotCurrentlyDisplayed()) {
        assignNum2();
        result = operate(num1, num2, currentOperator);
        console.log(`${num1}${currentOperator}${num2} = ${result}`)

        updateDisplay(result);
        readyToCalculate = false;
    }
}


function operate(num1, num2, operator) {

    if (operator === "+") { result = add(num1, num2) };
    if (operator === "-") { result = subtract(num1, num2) };
    if (operator === "*") { result = multiply(num1, num2) };
    if (operator === "/") { result = divide(num1, num2) };

    if (resultNeedsRounding(result)) {
        result = roundResult(result);
    }

    return result;
}


function roundResult(workingNum) {
    console.log("roundResult() called");
    let workingStr = workingNum.toString();

    if (workingStr.includes(".")) {
        let decimalIndex = workingStr.indexOf(".");
        return parseFloat(workingNum.toFixed(10 - decimalIndex).toString());
    } else {
        return "Too Big";
    }
}


function clearProgram() {
    resetVariables();
    updateDisplay("0");
}


function resetVariables() {
    num1 = undefined;
    num2 = undefined;
    currentOperator = undefined;
    result = undefined;
    readyForNum1 = true;
    readyForNum2 = false;
    readyToCalculate = false;
    runningCalculation = false;
    console.log("Reset variables for new calculation");
}


function updateVariables() {
    num1 = result;
    num2 = undefined;
    result = undefined;
    readyForNum2 = true;
    readyToCalculate = false;
    runningCalculation = false;
    console.log("Continue calculation");
}


function assignNum1() {
    num1 = displayNum();
    readyForNum2 = true;
}


function assignNum2() {
    num2 = displayNum();
}


// Feature Functions
function eraseLastNum() {
    if (calculationResultNotCurrentlyDisplayed() && !readyForNum2) {
        if (currentDisplay().length === 1) {
            console.log("Erasing");
            updateDisplay("0");
        } else {
            updateDisplay(currentDisplay().slice(0, -1));
        }
    }
}


function addDecimal(str) {
    if (!containsDecimal() && calculationResultNotCurrentlyDisplayed()) {
        display.textContent += str;
    }
}


// Display Functions
function updateDisplay(message) {
    display.textContent = message;
}

function displayIsZero() {
    return currentDisplay() === "0";
}

function displayLength() {
    return currentDisplay().length;
}

function clearDisplay() {
    display.textContent = "";
}

function currentDisplay() {
    return display.textContent;
}

function displayNum() {
    return +currentDisplay();
}

function noErrorMessages() {
    return currentDisplay() !== "Nice Try" && currentDisplay() !== "Too Big";
}


// Helper Functions
function readyToAssignNum1() {
    return !num1 && num1 !== 0;
}

function addingNum1() {
    return currentDisplay() === "0" && !num1;
}

function addingNum2() {
    return readyForNum2 || readyToCalculate && displayIsZero();
}

function readyToCompute() {
    return readyToCalculate;
}

function calculationResultNotCurrentlyDisplayed() {
    return result !== displayNum();
}

function resultIsPresent() {
    return result || result === 0;
}

function continuingCalculation() {
    return runningCalculation;
}

function inputFitsDisplay() {
    return displayLength() < 11;
}

function containsDecimal() {
    return currentDisplay().includes(".");
}

function resultNeedsRounding(result) {
    return result.toString().length >= 11;
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    if (target.id === "AC") {
        clearProgram();
        console.clear();
    }

    // Check to force user to clear program after receiving error message
    if (noErrorMessages()) {
        switch (target.id) {
            case "zero": addDigit("0"); break;
            case "one": addDigit("1"); break;
            case "two": addDigit("2"); break;
            case "three": addDigit("3"); break;
            case "four": addDigit("4"); break;
            case "five": addDigit("5"); break;
            case "six": addDigit("6"); break;
            case "seven": addDigit("7"); break;
            case "eight": addDigit("8"); break;
            case "nine": addDigit("9"); break;

            case "add": updateOperator("+"); break;
            case "subtract": updateOperator("-"); break;
            case "multiply": updateOperator("*"); break;
            case "divide": updateOperator("/"); break;

            case "decimal": addDecimal("."); break;
            case "backspace": eraseLastNum(); break;
            case "compute": compute(); break;
        }
    }
})

document.addEventListener('keydown', (event) => {
    console.log(event.key);

    switch (event.key) {
        case "Escape": clearProgram(); console.clear(); break;

        case "0": addDigit("0"); break;
        case "1": addDigit("1"); break;
        case "2": addDigit("2"); break;
        case "3": addDigit("3"); break;
        case "4": addDigit("4"); break;
        case "5": addDigit("5"); break;
        case "6": addDigit("6"); break;
        case "7": addDigit("7"); break;
        case "8": addDigit("8"); break;
        case "9": addDigit("9"); break;

        case "+": updateOperator("+"); break;
        case "-": updateOperator("-"); break;
        case "*": updateOperator("*"); break;
        case "/": updateOperator("/"); break;

        case ".": addDecimal("."); break;
        case "Enter": compute(); break;
    }
});