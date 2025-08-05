const galleryImages = document.querySelectorAll("#gallery img");
const imageViewer = document.getElementById("imageViewer");
const xButton = document.getElementById("xButton");

galleryImages.forEach( (img) => {
    img.addEventListener("click", () => {
        imageViewer.style.visibility = "visible";
        imageViewer.style.height = document.documentElement.scrollHeight + "px";
        const image = imageViewer.querySelector("img");
        image.src = img.src;
    });
});

imageViewer.addEventListener("click", () => {
    imageViewer.style.visibility = "hidden";
});

imageViewer.querySelector("img").addEventListener("click", (e) => {
    e.stopPropagation();
});