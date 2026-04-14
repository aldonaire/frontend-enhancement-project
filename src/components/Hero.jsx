import { motion } from 'framer-motion';

function Hero() {
  return (
    <section 
      className="hero-section"
      style={{
        backgroundImage: "url('/ningyu-tb49PTdW1ZM-unsplash.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)',
        zIndex: 1
      }} />

      <div className="hero-content" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hero-title"
        >
          Discover <span>Japan</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hero-subtitle"
        >
          Experience the ancient temples, vibrant cities, and serene landscapes 
          of the Land of the Rising Sun
        </motion.p>
        
        <motion.button
          className="explore-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="explore-btn__text">Explore Japan</span>
          <span className="explore-btn__arrow">↓</span>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;