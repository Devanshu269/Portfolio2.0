import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
            // Here you can add your form submission logic
            console.log('Form submitted:', formData);
            alert('Message sent successfully!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } else {
            alert('Please fill in all fields before submitting.');
        }
    };

    const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <span className="section-subtitle">Connect</span>
                        <h2 className="section-title">Let's build <br /> <span className="outline-text">Together</span></h2>

                        <div className="info-cards">
                            <div className="info-card glass">
                                <Mail className="info-icon" />
                                <div className="info-details">
                                    <p>Email</p>
                                    <a href="mailto:devanshu.shekhar2@gmail.com">devanshu.shekhar2@gmail.com</a>
                                </div>
                            </div>

                            <div className="info-card glass">
                                <Phone className="info-icon" />
                                <div className="info-details">
                                    <p>Phone</p>
                                    <a href="tel:+919504940086">+91 9504940086</a>
                                </div>
                            </div>

                            <div className="info-card glass">
                                <MapPin className="info-icon" />
                                <div className="info-details">
                                    <p>Location</p>
                                    <span>Bengaluru, Karnataka, India</span>
                                </div>
                            </div>
                        </div>

                        <div className="social-links-minimal">
                            <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a>
                            <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a>
                            <a href="https://leetcode.com/N1k0zY" target="_blank" rel="noreferrer">LeetCode <ExternalLink size={14} /></a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-form-container glass"
                    >
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="glass"
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
                                    className="glass"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    className="glass"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={!isFormValid}
                                style={{
                                    opacity: isFormValid ? 1 : 0.5,
                                    cursor: isFormValid ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <div className="footer-inner">
                        <p>© 2024 Devanshu Shekhar. Built with React & Passion.</p>
                        <div className="footer-logo">
                            <motion.span
                                animate={{
                                    backgroundColor: ["#0047FF", "#00AEFF", "#00FFC2", "#7000FF", "#0047FF"],
                                    boxShadow: [
                                        "0 0 5px #0047FF",
                                        "0 0 15px #00AEFF",
                                        "0 0 5px #00FFC2",
                                        "0 0 15px #7000FF",
                                        "0 0 5px #0047FF"
                                    ]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="logo-dot"
                            ></motion.span>
                            <motion.span
                                animate={{
                                    color: ["#ffffff", "#00AEFF", "#00FFC2", "#7000FF", "#ffffff"]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ display: 'inline-block' }}
                            >
                                DS
                            </motion.span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
