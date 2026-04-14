import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircleHelp, Home, Info, Menu, Moon, Sun, X } from "lucide-react";
import "./Navbar.css";

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: CircleHelp }
  ];

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 12 || isOpen) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
    <header className={`site-header ${isNavVisible ? "" : "is-hidden"}`}>
      <nav className="site-nav">
        <div className="container nav-shell">
          <NavLink className="brand" to="/" onClick={closeMenu}>
            PizzaCraft
          </NavLink>
          <ul className="desktop-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              aria-label="Toggle color theme"
              onClick={toggleTheme}
              type="button"
            >
              <span className={`theme-icon ${theme === "dark" ? "is-dark" : "is-light"}`}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </button>
            <button
              className="menu-toggle"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsOpen(!isOpen)}
              type="button"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-backdrop ${isOpen ? "open" : ""}`} onClick={closeMenu} />
      <aside className={`mobile-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <div className="mobile-drawer-head">
          <span>Menu</span>
          <button type="button" className="menu-toggle" onClick={closeMenu} aria-label="Close mobile navigation">
            <X size={18} />
          </button>
        </div>
        <ul className="mobile-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <NavLink to={item.to} onClick={closeMenu}>
                  <Icon size={16} /> {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </header>
  );
}
