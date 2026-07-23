import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Work from './components/Work/Work';
import Skills from './components/Skills/Skills';
import Certificates from './components/Certificates/Certificates';
import Projects from './components/Projects/Projects';
import Recommendations from './components/Recommendations/Recommendations';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import StickySocial from './components/StickySocial/StickySocial';

// ── Game Features ──────────────────────────────────────────
import MarioPet from './components/MarioPet/MarioPet';
import KonamiCode from './components/KonamiCode/KonamiCode';
import CoinProgress from './components/CoinProgress/CoinProgress';
import WarpPipe from './components/WarpPipe/WarpPipe';
import StageBanner from './components/StageBanner/StageBanner';
import CursorTrail from './components/CursorTrail/CursorTrail';
import QuestionBlock from './components/QuestionBlock/QuestionBlock';
import Starfield from './components/Starfield/Starfield';
import ScrollXPBar from './components/ScrollXPBar/ScrollXPBar';
import BackgroundSprites from './components/BackgroundSprites/BackgroundSprites';
import SpeedLines from './components/SpeedLines/SpeedLines';
import DamageNumbers from './components/DamageNumbers/DamageNumbers';
import { useAudio } from './context/AudioContext';

import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playSfx } = useAudio();

  // Global hover sound effect
  useEffect(() => {
    if (!hasStarted) return;
    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .project-card, .cert-card, .edu-item')) {
        playSfx('hover');
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [hasStarted, playSfx]);

  // Dynamic Tab Marquee
  useEffect(() => {
    let intervalId;
    let titleText = "[ LEVEL 1 ] Devanshu's Portfolio... ";
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
        document.title = "⚠️ PLAYER 1 HAS LEFT...";
      } else {
        document.title = titleText;
        intervalId = setInterval(() => {
          titleText = titleText.substring(1) + titleText[0];
          document.title = titleText;
        }, 300);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Start marquee initially if not hidden
    if (!document.hidden) {
      intervalId = setInterval(() => {
        titleText = titleText.substring(1) + titleText[0];
        document.title = titleText;
      }, 300);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // The loader now hides itself via the onStart callback.

  return (
    <div className="app-wrapper">
      {/* ── Always-on overlays ── */}
      <CustomCursor />
      <CursorTrail />
      <KonamiCode />
      <SpeedLines />
      <DamageNumbers />

      {/* ── Scroll progress bar (red) ── */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onStart={() => setLoading(false)} />
        ) : (
          <motion.main
            key="main-content"
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Starfield />
            <ScrollXPBar />
            <BackgroundSprites />
            {/* ── Game HUD elements ── */}
            <CoinProgress />
            <StageBanner />
            <WarpPipe />
            <QuestionBlock />
            <MarioPet />

            {/* ── Site nav & social ── */}
            <Navbar />
            <StickySocial />

            {/* ── Page sections ── */}
            <Hero />
            <About />
            <Work />
            <Projects />
            <Skills />
            <Education />
            <Certificates />
            <Recommendations />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
