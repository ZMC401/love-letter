// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    const audio = document.getElementById('bgMusic');
    
    // 初始化画布
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 七星连珠动画
    class Planet {
        constructor(radius, speed, color) {
            this.radius = radius;
            this.speed = speed;
            this.color = color;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.angle += this.speed;
            this.x = canvas.width/2 + Math.cos(this.angle) * this.radius;
            this.y = canvas.height/2 + Math.sin(this.angle) * this.radius * 0.6;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const planets = [
        new Planet(100, 0.02, '#FF6B6B'),
        new Planet(150, 0.015, '#4ECDC4'),
        new Planet(200, 0.01, '#45B7D1'),
        new Planet(250, 0.008, '#96CEB4'),
        new Planet(300, 0.006, '#FFEEAD'),
        new Planet(350, 0.005, '#D4A5A5'),
        new Planet(400, 0.004, '#88D8B0')
    ];

    function animate() {
        ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        planets.forEach(planet => {
            planet.update();
            planet.draw();
        });

        requestAnimationFrame(animate);
    }

    // 交互处理
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        planets.forEach(planet => {
            const dx = x - planet.x;
            const dy = y - planet.y;
            if (Math.sqrt(dx*dx + dy*dy) < 15) {
                createRipple(x, y);
                audio.play().catch(() => { /* 处理自动播放限制 */ });
            }
        });
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            animation: ripple 1s ease-out;
        `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    // 初始化
    initCanvas();
    window.addEventListener('resize', initCanvas);
    animate();

    // 情书交互
    window.showSecret = () => {
        document.getElementById('hiddenMessage').classList.remove('hidden');
        document.querySelector('.btn-action').textContent = '🎉 我们的星辰大海';
    };

    window.navigateToGitHub = () => {
        window.location.href = 'https://github.com/ZMC401/love-letter';
    };
});
