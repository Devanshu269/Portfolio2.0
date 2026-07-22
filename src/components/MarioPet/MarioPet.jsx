import { useState, useEffect, useRef, useCallback } from 'react';
import './MarioPet.css';

const MESSAGES = [
    "Let's-a go! 🍄",
    "Wahoo! ⭐",
    "It's-a me!",
    "Mamma mia!",
    "Yahoo! 🎮",
    "Nice portfolio!",
    "Press START!",
    "LEVEL UP! 🏆",
];

// ── Colour palette ──────────────────────────────────────────
const C = {
    r: '#D32F2F',   // mario red / koopa shell
    s: '#FFCC80',   // mario skin
    d: '#3E2723',   // dark brown / eyes
    b: '#1565C0',   // blue overalls
    n: '#5D4037',   // brown boots
    y: '#FBC02D',   // yellow accent
    e: null,        // transparent
    g: '#388E3C',   // koopa green
    G: '#2E7D32',   // koopa dark green
    w: '#ffffff',   // white
    k: '#000000',   // black
    t: '#F9A825',   // koopa skin/tan
};

// ── Mario pixel art (12 cols) ─────────────────────────────
const MARIO_HEAD = [
    ['e','e','e','r','r','r','r','e','e','e','e','e'],
    ['e','e','r','r','r','r','r','r','r','e','e','e'],
    ['e','e','d','d','d','s','s','d','y','y','e','e'],
    ['e','d','s','d','s','s','s','s','d','y','y','e'],
    ['e','d','s','d','d','s','s','s','d','d','e','e'],
    ['e','e','e','s','s','s','s','s','s','e','e','e'],
    ['e','e','e','d','d','d','d','e','e','e','e','e'],
    ['e','e','r','r','b','r','r','e','e','e','e','e'],
    ['e','r','r','r','b','r','r','r','e','e','e','e'],
    ['r','r','r','r','b','b','r','r','r','e','e','e'],
    ['s','s','r','b','y','b','r','s','s','e','e','e'],
    ['s','s','s','b','b','b','s','s','s','e','e','e'],
    ['s','s','b','b','b','b','b','s','s','e','e','e'],
];

const MARIO_LEGS = [
    // frame 0 stand
    [['e','b','b','e','e','b','b','e','e','e','e','e'],
     ['e','n','n','e','e','n','n','e','e','e','e','e']],
    // frame 1 step L
    [['e','e','b','b','b','e','e','e','e','e','e','e'],
     ['n','n','n','e','e','e','e','e','e','e','e','e']],
    // frame 2 step R
    [['e','b','e','e','b','b','e','e','e','e','e','e'],
     ['e','n','e','e','n','n','e','e','e','e','e','e']],
];

const MARIO_LEGS_JUMP = [
    ['b','b','e','e','e','b','b','e','e','e','e','e'],
    ['n','n','e','e','e','n','n','e','e','e','e','e'],
];

// ── Koopa Troopa pixel art (10 cols) ────────────────────────
const KOOPA = [
    ['e','e','G','G','G','G','e','e','e','e'],
    ['e','G','g','g','g','g','G','e','e','e'],
    ['e','t','w','d','t','w','d','t','e','e'],  // face w/ eyes
    ['e','t','t','t','t','t','t','t','e','e'],
    ['e','e','r','r','r','r','r','e','e','e'],  // shell top
    ['e','r','r','r','r','r','r','r','e','e'],
    ['r','r','r','G','G','G','r','r','r','e'],
    ['r','r','r','G','G','G','r','r','r','e'],
    ['e','r','r','r','r','r','r','r','e','e'],
    ['e','e','r','r','r','r','r','e','e','e'],
    ['e','g','g','e','e','g','g','e','e','e'],  // legs
    ['e','G','G','e','e','G','G','e','e','e'],
];

const KOOPA_FLAT = [   // squished koopa (when stomped)
    ['e','e','e','e','e','e','e','e','e','e'],
    ['e','r','r','r','r','r','r','r','e','e'],
    ['r','r','G','G','G','G','G','r','r','e'],
    ['r','r','G','G','G','G','G','r','r','e'],
    ['e','r','r','r','r','r','r','r','e','e'],
];

// ── Pixel row renderer ────────────────────────────────────
const Row = ({ cells, size }) => (
    <div className="mp-row">
        {cells.map((c, i) => (
            <div key={i} className="mp-px" style={{ background: C[c] || 'transparent', width: size, height: size }} />
        ))}
    </div>
);

