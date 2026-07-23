import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import './SpeedLines.css';

const SpeedLines = () => {
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
    
    // Map absolute velocity to opacity (fade in when scrolling fast)
    // Negative velocity = scrolling up, Positive velocity = scrolling down
    const opacity = useTransform(
        smoothVelocity, 
        [-1500, -600, 0, 600, 1500], 
        [0.8, 0, 0, 0, 0.8]
    );

    return (
        <motion.div 
            className="speed-lines-wrapper"
            style={{ opacity }}
        >
            <div className="speed-lines-left" />
            <div className="speed-lines-right" />
            {/* Top and Bottom speed lines for extra intensity */}
            <div className="speed-lines-top" />
            <div className="speed-lines-bottom" />
        </motion.div>
    );
};

export default SpeedLines;
