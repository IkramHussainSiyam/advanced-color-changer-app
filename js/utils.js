// ********** utils ********** //
import {
  colorPreivew,
  hexInput,
  hexTypeError,
  rgbInput,
  toastContainer,
} from "./globals.js";

/**
 * generate and returns an object of red, green, blue (RGB) color decimal value (0-255)
 * @returns {object}
 */
function generateDecimal() {
  // generate randome number between 0-255
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const red = randomNumber(0, 255);
  const green = randomNumber(0, 255);
  const blue = randomNumber(0, 255);

  return {
    red,
    green,
    blue,
  };
}

/**
 * recieves red, green, blue color decimal from {color} object and returns "string" hex code
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
  const addZero = (value) => {
    const code = value.toString(16);
    return code.length === 1 ? `0${code}` : code;
  };

  const Red = addZero(red);
  const Green = addZero(green);
  const Blue = addZero(blue);

  const hexColor = `${Red}${Green}${Blue}`.toUpperCase();

  return hexColor;
}

/**
 * recieves red, green, blue color decimal from {color} object and returns rgb code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  return rgbColor;
}

/**
 * convert hex to decimal again
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * updates the values of color by slider
 * @param {object} color
 */
function updateSlider(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  colorPreivew.style.backgroundColor = `#${hexColor}`;
  hexInput.value = hexColor;
  rgbInput.value = rgbColor;

  const redSlider = document.getElementById("redSlider");
  const greenSlider = document.getElementById("greenSlider");
  const blueSlider = document.getElementById("blueSlider");
  const { red, green, blue } = color;

  redSlider.value = red;
  greenSlider.value = green;
  blueSlider.value = blue;
  document.getElementById("redSliderVal").innerText = redSlider.value;
  document.getElementById("greenSliderVal").innerText = greenSlider.value;
  document.getElementById("blueSliderVal").innerText = blueSlider.value;
}

/**
 * validate hex code
 * @param {string} color
 * @returns {boolean}
 */
function validateColorCode(color) {
  if (color.length !== 6) {
    return false;
  }
  const testColor = /^[0-9A-Fa-f]{6}$/i;
  return testColor.test(color);
}

function copyAndShowToast(colorCode, successMsg, errorMsg) {
  let isValidCode = validateColorCode(hexInput.value);
  // showing tost message
  const type = isValidCode ? "success" : "error";
  const icon = isValidCode ? "check" : "xmark";
  if (isValidCode) {
    navigator.clipboard.writeText(colorCode);
    showToastMessage(successMsg, type, icon);
  } else {
    showToastMessage(errorMsg, type, icon);
  }
}

function validateHexCodeLength() {
  if (hexInput.value.length !== 6) {
    hexTypeError.classList.add("showErr");
    hexInput.style.borderColor = "#ff6f6f";
  } else {
    hexTypeError.classList.remove("showErr");
    hexInput.style.borderColor = "";
  }
}

// ********** DOM Function Utils ********** //

function showToastMessage(messege, toastType, toastIcon) {
  let toastDiv = document.createElement("div");
  toastDiv.classList = `toast toast-${toastType} toast-slide-in`;
  toastDiv.innerHTML = `
      <div class="message">
        <i id="toastIcon" class="fa-solid fa-circle-${toastIcon}"></i>
        <p>${messege}</p>
      </div>
      <i id="closeToast" class="fa-solid fa-xmark"></i>
    `;
  toastContainer.appendChild(toastDiv);

  // remove toast using close button
  toastDiv.addEventListener("click", function (e) {
    if (e.target.id === "closeToast") {
      this.classList.replace("toast-slide-in", "toast-slide-out");
      this.addEventListener("animationend", function () {
        toastDiv.remove();
      });
    }
  });

  // remove toast after 2.5s
  setTimeout(() => {
    toastDiv.classList.replace("toast-slide-in", "toast-slide-out");
    toastDiv.addEventListener("animationend", function () {
      toastDiv.remove();
    });
  }, 2500);
}

/**
 * @param {string} color;
 * @returns {object}
 */
function generateColorPalettes(color) {
  const colorBox = document.createElement("div");
  colorBox.classList = `color-box`;
  colorBox.style.backgroundColor = `#${color}`;
  colorBox.setAttribute("data-color", color);

  return colorBox;
}

/**
 * @param {Array} colors
 * @param {object} parent
 */
function displayColorPalettes(parent, colors) {
  colors.forEach((color) => {
    const colorBox = generateColorPalettes(color);
    parent.appendChild(colorBox);
  });
}

function updateBackgroundImage(imgUrl) {
  bgPreview.style.backgroundImage = `url('${imgUrl}')`;
  document.body.style.backgroundImage = `url('${imgUrl}')`;
  bgFileDeleteBtn.style.display = "block";
  bgController.style.display = "block";
}

/**
 * @param {object} parent
 */
function removeChildren(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}

export {
  generateDecimal,
  generateHexColor,
  generateRGBColor,
  hexToDecimal,
  updateSlider,
  validateColorCode,
  copyAndShowToast,
  validateHexCodeLength,
  // DOM Functions
  showToastMessage,
  generateColorPalettes,
  displayColorPalettes,
  updateBackgroundImage,
  removeChildren,
};
