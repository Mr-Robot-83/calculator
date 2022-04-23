const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const buttons = document.querySelectorAll(".buttons div");

buttons.forEach(button => button.addEventListener('click', buttonClick))
  
let displayValue = [];

function buttonClick(e){
  switch (e.target.id) {
    case "clear":
      subDisplay.textContent = "";
      displayValue = [];
    break;
    case "delete":
      displayValue.pop();
      let displayString = displayValue.join("")
      subDisplay.textContent = displayString;    
      break;
    default:
    updateDisplay(e)
  }
}

function updateDisplay(e){
  console.log(e.target.id);
  displayValue.push(e.target.id);
  let displayString = displayValue.join("")
  subDisplay.textContent = displayString;
}


function calculate(a, operator, b) {
  switch(operator) {
    case "*":
      console.log(a * b);
      return a * b;
    case "/":
      console.log(a / b);
      return a / b;
    case "+":
      console.log(a + b);
      return a + b;
    case "-":
      console.log(a - b);
      return a - b;  
  }
}

calculate(9,"/",8);

