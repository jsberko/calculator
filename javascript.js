// Selectors
const container = document.querySelector(".container");
const display = document.querySelector(".display");


// Variables

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


// Event Delegation
container.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "AC": console.log("AC button pushed"); break;
        case "negate": console.log("Negate button pushed"); break;
        case "percent": console.log("Percent button pushed"); break;
        case "divide": console.log("Divide button pushed"); break;

        case "seven": console.log("Seven button pushed"); break;
        case "eight": console.log("Eight button pushed"); break;
        case "nine": console.log("Nine button pushed"); break;
        case "multiply": console.log("Multiply button pushed"); break;

        case "four": console.log("Four button pushed"); break;
        case "five": console.log("Five button pushed"); break;
        case "six": console.log("Six button pushed"); break;
        case "subtract": console.log("Subtract button pushed"); break;

        case "one": console.log("One button pushed"); break;
        case "two": console.log("Two button pushed"); break;
        case "three": console.log("Three button pushed"); break;
        case "add": console.log("Add button pushed"); break;

        case "zero": console.log("Zero button pushed"); break;
        case "decimal": console.log("Decimal button pushed"); break;
        case "equals": console.log("Equals button pushed"); break;
    }
})
