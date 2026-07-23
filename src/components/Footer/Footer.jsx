import './Footer.css';

const Footer = () => {
    return (
        <footer className="arcade-footer">
            <div className="continue-section">
                <div className="continue-text-group">
                    <h3 className="continue-title">STAGE CLEARED!</h3>
                    <p className="continue-subtitle">Would you like to play again?</p>
                </div>
                <button 
                    className="insert-coin-btn"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="coin-icon">🪙</span>
                    INSERT COIN
                </button>
            </div>

            <div className="footer-bottom">
                <div className="credit-box">
                    <span className="label">PLAYER 1: </span>
                    <span className="value">DEVANSHU SHEKHAR</span>
                </div>
                <div className="credit-box">
                    <span className="label">ENGINE: </span>
                    <span className="value">REACT</span>
                </div>
                <div className="credit-box">
                    <span className="label">© {new Date().getFullYear()} </span>
                    <span className="value">GAME OVER</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
