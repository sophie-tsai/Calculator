/*
1. If a operator is clicked, clicking another one will replace the current one
1a. "-" does not replace operator
2. When AC is pressed, both formulaDisplayText and numberDisplayText are cleared or reset 
3. "=" evaluates the formula
3a. "=" erases last operator, if any
4. Only one (1) "." at a time
    use boolean to check if in "decimalmode"
5. if formula is illogical, then return NAN 
*/
//use strings to store the numbers so you can concatanate/append the number


// Bugs


//when pressing plus, it double appends the number?


"use strict"

//(function iife(){
let hasDot;
let isNegative;
function setup() {
    const numberDisplayText = document.querySelector('#numberDisplayText');
    numberDisplayText.innerText = "0";
    const formulaDisplayText = document.querySelector('#formulaDisplayText');
    formulaDisplayText.innerText = "";
    const calcButtonContainers = document.querySelectorAll(".calcButtonContainer");
    for (let container of calcButtonContainers) {
        container.addEventListener('click', onButtonClick);
    }
    hasDot = false;
    resetToPositive();
}

setup();

function resetToPositive() {
    isNegative = false;
}

function maxDigits(display) {
    if (display === "number") {
        holdValue = numberDisplayText.innerText;
        function clearDigitLimitMet() {
            numberDisplayText.innerText = holdValue;
        }

        numberDisplayText.innerText = "DIGIT LIMIT MET";
        setTimeout(clearDigitLimitMet, 2000);

    }
    else {
        holdValue = formulaDisplayText.innerText;
        function clearDigitLimitMet() {
            formulaDisplayText.innerText = holdValue;
        }

        formulaDisplayText.innerText = "DIGIT LIMIT MET";
        setTimeout(clearDigitLimitMet, 2000);
    }
}

let holdValue;

function handleNumber(num) {
    //check if num is 0
    if (formulaDisplayText.innerText.includes("=")) {
        formulaDisplayText.innerText = "";
        numberDisplayText.innerText = num;
    } else if (numberDisplayText.innerText === "0") {
        numberDisplayText.innerText = num;
    } else {
        if (numberDisplayText.innerText === "DIGIT LIMIT MET") {

            return;
        } else if (numberDisplayText.innerText.length >= 10) {
            maxDigits("number");
            return;
        } else {
            numberDisplayText.innerText += num;
        }
    }
    //else, append digit
}

function handleDot() {
    if (hasDot) {
        return;
    } else if (operators.includes(numberDisplayText.innerText)) {
        return;
    }
    else {
        numberDisplayText.innerText += ".";
        hasDot = true;

    }
}

const operators = ["+", "-", "/", "*"];
//max length for formulaDisplayText.innerText should be 30



function handleOperator(operator) {
    if (numberDisplayText.innerText === "DIGIT LIMIT MET") {
        return;
    }
    if (operator === "±") {
        if (operators.includes(numberDisplayText.innerText)) {
            return;
        }
        if (!isNegative) {
            let numberDisplayArray = numberDisplayText.innerText.split("");
            numberDisplayArray.unshift("-");
            numberDisplayText.innerText = numberDisplayArray.join("");
            isNegative = true;

        } else {
            let numberDisplayArray = numberDisplayText.innerText.split("");
            numberDisplayArray.shift("-");
            numberDisplayText.innerText = numberDisplayArray.join("");
            isNegative = false;

        }
    } else if (operator === "AC") {
        setup();
    } else if (operator === "=") {

        resetToPositive();
        if (operators.includes(numberDisplayText.innerText)) {
            return;
        }
        if (!formulaDisplayText.innerText.includes("=")) {
            //if "=" hasn't already been passed then evaluate the formula
            appendNumberDisplay();
            const formulaAnswer = eval(formulaDisplayText.innerText);

            formulaDisplayText.innerText = formulaDisplayText.innerText + "=" + formulaAnswer;
            numberDisplayText.innerText = formulaAnswer;
        }
    } else if (operator) {
        if (formulaDisplayText.innerText.includes("=")) {
            formulaDisplayText.innerText = numberDisplayText.innerText + operator;
            numberDisplayText.innerText = operator;

        } else {
            clearAndReplace(operator);
        }
    }

}

function clearAndReplace(operator) {
    resetToPositive();
    if (operators.includes(numberDisplayText.innerText)) {
        //check to see if there's an operator there, if there is then replace, not append
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
    //do not append if digit limit met
    if (formulaDisplayText.innerText === "DIGIT LIMIT MET") {
        return;
    } else if (formulaDisplayText.innerText.length >= 20) {
        maxDigits("formula");
        return;
    }
    formulaDisplayText.innerText += numberDisplayText.innerText;
}

function onButtonClick(event) {
    const value = event.srcElement.innerText;

    if (Number.isInteger(parseInt(value))) {
        //if an operator has been pressed then replace the operator
        if (operators.includes(numberDisplayText.innerText)) {
            numberDisplayText.innerText = "";

        }
        handleNumber(value);

    } else if (value === '.') {
        handleDot();
    } else {
        handleOperator(value);
    }
}


//})();