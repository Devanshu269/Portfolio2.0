import { useState, useEffect, useRef } from 'react';
import './StageBanner.css';

const STAGES = [
    { id: 'about',           num: '1-1', name: 'CHARACTER INFO' },
    { id: 'work',            num: '1-2', name: 'MAIN QUEST' },
    { id: 'projects',        num: '2-1', name: 'SIDE QUESTS' },
    { id: 'skills',          num: '2-2', name: 'SKILL TREE' },
    { id: 'education',       num: '3-1', name: 'TUTORIAL ZONE' },
    { id: 'certificates',    num: '3-2', name: 'ACHIEVEMENTS' },
    { id: 'recommendations', num: '4-1', name: 'ALLY REPORTS' },
    { id: 'contact',         num: '4-2', name: 'FINAL BOSS' },
];

const StageBanner = () => {
    const [banner, setBanner] = useState(null);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);
    const lastRef  = useRef(null);

    useEffect(() => {
        const observers = [];

        STAGES.forEach(stage => {
            const el = document.getElementById(stage.id);
            if (!el) return;

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && lastRef.current !== stage.id) {
                    lastRef.current = stage.id;
                    clearTimeout(timerRef.current);
                    setBanner(stage);
                    setVisible(true);
                    timerRef.current = setTimeout(() => setVisible(false), 2400);
                }
            }, { threshold: 0.25, rootMargin: '-60px 0px 0px 0px' });

            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach(o => o.disconnect());
            clearTimeout(timerRef.current);
        };
    }, []);

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
