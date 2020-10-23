"use strict";

const grid = document.getElementById("grid");
const size = document.getElementById("size");
const toggle = document.getElementById("slider");
let draw = false;
let penOption = "solid";
let cells;
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

function toggleDraw() {
  if (!draw) {
    draw = true;
  } else {
    draw = false;
  }
}

function removeDrawToggle() {
  window.removeEventListener("click", toggleDraw);
}

function removeSelected() {
  const penBtns = document.querySelectorAll(".pen-btn");
  penBtns.forEach((penBtns) => {
    penBtns.classList.remove("selected");
  })
}

function chooseSolid(e) {
  e.target.style.backgroundColor = color;
}

function chooseGradient(e) {
  let currentColor = getComputedStyle(e.target).getPropertyValue("background-color");
  let colorArray = currentColor.split(",");
  let opacity = 0.1;
  let alphaStr;
  if (colorArray.length === 4) {
    alphaStr = parseFloat(colorArray[3].slice(0, 4));
    opacity = alphaStr + 0.1;
  }
  if (alphaStr <= 0.9) {
    e.target.style.backgroundColor = hexToRGB(color, opacity);
  }
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function chooseRandom(e) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let rgb = `rgb(${r}, ${g}, ${b})`;
  e.target.style.backgroundColor = rgb;
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
})
document.getElementById("create").addEventListener("click", () => {
  if (size.value < 2 || size.value > 100) return;
  createGrid();
})
size.addEventListener("keydown", (e) => {
  if (size.value < 2 || size.value > 100) return;
  if (e.key === "Enter") {
    createGrid();
  }
})

document.getElementById("clear").addEventListener("click", () => {
  grid.classList.add("shake");
  setTimeout(clearGrid, 975);
});
grid.addEventListener("animationend", () => {
  grid.classList.remove("shake");
})

document.querySelector(".solid-btn").addEventListener("click", (e) => {
  penOption = "solid";
  removeSelected();
  e.target.classList.add("selected");
})
document.querySelector(".gradient-btn").addEventListener("click", (e) => {
  penOption = "gradient";
  removeSelected();
  e.target.classList.add("selected");
})
document.querySelector(".random-btn").addEventListener("click", (e) => {
  penOption = "random";
  removeSelected();
  e.target.classList.add("selected");
})

grid.addEventListener("click", toggleDraw);
grid.addEventListener("mouseover", fillCells)
grid.addEventListener("touchstart", (e) => {
  removeDrawToggle();
  draw = true;
  fillCells(e);
});

toggle.addEventListener("change", toggleGrid);