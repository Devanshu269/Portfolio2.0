import { motion } from 'framer-motion';
import {
    FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiSass, SiExpress, SiSpringboot,
    SiPostgresql, SiMongodb, SiMysql, SiApachekafka, SiPostman
} from 'react-icons/si';
import { BiNetworkChart } from 'react-icons/bi';
import './Skills.css';

const Skills = () => {
    const skillsList = [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "SASS", icon: <SiSass />, color: "#CC6699" },
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, color: "#FFFFFF" },
        { name: "Microservices", icon: <BiNetworkChart />, color: "#00E5FF" },
        { name: "Java", icon: <FaJava />, color: "#007396" },
        { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F" },
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
        // { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        // { name: "Kafka", icon: <SiApachekafka />, color: "#FFFFFF" },
        // { name: "Postman", icon: <SiPostman />, color: "#FF6C37" }
    ];

    return (
        <section id="skills" className="skills-section bg-circuit-board">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Capabilities</span>
                    <h2 className="section-title">Technical <br /> <span className="outline-text">Expertise</span></h2>
                </div>

                <div className="skills-cloud">
                    {skillsList.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-item glass spotlight-card"
                            style={{ '--hover-color': skill.color }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="skill-icon" style={{ color: skill.color }}>
                                {skill.icon}
                            </div>
                            <span className="skill-name">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
