import { motion } from 'framer-motion';
import './BackgroundSprites.css';

const BackgroundSprites = () => {
    return (
        <div className="bg-sprites-container">
            {/* Cloud 1 */}
            <motion.div 
                className="pixel-cloud cloud-1"
                animate={{ x: ['-20vw', '120vw'] }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
                ☁️
            </motion.div>

            {/* Cloud 2 */}
            <motion.div 
                className="pixel-cloud cloud-2"
                animate={{ x: ['120vw', '-20vw'] }}
                transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
            >
                ☁️
            </motion.div>
            
            {/* Cloud 3 */}
            <motion.div 
                className="pixel-cloud cloud-3"
                animate={{ x: ['-20vw', '120vw'] }}
                transition={{ duration: 150, repeat: Infinity, ease: 'linear', delay: 10 }}
            >
                ☁️
            </motion.div>
            
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
