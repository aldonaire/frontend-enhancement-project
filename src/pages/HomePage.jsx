import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Flame,
  Github,
  Pizza,
  Salad,
  Sparkles,
  Star,
  Truck,
  Twitter,
  WandSparkles
} from "lucide-react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("bogo");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRefs = useRef([]);
  const guestCarouselRef = useRef(null);
  const bentoFeatures = [
    {
      title: "Signature Wood-Fired Taste",
      description: "Traditional stone oven baking gives every slice a crisp crust and rich smoky flavor.",
      icon: Flame,
      className: "bento-wide",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Chef-Crafted Recipes",
      description: "Our kitchen team creates balanced flavors from classic margherita to spicy specials.",
      icon: ChefHat,
      className: "",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Delivery in Minutes",
      description: "Track your pizza in real time and enjoy it hot at your door.",
      icon: Truck,
      className: "",
      image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Premium Ingredients",
      description: "Imported cheese, vine-ripened tomatoes, and fresh herbs in every order.",
      icon: Pizza,
      className: "bento-wide",
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Lunch Combo Deals",
      description: "Daily meal combos with pizza, drink, and sides at great value.",
      icon: BadgePercent,
      className: "",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80"
    },
    {
      title: "Salads and Sides",
      description: "Garlic bread, wings, and fresh salad options to complete your table.",
      icon: Salad,
      className: "",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80"
    }
  ];
  const testimonials = [
    {
      quote: "Best pizza in town. The crust is light, crispy, and full of flavor every single time.",
      author: "Maria D.",
      role: "Food Blogger",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "Fast delivery, friendly staff, and amazing toppings. Our family pizza night favorite.",
      author: "James T.",
      role: "Local Customer",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "Great portions, fair price, and the truffle mushroom pizza is absolutely worth it.",
      author: "Angela R.",
      role: "Restaurant Reviewer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "We reserved for eight people and everything was prepared on time and super fresh.",
      author: "Noah P.",
      role: "Event Host",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    }
  ];
  const popularItems = [
    {
      name: "Classic Pepperoni",
      desc: "Best seller",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Truffle Mushroom",
      desc: "Chef special",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "BBQ Chicken",
      desc: "Smoky favorite",
      image: "https://images.unsplash.com/photo-1516697073-419b2e67949d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Four Cheese",
      desc: "Rich and creamy",
      image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Hawaiian Heat",
      desc: "Sweet and spicy",
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Veggie Garden",
      desc: "Fresh and light",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const goToTestimonial = (index) => {
    testimonialRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest"
    });
    setActiveTestimonial(index);
  };

  const slideTestimonials = (direction) => {
    if (!testimonials.length) {
      return;
    }
    const total = testimonials.length;
    const nextIndex = direction === "next" ? (activeTestimonial + 1) % total : (activeTestimonial - 1 + total) % total;
    goToTestimonial(nextIndex);
  };

  return (
    <main>
      <section className="hero-section hero-full">
        <div className="hero-bg-layer" />
        <div className="hero-floating-orb hero-orb-left" />
        <div className="hero-floating-orb hero-orb-right" />
        <div className="hero-core">
          <p className="hero-kicker">Wood-fired Pizza Experience</p>
          <h1>Authentic Pizza<br />& Fast Delivery</h1>
          <p className="lead">
            Handcrafted dough, premium toppings, and oven-baked flavor made fresh for every table.
          </p>
          <div className="action-group">
            <button className="btn btn-primary" type="button" onClick={() => setIsModalOpen(true)}>
              <Sparkles size={16} /> View Today&apos;s Specials
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setIsModalOpen(true)}>
              Order or Reserve <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section section-full-bg menu-section">
        <div className="container">
          <div className="section-head">
            <h2>Menu Highlights</h2>
            <p>From classic recipes to bold signature creations.</p>
          </div>
          <section className="bento-grid">
            {bentoFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  className={`card feature-card ${item.className}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="feature-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80";
                    }}
                  />
                  <h3>
                    <Icon size={18} /> {item.title}
                  </h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </section>
        </div>
      </section>

      <section className="section section-full-bg popular-section">
        <div className="container">
          <div className="section-head">
            <h2>Popular Right Now</h2>
            <p>Most ordered pizzas this week.</p>
          </div>
          <div className="split-grid popular-grid">
            {popularItems.map((item, idx) => (
              <motion.article
                key={item.name}
                className="card popular-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: idx * 0.05, duration: 0.25 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="popular-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="popular-content">
                  <p className="step-index">{idx + 1}</p>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-full-bg guest-section">
        <div className="container">
          <div className="section-head">
            <h2>What Guests Say</h2>
          </div>
          <div className="guest-carousel-wrap">
            <button className="guest-nav-btn" type="button" onClick={() => slideTestimonials("prev")} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <div className="split-grid guest-grid" ref={guestCarouselRef}>
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.author}
                className="card quote-card"
                ref={(element) => {
                  testimonialRefs.current[idx] = element;
                }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
              >
                <div className="quote-top-band">
                  <div className="quote-social">
                    <Twitter size={14} />
                    <Github size={14} />
                  </div>
                </div>
                <div className="profile-row">
                  <img src={item.avatar} alt={item.author} className="profile-avatar" />
                  <div>
                    <h3>{item.author}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
                <div className="quote-stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} className={starIndex < item.rating ? "filled" : "empty"} />
                  ))}
                </div>
                <p>"{item.quote}"</p>
                <div className="quote-actions">
                  <button className="btn btn-secondary" type="button">About Me</button>
                  <button className="btn btn-primary" type="button">Hire Me</button>
                </div>
              </motion.article>
            ))}
            </div>
            <button className="guest-nav-btn" type="button" onClick={() => slideTestimonials("next")} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="guest-dots" role="tablist" aria-label="Guest testimonials carousel controls">
            {testimonials.map((item, idx) => (
              <button
                key={item.author}
                className={`guest-dot ${activeTestimonial === idx ? "active" : ""}`}
                type="button"
                onClick={() => goToTestimonial(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="modal open"
            aria-hidden={!isModalOpen}
            role="dialog"
            aria-labelledby="tipsModalTitle"
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
            >
              <button className="close-modal" aria-label="Close tips modal" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
              <h2 id="tipsModalTitle">
                <WandSparkles size={18} /> Today&apos;s Specials
              </h2>
              <div className="modal-options">
                <button
                  className={`modal-option ${selectedOffer === "bogo" ? "active" : ""}`}
                  type="button"
                  onClick={() => setSelectedOffer("bogo")}
                >
                  Buy 1 Get 1
                </button>
                <button
                  className={`modal-option ${selectedOffer === "family" ? "active" : ""}`}
                  type="button"
                  onClick={() => setSelectedOffer("family")}
                >
                  Family Combo
                </button>
                <button
                  className={`modal-option ${selectedOffer === "truffle" ? "active" : ""}`}
                  type="button"
                  onClick={() => setSelectedOffer("truffle")}
                >
                  Truffle Special
                </button>
              </div>
              <ul>
                <li hidden={selectedOffer !== "bogo"}>Buy 1 Get 1 on all medium pizzas (4 PM - 7 PM).</li>
                <li hidden={selectedOffer !== "family"}>Free garlic bread with any family combo.</li>
                <li hidden={selectedOffer !== "truffle"}>Try our new truffle mushroom signature pizza.</li>
              </ul>
              <Link className="btn btn-primary" to="/contact" onClick={() => setIsModalOpen(false)}>
                Continue to Order <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
