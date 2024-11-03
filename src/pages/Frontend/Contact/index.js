import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <header>
        <h1>Get in Touch</h1>
        <p>Have a question or need help with an order? We're here to help.</p>
      </header>
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
      <section className="contact-info">
        <h2>Our Contact Information</h2>
        <ul>
          <li>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span>UAF Fasilabad</span>
          </li>
          <li>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>(555) 555-5555</span>
          </li>
          <li>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span>kzkstore@example.com</span>
          </li>
        </ul>
      </section>
      <section className="social-media">
        <h2>Follow Us on Social Media</h2>
        <ul>
          <li>
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <span>Facebook</span>
          </li>
          <li>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <span>Twitter</span>
          </li>
          <li>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <span>Instagram</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ContactPage;