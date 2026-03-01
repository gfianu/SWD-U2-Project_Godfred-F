import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import "../styles/HomePage.css";

// Import ChemLearn logo
import ChemLogo from "../assets/ChemLearnLogo.png";

function Home() {
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <section className="start-hero">
      <div className="start-content fade-in">
        
        {/* Logo Image */}
        <img
          ref={logoRef}
          src={ChemLogo}
          alt="ChemLearn Logo"
          className="hero-logo logo-fade"
        />

        <p className="tagline slide-up">
          Master Organic Chemistry with Lectures, Notes, and Quizzes.
        </p>

        {/* Get Started button fades in AFTER tagline */}
        <div className="button-fade">
          <Link to="/lectures">
            <Button label="Get Started" size="large" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;




