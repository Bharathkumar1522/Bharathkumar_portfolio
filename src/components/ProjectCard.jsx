import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const ProjectCard = ({ project }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            variants={fadeInUp}
            className="group cursor-pointer h-full block"
            whileHover="hover"
            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(project.link, '_blank', 'noopener,noreferrer');
                }
            }}
        >
            <div className="card p-0 overflow-hidden h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                    {!imageError ? (
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            variants={{
                                hover: { scale: 1.1, transition: { duration: 0.4 } }
                            }}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center p-6"
                            style={{ background: 'linear-gradient(135deg, #1e2024, #23272b)' }}
                        >
                            <span className="text-white/70 text-center font-bold text-lg">
                                {project.title}
                            </span>
                        </div>
                    )}
                    <motion.div
                        initial={{ opacity: 0 }}
                        variants={{
                            hover: { opacity: 1 }
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
                    >
                        <div className="text-white">
                            <span className="text-sm opacity-90">{project.category}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <span className="text-xs sm:text-sm text-primary font-semibold dark:text-primary/90">
                                {project.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold font-heading mt-1.5 sm:mt-2 text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">
                                {project.title}
                            </h3>
                        </div>
                        <motion.div
                            variants={{
                                hover: { scale: 1.2, rotate: 45 }
                            }}
                            className="text-primary ml-4"
                        >
                            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
