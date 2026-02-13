import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3 sm:mb-4">BHARATH</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                        © BHARATH KUMAR {new Date().getFullYear()}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
