
(function () {

    "use strict";
    let hasDot;
    let isNegative;
    const DIGIT_LIMIT_MET_MSG = "DIGIT LIMIT MET";
    const numberDisplayText = document.querySelector('#numberDisplayText');
    const formulaDisplayText = document.querySelector('#formulaDisplayText');
    setup();
    
    function setup() {
        const calcButtonContainers = document.querySelectorAll(".calcButtonContainer");
        for (let container of calcButtonContainers) {
            container.addEventListener('click', onButtonClick);
        }
        reset();
    }

    function reset() {
        numberDisplayText.innerText = "0";
        formulaDisplayText.innerText = "";
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
            numberDisplayText.innerText = "0.";
            hasDot = true;
            return;
        }
        if (formulaDisplayText.innerText.includes("=")) {
            formulaDisplayText.innerText = "";
            numberDisplayText.innerText = "0.";
            hasDot = true;
            return;
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
        let displayToUpdate;
        if (display === "number") {
            displayToUpdate = numberDisplayText;
        } else {
            displayToUpdate = formulaDisplayText;
        }
        const holdValue = displayToUpdate.innerText;
        displayToUpdate.innerText = DIGIT_LIMIT_MET_MSG;
        setTimeout(() => displayToUpdate.innerText = holdValue, 2000);
    }

    function toggleNegative() {
        if (operators.has(numberDisplayText.innerText)) {
            return;
        }
        if (isNegative) {
            numberDisplayText.innerText = numberDisplayText.innerText.replace("-", "");
            isNegative = false;
            return;
        }
        numberDisplayText.innerText = "-" + numberDisplayText.innerText;
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
            //replaces the previous operator with new one
            numberDisplayText.innerText = operator;
            const previousOperator = formulaDisplayText.innerText[formulaDisplayText.innerText.length - 1]
            formulaDisplayText.innerText = formulaDisplayText.innerText.replace(previousOperator, operator);
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

})();