const output = document.getElementById("output");
const input = document.getElementById("numbers");

window.onload = function () {
    output.focus();
};

function evaluate(input){
    const ans = eval(input);
    output.value = ans;
}

output.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        evaluate(output.value);
    }
});

input.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const operation = e.target.innerText;
    switch (operation) {
      case "=":
        try {
          evaluate(output.value);
        } catch {
          output.value = "syntax error";
        }
        break;
      case "C":
        output.value = "";
        break;
      default:
        output.value += e.target.innerHTML;
        break;
    }
  }
});
