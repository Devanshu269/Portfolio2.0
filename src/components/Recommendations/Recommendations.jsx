import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Recommendations.css';

const Recommendations = () => {
    const testimonials = [
        {
            name: "Anuja Nayak",
            role: "Engineering Manager (Manager)",
            content: "I had the pleasure of managing Devanshu for a year, and he stood out as a dependable, high-ownership engineer who consistently delivered on complex, high-impact projects like Bulk UI updates, Smart Sourcing, Node Capabilities, and the File Upload system. He balances feature delivery with proactive tech debt resolution and is often the first to jump in during on-call situations, ensuring system stability and an excellent customer experience. Devanshu pairs strong technical execution with a collaborative, customer-first mindset. He mentors peers, communicates thoughtfully, and goes the extra mile to simplify long-term complexity."
        },
        {
            name: "Parshant Sharma",
            role: "Full Stack Developer (Senior Colleague)",
            content: "I had the pleasure of working with Devanshu Shekhar for around 18 months on the NodeStar project, and I can confidently say that he is an exceptional professional. Devanshu was instrumental in working on the frontend, and his ability to handle edge case scenarios was impressive. He consistently demonstrated a high level of proficiency in his work, delivering high-quality results on time. His problem-solving skills are top-notch, and he thrives in tackling complex challenges."
        },
        {
            name: "R D Sabareesh",
            role: "Building CodeKarma (Team Lead)",
            content: "I have had the pleasure of working closely with Devanshu, a highly skilled and enthusiastic full-stack developer. His passion for both frontend and backend development is evident in his continuous efforts to optimize solutions and enhance user interfaces. Beyond his technical expertise, Devanshu's commitment to collaboration and teamwork is remarkable. He often operates at a level well above his designation, showcasing leadership and forward-thinking capabilities."
        },
        {
            name: "Amit Kumar",
            role: "Software Engineer @ Lowe's India (Senior Colleague)",
            content: "I've had the privilege of working closely with Devanshu on a variety of projects in our current organization, and I continue to be impressed by his dedication, technical expertise, and ability to deliver high-quality work on time. What truly sets Devanshu apart is his natural leadership ability. He possesses the qualities of an excellent manager, demonstrating strong decision-making skills, effective communication, and the ability to inspire and guide his team toward achieving shared goals."
        },
        {
            name: "Soumendu Das",
            role: "SSE @ Lowe's India (Senior Colleague)",
            content: "It has been truly rewarding to witness his journey from an ASE to an SE. His unwavering dedication to learning and growth is both inspiring and commendable. Having had the privilege of mentoring him and collaborating on numerous key features for our project, I can confidently say that his contributions have been invaluable. What stands out most is his ability to step beyond his defined role, taking on multiple responsibilities and consistently delivering with excellence."
        },
        {
            name: "Rishindra Mani Katiyar",
            role: "SDE-2: Tech@Kotak (Senior Colleague)",
            content: "I had the pleasure of working with Devanshu at Lowe's where he truly excelled in full stack development. Devanshu is known for his ability to create user-friendly and responsive user interfaces, with his work on React-based dashboards like the Assortment Dashboard increasing user engagement and operational efficiency. What really makes him a cut above is that he fills the gap between frontend and backend development to ensure user-centric solutions using modern technologies."
        },
        {
            name: "Saswata Rakshit",
            role: "User Experience Designer @ QSC (Senior Colleague)",
            content: "I had the pleasure of working with Devanshu on various projects, where he consistently delivered high-quality work within deadlines. He is a quick learner who easily grasped complex concepts such as micro-frontend architecture, SSO login architecture, and other business requirements, implementing them seamlessly in real-time projects. Devanshu is a dependable team player and would be a valuable asset to any development team."
        }
    ];

    return (
        <section id="recommendations" className="recommendations-section">
            <div className="container">
                <div className="section-header align-center">
                    <span className="section-subtitle">Vouches</span>
                    <h2 className="section-title">Peer <br /> <span className="outline-text">Recognition</span></h2>
                </div>

                <div className="recommendations-grid">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="testimonial-card glass"
                        >
                            <Quote className="quote-icon" size={32} />
                            <p className="testimonial-content">"{item.content}"</p>
                            <div className="testimonial-footer">
                                <div className="name-indicator"></div>
                                <div className="author-info">
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
