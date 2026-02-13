import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
            style={{
                background: theme === 'dark' ? '#1e2024' : '#e8ecf1',
                boxShadow: theme === 'dark'
                    ? 'inset 5px 5px 10px #15191c, inset -5px -5px 10px #272b2f'
                    : 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'
            }}
            aria-label="Toggle Dark Mode"
            aria-pressed={theme === 'dark'}
        >
            <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                    background: 'linear-gradient(145deg, #ff014f, #ff4d00)',
                    marginLeft: theme === 'dark' ? 'auto' : '0',
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        {theme === 'dark' ? <FiMoon size={14} /> : <FiSun size={14} />}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
