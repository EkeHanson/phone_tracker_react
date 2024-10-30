import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './ContactUs.css';

const ContactUs = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch(`${djangoHostname}/api/users/send-contact-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          full_name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state when request completes
    }
  };

  return (
    <div>
      <NavBar />
      <div className="contact-us">
        <h1>Contact Us</h1>
        <div className="contact-form">
          {submitted && <div className="confirmation-message">Thank you! We will get back to you shortly.</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Your Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? <span className="loader"></span> : 'Send Message'}
            </button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Support Information</h2>
          <p>Phone: (123) 456-7890</p>
          <p>Email: support@phonetrackerapp.com</p>
          <p>Business Hours: Mon-Fri, 9 AM - 5 PM</p>
          <h2>Follow Us</h2>
          <div className="social-media-links">
            {/* Add icons for social media */}
          </div>
          <h2>Location</h2>
          {/* Embed Google Map here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
