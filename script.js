function test() {
  let selection = document.getElementsByName("option");
  for (let i = 0, length = selection.length; i < length; i++) {
    if (selection[i].checked) {
      if (selection[i].value === "solid") {
        alert("this will be a solid color");
      }
      break;
    }
  }
}

function test2() {
  let choice = document.querySelector("select");
  console.log(choice.value);
}