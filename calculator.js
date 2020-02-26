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

//initialize both displays
const numberDisplayText = document.querySelector('#numberDisplayText');
numberDisplayText.innerText = 0;
const formulaDisplayText = document.querySelector('#formulaDisplayText');

//et nums and decimal
const oneButton = document.querySelector('#oneButton');
const twoButton = document.querySelector('#twoButton');
const threeButton = document.querySelector('#threeButton');
const fourButton = document.querySelector('#fourButton');
const fiveButton = document.querySelector('#fiveButton');
const sixButton = document.querySelector('#sixButton');
const sevenButton = document.querySelector('#sevenButton');
const eightButton = document.querySelector('#eightButton');
const nineButton = document.querySelector('#nineButton');
const zeroButton = document.querySelector('#zeroButton');
const decimalButton = document.querySelector('#decimalButton');
/*
const numbersBank = {
    zeroButton: 0,
    oneButton: 1,
    twoButton: 2,
    threeButton: 3,
    fourButton: 4,
    fiveButton: 5,
    sixButton: 6,
    sevenButton: 7,
    eightButton: 8,
    nineButton: 9
};
*/
const theseAreNums = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton];
//use strings to store the numbers so you can concatanate/append the numbwer

//set event listener for each number & event listener function
for(let i=0; i<theseAreNums.length; i++){
    theseAreNums[i].addEventListener("click", function () {
        var numberClicked = theseAreNums[i].innerText;
        console.log(numberClicked);
        
        //check if 0
        if(numberDisplayText.innerText == 0){
            numberDisplayText.innerText = numberClicked;
            return;
        }
    });
}