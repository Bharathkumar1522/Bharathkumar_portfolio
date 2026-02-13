import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollTo } from '../hooks/useLenis';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(true);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Features', href: '#features' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contacts' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add background when scrolled
            setIsScrolled(currentScrollY > 50);

            // Hide/show header based on scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        scrollTo(href);
    };

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${isScrolled ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="w-full px-4 sm:px-6 lg:px-24">
                    <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            onClick={(e) => handleNavClick(e, '#home')}
                            className="text-2xl font-bold font-heading text-gray-900 dark:text-gray-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            BHARATH
                        </motion.a>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <ul className="flex items-center gap-10">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 relative group font-heading uppercase"
                                            style={{ fontSize: '13px', letterSpacing: '0.5px' }}
                                        >
                                            {item.name}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <ThemeToggle />
                            </motion.div>
                        </nav>

                        {/* Mobile Menu Button & Toggle */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <ThemeToggle />

                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                                aria-label="Toggle mobile menu"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        navItems={navItems}
                        onNavClick={handleNavClick}
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
