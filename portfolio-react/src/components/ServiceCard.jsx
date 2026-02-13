import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { FiMonitor, FiFigma, FiServer, FiDatabase, FiFileText, FiLayout } from 'react-icons/fi';

const iconMap = {
    monitor: <FiMonitor className="w-10 h-10" />,
    figma: <FiFigma className="w-10 h-10" />,
    server: <FiServer className="w-10 h-10" />,
    database: <FiDatabase className="w-10 h-10" />,
    'file-text': <FiFileText className="w-10 h-10" />,
    layout: <FiLayout className="w-10 h-10" />,
};

const ServiceCard = ({ service }) => {
    return (
        <motion.div
            variants={fadeInUp}
            className="card group hover:scale-105 transition-all duration-300 hover:-translate-y-2"
            whileHover="hover"
        >
            {/* Icon */}
            <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-4 sm:mb-6 text-primary"
                variants={{
                    hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } }
                }}
            >
                {iconMap[service.icon]}
            </motion.div>

            {/* Content */}
            <h3 className="text-lg sm:text-xl font-bold font-heading mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                {service.description}
            </p>
        </motion.div>
    );
};

export default ServiceCard;
