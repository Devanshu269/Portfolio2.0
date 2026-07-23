import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(true); // Default to muted for UX
    const audioCtxRef = useRef(null);
    const bgmIntervalRef = useRef(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const newState = !prev;
            if (!newState) {
                initAudio();
                playSfx('coin'); // play a sound to confirm it's on
            }
            return newState;
        });
    }, []);

    const playSfx = useCallback((type) => {
        if (isMuted) return;
        initAudio();

        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'coin':
                // Classic coin sound: rapid slide up in frequency
                osc.type = 'square';
                osc.frequency.setValueAtTime(987.77, now); // B5
                osc.frequency.setValueAtTime(1318.51, now + 0.1); // E6
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'jump':
                // Classic jump sound: fast rising sweep
                osc.type = 'square';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'pipe':
                // Pipe sound: series of low decreasing bloops
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.setValueAtTime(180, now + 0.1);
                osc.frequency.setValueAtTime(160, now + 0.2);
                osc.frequency.setValueAtTime(140, now + 0.3);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
            case 'victory':
                // Victory jingle (arpeggio)
                osc.type = 'square';
                osc.frequency.setValueAtTime(523.25, now);       // C5
                osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                osc.frequency.setValueAtTime(1046.50, now + 0.3);// C6
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.setValueAtTime(0.1, now + 0.4);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
                break;
            case 'achievement':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                gainNode.gain.setValueAtTime(0.02, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
            default:
                break;
        }
    }, [isMuted]);

    // Background Music Loop
    useEffect(() => {
        if (isMuted) {
            clearInterval(bgmIntervalRef.current);
            return;
        }

        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const notes = [261.63, 329.63, 392.00, 329.63]; // C4, E4, G4, E4
        let step = 0;

        bgmIntervalRef.current = setInterval(() => {
            if (ctx.state !== 'running') return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            // Triangle wave for a soft, retro bassline
            osc.type = 'triangle';
            osc.frequency.value = notes[step % notes.length] / 2; // Drop an octave
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const now = ctx.currentTime;
            gain.gain.setValueAtTime(0.015, now); // Very low volume BGM
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            
            osc.start(now);
            osc.stop(now + 0.4);
            
            step++;
        }, 500); // Play a note every 500ms

        return () => clearInterval(bgmIntervalRef.current);
    }, [isMuted]);

    return (
        <AudioContext.Provider value={{ isMuted, setIsMuted, toggleMute, playSfx, initAudio }}>
            {children}
        </AudioContext.Provider>
    );
};
