import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { fadeInUp } from '../../utils/animations';
import ProgressBar from '../ProgressBar';
import ResumeCard from '../ResumeCard';

const Resume = () => {
    const [activeTab, setActiveTab] = useState('education');
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });

    const tabs = [
        { id: 'education', label: 'Education' },
        { id: 'professional', label: 'Professional Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'certifications', label: 'Certifications' },
    ];

    return (
        <section id="resume" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
                        My Resume
                    </h2>
                </motion.div>

                {/* Tabs - Responsive Neumorphic Container */}
                <div className="flex justify-center mb-8 sm:mb-12">
                    <div
                        className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-[20px] sm:rounded-[30px] w-full sm:w-auto max-w-full overflow-x-auto bg-[#e8ecf1] dark:bg-dark-card shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset"
                    >
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-[15px] sm:rounded-[20px] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-primary bg-white dark:bg-dark-bg shadow-neumorphism-soft dark:shadow-dark-neumorphism'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-transparent'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        ref={containerRef}
                    >
                        {/* Education Tab */}
                        {activeTab === 'education' && (
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                {portfolioData.education.map((edu, index) => (
                                    <ResumeCard key={index} item={edu} type="education" />
                                ))}
                            </div>
                        )}

                        {/* Professional Skills Tab */}
                        {activeTab === 'professional' && (
                            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
                                        Frontend Development Skills
                                    </h3>
                                    {portfolioData.skills.frontend.map((skill) => (
                                        <ProgressBar key={skill.name} skill={skill} isInView={isInView} />
                                    ))}
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
                                        Other Skills
                                    </h3>
                                    {portfolioData.skills.other.map((skill) => (
                                        <ProgressBar key={skill.name} skill={skill} isInView={isInView} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience Tab */}
                        {activeTab === 'experience' && (
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                {portfolioData.experience.map((exp, index) => (
                                    <ResumeCard key={index} item={exp} type="experience" />
                                ))}
                            </div>
                        )}

                        {/* Certifications Tab */}
                        {activeTab === 'certifications' && (
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                {portfolioData.certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        initial="initial"
                                        animate="animate"
                                        className="card cursor-pointer block"
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        onClick={() => window.open(cert.url, '_blank', 'noopener,noreferrer')}
                                        role="link"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                window.open(cert.url, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                    >
                                        <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-gray-100">
                                            {cert.title}
                                        </h4>
                                        {cert.issuer && (
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{cert.issuer}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
                                            <span>View Certificate</span>
                                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Resume;
