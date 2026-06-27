import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Terminal,
    Cpu,
    Globe
} from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            icon: <Globe />,
            skills: ["HTML5/CSS3", "React.js", "Next.js", "Tailwind CSS", "SASS"]
        },
        {
            title: "Backend",
            icon: <Terminal />,
            skills: ["Node.js", "Express", "Microservices", "Java", "Spring Boot", "Python"]
        },
        {
            title: "Databases",
            icon: <Database />,
            skills: ["PostgreSQL", "MongoDB", "MySQL"]
        },
        {
            title: "DevOps & Tools",
            icon: <Cpu />,
            skills: ["Git", "Kafka", "Postman"]
        }
    ];

    const handleMouseMove = (e, index) => {
        const card = document.getElementById(`skill-card-${index}`);
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Capabilities</span>
                    <h2 className="section-title">Technical <br /> <span className="outline-text">Expertise</span></h2>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            id={`skill-card-${index}`}
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="skill-category glass spotlight-card"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                        >
                            <div className="spotlight-overlay"></div>
                            <div className="category-header">
                                <div className="category-icon">{category.icon}</div>
                                <h3>{category.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
