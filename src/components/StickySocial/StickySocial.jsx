import { Github, Linkedin, Mail } from 'lucide-react';
import './StickySocial.css';

const StickySocial = () => {
    return (
        <div className="sticky-social-container">
            <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="GitHub">
                <Github size={20} strokeWidth={1.5} />
                <span className="social-label">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
                <span className="social-label">LinkedIn</span>
            </a>
            <a href="mailto:devanshu.shekhar2@gmail.com" className="social-icon-wrapper" aria-label="Email">
                <Mail size={20} strokeWidth={1.5} />
                <span className="social-label">Email</span>
            </a>
        </div>
    );
};

export default StickySocial;
