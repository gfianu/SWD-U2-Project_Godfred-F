import "../styles/About.css";

function About() {
  return (
    <section className="about-container">
      <h1 className="about-title">About OrgoMastery</h1>

      <p className="about-intro">
        OrgoMastery is a modern learning platform designed to help students
        master Organic Chemistry through structured lectures, guided practice,
        and interactive assessments. The platform organizes complex topics into
        clear lessons supported by lecture videos, detailed notes, and quizzes
        that reinforce conceptual understanding.
      </p>

      <h2 className="about-heading">Our Mission</h2>

      <p className="about-text">
        Organic Chemistry is often considered one of the most challenging
        courses for science students. OrgoMastery aims to make the subject more
        approachable by organizing concepts into logical patterns, providing
        structured learning resources, and giving students opportunities to
        test their understanding through practice quizzes and feedback.
      </p>

      <h2 className="about-heading">What OrgoMastery Offers</h2>

      <ul className="about-list">
        <li>
          <strong>Structured Lectures:</strong> Topic-based lectures that guide
          students step-by-step through core Organic Chemistry concepts.
        </li>

        <li>
          <strong>Lecture Videos:</strong> Embedded video explanations that
          visually walk through reactions, mechanisms, and problem-solving
          strategies.
        </li>

        <li>
          <strong>Lecture Notes:</strong> Organized notes and solution keys that
          allow students to review material and reinforce learning outside the
          classroom.
        </li>

        <li>
          <strong>Interactive Quizzes:</strong> Practice quizzes that allow
          students to test their knowledge and immediately review incorrect
          answers.
        </li>

        <li>
          <strong>Progress Tracking:</strong> A dashboard that helps students
          monitor activity, track quiz attempts, and follow their learning
          progress.
        </li>

        <li>
          <strong>Instructor Tools:</strong> Built-in tools that allow
          instructors to manage lectures, upload videos and notes, create
          quizzes, and analyze student performance.
        </li>
      </ul>

      <h2 className="about-heading">Built for Learning</h2>

      <p className="about-text">
        OrgoMastery combines effective teaching strategies with modern web
        technology. By integrating structured course content, practice
        assessments, and progress tracking, the platform supports both
        independent study and instructor-led learning environments.
      </p>

      <p className="about-text">
        Whether you are preparing for exams, reviewing fundamental concepts, or
        strengthening your understanding of reaction mechanisms, OrgoMastery
        provides a clear path to mastering Organic Chemistry.
      </p>
    </section>
  );
}

export default About;

