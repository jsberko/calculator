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
let displayNum = "";



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

//Idea: Current operator user button "lights up"


function operate(num1, num2, currentOperator, onDeckOperator) {
    let result;

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
    updateDisplay(`${result}`);
    updateVariables(result, onDeckOperator);
}

// function roundLongDecimals(result) {
//     console.log("roundNum initiated");
//     let workingResult = result.toString().split("");
//     if (workingResult.length - workingResult.indexOf(".") > 3) {
//         console.log(typeof (result.toFixed(3)));
//     }
// }

function updateVariables(result, onDeckOperator) {
    num1 = result;
    num2 = null;
    currentOperator = onDeckOperator;
    displayNum = "";
}

//If I press multiple operator buttons in a row weird things happen
function updateOperator(operatorType) {
    //Capturing num1 first time
    if (num1 === null) {
        num1 = displayNum;
        displayNum = "";
        currentOperator = operatorType;
        selectOperatorButton(currentOperator);
    }
    //Capturing num1 first time
    else if (num1 && !currentOperator) {
        currentOperator = operatorType;
        selectOperatorButton(currentOperator);
    }

    else if (num1 && num2 === null && currentOperator) {
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

function getDisplay() {
    displayNum = display.textContent;
}


function compute(onDeckOperator) {
    clearOperatorButtons();
    if (num1 && currentOperator) {
        num2 = displayNum;
        num1 = +num1;
        num2 = +num2;

        operate(num1, num2, currentOperator, onDeckOperator);
    }
}

function updateDisplayNum(num) {
    //Conditional to stop user from filling the display with zeros
    if (displayNum === "" && num === "0") {
        //do nothing
    } else {
        displayNum += num;
        updateDisplay(displayNum);
    }
}

function updateDisplay(text) {
    display.textContent = text;
}

//Does not work when a calculation result is displayed
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

function eraseLastNum() {
    getDisplay();

    if (displayNum !== "0") {
        const indexToRemove = displayNum.length - 1;
        const newDisplayNum = displayNum.slice(0, indexToRemove);
        displayNum = newDisplayNum;

        if (displayNum === "") {
            displayNum = "0";
        }
        updateDisplay(displayNum);
    }
}

function clear() {
    display.textContent = "0"
    num1 = null;
    currentOperator = null;
    onDeckOperator = null;
    num2 = null;
    displayNum = "";
    clearOperatorButtons()
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => display.textContent = "0");

container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": clear(); break;
        case "negate": negatedDisplayNum(); break;
        case "percent": percentageOfDisplayNum(); break;



        case "zero": updateDisplayNum("0"); break;
        case "one": updateDisplayNum("1"); break;
        case "two": updateDisplayNum("2"); break;
        case "three": updateDisplayNum("3"); break;
        case "four": updateDisplayNum("4"); break;
        case "five": updateDisplayNum("5"); break;
        case "six": updateDisplayNum("6"); break;
        case "seven": updateDisplayNum("7"); break;
        case "eight": updateDisplayNum("8"); break;
        case "nine": updateDisplayNum("9"); break;

        case "add": updateOperator("+"); break;
        case "subtract": updateOperator("-"); break;
        case "multiply": updateOperator("*"); break;
        case "divide": updateOperator("/"); break;

        //Every time I hit this button it adds a decimal
        case "decimal": updateDisplayNum("."); break;
        case "backspace": eraseLastNum(); break;
        case "compute": compute(); break;
    }
})

document.addEventListener('keydown', (event) => {
    console.log(event.key);

    switch (event.key) {
        case "Escape": clear(); break;
        case "_": negatedDisplayNum(); break;
        case "%": percentageOfDisplayNum(); break;



        case "0": updateDisplayNum("0"); break;
        case "1": updateDisplayNum("1"); break;
        case "2": updateDisplayNum("2"); break;
        case "3": updateDisplayNum("3"); break;
        case "4": updateDisplayNum("4"); break;
        case "5": updateDisplayNum("5"); break;
        case "6": updateDisplayNum("6"); break;
        case "7": updateDisplayNum("7"); break;
        case "8": updateDisplayNum("8"); break;
        case "9": updateDisplayNum("9"); break;

        case "+": updateOperator("+"); break;
        case "-": updateOperator("-"); break;
        case "*": updateOperator("*"); break;
        case "/": updateOperator("/"); break;

        //Every time I hit this button it adds a decimal
        case ".": updateDisplayNum("."); break;
        case "Enter": compute(); break;
    }
});
