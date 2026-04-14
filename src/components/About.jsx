import { useFadeIn } from '../hooks/useFadeIn';

function About() {
  const [ref, isVisible] = useFadeIn({ threshold: 0.2 });

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content" ref={ref}>
          <div className={`about-text fade-in ${isVisible ? 'visible' : ''}`}>
            <h2>
              Experience the <span>Magic</span> of Japan
            </h2>
            <p>
              From the neon-lit streets of Shinjuku to the tranquil bamboo forests 
              of Arashiyama, Japan offers an unparalleled journey through time. 
              Discover ancient shrines alongside cutting-edge technology, 
              traditional cuisine meets innovative culinary experiences.
            </p>
            <p>
              Our curated experiences connect you with the authentic spirit of Japan, 
              guiding you through hidden gems and iconic landmarks alike.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">47</div>
                <div className="stat-label"> prefectures</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2000+</div>
                <div className="stat-label"> shrines</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label"> experiences</div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className={`glass-card fade-in ${isVisible ? 'visible' : ''}`}>
              <svg
                className="glass-card-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
              </svg>
              <h3>Our Philosophy</h3>
              <p>
                We believe travel should transform not just your itinerary, but your perspective. 
                Every journey through Japan is an opportunity for discovery, connection, and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;