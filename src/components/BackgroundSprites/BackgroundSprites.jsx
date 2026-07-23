import { motion } from 'framer-motion';
import './BackgroundSprites.css';

const BackgroundSprites = () => {
    return (
        <div className="bg-sprites-container">
            {/* Background Star 1 */}
            <motion.div
                className="pixel-star star-1"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                ✦
            </motion.div>
            
            {/* Background Star 2 */}
            <motion.div
                className="pixel-star star-2"
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
                ✧
            </motion.div>
        </div>
    );
};

export default BackgroundSprites;
