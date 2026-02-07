import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Work.css';

const Work = () => {
    const experiences = [
        {
            title: "Software Engineer",
            company: "Lowe's India",
            period: "Oct 2024 – Present",
            location: "Bengaluru, India",
            description: "Leading development initiatives and mentoring junior developers, I architect scalable solutions for enterprise-level applications. My focus includes optimizing system performance and implementing best practices across the development lifecycle. Key technologies utilized in this role include React.js, Node.js, Spring Boot, PostgreSQL, and Kafka. I led the migration to a micro-frontend architecture and improved system performance by 30%. Responsibilities encompass extensive code reviews, technical decision-making, and fostering cross-team collaboration.",
            tags: ["Micro-Frontends", "React.js", "Node.js", "Spring Boot", "Kafka", "PostgreSQL"]
        },
        {
            title: "Associate Software Engineer",
            company: "Lowe's India",
            period: "Aug 2022 – Oct 2024",
            location: "Bengaluru, India",
            description: "Contributed to multiple high-impact projects including Bulk UI updates, Smart Sourcing, Node Capabilities, and a robust File Upload system. Developed intuitive React-based dashboards, such as the Assortment Dashboard, significantly increasing user engagement. I leveraged technologies like React.js, JavaScript, Java, Spring Boot, PostgreSQL, and Kafka. This role involved close collaboration with cross-functional teams, including UX designers and product managers. I successfully implemented SSO login architecture and micro-frontend concepts, while also proactively resolving technical debt and providing critical on-call support.",
            tags: ["React", "Java", "Spring Boot", "Kafka", "SSO", "PostgreSQL"]
        },
        {
            title: "Web Developer Intern",
            company: "Softnika Solutions",
            period: "May 2020 – June 2020",
            location: "Bengaluru, India",
            description: "Gained foundational hands-on experience in web development at Softnika Solutions. I mastered core web technologies including HTML5, CSS3, and JavaScript, applying responsive design principles. Worked on real-world client projects under the guidance of senior developers, learning essential version control with Git and agile development practices, which laid a solid foundation for my professional career.",
            tags: ["HTML5", "CSS3", "JavaScript", "Git"]
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
                            className="experience-card glass"
                        >
                            <div className="exp-left">
                                <div className="exp-icon">
                                    <Briefcase size={24} />
                                </div>
                                <div className="exp-info">
                                    <h3>{exp.title}</h3>
                                    <p className="company">{exp.company}</p>
                                    <div className="exp-meta">
                                        <span><Calendar size={14} /> {exp.period}</span>
                                        <span><MapPin size={14} /> {exp.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="exp-right">
                                <p>{exp.description}</p>
                                <div className="exp-tags">
                                    {exp.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
