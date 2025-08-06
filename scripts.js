const gallery = document.getElementById("gallery");
const galleryImages = document.querySelectorAll("#gallery img");
const imageViewer = document.getElementById("imageViewer");
const xButton = document.getElementById("xButton");
const selectedImage = document.getElementById("selectedImage");

let zoomed = false;

const IMAGE_PATH = "img/";

galleryImages.forEach( (img) => {
    img.addEventListener("click", () => {
        imageViewer.style.height = document.documentElement.scrollHeight + "px";
        selectedImage.src = img.src;
        imageViewer.style.visibility = "visible";
        // glue x button to top right corner
        const rect = selectedImage.getBoundingClientRect();
        xButton.style.top = rect.top - xButton.height / 2 + "px";
        xButton.style.left = rect.right - xButton.width / 2 + "px";
    });
});

imageViewer.addEventListener("click", () => {
    imageViewer.style.visibility = "hidden";
});

selectedImage.addEventListener("click", (e) => {
    e.stopPropagation();
});