import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const ProgressBar = ({ skill, isInView }) => {
    const progressRef = useRef(null);
    const glowRef = useRef(null);
    const [displayPercent, setDisplayPercent] = useState(0);

    useEffect(() => {
        if (isInView && progressRef.current) {
            // Animate the bar width
            const progressTween = gsap.to(progressRef.current, {
                width: `${skill.level}%`,
                duration: 1.8,
                ease: 'power3.out',
                delay: 0.3,
            });

            // Animate the glow element
            let glowTween;
            if (glowRef.current) {
                glowTween = gsap.to(glowRef.current, {
                    width: `${skill.level}%`,
                    duration: 1.8,
                    ease: 'power3.out',
                    delay: 0.3,
                });
            }

            // Animate the counter
            const counter = { val: 0 };
            const counterTween = gsap.to(counter, {
                val: skill.level,
                duration: 1.8,
                ease: 'power3.out',
                delay: 0.3,
                onUpdate: () => {
                    setDisplayPercent(Math.round(counter.val));
                },
            });

            return () => {
                progressTween.kill();
                if (glowTween) glowTween.kill();
                counterTween.kill();
            };
        }
    }, [isInView, skill.level]);

    return (
        <div className="mb-6 group">
            {/* Skill Name & Percentage */}
            <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider">
                    {skill.name}
                </h6>
                <motion.span
                    className="text-sm font-extrabold px-3 py-0.5 rounded-full"
                    style={{
                        background: 'linear-gradient(135deg, #ff014f, #ff4d00)',
                        color: '#ffffff',
                        boxShadow: '0 2px 8px rgba(255, 1, 79, 0.3)',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.4, type: 'spring' }}
                >
                    {displayPercent}%
                </motion.span>
            </div>

            {/* Progress Track (Neumorphic Inset) */}
            <div
                className="relative w-full h-4 rounded-full overflow-hidden bg-[#e0e0e0] dark:bg-dark-card shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset"
            >
                {/* Animated Fill Bar */}
                <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                        width: '0%',
                        background: 'linear-gradient(90deg, #ff014f, #ff4d00, #ff014f)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s ease-in-out infinite',
                        boxShadow: '0 0 12px rgba(255, 1, 79, 0.4), 0 0 4px rgba(255, 77, 0, 0.3)',
                    }}
                />

                {/* Subtle highlight on top of bar */}
                <div
                    ref={glowRef}
                    className="absolute top-0 left-0 h-1/2 rounded-full opacity-30"
                    style={{
                        width: '0%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.6), transparent)',
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
