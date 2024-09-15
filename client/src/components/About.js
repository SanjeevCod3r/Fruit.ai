import React, { useState } from 'react';
import '../css/About.css';

function About() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAbout = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="about-container">
      <button className="click-me-button" onClick={toggleAbout}>
        Click Me
      </button>

      <div className={`about-section ${isOpen ? 'open' : ''}`}>
        <div className="about-content">
          <h2>About Fruit.AI</h2>
          <p>
            Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist.
            We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
          </p>
        </div>
        <button className="close-button" onClick={toggleAbout}>Close</button>
      </div>
    </div>
  );
}

export default About;
