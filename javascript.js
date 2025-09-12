// Bugs to Fix
// 17.6*6 = 105.600000...how to trim zeros?
// Negating a result breaks the program
// Pressing the percentage button works only one time


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
function addDigit(strNum) {
    // Conditional to handle "0" at beginning of program
    if (currentDisplay() === "0" && !num1) {
        clearDisplay();
    }

    // Resetting for new equation
    if (result || result === 0) {
        clearDisplay();
        resetCalculation();

        console.log("Start new calculation")
    }

    // Adding number 2
    if (readyForNum2 || readyToCalculate && displayIsZero()) {
        clearDisplay();
        readyForNum2 = false;
        readyToCalculate = true;
    }

    // Default behavior, including check to prevent overflowing display
    if (displayLength() < 11) {
        display.textContent += strNum;
    }
}

function updateOperator(operatorInput) {
    // Assigning num1 for the first time 
    if (!num1 && num1 !== 0) {
        assignNum1()
    }

    // Performing a running calculation 
    if (result || result === 0) {
        // if (currentDisplay() !== result) {
        //     console.log("Update result");
        //     result = currentDisplay;
        // }
        continueCalculation();
    }

    // Allowing operator button to perform calculation when num1, operator, and num2 are present
    if (readyToCalculate) {
        compute();
    }

    // Default behavior
    assignOperand(operatorInput);
}


function continueCalculation() {
    num1 = result;
    num2 = undefined;
    result = undefined;
    readyForNum2 = true;
    readyToCalculate = false;
    console.log("Continue calculation");
}


function resetCalculation() {
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    readyForNum1 = true;
    readyToCalculate = false;
    console.log("Reset calculation");
}


function compute() {

    if (readyToCalculate && result !== displayNum()) {
        assignNum2();
        result = operate(num1, num2, currentOperator);
        console.log(`${num1}${currentOperator}${num2} = ${result}`)

        updateDisplay(result);
    }
}


function operate(num1, num2, operator) {

    if (operator === "+") { result = add(num1, num2) };
    if (operator === "-") { result = subtract(num1, num2) };
    if (operator === "*") { result = multiply(num1, num2) };
    if (operator === "/") { result = divide(num1, num2) };

    console.log(result);

    if (resultNeedsRounding(result)) {
        result = roundResult(result);
    }

    return result;
}


// Currently Working On
function roundResult(workingResult) {
    console.log("roundResult() called");
    let stringResult = workingResult.toString();

    if (stringResult.includes(".")) {
        let decimalIndex = stringResult.indexOf(".");

        return workingResult.toFixed(10 - decimalIndex);
    } else {
        return "Too Big";
    }
}



function clearProgram() {
    num1 = undefined;
    num2 = undefined;
    currentOperator = undefined;
    result = undefined;
    readyForNum1 = false;
    readyForNum2 = false;
    readyToCalculate = false;
    clearDisplay();
    updateDisplay("0");
}


function assignNum1() {
    num1 = displayNum();
    readyForNum2 = true;
}

function assignNum2() {
    num2 = displayNum();
}

function assignOperand(operatorInput) {
    currentOperator = operatorInput;
}


// Feature Functions
function eraseLastNum() {
    if (displayNum() !== result && !readyForNum2) {
        if (currentDisplay().length === 1) {
            console.log("Erasing");
            updateDisplay("0");
        } else {
            updateDisplay(currentDisplay().slice(0, -1));
        }
    }
}


function addDecimal(str) {
    if (!containsDecimal()) {
        display.textContent += str;
    }
}


function percentageOfCurrentDisplay() {
    if (displayNum() !== result && currentDisplay() !== "0" && !currentDisplay().includes(".")) {
        // let percentagedResult = display.textContent;

        if (currentDisplay().length === 1) {
            updateDisplay(`0.0${currentDisplay()}`);
        } else if (currentDisplay().length === 2) {
            updateDisplay(`0.${currentDisplay()}`);
        } else {
            // let currentDisplay = currentDisplay();
            let index = currentDisplay().length - 2;
            let part1 = currentDisplay().slice(0, index);
            let part2 = currentDisplay().slice(index);

            updateDisplay(parseFloat(`${part1}.${part2}`))
        }
    }
}


function negateDisplay() {
    if (displayNum() !== result) {
        if (!currentDisplay().includes("-") && currentDisplay() !== "0") {
            let negate = "-";

            updateDisplay(negate + currentDisplay());
        } else if (currentDisplay().includes("-")) {

            updateDisplay(currentDisplay().slice(1));
        }
    }

    // if (!currentDisplay().includes("-") && currentDisplay() !== "0") {
    //     let negate = "-";

    //     updateDisplay(negate + currentDisplay());
    // } else if (currentDisplay().includes("-")) {

    //     updateDisplay(currentDisplay().slice(1));
    // }
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

function niceTry() {
    return currentDisplay() === "Nice Try";
}

function tooBig() {
    return currentDisplay() === "Too Big";
}

function noErrorMessages() {
    return !niceTry() && !tooBig();
}


// Helper Functions
function findDecimalIndex() {
    return currentDisplay().indexOf(".");
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
    }

    // Check to force user to clear program after receiving error message
    if (noErrorMessages()) {
        switch (target.id) {
            case "negate": negateDisplay(); break;
            case "percent": percentageOfCurrentDisplay(); break;

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
        case "Escape": clear(); break;
        case "_": negateDisplay(); break;
        case "%": percentageOfCurrentDisplay(); break;

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