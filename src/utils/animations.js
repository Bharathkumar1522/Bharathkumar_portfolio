// Framer Motion animation variants

export const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.6 }
    }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

export const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const slideInRight = {
    initial: { x: 100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const floatAnimation = {
    initial: { y: 0 },
    animate: {
        y: [-20, 0, -20],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 }
    }
};

export const menuSlide = {
    initial: {
        x: "100%"
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        x: "100%",
        transition: {
            duration: 0.4,
            ease: "easeIn"
        }
    }
};

export const navItem = {
    initial: {
        y: 80,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    }
};
