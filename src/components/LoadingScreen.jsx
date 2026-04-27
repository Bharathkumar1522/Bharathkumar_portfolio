'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const fullText = '< Bharath Kumar />';
    const canvasRef = useRef(null);
    const stableOnComplete = useCallback(onComplete, [onComplete]);

    // Particle grid background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.classList.contains('dark');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create particles — fewer for performance
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        for (let i = 0; i < particleCount; i++) {
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

            // Draw connections — reduced threshold for perf
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = isDark ? `rgba(255, 1, 79, ${0.06 * (1 - dist / 100)})` : `rgba(255, 1, 79, ${0.1 * (1 - dist / 100)})`;
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
                setTimeout(() => setShowSubtitle(true), 50);
            }
        }, 20); // Much faster typing

        return () => clearInterval(interval);
    }, [fullText]);

    // Progress bar
    useEffect(() => {
        // Very fast duration to ensure LCP is hit quickly
        const duration = 250; 
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
                    setTimeout(() => stableOnComplete(), 300); // Wait for exit animation
                }, 50);
            }
        };
        
        requestAnimationFrame(tick);
    }, [stableOnComplete]);

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className="loading-screen"
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    <canvas ref={canvasRef} className="loading-particles" />
                    <div className="loading-corner loading-corner--tl" />
                    <div className="loading-corner loading-corner--br" />
                    <div className="loading-content">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="loading-name-wrapper"
                        >
                            <span className="loading-name font-heading">
                                {text}<span className="loading-cursor">|</span>
                            </span>
                        </motion.div>
                        <AnimatePresence>
                            {showSubtitle && (
                                <motion.p
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="loading-subtitle font-sans"
                                >
                                    Frontend Developer &bull; UI/UX Designer
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="loading-progress-track">
                        <motion.div
                            className="loading-progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="loading-progress-text font-heading">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="loading-screen"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    <canvas ref={canvasRef} className="loading-particles" />
                    <div className="loading-content">
                        <div className="loading-name-wrapper">
                            <span className="loading-name font-heading">
                                {text}<span className="loading-cursor">|</span>
                            </span>
                        </div>
                        {showSubtitle && (
                            <p className="loading-subtitle font-sans">
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
