const arrayContainer = document.getElementById("array-container");
const algorithmSelect = document.getElementById("algorithm");
const sizeInput = document.getElementById("size");
const speedInput = document.getElementById("speed");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");

let array = [];
let delay = 100;

// Generate Random Array
function generateArray() {
  array = [];
  arrayContainer.innerHTML = "";
  let size = Number(sizeInput.value);
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    let bar = document.createElement("div");
    bar.classList.add("array-bar");
    bar.style.height = `${value}px`;
    arrayContainer.appendChild(bar);
  }
}

// Update Array Bars
function updateArrayBars(highlightIndices = [], sortedIndex = -1) {
  const bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${array[i]}px`;
    bars[i].style.backgroundColor = "#4caf50";
    if (highlightIndices.includes(i)) bars[i].style.backgroundColor = "red";
    if (i === sortedIndex) bars[i].style.backgroundColor = "blue";
  }
}

// Sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Sorting Algorithms
//bubble sort
async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      updateArrayBars([j, j + 1]);
      await sleep(delay);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        updateArrayBars([j, j + 1]);
        await sleep(delay);
      }
    }
    updateArrayBars([], array.length - i - 1);
  }
  updateArrayBars();
}
//selection sort
async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      updateArrayBars([minIndex, j]);
      await sleep(delay);
      if (array[j] < array[minIndex]) minIndex = j;
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    updateArrayBars([], i);
    await sleep(delay);
  }
  updateArrayBars();
}
//insertion sort
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      updateArrayBars([j, j + 1]);
      await sleep(delay);
      j--;
    }
    array[j + 1] = key;
    updateArrayBars([], i);
    await sleep(delay);
  }
  updateArrayBars();
}
