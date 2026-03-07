import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";

// Import logo
import OrgoMasteryLogo from "../assets/OrgoMasteryLogo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout, isInstructor } = useAuth();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo" onClick={closeMenu}>
          <img
            src={OrgoMasteryLogo}
            alt="OrgoMastery Logo"
            className="orgomastery-logo"
          />
        </NavLink>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          &#9776;
        </button>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/lectures" onClick={closeMenu}>
            Lectures
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/progress" onClick={closeMenu}>
              My Progress
            </NavLink>
          )}

          {isAuthenticated && isInstructor && (
            <NavLink to="/instructor" onClick={closeMenu}>
              Instructor
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeMenu}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="header-user">
                {user?.username} {user?.role ? `(${user.role})` : ""}
              </span>
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
