import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header>
        <h1>About Us</h1>
        <p>Learn more about our company and our mission to provide the best online shopping experience.</p>
      </header>
      <section className="hero">
        <img src={"/src/assets/about.png"} alt="" />
        <h2>Welcome to KZK Store, your premier online shopping destination.</h2>
        <p>At KZK Store, we're passionate about providing our customers with the best online shopping experience possible. Our team is dedicated to curating a wide range of products that cater to diverse tastes and preferences.</p>
      </section>
      <section className="our-story">
        <h2>Our Story</h2>
        <p>KZK Store was founded in 2024 with a vision to revolutionize the online shopping experience. Our team of experts has worked tirelessly to create a platform that's easy to use, secure, and provides the best possible customer experience.</p>
        <img src={"/src/assets/about.png"} alt="" />
      </section>
      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>At KZK Store, our mission is to provide our customers with the best online shopping experience possible. We're committed to delivering high-quality products, exceptional customer service, and a seamless shopping experience.</p>
      </section>
      <section className="our-values">
        <h2>Our Values</h2>
        <ul>
          <li>Customer-centricity: We put our customers at the heart of everything we do.</li>
          <li>Innovation: We're committed to staying ahead of the curve and embracing new technologies and trends.</li>
          <li>Quality: We're dedicated to delivering high-quality products and services that meet our customers' expectations.</li>
          <li>Integrity: We operate with integrity and transparency in all our dealings.</li>
        </ul>
      </section>
      <section className="call-to-action">
        <h2>Join Our Community</h2>
        <p>Want to stay up-to-date with the latest news, promotions, and product releases from KZK Store? Join our community today and get exclusive access to:</p>
        <ul>
          <li>Early access to new products</li>
          <li>Exclusive promotions and discounts</li>
          <li>Behind-the-scenes insights into our company</li>
        </ul>
        <button>Join Now</button>
      </section>
    </div>
  );
};

export default AboutPage;