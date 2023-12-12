// ********** event handlers ********** //
import {
  colorPreivew,
  colorSliderBlue,
  colorSliderGreen,
  colorSliderRed,
  copySound,
  colorCollection,
  hexCopyMode,
  rgbCopyMode,
  rgbInput,
  hexInput,
  bgPreview,
  bgFileDeleteBtn,
  bgController,
} from "./globals.js";
import {
  copyAndShowToast,
  displayColorPalettes,
  generateDecimal,
  hexToDecimal,
  removeChildren,
  showToastMessage,
  updateBackgroundImage,
  updateSlider,
  validateColorCode,
  validateHexCodeLength,
} from "./utils.js";

//  saved color palettes
let savedPalettes = JSON.parse(localStorage.getItem("saved-colors")) || [];

function handleGenerateColorBtn() {
  const colorDecimal = generateDecimal();
  updateSlider(colorDecimal);
  validateHexCodeLength();
}

function handleTypeHexCode(e) {
  const hexCode = e.target.value;
  if (hexCode) {
    hexInput.value = hexCode.toUpperCase();
    if (validateColorCode(hexCode)) {
      colorPreivew.style.backgroundColor = `#${hexCode}`;
      // update all color codes
      const hexToDecim = hexToDecimal(hexCode);
      updateSlider(hexToDecim);
    }
  }
  validateHexCodeLength();
}

function handleColorSlider() {
  const color = {
    red: parseInt(colorSliderRed.value),
    green: parseInt(colorSliderGreen.value),
    blue: parseInt(colorSliderBlue.value),
  };
  updateSlider(color);
  validateHexCodeLength();
}

function handleCopyColorBtn() {
  let hexCode = hexInput.value,
    rgbCode = rgbInput.value;
  let copyModes = [hexCopyMode, rgbCopyMode];

  copyModes.forEach((mode) => {
    if (mode.checked) {
      let colorCode;
      if (mode === hexCopyMode) {
        colorCode = `#${hexCode}`;
      } else if (mode === rgbCopyMode) {
        colorCode = rgbCode;
      }
      copyAndShowToast(
        colorCode,
        `Color copied to the clipboard`,
        "Invalid color code"
      );
      copySound.play();
    }
  });
}

function handlecolorPalettes(e) {
  let paletteColorCode = e.target.dataset.color;

  if (e.target.className === "color-box") {
    navigator.clipboard.writeText(`#${paletteColorCode}`);
    showToastMessage(`Color copied to the clipboard`, "success", "check");
    copySound.play();
  }
}

function handleSaveColorBtn(parent, color) {
  return function () {
    let colorCode = color.value;
    // check if already color exist
    if (savedPalettes.includes(colorCode)) {
      showToastMessage(`Palette already saved`, "warning", "exclamation");
      copySound.play();
      return;
    }

    // display color if code is valid
    if (colorCode.length === 6) {
      savedPalettes.unshift(colorCode);
      if (savedPalettes.length > 24) {
        savedPalettes = savedPalettes.slice(0, 24);
      }

      // saving to the local storage
      localStorage.setItem("saved-colors", JSON.stringify(savedPalettes));
      // show toast message after saving
      showToastMessage(`Palette saved successfully`, "success", "check");
      copySound.play();

      // display pallete after clicking
      removeChildren(colorCollection);
      displayColorPalettes(parent, savedPalettes);
    } else {
      showToastMessage(`Invalid color code`, "error", "xmark");
      copySound.play();
    }
  };
}

function handleBgFileInput(inputElement) {
  const file = inputElement.files[0];

  const bgImg = URL.createObjectURL(file);
  localStorage.setItem("background-image", bgImg);

  updateBackgroundImage(bgImg);
}

function handleBgController(e) {
  document.body.style.backgroundSize = e.target.value;
  document.body.style.backgroundRepeat = e.target.value;
  document.body.style.backgroundPosition = e.target.value;
  document.body.style.backgroundAttachment = e.target.value;
}

function handleBgFileDeleteBtn() {
  localStorage.removeItem("background-image");
  bgPreview.style.backgroundImage = "";
  document.body.style.backgroundImage = "";
  bgFileDeleteBtn.style.display = "";
  bgController.style.display = "";
}

export {
  handleGenerateColorBtn,
  handleTypeHexCode,
  handleColorSlider,
  handleCopyColorBtn,
  handlecolorPalettes,
  handleSaveColorBtn,
  savedPalettes,
  handleBgFileDeleteBtn,
  handleBgController,
  handleBgFileInput,
};
