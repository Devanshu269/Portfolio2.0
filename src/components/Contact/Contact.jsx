import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ExternalLink, Loader2, Github, Linkedin, Code2, GraduationCap } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' | 'error' | ''
    const [showVictoryScreen, setShowVictoryScreen] = useState(false);
    const { playSfx } = useAudio();
    const { unlockAchievement } = useAchievements();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus('');

        // Check if all fields are filled
        if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
            try {
                // Initialize EmailJS with your public key
                // Get your public key from: https://dashboard.emailjs.com/admin/account
                emailjs.init("ISIBtK7dnMFb9_z2a"); // REPLACE THIS

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_50jq8c8',
                    'template_h5q0se7',
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        to_email: 'devanshu.shekhar2@gmail.com' // This should be YOUR email
                    }
                );

                if (response.status === 200) {
                    setSubmitStatus('success');
                    setShowVictoryScreen(true);
                    playSfx('victory');
                    unlockAchievement('contact_sent');
                    // Reset form
                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    });
                } else {
                    setSubmitStatus('error');
                }
            } catch (error) {
                console.error('Email send error:', error);
                setSubmitStatus('error');
            } finally {
                setIsLoading(false);
            }
        } else {
            setSubmitStatus('error');
            setIsLoading(false);
        }
    };

    const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

    const hpScore = 
        (formData.name.trim().length > 0 ? 1 : 0) + 
        (formData.email.trim().length > 0 ? 1 : 0) + 
        (formData.message.trim().length > 0 ? 1 : 0) +
        (showVictoryScreen ? 1 : 0);

    const hpPercentage = Math.max(0, 100 - (hpScore * 25));

    return (
        <section id="contact" className="contact-section bg-pixel-stars">
            <div className="container">
                <span className="section-subtitle">Multiplayer</span>
                <h2 className="section-title">Final <br /> <span className="outline-text">Boss</span></h2>

                <div className="battle-arena">
                    {/* Boss Area */}
                    <div className="boss-sprite-container">
                        <motion.div 
                            className={`boss-sprite ${hpPercentage === 0 ? 'defeated' : ''}`}
                            animate={hpPercentage === 0 ? {} : { y: [0, -10, 0] }}
                            transition={hpPercentage === 0 ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {hpPercentage === 0 ? '💀' : '👾'}
                        </motion.div>
                        <div className="boss-info">
                            <span className="boss-name">RECRUITER</span>
                            <div className="boss-hp">
                                <span className="hp-label">HP</span>
                                <div className="hp-bar-container">
                                    <div 
                                        className="hp-bar boss-health"
                                        style={{ width: `${hpPercentage}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Battle UI Box */}
                    <div className="battle-ui-wrapper">
                        {/* Player Stats */}
                        <div className="battle-stats rpg-window">
                            <h3 className="player-name">PLAYER 1</h3>
                            <div className="stat-row">
                                <span className="stat-label">HP</span>
                                <div className="stat-val">999/999</div>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">MP</span>
                                <div className="stat-val">050/050</div>
                            </div>
                            <div className="stat-row mt-3">
                                <span className="stat-label">LVL</span>
                                <div className="stat-val">99</div>
                            </div>
                        </div>

                        {/* Action Menu (Form) */}
                        <form className="battle-action-menu rpg-window" onSubmit={handleSubmit}>
                            <div className="form-group-inline">
                                <label>▶ HERO NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter name..."
                                    className="battle-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group-inline">
                                <label>▶ GUILD (EMAIL)</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email@guild.com"
                                    className="battle-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group-block">
                                <label>▶ MAGIC SPELL (MESSAGE)</label>
                                <textarea
                                    name="message"
                                    placeholder="Type your message..."
                                    className="battle-input"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {submitStatus && (
                                <div className={`battle-status-msg ${submitStatus}`}>
                                    {submitStatus === 'success'
                                        ? 'CRITICAL HIT! Message delivered.'
                                        : 'MISS! Failed to send message.'}
                                </div>
                            )}

                            <div className="battle-commands">
                                <button
                                    type="submit"
                                    className="command-btn"
                                    disabled={!isFormValid || isLoading}
                                >
                                    {isLoading ? 'CASTING...' : '[ ATTACK ]'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                        {/* STAGE CLEARED OVERLAY */}
                        {showVictoryScreen && (
                            <div className="victory-overlay">
                                <div className="victory-content">
                                    <h3 className="victory-title">STAGE CLEARED!</h3>
                                    <div className="victory-score">SCORE: 9999</div>
                                    <p className="victory-msg">Message successfully transmitted. I will respond to your quest shortly.</p>
                                    <button className="victory-btn" onClick={() => setShowVictoryScreen(false)}>
                                        CONTINUE?
                                    </button>
                                </div>
                            </div>
                        )}
            </div>
        </section>
    );
};

export default Contact;
