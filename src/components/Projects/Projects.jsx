import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import './Projects.css';

// Project Images
import imgAOT from '../../assets/projects/aot_project_1782574504692.png';
import imgAMC from '../../assets/projects/amc_project_1782574519230.png';
import imgAmazon from '../../assets/projects/amazon_project_1782574533567.png';
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
        title: "Amazon Style Landing Page",
        description: "An e-commerce product landing page mimicking the robust design and structure of Amazon, featuring responsive product grids and interactive UI elements.",
        image: imgAmazon,
        tags: ["Frontend", "HTML5", "CSS3", "Responsive Design"],
        github: "https://github.com/Devanshu269/AmazonStyleProductlandingPage",
        live: "https://devanshu269.github.io/AmazonStyleProductlandingPage/"
    },
    {
        id: 3,
        title: "Task Note App",
        description: "A lightweight productivity application for managing notes and tasks, featuring intuitive state management and local storage integration.",
        image: imgNote,
        tags: ["React", "JavaScript", "State Management"],
        github: "https://github.com/Devanshu269/note",
        live: ""
    },
    {
        id: 4,
        title: "Advanced To-Do Application",
        description: "A robust to-do list manager allowing users to track progress, categorize tasks, and maintain productivity.",
        image: imgTodo,
        tags: ["Frontend", "JavaScript", "CSS"],
        github: "https://github.com/Devanshu269/todo",
        live: ""
    },
];

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isSlashing, setIsSlashing] = useState(false);
    const projectsPerPage = 6;
    const totalPages = Math.ceil(DUMMY_PROJECTS.length / projectsPerPage);

    const nextPage = () => {
        if (isSlashing) return;
        setIsSlashing(true);
        setTimeout(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 300); // Swap midway through the slash flash
        setTimeout(() => {
            setIsSlashing(false);
        }, 600); // Total animation duration
    };

    const prevPage = () => {
        if (isSlashing) return;
        setIsSlashing(true);
        setTimeout(() => {
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
        }, 300);
        setTimeout(() => {
            setIsSlashing(false);
        }, 600);
    };

    const displayedProjects = DUMMY_PROJECTS.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    return (
        <section id="projects" className="projects-section bg-retro-grid">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Load Game</span>
                    <h2 className="section-title">Featured <br /> <span className="outline-text">Projects</span></h2>
                </div>

                <div className="projects-container" style={{ position: 'relative', overflow: 'hidden' }}>

                    {isSlashing && (
                        <div className="katana-slash-overlay">
                            <div className="slash-flash" />
                            <div className="slash-line" />
                        </div>
                    )}

                    <div className="projects-grid">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="projects-page"
                            >
                                {displayedProjects.map((project) => (
                                    <div key={project.id} className="cartridge-wrapper">
                                        <div className="cartridge-shell">
                                            {/* Top Grooves */}
                                            <div className="cartridge-grooves">
                                                <div className="groove"></div>
                                                <div className="groove"></div>
                                                <div className="groove"></div>
                                            </div>

                                            {/* Cartridge Label */}
                                            <div className="cartridge-label">
                                                <div className="label-header">ENTERTAINMENT SYSTEM</div>
                                                <div className="label-image-wrapper">
                                                    <img src={project.image} alt={project.title} className="label-image" />
                                                </div>
                                                <div className="label-title">{project.title}</div>
                                            </div>

                                            {/* Seal moved to shell level */}
                                            <div className="label-seal">⭐ QUALITY SEAL</div>

                                            {/* Bottom Edge */}
                                            <div className="cartridge-bottom">
                                                <div className="cartridge-arrow">▼</div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay with Info & Links */}
                                        <div className="project-info-overlay">
                                            <h3 className="overlay-title">{project.title}</h3>
                                            <p className="overlay-desc">{project.description}</p>

                                            <div className="project-tags">
                                                {project.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className="project-tag">{tag}</span>
                                                ))}
                                            </div>

                                            <div className="project-links">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub Repo">
                                                        <Github size={20} /> SOURCE
                                                    </a>
                                                )}
                                                {project.live && (
                                                    <a href={project.live} target="_blank" rel="noreferrer" className="project-link" aria-label="Live Website">
                                                        <ExternalLink size={20} /> PLAY
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {totalPages > 1 && (
                        <div className="projects-pagination">
                            <button className="proj-carousel-btn proj-prev-btn" onClick={prevPage}>
                                <ChevronLeft size={30} />
                            </button>
                            <span className="page-indicator">{currentPage + 1} / {totalPages}</span>
                            <button className="proj-carousel-btn proj-next-btn" onClick={nextPage}>
                                <ChevronRight size={30} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
