import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { staggerContainer } from '../../utils/animations';
import ServiceCard from '../ServiceCard';

const Features = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section id="features" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
                >
                    <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mt-3 sm:mt-4">
                        What I Do
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    ref={containerRef}
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                >
                    {portfolioData.services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
