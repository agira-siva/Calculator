const output = document.getElementById("output");
const input = document.getElementById("numbers");

window.onload = function () {
  output.focus();
};

input.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const operation = e.target.innerText;
    switch (operation) {
      case "=":
        try {
          const ans = eval(output.value);
          output.value = ans;
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
