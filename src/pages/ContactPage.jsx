import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Clock3, MapPin, Phone, Mail, UtensilsCrossed } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestType, setRequestType] = useState("order");

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main>
      <section className="section section-full-bg contact-section">
        <div className="container">
          <div className="section-head">
            <h2>Contact Us</h2>
            <p>Place an order, book a table, or contact us for catering and special events.</p>
          </div>

          <div className="contact-core">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <div className="contact-item">
                <MapPin size={20} />
                <p>28 Oven Street, Downtown</p>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <p>+63 915 222 9090</p>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <p>hello@pizzacraft.com</p>
              </div>
              <div className="contact-item">
                <Clock3 size={20} />
                <p>Mon-Sun, 11:00 AM - 10:30 PM</p>
              </div>
              <div className="contact-item">
                <UtensilsCrossed size={20} />
                <p>Delivery, pickup, dine-in, and event catering</p>
              </div>
              <div className="contact-item">
                <CalendarClock size={20} />
                <p>Reservations available for families and groups</p>
              </div>
            </motion.div>

            <motion.div
              className="contact-map"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <h3>Find Us on Map</h3>
              <p>Visit our downtown kitchen or open directions in Google Maps.</p>
              <iframe
                className="map-frame"
                title="PizzaCraft Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=120.980%2C14.580%2C121.040%2C14.640&layer=mapnik&marker=14.6091%2C121.0223"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="btn btn-secondary"
                href="https://www.google.com/maps/search/?api=1&query=28+Oven+Street+Downtown"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            {formSubmitted ? (
              <div className="thank-you-message">
                <h3>Request Sent Successfully</h3>
                <p>Our team will confirm your request shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="requestType">Request Type</label>
                  <select id="requestType" name="requestType" value={requestType} onChange={(event) => setRequestType(event.target.value)}>
                    <option value="order">Order</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder={
                      requestType === "reservation"
                        ? "Share date, time, and number of guests..."
                        : requestType === "catering"
                          ? "Share event date, headcount, and menu preferences..."
                          : "Share your order details and preferred delivery/pickup time..."
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}