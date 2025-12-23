// Defining constants for DOM events
const minInput = document.getElementById("min_value");
const maxInput = document.getElementById("max_value");
const fizzInput = document.getElementById("fizz_value");
const buzzInput = document.getElementById("buzz_value");
const divMain = document.getElementById("div_container");
const generateButton = document.getElementById("button_gen");
const resetButton = document.getElementById("button_res");
const fizzButton = document.getElementById("button_fzz");
const buzzButton = document.getElementById("button_bzz");
const fizzbuzzButton = document.getElementById("button_fbz");

// Defining constants for error messages
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");

// Setting default values on page refresh
const DEFAULTS = {min: 1, max: 100, fizz: 3, buzz: 5};

// Creating function to clear all divs
function clearDivs() {
  while (divMain.firstChild) {
    divMain.removeChild(divMain.firstChild);
  }
}

// Generating div elements within main tag
function generateDivs() {

// Clearing existing divs first
clearDivs();

// Setting input values
let min = Number(minInput.value);
let max = Number(maxInput.value);
let fizz = Number(fizzInput.value);
let buzz = Number(buzzInput.value);

for (let i = min; i <= max; i++) {
  let numDiv = document.createElement("div");
  numDiv.id = `myid${i}`;         // Assigning unique div ids

  // Adding different div classes based on FizzBuzz logic
  let text = i;
  let className = "number";

  if (i % fizz === 0 && i % buzz === 0) {
    className = "fizzbuzz";  // Class for FizzBuzz
    text = `FizzBuzz (${i})`
    }
    else if (i % fizz === 0) {
    className = "fizz";  // Class for Fizz
    text = `Fizz (${i})`;
    }
    else if (i % buzz === 0) {
    className = "buzz";  // Class for Buzz
    text = `Buzz (${i})`;
    }
    
    numDiv.className = className;
    numDiv.innerText = text;

    divMain.appendChild(numDiv);
  }
}

// Generating divs with default values when page is loaded
minInput.value = DEFAULTS.min;
maxInput.value = DEFAULTS.max;
fizzInput.value = DEFAULTS.fizz;
buzzInput.value = DEFAULTS.buzz;
generateDivs();

// Generate button: generating divs using input values when clicked
generateButton.addEventListener("click", () => {
  clearDivs();

  // Clear previous errors
  error1.innerText = "";
  error2.innerText = "";
  error3.innerText = "";

  let hasError = false;

  // Error 1: input fields are empty
  if (!minInput.value || !maxInput.value || !fizzInput.value || !buzzInput.value) {
    error1.innerText = "Please fill in all input fields before generating.";
    hasError = true;
  }

  // Error 2: min value is greater than max value
  if (Number(minInput.value) >= Number(maxInput.value)) {
    error2.innerText = "Maximum value must be larger than minimum value.";
    hasError = true;
  }

  // Error 3: fizz value is equal to buzz value 
  if (Number(fizzInput.value) === Number(buzzInput.value)) {
    error3.innerText = "Fizz and buzz values must be different.";
    hasError = true;
  }

  // If no errors, generate divs
  if (!hasError) {
    generateDivs();
  }
});

// Reset button: clearing divs & input fields when clicked
resetButton.addEventListener("click", () => {
  minInput.value = "";
  maxInput.value = "";
  fizzInput.value = "";
  buzzInput.value = "";
  clearDivs();
});

// Fizz, Buzz & FizzBuzz buttons: filtering divs when clicked
function filterDivs(type) {
  const allDivs = divMain.children; // All generated divs

  for (let numDiv of allDivs) {
    let classText = numDiv.innerText;

    if (type === "all") {
      numDiv.style.display = "block"; // Showing all divs
    } 
    else if (type === "fizz" && classText.includes("Fizz") && !classText.includes("Buzz")) {
      numDiv.style.display = "block"; // Showing only Fizz
    } 
    else if (type === "buzz" && classText.includes("Buzz") && !classText.includes("Fizz")) {
      numDiv.style.display = "block"; // Showing only Buzz
    } 
    else if (type === "fizzbuzz" && classText.includes("FizzBuzz")) {
      numDiv.style.display = "block"; // Showing only FizzBuzz
    } 
    else {
      numDiv.style.display = "none"; // Hiding all non-matching divs
    }
  }
}

fizzButton.addEventListener("click", () => filterDivs("fizz"));
buzzButton.addEventListener("click", () => filterDivs("buzz"));
fizzbuzzButton.addEventListener("click", () => filterDivs("fizzbuzz"));
