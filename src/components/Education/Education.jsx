import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import './Education.css';

const Education = () => {
    const education = [
        {
            degree: "Master of Science in Computer Science",
            period: "2024 – 2026",
            institution: "Woolf University",
            description: "A rigorous, project-based postgraduate degree focused on advanced systems engineering and computational thinking. Specializing in state-of-the-art sub-areas including Artificial Intelligence & Machine Learning and Cloud & Full Stack Development.",
            accreditation: [
                "Malta - EQF7",
                "Switzerland - EQF7",
                "Wisconsin - Postgraduate"
            ],
            details: {
                "Workload": "2250 Hours (90 ECTS)",
                "Standard Length": "22 Months",
                "Mode": "Fully Online",
                "Capstone Project": "30 ECTS Advanced Applied CS"
            }
        },
        {
            degree: "Scaler BootCamp",
            period: "2021 – 2022",
            institution: "Scaler Academy",
            description: "Specialized training focus on Data Structures & Algorithms (DSA) and advanced Frontend Development.",
            accreditation: [
                "Advanced DSA Certified",
                "Full Stack Specialization",
                "System Design Certified"
            ],
            details: {
                "Format": "Mentorship & Live Interactive Sessions",
                "Core Focus": "Algorithmic Problem Solving & System Architectures",
                "Key Technologies": "React.js, Node.js, JavaScript (ES6+)",
                "Methodology": "Industry-Led Projects & Peer Coding"
            }
        },
        {
            degree: "Bachelor of Engineering (CS)",
            period: "2017 – 2021",
            institution: "AMC Engineering College",
            description: "Computer Science and Engineering. Built a strong foundation in core computer science principles.",
            accreditation: [
                "VTU Affiliated",
                "AICTE Approved"
            ],
            details: {
                "Specialization": "Computer Science & Engineering",
                "Key Coursework": "OS, DBMS, Computer Networks, Software Engineering",
                "Capstone": "Full-Stack Web Development Major Project",
                "Duration": "4 Years (Full-Time Degree)"
            }
        },
        {
            degree: "Higher Secondary Education",
            period: "2015 – 2017",
            institution: "Resonance International School",
            description: "Science Stream. Developed analytical and problem-solving skills early on.",
            accreditation: [
                "Science & Mathematics Stream"
            ],
            details: {
                "Major Subjects": "Physics, Chemistry, Mathematics, Computer Science",
                "Foundational Skills": "Advanced Mathematics & Intro to Programming (C++)",
                "Duration": "2 Years"
            }
        }
    ];

    return (
        <section id="education" className="education-section bg-starlight">
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

                                {edu.accreditation && (
                                    <div className="edu-accreditations">
                                        {edu.accreditation.map((acc, i) => (
                                            <span key={i} className="edu-tag accreditation-tag">{acc}</span>
                                        ))}
                                    </div>
                                )}

                                {edu.details && (
                                    <div className="edu-meta-grid">
                                        {Object.entries(edu.details).map(([key, val]) => (
                                            <div key={key} className="edu-meta-item">
                                                <span className="edu-meta-label">{key}</span>
                                                <span className="edu-meta-value">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {edu.link && (
                                    <div className="edu-link-container">
                                        <a href={edu.link} target="_blank" rel="noopener noreferrer" className="edu-link-btn">
                                            <span>Program Details</span>
                                            <svg className="edu-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
