import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [isDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [text, setText] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const fullText = '< Bharath Kumar />';
    const canvasRef = useRef(null);

    // Particle grid background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create particles
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            ctx.strokeStyle = isDark ? 'rgba(255, 1, 79, 0.03)' : 'rgba(255, 1, 79, 0.06)';
            ctx.lineWidth = 1;
            const gridSize = 60;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw & update particles
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? `rgba(255, 1, 79, ${p.opacity})` : `rgba(255, 1, 79, ${p.opacity * 1.5})`;
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = isDark ? `rgba(255, 1, 79, ${0.06 * (1 - dist / 120)})` : `rgba(255, 1, 79, ${0.1 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Typing animation
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowSubtitle(true), 300);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    // Progress bar
    useEffect(() => {
        const duration = 3000;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => onComplete(), 800);
                }, 200);
            }
        };
        requestAnimationFrame(tick);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className={`loading-screen ${isDark ? 'loading-screen--dark' : 'loading-screen--light'}`}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <canvas ref={canvasRef} className="loading-particles" />

                    {/* Corner accents */}
                    <div className="loading-corner loading-corner--tl" />
                    <div className="loading-corner loading-corner--br" />

                    {/* Center content */}
                    <div className="loading-content">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="loading-name-wrapper"
                        >
                            <span className="loading-name">
                                {text}
                                <span className="loading-cursor">|</span>
                            </span>
                        </motion.div>

                        <AnimatePresence>
                            {showSubtitle && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="loading-subtitle"
                                >
                                    Frontend Developer &bull; UI/UX Designer
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom progress bar */}
                    <div className="loading-progress-track">
                        <motion.div
                            className="loading-progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="loading-progress-text">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className={`loading-screen ${isDark ? 'loading-screen--dark' : 'loading-screen--light'}`}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <canvas ref={canvasRef} className="loading-particles" />
                    <div className="loading-content">
                        <div className="loading-name-wrapper">
                            <span className="loading-name">
                                {text}
                                <span className="loading-cursor">|</span>
                            </span>
                        </div>
                        {showSubtitle && (
                            <p className="loading-subtitle">
                                Frontend Developer &bull; UI/UX Designer
                            </p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
