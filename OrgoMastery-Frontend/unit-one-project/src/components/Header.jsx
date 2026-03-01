import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

// Import logo
import ChemLearnLogo from "../assets/ChemLearnLogo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Left: Logo */}
        <NavLink to="/" className="header-logo">
          <img
            src={ChemLearnLogo}
            alt="ChemLearn Logo"
            className="chemlearn-logo"
          />
        </NavLink>

        {/* Hamburger (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        {/* Right: Navigation */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

