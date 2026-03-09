import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import "../styles/HomePage.css";

// Import OrgoMastery logo
import OrgoMasteryLogo from "../assets/OrgoMasteryLogo.png";

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
        <img
          ref={logoRef}
          src={OrgoMasteryLogo}
          alt="OrgoMastery Logo"
          className="hero-logo logo-fade"
        />

        <h1 className="hero-heading slide-up">
          Learn Organic Chemistry with Confidence
        </h1>

        <p className="tagline slide-up">
          OrgoMastery helps students build understanding through structured
          lectures, guided notes, interactive quizzes, and progress tracking.
        </p>

        <div className="button-fade hero-actions">
          <Link to="/lectures">
            <Button label="Get Started" size="large" />
          </Link>

          <Link to="/about">
            <Button label="Learn More" variant="secondary" size="large" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;




