import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const rY = ((mouseX / width) - 0.5) * 10; // Max rotation 5deg
        const rX = ((mouseY / height) - 0.5) * -10;
        
        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ 
                    width: '100%', 
                    height: '100%',
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default TiltCard;
