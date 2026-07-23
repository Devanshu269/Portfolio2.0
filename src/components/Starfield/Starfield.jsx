import './Starfield.css';

const Starfield = () => {
    // Generate random stars for multiple layers
    const generateStars = (count, size) => {
        let stars = '';
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            stars += `${x}px ${y}px #FFF${i === count - 1 ? '' : ', '}`;
        }
        return {
            width: size,
            height: size,
            boxShadow: stars
        };
    };

    return (
        <div className="starfield-container">
            <div className="stars-layer-1" style={generateStars(700, 1)}></div>
            <div className="stars-layer-2" style={generateStars(200, 2)}></div>
            <div className="stars-layer-3" style={generateStars(100, 3)}></div>
        </div>
    );
};

export default Starfield;
