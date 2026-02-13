import { useEffect, useState } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export const useLenis = () => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const instance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLenis(instance);
        lenisInstance = instance;

        // Animation loop
        let rafId;
        function raf(time) {
            instance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            cancelAnimationFrame(rafId);
            instance.destroy();
            lenisInstance = null;
            setLenis(null);
        };
    }, []);

    return lenis;
};

export const scrollTo = (target) => {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, {
            offset: 0,
            duration: 1.5
        });
    }
};
