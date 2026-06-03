document.addEventListener('DOMContentLoaded', function() {

    // --- Sweet Love Notes & Quotes ---
    const loveNotes = [
        "Every sunset is prettier when I imagine it through your eyes... 🌅❤️",
        "Not my favorite picture of you.. because every picture of you becomes my favorite 🦋💙",
        "While you're watching the sunset, I'm busy admiring the view sitting right in front of it. ✨",
        "Some people chase perfection, I was lucky enough to find it. 👉👈❤️",
        "You are the most beautiful, magical, and important part of my life. 🤍✨",
        "You make my world a little brighter and my heart a little warmer every single day. 🌸",
        "My favorite person, my favorite smile, and my favorite place to be. 🧸💖",
        "If elegance had a face, it would look exactly like you, Doda. 🥰",
        "My heart beats a little faster whenever I think of you... 💓",
        "Every memory with you is a treasure I keep close to my heart. 🗝️🌸",
        "Just checking in to remind you that you are loved, today and always. 💌"
    ];

    const loveQuoteEl = document.getElementById('love-quote');
    const heartBtn = document.getElementById('heart-capsule-btn');

    let currentQuoteIndex = 0;

    function showNextQuote() {
        if (!loveQuoteEl) return;
        
        loveQuoteEl.style.opacity = 0;
        loveQuoteEl.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % loveNotes.length;
            loveQuoteEl.textContent = loveNotes[currentQuoteIndex];
            loveQuoteEl.style.opacity = 1;
            loveQuoteEl.style.transform = 'translateY(0)';
        }, 300);
    }

    // Auto cycle quotes every 5 seconds
    let quoteInterval = setInterval(showNextQuote, 5000);

    if (heartBtn && loveQuoteEl) {
        // Apply smooth transition styles
        loveQuoteEl.style.transition = 'all 0.3s ease';
        loveQuoteEl.textContent = loveNotes[0]; // Set initial quote

        heartBtn.addEventListener('click', function(e) {
            // Clear auto interval so it doesn't immediately skip after clicking
            clearInterval(quoteInterval);
            quoteInterval = setInterval(showNextQuote, 5000); // Reset timer
            
            // Choose a random quote distinct from current one
            let randIndex;
            do {
                randIndex = Math.floor(Math.random() * loveNotes.length);
            } while (randIndex === currentQuoteIndex && loveNotes.length > 1);
            
            currentQuoteIndex = randIndex;
            
            loveQuoteEl.style.opacity = 0;
            loveQuoteEl.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                loveQuoteEl.textContent = loveNotes[currentQuoteIndex];
                loveQuoteEl.style.opacity = 1;
                loveQuoteEl.style.transform = 'scale(1)';
            }, 150);

            // Spawn floating hearts from the click location!
            createFloatingHearts(e.clientX, e.clientY);
        });
    }

    function createFloatingHearts(x, y) {
        const heartSymbols = ['❤️', '💖', '🦋', '✨', '🌸', '💙'];
        const numHearts = 6;
        
        for (let i = 0; i < numHearts; i++) {
            const el = document.createElement('div');
            el.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            el.style.position = 'fixed';
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.fontSize = `${16 + Math.random() * 16}px`;
            el.style.pointerEvents = 'none';
            el.style.zIndex = '9999';
            el.style.userSelect = 'none';
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * velocity;
            const vy = -Math.abs(Math.sin(angle) * velocity) - 1; // Always float upwards
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            document.body.appendChild(el);
            
            function animateHeart() {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                el.style.left = `${posX}px`;
                el.style.top = `${posY}px`;
                el.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateHeart);
                } else {
                    el.remove();
                }
            }
            requestAnimationFrame(animateHeart);
        }
    }

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Initialize LightGallery ---
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        download: false
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Video Uploader ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if(videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }
});

