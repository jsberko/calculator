// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");
const decimalButton = document.querySelector("#decimal");
const backspaceButton = document.querySelector("#backspace");

const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");


// Variables
let num1 = null;
let num2 = null;
let currentOperator = null;
let onDeckOperator = null;
let currentDisplay = "";

let result = null;

// Functions
function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) {
    if (b === 0) {
        return "Nice try";
    } else {
        return a / b;
    }
}


function operate(num1, num2, currentOperator, onDeckOperator) {
    // let result;

    if (currentOperator === "+") {
        result = add(num1, num2);
    }
    if (currentOperator === "-") {
        result = subtract(num1, num2);
    }

    if (currentOperator === "*") {
        result = multiply(num1, num2);
    }
    if (currentOperator === "/") {
        result = divide(num1, num2);
    }

    evaluateDisplay(`${result}`);
    updateVariables(result, onDeckOperator);
}


function updateVariables(result, onDeckOperator) {
    num1 = result;
    num2 = null;
    currentOperator = onDeckOperator;
    currentDisplay = "";
}


function evaluateDisplay(text) {
    if (text.length > 12 && decimalCheck(text) == false) {
        console.log(text.length);
        updateDisplay("Overflow");
    }
    if (text.length > 12 && decimalCheck(text) == true) {
        roundDecimal(text)
    }
    else (
        updateDisplay(text)
    )
}

function decimalCheck(text) {
    console.log("Decimal Check activated");
    console.log(`Decimal Check Results: ${text.includes(".")}`)
    return text.includes(".");
}

function roundDecimal(text) {
    let resultLength = text.length;
    // console.log(resultLength);
    let decimalIndex = text.indexOf(".");
    // console.log(decimalIndex);
    let placeValue = 11 - decimalIndex;
    // console.log(placeValue);
    let roundedResult = roundToPlace(text, placeValue).toString();
    console.log(roundedResult);

    updateDisplay(roundedResult);

    function roundToPlace(number, place) {
        const multiplier = Math.pow(10, place);
        return Math.round(number * multiplier) / multiplier;
    }
}

function updateDisplay(text) {
    display.textContent = text;
}

//If I press multiple operator buttons in a row weird things happen
function updateOperator(operatorType) {
    //Capturing num1 first time
    if (num1 === null) {
        num1 = currentDisplay;
        currentDisplay = "";
        currentOperator = operatorType;
        selectOperatorButton(currentOperator);
    } else if (num1 && !currentOperator) {
        currentOperator = operatorType;
        selectOperatorButton(currentOperator);
    } else if (num1 && num2 === null && currentOperator) {
        onDeckOperator = operatorType;
        selectOperatorButton(onDeckOperator);
        compute(onDeckOperator);
    }
}

function selectOperatorButton(currentOperator) {
    clearOperatorButtons();

    switch (currentOperator) {
        case "+": addButton.classList.add("highlight"); break;
        case "-": subtractButton.classList.add("highlight"); break;
        case "*": multiplyButton.classList.add("highlight"); break;
        case "/": divideButton.classList.add("highlight"); break;
    }
}

function clearOperatorButtons() {
    addButton.classList.remove("highlight");
    subtractButton.classList.remove("highlight");
    multiplyButton.classList.remove("highlight");
    divideButton.classList.remove("highlight");
}


function clearDisplay() {
    updateDisplay("0");
}


function compute(onDeckOperator) {
    clearOperatorButtons();
    if (num1 && currentOperator) {
        num2 = currentDisplay;
        num1 = +num1;
        num2 = +num2;

        operate(num1, num2, currentOperator, onDeckOperator);
    }

}



function addDigit(digitInput) {
    if (digitInput === "." && checkForDecimals(currentDisplay)) {
        console.log("User trying to stack .'s")
    } else if (currentDisplay === "" && digitInput === "0") {
        console.log("User trying to stack 0's")
    } else if (currentDisplay === "0" && digitInput !== "0") {
        currentDisplay = "";
        currentDisplay += digitInput;
        evaluateDisplay(currentDisplay);
    } else if (result === num1 && result !== null) {
        console.log("Time to reset for new equation");
        num1 = null;
        currentDisplay = digitInput;
        evaluateDisplay(currentDisplay)
    } else {
        if (currentDisplay.length < 11) {
            currentDisplay += digitInput;
            evaluateDisplay(currentDisplay)
        }
    }
}

//Does not work when a calculation result is displayed
function negateDisplay() {
    currentDisplay = (currentDisplay * -1).toString();

    updateDisplay(currentDisplay);
}


//If I hit this button twice it adds another decimal
function percentageOfCurrentDisplay() {

    if (currentDisplay === "0") {
        console.log("% of 0 is 0");
    }
    else if (checkForDecimals(currentDisplay) === false) {
        console.log("There is already a decimal in the display");
        if (currentDisplay.length <= 1) {
            currentDisplay = `0.0${currentDisplay}`;
        } else if (currentDisplay.length <= 2) {
            currentDisplay = `0.${currentDisplay}`;
        } else if (currentDisplay.length >= 3) {
            let currentDisplayArr = currentDisplay.split("");
            let spliceIndex = currentDisplayArr.length - 2;
            currentDisplayArr.splice(spliceIndex, 0, ".");

            currentDisplay = currentDisplayArr.join("");
        }
        updateDisplay(currentDisplay);
    }
}

function checkForDecimals(string) {
    return string.includes(".");
}

function eraseLastNum() {
    if (currentDisplay !== "0") {
        const indexToRemove = currentDisplay.length - 1;
        const newDisplayNum = currentDisplay.slice(0, indexToRemove);
        currentDisplay = newDisplayNum;
        updateDisplay(currentDisplay);

        if (currentDisplay === "") {
            clear();
        }
    }
}

function clear() {
    updateDisplay("0");
    num1 = null;
    num2 = null;
    currentOperator = null;
    onDeckOperator = null;
    result = null;
    currentDisplay = "";
    clearOperatorButtons()
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
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
        case "decimal": addDigit("."); break;
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
        case ".": addDigit("."); break;
        case "Enter": compute(); break;
    }
});
