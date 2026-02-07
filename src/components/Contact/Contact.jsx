import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ExternalLink, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' | 'error' | ''

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
