"use strict"

//(function iife(){
let hasDot;
let isNegative;
const DIGIT_LIMIT_MET_MSG = "DIGIT LIMIT MET";
setup();

function setup() {
    for (let container of calcButtonContainers) {
        container.addEventListener('click', onButtonClick);
    }
    reset();
}

function reset() {
    const numberDisplayText = document.querySelector('#numberDisplayText');
    numberDisplayText.innerText = "0";
    const formulaDisplayText = document.querySelector('#formulaDisplayText');
    formulaDisplayText.innerText = "";
    const calcButtonContainers = document.querySelectorAll(".calcButtonContainer");
    hasDot = false;
    resetToPositive();
}

function onButtonClick(event) {
    const value = event.srcElement.innerText;
    if (Number.isInteger(parseInt(value))) {
        handleNumber(value);
        return;
    }
    if (value === '.') {
        handleDot();
        return;
    }
    handleOperator(value);
}

function handleDot() {
    if (hasDot) {
        return;
    }
    if (operators.has(numberDisplayText.innerText)) {
        return;
        // TODO fix bug
    }
    if (formulaDisplayText.innerText.includes("=")) {
        return;
        // TODO fix bug
    }
    numberDisplayText.innerText += ".";
    hasDot = true;
}

const operators = new Set(["+", "-", "/", "*"]);

function handleOperator(operator) {
    if (numberDisplayText.innerText === DIGIT_LIMIT_MET_MSG) {
        return;
    }
    if (operator === "AC") {
        reset();
        return;
    }
    if (operator === "±") {
        toggleNegative();
        return;
    }

    if (operator === "=") {
        evaluate();
        return;
    }

    const previouslyEvaluated = formulaDisplayText.innerText.includes("=");
    if (previouslyEvaluated) {
        formulaDisplayText.innerText = numberDisplayText.innerText + operator;
        numberDisplayText.innerText = operator;
        return;
    }
    hasDot = false;
    clearAndReplace(operator);
}

function handleNumber(num) {

    //if an operator has been pressed then replace the operator
    if (operators.has(numberDisplayText.innerText)) {
        numberDisplayText.innerText = "";
    }

    //comment?
    if (formulaDisplayText.innerText.includes("=")) {
        formulaDisplayText.innerText = "";
        numberDisplayText.innerText = num;
    } else if (numberDisplayText.innerText === "0") {
        numberDisplayText.innerText = num;
    } else {
        if (numberDisplayText.innerText === DIGIT_LIMIT_MET_MSG) {
            return;
        } else if (numberDisplayText.innerText.length >= 10) {
            maxDigits("number");
            return;
        } else {
            numberDisplayText.innerText += num;
        }
    }
}

function resetToPositive() {
    isNegative = false;
}

function maxDigits(display) {
    const CLEAR_TIME = 2000;
    if (display === "number") {
        const holdValue = numberDisplayText.innerText;
        numberDisplayText.innerText = DIGIT_LIMIT_MET_MSG;
        setTimeout(() => numberDisplayText.innerText = holdValue, CLEAR_TIME);
    } else {
        const holdValue = formulaDisplayText.innerText;
        formulaDisplayText.innerText = DIGIT_LIMIT_MET_MSG;
        setTimeout(() => formulaDisplayText.innerText = holdValue, CLEAR_TIME);
    }
}

function toggleNegative() {
    if (operators.has(numberDisplayText.innerText)) {
        return;
    }
    if (isNegative) {
        // TODO make this into 1 liner .replace, then flex
        let numberDisplayArray = numberDisplayText.innerText.split("");
        numberDisplayArray.shift("-");
        numberDisplayText.innerText = numberDisplayArray.join("");
        isNegative = false;
        return;
    }
    // TODO see if we can make this into 1 liner
    let numberDisplayArray = numberDisplayText.innerText.split("");
    numberDisplayArray.unshift("-");
    numberDisplayText.innerText = numberDisplayArray.join("");
    isNegative = true;
}

function evaluate() {
    resetToPositive();
    hasDot = false;
    if (operators.has(numberDisplayText.innerText)) {
        return;
    }
    if (!formulaDisplayText.innerText.includes("=")) {
        //if "=" hasn't already been passed then evaluate the formula
        appendNumberDisplay();
        const formulaAnswer = eval(formulaDisplayText.innerText);

        formulaDisplayText.innerText = formulaDisplayText.innerText + "=" + formulaAnswer;
        numberDisplayText.innerText = formulaAnswer;
        return;
    }
}

function clearAndReplace(operator) {
    resetToPositive();
    if (operators.has(numberDisplayText.innerText)) {
        //check to see if there's an operator there, if there is then replace, not append

        // TODO make this into 1 liner .replace, then FLEX
        numberDisplayText.innerText = operator;
        let formulaDisplayArray = formulaDisplayText.innerText.split("");
        formulaDisplayArray.pop();
        formulaDisplayArray.push(operator);
        formulaDisplayText.innerText = formulaDisplayArray.join("");
        return;
    }
    numberDisplayText.innerText += operator;
    appendNumberDisplay();
    numberDisplayText.innerText = operator;

}

function appendNumberDisplay() {
    //do not append if DIGIT_LIMIT_MET_MSG
    if (formulaDisplayText.innerText === DIGIT_LIMIT_MET_MSG) {
        return;
    }
    if (formulaDisplayText.innerText.length >= 20) {
        maxDigits("formula");
        return;
    }
    formulaDisplayText.innerText += numberDisplayText.innerText;
}

//})();