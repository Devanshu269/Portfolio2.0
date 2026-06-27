import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import TiltCard from '../TiltCard/TiltCard';
import './Work.css';

const Work = () => {
    const experiences = [
        {
            company: "Lowe's India",
            period: "Aug 2022 – Present",
            location: "Bengaluru, India",
            roles: [
                {
                    title: "Software Engineer",
                    period: "Oct 2024 – Present",
                    achievements: [
                        "Leading development initiatives and mentoring junior developers to architect scalable solutions for enterprise-level applications.",
                        "<strong>Architected and implemented a micro-frontend solution</strong> using Webpack Module Federation, consolidating 5 separate applications into a single host to dramatically improve performance, maintainability, and development efficiency.",
                        "Upgraded the core front-end technology stack by leveraging <strong>React.memo</strong> and <strong>useCallback</strong>, and conducted extensive code reviews—achieving a <strong>30% increase in performance</strong> and faster load times.",
                        "Implemented a comprehensive monitoring and deployment strategy using <strong>Grafana and Prometheus</strong> for real-time server health tracking, while driving Agile execution via Jira and Confluence.",
                        "Fostered cross-team collaboration to streamline best practices and technical decisions across the development lifecycle."
                    ],
                    tags: ["Micro-Frontends", "Webpack", "React.js", "Grafana", "Prometheus", "Spring Boot"]
                },
                {
                    title: "Associate Software Engineer",
                    period: "Aug 2022 – Oct 2024",
                    achievements: [
                        "Revamped the shipment tracking and pricing analysis interface, as well as intuitive <strong>React-based dashboards</strong> (like the Assortment Dashboard), <strong>boosting user satisfaction by 25%</strong> and improving on-time delivery visibility by 20%.",
                        "Developed a fully configurable <strong>file upload architecture</strong> with built-in UI validation, reducing implementation time for new uploads from 3 days to just 1 hour via modular automation.",
                        "Engineered robust <strong>RESTful Web Services</strong> utilizing <strong>Java and Spring Boot</strong>, streamlining critical data exchange with third-party applications and proactively resolving technical debt.",
                        "Successfully implemented secure <strong>SSO login</strong> architecture alongside early micro-frontend concepts, while providing critical on-call support for robust microservices."
                    ],
                    tags: ["React", "Java", "Spring Boot", "REST APIs", "SSO", "UI/UX"]
                }
            ]
        },
        {
            company: "Softnika Solutions",
            period: "May 2020 – June 2020",
            location: "Bengaluru, India",
            roles: [
                {
                    title: "Web Developer Intern",
                    period: "May 2020 – June 2020",
                    achievements: [
                        "Developed a comprehensive gaming platform using <strong>React</strong>, providing gamers with centralized access to game information, news, and purchasing options.",
                        "Implemented shopping cart functionality and a dynamic news feed featuring the latest <strong>Esports updates</strong> and game releases.",
                        "Engineered user-friendly interfaces enabling gamers to intuitively compare prices, browse game catalogs, and access both free and premium content.",
                        "Developed a secure <strong>user authentication system</strong> with account management, order tracking, and personalized game recommendations based on user preferences."
                    ],
                    tags: ["React", "HTML5", "CSS3", "JavaScript", "Authentication"]
                }
            ]
        }
    ];

    return (
        <section id="work" className="work-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Professional Journey</span>
                    <h2 className="section-title">Work <br /> <span className="outline-text">Experience</span></h2>
                </div>

                <div className="experience-list">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{ perspective: 1000 }}
                        >
                            <TiltCard className="experience-card glass">
                                <div className="exp-left">
                                    <div className="exp-icon">
                                        <Briefcase size={32} />
                                    </div>
                                    <div className="exp-company-details">
                                        <h3 className="company-name">{exp.company}</h3>
                                        <div className="exp-company-meta">
                                            <span><Calendar size={14} /> {exp.period}</span>
                                            <span><MapPin size={14} /> {exp.location}</span>
                                        </div>
                                        {exp.roles.length > 1 && (
                                            <div className="promotion-badge animate-pulse">
                                                <span className="promo-star">★</span> Promoted Inside
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`exp-roles-container ${exp.roles.length > 1 ? 'has-multiple-roles' : ''}`}>
                                    {exp.roles.map((role, rIndex) => (
                                        <div key={rIndex} className="exp-role-item">
                                            {exp.roles.length > 1 && <div className="timeline-node" />}
                                            <div className="role-header">
                                                <h4 className="role-title">{role.title}</h4>
                                                <span className="role-period">{role.period}</span>
                                            </div>
                                            <ul className="role-achievements">
                                                {role.achievements.map((achieve, i) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: achieve }}></li>
                                                ))}
                                            </ul>
                                            <div className="exp-tags">
                                                {role.tags.map(tag => (
                                                    <span key={tag} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
