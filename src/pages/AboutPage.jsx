import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ChefHat, Flame, Pizza, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const values = [
    {
      title: "Crafted by Pizza Experts",
      description: "Our chefs hand-stretch dough and balance toppings for flavor in every bite.",
      icon: ChefHat
    },
    {
      title: "Authentic Wood-Fired Method",
      description: "High-heat stone baking delivers crisp crust, airy texture, and rich aroma.",
      icon: Flame
    },
    {
      title: "Consistent Quality",
      description: "From dine-in to delivery, every order follows strict prep and quality checks.",
      icon: ShieldCheck
    },
    {
      title: "Guest-First Service",
      description: "Friendly support, timely updates, and smooth ordering at every touchpoint.",
      icon: Star
    }
  ];

  const milestones = [
    "2018 - PizzaCraft opened as a neighborhood wood-fired kitchen",
    "2020 - Expanded to delivery and family combo menu options",
    "2023 - Launched signature gourmet recipes and event catering",
    "2026 - Became a trusted local favorite across the city"
  ];

  const highlights = [
    { label: "Guest Rating", value: "4.9/5" },
    { label: "Orders Served", value: "50K+" },
    { label: "Fresh Daily Prep", value: "100%" }
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <h2 className="about-title">About PizzaCraft</h2>
          <p className="about-subtitle">
            Handcrafted pizza brand built on premium ingredients, authentic wood-fired methods, and modern guest
            experience.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h3>Our Brand Story</h3>
              <p>
                PizzaCraft started as a small neighborhood oven and grew through one simple promise: every pizza should feel
                handcrafted, fresh, and worth sharing. We blend classic techniques with modern service systems to create a
                seamless guest experience from kitchen to table.
              </p>

              <div className="about-mini-list">
                <p>
                  <Pizza size={16} /> Premium ingredients sourced daily
                </p>
                <p>
                  <Truck size={16} /> Fast and reliable delivery operations
                </p>
                <p>
                  <Award size={16} /> Signature recipes loved by local guests
                </p>
              </div>
              <div className="about-badges">
                {highlights.map((item) => (
                  <span key={item.label}>
                    <strong>{item.value}</strong> {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="section-head">
            <h2>What Makes Us Professional</h2>
            <p>Clear standards in food quality, preparation, service, and delivery.</p>
          </div>
          <div className="split-grid">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  className="card feature-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <h3>
                    <Icon size={18} /> {item.title}
                  </h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <motion.article
            className="content-card about-promise-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35 }}
          >
            <h3>Our Journey</h3>
            <ul>
              {milestones.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} /> {item}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-cta">
            <div>
              <h3>Experience PizzaCraft Today</h3>
              <p>Order your favorites, reserve a table, or connect with our team for catering inquiries.</p>
            </div>
            <Link className="btn btn-primary" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}