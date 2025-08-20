// Query Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");



// Variables
let num1;
let num2;
let currentOperator;



// Math Operation Functions
function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };


function operate(num1, num2, operator) {
    let result;

    if (operator === "+") { result = add(num1, num2) };
    if (operator === "-") { result = subtract(num1, num2) };
    if (operator === "*") { result = multiply(num1, num2) };
    if (operator === "/") { result = divide(num1, num2) };

    return result;
}

//This function is doing a lot
function compute() {
    if (num1 && currentOperator && captureDisplay() !== num1 && captureDisplay() !== 0) {
        assignNum2();
        let result = operate(num1, num2, currentOperator);
        updateDisplay(result);
        num1 = result;
        num2 = undefined;
    }
}



// Program Functions
function clearProgram(str) {
    num1 = undefined;
    num2 = undefined;
    currentOperator = undefined;
    clearDisplay();
    updateDisplay(str);
}

function addDigit(strNum) {
    if (displayIsZero()) {
        clearDisplay();
    }
    // Conditional to allow for adding num2
    if (num1 === captureDisplay()) {
        clearDisplay();
    }

    display.textContent += strNum;
}

function updateOperator(operatorInput) {
    if (!displayIsZero() && !num1) {
        assignNum1()
    }
    //
    if (captureDisplay() !== num1) {
        // This makes it so that I can't divide 5 by 5...or similar
        compute()
    }
    assignOperand(operatorInput);
}

function assignNum1() {
    num1 = captureDisplay();
}

function assignNum2() {
    num2 = captureDisplay();
}

function assignOperand(operatorInput) {
    currentOperator = operatorInput;
}


// Feature Functions
function evaluateDisplayLength() {
    return display.textContent.length;
}

function addDecimal(str) {
    if (!containsDecimal()) {
        display.textContent += str;
    }
}

function findDecimalIndex() {
    return display.textContent.indexOf(".");
}

function containsDecimal() {
    return display.textContent.includes(".");
}


// Screen Functions
function displayIsZero() {
    return display.textContent === "0";
}

function clearDisplay() {
    display.textContent = "";
}

function captureDisplay() {
    return +(display.textContent);
}

function updateDisplay(message) {
    display.textContent = message;
}



// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clearProgram("0"); break;
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

        //Every time I hit this button it adds a decimal
        case "decimal": addDecimal("."); break;
        case "backspace": eraseLastNum(); break;
        case "compute": compute(); break;
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

        //Every time I hit this button it adds a decimal
        case ".": addDecimal("."); break;
        case "Enter": compute(); break;
    }
});


// Refactor 2"
// const container = document.querySelector(".container");
// const display = document.querySelector(".display");
// const decimalButton = document.querySelector("#decimal");
// const backspaceButton = document.querySelector("#backspace");

// const addButton = document.querySelector("#add");
// const subtractButton = document.querySelector("#subtract");
// const multiplyButton = document.querySelector("#multiply");
// const divideButton = document.querySelector("#divide");


// Variables
// let num1 = false;
// let num2 = false;
// let currentOperator = false;
// let timeToAddNum2 = false;
// let timeToCompute = false;
// let answer = false;
// let equationInProgress = false;



// Program Operation Functions

// function addDigit(numStr) {

//     if (displayIsZero() && !num1) {
//         removeZero();
//     } else if (captureDisplay() === "Nice Try") {
//         clearDisplay();
//     } else if (timeToAddNum2 || equationInProgress) {
//         console.log("On to num2");

//         if (timeToAddNum2) {
//             console.log("Adding number 2");
//             timeToAddNum2 = false;
//             clearDisplay();
//         }
//     }

//     addToDisplay(numStr);
// }


// function updateOperator(operator) {

//     if (!num1 && captureDisplay() !== "0") {
//         captureNum1();
//         timeToAddNum2 = true;
//         timeToCompute = true;
//         console.log("timeToAddNum2: True");
//     } else if (num1) {
//         captureNum2();
//         compute();
//     }

