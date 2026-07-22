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

    return (
        <section id="contact" className="contact-section bg-pixel-stars">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <span className="section-subtitle">Multiplayer</span>
                        <h2 className="section-title">Initiate <br /> <span className="outline-text">Contact</span></h2>

                        <div className="info-cards">
                            <div className="info-card rpg-window">
                                <Mail className="info-icon" />
                                <div className="info-details">
                                    <p>Email</p>
                                    <a href="mailto:devanshu.shekhar2@gmail.com">devanshu.shekhar2@gmail.com</a>
                                </div>
                            </div>

                            <div className="info-card rpg-window">
                                <Phone className="info-icon" />
                                <div className="info-details">
                                    <p>Phone</p>
                                    <a href="tel:+919504940086">+91 9504940086</a>
                                </div>
                            </div>

                            <div className="info-card rpg-window">
                                <MapPin className="info-icon" />
                                <div className="info-details">
                                    <p>Location</p>
                                    <span>Bengaluru, Karnataka, India</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-form-container rpg-window"
                    >
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name..."
                                    className="rpg-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="rpg-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Tell me about your quest..."
                                    className="rpg-input"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {submitStatus && (
                                <div className={`status-message ${submitStatus}`}>
                                    {submitStatus === 'success'
                                        ? '✓ Message sent successfully! I\'ll get back to you soon.'
                                        : '✗ Failed to send message. Please try again.'}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={!isFormValid || isLoading}
                                style={{
                                    opacity: isFormValid && !isLoading ? 1 : 0.5,
                                    cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>

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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
