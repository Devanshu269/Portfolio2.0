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

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      {/* ── Always-on overlays ── */}
      <CustomCursor />
      <CursorTrail />
      <KonamiCode />

      {/* ── Scroll progress bar (red) ── */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="main-content"
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