//     currentOperator = operator;
// }


// function compute() {
//     console.log("compute() called");
//     // Capture num2 and run operation
//     if (!num2 && captureDisplay() !== "Nice Try") {
//         console.log("Capture num2 and run operation");
//         captureNum2();
//         // clearDisplay();
//         num1 = +num1;
//         num2 = +num2;

//         operate(num1, num2, currentOperator);
//     }
// User using operator buttons to compute (num2 already captured)
//     else if (num1 !== captureDisplay() && num2) {
//         console.log("Already have num2");
//         // clearDisplay();
//         num1 = +num1;
//         num2 = +num2;

//         operate(num1, num2, currentOperator);
//     }
// }


// function operate(num1, num2, currentOperator) {
//     console.log("operate() called");
//     let result;

//     if (currentOperator === "/" && num2 === 0) {
//         clearProgram("Nice Try");
//         return;
//     }

//     if (currentOperator === "+") { result = add(num1, num2); }
//     if (currentOperator === "-") { result = subtract(num1, num2) }
//     if (currentOperator === "*") { result = multiply(num1, num2) }
//     if (currentOperator === "/") { result = divide(num1, num2) }

//     let answer = result.toString();

//     clearDisplay();
//     addToDisplay(answer);
//     useAnswerForNextEquation();
// }

// function evaluateVariables() { }

// function evaluateResult(result) { }

// function addDecimal() {
//     let decimalPresent = false;
//     //Check for decimal
//     if (display.textContent.includes(".")) {
//         decimalPresent = true;
//     }
// If there is no decimal and the display is zero, add a decimal
// else if (!decimalPresent && displayIsZero()) {
//     updateDisplay(".")
// }
// Else, add a decimal
//     else {
//         updateDisplay(".")
//     }
// }

// function roundDecimalCheck(result) {
//     let resultStr = result.toString();

//     if (resultStr.length > 11 && resultStr.includes(".")) {
//         let decimalIndex = resultStr.indexOf(".");
//         let placeValue = 11 - decimalIndex;

//         let roundedResult = roundToPlace(result, placeValue).toString();
//         return roundedResult;
//     }
//     else { return result }



//     function roundToPlace(number, place) {
//         const multiplier = Math.pow(10, place);
//         return Math.round(number * multiplier) / multiplier;
//     }
// }

// Program Helper Functions
// function readyToAddNum2() {
//     return num1 && currentOperator && !timeToAddNum2;
// }

// function captureNum1() {
//     console.log("captureNum1() called");
//     num1 = captureDisplay();
// console.log(`Num1 = ${num1}`);
// }

// function captureNum2() {
//     console.log("captureNum2() called");
//     num2 = captureDisplay();
// console.log(`Num2 = ${num2}`);
// }

// function useAnswerForNextEquation() {
//     console.log("useAnswerForNextEquation() called");
//     num1 = captureDisplay();
//     num2 = false;
//     currentOperator = false;
//     timeToAddNum2 = false;
//     timeToCompute = false;
//     equationInProgress = true;
// }


// function clearProgram(str) {
//     console.log("clearProgram() called");
//     display.textContent = str;
//     num1 = false;
//     num2 = false;
//     currentOperator = false;
//     timeToAddNum2 = false;
//     timeToCompute = false;
//     answer = false;
//     equationInProgress = false;
// }


// Display Functions

// function addToDisplay(numStr) {
//Check to make sure number fits the display
//     if (fitsDisplay()) {
//         display.textContent += numStr;
//     } else {
//         console.log("Does not fit display");
//     }
// }

// function captureDisplay() {
//     return display.textContent;
// }

// function displayIsZero() {
//     return display.textContent === "0";
// }

// function clearDisplay() {
//     display.textContent = "";
// }

// function fitsDisplay(numStr) {
//     return display.textContent.length < 11;
// }

// function removeZero() {
//     display.textContent = "";
// }