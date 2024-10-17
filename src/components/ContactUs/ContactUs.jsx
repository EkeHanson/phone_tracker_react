import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './ContactUs.css';    

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  return (
    <div>
    <div className="contact-us">
      <h1>Contact Us</h1>
      <div className="contact-form">
        {submitted && <div className="confirmation-message">Thank you for your message! We will get back to you shortly.</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
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
          <button type="submit">Send Message</button>
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
