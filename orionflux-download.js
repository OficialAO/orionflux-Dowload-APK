// Partículas animadas
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.2,
            color: `rgba(59,130,246,${Math.random() * 0.3 + 0.1})`
        });
    }
}

function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
    animationId = requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
drawParticles();

// === Efeitos do botão de download ===
const downloadBtn = document.getElementById('download-btn');
const btnText = downloadBtn?.querySelector('.btn-text');
const btnLoader = downloadBtn?.querySelector('.btn-loader');

if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Efeito visual de carregamento
        if (btnText && btnLoader) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
        }
        // Mostrar aviso personalizado
        const confirmDownload = confirm(
            '📱 OrionFlux - APK Android\n\n' +
            '⚠️ Atenção:\n' +
            '• Apenas para dispositivos Android.\n' +
            '• Ative "Permitir instalação de fontes desconhecidas" nas configurações.\n' +
            '• O download começará agora.\n\n' +
            '✅ Clique em OK para baixar.'
        );
        if (confirmDownload) {
            // Simular pequeno delay para o loader sumir depois
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = downloadBtn.getAttribute('href') || 'orionflux.apk';
                link.download = 'orionflux.apk';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                if (btnText && btnLoader) {
                    btnText.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                }
            }, 400);
        } else {
            if (btnText && btnLoader) {
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
            }
        }
    });
}

// Link da versão web pode ser ajustado manualmente
const webLink = document.getElementById('web-link');
if (webLink) {
    // Troque para a URL real do seu frontend hospedado
    // webLink.href = 'https://orionflux-frontend.onrender.com';
}