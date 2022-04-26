const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const buttons = document.querySelectorAll(".buttons div");
const errorMessage = "MR.CALC SAYS NO!";

//Event listeners for buttons on calc and keyboard
buttons.forEach(button => button.addEventListener('click', buttonClick));
window.addEventListener('keydown', buttonClick);

//Intro animation
animateText("WELCOME TO",subDisplay)
setTimeout(animateText,1000,"MR.CALC", mainDisplay);

//Didn't need to use arrays here but wanted to give it a go.
let firstValue = [];
let secondValue = [];

let result = null;
let operator = null;
let operatorSymbol = null;

function buttonClick(e) {
  let input = covertInput(e);
  switch(input) {
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
      updateOperator(e);
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
    storeValues(input);
  };
  //Update the display after each keystroke
  checkResult();
  updateDisplay();
};

function covertInput(e) {
  let input;
  if (e.type === 'keydown'){
    input = e.key;
  } else {
    input = e.target.id;
  };
  return input
};

function updateOperator(e) {
  let input = covertInput(e);
  //If there's already a first and second value calcualte the result
  //Save the result as the first value, and clear the second
  if(operator && secondValue[0]){
    calculateResult();  
    if(result === errorMessage){return};
    firstValue = Array.from(String(result));
    secondValue = [];
    result = null;
  }; 
  //Stops the operator being added if there's no first value
  if(!firstValue[0]){return};
  //Update the operator variables, use the symbols on the calc
  //in the display if the user clicks the UI
  if (e.type === 'keydown') {
    operatorSymbol = input;
  } else {
    operatorSymbol = e.target.textContent;
  }
  operator = input;
};

function backspace() {
  //If the sum is complete, clear everything (same as the C button)
  if(result){clearMemory()};
  if (secondValue[0]) {
    secondValue.pop();
  } else if(operator) {
    operator = null;
    operatorSymbol = null;
  } else {
    firstValue.pop();
  };
};

//Check to see if there's an operator stored
//Update first value if not, otherwise update the second value
function storeValues(value) {
  if (result || result === 0){clearMemory()};
  if (!operator) {
    if (value === "." && firstValue.find(decimal => decimal === ".")){return};
    if (value === "." && !firstValue[0]){firstValue[0] = "0"};
    firstValue.push(value);
    } else {
    if (value === "." && secondValue.find(decimal => decimal === ".")){return};
    if (value === "." && !secondValue[0]){secondValue[0] = "0"};
    secondValue.push(value); 
  };
};

//Reset all stored values and clear the screen s
function clearMemory() {
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
    let num = null;
    switch(operator) {
      case "+":
        num = a + b;
        break;
      case "-":
        num = a - b;
        break;
      case "/":
          if (b == 0){result = errorMessage; return
        } else {
          num = a / b;
        };
        break;
      case "*":
        num = a * b;
    };
    result = parseFloat(num.toFixed(5));
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

function checkResult() {
  if(result === errorMessage || firstValue.join("") === errorMessage){
    result = errorMessage;
  };
};

//from W3 Schools https://www.w3schools.com/howto/howto_js_typewriter.asp

function animateText(message,display){
  let i = 0;
  let txt = message;
  let speed = 100;

  function typeWriter() {
    if (i < txt.length) {
      display.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter()
}
