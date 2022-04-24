const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const buttons = document.querySelectorAll(".buttons div");

buttons.forEach(button => button.addEventListener('click', buttonClick));

let firstValue = [];
let secondValue = [];
let result = null;
let operator = null;
let operatorSymbol = null;

//Monitor every button on the calc
function buttonClick(e) {
  switch(e.target.id) {
    case "clear":
      clearMemory();
      break;
    case "delete":
      backspace();
      break;
    case "+":
    case "-":
    case "/":
    case "*":
      updateOperator(e);
      break;    
    case "equals":
      calculateResult();
      break;
    default:
    storeValues(e.target.id);
  };
  //Update the display after each keystroke
  updateDisplay();
};

function updateOperator(e) {
  //Stops the operator being changed mid sum
  if(operator){return}; 
  //Stops the operator being added if there's no first value
  if(!firstValue[0]){return};
  //Update the operator variables
  operator = e.target.id;
  operatorSymbol = e.target.textContent;
};

function backspace() {
  //If the sum is complete, clear everything (same as the C button)
  if(result){clearMemory()};
  if (secondValue[0]) {
    secondValue.pop();
  } else if (operator) {
    operator = null;
    operatorSymbol = null;
  } else {
    firstValue.pop();
  };
};

//Check to see if there's an operator stored
//Update first value if not, otherwise update the second value
function storeValues(value) {
  if (result){clearMemory()};
  if (!operator) {
    firstValue.push(value);
    } else {
    secondValue.push(value); 
  };
};

//Reset all stored values and clear the screen
function clearMemory() {
  subDisplay.textContent = "";
  mainDisplay.textContent = "";
  firstValue = [];
  secondValue = [];
  result = null;
  operator = null;
  operatorSymbol = null;
};

function calculateResult() {
  if(firstValue[0] && secondValue[0]){
    let a = parseFloat(firstValue.join(""));
    let b = parseFloat(secondValue.join(""));
    switch(operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "/":
          if (b == 0){result = "MR.CALC SAYS :(";
        } else {
          result = a / b;
        };
        break;
      case "*":
        result = a * b;
    };
  };
};

function updateDisplay(){
  let displayString = "";
  let symbol = "";
  let equals = ""
  if(result){equals = "\xa0="};
  if(operatorSymbol){symbol = `\xa0${operatorSymbol}\xa0`};
  displayString = firstValue.join("") + symbol + secondValue.join("") + equals;
  subDisplay.textContent = displayString;
  mainDisplay.textContent = result;
};

//Keyboard support
window.addEventListener('keydown', keystroke);

function keystroke(e) {
  switch(e.key) {
    case "C":
    case "c":
      clearMemory();
      break;
    case "Backspace":
      backspace();
      break;
    case "+":
    case "-":
    case "/":
    case "*":
      updateOperatorKey(e.key);
      break;    
    case "=":
    case "Enter":
      calculateResult();
      break;
    case ".":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      storeValues(e.key);
      break;
  };
  //Update the display after each keystroke
  updateDisplay();
};

function updateOperatorKey(keystroke) {
  //Stops the operator being changed mid sum
  if(operator){return}; 
  //Stops the operator being added if there's no first value
  if(!firstValue[0]){return};
  //Update the operator variables
  operator = keystroke;
  operatorSymbol = keystroke;
};