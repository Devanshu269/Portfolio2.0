import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Work from './components/Work/Work';
import Skills from './components/Skills/Skills';
import Recommendations from './components/Recommendations/Recommendations';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { useScroll, useSpring } from 'framer-motion';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate loading time for the personalized loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      <CustomCursor />
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
            <Navbar />
            <Hero />
            <About />
            <Work />
            <Education />
            <Skills />
            <Recommendations />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
