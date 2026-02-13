import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const ResumeCard = ({ item, type }) => {
    const handleClick = () => {
        if (item.certificateUrl) {
            window.open(item.certificateUrl, '_blank');
        }
    };

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={`card ${item.certificateUrl ? 'cursor-pointer' : ''}`}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (item.certificateUrl && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleClick();
                }
            }}
            role={item.certificateUrl ? 'button' : undefined}
            tabIndex={item.certificateUrl ? 0 : undefined}
            whileHover={item.certificateUrl ? { scale: 1.02, y: -5 } : {}}
        >
            <span className="text-primary font-semibold text-xs sm:text-sm">
                {item.period || item.duration}
            </span>

            <h4 className="text-lg sm:text-xl font-bold font-heading mt-1.5 sm:mt-2 mb-1 text-gray-900 dark:text-gray-100">
                {item.degree || item.role}
            </h4>

            {type === 'education' && (
                <>
                    <h5 className="text-gray-700 dark:text-gray-300 font-semibold">{item.institution}</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.certificate}</p>
                    <div className="inline-block mt-3 mb-3 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {item.grade}
                    </div>
                </>
            )}

            {type === 'experience' && (
                <>
                    <h5 className="text-gray-700 dark:text-gray-300 font-semibold">{item.company}</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.duration}</p>
                </>
            )}

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base">
                {item.description}
            </p>

            {/* Skills Tags */}
            {item.skills && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {item.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Nested Freelance Projects */}
            {item.projects && (
                <div className="mt-6 space-y-4">
                    <h5 className="text-gray-800 dark:text-gray-200 font-bold text-sm uppercase tracking-wider">Freelance Projects</h5>
                    {item.projects.map((project, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#e8ecf1] dark:bg-dark-card shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset">
                            <div className="flex justify-between items-start">
                                <h6 className="text-gray-900 dark:text-gray-100 font-bold">{project.name}</h6>
                                <span className="text-primary text-xs font-semibold whitespace-nowrap ml-2">{project.period}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-2">{project.description}</p>
                            {project.skills && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {project.skills.map((skill, j) => (
                                        <span key={j} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {item.certificateUrl && (
                <div className="flex items-center gap-2 mt-4 text-primary font-semibold">
                    <span>View Certificate</span>
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};

export default ResumeCard;
