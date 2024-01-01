const output = document.getElementById("output");
const input = document.getElementById("numbers");

function evaluate(input) {
  const ans = evaluateAnswer(input);
  if(ans == undefined){output.value = ""}
  else if(isNaN(ans)){output.value="syntax error"}
  else{output.value = ans};
}

window.onload = function () {
  output.focus();
};

output.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    evaluate(output.value);
  }else if(isOperator(e.key)){
    output.value = validate(e.key, output.value, output.value.length);
  }

});

output.addEventListener("input", () => {
  restrictInput();
})

function isOperator(operator){
  let arr = ["+","-","*","/"];
  for(let i=0; i<arr.length; i++){
    if(arr[i] === operator){
      return true;
    }
  }
  return false;
}

function restrictInput() {
  output.value = output.value.replace(/[^0-9+\-*/.]/g, '');
}

function validate(operator, value, valueLength){
    if((operator == "+" || operator == "*"  || operator == "/") && value == ""){
      return "";

    }else if(operator == "-" && value[valueLength-1] == "+" || operator == "+" && value[valueLength-1] == "-"){
      
      return output.value.substring(0,valueLength-1) + "-";

    }else if(operator == "-" && value[valueLength-1] == "-"){
      return  output.value.substring(0,valueLength-1) + "+";

    }else if((operator == "*" || operator == "/" || operator == "+") && isOperator(value[valueLength-1])){
      return output.value.substring(0,valueLength-1) + operator;
    }
    return output.value + operator;
}

input.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const operation = e.target.innerText;
    if(isOperator(operation)){
      output.value = validate(operation, output.value, output.value.length);
    }else{
      switch (operation) {
        case "=":
          evaluate(output.value);
          break;
        case "C":
          output.value = "";
          break;
        case "x":
          output.value = output.value.substring(0,(output.value.length)-1);
          break;
        default:
          output.value += e.target.innerHTML;
          break;
      }
    }
  }
});



function evaluateAnswer(input){
  return evaluateValue(evaluatePostFix(input), evaluatePostFix(input).length);
}


function evaluatePostFix(str) {
  const precedence = {
    "*": 2,
    "/": 2,

    "+": 1,

    "-": 1,
  };

  let operandsArray = [];
  let number = "";
  let i =0;
  if(str[0] == "-"){
    number += "-";
    i = i+1;
  }
  
  for(i; i<str.length; i++){

      if(/[0-9]/.test(str[i]) || str[i]== "-" && (str[i-1] == "*" || str[i-1] == "/")){
        number+= str[i];
      }else{
        operandsArray.push(number);
        operandsArray.push(str[i]);
        number = "";
      }
  }

  operandsArray.push(number);
  let len = operandsArray.length;
  let postfixArray = [];
  let arrStack = [];
  
  for (let i = 0; i < len; i++) {
    let stackLength = arrStack.length;
    if (/[0-9]/.test(Number(operandsArray[i]))) {
      postfixArray.push(operandsArray[i]);
    }else if (stackLength == 0 || precedence[operandsArray[i]] > precedence[arrStack[stackLength - 1]]){
      arrStack.push(operandsArray[i]);
    }else if (precedence[operandsArray[i]] < precedence[arrStack[stackLength - 1]]) {
      postfixArray.push(arrStack.pop());
      if (stackLength == 0) {
        arrStack.push(operandsArray[i]);
      } else {
        while (precedence[operandsArray[i]] < precedence[arrStack[stackLength - 1]]) {
          postfixArray.push(arrStack.pop());
        }
        if (precedence[operandsArray[i]] > precedence[arrStack[stackLength - 1]]) {
          arrStack.push(operandsArray[i]);
        } else {
          postfixArray.push(arrStack.pop());
          arrStack.push(operandsArray[i]);
        }
      }
    } else if (precedence[operandsArray[i]] == precedence[arrStack[stackLength - 1]]) {
      postfixArray.push(arrStack.pop());
      arrStack.push(operandsArray[i]);
    }
  }

  while (arrStack.length > 0) {
    postfixArray.push(arrStack.pop());
  }
  return postfixArray;
}



function evaluateValue(postfixArray, len) {
  let arrStack = [];
  for (let i = 0; i < len; i++) {
    if (/[0-9]/.test(postfixArray[i])) {
      arrStack.push(Number(postfixArray[i]));
    } else {
      let result;
      let pop;
      switch (postfixArray[i]) {
        case "+":
          result = arrStack.pop() + arrStack.pop();
          arrStack.push(result);
          break;
        case "-":
          pop = arrStack.pop();
          result = arrStack.pop() - pop;
          arrStack.push(result);
          break;
        case "*":
          result = arrStack.pop() * arrStack.pop();
          arrStack.push(result);
          break;
        case "/":
          pop = arrStack.pop();
          result = arrStack.pop() / pop;
          arrStack.push(result);
          break;
      }
    }
  }

  return arrStack.pop();
}



