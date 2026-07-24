import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaJs, FaGithub, FaCode, FaTasks
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiSass, SiSpringboot,
    SiPostgresql, SiMysql, SiRedux, SiJira, SiTypescript
} from 'react-icons/si';
import { BiNetworkChart } from 'react-icons/bi';
import './Skills.css';
import { useAudio } from '../../context/AudioContext';

const Skills = () => {
    const { playSfx } = useAudio();
    const [activeSkill, setActiveSkill] = useState(null);

    const skillsList = [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", type: "Core Foundation", stats: "+100 Structure", desc: "The skeletal structure of every web-based entity." },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", type: "Visual Paint", stats: "+100 Aesthetics", desc: "Adds beauty, color, and layout to the structural bones." },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", type: "Core Logic", stats: "+100 Interactivity, +80 Event Handling", desc: "The versatile magic that brings the web to life." },
        { name: "React.js", icon: <FaReact />, color: "#61DAFB", type: "Legendary Framework", stats: "+50 UI Speed, +30 Component Reusability", desc: "Construct dynamic Single Page Applications without breaking a sweat." },
        { name: "Redux", icon: <SiRedux />, color: "#764ABC", type: "State Manager", stats: "+80 Global State, +40 Predictability", desc: "A predictable state container for maintaining order in complex JavaScript apps." },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4", type: "Utility Armor", stats: "+80 Styling Speed", desc: "Rapidly build modern websites without ever leaving your HTML." },
        { name: "SASS", icon: <SiSass />, color: "#CC6699", type: "Styling Relic", stats: "+40 CSS Logic", desc: "CSS with superpowers. Variables, nesting, and mixins." },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", type: "Strict Typings", stats: "+80 Type Safety, +40 Dev Speed", desc: "A strongly typed superset of JavaScript that prevents bugs before they happen." },
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933", type: "Rare Environment", stats: "+60 Async I/O, +40 Backend Speed", desc: "Allows execution of JavaScript magic outside the browser." },
        { name: "Java", icon: <FaJava />, color: "#007396", type: "Ancient Magic", stats: "+80 Enterprise Scalability, +50 OOP", desc: "A highly durable backend spell. Grants immense cross-platform dominance." },
        { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F", type: "Mythic Tool", stats: "+90 Microservice Synergy", desc: "Rapidly brew production-ready stand-alone Spring applications." },
        { name: "Python", icon: <FaPython />, color: "#3776AB", type: "Versatile Scroll", stats: "+70 Scripting, +80 Data Magic", desc: "An elegant, readable language perfect for quick scripts and ML." },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", type: "Relational Vault", stats: "+90 Data Integrity, +40 Query Speed", desc: "A rock-solid open-source vault for storing critical quest data." },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1", type: "Standard Vault", stats: "+80 Reliability, +50 Speed", desc: "The classic choice for tabular data storage." },
        { name: "Git/GitHub", icon: <FaGithub />, color: "#FFFFFF", type: "Time Machine", stats: "+100 Version Control", desc: "Allows you to travel back in time to fix critical mistakes and collaborate globally." },
        { name: "DSA", icon: <FaCode />, color: "#FFD700", type: "Core Fundamentals", stats: "+100 Problem Solving", desc: "The fundamental building blocks for writing highly optimized and efficient spells." },
        { name: "Agile", icon: <SiJira />, color: "#2684FF", type: "Quest Methodology", stats: "+80 Sprint Speed", desc: "An iterative approach to delivering high-quality software in fast-paced environments." },
        // Empty slots to pad out the inventory UI (total 20 slots)
        ...Array(3).fill(null)
    ];

    const handleHover = (skill) => {
        if (skill && skill !== activeSkill) {
            setActiveSkill(skill);
            playSfx('pipe'); // soft bloop for inventory hover
        } else if (!skill) {
            setActiveSkill(null);
        }
    };

    return (
        <section id="skills" className="skills-section bg-scanlines-retro">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Character Stats</span>
                    <h2 className="section-title">Inventory <br /> <span className="outline-text">& Skills</span></h2>
                </div>

                <div className="inventory-layout">
                    {/* Tooltip Box */}
                    <div className="inventory-tooltip rpg-window">
                        {activeSkill ? (
                            <>
                                <div className="tooltip-header">
                                    <div className="tooltip-icon" style={{ color: activeSkill.color }}>
                                        {activeSkill.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ color: activeSkill.color }}>{activeSkill.name}</h3>
                                        <span className="tooltip-type">[{activeSkill.type}]</span>
                                    </div>
                                </div>
                                <div className="tooltip-stats">{activeSkill.stats}</div>
                                <p className="tooltip-desc">{activeSkill.desc}</p>
                            </>
                        ) : (
                            <div className="tooltip-empty">
                                <span className="blinking-arrow">▼</span> Hover over an item to inspect its properties.
                            </div>
                        )}
                    </div>

                    {/* Grid Slots */}
                    <div className="inventory-grid">
                        {skillsList.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={`inventory-slot ${skill ? 'has-item' : 'empty-slot'}`}
                                onMouseEnter={() => handleHover(skill)}
                                onMouseLeave={() => handleHover(null)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.1, delay: index * 0.03 }}
                            >
                                {skill && (
                                    <div className="slot-item" style={{ color: skill.color }}>
                                        <div className="slot-icon">{skill.icon}</div>
                                        <span className="slot-name">{skill.name}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
