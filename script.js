const grid = document.getElementById("grid");
const create = document.getElementById("create");
let cells = document.querySelectorAll("cell");


function createGrid() {
  let i = 0;
  grid.innerHTML = "";
  size = Number(document.getElementById("size").value);
  
  if (!size || size < 2 || size > 100) return;

  for (i = 0; i < (size ** 2); i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    document.documentElement.style.setProperty("--cells", `${size}`);
    grid.appendChild(cell);
  }
}


window.addEventListener("load", () => {
  document.getElementById("size").value = 16;
  createGrid();
});

create.addEventListener("click", createGrid);
