// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");
const decimalButton = document.querySelector("#decimal");


// Variables
let num1 = null;
let num2 = null;
let currentOperator = null;
let onDeckOperator = null;
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

function operate(num1, num2, currentOperator, onDeckOperator) {
    let result;

    if (currentOperator === "+") {
        result = add(num1, num2);
        console.log(`Add: ${num1} ${num2}. Result: ${typeof (result)}`);
    }
    if (currentOperator === "-") {
        result = subtract(num1, num2);
        console.log(`Subtract: ${num1} ${num2}. Result: ${typeof (result)}`);
    }

    if (currentOperator === "*") {
        result = multiply(num1, num2);
        console.log(`Multiply: ${num1} ${num2}. Result: ${typeof (result)}`);
    }
    if (currentOperator === "/") {
        result = divide(num1, num2);
        console.log(`Divide: ${num1} ${num2}. Result: ${typeof (result)}`);
    }
    updateDisplay(`${result}`);
    updateVariables(result, onDeckOperator);
}

function roundNumberCheck(result) {
    console.log("roundNum initiated");
}

function updateVariables(result, onDeckOperator) {
    console.log("updateVariables called");
    num1 = result;
    num2 = null;
    currentOperator = onDeckOperator;
    displayNum = "";
    console.log(`on deck operator is ${currentOperator}`);
}

//If I press multiple operator buttons in a row weird things happen
function updateOperator(operatorType) {
    console.log("updateOperator called");
    //Capturing num1 first time
    if (num1 === null) {
        console.log("First num1 capture");
        num1 = displayNum;
        displayNum = "";
        currentOperator = operatorType;
    }
    //Capturing num1 first time
    else if (num1 && !currentOperator) {
        console.log("Let's add num2!");
        currentOperator = operatorType;
    } else if (num1 && num2 === null && currentOperator) {
        console.log("Let's compute the current expression");
        onDeckOperator = operatorType;
        compute(onDeckOperator);
    }
}


function clearDisplay() {
    updateDisplay("0");
}

function compute(onDeckOperator) {
    console.log("compute called");
    //Capturing num2
    console.log("num2 captured");
    num2 = displayNum;
    num1 = +num1;
    num2 = +num2;

    operate(num1, num2, currentOperator, onDeckOperator);
}

function updateDisplayNum(num) {
    if (displayNum === "" && num === "0") {
        console.log("Stop pressing 0!");
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

function clear() {
    display.textContent = "0"
    num1 = null;
    currentOperator = null;
    onDeckOperator = null;
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
        case "compute": compute(); break;
    }
})
