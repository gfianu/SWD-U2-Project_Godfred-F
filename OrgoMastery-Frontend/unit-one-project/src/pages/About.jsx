function About() {
  return (
    <section className="container" style={{ maxWidth: "900px", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#1e3a8a" }}>
        About ChemLearn
      </h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.7", fontSize: "1.1rem" }}>
        ChemLearn is a modern, student-centered learning platform designed to help
        learners master Organic Chemistry through clear explanations, structured lessons,
        interactive tools, and guided practice. Whether you're a college student, an
        educator, or a professional refreshing your knowledge, ChemLearn provides the
        clarity and structure needed to succeed in one of chemistry’s most challenging
        subjects.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.5rem" }}>
        Our Mission
      </h2>
      <p style={{ lineHeight: "1.7", marginBottom: "1.5rem" }}>
        Our mission is simple: to make Organic Chemistry accessible, intuitive, and
        engaging. We believe that learners thrive when complex concepts are broken down
        into meaningful patterns, supported by visual explanations, practice questions,
        and real-world applications.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.5rem" }}>
        What ChemLearn Offers
      </h2>

      <ul style={{ marginLeft: "1.25rem", lineHeight: "1.8", fontSize: "1.05rem" }}>
        <li><strong>Structured Lectures:</strong> Topic-based lectures that build conceptual understanding step-by-step.</li>
        <li><strong>Interactive Quizzes:</strong> Practice questions designed to reinforce learning and build confidence.</li>
        <li><strong>Lecture Notes:</strong> Comprehensive, easy-to-review notes tied directly to each lecture topic.</li>
        <li><strong>Dashboard Tracking:</strong> Tools to monitor your progress, track completed lessons, and plan your next steps.</li>
        <li><strong>Real-World Examples:</strong> Mechanisms and reactions connected to real organic synthesis and modern research.</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.5rem" }}>
        Why ChemLearn?
      </h2>
      <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
        Organic Chemistry can feel overwhelming, but it doesn’t have to be. ChemLearn
        removes unnecessary confusion by presenting the subject the way experts
        understand it: through relationships, patterns, and predictable logic.
      </p>

      <p style={{ lineHeight: "1.7" }}>
        Whether you're preparing for an exam, strengthening foundational knowledge, or
        seeking a clearer learning structure, ChemLearn is here to support your journey.
      </p>
    </section>
  );
}

export default About;

