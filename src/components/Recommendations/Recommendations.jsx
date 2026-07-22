import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Recommendations.css';

import avatarAnuja from '../../assets/avatar-anuja.png';
import avatarParshant from '../../assets/avatar-parshant.png';
import avatarSabareesh from '../../assets/avatar-sabareesh.png';
import avatarAmit from '../../assets/avatar-amit.png';
import avatarSoumendu from '../../assets/avatar-soumendu.png';
import avatarRishindra from '../../assets/avatar-rishindra.png';
import avatarSaswata from '../../assets/avatar-saswata.png';

const Recommendations = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Anuja Nayak",
            role: "Engineering Manager (Manager)",
            avatar: avatarAnuja,
            content: "I had the pleasure of managing Devanshu for a year, and he stood out as a dependable, high-ownership engineer who consistently delivered on complex, high-impact projects like Bulk UI updates, Smart Sourcing, Node Capabilities, and the File Upload system. He balances feature delivery with proactive tech debt resolution and is often the first to jump in during on-call situations, ensuring system stability and an excellent customer experience. Devanshu pairs strong technical execution with a collaborative, customer-first mindset. He mentors peers, communicates thoughtfully, and goes the extra mile to simplify long-term complexity."
        },
        {
            name: "Parshant Sharma",
            role: "Full Stack Developer (Senior Colleague)",
            avatar: avatarParshant,
            content: "I had the pleasure of working with Devanshu Shekhar for around 18 months on the NodeStar project, and I can confidently say that he is an exceptional professional. Devanshu was instrumental in working on the frontend, and his ability to handle edge case scenarios was impressive. He consistently demonstrated a high level of proficiency in his work, delivering high-quality results on time. His problem-solving skills are top-notch, and he thrives in tackling complex challenges."
        },
        {
            name: "R D Sabareesh",
            role: "Building CodeKarma (Team Lead)",
            avatar: avatarSabareesh,
            content: "I have had the pleasure of working closely with Devanshu, a highly skilled and enthusiastic full-stack developer. His passion for both frontend and backend development is evident in his continuous efforts to optimize solutions and enhance user interfaces. Beyond his technical expertise, Devanshu's commitment to collaboration and teamwork is remarkable. He often operates at a level well above his designation, showcasing leadership and forward-thinking capabilities."
        },
        {
            name: "Amit Kumar",
            role: "Senior Software Engineer @ Lowe's India (Senior Colleague)",
            avatar: avatarAmit,
            content: "I've had the privilege of working closely with Devanshu on a variety of projects in our current organization, and I continue to be impressed by his dedication, technical expertise, and ability to deliver high-quality work on time. What truly sets Devanshu apart is his natural leadership ability. He possesses the qualities of an excellent manager, demonstrating strong decision-making skills, effective communication, and the ability to inspire and guide his team toward achieving shared goals."
        },
        {
            name: "Soumendu Das",
            role: "SSE @ Lowe's India (Senior Colleague)",
            avatar: avatarSoumendu,
            content: "It has been truly rewarding to witness his journey from an ASE to an SE. His unwavering dedication to learning and growth is both inspiring and commendable. Having had the privilege of mentoring him and collaborating on numerous key features for our project, I can confidently say that his contributions have been invaluable. What stands out most is his ability to step beyond his defined role, taking on multiple responsibilities and consistently delivering with excellence."
        },
        {
            name: "Rishindra Mani Katiyar",
            role: "SDE-2: Tech@Kotak (Senior Colleague)",
            avatar: avatarRishindra,
            content: "I had the pleasure of working with Devanshu at Lowe's where he truly excelled in full stack development. Devanshu is known for his ability to create user-friendly and responsive user interfaces, with his work on React-based dashboards like the Assortment Dashboard increasing user engagement and operational efficiency. What really makes him a cut above is that he fills the gap between frontend and backend development to ensure user-centric solutions using modern technologies."
        },
        {
            name: "Saswata Rakshit",
            role: "User Experience Designer @ QSC (Senior Colleague)",
            avatar: avatarSaswata,
            content: "I had the pleasure of working with Devanshu on various projects, where he consistently delivered high-quality work within deadlines. He is a quick learner who easily grasped complex concepts such as micro-frontend architecture, SSO login architecture, and other business requirements, implementing them seamlessly in real-time projects. Devanshu is a dependable team player and would be a valuable asset to any development team."
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCardStyles = (idx) => {
        const length = testimonials.length;
        let diff = (idx - currentIndex + length) % length;
        
        if (diff > Math.floor(length / 2)) {
            diff -= length;
        }

        if (isMobile) {
            if (diff === 0) {
                return { x: '0%', scale: 1, zIndex: 5, opacity: 1, filter: 'blur(0px)' };
            } else if (diff === 1) {
                return { x: '110%', scale: 0.85, zIndex: 4, opacity: 0, filter: 'blur(4px)' };
            } else if (diff === -1) {
                return { x: '-110%', scale: 0.85, zIndex: 4, opacity: 0, filter: 'blur(4px)' };
            } else {
                return { x: diff > 0 ? '150%' : '-150%', scale: 0.5, zIndex: 0, opacity: 0, filter: 'blur(10px)' };
            }
        }

        if (diff === 0) {
            return { x: '0%', scale: 1, zIndex: 5, opacity: 1, filter: 'blur(0px)' };
        } else if (diff === 1) {
            return { x: '55%', scale: 0.85, zIndex: 4, opacity: 0.6, filter: 'blur(2px)' };
        } else if (diff === -1) {
            return { x: '-55%', scale: 0.85, zIndex: 4, opacity: 0.6, filter: 'blur(2px)' };
        } else if (diff === 2) {
            return { x: '95%', scale: 0.7, zIndex: 3, opacity: 0.2, filter: 'blur(6px)' };
        } else if (diff === -2) {
            return { x: '-95%', scale: 0.7, zIndex: 3, opacity: 0.2, filter: 'blur(6px)' };
        } else {
            return { x: diff > 0 ? '150%' : '-150%', scale: 0.5, zIndex: 0, opacity: 0, filter: 'blur(10px)' };
        }
    };

    return (
        <section id="recommendations" className="recommendations-section bg-pixel-dungeon">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Party Members</span>
                    <h2 className="section-title">Peer <br /> <span className="outline-text">Recognition</span></h2>
                </div>

                <div className="carousel-container">
                    <button onClick={handlePrev} className="carousel-btn prev-btn" aria-label="Previous Testimonial">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="carousel-viewport">
                        {testimonials.map((item, idx) => {
                            const styles = getCardStyles(idx);
                            return (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={styles}
                                    transition={{ duration: 0.1 }} /* blocky fast animation */
                                    className={`testimonial-card rpg-window ${idx === currentIndex ? 'active-card' : 'inactive-card'}`}
                                    onClick={() => setCurrentIndex(idx)}
                                >
                                    <Quote className="quote-icon" size={32} />
                                    <p className="testimonial-content">"{item.content}"</p>
                                    <div className="testimonial-footer">
                                        <div className="author-avatar">
                                            <img src={item.avatar} alt={item.name} />
                                        </div>
                                        <div className="author-info">
                                            <h4>{item.name}</h4>
                                            <span>{item.role}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button onClick={handleNext} className="carousel-btn next-btn" aria-label="Next Testimonial">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="carousel-dots">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
