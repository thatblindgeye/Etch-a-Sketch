"use strict";

const grid = document.getElementById("grid");
const createBtn = document.getElementById("create");
const clearBtn = document.getElementById("clear");
const input = document.getElementById("size");
let toggle = document.querySelector("#slider");
let draw = false;
let cells;
let color;

function createGrid() {
  let size = input.value;
  grid.innerHTML = "";
  draw = false;
  document.documentElement.style.setProperty("--cells", `${size}`);
  for (let i = 0; i < (size ** 2); i++) {
    let newCell = document.createElement("div");
    newCell.className = "cell";
    grid.appendChild(newCell);
  }
  cells = document.getElementsByClassName("cell");
}

function clearGrid() {
  cells = Array.from(cells);
  draw = false;
  cells.forEach((cells) => {
    cells.style.backgroundColor = "initial";
  })
}

function toggleDraw(e) {
  if (!draw) {
    draw = true;
  } else {
    draw = false;
  }
}

function removeDrawToggle() {
  window.removeEventListener("click", toggleDraw);
}

function chooseSolid(e) {
  color = document.querySelector(".color-picker").value;
  e.target.style.backgroundColor = `${color}`;
}

function chooseGradient(e) {
  color = document.querySelector(".color-picker").value;
  let currentColor = getComputedStyle(e.target).getPropertyValue("background-color");
  let newColor = hexToRGB(color, 0.1);

  e.target.style.setProperty("background-color", `${newColor}`);
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function fillCells(e) {
  if (e.target.className === "cell") {
    if (draw === true) {
      chooseSolid(e);
    }
  }
}

function toggleGrid() {
  cells = Array.from(cells);

  if (toggle.checked === true) {
    cells.forEach((cells) => {
      cells.style.setProperty("border", "var(--border-on)");
    })
  } else if (toggle.checked === false) {
    cells.forEach((cells) => {
      cells.style.setProperty("border", "var(--border-off)");
    })
  }
}

window.addEventListener("load", () => {
  input.value = 16;
  toggle.checked = true;
  createGrid();
});

createBtn.addEventListener("click", () => {
  if (input.value < 2 || input.value > 100) return;
  createGrid();
});

input.addEventListener("keydown", (e) => {
  if (input.value < 2 || input.value > 100) return;
  if (e.key === "Enter") {
    createGrid();
  }
})

clearBtn.addEventListener("click", clearGrid);

grid.addEventListener("click", toggleDraw);

grid.addEventListener("mousemove", fillCells);
grid.addEventListener("touchstart", (e) => {
  removeDrawToggle();
  draw = true;
  fillCells(e);
});

toggle.addEventListener("change", toggleGrid);