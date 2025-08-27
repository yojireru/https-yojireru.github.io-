const gallery = document.getElementById("gallery");
const galleryImages = document.querySelectorAll("#gallery img");
const imageViewer = document.getElementById("imageViewer");
const xButton = document.getElementById("xButton");
const selectedImage = document.getElementById("selectedImage");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let currentIndex = 0;

let zoomed = false;

const IMAGE_PATH = "img/";

galleryImages.forEach( (img) => {
    img.addEventListener("click", () => {
        imageViewer.style.height = document.documentElement.scrollHeight + "px";
        selectedImage.src = img.src;
        imageViewer.style.visibility = "visible";
    });
});

imageViewer.addEventListener("click", () => {
    imageViewer.style.visibility = "hidden";
});

selectedImage.addEventListener("click", (e) => {
    e.stopPropagation();
});
leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  selectedImage.src = galleryImages[currentIndex].src;
});

rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  selectedImage.src = galleryImages[currentIndex].src;
});
document.addEventListener("keydown", (e) => {
  if (imageViewer.style.visibility === "visible") {
    if (e.key === "ArrowLeft") {
      leftArrow.click();
    } else if (e.key === "ArrowRight") {
      rightArrow.click();
    } else if (e.key === "Escape") {
      imageViewer.style.visibility = "hidden";
    }
  }
});
