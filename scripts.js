const gallery = document.getElementById("gallery");
const imageViewer = document.getElementById("imageViewer");
const xButton = document.getElementById("xButton");
const selectedImage = document.getElementById("selectedImage");
const rect = selectedImage.getBoundingClientRect();
let zoomed = false;

const IMAGE_PATH = "img/";

fetch("gallery.json")
    .then(response => response.json())
    .then(images => {
        images.forEach(filename => {
            const img = document.createElement("img");
            img.src = IMAGE_PATH + filename;
            gallery.appendChild(img);

            img.addEventListener("click", () => {
                imageViewer.style.height = document.documentElement.scrollHeight + "px";
                selectedImage.src = img.src;
                imageViewer.style.visibility = "visible";
                // glue x button to top right corner
                xButton.style.top = rect.top - selectedImage.height / 2 - xButton.height / 2 + "px";
                xButton.style.left = rect.right - xButton.width / 2 + "px";
            });
    });
})
.catch(console.error);

imageViewer.addEventListener("click", () => {
    imageViewer.style.visibility = "hidden";
});

selectedImage.addEventListener("click", (e) => {
    e.stopPropagation();
});