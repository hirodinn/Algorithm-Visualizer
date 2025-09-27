let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const container = document.getElementById("container");

function loadBars() {
  container.innerHTML = "";
  arr.forEach((number) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${number * 10}%`;
    container.appendChild(bar);
  });
}
loadBars();

async function bubbleSort() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        // swap in array
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // animate swap in DOM
        await updateBars(j + 1, j + 2);
      }
    }
  }
}

function updateBars(f, s) {
  const i = document.querySelector(`.container div:nth-of-type(${f})`);
  const j = document.querySelector(`.container div:nth-of-type(${s})`);

  // measure their X positions
  const firstX = i.getBoundingClientRect().left;
  const secondX = j.getBoundingClientRect().left;
  const distance = secondX - firstX;

  // highlight
  i.classList.add("red");
  j.classList.add("black");

  // animate swap using relative translate
  i.style.transform = `translateX(${distance}px)`;
  j.style.transform = `translateX(${-distance}px)`;

  return new Promise((resolve) => {
    setTimeout(() => {
      // swap DOM order so they stay swapped
      const parent = i.parentNode;
      if (i.nextSibling === j) {
        parent.insertBefore(j, i);
      } else {
        parent.insertBefore(i, j);
      }

      // reset transform so they don’t accumulate
      i.style.transform = "";
      j.style.transform = "";

      i.classList.remove("red");
      j.classList.remove("black");
      resolve();
    }, 300); // must match CSS transition duration
  });
}

bubbleSort();

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
