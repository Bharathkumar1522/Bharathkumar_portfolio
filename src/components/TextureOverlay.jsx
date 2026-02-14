const TextureOverlay = ({ type = 'dots', className = '' }) => {
    return (
        <div
            className={`texture-overlay texture-${type} ${className}`}
            aria-hidden="true"
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
            }}
        />
    );
};

// Gradient glow blob — uses inline radial gradient for reliable cross-theme rendering
export const GradientGlow = ({ position = 'top-right', color = 'primary', size = 'md', className = '' }) => {
    const positionStyles = {
        'top-right': { top: '-10%', right: '-10%' },
        'top-left': { top: '-10%', left: '-10%' },
        'bottom-right': { bottom: '-10%', right: '-10%' },
        'bottom-left': { bottom: '-10%', left: '-10%' },
        'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    };

    const sizeMap = {
        sm: 400,
        md: 600,
        lg: 800,
    };

    // Using hex colors with decent opacity so the glows are clearly visible
    const colorStyles = {
        primary: 'rgba(255, 1, 79, 0.12)',       // #ff014f at 12%
        secondary: 'rgba(255, 77, 0, 0.10)',      // #ff4d00 at 10%
        mixed: 'rgba(255, 1, 79, 0.10)',
    };

    const dim = sizeMap[size];

    return (
        <div
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
            style={{
                position: 'absolute',
                ...positionStyles[position],
                width: dim,
                height: dim,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${colorStyles[color]} 0%, transparent 70%)`,
                filter: 'blur(60px)',
                zIndex: 0,
            }}
        />
    );
};

export default TextureOverlay;
