// ********** Global References ********** //

// Global default values
const defaultColor = {
  red: 102,
  green: 164,
  blue: 236,
};
const defaultPresetColors = [
  "ffcdd2",
  "f8bbd0",
  "e1bee7",
  "ff8a80",
  "ff80ab",
  "ea80fc",
  "b39ddb",
  "9fa8da",
  "90caf9",
  "b388ff",
  "8c9eff",
  "82b1ff",
  "03a9f4",
  "00bcd4",
  "009688",
  "80d8ff",
  "84ffff",
  "a7ffeb",
  "c8e6c9",
  "dcedc8",
  "f0f4c3",
  "b9f6ca",
  "ccff90",
  "ffcc80",
];
const copySound = new Audio("/audio/notification.mp3");

// Global DOM References
const generateColorBtn = document.getElementById("generateColorBtn");
const hexInput = document.getElementById("hexInput");
const rgbInput = document.getElementById("rgbInput");
const toastContainer = document.getElementById("toastContainer");
const hexTypeError = document.getElementById("hexTypeError");
const colorPreivew = document.getElementById("colorPreview");
const colorSliderRed = document.getElementById("redSlider");
const colorSliderGreen = document.getElementById("greenSlider");
const colorSliderBlue = document.getElementById("blueSlider");
const copyColorBtn = document.getElementById("copyColorBtn");
const hexCopyMode = document.getElementById("hexModeCopy");
const rgbCopyMode = document.getElementById("rgbModeCopy");
const colorPalettes = document.getElementById("colorPalettes");
const saveColorBtn = document.getElementById("saveColorBtn");
const colorCollection = document.getElementById("colorCollection");
const bgFileUploadBtn = document.getElementById("bgFileUploadBtn");
const bgFileDeleteBtn = document.getElementById("bgFileDeleteBtn");
const bgFileInput = document.getElementById("bgFileInput");
const bgPreview = document.getElementById("bgPreview");
const bgController = document.getElementById("bgController");

export {
  // default values
  defaultColor,
  defaultPresetColors,
  copySound,

  // DOM references
  generateColorBtn,
  hexInput,
  rgbInput,
  toastContainer,
  hexTypeError,
  colorPreivew,
  colorSliderRed,
  colorSliderGreen,
  colorSliderBlue,
  copyColorBtn,
  hexCopyMode,
  rgbCopyMode,
  colorPalettes,
  saveColorBtn,
  colorCollection,
  bgFileUploadBtn,
  bgFileDeleteBtn,
  bgFileInput,
  bgPreview,
  bgController,
};
