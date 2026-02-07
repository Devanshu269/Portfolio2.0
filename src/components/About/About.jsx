import { motion } from 'framer-motion';
import { Gamepad2, GraduationCap, Heart, Tv } from 'lucide-react';
import './About.css';

const About = () => {
    const interests = [
        { icon: <Gamepad2 size={20} />, label: "FPS Gaming", desc: "Strategic thinking & quick reflexes" },
        { icon: <Tv size={20} />, label: "Anime", desc: "Creative storytelling inspiration" },
        { icon: <Heart size={20} />, label: "Badminton", desc: "For agility & mental sharpness" }
    ];



    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="about-content"
                    >
                        <span className="section-subtitle">The Story</span>
                        <h2 className="section-title">Beyond the <br /> <span className="outline-text">Code</span></h2>
                        <div className="about-text">
                            <p className="lead">
                                As a passionate Software Engineer, I thrive on building impactful web applications and solving complex problems. My expertise spans across both front-end and some part of back-end development, where I continuously refine my skills to create scalable and efficient solutions.
                            </p>
                            <p>
                                When I'm not coding, you'll find me sharpening my problem-solving abilities through DSA challenges on platforms like Scaler and LeetCode. I believe in the power of constant learning, which not only strengthens my technical abilities but also fuels my personal growth and confidence.
                            </p>
                            <p>
                                In my downtime, I unwind by diving into online FPS games, where I channel my strategic thinking and focus. Whether it's coding or gaming, I approach every challenge with a relentless drive to improve and succeed.
                            </p>
                        </div>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="about-visuals"
                    >
                        <div className="interests-grid">
                            <span className="category-label">Life & Hobbies</span>
                            {interests.map((item, i) => (
                                <div key={i} className="interest-card glass">
                                    <div className="interest-icon">{item.icon}</div>
                                    <div className="interest-info">
                                        <h4>{item.label}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="philosophy-quote glass">
                            <p>"I believe that constant learning fuels both technical ability and personal growth. Every line of code is an opportunity to solve an edge case or optimize a workflow."</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
