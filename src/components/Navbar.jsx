import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          PizzaCraft
        </NavLink>
        <div className="nav-center">
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
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
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
