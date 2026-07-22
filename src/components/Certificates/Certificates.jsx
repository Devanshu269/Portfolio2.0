import { FileText, Code, Database, Layout, Smartphone, Server, Settings } from 'lucide-react';
import './Certificates.css';

// Import all PDFs
import cmdPdf from '../../assets/Certificates/CMD.pdf';
import oopPdf from '../../assets/Certificates/Certificate _ Become an Expert in Object Oriented Programming.pdf';
import webDevPdf from '../../assets/Certificates/Certificate _ Cracking down a Responsive Web-Page Design.pdf';
import dbmsPdf from '../../assets/Certificates/Certificate _ Design a Database Management System from Scratch.pdf';
import reactPdf from '../../assets/Certificates/Certificate _ React Bootcamp.pdf';
import sqlPdf from '../../assets/Certificates/SQL.pdf';
import softwareProcessPdf from '../../assets/Certificates/Software process.pdf';
import pythonPdf from '../../assets/Certificates/python3.pdf';

const ALL_CERTIFICATES = [
    { id: 1, title: "React Bootcamp", description: "Comprehensive training in building modern, scalable single-page applications using React.", pdf: reactPdf, icon: <Code size={32} /> },
    { id: 3, title: "Responsive Web Design", description: "Advanced techniques for creating fluid, mobile-first web layouts utilizing HTML5 and CSS3.", pdf: webDevPdf, icon: <Layout size={32} /> },
    { id: 7, title: "Crossplatform Mobile App Dev", description: "Completed workshop on building scalable cross-platform mobile applications.", pdf: cmdPdf, icon: <Smartphone size={32} /> },
    { id: 4, title: "Database Management System", description: "Designing schemas, optimizing queries, and managing relational databases from scratch.", pdf: dbmsPdf, icon: <Database size={32} /> },
    { id: 6, title: "Advanced SQL", description: "Expertise in writing complex SQL queries, database indexing, and performance tuning.", pdf: sqlPdf, icon: <Database size={32} /> },
    { id: 5, title: "Python 3 Mastery", description: "In-depth understanding of Python 3 programming, covering advanced algorithms and data structures.", pdf: pythonPdf, icon: <Code size={32} /> },
    { id: 2, title: "Object Oriented Programming", description: "Mastery of OOP concepts, design patterns, and clean code principles in software engineering.", pdf: oopPdf, icon: <Server size={32} /> },
    { id: 8, title: "Software Process", description: "Understanding of agile methodologies, software lifecycle models, and collaborative development.", pdf: softwareProcessPdf, icon: <Settings size={32} /> }
];

const Certificates = () => {
    return (
        <section id="certificates" className="certificates-section bg-data-rings">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Qualifications</span>
                    <h2 className="section-title">Certifications & <br /> <span className="outline-text">Achievements</span></h2>
                </div>

                <div className="certificates-container">
                    <div className="cert-marquee">
                        <div className="cert-marquee-track">
                            {ALL_CERTIFICATES.map((cert) => (
                                <div key={cert.id} className="cert-card glass">
                                    <div className="cert-icon-wrapper">
                                        {cert.icon}
                                    </div>
                                    <div className="cert-content">
                                        <h4 className="cert-title">{cert.title}</h4>
                                        <p className="cert-desc">{cert.description}</p>
                                    </div>
                                    <a href={cert.pdf} target="_blank" rel="noreferrer" className="cert-link" aria-label={`View ${cert.title} Certificate document`}>
                                        <span>View Document</span>
                                        <FileText size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                        
                        {/* Duplicated track for seamless infinite scroll */}
                        <div className="cert-marquee-track" aria-hidden="true">
                            {ALL_CERTIFICATES.map((cert) => (
                                <div key={`${cert.id}-dup`} className="cert-card glass">
                                    <div className="cert-icon-wrapper">
                                        {cert.icon}
                                    </div>
                                    <div className="cert-content">
                                        <h4 className="cert-title">{cert.title}</h4>
                                        <p className="cert-desc">{cert.description}</p>
                                    </div>
                                    <a href={cert.pdf} target="_blank" rel="noreferrer" className="cert-link" aria-label={`View ${cert.title} Certificate document`}>
                                        <span>View Document</span>
                                        <FileText size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
