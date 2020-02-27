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
"use strict"

//(function iife(){

function setup() {
    const numberDisplayText = document.querySelector('#numberDisplayText');
    numberDisplayText.innerText = 0;
    const formulaDisplayText = document.querySelector('#formulaDisplayText');

    const calcButtonContainers = document.querySelectorAll(".calcButtonContainer");
    for (let container of calcButtonContainers) {
        container.addEventListener('click', onButtonClick)
    }

}

setup();

function maxDigits() {
    holdValue = numberDisplayText.innerText;
    numberDisplayText.innerText = "DIGIT LIMIT MET";
    setTimeout(function () {
        numberDisplayText.innerText = holdValue;
    }, 2500
    );
}

let holdValue;
function handleNumber(num) {
    //check if num is 0
    if (numberDisplayText.innerText == 0) {
        numberDisplayText.innerText = num;
    } else {
        if (numberDisplayText.innerText.length > 21) {
            maxDigits();
            return;
        } else if(numberDisplayText.innerText === "DIGIT LIMIT MET") {
            return;
        }  else {
            numberDisplayText.innerText += num;
        }
    }
    //else, append digit
}

function handleDot() {

}

function handleOperator(operator) {

}

function onButtonClick(event) {
    const value = event.srcElement.innerText;

    if (Number.isInteger(parseInt(value))) {
        handleNumber(value);
    } else if (value === '.') {
        handleDot();
    } else {
        handleOperator(value);
    }
}

//})();



