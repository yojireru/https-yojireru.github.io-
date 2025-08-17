const particleSrc = "https://raw.githubusercontent.com/yojireru/https-yojireru.github.io-/refs/heads/main/img/tricera.png";

function createParticle() {
  const img = document.createElement("img");
  img.src = particleSrc;
  img.className = "particle";

  const size = Math.random() * 30 + 20; 
  img.style.width = `${size}px`;

  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = window.innerHeight + "px";

  document.getElementById("particles").appendChild(img);

  const duration = Math.random() * 4000 + 4000;
  const drift = (Math.random() - 0.5) * 200;
  const start = performance.now();

  function animate(now) {
    const progress = (now - start) / duration;
    if (progress >= 1) {
      img.remove();
      return;
    }

    const x = parseFloat(img.style.left) + drift * progress;
    const y = window.innerHeight - progress * (window.innerHeight + 100);

    img.style.transform = `translate(${x - parseFloat(img.style.left)}px, ${-progress * (window.innerHeight + 100)}px) scale(${1 - progress * 0.5})`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

setInterval(createParticle, 500);
