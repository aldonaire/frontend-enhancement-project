import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!email.includes('@')) {
      return 'Please enter a valid email address';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSuccess('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>TORII</h3>
            <p>
              Your gateway to discovering the wonders of Japan. 
              We curate unforgettable experiences that blend tradition with modernity.
            </p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#">Travel Guides</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="newsletter">
          <h4>Stay Updated</h4>
          <p>
            Subscribe to receive travel tips, exclusive offers, and stories from Japan.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className={`newsletter-input ${error ? 'error' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setSuccess('');
              }}
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>

          {error && <p className="newsletter-error">{error}</p>}
          {success && <p className="newsletter-success">{success}</p>}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Torii. All rights reserved.</p>
          <p>Made with love for Japan</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;