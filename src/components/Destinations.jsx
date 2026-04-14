import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const destinationsData = [
  {
    id: 1,
    name: 'Tokyo',
    location: 'Kanto Region',
    country: 'Japan',
    image: '/erik-eastman-4HG5hlhmZg8-unsplash.jpg',
  },
  {
    id: 2,
    name: 'Kyoto',
    location: 'Kansai Region',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
  {
    id: 3,
    name: 'Osaka',
    location: 'Kansai Region',
    country: 'Japan',
    image: '/kit-ko-9zYjlA4LqTU-unsplash.jpg',
  },
  {
    id: 4,
    name: 'Hokkaido',
    location: 'Northern Japan',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&q=80',
  },
  {
    id: 5,
    name: 'Hiroshima',
    location: 'Chugoku Region',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Destinations() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const cardWidth = 340 + 16;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(destinationsData.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const cardWidth = 340 + 16;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="destinations" className="destinations section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-title"
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-subtitle"
          >
            Explore the most beloved destinations across Japan, from ancient capitals 
            to modern metropolises
          </motion.p>
        </div>

        <div className="carousel-container">
          <button className="carousel-arrow carousel-prev" onClick={handlePrev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div 
            className="carousel-track"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {destinationsData.map((destination, index) => (
              <motion.article 
                key={destination.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="carousel-card"
              >
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <div className="carousel-card-overlay">
                  <span className="carousel-country">{destination.country}</span>
                  <h3 className="carousel-card-title">{destination.name}</h3>
                  <span className="carousel-location">{destination.location}</span>
                  <button className="carousel-explore-btn">Explore →</button>
                </div>
              </motion.article>
            ))}
          </div>

          <button className="carousel-arrow carousel-next" onClick={handleNext} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {destinationsData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(index);
                scrollToCard(index);
              }}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;