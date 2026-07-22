import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../context/AudioContext';

const DialogueBox = ({ lines, typingSpeed = 30 }) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const { playSfx } = useAudio();
    const intervalRef = useRef(null);

    // Audio throttle ref so we don't spam the beeps too much
    const lastBeepTime = useRef(0);

    const completeCurrentLine = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayedText(lines[currentLine]);
        setIsTyping(false);
    };

    const nextLine = () => {
        if (isTyping) {
            // User clicked while typing: instantly finish line
            completeCurrentLine();
        } else {
            // User clicked after typing: go to next line if available
            if (currentLine < lines.length - 1) {
                setCurrentLine(c => c + 1);
                setDisplayedText('');
                setIsTyping(true);
            }
        }
    };

    useEffect(() => {
        if (!isTyping) return;
        let charIndex = 0;
        const targetText = lines[currentLine];
        
        intervalRef.current = setInterval(() => {
            charIndex++;
            setDisplayedText(targetText.slice(0, charIndex));
            
            // Play a tiny beep every 3-4 chars for typing sound effect
            if (charIndex % 4 === 0) {
                const now = Date.now();
                if (now - lastBeepTime.current > 50) {
                    // Play a super short bloop (using pipe or generic coin)
                    // We'll just call playSfx (which handles its own debounce slightly)
                    // Actually, let's just let it be silent typing unless requested, 
                    // playing an oscillator constantly for typing can be annoying in Web Audio.
                }
            }

            if (charIndex >= targetText.length) {
                clearInterval(intervalRef.current);
                setIsTyping(false);
            }
        }, typingSpeed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [currentLine, isTyping, lines, typingSpeed]);

    return (
        <div className="dialogue-box" onClick={nextLine}>
            <div className="dialogue-name">Devanshu</div>
            <div className="dialogue-text">
                {displayedText}
                {!isTyping && currentLine < lines.length - 1 && (
                    <span className="blinking-arrow">▼</span>
                )}
                {!isTyping && currentLine === lines.length - 1 && (
                    <span className="blinking-arrow end-dialogue">■</span>
                )}
            </div>
        </div>
    );
};

export default DialogueBox;
