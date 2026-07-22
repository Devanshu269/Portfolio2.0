import { useState, useEffect, useRef, useCallback } from 'react';
import './StageBanner.css';

const STAGES = [
    { id: 'about',           num: '1-1', name: 'CHARACTER INFO' },
    { id: 'work',            num: '1-2', name: 'MAIN QUEST' },
    { id: 'projects',        num: '2-1', name: 'SIDE QUESTS' },
    { id: 'skills',          num: '2-2', name: 'SKILL TREE' },
    { id: 'education',       num: '3-1', name: 'TUTORIAL ZONE' },
    { id: 'certificates',    num: '3-2', name: 'ACHIEVEMENTS' },
    { id: 'recommendations', num: '4-1', name: 'ALLY REPORTS' }
];

const StageBanner = () => {
    const [banner, setBanner]   = useState(null);
    const [visible, setVisible] = useState(false);

    const lastScrollY  = useRef(window.scrollY);
    const currentStage = useRef(null);
    const timerRef     = useRef(null);

    const showBanner = useCallback((stage) => {
        clearTimeout(timerRef.current);
        setBanner(stage);
        setVisible(true);
        timerRef.current = setTimeout(() => setVisible(false), 2600);
    }, []);

    useEffect(() => {
        // Get all section elements once
        const sections = STAGES.map(s => ({
            ...s,
            el: document.getElementById(s.id),
        })).filter(s => s.el);

        const TRIGGER_ZONE = window.innerHeight * 0.45; // 45% from top

        const onScroll = () => {
            const currentY = window.scrollY;
            const scrollingDown = currentY > lastScrollY.current;
            lastScrollY.current = currentY;

            if (!scrollingDown) return; // only trigger going down

            for (const stage of sections) {
                const rect = stage.el.getBoundingClientRect();
                // Section top edge just entered upper half of viewport
                if (rect.top >= 0 && rect.top <= TRIGGER_ZONE) {
                    if (currentStage.current !== stage.id) {
                        currentStage.current = stage.id;
                        showBanner(stage);
                    }
                    break;
                }
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timerRef.current);
        };
    }, [showBanner]);

    if (!banner) return null;

    return (
        <div className={`stage-banner${visible ? ' show' : ' hide'}`}>
            <div className="stage-inner">
                <span className="stage-num">WORLD {banner.num}</span>
                <span className="stage-dash">—</span>
                <span className="stage-name">{banner.name}</span>
            </div>
        </div>
    );
};

export default StageBanner;
