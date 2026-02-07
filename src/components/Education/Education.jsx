import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import './Education.css';

const Education = () => {
    const education = [
        {
            degree: "Scaler BootCamp",
            period: "2021 – 2023",
            institution: "Scaler Academy",
            description: "Specialized training focus on Data Structures & Algorithms (DSA) and advanced Frontend Development."
        },
        {
            degree: "Bachelor of Engineering (CS)",
            period: "2017 – 2021",
            institution: "AMC Engineering College",
            description: "Computer Science and Engineering. Built a strong foundation in core computer science principles."
        },
        {
            degree: "Higher Secondary Education",
            period: "2015 – 2017",
            institution: "Resonance International School",
            description: "Science Stream. Developed analytical and problem-solving skills early on."
        }
    ];

    return (
        <section id="education" className="education-section">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Academic Path</span>
                    <h2 className="section-title">Education <br /> <span className="outline-text">History</span></h2>
                </div>

                <div className="education-grid">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="education-card glass"
                        >
                            <div className="edu-icon-wrapper">
                                <GraduationCap size={28} color="var(--primary)" />
                            </div>
                            <div className="edu-content">
                                <div className="edu-header">
                                    <h3>{edu.degree}</h3>
                                    <span className="edu-period">{edu.period}</span>
                                </div>
                                <h4 className="edu-institution">{edu.institution}</h4>
                                <p className="edu-description">{edu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
