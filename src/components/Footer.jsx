import React from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <section>
            <h3>PizzaCraft</h3>
            <p>Handcrafted wood-fired pizza made fresh daily with premium ingredients and bold flavors.</p>
          </section>
          <section>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </section>
          <section>
            <h3>Store Hours</h3>
            <ul className="footer-meta">
              <li>
                <Clock3 size={14} /> Mon-Sun: 11:00 AM - 10:30 PM
              </li>
              <li>
                <MapPin size={14} /> 28 Oven Street, Downtown
              </li>
            </ul>
          </section>
          <section>
            <h3>Contact</h3>
            <ul className="footer-meta">
              <li>
                <Phone size={14} /> +63 915 222 9090
              </li>
              <li>
                <Mail size={14} /> hello@pizzacraft.com
              </li>
            </ul>
          </section>
        </div>
        <p className="footer-copy">&copy; 2026 PizzaCraft. All rights reserved.</p>
      </div>
    </footer>
  );
}
