(() => {
    const host = document.getElementById("dustParticles");
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle() {
        return {
            x: random(0, width),

            //spawn
            y: random(height, height + 100),

            size: random(0.7, 2),

            opacity: random(0.18, 0.42),

            speed: random(12, 28),


            drift: random(-8, 8),

            phase: random(0, Math.PI * 2),

            swaySpeed: random(0.5, 1.2),

            fadeDistance: random(120, 220)
        };
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const amount =
            width < 600 ? 30 :
            width < 1000 ? 30 :
            42;

        particles = [];

        for (let i = 0; i < amount; i++) {
            const particle = createParticle();

            particle.y = random(-height, height);

            particles.push(particle);
        }
    }

    function resetParticle(p) {
        p.x = random(0, width);
        p.y = height + random(10, 80);

        p.size = random(0.7, 2);
        p.opacity = random(0.18, 0.42);

        p.speed = random(12, 28);
        p.drift = random(-8, 8);

        p.phase = random(0, Math.PI * 2);
        p.swaySpeed = random(0.5, 1.2);

        p.fadeDistance = random(120, 220);
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.phase += p.swaySpeed * 0.016;

            p.y -= p.speed * 0.016;

            p.x += (
                p.drift +
                Math.sin(p.phase) * 5
            ) * 0.016;

            let alpha = p.opacity;
            if (p.y < p.fadeDistance) {
                alpha *= p.y / p.fadeDistance;
            }

            if (
                p.y < -20 ||
                p.x < -30 ||
                p.x > width + 30
            ) {
                resetParticle(p);
                continue;
            }

            const glow = ctx.createRadialGradient(
                p.x,
                p.y,
                0,
                p.x,
                p.y,
                p.size * 4
            );

            glow.addColorStop(
                0,
                `rgba(220, 225, 220, ${alpha})`
            );

            glow.addColorStop(
                1,
                "rgba(220, 225, 220, 0)"
            );

            ctx.fillStyle = glow;

            ctx.beginPath();
            ctx.arc(
                p.x,
                p.y,
                p.size * 4,
                0,
                Math.PI * 2
            );
            ctx.fill();

            ctx.fillStyle =
                `rgba(230, 235, 230, ${alpha})`;

            ctx.beginPath();
            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);

    resize();
    requestAnimationFrame(animate);
})();