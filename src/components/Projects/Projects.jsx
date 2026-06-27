import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import './Projects.css';

// Project Images
import imgAOT from '../../assets/projects/aot_project_1782574504692.png';
import imgAMC from '../../assets/projects/amc_project_1782574519230.png';
import imgAmazon from '../../assets/projects/amazon_project_1782574533567.png';
import imgParking from '../../assets/projects/parking_project_1782574545424.png';
import imgSnakes from '../../assets/projects/snakes_project_1782574557514.png';
import imgTicTacToe from '../../assets/projects/tictactoe_project_1782574569055.png';
import imgNote from '../../assets/projects/note_project_1782574581552.png';
import imgTodo from '../../assets/projects/todo_project_1782574593750.png';

const DUMMY_PROJECTS = [
    {
        id: 1,
        title: "Attack On Titan Universe",
        description: "A visually stunning, dynamic React web application that provides rich information, character details, and live data from the Attack on Titan universe.",
        image: imgAOT,
        tags: ["React", "CSS Modules", "REST API", "Framer Motion"],
        github: "https://github.com/Devanshu269/AttackOfTitan",
        live: "https://devanshu269.github.io/AttackOfTitan/"
    },
    {
        id: 2,
        title: "Vidhyarthi Portal (B.E College Final Year Project)",
        description: "A professional corporate website developed during an internship, focusing on responsive design, SEO optimization, and clean UI architecture.",
        image: imgAMC,
        tags: ["Web Development", "HTML/CSS", "JavaScript", "UI/UX"],
        github: "https://github.com/Devanshu269/Vidhyarthi-Portal",
        live: ""
    },
    {
        id: 3,
        title: "Amazon Style Landing Page",
        description: "An e-commerce product landing page mimicking the robust design and structure of Amazon, featuring responsive product grids and interactive UI elements.",
        image: imgAmazon,
        tags: ["Frontend", "HTML5", "CSS3", "Responsive Design"],
        github: "https://github.com/Devanshu269/AmazonStyleProductlandingPage",
        live: "https://devanshu269.github.io/AmazonStyleProductlandingPage/"
    },
    {
        id: 4,
        title: "Task Note App",
        description: "A lightweight productivity application for managing notes and tasks, featuring intuitive state management and local storage integration.",
        image: imgNote,
        tags: ["React", "JavaScript", "State Management"],
        github: "https://github.com/Devanshu269/note",
        live: ""
    },
    {
        id: 5,
        title: "Advanced To-Do Application",
        description: "A robust to-do list manager allowing users to track progress, categorize tasks, and maintain productivity.",
        image: imgTodo,
        tags: ["Frontend", "JavaScript", "CSS"],
        github: "https://github.com/Devanshu269/todo",
        live: ""
    }
];

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(DUMMY_PROJECTS.length / itemsPerPage);

    const next = () => {
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prev = () => {
        setDirection(-1);
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentProjects = DUMMY_PROJECTS.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Portfolio</span>
                    <h2 className="section-title">Featured <br /> <span className="outline-text">Projects</span></h2>
                </div>

                <div className="projects-container">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentPage}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="projects-grid"
                        >
                            {currentProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="project-card glass"
                                >
                                    <div className="project-image-wrapper">
                                        <img src={project.image} alt={project.title} className="project-image" />
                                        <div className="project-overlay">
                                            <div className="project-overlay-content">
                                                <p className="project-desc">{project.description}</p>
                                                <div className="project-links">
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub Repo">
                                                            <Github size={22} />
                                                        </a>
                                                    )}
                                                    {project.live && (
                                                        <a href={project.live} target="_blank" rel="noreferrer" className="project-link" aria-label="Live Website">
                                                            <ExternalLink size={22} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <div className="project-tags">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {totalPages > 1 && (
                        <div className="projects-pagination">
                            <button className="pagination-btn glass" onClick={prev} aria-label="Previous page">
                                <ChevronLeft size={24} />
                            </button>
                            <div className="pagination-indicators">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`indicator-dot ${i === currentPage ? 'active' : ''}`}
                                        onClick={() => {
                                            setDirection(i > currentPage ? 1 : -1);
                                            setCurrentPage(i);
                                        }}
                                    />
                                ))}
                            </div>
                            <button className="pagination-btn glass" onClick={next} aria-label="Next page">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
