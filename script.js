const output = document.getElementById("output");
const input = document.getElementById("numbers");

function evaluate(input) {
  try {
    const ans = eval(input);
    output.value = ans;
  } catch {
    output.value = "syntax error";
  }
}

window.onload = function () {
  output.focus();
};

output.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    evaluate(output.value);
  }
});

input.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const operation = e.target.innerText;
    switch (operation) {
      case "=":
        evaluate(output.value);
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
