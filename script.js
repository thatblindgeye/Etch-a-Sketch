"use strict";

const grid = document.getElementById("grid");
const size = document.getElementById("size");
const solidBtn = document.querySelector(".solid-color");
const gradientBtn = document.querySelector(".gradient-color");
const randomBtn = document.querySelector(".random-color");
const createBtn = document.getElementById("create");
const clearBtn = document.getElementById("clear");
let penOption = "solid";
let cells;
let toggle = document.querySelector("#slider");
let draw = false;
let color;

function createGrid() {
  let area = size.value ** 2;
  grid.innerHTML = "";
  draw = false;
  toggle.checked = true;
  cells = document.getElementsByClassName("cell")
  document.documentElement.style.setProperty("--cells", `${size.value}`);
  for (let i = 0; i < area; i++) {
    let newCell = document.createElement("div");
    newCell.className = "cell";
    grid.appendChild(newCell);
  }
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
  e.target.style.backgroundColor = `${color}`;
}

/*
Pull the current RGBA of the current cell
Increase the Alpha by 0.1 each mouseover
*/

function chooseGradient(e) {
  let currentColor = getComputedStyle(e.target).getPropertyValue("background-color");
  let opacity = 0.1;
  let newColor = hexToRGB(color, opacity);
  let colorArray;

    /*
  let colorArray;
  let pos;

  if (currentColor.slice(0, 4) === "rgba") {
    colorArray = currentColor.split(",");
    opacity = parseFloat(colorArray[3].slice(0, 3));
  }
  */

  e.target.style.setProperty("background-color", `${newColor}`);
}

function chooseRandom(e) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let rgb = `rgb(${r}, ${g}, ${b})`;
  e.target.style.backgroundColor = `${rgb}`;
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function fillCells(e) {
  color = document.querySelector(".color-picker").value;
  if (e.target.className === "cell") {
    if (draw === true) {
      if (penOption === "solid") {
        chooseSolid(e);
      } else if (penOption === "gradient") {
        chooseGradient(e);
      } else if (penOption === "random") {
        chooseRandom(e);
      }
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
  size.value = 16;
  toggle.checked = true;
  createGrid();
});

createBtn.addEventListener("click", () => {
  if (size.value < 2 || size.value > 100) return;
  createGrid();
});

size.addEventListener("keydown", (e) => {
  if (size.value < 2 || size.value > 100) return;
  if (e.key === "Enter") {
    createGrid();
  }
})

clearBtn.addEventListener("click", clearGrid);

solidBtn.addEventListener("click", () => {
  penOption = "solid";
})

gradientBtn.addEventListener("click", () => {
  penOption = "gradient";
})

randomBtn.addEventListener("click", () => {
  penOption = "random";
})

grid.addEventListener("click", toggleDraw);

grid.addEventListener("mouseover", fillCells);
grid.addEventListener("touchstart", (e) => {
  removeDrawToggle();
  draw = true;
  fillCells(e);
});

toggle.addEventListener("change", toggleGrid);