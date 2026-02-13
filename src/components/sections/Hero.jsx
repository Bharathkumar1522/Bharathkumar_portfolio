import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';
import { FaLinkedinIn, FaInstagram, FaGithub, FaReact, FaNodeJs, FaFigma, FaPython } from 'react-icons/fa';

const iconMap = {
    linkedin: <FaLinkedinIn />,
    github: <FaGithub />,
    instagram: <FaInstagram />,
    react: <FaReact />,
    node: <FaNodeJs />,
    figma: <FaFigma />,
    python: <FaPython />,
};

const Hero = () => {
    const { personal } = portfolioData;
    const controls = useAnimation();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isInView) {
            controls.start('animate');
        }
    }, [isInView, controls]);

    // Typewriter effect
    // Typewriter effect
    useEffect(() => {
        if (!personal.role || personal.role.length === 0) return;

        const currentRole = personal.role[roleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        let timer;

        if (!isDeleting && charIndex === currentRole.length) {
            timer = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && charIndex === 0) {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % personal.role.length);
            }, 0);
        } else {
            timer = setTimeout(() => {
                setText(currentRole.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
                setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, personal.role]);

    return (
        <section id="home" className="min-h-screen flex items-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-16">
            <div className="w-full px-4 sm:px-6 lg:px-24">
                <div ref={containerRef} className="grid lg:grid-cols-[60%_40%] gap-8 lg:gap-10 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial="initial"
                        animate={controls}
                        variants={{
                            animate: {
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        <motion.span
                            variants={fadeInUp}
                            className="font-medium mb-5 sm:mb-6 lg:mb-8 block uppercase tracking-[2px] text-xs sm:text-sm font-heading text-gray-500"
                        >
                            {personal.tagline}
                        </motion.span>

                        <motion.h1
                            variants={slideInLeft}
                            className="font-bold font-heading mb-6 sm:mb-8 lg:mb-10 leading-tight text-gray-900"
                            style={{ lineHeight: '1.4' }}
                        >
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px]">
                                Hi, I'm <span className="gradient-text">{personal.name}</span>
                            </span>
                            <motion.span
                                className="block mt-3 sm:mt-4 lg:mt-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[52px] text-[#1a1a2e] dark:text-gray-100"
                            >
                                <span className="text-primary">a </span>{text}<span className="animate-pulse">|</span>
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-[44rem] mx-auto lg:mx-0 text-sm sm:text-base"
                            style={{ lineHeight: '2.0' }}
                        >
                            {personal.description}
                        </motion.p>

                        <motion.a
                            variants={fadeInUp}
                            href={personal.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Bharath_Kumar_Resume.pdf"
                            className="btn-primary inline-flex items-center gap-2"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <motion.svg
                                variants={{
                                    hover: { y: [0, 2, 0], transition: { repeat: Infinity, duration: 0.8 } }
                                }}
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </motion.svg>
                            Download Resume
                        </motion.a>


                        {/* Social and Skills */}
                        <motion.div
                            variants={fadeInUp}
                            className="grid grid-cols-2 gap-6 sm:gap-8 mt-16 sm:mt-20 lg:mt-32"
                        >
                            {/* Social Links */}
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm uppercase font-light mb-3 sm:mb-4 font-heading" style={{ letterSpacing: '2px' }}>
                                    Find With Me
                                </p>
                                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                                    {Object.entries(personal.social).map(([platform, url]) => (
                                        <motion.a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-primary dark:hover:text-primary bg-[#e8ecf1] dark:bg-dark-card shadow-neumorphism-soft dark:shadow-dark-neumorphism"
                                            whileHover="hover"
                                            whileTap={{ scale: 0.95 }}
                                            title={platform}
                                        >
                                            <motion.span
                                                variants={{
                                                    hover: { scale: 1.2, rotate: 15 }
                                                }}
                                                className="text-lg sm:text-xl lg:text-2xl"
                                            >
                                                {iconMap[platform] || platform[0].toUpperCase()}
                                            </motion.span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Best Skills */}
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm uppercase font-light mb-3 sm:mb-4 font-heading" style={{ letterSpacing: '2px' }}>
                                    Best Skill On
                                </p>
                                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                                    {personal.bestSkillOn && personal.bestSkillOn.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-primary dark:hover:text-primary bg-[#e8ecf1] dark:bg-dark-card shadow-neumorphism-soft dark:shadow-dark-neumorphism"
                                            whileHover="hover"
                                            title={skill.name}
                                        >
                                            <motion.span
                                                variants={{
                                                    hover: { scale: 1.2, rotate: 360, transition: { duration: 0.5 } }
                                                }}
                                                className="text-lg sm:text-xl lg:text-2xl"
                                            >
                                                {iconMap[skill.icon] || skill.name[0]}
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial="initial"
                        animate={controls}
                        variants={slideInRight}
                        className="order-1 lg:order-2 flex justify-center items-center -mt-10 sm:-mt-20 lg:-mt-72 lg:-translate-x-12"
                    >
                        {/* Animated RGB Gradient Border Circle */}
                        <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px]">
                            {/* Spinning gradient border */}
                            <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
                                background: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
                                animationDuration: '8s'
                            }} />

                            {/* Inner circle with proper background */}
                            <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] sm:top-[7.5px] sm:left-[7.5px] sm:w-[calc(100%-15px)] sm:h-[calc(100%-15px)] rounded-full overflow-hidden flex items-center justify-center" style={{
                                background: 'linear-gradient(145deg, #1e2024, #23272b)'
                            }}>
                                <img
                                    src={personal.image}
                                    alt={personal.name}
                                    className="w-full h-full object-cover object-center"
                                    style={{ objectPosition: 'center 20%' }}
                                    loading="eager"
                                    fetchpriority="high"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
