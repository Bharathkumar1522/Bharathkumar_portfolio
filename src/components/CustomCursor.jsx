import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const smoothPos = useRef({ x: -100, y: -100 });
    const trailPositions = useRef([]);
    const isHovering = useRef(false);
    const isClicking = useRef(false);
    const animFrameId = useRef(null);
    const clickRipples = useRef([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const onMouseEnterInteractive = useCallback(() => { isHovering.current = true; }, []);
    const onMouseLeaveInteractive = useCallback(() => { isHovering.current = false; }, []);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            // Hide custom cursor when hovering over scrollbar (right edge)
            if (e.clientX > window.innerWidth - 20) {
                canvas.style.opacity = '0';
            } else {
                canvas.style.opacity = '1';
            }
        };
        const onMouseDown = () => {
            isClicking.current = true;
            clickRipples.current.push({ x: mousePos.current.x, y: mousePos.current.y, birth: Date.now() });
        };
        const onMouseUp = () => { isClicking.current = false; };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Track interactive elements
        const addListeners = () => {
            const els = document.querySelectorAll(
                'a, button, .card, .btn-primary, input, textarea, [role="button"], label, select'
            );
            els.forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
            return els;
        };
        let interactives = addListeners();
        const observer = new MutationObserver(() => {
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
            interactives = addListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Draw the pointer shape — chunky black border, no glow
        const drawPointerShape = (cx, cy, scale, fillColor, strokeColor, strokeWidth) => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(scale, scale);

            // The pointer path (matching the SVG)
            ctx.beginPath();
            ctx.moveTo(0, 0);           // tip
            ctx.lineTo(0, 17.59);       // straight down left edge
            ctx.bezierCurveTo(0, 17.59, 0.2, 17.8, 0.4, 17.6);
            ctx.lineTo(5.26, 12.74);    // diagonal to the notch
            ctx.lineTo(5.61, 12.74);    // small horizontal at notch
            ctx.lineTo(12.48, 12.74);   // right edge bottom
            ctx.lineTo(0, 0);           // back to tip
            ctx.closePath();

            // Chunky border
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.stroke();

            // Fill
            ctx.fillStyle = fillColor;
            ctx.fill();

            ctx.restore();
        };

        let hue = 0;
        const TRAIL_COUNT = 8;
        const BASE_SCALE = 1.8; // Bigger cursor

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const target = mousePos.current;
            const hovering = isHovering.current;
            const clicking = isClicking.current;

            // Smooth cursor position
            const lerp = 0.35;
            smoothPos.current.x += (target.x - smoothPos.current.x) * lerp;
            smoothPos.current.y += (target.y - smoothPos.current.y) * lerp;

            const sx = smoothPos.current.x;
            const sy = smoothPos.current.y;

            // Store trail positions
            trailPositions.current.push({ x: sx, y: sy, time: Date.now() });
            if (trailPositions.current.length > TRAIL_COUNT) {
                trailPositions.current.shift();
            }

            hue = (hue + 0.8) % 360;

            // --- Ghost trail pointers ---
            const trail = trailPositions.current;
            for (let i = 0; i < trail.length - 1; i++) {
                const t = i / trail.length;
                const alpha = t * 0.12;
                const trailScale = BASE_SCALE * (0.85 + t * 0.15);
                drawPointerShape(
                    trail[i].x, trail[i].y,
                    trailScale * (hovering ? 1.1 : 1),
                    `rgba(255, 255, 255, ${alpha})`,
                    `rgba(0, 0, 0, ${alpha * 0.8})`,
                    2
                );
            }

            // --- Main pointer ---
            const mainScale = BASE_SCALE * (clicking ? 0.85 : hovering ? 1.15 : 1);

            // Draw main pointer: white fill + chunky black border
            drawPointerShape(
                sx, sy, mainScale,
                '#FFFFFF',
                '#000000',
                3
            );

            // --- Sparkle particles on hover ---
            if (hovering) {
                const sparkleCount = 4;
                const time = Date.now() * 0.004;
                for (let i = 0; i < sparkleCount; i++) {
                    const angle = time + (i * Math.PI * 2) / sparkleCount;
                    const radius = 30 + Math.sin(time * 2 + i) * 8;
                    const px = sx + 10 + Math.cos(angle) * radius;
                    const py = sy + 14 + Math.sin(angle) * radius;
                    const sparkSize = 2.5 + Math.sin(time * 3 + i * 2) * 1;

                    ctx.beginPath();
                    ctx.arc(px, py, sparkSize, 0, Math.PI * 2);
                    const sparkHue = (hue + i * 90) % 360;
                    ctx.fillStyle = `hsla(${sparkHue}, 100%, 65%, 0.7)`;
                    ctx.fill();
                }
            }

            // --- Click ripple effects ---
            const now = Date.now();
            clickRipples.current = clickRipples.current.filter(r => now - r.birth < 500);
            clickRipples.current.forEach(r => {
                const age = (now - r.birth) / 500;
                const rippleR = age * 40;
                const rippleAlpha = (1 - age) * 0.5;
                ctx.beginPath();
                ctx.arc(r.x, r.y, rippleR, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 0, 0, ${rippleAlpha * 0.6})`;
                ctx.lineWidth = 2.5 * (1 - age);
                ctx.stroke();

                // Inner filled ripple
                ctx.beginPath();
                ctx.arc(r.x, r.y, rippleR * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${rippleAlpha * 0.08})`;
                ctx.fill();
            });

            animFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameId.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
            observer.disconnect();
        };
    }, [onMouseEnterInteractive, onMouseLeaveInteractive]);

    if (isTouchDevice) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 99999,
            }}
        />
    );
};

export default CustomCursor;
