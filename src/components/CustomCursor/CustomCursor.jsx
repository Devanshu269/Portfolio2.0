import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .skill-card, .experience-card, .theme-toggle, input, textarea')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1,
            rotate: 45
        },
        hover: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1.5,
            rotate: 90
        }
    };

    return (
        <>
            {/* Outer Sci-Fi Frame */}
            <motion.div
                className={`custom-cursor-frame ${isHovering ? 'hovering' : ''}`}
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            {/* Inner Core */}
            <div 
                className={`custom-cursor-core ${isHovering ? 'hovering' : ''}`} 
                style={{ 
                    left: `${mousePosition.x}px`, 
                    top: `${mousePosition.y}px` 
                }} 
            />
        </>
    );
};

export default CustomCursor;
