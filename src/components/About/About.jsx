import { motion } from 'framer-motion';
import { Gamepad2, Tv, Heart, BookOpen } from 'lucide-react';
import './About.css';

const About = () => {
    const interests = [
        {
            icon: <Gamepad2 size={20} />,
            label: "Valorant & FPS",
            desc: "Immortal rank grinder, clutch specialist",
            color: "#00F0FF"
        },
        {
            icon: <Tv size={20} />,
            label: "Shōnen Anime",
            desc: "One Piece, AoT, JJK — storytelling fuel",
            color: "#FF2D55"
        },
        {
            icon: <Heart size={20} />,
            label: "Badminton",
            desc: "For agility & mental sharpness",
            color: "#22c55e"
        },
        {
            icon: <BookOpen size={20} />,
            label: "Manga",
            desc: "Reading weekly chapters religiously",
            color: "#FFD700"
        }
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
                        <span className="section-subtitle">Character Lore</span>
                        <h2 className="section-title">Beyond the <br /> <span className="outline-text">Code</span></h2>
                        <div className="about-text">
                            <p className="lead">
                                A passionate Software Engineer who treats every project like a boss fight — strategize, execute, and ship. My expertise spans both front-end and back-end development, where I continuously grind my skills to build scalable and efficient solutions.
                            </p>
                            <p>
                                When I'm not coding, you'll find me sharpening my problem-solving abilities through DSA challenges on platforms like Scaler and LeetCode. I believe in the power of constant leveling up — every new algorithm mastered is another skill point allocated.
                            </p>
                            <p>
                                In my downtime, I unwind by diving into competitive FPS games (mainly Valorant), catching up on the latest anime arcs, or reading manga chapters. Whether it's a ranked match or a production deployment, I approach every challenge with the same relentless drive to win.
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
                            <span className="category-label">Side Quests & Hobbies</span>
                            {interests.map((item, i) => (
                                <div key={i} className="interest-card glass" tabIndex="0" aria-label={`Hobby: ${item.label}`}>
                                    <div className="interest-icon" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}>
                                        {item.icon}
                                    </div>
                                    <div className="interest-info">
                                        <h4>{item.label}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="philosophy-quote glass">
                            <p>"The moment you think of giving up, think of the reason why you held on so long." — Natsu Dragneel</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
