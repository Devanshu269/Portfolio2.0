import './Footer.css';

const Footer = () => {
    return (
        <footer className="arcade-footer">
            <div className="footer-content">
                <span className="footer-credit">BUILT BY <span className="highlight">DEVANSHU SHEKHAR</span></span>
                <span className="footer-divider">|</span>
                <span className="footer-credit">POWERED BY <span className="highlight">REACT & FRAMER</span></span>
                <span className="footer-divider">|</span>
                <span className="footer-credit">© {new Date().getFullYear()} <span className="highlight">LEVEL CLEARED</span></span>
            </div>
            <div className="thanks-playing">THANKS FOR PLAYING!</div>
        </footer>
    );
};

export default Footer;
