'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export const useLenis = () => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        setLenis(instance);
        lenisInstance = instance;

        let rafId;
        function raf(time) {
            instance.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

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
        lenisInstance.scrollTo(target, { offset: 0, duration: 1.5 });
    }
};
