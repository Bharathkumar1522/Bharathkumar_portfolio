import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (animationCallback, dependencies = []) => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const ctx = gsap.context(() => {
            animationCallback(elementRef.current);
        }, elementRef);

        return () => ctx.revert();
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

    return elementRef;
};

// Parallax utility
export const useParallax = (speed = 0.5) => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(elementRef.current, {
                yPercent: -50 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, elementRef);

        return () => ctx.revert();
    }, [speed]);

    return elementRef;
};
