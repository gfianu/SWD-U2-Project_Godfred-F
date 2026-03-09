import { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "../styles/ContactPage.css";

function Contact() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    reason: "feedback",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Future: connect to backend API
    console.log("Contact form submission:", formData);

    setSubmitted(true);
  }

  return (
    <section className="contact-container container">
      <h1 className="contact-title">Contact OrgoMastery</h1>

      <p className="contact-subtitle">
        Have feedback, questions, or ideas for improving OrgoMastery? We'd love
        to hear from you. Send us a message and we’ll get back to you as soon as
        possible.
      </p>

      {submitted && (
        <div className="contact-success">
          Thank you for your message! We appreciate your feedback.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason for Contact
          <select name="reason" value={formData.reason} onChange={handleChange}>
            <option value="feedback">General Feedback</option>
            <option value="question">Ask a Question</option>
            <option value="collaboration">Collaboration Request</option>
          </select>
        </label>

        <label>
          Your Message
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </label>

        <Button label="Submit Message" type="submit" fullWidth={true} />
      </form>
    </section>
  );
}

export default Contact;
