import { LogoCloud } from './ui/logo-cloud';
import { cn } from '../lib/utils';
import { SiReact, SiPython, SiFigma, SiTailwindcss, SiVercel, SiGithub, SiOpenai, SiGoogle } from 'react-icons/si';
import { FaHeart, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

const logos = [
    { name: "React", component: SiReact },
    { name: "Python", component: SiPython },
    { name: "Figma", component: SiFigma },
    { name: "Tailwind CSS", component: SiTailwindcss },
    { name: "Vercel", component: SiVercel },
    { name: "GitHub", component: SiGithub },
    { name: "OpenAI", component: SiOpenai },
    { name: "Google Gemini", component: SiGoogle },
];

const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-[400px] flex flex-col justify-center transition-colors duration-300">
            {/* Radial Gradient Background */}
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[100vmin] w-[100vmin] -translate-y-1/2 rounded-full",
                    "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]",
                    "blur-[60px]"
                )}
            />

            <div className="container-custom relative z-10 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
                        Powered by Modern Tech
                    </h2>
                    <div className="mx-auto my-5 h-px max-w-sm bg-gradient-to-r from-transparent via-gray-400/20 dark:via-white/20 to-transparent" />
                </div>

                <div className="mb-16">
                    <LogoCloud logos={logos} />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/20 transition-colors">
                        <span>© {new Date().getFullYear()} Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-red-500"
                        >
                            <FaHeart />
                        </motion.span>
                        <span>&</span>
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                            className="text-primary"
                        >
                            <FaRobot />
                        </motion.span>
                        <span>by <span className="gradient-text-animated font-bold">Bharath Kumar</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
