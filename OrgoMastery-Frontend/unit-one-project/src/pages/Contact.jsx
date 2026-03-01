import { useState } from "react";
import Button from "../components/Button";
import "../styles/ContactPage.css";

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "feedback",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    // (Optional) can connect this to an API later:
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
  }

  return (
    <section className="contact-container container">
      <h1 className="contact-title">Contact ChemLearn</h1>
      <p className="contact-subtitle">
        We'd love to hear from you! Whether you have feedback, questions, or
        ideas for new features, feel free to reach out.
      </p>

      {/* Success Message */}
      {submitted && (
        <div className="contact-success">
          Thank you for your message! We’ll get back to you soon.
        </div>
      )}

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Email */}
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

        {/* Reason for Contact */}
        <label>
          Reason for Contact
          <select name="reason" value={formData.reason} onChange={handleChange}>
            <option value="feedback">General Feedback</option>
            <option value="question">Ask a Question</option>
            <option value="collaboration">Collaboration Request</option>
          </select>
        </label>

        {/* Message */}
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

        {/* Submit */}
        <Button label="Submit Message" type="submit" fullWidth={true} />
      </form>
    </section>
  );
}

export default Contact;
