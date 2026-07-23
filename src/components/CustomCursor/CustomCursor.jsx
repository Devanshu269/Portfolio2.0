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
            rotate: 0,
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))'
        },
        hover: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1.2,
            rotate: [0, -15, 15, -15, 15, 0], // Shaking animation
            transition: { 
                rotate: { repeat: Infinity, duration: 0.5 },
                scale: { type: "spring", stiffness: 400, damping: 25 }
            },
            filter: 'drop-shadow(0px 0px 8px rgba(227, 53, 13, 0.8))'
        }
    };

    return (
        <motion.div
            className={`pixel-cursor-container ${isHovering ? 'hovering' : ''}`}
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "tween", duration: 0 }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
                {/* Outer Black Border */}
                <path d="M8 2h8v2h4v4h2v8h-2v4h-4v2H8v-2H4v-4H2V8h2V4h4V2z" fill="#000" />
                
                {/* Top Red Half */}
                <path d="M8 4h8v2h2v4H6V6h2V4z" fill="#E3350D" />
                {/* Red Highlight */}
                <path d="M8 4h4v2H8V4z" fill="#FF7070" />
                
                {/* Bottom White Half */}
                <path d="M6 14h12v4h-2v2H8v-2H6v-4z" fill="#FFF" />
                {/* Bottom Shadow */}
                <path d="M8 18h8v2H8v-2z" fill="#D0D0D0" />
                
                {/* Center Black Band */}
                <path d="M4 10h16v4H4v-4z" fill="#000" />
                
                {/* Outer Button Ring (White) */}
                <path d="M10 10h4v4h-4v-4z" fill="#FFF" />
                
                {/* Inner Button (Light Grey) */}
                <path d="M11 11h2v2h-2v-2z" fill="#E0E0E0" />
            </svg>
        </motion.div>
    );
};

export default CustomCursor;
