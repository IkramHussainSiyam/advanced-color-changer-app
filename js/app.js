import {
  defaultColor,
  generateColorBtn,
  hexInput,
  colorSliderRed,
  colorSliderGreen,
  colorSliderBlue,
  copyColorBtn,
  defaultPresetColors,
  colorPalettes,
  saveColorBtn,
  colorCollection,
  bgFileUploadBtn,
  bgFileInput,
  bgPreview,
  bgFileDeleteBtn,
  bgController,
} from "./globals.js";
import {
  handleBgController,
  handleBgFileDeleteBtn,
  handleBgFileInput,
  handleColorSlider,
  handleCopyColorBtn,
  handleGenerateColorBtn,
  handleSaveColorBtn,
  handleTypeHexCode,
  handlecolorPalettes,
  savedPalettes,
} from "./eventHandlers.js";
import {
  displayColorPalettes,
  updateBackgroundImage,
  updateSlider,
} from "./utils.js";

// onload handler
window.addEventListener("load", () => {
  main();
  // showin default color
  updateSlider(defaultColor);
  // show default color palettes
  displayColorPalettes(colorPalettes, defaultPresetColors);
  // show saved color palettes
  displayColorPalettes(colorCollection, savedPalettes);
  // saving background in local storage
  const savedBgImgUrl = localStorage.getItem("background-image");
  if (savedBgImgUrl) {
    updateBackgroundImage(savedBgImgUrl);
  }
});

// main or boot function
function main() {
  // ********** event listeners ********** //

  // generate random color
  generateColorBtn.addEventListener("click", handleGenerateColorBtn);
  // change color by typing hex code
  hexInput.addEventListener("keyup", handleTypeHexCode);

  // slide to change red, green, blue (RGB) values
  const colorSliders = [colorSliderRed, colorSliderGreen, colorSliderBlue];
  colorSliders.forEach((slider) => {
    slider.addEventListener("input", handleColorSlider);
  });

  // copy hex or rgb color
  copyColorBtn.addEventListener("click", handleCopyColorBtn);

  // copy code from color palettes
  colorPalettes.addEventListener("click", handlecolorPalettes);
  colorCollection.addEventListener("click", handlecolorPalettes);

  // save custom color to custom color palettes
  saveColorBtn.addEventListener(
    "click",
    handleSaveColorBtn(colorCollection, hexInput)
  );

  // upload background image
  bgFileUploadBtn.addEventListener("click", function () {
    bgFileInput.click();
  });
  bgFileInput.addEventListener("input", function () {
    handleBgFileInput(bgFileInput);
  });

  // delete background image
  bgFileDeleteBtn.addEventListener("click", handleBgFileDeleteBtn);

  // control how to show background image
  bgController.addEventListener("input", handleBgController);
}
