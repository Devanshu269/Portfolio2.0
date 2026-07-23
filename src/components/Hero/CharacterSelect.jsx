import { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import './CharacterSelect.css';

const CharacterSelect = () => {
    const { playSfx } = useAudio();
    const [activeClass, setActiveClass] = useState('warrior');

    const handleSelect = (cls) => {
        if (cls === activeClass) return;
        setActiveClass(cls);
        playSfx('powerup');
        
        if (cls === 'warrior') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.dataset.theme = cls;
        }
    };

    return (
        <div className="character-select-container">
            <span className="char-select-title">SELECT CLASS</span>
            <div className="char-buttons">
                <button 
                    className={`char-btn char-warrior ${activeClass === 'warrior' ? 'active' : ''}`}
                    onClick={() => handleSelect('warrior')}
                >
                    WARRIOR
                </button>
                <button 
                    className={`char-btn char-mage ${activeClass === 'mage' ? 'active' : ''}`}
                    onClick={() => handleSelect('mage')}
                >
                    MAGE
                </button>
                <button 
                    className={`char-btn char-rogue ${activeClass === 'rogue' ? 'active' : ''}`}
                    onClick={() => handleSelect('rogue')}
                >
                    ROGUE
                </button>
            </div>
        </div>
    );
};

export default CharacterSelect;
