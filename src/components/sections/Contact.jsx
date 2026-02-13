import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../../data/portfolioData';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        // Map data to match EmailJS template variables
        // We map 'from_name' to 'name' because the template uses {{name}} for the "From Name" field
        const templateParams = {
            ...data,
            name: data.from_name,
            from_name: data.from_name
        };

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setSubmitStatus({
                type: 'success',
                message: '✅ Message sent successfully!'
            });
            formRef.current.reset();

        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({
                type: 'error',
                message: '❌ Failed to send message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const { personal } = portfolioData;

    return (
        <section id="contacts" className="section-padding">
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
                        Contact
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mt-3 sm:mt-4">
                        Contact With Me
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
                    {/* Left Side - Contact Info */}
                    <motion.div
                        variants={slideInLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="card sticky top-24 bg-[#e8ecf1] dark:bg-dark-card shadow-card dark:shadow-dark-card">
                            <div className="w-full h-40 sm:h-52 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-5 sm:mb-6 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <FaHandshake className="w-20 h-20 sm:w-28 sm:h-28 text-primary drop-shadow-lg" />
                                </motion.div>
                            </div>

                            <h4 className="text-xl sm:text-2xl font-bold font-heading mb-2 text-gray-900 dark:text-gray-100">
                                {personal.name}
                            </h4>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                                I am available for freelance work. Connect with me via and call in to my account.
                            </p>

                            <div className="space-y-3 mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href={`tel:${personal.phone}`} className="hover:text-primary transition-colors break-all">
                                        {personal.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href={`mailto:${personal.email}`} className="hover:text-primary transition-colors break-all">
                                        {personal.email}
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-3 sm:mb-4">
                                    Find With Me
                                </p>
                                <div className="flex gap-3 sm:gap-4">
                                    <a
                                        href={personal.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <motion.div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-primary dark:hover:text-primary bg-[#e8ecf1] dark:bg-gray-800 shadow-neumorphism-soft dark:shadow-dark-neumorphism"
                                            whileHover="hover"
                                        >
                                            <motion.svg
                                                whileHover={{ scale: 1.2, rotate: 15 }}
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </motion.svg>
                                        </motion.div>
                                    </a>
                                    <a
                                        href={personal.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <motion.div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-primary dark:hover:text-primary bg-[#e8ecf1] dark:bg-gray-800 shadow-neumorphism-soft dark:shadow-dark-neumorphism"
                                            whileHover="hover"
                                        >
                                            <motion.svg
                                                whileHover={{ scale: 1.2, rotate: 15 }}
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </motion.svg>
                                        </motion.div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        variants={slideInRight}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <motion.div variants={fadeInUp}>
                                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="from_name"
                                        required
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] sm:rounded-[19px] bg-[#e8ecf1] dark:bg-dark-bg shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-gray-700 dark:text-gray-300 text-sm sm:text-base border-none"
                                    />
                                </motion.div>

                                <motion.div variants={fadeInUp}>
                                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] sm:rounded-[19px] bg-[#e8ecf1] dark:bg-dark-bg shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-gray-700 dark:text-gray-300 text-sm sm:text-base border-none"
                                    />
                                </motion.div>
                            </div>

                            <motion.div variants={fadeInUp}>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] sm:rounded-[19px] bg-[#e8ecf1] dark:bg-dark-bg shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-gray-700 dark:text-gray-300 text-sm sm:text-base border-none"
                                />
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] sm:rounded-[19px] bg-[#e8ecf1] dark:bg-dark-bg shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-gray-700 dark:text-gray-300 text-sm sm:text-base border-none"
                                />
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] sm:rounded-[19px] bg-[#e8ecf1] dark:bg-dark-bg shadow-neumorphism-inset dark:shadow-dark-neumorphism-inset focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-gray-700 dark:text-gray-300 text-sm sm:text-base border-none"
                                />
                            </motion.div>

                            {submitStatus.message && (
                                <div
                                    className={`p-3 sm:p-4 rounded-lg text-sm ${submitStatus.type === 'success'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto items-center gap-2"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                <motion.svg
                                    variants={{
                                        hover: { x: 5, y: -5, transition: { repeat: Infinity, duration: 1, repeatType: "reverse" } }
                                    }}
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </motion.svg>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