// ── Main component ─────────────────────────────────────────
const MarioPet = () => {
    // Mario state
    const [mx, setMx] = useState(140);
    const [my, setMy] = useState(0);
    const [mDir, setMDir] = useState(1);
    const [mFrame, setMFrame] = useState(0);
    const [mJumping, setMJumping] = useState(false);
    const [mIdle, setMIdle] = useState(false);
    const [bubble, setBubble] = useState(null);

    // Koopa state
    const [koopa, setKoopa] = useState(null);   // null | { x, dir, flat }
    const [koopaFlat, setKoopaFlat] = useState(false);

    const mxRef  = useRef(140);
    const mDirRef = useRef(1);
    const jumpRef = useRef(false);
    const idleRef = useRef(false);
    const rafRef  = useRef(null);
    const koopaRef = useRef(null);
    const stomping = useRef(false);

    const PX = 5;   // Mario pixel size
    const KPX = 5;  // Koopa pixel size

    // ── Speech bubble ────────────────────────────────────
    const showBubble = useCallback(() => {
        if (idleRef.current) return;
        const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setBubble(msg);
        idleRef.current = true;
        setMIdle(true);
        setTimeout(() => {
            setBubble(null);
            idleRef.current = false;
            setMIdle(false);
        }, 2600);
    }, []);

    // ── Mario movement ───────────────────────────────────
    useEffect(() => {
        let last = performance.now();
        const SPEED = 65;

        const tick = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            if (!idleRef.current) {
                const maxX = window.innerWidth - 70;
                let nx = mxRef.current + mDirRef.current * SPEED * dt;
                if (nx >= maxX)   { nx = maxX; mDirRef.current = -1; setMDir(-1); }
                else if (nx <= 0) { nx = 0;    mDirRef.current =  1; setMDir(1);  }
                mxRef.current = nx;
                setMx(nx);
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // ── Walk frame cycle ─────────────────────────────────
    useEffect(() => {
        const id = setInterval(() => {
            if (!idleRef.current) setMFrame(f => (f + 1) % 3);
        }, 145);
        return () => clearInterval(id);
    }, []);

    // ── Jump helper ──────────────────────────────────────
    const triggerJump = useCallback((stompKoopa = false) => {
        if (jumpRef.current) return;
        jumpRef.current = true;
        setMJumping(true);
        let vy = stompKoopa ? 16 : 12;
        let yv = 0;
        const grav = stompKoopa ? 0.9 : 0.8;

        const jId = setInterval(() => {
            vy -= grav;
            yv += vy;
            if (yv <= 0) {
                yv = 0;
                clearInterval(jId);
                jumpRef.current = false;
                setMJumping(false);
                if (stompKoopa && !stomping.current) {
                    stomping.current = true;
                    // Squish koopa
                    setKoopaFlat(true);
                    setTimeout(() => {
                        setKoopa(null);
                        setKoopaFlat(false);
                        stomping.current = false;
                        koopaRef.current = null;
                    }, 800);
                }
            }
            setMy(Math.max(0, yv));
        }, 16);
    }, []);

    // ── Auto random jump ─────────────────────────────────
    useEffect(() => {
        const id = setInterval(() => {
            if (!jumpRef.current && !idleRef.current && Math.random() > 0.55)
                triggerJump(false);
        }, 4500);
        return () => clearInterval(id);
    }, [triggerJump]);

    // ── Auto idle bubble ─────────────────────────────────
    useEffect(() => {
        const id = setInterval(() => {
            if (!idleRef.current && !jumpRef.current && Math.random() > 0.6)
                showBubble();
        }, 7000);
        return () => clearInterval(id);
    }, [showBubble]);

    // ── Koopa spawner ────────────────────────────────────
    useEffect(() => {
        const spawnKoopa = () => {
            if (koopaRef.current) return; // already one on screen
            const fromLeft = Math.random() > 0.5;
            const startX   = fromLeft ? -60 : window.innerWidth + 60;
            const kDir     = fromLeft ? 1 : -1;
            const k = { x: startX, dir: kDir };
            koopaRef.current = k;
            setKoopa({ ...k });
            setKoopaFlat(false);
        };

        // Spawn every 12-18 seconds
        const id = setInterval(spawnKoopa, 14000);
        // First spawn after 8 seconds
        const first = setTimeout(spawnKoopa, 8000);
        return () => { clearInterval(id); clearTimeout(first); };
    }, []);

    // ── Koopa movement & collision ───────────────────────
    useEffect(() => {
        if (!koopa) return;
        let kx = koopa.x;
        const KSPEED = 50; // px per second
        let last = performance.now();

        const tick = (now) => {
            if (!koopaRef.current || koopaFlat) return;
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            kx += koopa.dir * KSPEED * dt;

            // Remove koopa when off screen
            if (kx > window.innerWidth + 80 || kx < -80) {
                setKoopa(null);
                koopaRef.current = null;
                return;
            }

            setKoopa(k => k ? { ...k, x: kx } : null);

            // Collision check — if koopa within 60px of Mario, trigger stomp
            const dist = Math.abs(kx - mxRef.current);
            if (dist < 55 && !stomping.current && !jumpRef.current) {
                triggerJump(true);
                setBubble("Wahoo! ⭐");
                setTimeout(() => setBubble(null), 1800);
            }

            requestAnimationFrame(tick);
        };

        const raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [koopa?.dir, koopa?.x === null]);

    const legRows = mJumping ? MARIO_LEGS_JUMP : MARIO_LEGS[mFrame];

    return (
        <>
            {/* ── Mario ── */}
            <div
                className="mario-pet"
                style={{ left: mx, bottom: my }}
                onClick={showBubble}
                title="Click me! 🍄"
            >
                {bubble && <div className="mario-bubble">{bubble}</div>}
                <div
                    className={`mario-body${mIdle ? ' m-idle' : ''}${mJumping ? ' m-jump' : ''}`}
                    style={{ transform: mDir === -1 ? 'scaleX(-1)' : 'none' }}
                >
                    {MARIO_HEAD.map((row, i) => <Row key={i} cells={row} size={PX} />)}
                    {legRows.map((row, i) => <Row key={`l${i}`} cells={row} size={PX} />)}
                </div>
            </div>

            {/* ── Koopa Troopa ── */}
            {koopa && (
                <div
                    className={`koopa-pet${koopaFlat ? ' koopa-flat' : ''}`}
                    style={{ left: koopa.x, bottom: 0 }}
                >
                    <div
                        className="koopa-body"
                        style={{ transform: koopa.dir === -1 ? 'scaleX(-1)' : 'none' }}
                    >
                        {(koopaFlat ? KOOPA_FLAT : KOOPA).map((row, i) => (
                            <Row key={i} cells={row} size={KPX} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MarioPet;
