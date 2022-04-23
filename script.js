const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const buttons = document.querySelectorAll(".buttons div");

buttons.forEach(button => button.addEventListener('click', buttonClick));


let firstValue = [];
let secondValue = [];
let result = null;
let operator = null;
let operatorSymbol = null;

//Monitor every button
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

function updateOperator (e) {
  if(operator){return};
  operator = e.target.id;
  operatorSymbol = e.target.textContent;
};


function backspace() {
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
function storeValues(value){
  if (result){clearMemory()};
  if (!operator) {
    firstValue.push(value);
    console.log(firstValue.join(""))
    } else {
    secondValue.push(value); 
    console.log(secondValue.join(""))
  };
};

//Reset all stored values
function clearMemory () {
  subDisplay.textContent = "";
  mainDisplay.textContent = "";
  firstValue = [];
  secondValue = [];
  result = null;
  operator = null;
  operatorSymbol = null;
};

function calculateResult() {
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
      result = a / b;
      break;
    case "*":
      result = a * b;
  };
};

let displayString = "";
let resultString = "";

function updateDisplay(){
  let symbol = "";
  operatorSymbol ? symbol = ` ${operatorSymbol} ` : symbol = "";
  displayString = firstValue.join("") + symbol + secondValue.join("");
  subDisplay.textContent = displayString;
  mainDisplay.textContent = result;
};