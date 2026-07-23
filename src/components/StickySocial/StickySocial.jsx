import { Github, Linkedin, Mail, Terminal as TerminalIcon } from 'lucide-react';
import { useState } from 'react';
import Terminal from '../Terminal/Terminal';
import './StickySocial.css';

const StickySocial = () => {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    return (
        <>
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
                <button 
                    className="social-icon-wrapper" 
                    onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                    aria-label="Terminal"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none' }}
                >
                    <TerminalIcon size={20} strokeWidth={1.5} color="var(--accent-gold)" />
                    <span className="social-label" style={{ color: 'var(--accent-gold)' }}>Terminal</span>
                </button>
            </div>
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        </>
    );
};

export default StickySocial;
